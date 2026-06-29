# Python Interview Training

Personal Python practice workspace for senior software developer interview preparation.

The repository is organized around small numbered exercises, reusable shared utilities, tests, and interview notes. The goal is to practice implementation, testing, refactoring, and explaining trade-offs clearly.

## Environment

Create or update the Conda environment:

```bash
conda env create -f environment.yml
# or, if it already exists:
conda env update -f environment.yml --prune
```

Activate it:

```bash
conda activate python-playground
```

Run quality checks:

```bash
pytest
ruff check .
mypy .
```

## Structure

```text
.
├── AGENTS.md
├── Problems.md
├── README.md
├── environment.yml
├── shared/
│   ├── pyproject.toml
│   ├── pyutils/
│   └── tests/
└── problems/
    └── 001_hello_world/
        ├── solution.py
        └── tests/
```

## Workflow

For each problem:

1. Read the problem definition at the top of `solution.py`.
2. Implement the missing functions.
3. Run the problem tests.
4. Refactor for readability.
5. Add brief notes in comments only when they help interview discussion.

Problem-specific README files are intentionally avoided for now. The problem statement lives as a top-level docstring in each `solution.py` file.
