// lib/staging/oropharynxHPVNeg.ts
// AJCC 8th Edition – HPV-Negative Oropharynx

export type OropharynxNegT = "T0" | "T1" | "T2" | "T3" | "T4a" | "T4b";
export type OropharynxNegN = "N0" | "N1" | "N2a" | "N2b" | "N2c" | "N3a" | "N3b";
export type OropharynxNegStage = "I" | "II" | "III" | "IVA" | "IVB";

// -----------------------------
// Tumor (T) computation
// -----------------------------

export interface OropharynxHPVNegTumor {
  size_cm: number;
  advanced_local_extension?: boolean; // T4a-level invasion (resectable)
  very_advanced_local_extension?: boolean; // T4b-level invasion (unresectable)
}

export function computeT_OropharynxHPVNeg(t: OropharynxHPVNegTumor): OropharynxNegT {
  const size = t.size_cm ?? 0;

  // T0: no primary tumor
  if (Math.abs(size) < 1e-6) return "T0";

  // T4b: very advanced / unresectable
  if (t.very_advanced_local_extension) return "T4b";

  // T4a: advanced local extension (resectable)
  if (t.advanced_local_extension) return "T4a";

  // Size-based staging
  if (size > 4) return "T3";
  if (size > 2) return "T2";
  return "T1";
}

// -----------------------------
// Nodal (N) computation
// -----------------------------

import {
  computeN_HeadNeckHPVNeg,
  computeStageGroup_HeadNeckClassic,
  type HeadNeckN,
  type HeadNeckStage,
  type HeadNeckNodes,
} from "@/lib/staging/commonHeadNeck";

export type OropharynxNegN = HeadNeckN;
export type OropharynxNegStage = HeadNeckStage;

export interface OropharynxHPVNegNodes extends HeadNeckNodes {}

export function computeN_OropharynxHPVNeg(n: OropharynxHPVNegNodes): OropharynxNegN {
  return computeN_HeadNeckHPVNeg(n);
}

export function computeStageGroup_OropharynxHPVNeg(
  T: OropharynxNegT,
  N: OropharynxNegN
): OropharynxNegStage {
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
