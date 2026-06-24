type TodoFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  defaultCompleted?: boolean;
  defaultDate: string;
  defaultText?: string;
  showCompletedField?: boolean;
  submitLabel: string;
};

export default function TodoForm({
  action,
  defaultCompleted = false,
  defaultDate,
  defaultText = "",
  showCompletedField = false,
  submitLabel,
}: TodoFormProps) {
  return (
    <form action={action} className="space-y-3">
      <div className="flex gap-2">
        <input name="date" type="hidden" value={defaultDate} />
        <input
          className="min-w-0 flex-1 rounded-[10px] border border-[#ddd] px-3 py-3 text-sm outline-none focus:border-[#672be0]"
          defaultValue={defaultText}
          maxLength={255}
          name="text"
          placeholder="할 일을 입력하세요"
          required
          type="text"
        />

        <button
          className="rounded-[10px] bg-[#672be0] px-3.5 py-3 text-sm font-bold text-white hover:bg-[#5421bd]"
          type="submit"
        >
          {submitLabel}
        </button>
      </div>

      {showCompletedField && (
        <label className="flex items-center gap-2 text-[13px] font-bold text-[#555]">
          <input
            className="h-4 w-4 accent-[#672be0]"
            defaultChecked={defaultCompleted}
            name="completed"
            type="checkbox"
          />
          완료 상태로 표시
        </label>
      )}
    </form>
  );
}
