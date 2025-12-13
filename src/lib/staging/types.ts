export type Laterality = "none" | "ipsilateral" | "contralateral" | "bilateral";

export type TumorInputs = {
  size_cm: number;
  doi_mm: number;
  bone_invasion: boolean;
  extrinsic_muscle_involved: boolean;
  skin_invasion: boolean;
};

export type NodeInputs = {
  node_count: number;
  laterality: Laterality;
  largest_node_cm: number; // 0 if node_count = 0
  ene: boolean;
};

export type TCategory = "T1" | "T2" | "T3" | "T4a";
export type NCategory = "N0" | "N1" | "N2a" | "N2b" | "N2c" | "N3a" | "N3b";
export type StageGroup = "I" | "II" | "III" | "IVA" | "IVB";

export type OralTongueCase = {
  id: string;
  subsite: "oral_tongue";
  stem?: {
    age?: number;
    sex?: "M" | "F";
    risk?: "tobacco" | "etoh" | "none" | "both";
    symptom?: "ulcer" | "pain" | "dysarthria" | "mass";
    laterality?: "right" | "left";
  };
  tumor: TumorInputs;
  nodes: NodeInputs;
  teaching_pearl: string;
};
