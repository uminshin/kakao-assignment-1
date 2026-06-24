# AGENTS.md

## Project Purpose

This repository is for Kakao Tech Campus assignments.
AI tools may help with planning, debugging, review, and refactoring, but the final code and decisions must be understood and explainable by the student.

Core principle:

> AI does not replace my thinking. AI helps me think better.

## Repository Structure

- Assignment app code lives in `assignment2/`.
- Run npm commands inside `assignment2/`, not from the repository root.
- Assignment-specific plans and progress notes should live under `assignment2/docs/`.
- Repository-wide AI working rules live in this root `AGENTS.md`.

## AI Collaboration Rules

- Treat AI output as a draft, not a final answer.
- Before accepting AI-generated code, explain the main flow in my own words.
- Rewrite names, comments, and structure so they fit this project.
- Do not submit code that I cannot explain at a high level.
- Record meaningful AI assistance in the README, issue, or progress document.
- Do not claim AI-generated code or text as fully self-written.

## Planning Rules

- Start major assignment work with a plan document under `assignment2/docs/`.
- The plan should include requirements, current problems, implementation order, and verification steps.
- Update the plan when the direction changes.
- Do not start large code changes before deciding what problem the change solves.

## React Code Rules

- Keep `App.jsx` focused on composing the app and connecting state to UI.
- Put reusable UI in `src/components/`.
- Put reusable state logic in `src/hooks/`.
- Put pure helper functions in `src/utils/`.
- Keep React state as the source of truth for the UI.
- Use `localStorage` through a utility or custom hook, not directly across many components.
- When using `useEffect`, be able to explain what outside system it syncs with and why the dependency array is correct.
- Do not add a new library unless the problem is difficult to solve cleanly without it.
- Preserve existing Todo behavior while refactoring.

## Commands

When working on the assignment app:

```bash
cd assignment2
npm install
npm run dev
```

Before finishing code changes:

```bash
npm run lint
npm run build
```

If a command fails, do not ignore it. Read the error message, identify the cause, and fix it before submission.

## Commit Rules

- Do not commit `node_modules/`.
- Do not commit `dist/`.
- Do not commit a root-level `package-lock.json` unless the repository root becomes a real npm project.
- Commit `assignment2/package-lock.json` because it records the assignment app dependencies.
- Keep commits focused on one purpose, such as planning, refactoring, testing, or documentation.
- Check changed files with `git status` before committing.

## Documentation Rules

- Keep README focused on how to run the app, what was built, and how AI was used.
- Record important design decisions, errors, fixes, and verification results in docs or issues.
- When changing architecture, document why the structure changed.
- Keep documents consistent with the final code.

## Verification Checklist

Before submission, check:

- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Todo add works.
- [ ] Empty input is blocked.
- [ ] Todo edit works.
- [ ] Complete / active toggle works.
- [ ] Todo delete works.
- [ ] Filter tabs work.
- [ ] Previous / next date navigation works.
- [ ] Refresh keeps saved todos.
- [ ] README and progress documents match the final code.

## Learning Checklist

Before submitting AI-assisted work, answer:

- [ ] Why does this code work?
- [ ] Can I modify it if the requirement changes?
- [ ] Can I reproduce the important parts without AI?
- [ ] Is there unnecessary logic?
- [ ] Can I explain where AI helped?
