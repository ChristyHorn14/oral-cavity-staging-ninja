// lib/staging/oropharynxHPVPosPath.ts

export type OropharynxT = "T0" | "T1" | "T2" | "T3" | "T4";
export type OropharynxPN = "N0" | "N1" | "N2";
export type OropharynxStage = "I" | "II" | "III";

export type OropharynxSubsite = "tonsil" | "base_of_tongue" | "soft_palate" | "pharyngeal_wall";

export interface OropharynxTumorInputs {
  // AJCC8 HPV+ OPSCC pathologic-style MVP:
  // T based on size, plus a "T4 proxy" flag.
  size_cm: number;
  advanced_local_extension: boolean;
  primary_unknown?: boolean; // allows T0 if you want “unknown primary”
}

export interface OropharynxPathNodes {
  // HPV+ OPSCC pathologic N is node-count based; laterality is not used for pN.
  positive_node_count: number;
  // keep these for stem realism/teaching pearls if you want:
  laterality?: "ipsilateral" | "contralateral" | "bilateral" | "unknown";
  largest_node_cm?: number;
  ene?: boolean;
}

export function computeT_OropharynxHPVPos_Path(t: OropharynxTumorInputs): OropharynxT {
  if (t.primary_unknown) return "T0";
  if (t.advanced_local_extension) return "T4";
  if (t.size_cm > 4) return "T3";
  if (t.size_cm > 2) return "T2";
  return "T1";
}

export function computeN_OropharynxHPVPos_Path(n: OropharynxPathNodes): OropharynxPN {
  const k = n.positive_node_count ?? 0;
  if (k === 0) return "N0";
  if (k <= 4) return "N1";
  return "N2";
}

// AJCC8 HPV+ OPSCC (pathologic) stage groups (M0 assumed):
// Stage I:   (T0–T2) with (N0–N1)
// Stage II:  (T0–T2 with N2) OR (T3–T4 with N0–N1)
// Stage III: any T with N2  (in many simplified teaching versions, N2 dominates; we’ll keep the canonical mapping below)
//
// The cleanest rule set for code (M0):
// - If N2 → Stage III
// - Else (N0–N1):
//    - If T3 or T4 → Stage II
//    - Else (T0–T2) → Stage I
export function computeStageGroup_OropharynxHPVPos_Path(T: OropharynxT, N: OropharynxPN): OropharynxStage {
  if (N === "N2") return "III";
  if (T === "T3" || T === "T4") return "II";
  return "I";
}
