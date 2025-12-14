// data/buccalMucosaCases.ts
import { OralCavityCase } from "@/lib/staging/types";

export const buccalMucosaCases: OralCavityCase[] = [
  {
    id: "bm-001",
    subsite: "buccal_mucosa",
    stem: {
      age: 58,
      sex: "M",
      risk: "tobacco",
      symptom: "ulcer along right cheek lining",
      laterality: "right",
    },
    tumor: {
      size_cm: 1.7,
      doi_mm: 4,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl:
      "Small buccal mucosa lesions with DOI ≤5 mm and no high-risk features are T1N0.",
  },
  {
    id: "bm-002",
    subsite: "buccal_mucosa",
    stem: {
      age: 64,
      sex: "F",
      risk: "none",
      symptom: "white patch that became ulcerated",
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
      "Size 2–4 cm and DOI 6–10 mm is typical T2 disease in AJCC8.",
  },
  {
    id: "bm-003",
    subsite: "buccal_mucosa",
    stem: {
      age: 72,
      sex: "M",
      risk: "both",
      symptom: "painful cheek mass",
      laterality: "right",
    },
    tumor: {
      size_cm: 3.8,
      doi_mm: 9,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl:
      "Buccal lesions approaching 4 cm without deep invasion are still T2 if DOI ≤10 mm.",
  },
  {
    id: "bm-004",
    subsite: "buccal_mucosa",
    stem: {
      age: 61,
      sex: "F",
      risk: "etoh",
      symptom: "ulcer with trismus",
      laterality: "left",
    },
    tumor: {
      size_cm: 4.5,
      doi_mm: 11,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl:
      "Tumors >4 cm or DOI >10 mm are T3 in oral cavity staging if no T4 features.",
  },
  {
    id: "bm-005",
    subsite: "buccal_mucosa",
    stem: {
      age: 69,
      sex: "M",
      risk: "tobacco",
      symptom: "buccal mass adherent to skin",
      laterality: "right",
    },
    tumor: {
      size_cm: 3.0,
      doi_mm: 8,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: true,
    },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl:
      "Skin invasion over the cheek is a T4a feature in buccal mucosa SCC.",
  },
  {
    id: "bm-006",
    subsite: "buccal_mucosa",
    stem: {
      age: 55,
      sex: "F",
      risk: "none",
      symptom: "small ulcer opposite molars",
      laterality: "left",
    },
    tumor: {
      size_cm: 1.2,
      doi_mm: 2,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 1,
      laterality: "ipsilateral",
      largest_node_cm: 2.4,
      ene: false,
    },
    teaching_pearl:
      "Single ipsilateral node ≤3 cm without ENE is N1 regardless of subsite.",
  },
  {
    id: "bm-007",
    subsite: "buccal_mucosa",
    stem: {
      age: 74,
      sex: "M",
      risk: "both",
      symptom: "painful cheek mass",
      laterality: "right",
    },
    tumor: {
      size_cm: 2.6,
      doi_mm: 7,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 1,
      laterality: "ipsilateral",
      largest_node_cm: 3.4,
      ene: false,
    },
    teaching_pearl:
      "Single ipsilateral node 3–6 cm without ENE is N2a in AJCC8.",
  },
  {
    id: "bm-008",
    subsite: "buccal_mucosa",
    stem: {
      age: 66,
      sex: "F",
      risk: "etoh",
      symptom: "friable buccal mass",
      laterality: "left",
    },
    tumor: {
      size_cm: 3.1,
      doi_mm: 8,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 3,
      laterality: "ipsilateral",
      largest_node_cm: 2.8,
      ene: false,
    },
    teaching_pearl:
      "Multiple ipsilateral nodes ≤6 cm without ENE stage as N2b.",
  },
  {
    id: "bm-009",
    subsite: "buccal_mucosa",
    stem: {
      age: 63,
      sex: "M",
      risk: "tobacco",
      symptom: "ulcerated buccal lesion",
      laterality: "right",
    },
    tumor: {
      size_cm: 2.0,
      doi_mm: 6,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 2,
      laterality: "bilateral",
      largest_node_cm: 2.2,
      ene: false,
    },
    teaching_pearl:
      "Bilateral cervical nodes ≤6 cm without ENE are N2c.",
  },
  {
    id: "bm-010",
    subsite: "buccal_mucosa",
    stem: {
      age: 70,
      sex: "F",
      risk: "none",
      symptom: "cheek mass with trismus",
      laterality: "left",
    },
    tumor: {
      size_cm: 4.2,
      doi_mm: 13,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 1,
      laterality: "ipsilateral",
      largest_node_cm: 6.7,
      ene: false,
    },
    teaching_pearl:
      "Any node >6 cm without ENE is N3a; this often corresponds to stage IVA/IVB.",
  },
  {
    id: "bm-011",
    subsite: "buccal_mucosa",
    stem: {
      age: 57,
      sex: "M",
      risk: "both",
      symptom: "ulcer adjacent to retromolar region",
      laterality: "right",
    },
    tumor: {
      size_cm: 2.8,
      doi_mm: 9,
      bone_invasion: false,
      extrinsic_muscle_involved: true,
      skin_invasion: false,
    },
    nodes: {
      node_count: 2,
      laterality: "ipsilateral",
      largest_node_cm: 3.0,
      ene: true,
    },
    teaching_pearl:
      "Extrinsic muscle involvement is T4a; ENE-positive nodes are N3b in this MVP logic.",
  },
  {
    id: "bm-012",
    subsite: "buccal_mucosa",
    stem: {
      age: 52,
      sex: "F",
      risk: "none",
      symptom: "small, nonpainful cheek lesion",
      laterality: "left",
    },
    tumor: {
      size_cm: 1.0,
      doi_mm: 1,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl:
      "Very superficial buccal lesions may still require careful DOI assessment despite benign appearance.",
  },
  {
    id: "bm-013",
    subsite: "buccal_mucosa",
    stem: {
      age: 76,
      sex: "M",
      risk: "tobacco",
      symptom: "large buccal ulcer with cheek fullness",
      laterality: "right",
    },
    tumor: {
      size_cm: 4.8,
      doi_mm: 16,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: true,
    },
    nodes: {
      node_count: 3,
      laterality: "ipsilateral",
      largest_node_cm: 2.9,
      ene: false,
    },
    teaching_pearl:
      "High T stage plus multiple ipsilateral nodes produces advanced stage grouping.",
  },
  {
    id: "bm-014",
    subsite: "buccal_mucosa",
    stem: {
      age: 60,
      sex: "F",
      risk: "etoh",
      symptom: "small ulcer near commissure",
      laterality: "right",
    },
    tumor: {
      size_cm: 1.9,
      doi_mm: 4,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 1,
      laterality: "ipsilateral",
      largest_node_cm: 2.0,
      ene: false,
    },
    teaching_pearl:
      "Node-negative vs. N1 disease significantly changes stage even when T stage is modest.",
  },
  {
    id: "bm-015",
    subsite: "buccal_mucosa",
    stem: {
      age: 68,
      sex: "M",
      risk: "both",
      symptom: "cheek mass abutting retromolar trigone",
      laterality: "left",
    },
    tumor: {
      size_cm: 3.3,
      doi_mm: 11,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl:
      "DOI >10 mm with size in the 2–4 cm range is T3 even without nodal disease.",
  },
];
