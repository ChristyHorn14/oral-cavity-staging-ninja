// lib/staging/commonHeadNeck.ts
// Common AJCC 8 “classic” head & neck SCC logic (HPV-negative style)
// Shared by: oropharynx HPV-negative, larynx, hypopharynx (later), etc.

export type HeadNeckN = "N0" | "N1" | "N2a" | "N2b" | "N2c" | "N3a" | "N3b";
export type HeadNeckStage = "I" | "II" | "III" | "IVA" | "IVB";

export interface HeadNeckNodes {
  positive_node_count: number;
  laterality?: "ipsilateral" | "contralateral" | "bilateral" | "none" | "unknown";
  largest_node_cm: number;
  ene: boolean;
}

export function computeN_HeadNeckHPVNeg(n: HeadNeckNodes): HeadNeckN {
  if (n.positive_node_count === 0) return "N0";

  // ENE+ => N3b
  if (n.ene) return "N3b";

  // Node > 6 cm (ENE-) => N3a
  if (n.largest_node_cm > 6) return "N3a";

  // Single node
  if (n.positive_node_count === 1) {
    if (n.largest_node_cm <= 3) return "N1";
    return "N2a";
  }

  // Multiple nodes
  if (n.laterality === "bilateral" || n.laterality === "contralateral") return "N2c";
  return "N2b";
}

/**
 * Classic stage grouping pattern used across many HPV-negative H&N sites.
 *
 * Notes:
 * - T4b OR any N3 => IVB
 * - T4a contributes to IVA (unless N3/T4b)
 * - T1 N0 => I, T2 N0 => II
 * - T3 N0 or (T1–T3 N1) => III
 * - Else => IVA
 */
export function computeStageGroup_HeadNeckClassic<
  T extends string,
  N extends HeadNeckN
>(args: {
  T: T;
  N: N;
  isT4a: (T: T) => boolean;
  isT4b: (T: T) => boolean;
  isT1: (T: T) => boolean;
  isT2: (T: T) => boolean;
  isT3: (T: T) => boolean;
}): HeadNeckStage {
  const { T, N, isT4b, isT1, isT2, isT3 } = args;

  // IVB: T4b any N OR any N3
  if (isT4b(T) || N === "N3a" || N === "N3b") return "IVB";

  // I: T1 N0
  if (isT1(T) && N === "N0") return "I";

  // II: T2 N0
  if (isT2(T) && N === "N0") return "II";

  // III: T3 N0 OR T1–T3 with N1
  if ((isT3(T) && N === "N0") || (N === "N1" && (isT1(T) || isT2(T) || isT3(T)))) return "III";

  // IVA: everything else
  return "IVA";
}
