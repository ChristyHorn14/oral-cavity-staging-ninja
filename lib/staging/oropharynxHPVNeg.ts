// lib/staging/oropharynxHPVNeg.ts
// AJCC 8 – HPV-Negative Oropharynx
// - T: size-based + local extension flags (T4a/T4b)
// - N + Stage grouping: shared classic HPV-negative H&N logic

import {
  computeN_HeadNeckHPVNeg,
  computeStageGroup_HeadNeckClassic,
  type HeadNeckN,
  type HeadNeckNodes,
  type HeadNeckStage,
} from "@/lib/staging/commonHeadNeck";

export type OropharynxNegT = "T0" | "T1" | "T2" | "T3" | "T4a" | "T4b";
export type OropharynxNegN = HeadNeckN;
export type OropharynxNegStage = HeadNeckStage;

export interface OropharynxHPVNegTumor {
  size_cm: number;

  // T4a: advanced local extension (resectable)
  advanced_local_extension?: boolean;

  // T4b: very advanced local extension (unresectable)
  very_advanced_local_extension?: boolean;
}

export interface OropharynxHPVNegNodes extends HeadNeckNodes {}

export function computeT_OropharynxHPVNeg(t: OropharynxHPVNegTumor): OropharynxNegT {
  const size = t.size_cm ?? 0;

  // T0: no primary tumor
  if (Math.abs(size) < 1e-6) return "T0";

  // T4b overrides everything
  if (t.very_advanced_local_extension) return "T4b";

  // T4a next
  if (t.advanced_local_extension) return "T4a";

  // Size-based
  if (size > 4) return "T3";
  if (size > 2) return "T2";
  return "T1";
}

export function computeN_OropharynxHPVNeg(n: OropharynxHPVNegNodes): OropharynxNegN {
  return computeN_HeadNeckHPVNeg(n);
}

export function computeStageGroup_OropharynxHPVNeg(T: OropharynxNegT, N: OropharynxNegN): OropharynxNegStage {
  return computeStageGroup_HeadNeckClassic({
    T,
    N,
    isT4a: (t) => t === "T4a",
    isT4b: (t) => t === "T4b",
    isT1: (t) => t === "T1",
    isT2: (t) => t === "T2",
    isT3: (t) => t === "T3",
  });
}

// -----------------------------
// Dev-only invariants (optional)
// -----------------------------
if (process.env.NODE_ENV !== "production") {
  const Ns: OropharynxNegN[] = ["N0", "N1", "N2a", "N2b", "N2c", "N3a", "N3b"];
  for (const N of Ns) {
    const st = computeStageGroup_OropharynxHPVNeg("T4b", N);
    if (st !== "IVB") throw new Error(`Invariant failed: OP- T4b ${N} staged as ${st}`);
  }
}
