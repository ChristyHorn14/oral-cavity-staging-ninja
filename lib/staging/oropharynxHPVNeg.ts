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

export interface OropharynxHPVNegNodes {
  positive_node_count: number;
  laterality?: "ipsilateral" | "contralateral" | "bilateral" | "none" | "unknown";
  largest_node_cm: number;
  ene: boolean;
}

export function computeN_OropharynxHPVNeg(n: OropharynxHPVNegNodes): OropharynxNegN {
  if (n.positive_node_count === 0) return "N0";

  // ENE+ is always N3b
  if (n.ene) return "N3b";

  // Size-based N3a
  if (n.largest_node_cm > 6) return "N3a";

  // Single node logic
  if (n.positive_node_count === 1) {
    if (n.largest_node_cm <= 3) return "N1";
    return "N2a";
  }

  // Multiple nodes
  if (n.laterality === "bilateral" || n.laterality === "contralateral") return "N2c";
  return "N2b";
}

// -----------------------------
// Stage grouping (AJCC 8)
// -----------------------------

export function computeStageGroup_OropharynxHPVNeg(
  T: OropharynxNegT,
  N: OropharynxNegN
): OropharynxNegStage {
  // IVB: T4b any N OR any N3
  if (T === "T4b" || N === "N3a" || N === "N3b") return "IVB";

  // I: T1 N0
  if (T === "T1" && N === "N0") return "I";

  // II: T2 N0
  if (T === "T2" && N === "N0") return "II";

  // III: T3 N0 OR T1–T3 N1
  if (
    (T === "T3" && N === "N0") ||
    (N === "N1" && (T === "T1" || T === "T2" || T === "T3"))
  ) return "III";

  // IVA: T4a N0–N2 OR T1–T3 N2
  return "IVA";
}

// -----------------------------
// Dev-only invariants
// -----------------------------

if (process.env.NODE_ENV !== "production") {
  const Ns: OropharynxNegN[] = ["N0", "N1", "N2a", "N2b", "N2c", "N3a", "N3b"];

  for (const N of Ns) {
    const stage = computeStageGroup_OropharynxHPVNeg("T4b", N);
    if (stage !== "IVB") {
      throw new Error(`Invariant failed: T4b ${N} staged as ${stage}`);
    }
  }
}
