# beam-p2p-poc — Elixir / Phoenix research workspace

Exploratory Phoenix application on the BEAM VM. The goal is to understand whether
Elixir/OTP is a viable foundation for the **P2P network coordination layer** of a
distributed operational system.

---

## Why BEAM for P2P coordination

The Erlang BEAM runtime was engineered for distributed telecoms switching — the same
properties that matter in a P2P cooperative network:

- **Actor model concurrency** — every process is isolated with its own mailbox; no shared
  mutable state between peers
- **Transparent distribution** — Distributed Erlang lets processes on different nodes
  communicate identically to local processes; the network topology is largely invisible
  to application code
- **Supervisor trees** — restarting failed processes is a first-class runtime primitive,
  not a library concern; this gives the P2P layer fault tolerance without custom crash
  recovery code
- **GenServer / OTP behaviours** — standardised patterns for stateful services, long-running
  background workers, and finite state machines
- **Soft real-time** — the BEAM scheduler gives low-latency, predictable message delivery
  without garbage collection pauses that block the world

**Complementary to Rust:** Rust handles computation-intensive work (parsing, encoding,
crypto, engine logic) with memory safety. BEAM handles network coordination, distributed
state, and fault tolerance at the runtime level. The two can interop via NIFs or via
message passing across ports.

This workspace explores whether Phoenix LiveView + GenServer + distributed Erlang is
sufficient for the operational messaging / coordination layer, or whether a more
minimal OTP application (no Phoenix) is the right shape.

---

## Running locally

```bash
mix setup            # install dependencies, create and migrate database
mix phx.server       # start dev server at http://localhost:4000
iex -S mix phx.server  # start inside IEx for interactive debugging
```

---

## AI assistant guidance

See [AGENTS.md](AGENTS.md) for Phoenix 1.8 / Elixir / Tailwind v4 development rules.

---

## Status

Exploratory — not production code. Current primary development focus is the
`api-ts` + tRPC + Rust stack. This workspace is used to build intuition about
BEAM/OTP before committing to an architecture decision.
