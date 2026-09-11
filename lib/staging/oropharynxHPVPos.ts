export type OropharynxHPVPosT = "T0" | "T1" | "T2" | "T3" | "T4";
export type OropharynxHPVPosN = "N0" | "N1" | "N2" | "N3";
export type OropharynxHPVPosStage = "I" | "II" | "III";

export type OropharynxT4Structure =
  | "larynx"
  | "deep_extrinsic_tongue_muscle"
  | "medial_pterygoid"
  | "hard_palate"
  | "mandible"
  | "beyond";

export interface OropharynxHPVPosTumorInput {
  size_cm: number;
  primary_unknown?: boolean;
  extends_to_lingual_epiglottis?: boolean;
  t4_structures?: readonly OropharynxT4Structure[];
}

export interface OropharynxHPVPosNodesInput {
  positive_node_count: number;
  laterality: "none" | "ipsilateral" | "contralateral" | "bilateral" | "unknown";
  largest_node_cm: number;
  unequivocal_imaging_ene: boolean;
}

export function computeT_OropharynxHPVPos(
  tumor: OropharynxHPVPosTumorInput,
): OropharynxHPVPosT {
  if (tumor.primary_unknown || tumor.size_cm === 0) return "T0";
  if (tumor.t4_structures?.length) return "T4";
  if (tumor.size_cm > 4 || tumor.extends_to_lingual_epiglottis) return "T3";
  if (tumor.size_cm > 2) return "T2";
  return "T1";
}

export function computeN_OropharynxHPVPos(
  nodes: OropharynxHPVPosNodesInput,
): OropharynxHPVPosN {
  if (nodes.positive_node_count === 0) return "N0";
  if (nodes.largest_node_cm > 6) return "N3";

  if (nodes.laterality === "bilateral") {
    return nodes.unequivocal_imaging_ene ? "N3" : "N2";
  }
  if (nodes.laterality === "contralateral") return "N2";
  return nodes.unequivocal_imaging_ene ? "N2" : "N1";
}

export function computeStageGroup_OropharynxHPVPos(
  T: OropharynxHPVPosT,
  N: OropharynxHPVPosN,
): OropharynxHPVPosStage {
  if (T === "T4" || N === "N3") return "III";
  if (T === "T3" || N === "N2") return "II";
  return "I";
}
