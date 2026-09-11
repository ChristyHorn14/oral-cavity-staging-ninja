export type NasopharynxT = "T1" | "T2" | "T3" | "T4";
export type NasopharynxN = "N0" | "N1" | "N2" | "N3";
export type NasopharynxStage = "IA" | "IB" | "II" | "III";

export type NasopharynxTFeature =
  | "nasal_cavity"
  | "oropharynx"
  | "parapharyngeal_space"
  | "medial_pterygoid_muscle"
  | "lateral_pterygoid_muscle"
  | "prevertebral_muscle"
  | "unequivocal_skull_base_bone"
  | "unequivocal_pterygoid_bone"
  | "unequivocal_cervical_vertebra"
  | "paranasal_sinus"
  | "intracranial_extension"
  | "unequivocal_cranial_nerve_involvement"
  | "hypopharynx"
  | "orbit_or_inferior_orbital_fissure"
  | "parotid_gland"
  | "beyond_anterolateral_lateral_pterygoid";

export interface NasopharynxTumorInput {
  features: readonly NasopharynxTFeature[];
}

export interface NasopharynxNodesInput {
  cervical_laterality: "none" | "unilateral" | "bilateral";
  retropharyngeal_laterality: "none" | "unilateral" | "bilateral";
  largest_node_cm: number;
  extends_below_caudal_cricoid: boolean;
  advanced_ene_cervical: boolean;
  advanced_ene_retropharyngeal?: boolean;
}

const T4_FEATURES = new Set<NasopharynxTFeature>([
  "intracranial_extension",
  "unequivocal_cranial_nerve_involvement",
  "hypopharynx",
  "orbit_or_inferior_orbital_fissure",
  "parotid_gland",
  "beyond_anterolateral_lateral_pterygoid",
]);

const T3_FEATURES = new Set<NasopharynxTFeature>([
  "unequivocal_skull_base_bone",
  "unequivocal_pterygoid_bone",
  "unequivocal_cervical_vertebra",
  "paranasal_sinus",
]);

const T2_FEATURES = new Set<NasopharynxTFeature>([
  "parapharyngeal_space",
  "medial_pterygoid_muscle",
  "lateral_pterygoid_muscle",
  "prevertebral_muscle",
]);

export function computeT_Nasopharynx(tumor: NasopharynxTumorInput): NasopharynxT {
  if (tumor.features.some((feature) => T4_FEATURES.has(feature))) return "T4";
  if (tumor.features.some((feature) => T3_FEATURES.has(feature))) return "T3";
  if (tumor.features.some((feature) => T2_FEATURES.has(feature))) return "T2";
  return "T1";
}

export function computeN_Nasopharynx(nodes: NasopharynxNodesInput): NasopharynxN {
  const hasCervicalNodes = nodes.cervical_laterality !== "none";
  const hasRetropharyngealNodes = nodes.retropharyngeal_laterality !== "none";
  if (!hasCervicalNodes && !hasRetropharyngealNodes) return "N0";

  // Version 9 advanced ENE upgrades only cervical nodal disease. Advanced ENE
  // attributed solely to a retropharyngeal node is specifically excluded.
  if (
    hasCervicalNodes &&
    (nodes.largest_node_cm > 6 ||
      nodes.extends_below_caudal_cricoid ||
      nodes.advanced_ene_cervical)
  ) {
    return "N3";
  }

  if (nodes.cervical_laterality === "bilateral") return "N2";
  return "N1";
}

export function computeStageGroup_Nasopharynx(
  T: NasopharynxT,
  N: NasopharynxN,
): NasopharynxStage {
  if (T === "T4" || N === "N3") return "III";
  if (T === "T3" || N === "N2") return "II";
  return N === "N1" ? "IB" : "IA";
}

