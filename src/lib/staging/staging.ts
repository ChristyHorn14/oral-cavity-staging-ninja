import { TumorInputs, NodeInputs, TCategory, NCategory, StageGroup } from "./types";

export function computeT(t: TumorInputs): TCategory {
  // MVP oral cavity simplification
  if (t.bone_invasion || t.skin_invasion || t.extrinsic_muscle_involved) return "T4a";
  if (t.size_cm > 4 || t.doi_mm > 10) return "T3";
  if ((t.size_cm > 2 && t.size_cm <= 4) || (t.size_cm <= 2 && t.doi_mm > 5 && t.doi_mm <= 10))
    return "T2";
  return "T1";
}

export function computeN(n: NodeInputs): NCategory {
  if (n.node_count === 0) return "N0";
  if (n.ene) return "N3b";

  if (n.laterality === "bilateral" || n.laterality === "contralateral") return "N2c";

  // ipsilateral, ENE-negative
  if (n.node_count === 1 && n.largest_node_cm <= 3) return "N1";
  if (n.node_count === 1 && n.largest_node_cm > 3 && n.largest_node_cm <= 6) return "N2a";
  if (n.largest_node_cm > 6) return "N3a";
  if (n.node_count >= 2 && n.largest_node_cm <= 6) return "N2b";

  return "N2b";
}

export function computeStageGroup(T: TCategory, N: NCategory): StageGroup {
  if (T === "T1" && N === "N0") return "I";
  if (T === "T2" && N === "N0") return "II";

  // Stage III: T3N0 OR (T1–T3 with N1)
  if ((T === "T3" && N === "N0") || (["T1", "T2", "T3"].includes(T) && N === "N1")) return "III";

  // Stage IVB: any N3
  if (N === "N3a" || N === "N3b") return "IVB";

  // Stage IVA: T4a OR any N2
  if (T === "T4a" || ["N2a", "N2b", "N2c"].includes(N)) return "IVA";

  return "IVA";
}
