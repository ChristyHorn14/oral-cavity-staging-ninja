// data/retromolarTrigoneCases.ts
import { OralCavityCase } from "@/lib/staging/types";

export const retromolarTrigoneCases: OralCavityCase[] = [
  {
    id: "rt-001",
    subsite: "retromolar_trigone",
    stem: {
      age: 58,
      sex: "M",
      risk: "tobacco",
      symptom: "small ulcer behind last molar",
      laterality: "right",
    },
    tumor: {
      size_cm: 1.5,
      doi_mm: 4,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl:
      "Retromolar trigone lesions may look small but often have deeper invasion toward mandible.",
  },
  {
    id: "rt-002",
    subsite: "retromolar_trigone",
    stem: {
      age: 64,
      sex: "F",
      risk: "none",
      symptom: "ulcer with mild trismus",
      laterality: "left",
    },
    tumor: {
      size_cm: 2.4,
      doi_mm: 6,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl:
      "Size 2–4 cm with DOI 6–10 mm fits T2 if no bone or extrinsic muscle invasion.",
  },
  {
    id: "rt-003",
    subsite: "retromolar_trigone",
    stem: {
      age: 70,
      sex: "M",
      risk: "both",
      symptom: "retromolar mass with trismus",
      laterality: "right",
    },
    tumor: {
      size_cm: 3.3,
      doi_mm: 12,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl:
      "DOI >10 mm with size 2–4 cm is T3 even without radiographic bone invasion.",
  },
  {
    id: "rt-004",
    subsite: "retromolar_trigone",
    stem: {
      age: 61,
      sex: "F",
      risk: "etoh",
      symptom: "ulcer contacting mandibular ramus",
      laterality: "left",
    },
    tumor: {
      size_cm: 2.8,
      doi_mm: 8,
      bone_invasion: true,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl:
      "Mandibular invasion from the retromolar trigone is a classic T4a pattern.",
  },
  {
    id: "rt-005",
    subsite: "retromolar_trigone",
    stem: {
      age: 67,
      sex: "M",
      risk: "tobacco",
      symptom: "retromolar mass with jaw pain",
      laterality: "right",
    },
    tumor: {
      size_cm: 3.9,
      doi_mm: 9,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
      masticator_space_invasion: true,
    },
    nodes: {
      node_count: 1,
      laterality: "ipsilateral",
      largest_node_cm: 2.5,
      ene: false,
    },
    teaching_pearl:
      "Masticator-space invasion is T4b. Generic extrinsic tongue-muscle involvement is not an independent oral-cavity T4 criterion.",
  },
  {
    id: "rt-006",
    subsite: "retromolar_trigone",
    stem: {
      age: 55,
      sex: "F",
      risk: "none",
      symptom: "small ulcer behind left molar",
      laterality: "left",
    },
    tumor: {
      size_cm: 1.3,
      doi_mm: 3,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 1,
      laterality: "ipsilateral",
      largest_node_cm: 2.1,
      ene: false,
    },
    teaching_pearl:
      "Even small T1 tumors can present with N1 disease—key staging exam topic.",
  },
  {
    id: "rt-007",
    subsite: "retromolar_trigone",
    stem: {
      age: 73,
      sex: "M",
      risk: "both",
      symptom: "retromolar mass with ipsilateral neck node",
      laterality: "right",
    },
    tumor: {
      size_cm: 2.2,
      doi_mm: 7,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 1,
      laterality: "ipsilateral",
      largest_node_cm: 3.7,
      ene: false,
    },
    teaching_pearl:
      "Single ipsilateral node between 3–6 cm without clinically overt ENE is N2a in AJCC8.",
  },
  {
    id: "rt-008",
    subsite: "retromolar_trigone",
    stem: {
      age: 60,
      sex: "F",
      risk: "etoh",
      symptom: "retromolar lesion with multiple neck nodes",
      laterality: "left",
    },
    tumor: {
      size_cm: 3.0,
      doi_mm: 8,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 3,
      laterality: "ipsilateral",
      largest_node_cm: 2.9,
      ene: false,
    },
    teaching_pearl:
      "Multiple ipsilateral nodes ≤6 cm without clinically overt ENE are staged N2b.",
  },
  {
    id: "rt-009",
    subsite: "retromolar_trigone",
    stem: {
      age: 69,
      sex: "M",
      risk: "tobacco",
      symptom: "retromolar mass with bilateral level II nodes",
      laterality: "right",
    },
    tumor: {
      size_cm: 3.6,
      doi_mm: 9,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 2,
      laterality: "bilateral",
      largest_node_cm: 2.4,
      ene: false,
    },
    teaching_pearl:
      "Bilateral nodes ≤6 cm without clinically overt ENE correspond to N2c in oral cavity staging.",
  },
  {
    id: "rt-010",
    subsite: "retromolar_trigone",
    stem: {
      age: 62,
      sex: "F",
      risk: "none",
      symptom: "retromolar ulcer and contralateral neck fullness",
      laterality: "left",
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
      largest_node_cm: 2.3,
      ene: false,
    },
    teaching_pearl:
      "Any contralateral nodal disease ≤6 cm without clinically overt ENE is N2c, regardless of primary size.",
  },
  {
    id: "rt-011",
    subsite: "retromolar_trigone",
    stem: {
      age: 71,
      sex: "M",
      risk: "both",
      symptom: "retromolar mass with very large neck node",
      laterality: "right",
    },
    tumor: {
      size_cm: 4.4,
      doi_mm: 13,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 1,
      laterality: "ipsilateral",
      largest_node_cm: 6.8,
      ene: false,
    },
    teaching_pearl:
      "Size >4 cm together with DOI >10 mm makes the primary T4a; the >6 cm clinically ENE-negative node is N3a, producing stage IVB.",
  },
  {
    id: "rt-012",
    subsite: "retromolar_trigone",
    stem: {
      age: 65,
      sex: "F",
      risk: "none",
      symptom: "retromolar ulcer with clinically overt ENE-positive node",
      laterality: "left",
    },
    tumor: {
      size_cm: 2.5,
      doi_mm: 7,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 1,
      laterality: "ipsilateral",
      largest_node_cm: 2.9,
      ene: true,
    },
    teaching_pearl:
      "A single ipsilateral node ≤3 cm with clinically overt ENE is cN2a, not cN3b; cN3b requires a larger ipsilateral node or multiple/contralateral/bilateral clinically overt ENE-positive nodes.",
  },
  {
    id: "rt-013",
    subsite: "retromolar_trigone",
    stem: {
      age: 56,
      sex: "M",
      risk: "tobacco",
      symptom: "small retromolar ulcer",
      laterality: "right",
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
      "Early retromolar trigone lesions are easy to miss clinically; careful inspection is essential.",
  },
  {
    id: "rt-014",
    subsite: "retromolar_trigone",
    stem: {
      age: 78,
      sex: "F",
      risk: "etoh",
      symptom: "large retromolar mass with marked trismus",
      laterality: "left",
    },
    tumor: {
      size_cm: 4.9,
      doi_mm: 17,
      bone_invasion: true,
      extrinsic_muscle_involved: true,
      skin_invasion: false,
    },
    nodes: {
      node_count: 2,
      laterality: "ipsilateral",
      largest_node_cm: 3.2,
      ene: false,
    },
    teaching_pearl:
      "Very advanced T4a disease with multiple nodes—classic board-style retromolar trigone scenario.",
  },
  {
    id: "rt-015",
    subsite: "retromolar_trigone",
    stem: {
      age: 59,
      sex: "M",
      risk: "both",
      symptom: "retromolar ulcer with subtle jaw pain",
      laterality: "right",
    },
    tumor: {
      size_cm: 2.1,
      doi_mm: 10,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl:
      "Borderline DOI cases emphasize the importance of cross-sectional imaging for accurate T staging.",
  },
];
