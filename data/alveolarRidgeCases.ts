// data/alveolarRidgeCases.ts
import { OralCavityCase } from "@/lib/staging/types";

export const alveolarRidgeCases: OralCavityCase[] = [
  {
    id: "ar-001",
    subsite: "alveolar_ridge",
    stem: {
      age: 65,
      sex: "M",
      risk: "tobacco",
      symptom: "loosening of lower teeth",
      laterality: "right",
    },
    tumor: {
      size_cm: 2.4,
      doi_mm: 6,
      bone_invasion: true,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl:
      "Mandibular cortical invasion by alveolar ridge SCC is a T4a feature in AJCC8.",
  },
  {
    id: "ar-002",
    subsite: "alveolar_ridge",
    stem: {
      age: 59,
      sex: "F",
      risk: "none",
      symptom: "small ulcer near upper molars",
      laterality: "left",
    },
    tumor: {
      size_cm: 1.5,
      doi_mm: 3,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl:
      "Lesions ≤2 cm with DOI ≤5 mm and no high-risk features are T1N0.",
  },
  {
    id: "ar-003",
    subsite: "alveolar_ridge",
    stem: {
      age: 72,
      sex: "M",
      risk: "both",
      symptom: "pain around lower premolars",
      laterality: "right",
    },
    tumor: {
      size_cm: 2.2,
      doi_mm: 7,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl:
      "DOI 6–10 mm upgrades small lesions to T2 even if the surface size is under 2 cm.",
  },
  {
    id: "ar-004",
    subsite: "alveolar_ridge",
    stem: {
      age: 63,
      sex: "F",
      risk: "etoh",
      symptom: "erythroleukoplakia around upper molars",
      laterality: "left",
    },
    tumor: {
      size_cm: 2.9,
      doi_mm: 4,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl:
      "Size 2–4 cm with DOI ≤10 mm is typically T2 in AJCC8 oral cavity.",
  },
  {
    id: "ar-005",
    subsite: "alveolar_ridge",
    stem: {
      age: 70,
      sex: "M",
      risk: "tobacco",
      symptom: "mass causing denture instability",
      laterality: "right",
    },
    tumor: {
      size_cm: 4.5,
      doi_mm: 9,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl:
      "Tumors >4 cm without T4 features are classified as T3 in AJCC8.",
  },
  {
    id: "ar-006",
    subsite: "alveolar_ridge",
    stem: {
      age: 68,
      sex: "F",
      risk: "none",
      symptom: "gingival mass",
      laterality: "right",
    },
    tumor: {
      size_cm: 1.8,
      doi_mm: 11,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl:
      "DOI >10 mm upgrades to T3 even when surface size is relatively small.",
  },
  {
    id: "ar-007",
    subsite: "alveolar_ridge",
    stem: {
      age: 61,
      sex: "M",
      risk: "tobacco",
      symptom: "ulcer at lower alveolar ridge",
      laterality: "left",
    },
    tumor: {
      size_cm: 2.3,
      doi_mm: 7,
      bone_invasion: true,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 1,
      laterality: "ipsilateral",
      largest_node_cm: 2.2,
      ene: false,
    },
    teaching_pearl:
      "T4a tumor with a single ipsilateral node ≤3 cm without ENE corresponds to N1.",
  },
  {
    id: "ar-008",
    subsite: "alveolar_ridge",
    stem: {
      age: 73,
      sex: "F",
      risk: "etoh",
      symptom: "palpable mass near upper canine region",
      laterality: "right",
    },
    tumor: {
      size_cm: 3.2,
      doi_mm: 8,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 1,
      laterality: "ipsilateral",
      largest_node_cm: 3.8,
      ene: false,
    },
    teaching_pearl:
      "Single ipsilateral node 3–6 cm without ENE is N2a in AJCC8.",
  },
  {
    id: "ar-009",
    subsite: "alveolar_ridge",
    stem: {
      age: 58,
      sex: "M",
      risk: "both",
      symptom: "gingival bleeding and mass",
      laterality: "left",
    },
    tumor: {
      size_cm: 3.0,
      doi_mm: 9,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 3,
      laterality: "ipsilateral",
      largest_node_cm: 2.5,
      ene: false,
    },
    teaching_pearl:
      "Multiple ipsilateral nodes ≤6 cm without ENE are staged N2b.",
  },
  {
    id: "ar-010",
    subsite: "alveolar_ridge",
    stem: {
      age: 67,
      sex: "F",
      risk: "none",
      symptom: "ulcerated lesion around lower molars",
      laterality: "right",
    },
    tumor: {
      size_cm: 2.0,
      doi_mm: 5,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 1,
      laterality: "contralateral",
      largest_node_cm: 2.0,
      ene: false,
    },
    teaching_pearl:
      "Any contralateral nodal disease ≤6 cm without ENE is N2c.",
  },
  {
    id: "ar-011",
    subsite: "alveolar_ridge",
    stem: {
      age: 62,
      sex: "M",
      risk: "tobacco",
      symptom: "painful gingival mass",
      laterality: "left",
    },
    tumor: {
      size_cm: 3.6,
      doi_mm: 12,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 1,
      laterality: "ipsilateral",
      largest_node_cm: 6.5,
      ene: false,
    },
    teaching_pearl:
      "A node >6 cm without ENE is N3a in AJCC8 nodal staging.",
  },
  {
    id: "ar-012",
    subsite: "alveolar_ridge",
    stem: {
      age: 69,
      sex: "F",
      risk: "both",
      symptom: "gingival mass and jaw pain",
      laterality: "right",
    },
    tumor: {
      size_cm: 3.1,
      doi_mm: 9,
      bone_invasion: true,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 2,
      laterality: "ipsilateral",
      largest_node_cm: 3.2,
      ene: true,
    },
    teaching_pearl:
      "Any ENE-positive node is N3b, regardless of size in this MVP logic.",
  },
  {
    id: "ar-013",
    subsite: "alveolar_ridge",
    stem: {
      age: 55,
      sex: "M",
      risk: "tobacco",
      symptom: "small gingival mass",
      laterality: "left",
    },
    tumor: {
      size_cm: 1.1,
      doi_mm: 2,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl:
      "Classic early alveolar ridge case: T1N0, good for pattern recognition.",
  },
  {
    id: "ar-014",
    subsite: "alveolar_ridge",
    stem: {
      age: 77,
      sex: "F",
      risk: "etoh",
      symptom: "maxillary gingival mass causing oroantral fistula",
      laterality: "right",
    },
    tumor: {
      size_cm: 3.5,
      doi_mm: 10,
      bone_invasion: true,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 1,
      laterality: "ipsilateral",
      largest_node_cm: 2.8,
      ene: false,
    },
    teaching_pearl:
      "Maxillary alveolar ridge tumors with bony invasion are also T4a.",
  },
  {
    id: "ar-015",
    subsite: "alveolar_ridge",
    stem: {
      age: 60,
      sex: "M",
      risk: "none",
      symptom: "gingival ulcer",
      laterality: "left",
    },
    tumor: {
      size_cm: 2.0,
      doi_mm: 4,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 2,
      laterality: "bilateral",
      largest_node_cm: 2.1,
      ene: false,
    },
    teaching_pearl:
      "Bilateral nodes ≤6 cm without ENE are considered N2c in AJCC8.",
  },
];
