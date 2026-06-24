import os
from datetime import date, datetime
from typing import Annotated

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException, status
from pydantic import BaseModel, ConfigDict, Field
from sqlalchemy import Boolean, DateTime, Integer, String, create_engine, text
from sqlalchemy.orm import DeclarativeBase, Mapped, Session, mapped_column, sessionmaker

load_dotenv(".env.local")

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./todos.db")

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False},
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


class Todo(Base):
    __tablename__ = "todos"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    text: Mapped[str] = mapped_column(String(255), nullable=False)
    completed: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    date: Mapped[str] = mapped_column(
        String(10),
        default=lambda: date.today().isoformat(),
        nullable=False,
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )


class TodoCreate(BaseModel):
    text: str = Field(min_length=1, max_length=255)
    date: str = Field(default_factory=lambda: date.today().isoformat(), min_length=10, max_length=10)


class TodoUpdate(BaseModel):
    text: str = Field(min_length=1, max_length=255)
    completed: bool
    date: str = Field(min_length=10, max_length=10)


class TodoResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    text: str
    completed: bool
    date: str
    created_at: datetime
    updated_at: datetime


Base.metadata.create_all(bind=engine)

with engine.begin() as connection:
    columns = connection.execute(text("PRAGMA table_info(todos)")).fetchall()
    column_names = {column[1] for column in columns}

    if "date" not in column_names:
        today_key = date.today().isoformat()
        connection.execute(
            text(f"ALTER TABLE todos ADD COLUMN date VARCHAR(10) NOT NULL DEFAULT '{today_key}'"),
        )

app = FastAPI()


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


DbSession = Annotated[Session, Depends(get_db)]


@app.get("/")
def read_root():
    return {"message": "Hello World"}


@app.get("/todos", response_model=list[TodoResponse])
def read_todos(db: DbSession):
    return db.query(Todo).order_by(Todo.id.desc()).all()


@app.post("/todos", response_model=TodoResponse, status_code=status.HTTP_201_CREATED)
def create_todo(todo: TodoCreate, db: DbSession):
    new_todo = Todo(text=todo.text.strip(), date=todo.date)

    if new_todo.text == "":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Todo text is required.",
        )

    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)

    return new_todo


@app.put("/todos/{todo_id}", response_model=TodoResponse)
def update_todo(todo_id: int, todo: TodoUpdate, db: DbSession):
    saved_todo = db.get(Todo, todo_id)

    if saved_todo is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found.",
        )

    next_text = todo.text.strip()

    if next_text == "":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Todo text is required.",
        )

    saved_todo.text = next_text
    saved_todo.completed = todo.completed
    saved_todo.date = todo.date
    saved_todo.updated_at = datetime.utcnow()

    db.commit()
    db.refresh(saved_todo)

    return saved_todo


@app.delete("/todos/{todo_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_todo(todo_id: int, db: DbSession):
    saved_todo = db.get(Todo, todo_id)

    if saved_todo is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found.",
        )

    db.delete(saved_todo)
    db.commit()
