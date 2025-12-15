// lib/staging/oropharynxHPVNeg.ts

export type OropharynxNegT = "T0" | "T1" | "T2" | "T3" | "T4";
export type OropharynxNegN = "N0" | "N1" | "N2a" | "N2b" | "N2c" | "N3a" | "N3b";
export type OropharynxNegStage = "I" | "II" | "III" | "IVA" | "IVB"; // assume M0 for MVP

export interface OropharynxNegTumorInputs {
  size_cm: number;
  advanced_local_extension: boolean; // your existing “T4 proxy”
  primary_unknown?: boolean;         // allows T0
}

export interface OropharynxNegNodes {
  positive_node_count: number; // needed for N2b vs N1/N2a
  laterality: "none" | "ipsilateral" | "contralateral" | "bilateral" | "unknown";
  largest_node_cm: number;
  ene: boolean;
}

// T (simple MVP consistent with your HPV+ pattern)
export function computeT_OropharynxHPVNeg(t: OropharynxNegTumorInputs): OropharynxNegT {
  if (t.primary_unknown) return "T0";
  const size = t.size_cm ?? 0;
  if (Math.abs(size) < 1e-6) return "T0";
  if (t.advanced_local_extension) return "T4";
  if (size > 4) return "T3";
  if (size > 2) return "T2";
  return "T1";
}

// N (AJCC-style conventional nodes; MVP)
export function computeN_OropharynxHPVNeg(n: OropharynxNegNodes): OropharynxNegN {
  const k = n.positive_node_count ?? 0;
  const lat = n.laterality ?? "unknown";
  const d = n.largest_node_cm ?? 0;
  const ene = Boolean(n.ene);

  if (k === 0 || lat === "none") return "N0";

  // N3b: any ENE+ nodal disease (MVP)
  if (ene) return "N3b";

  // N3a: > 6 cm, ENE-
  if (d > 6) return "N3a";

  // N2c: bilateral or contralateral nodes, none > 6 cm, ENE-
  if (lat === "bilateral" || lat === "contralateral") return "N2c";

  // ipsilateral only, ENE-, <= 6 cm
  // N1: single ipsi <= 3 cm
  if (lat === "ipsilateral" && k === 1 && d <= 3) return "N1";

  // N2a: single ipsi >3 to 6 cm
  if (lat === "ipsilateral" && k === 1 && d > 3 && d <= 6) return "N2a";

  // N2b: multiple ipsi, none > 6 cm
  if (lat === "ipsilateral" && k > 1) return "N2b";

  // fallback (unknown laterality etc.)
  return "N2b";
}

// Stage grouping (M0 assumed, simplified but consistent)
export function computeStageGroup_OropharynxHPVNeg(T: OropharynxNegT, N: OropharynxNegN): OropharynxNegStage {
  // IVB: any N3 or T4 (in MVP we lump T4 here; you can split T4a/T4b later)
  if (N === "N3a" || N === "N3b" || T === "T4") return "IVB";

  // I: T1 N0
  if (T === "T1" && N === "N0") return "I";

  // II: T2 N0
  if (T === "T2" && N === "N0") return "II";

  // III: T3 N0 OR T1–T3 with N1
  if ((T === "T3" && N === "N0") || (N === "N1" && (T === "T1" || T === "T2" || T === "T3"))) return "III";

  // IVA: everything else that isn't IVB (mostly N2 disease with T1–T3)
  return "IVA";
}
