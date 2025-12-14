// lib/staging/types.ts

export type TCategory = "T1" | "T2" | "T3" | "T4a";

export type NCategory =
  | "N0"
  | "N1"
  | "N2a"
  | "N2b"
  | "N2c"
  | "N3a"
  | "N3b";

export type StageGroup = "I" | "II" | "III" | "IVA" | "IVB";

export type Risk = "none" | "tobacco" | "etoh" | "both";
export type Sex = "M" | "F";
export type Laterality = "left" | "right" | "midline";
export type NodeLaterality = "none" | "ipsilateral" | "contralateral" | "bilateral";

export type OralCavitySubsite =
  | "oral_tongue"
  | "floor_of_mouth"
  | "alveolar_ridge"
  | "buccal_mucosa"
  | "hard_palate"
  | "retromolar_trigone";



export interface TumorFeatures {
  size_cm: number;
  doi_mm: number;
  bone_invasion: boolean;
  extrinsic_muscle_involved: boolean;
  skin_invasion: boolean;
}

export interface NodeFeatures {
  node_count: number;
  laterality: NodeLaterality;
  largest_node_cm: number;
  ene: boolean;
}

// Backwards-compatible aliases for existing staging.ts imports
export type TumorInputs = TumorFeatures;
export type NodeInputs = NodeFeatures;


export interface OralCavityCase {
  id: string;
  subsite: OralCavitySubsite;
  stem?: {
    age?: number;
    sex?: Sex;
    risk?: Risk;
    symptom?: string;
    laterality?: Laterality;
  };
  tumor: TumorFeatures;
  nodes: NodeFeatures;
  teaching_pearl: string;
}

// Backwards-compatible alias: existing code using OralTongueCase still works
export type OralTongueCase = OralCavityCase;
