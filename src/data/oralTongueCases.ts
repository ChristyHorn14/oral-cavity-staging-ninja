import { OralTongueCase } from "@/lib/staging/types";

export const oralTongueCases: OralTongueCase[] = [
  {
    id: "oc-tongue-001",
    subsite: "oral_tongue",
    stem: { age: 54, sex: "M", risk: "tobacco", symptom: "ulcer", laterality: "right" },
    tumor: {
      size_cm: 1.6,
      doi_mm: 4,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl: "T1 requires size ≤2 cm and DOI ≤5 mm.",
  },
  {
    id: "oc-tongue-002",
    subsite: "oral_tongue",
    stem: { age: 61, sex: "F", risk: "none", symptom: "ulcer", laterality: "left" },
    tumor: {
      size_cm: 1.8,
      doi_mm: 9,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl: "DOI 6–10 mm upgrades to T2 even if size ≤2 cm.",
  },
  {
    id: "oc-tongue-003",
    subsite: "oral_tongue",
    stem: { age: 58, sex: "M", risk: "both", symptom: "pain", laterality: "right" },
    tumor: {
      size_cm: 2.4,
      doi_mm: 14,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 1, laterality: "ipsilateral", largest_node_cm: 2.1, ene: false },
    teaching_pearl: "Any DOI >10 mm is T3 regardless of surface size.",
  },
  {
    id: "oc-tongue-004",
    subsite: "oral_tongue",
    stem: { age: 67, sex: "M", risk: "both", symptom: "mass", laterality: "left" },
    tumor: {
      size_cm: 3.5,
      doi_mm: 18,
      bone_invasion: true,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 1, laterality: "ipsilateral", largest_node_cm: 2.8, ene: false },
    teaching_pearl: "Cortical bone invasion (mandible/maxilla) makes oral cavity T4a.",
  },
  {
    id: "oc-tongue-005",
    subsite: "oral_tongue",
    stem: { age: 62, sex: "F", risk: "none", symptom: "pain", laterality: "right" },
    tumor: {
      size_cm: 2.2,
      doi_mm: 8,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 2, laterality: "ipsilateral", largest_node_cm: 3.4, ene: true },
    teaching_pearl: "Any ENE-positive node is N3b in AJCC8 oral cavity.",
  },
];
