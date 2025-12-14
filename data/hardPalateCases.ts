// data/hardPalateCases.ts
import { OralCavityCase } from "@/lib/staging/types";

export const hardPalateCases: OralCavityCase[] = [
  {
    id: "hp-001",
    subsite: "hard_palate",
    stem: {
      age: 62,
      sex: "F",
      risk: "none",
      symptom: "ulcer on the hard palate",
      laterality: "midline",
    },
    tumor: {
      size_cm: 1.4,
      doi_mm: 3,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl:
      "Small hard palate lesions with shallow DOI and no bone invasion are T1N0.",
  },
  {
    id: "hp-002",
    subsite: "hard_palate",
    stem: {
      age: 70,
      sex: "M",
      risk: "tobacco",
      symptom: "erythroplakia of the palate",
      laterality: "left",
    },
    tumor: {
      size_cm: 2.6,
      doi_mm: 6,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl:
      "Hard palate lesions follow the same size/DOI thresholds as other oral cavity sites.",
  },
  {
    id: "hp-003",
    subsite: "hard_palate",
    stem: {
      age: 68,
      sex: "F",
      risk: "etoh",
      symptom: "palatal mass causing discomfort",
      laterality: "midline",
    },
    tumor: {
      size_cm: 3.5,
      doi_mm: 9,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl:
      "Size near 4 cm with modest DOI still fits T2 if DOI ≤10 mm and no T4 features.",
  },
  {
    id: "hp-004",
    subsite: "hard_palate",
    stem: {
      age: 74,
      sex: "M",
      risk: "both",
      symptom: "palatal ulcer with oronasal regurgitation",
      laterality: "midline",
    },
    tumor: {
      size_cm: 3.0,
      doi_mm: 8,
      bone_invasion: true,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl:
      "Bony invasion of the hard palate/maxilla is a T4a feature.",
  },
  {
    id: "hp-005",
    subsite: "hard_palate",
    stem: {
      age: 59,
      sex: "F",
      risk: "none",
      symptom: "small ulcer near palatal raphe",
      laterality: "midline",
    },
    tumor: {
      size_cm: 1.2,
      doi_mm: 6,
      bone_invasion: false,
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
      "T1 or T2 tumors with a single small ipsilateral node are often staged as stage III.",
  },
  {
    id: "hp-006",
    subsite: "hard_palate",
    stem: {
      age: 66,
      sex: "M",
      risk: "tobacco",
      symptom: "palatal mass",
      laterality: "left",
    },
    tumor: {
      size_cm: 2.8,
      doi_mm: 7,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 1,
      laterality: "ipsilateral",
      largest_node_cm: 3.3,
      ene: false,
    },
    teaching_pearl:
      "Single ipsilateral node 3–6 cm without ENE is N2a across oral cavity subsites.",
  },
  {
    id: "hp-007",
    subsite: "hard_palate",
    stem: {
      age: 72,
      sex: "F",
      risk: "etoh",
      symptom: "painful palatal ulcer",
      laterality: "right",
    },
    tumor: {
      size_cm: 3.0,
      doi_mm: 11,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 0,
      laterality: "none",
      largest_node_cm: 0,
      ene: false,
    },
    teaching_pearl:
      "DOI >10 mm with size 2–4 cm is T3 even if clinically looks ‘moderate’ in size.",
  },
  {
    id: "hp-008",
    subsite: "hard_palate",
    stem: {
      age: 63,
      sex: "M",
      risk: "both",
      symptom: "palatal mass with nasal regurgitation",
      laterality: "midline",
    },
    tumor: {
      size_cm: 4.6,
      doi_mm: 14,
      bone_invasion: true,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 2,
      laterality: "ipsilateral",
      largest_node_cm: 2.9,
      ene: false,
    },
    teaching_pearl:
      "Extensive T4a disease plus multiple nodes typically corresponds to advanced stage (often IVA).",
  },
  {
    id: "hp-009",
    subsite: "hard_palate",
    stem: {
      age: 57,
      sex: "F",
      risk: "none",
      symptom: "small palatal lesion discovered incidentally",
      laterality: "midline",
    },
    tumor: {
      size_cm: 0.9,
      doi_mm: 1,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl:
      "Subcentimeter lesions with minimal DOI are classic early T1 disease.",
  },
  {
    id: "hp-010",
    subsite: "hard_palate",
    stem: {
      age: 75,
      sex: "M",
      risk: "tobacco",
      symptom: "palatal mass with bilateral neck nodes",
      laterality: "midline",
    },
    tumor: {
      size_cm: 3.7,
      doi_mm: 9,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 3,
      laterality: "bilateral",
      largest_node_cm: 3.0,
      ene: false,
    },
    teaching_pearl:
      "Bilateral nodes ≤6 cm without ENE correspond to N2c regardless of oral cavity subsite.",
  },
  {
    id: "hp-011",
    subsite: "hard_palate",
    stem: {
      age: 69,
      sex: "F",
      risk: "both",
      symptom: "palatal mass with contralateral neck node",
      laterality: "left",
    },
    tumor: {
      size_cm: 2.1,
      doi_mm: 6,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 1,
      laterality: "contralateral",
      largest_node_cm: 2.5,
      ene: false,
    },
    teaching_pearl:
      "Contralateral nodal disease ≤6 cm without ENE is staged N2c.",
  },
  {
    id: "hp-012",
    subsite: "hard_palate",
    stem: {
      age: 60,
      sex: "M",
      risk: "none",
      symptom: "ulcer on right hard palate",
      laterality: "right",
    },
    tumor: {
      size_cm: 2.0,
      doi_mm: 4,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 1,
      laterality: "ipsilateral",
      largest_node_cm: 6.4,
      ene: false,
    },
    teaching_pearl:
      "A node >6 cm but without ENE pushes nodal staging to N3a.",
  },
  {
    id: "hp-013",
    subsite: "hard_palate",
    stem: {
      age: 73,
      sex: "F",
      risk: "etoh",
      symptom: "palatal ulcer with nasal obstruction",
      laterality: "midline",
    },
    tumor: {
      size_cm: 3.2,
      doi_mm: 8,
      bone_invasion: true,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 2,
      laterality: "ipsilateral",
      largest_node_cm: 2.6,
      ene: true,
    },
    teaching_pearl:
      "Any ENE-positive node is N3b in this simplified oral cavity nodal logic.",
  },
  {
    id: "hp-014",
    subsite: "hard_palate",
    stem: {
      age: 65,
      sex: "M",
      risk: "tobacco",
      symptom: "small palatal ulcer",
      laterality: "left",
    },
    tumor: {
      size_cm: 1.6,
      doi_mm: 5,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl:
      "Early hard palate lesions still require careful assessment of maxillary bone on imaging.",
  },
  {
    id: "hp-015",
    subsite: "hard_palate",
    stem: {
      age: 71,
      sex: "F",
      risk: "none",
      symptom: "palatal mass causing speech change",
      laterality: "midline",
    },
    tumor: {
      size_cm: 4.3,
      doi_mm: 12,
      bone_invasion: false,
      extrinsic_muscle_involved: false,
      skin_invasion: false,
    },
    nodes: {
      node_count: 0,
      laterality: "none",
      largest_node_cm: 0,
      ene: false,
    },
    teaching_pearl:
      "Large T3 lesions on the hard palate can still be node-negative; stage group hinges on nodal status.",
  },
];
