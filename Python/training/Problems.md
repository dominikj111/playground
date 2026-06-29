# Python Interview Training Problems

A focused roadmap for senior software developer interview preparation.

Use this file as the master problem index. Each problem should eventually get its own directory under `problems/` with a short `README.md`, implementation, tests, and interview notes.

## How to Use This Roadmap

For each problem:

1. Solve it first without looking up a full solution.
2. Add tests for normal cases, edge cases, and invalid input.
3. Refactor for readability and idiomatic Python.
4. Write short interview notes: complexity, trade-offs, and follow-up questions.
5. Revisit older problems and improve them using later concepts.

Recommended exercise directory format:

```text
problems/001_hello_world/
├── README.md
├── solution.py
└── tests/
    └── test_solution.py
```

---

## Phase 1 — Python Language Fundamentals

**Goal:** Become fluent with syntax, control flow, functions, strings, numbers, and small scripts.

| ID | Problem | Focus |
| --- | --- | --- |
| 001 | Hello World | `print`, variables, comments, script execution |
| 002 | Temperature Converter | Celsius, Fahrenheit, Kelvin, numeric conversion |
| 003 | BMI Calculator | arithmetic, formatting, simple branching |
| 004 | Simple Calculator | `+`, `-`, `*`, `/`, `**`, operator dispatch |
| 005 | Input Validation | ask until valid integer, error handling |
| 006 | Swap Variables | tuple unpacking, no temporary variable |
| 007 | FizzBuzz | loops, modulo, interview classic |
| 008 | Leap Year | boolean logic, calendar rules |
| 009 | Prime Checker | loops, divisibility, complexity basics |
| 010 | Factorial | iterative and recursive implementations |
| 011 | Palindrome | string normalization, two-pointer thinking |
| 012 | Anagram | sorting vs frequency counting |
| 013 | Character Frequency | dictionaries, counting, iteration |
| 014 | Word Frequency | tokenization, normalization, counters |
| 015 | Longest Word | scanning, tie handling |
| 016 | Caesar Cipher | character ranges, wrapping, simple crypto |
| 017 | ROT13 | symmetric transformation, standard library comparison |
| 018 | Base64 Encoder | use Python standard library correctly |
| 019 | Random Password Generator | randomness, character sets, validation |
| 020 | Guessing Game | loops, input, feedback, termination |

---

## Phase 2 — Collections & Algorithms

**Goal:** Practice lists, dictionaries, sets, queues, stacks, sorting, searching, and common algorithm patterns.

| ID | Problem | Focus |
| --- | --- | --- |
| 021 | List Statistics | min, max, mean, median, empty input |
| 022 | Remove Duplicates Preserving Order | set membership, stable order |
| 023 | Sliding Window | contiguous ranges, running totals |
| 024 | Group by First Letter | dictionary grouping |
| 025 | Frequency Counter | `dict` vs `collections.Counter` |
| 026 | Merge Dictionaries | conflict rules, shallow merging |
| 027 | Nested Dictionary Access | safe lookup, defaults, path traversal |
| 028 | Flatten Nested List | recursion, iteration, nested structures |
| 029 | Chunk List | slicing, generators, boundary cases |
| 030 | Rotate List | modulo arithmetic, slicing |
| 031 | LRU Cache | ordered state, eviction policy |
| 032 | Queue | FIFO behavior, implementation choices |
| 033 | Stack | LIFO behavior, parsing use cases |
| 034 | Deque | double-ended operations |
| 035 | Priority Queue | heaps, tie-breaking |
| 036 | Binary Search | sorted input, boundaries, invariants |
| 037 | Merge Sort | divide and conquer, stable sorting |
| 038 | Quick Sort | partitioning, average vs worst case |
| 039 | Heap Sort | heap operations, in-place trade-offs |
| 040 | Top K Elements | heaps, sorting, complexity trade-offs |

---

## Phase 3 — Functional Python

**Goal:** Learn functional tools, higher-order functions, decorators, generators, and lazy pipelines.

