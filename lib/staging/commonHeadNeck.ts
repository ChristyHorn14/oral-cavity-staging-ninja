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

// HPV-negative style nodal staging used across most non-OP sites (larynx, hypopharynx, oral cavity, etc.)
export function computeN_HeadNeckHPVNeg(n: HeadNeckNodes): HeadNeckN {
  const count = typeof n.positive_node_count === "number" ? n.positive_node_count : 0;
  const lat = n.laterality ?? "unknown";
  const size = typeof n.largest_node_cm === "number" ? n.largest_node_cm : 0;
  const ene = Boolean(n.ene);

  // N0
  if (count === 0) return "N0";

  // ENE+ => N3b (MVP simplification you already had)
  if (ene) return "N3b";

  // Size > 6 cm (ENE-) => N3a
  if (size > 6) return "N3a";

  // Contralateral or bilateral (ENE-, size <= 6) => N2c
  if (lat === "contralateral" || lat === "bilateral") {
    return "N2c";
  }

  // Ipsilateral logic (ENE-, size <= 6)
  if (lat === "ipsilateral") {
    // single ipsi <=3 => N1
    if (count === 1 && size <= 3) return "N1";

    // single ipsi >3 and <=6 => N2a
    if (count === 1 && size > 3 && size <= 6) return "N2a";

    // multiple ipsi, all <=6 => N2b
    if (count >= 2) return "N2b";

    // fallback
    return "N2b";
  }

  // Unknown laterality: be conservative but not wrong-mostly
  // If single small node, call it N1-ish; otherwise N2b-ish.
  if (count === 1 && size <= 3) return "N1";
  if (count === 1 && size <= 6) return "N2a";
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
