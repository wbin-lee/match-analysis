import { createHash } from "crypto";
import type { Person } from "./types";

export function personKey(p: Person): string {
  const raw = [p.name, p.birthDate, p.birthTime, p.birthPlace]
    .map((s) => (s ?? "").trim().toLowerCase())
    .join("|");
  return createHash("sha256").update(raw).digest("hex").slice(0, 24);
}