| ID | Problem | Focus |
| --- | --- | --- |
| 041 | `map` | transformation pipelines |
| 042 | `filter` | predicate-based selection |
| 043 | `reduce` | accumulation, alternatives |
| 044 | `lambda` | small anonymous functions |
| 045 | `partial` | preconfigured callables |
| 046 | Closures | captured state, factories |
| 047 | Higher-Order Functions | functions as values |
| 048 | Decorators | wrapping behavior |
| 049 | Decorator with Arguments | configurable wrappers |
| 050 | Memoization | caching, recursion optimization |
| 051 | `itertools` | standard lazy iteration tools |
| 052 | More Itertools Patterns | combinations, grouping, chaining |
| 053 | `functools` | cache, wraps, singledispatch |
| 054 | `operator` Module | function helpers for sorting and access |
| 055 | `enumerate` | index-aware iteration |
| 056 | `zip` | parallel iteration, strict mode |
| 057 | Generator | lazy sequence creation |
| 058 | Generator Pipeline | streaming transformations |
| 059 | `yield from` | delegation and composition |
| 060 | Lazy CSV Reader | memory-efficient file processing |

---

## Phase 4 — Object-Oriented Python

**Goal:** Practice classes, object design, Python data model methods, and common design patterns.

| ID | Problem | Focus |
| --- | --- | --- |
| 061 | Class Basics | attributes, methods, initialization |
| 062 | Inheritance | specialization, overriding |
| 063 | Composition | object collaboration over inheritance |
| 064 | `@property` | computed attributes, validation |
| 065 | Magic Methods | Python data model, dunder methods |
| 066 | Dataclasses | value objects, defaults, immutability |
| 067 | Slots | memory layout, attribute constraints |
| 068 | Enums | named constants, state modeling |
| 069 | ABC | abstract base classes |
| 070 | Protocols | structural typing and interfaces |
| 071 | Mixins | reusable behavior composition |
| 072 | Factory Pattern | object creation logic |
| 073 | Strategy Pattern | interchangeable behavior |
| 074 | Command Pattern | encapsulated actions |
| 075 | Observer Pattern | event notification |
| 076 | Dependency Injection | explicit dependencies, testability |
| 077 | Repository Pattern | persistence abstraction |
| 078 | Builder Pattern | stepwise object construction |
| 079 | Fluent API | chained calls, readability |
| 080 | Mini ORM | objects, persistence, query abstraction |

---

## Phase 5 — Typing & Architecture

**Goal:** Become comfortable with modern Python typing, validation, configuration, and architecture-friendly refactoring.

| ID | Problem | Focus |
| --- | --- | --- |
| 081 | Type Hints | annotations, optional values |
| 082 | Generics | reusable typed containers/functions |
| 083 | `TypeAlias` | readable domain types |
| 084 | Protocols | typed interfaces without inheritance |
| 085 | `Literal` | restricted values |
| 086 | `TypedDict` | typed dictionaries and JSON-like data |
| 087 | `Self` | fluent and class-returning APIs |
| 088 | `ParamSpec` | typed decorators and call forwarding |
| 089 | `TypeVar` | type relationships |
| 090 | `Never` | impossible states, exhaustiveness |
| 091 | `Annotated` | metadata and validation hints |
| 092 | mypy | static analysis workflow |
| 093 | Refactor Old Code | improve types, tests, and structure |
| 094 | Generic Cache | typed reusable cache abstraction |
| 095 | Generic Result Type | success/error modeling |
| 096 | Validation Library | small composable validators |
| 097 | Pydantic | runtime validation basics |
| 098 | Pydantic Models | nested models, parsing, serialization |
| 099 | Configuration Loader | environment/files/defaults |
| 100 | JSON Schema Generation | contracts, validation, API documentation |

---

## Phase 6 — CLI, Files & OS

**Goal:** Practice practical scripting, filesystem work, process management, logging, archives, and command-line tools.

