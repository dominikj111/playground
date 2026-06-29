# AGENTS.md

## Purpose

This repository is a personal Python interview training workspace for a senior software developer / full-stack developer position.

The project exists to practice Python fundamentals, algorithms, testing, typing, concurrency, web APIs, architecture, and interview-sized implementation projects in a structured way.

## Invariants

Never violate these constraints:

* Keep exercises small, focused, and interview-oriented.
* Prefer readable, idiomatic Python over clever solutions.
* Every non-trivial solution should be testable with `pytest`.
* Shared utilities belong in `shared/pyutils/`; do not duplicate the same helper across exercises.
* Exercise directories should be numbered and named consistently: `001_hello_world`, `002_temperature_converter`, etc.
* Do not turn this repository into a production application; it is a practice and preparation workspace.
* Do not add heavyweight frameworks unless an exercise specifically requires them.
* Keep dependency changes in `environment.yml`.

## Documentation Map

Repository documentation starts from these files only:

* `AGENTS.md` — agent rules and project constraints.
* `Problems.md` — master roadmap of interview practice problems.
* `environment.yml` — Conda environment definition.
* `README.md` — human-facing project overview, if present.

Optional documentation may live in:

* `docs/index.md` — documentation entry point, if `docs/` exists.
* `problems/<number_name>/README.md` — individual exercise statement.
* `shared/README.md` — shared utility package notes, if present.

Documentation discovery starts from the smallest relevant entry point. Do not recursively read all documentation.

## Repository Shape

Expected structure:

```text
python-training/
├── AGENTS.md
├── Problems.md
├── environment.yml
├── README.md
├── shared/
│   ├── pyutils/
│   │   ├── __init__.py
│   │   ├── collections.py
│   │   ├── config.py
│   │   ├── files.py
│   │   ├── io.py
│   │   ├── json.py
│   │   ├── logging.py
│   │   ├── strings.py
│   │   ├── time.py
│   │   └── validation.py
│   ├── tests/
│   └── pyproject.toml
└── problems/
    ├── 001_hello_world/
    │   ├── solution.py
    │   └── tests/
    └── ...
```

Create this structure incrementally. Do not create empty directories or broad documentation trees unless needed for the active task.

## Exercise Format

Each exercise should contain, when useful:

* problem statement
* requirements
* examples
* constraints and edge cases
* hints
* solution
* tests
* discussion
* possible improvements
* interview notes

Keep early exercises lightweight. Add more structure as problems become more realistic.

## Agent Workflow

Context loading order:

1. The user request.
2. Relevant entry in `Problems.md`.
3. Relevant exercise `README.md`, if it exists.
4. `AGENTS.md`.
5. Relevant source code or tests.
6. Explicitly referenced documentation.

Do not load additional context unless required.

Documentation is reference material, not startup context. Read only the documentation required for the active task.

Implementation work should originate from one of:

* a user request,
* a `Problems.md` entry,
* an exercise `README.md`,
* a task note explicitly created for the current work.

When conflicts occur:

```text
user request > exercise README/task note > Problems.md > AGENTS.md > assumptions
```

## Python Environment

Use the Conda environment defined by `environment.yml`.

Common commands:

```bash
conda env create -f environment.yml
conda activate python-playground
conda env update -f environment.yml --prune
python --version
pytest
ruff check .
mypy .
```

Prefer `conda` packages from `conda-forge`. Use `pip` only for packages unavailable or more practical through PyPI, such as type stubs.

## Coding Standards

Follow these defaults unless an exercise says otherwise:

* Python 3.13 syntax is allowed.
* Use type hints for public functions and interview-relevant APIs.
* Keep functions short and named around intent.
* Prefer standard library solutions before third-party packages.
* Add tests for normal cases, edge cases, and failure cases.
* Use `ruff`, `black`, `mypy`, and `pytest` as quality gates.
* Explain trade-offs in exercise notes when useful for interviews.

## Strictly Follow

* Minimize context consumption.
* Load the smallest context required.
* Use documentation as reference material, not startup material.
* Keep `Problems.md` as the master roadmap.
* Remove duplicated information rather than creating additional copies.
* Prefer incremental improvements over broad rewrites.
* Keep examples runnable from a fresh Conda environment.

## Context Protection Rules

Never:

* rewrite `AGENTS.md` unless requested,
* create new documentation hierarchies without need,
* duplicate exercise requirements across multiple files,
* expand startup context,
* scan the entire repository without need,
* infer requirements not present in the user request or exercise material,
* add dependencies without updating `environment.yml`,
* solve future exercises unless explicitly asked.

---

User additions below this line.