| ID | Problem | Focus |
| --- | --- | --- |
| 101 | `pathlib` | path operations, cross-platform code |
| 102 | `glob` | file matching patterns |
| 103 | `argparse` | standard library CLI parsing |
| 104 | Typer CLI | modern typed CLI applications |
| 105 | `subprocess` | running external commands safely |
| 106 | `tempfile` | temporary files and directories |
| 107 | `logging` | structured application logging |
| 108 | `configparser` | INI configuration files |
| 109 | CSV | reading, writing, dialects |
| 110 | JSON | serialization and validation boundaries |
| 111 | `tomllib` | reading TOML configuration |
| 112 | `zipfile` | create and inspect ZIP archives |
| 113 | `tarfile` | tar archives and extraction safety |
| 114 | `hashlib` | checksums, hashing files |
| 115 | Thread-Safe Logger | concurrency-safe logging design |
| 116 | Progress Bars | terminal feedback with `rich` |
| 117 | Directory Tree | recursive filesystem traversal |
| 118 | File Finder | filters, predicates, CLI output |
| 119 | Duplicate Detector | hashing, grouping, reporting |
| 120 | Mini Grep | text search, regex, streaming files |

---

## Phase 7 — Testing & Quality

**Goal:** Build confidence with pytest, fixtures, mocks, coverage, test organization, and quality automation.

| ID | Problem | Focus |
| --- | --- | --- |
| 121 | pytest Basics | assertions, test discovery |
| 122 | Fixtures | setup, teardown, reuse |
| 123 | Parameterized Tests | input/output tables |
| 124 | Mock | replacing dependencies |
| 125 | Monkeypatch | environment and function patching |
| 126 | `tmp_path` | filesystem tests |
| 127 | Coverage | measuring and improving test coverage |
| 128 | Property Testing | invariants and generated inputs |
| 129 | Benchmarking | performance measurement basics |
| 130 | Golden Files | expected-output regression tests |
| 131 | Integration Tests | multiple components together |
| 132 | API Tests | HTTP endpoint validation |
| 133 | Database Tests | isolated persistence tests |
| 134 | CLI Tests | command behavior and exit codes |
| 135 | Snapshot Tests | structured output comparisons |
| 136 | Test Organization | layout, naming, maintainability |
| 137 | CI Pipeline | automated quality checks |
| 138 | Ruff | linting and formatting checks |
| 139 | Black | formatter workflow |
| 140 | Pre-commit | local automation before commits |

---

## Phase 8 — Async & Concurrency

**Goal:** Practice threads, processes, asyncio, cancellation, queues, rate limits, and concurrent system design.

| ID | Problem | Focus |
| --- | --- | --- |
| 141 | Threading | basic threaded execution |
| 142 | Locks | shared state protection |
| 143 | Queues | producer/consumer communication |
| 144 | Producer Consumer | backpressure and termination |
| 145 | Concurrent Futures | thread and process pools |
| 146 | Multiprocessing | CPU-bound parallelism |
| 147 | Shared Memory | inter-process data sharing |
| 148 | asyncio | event loop basics |
| 149 | `gather` | concurrent async tasks |
| 150 | `TaskGroup` | structured concurrency |
| 151 | Semaphore | concurrency limits |
| 152 | Cancellation | cooperative shutdown |
| 153 | Timeout | bounded waits and cleanup |
| 154 | HTTP Crawler | async HTTP, parsing links |
| 155 | Parallel Downloader | concurrency, retries, file writes |
| 156 | Rate Limiter | token bucket or leaky bucket |
| 157 | Async Cache | async-safe memoization |
| 158 | Event Bus | publish/subscribe design |
| 159 | Actor Model | isolated state and message passing |
| 160 | Mini Scheduler | delayed and repeated jobs |

---

## Phase 9 — Web & Data APIs

**Goal:** Practice HTTP clients, FastAPI, validation, persistence, authentication, templates, streaming, and API design.

| ID | Problem | Focus |
| --- | --- | --- |
| 161 | HTTP Client | requests, timeouts, error handling |
| 162 | REST Wrapper | typed API client design |
| 163 | FastAPI Basics | routes, app structure |
| 164 | Dependency Injection | FastAPI dependencies |
| 165 | Request Validation | input schemas and errors |
| 166 | Response Models | output contracts |
| 167 | Middleware | cross-cutting request behavior |
| 168 | Authentication | users, sessions/tokens, password handling |
| 169 | JWT | token creation, validation, expiry |
| 170 | SQLite | local relational persistence |
| 171 | SQLAlchemy | ORM and query basics |
| 172 | CRUD API | create/read/update/delete endpoints |
| 173 | Pagination | limits, offsets, cursors |
| 174 | Filtering | query parameters and validation |
| 175 | Jinja Templates | server-rendered HTML |
| 176 | SSE | server-sent events |
| 177 | WebSockets | bidirectional communication |
| 178 | Background Tasks | async/background work in web apps |
| 179 | Upload Endpoint | file upload validation and storage |
| 180 | Mini Blog | integrated CRUD web project |

---

## Phase 10 — Advanced Python

**Goal:** Understand Python internals, advanced language features, packaging, plugins, profiling, and framework-like designs.

| ID | Problem | Focus |
| --- | --- | --- |
| 181 | Descriptors | attribute access protocol |
| 182 | Metaclasses | class creation customization |
| 183 | Context Managers | resource management |
| 184 | Async Context Managers | async resource lifecycle |
| 185 | Import System | modules, loaders, package discovery |
| 186 | AST Parsing | parse and inspect Python code |
| 187 | Bytecode Inspection | disassembly and runtime behavior |
| 188 | Profiling | CPU performance analysis |
| 189 | Memory Profiling | allocations, object lifetime |
| 190 | Weak References | caches and lifecycle-sensitive references |
| 191 | Caching | eviction, invalidation, correctness |
| 192 | Plugin System | discovery, registration, isolation |
| 193 | Package Publishing | build metadata and distribution |
| 194 | Custom Exceptions | error taxonomy and API design |
| 195 | Domain Modeling | entities, value objects, invariants |
| 196 | Dependency Graph | graph traversal and cycle detection |
| 197 | Plugin Loader | dynamic imports and safety boundaries |
| 198 | Configuration Framework | layered configuration system |
| 199 | Mini Template Engine | parsing, rendering, escaping |
| 200 | Mini pytest Clone | discovery, assertions, reporting |

---

## Phase 11 — Interview Projects

**Goal:** Build complete interview-sized systems that combine design, implementation, tests, and discussion of trade-offs.

| ID | Project | Focus |
| --- | --- | --- |
| 201 | URL Shortener | API design, storage, redirects, collisions |
| 202 | Markdown Parser | parsing, state machines, rendering |
| 203 | JSON Validator | schema validation, error reporting |
| 204 | INI Parser | parsing, configuration, edge cases |
| 205 | Task Scheduler | queues, time, persistence, execution |
| 206 | Filesystem Watcher | polling/events, debounce, callbacks |
| 207 | Log Parser | streaming, aggregation, reporting |
| 208 | Search Index | tokenization, indexing, ranking |
| 209 | REST Backend | layered API, persistence, testing |
| 210 | Chat Server | concurrency, messaging, WebSockets |
| 211 | Package Manager | dependency resolution, versions, lockfiles |
| 212 | Configuration Library | precedence, validation, typed access |
| 213 | CSV Database | storage format, indexing, queries |
| 214 | Redis Clone (In-Memory) | data structures, commands, expiry |
| 215 | Template Engine | lexer/parser, rendering, escaping |
| 216 | Dependency Injector | providers, lifetimes, graph resolution |
| 217 | Workflow Engine | DAGs, retries, state transitions |
| 218 | Mini ORM | models, queries, relationships |
| 219 | Event Bus | subscriptions, delivery, async behavior |
| 220 | Production-Ready CLI Application | packaging, config, logging, tests, UX |

---

## Progress Legend

Use these markers when you start tracking progress:

| Marker | Meaning |
| --- | --- |
| ⬜ | Not started |
| 🟨 | In progress |
| ✅ | Solved and tested |
| 🔁 | Revisit/refactor later |
| 🧠 | Interview notes written |

Example:

```markdown
| 007 | ✅ 🧠 | FizzBuzz | loops, modulo, interview classic |
```
