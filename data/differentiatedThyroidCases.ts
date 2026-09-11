// data/differentiatedThyroidCases.ts
//
// AJCC 8th edition differentiated thyroid carcinoma staging cases.
// Includes papillary and follicular-pattern differentiated thyroid carcinoma.
// Curriculum design: size boundaries -> ETE boundaries -> nodal geography -> age/stage grouping -> mixed cases.

export type DifferentiatedThyroidT =
  | "T1a"
  | "T1b"
  | "T2"
  | "T3a"
  | "T3b"
  | "T4a"
  | "T4b";

export type DifferentiatedThyroidN = "N0" | "N1a" | "N1b";
export type DifferentiatedThyroidStage = "I" | "II" | "III" | "IVA";

export type DifferentiatedThyroidCase = {
  site_group: "differentiated_thyroid";
  id: string;
  prompt: string;
  age: number;
  histology: "papillary" | "follicular" | "oncocytic";

  tumor: {
    max_dimension_cm: number;
    gross_extrathyroidal_extension:
      | "none"
      | "strap_muscles_only"
      | "subcutaneous_soft_tissue"
      | "larynx"
      | "trachea"
      | "esophagus"
      | "recurrent_laryngeal_nerve"
      | "prevertebral_fascia"
      | "carotid_encasement"
      | "mediastinal_vessel_encasement";
    multifocal: boolean;
  };
  expectedT: DifferentiatedThyroidT;

  nodes: {
    involved: boolean;
    compartments: Array<
      | "level_VI"
      | "level_VII"
      | "lateral_neck"
      | "retropharyngeal"
    >;
    laterality: "none" | "ipsilateral" | "contralateral" | "bilateral";
    largest_node_cm: number;
    ene: boolean;
  };
  expectedN: DifferentiatedThyroidN;

  expectedStage: DifferentiatedThyroidStage;

  teaching_pearl: string;
};

export const differentiatedThyroidCases: DifferentiatedThyroidCase[] = [
  // --- T-SIZE BOUNDARIES ---
  {
    site_group: "differentiated_thyroid",
    id: "thyroid-001",
    prompt:
      "63-year-old woman with a 0.8 cm papillary thyroid carcinoma confined to the right thyroid lobe. No extrathyroidal extension, nodal disease, or distant metastasis is identified.",
    age: 63,
    histology: "papillary",
    tumor: {
      max_dimension_cm: 0.8,
      gross_extrathyroidal_extension: "none",
      multifocal: false,
    },
    expectedT: "T1a",
    nodes: { involved: false, compartments: [], laterality: "none", largest_node_cm: 0, ene: false },
    expectedN: "N0",
    expectedStage: "I",
    teaching_pearl: "A tumor ≤1 cm confined to the thyroid is T1a.",
  },
  {
    site_group: "differentiated_thyroid",
    id: "thyroid-002",
    prompt:
      "63-year-old woman with a 1.0 cm papillary thyroid carcinoma confined to the thyroid. No regional or distant disease is identified.",
    age: 63,
    histology: "papillary",
    tumor: {
      max_dimension_cm: 1.0,
      gross_extrathyroidal_extension: "none",
      multifocal: false,
    },
    expectedT: "T1a",
    nodes: { involved: false, compartments: [], laterality: "none", largest_node_cm: 0, ene: false },
    expectedN: "N0",
    expectedStage: "I",
    teaching_pearl: "Exactly 1.0 cm remains T1a; T1b begins above 1 cm.",
  },
  {
    site_group: "differentiated_thyroid",
    id: "thyroid-003",
    prompt:
      "63-year-old man with a 1.1 cm follicular thyroid carcinoma confined to the thyroid. Imaging shows no nodal or distant metastases.",
    age: 63,
    histology: "follicular",
    tumor: {
      max_dimension_cm: 1.1,
      gross_extrathyroidal_extension: "none",
      multifocal: false,
    },
    expectedT: "T1b",
    nodes: { involved: false, compartments: [], laterality: "none", largest_node_cm: 0, ene: false },
    expectedN: "N0",
    expectedStage: "I",
    teaching_pearl: ">1 cm but ≤2 cm and confined to the thyroid = T1b.",
  },
  {
    site_group: "differentiated_thyroid",
    id: "thyroid-004",
    prompt:
      "66-year-old woman with a 2.0 cm papillary thyroid carcinoma entirely within the thyroid gland. No nodal or distant disease is seen.",
    age: 66,
    histology: "papillary",
    tumor: {
      max_dimension_cm: 2.0,
      gross_extrathyroidal_extension: "none",
      multifocal: false,
    },
    expectedT: "T1b",
    nodes: { involved: false, compartments: [], laterality: "none", largest_node_cm: 0, ene: false },
    expectedN: "N0",
    expectedStage: "I",
    teaching_pearl: "Exactly 2.0 cm remains T1b; T2 begins above 2 cm.",
  },
  {
    site_group: "differentiated_thyroid",
    id: "thyroid-005",
    prompt:
      "61-year-old man with a 2.1 cm oncocytic thyroid carcinoma confined to the thyroid. There is no regional nodal or distant metastatic disease.",
    age: 61,
    histology: "oncocytic",
    tumor: {
      max_dimension_cm: 2.1,
      gross_extrathyroidal_extension: "none",
      multifocal: false,
    },
    expectedT: "T2",
    nodes: { involved: false, compartments: [], laterality: "none", largest_node_cm: 0, ene: false },
    expectedN: "N0",
    expectedStage: "I",
    teaching_pearl: ">2 cm but ≤4 cm and confined to the thyroid = T2.",
  },
  {
    site_group: "differentiated_thyroid",
    id: "thyroid-006",
    prompt:
      "70-year-old woman with a 4.0 cm papillary thyroid carcinoma confined to the thyroid. No nodal or distant disease is identified.",
    age: 70,
    histology: "papillary",
    tumor: {
      max_dimension_cm: 4.0,
      gross_extrathyroidal_extension: "none",
      multifocal: false,
    },
    expectedT: "T2",
    nodes: { involved: false, compartments: [], laterality: "none", largest_node_cm: 0, ene: false },
    expectedN: "N0",
    expectedStage: "I",
    teaching_pearl: "Exactly 4.0 cm remains T2; T3a requires >4 cm.",
  },
  {
    site_group: "differentiated_thyroid",
    id: "thyroid-007",
    prompt:
      "70-year-old woman with a 4.1 cm papillary thyroid carcinoma that remains confined to the thyroid. No nodal or distant disease is identified.",
    age: 70,
    histology: "papillary",
    tumor: {
      max_dimension_cm: 4.1,
      gross_extrathyroidal_extension: "none",
      multifocal: false,
    },
    expectedT: "T3a",
    nodes: { involved: false, compartments: [], laterality: "none", largest_node_cm: 0, ene: false },
    expectedN: "N0",
    expectedStage: "II",
    teaching_pearl: ">4 cm while still confined to the thyroid = T3a; in a patient ≥55, T3 M0 is stage II.",
  },

  // --- EXTRATHYROIDAL EXTENSION ---
  {
    site_group: "differentiated_thyroid",
    id: "thyroid-009",
    prompt:
      "Examination and contrast-enhanced imaging show a 1.8 cm papillary thyroid carcinoma with gross invasion limited to the sternothyroid and sternohyoid muscles. No cervical nodal disease is identified.",
    age: 68,
    histology: "papillary",
    tumor: {
      max_dimension_cm: 1.8,
      gross_extrathyroidal_extension: "strap_muscles_only",
      multifocal: false,
    },
    expectedT: "T3b",
    nodes: { involved: false, compartments: [], laterality: "none", largest_node_cm: 0, ene: false },
    expectedN: "N0",
    expectedStage: "II",
    teaching_pearl: "Gross invasion limited to the strap muscles is T3b regardless of primary tumor size.",
  },
  {
    site_group: "differentiated_thyroid",
    id: "thyroid-010",
    prompt:
      "72-year-old woman with papillary thyroid carcinoma directly invading the recurrent laryngeal nerve, producing preoperative ipsilateral vocal fold paralysis. No distant metastasis is present.",
    age: 72,
    histology: "papillary",
    tumor: {
      max_dimension_cm: 2.6,
      gross_extrathyroidal_extension: "recurrent_laryngeal_nerve",
      multifocal: false,
    },
    expectedT: "T4a",
    nodes: { involved: false, compartments: [], laterality: "none", largest_node_cm: 0, ene: false },
    expectedN: "N0",
    expectedStage: "III",
    teaching_pearl: "Gross invasion of the recurrent laryngeal nerve is T4a; for age ≥55 with M0, T4a is stage III.",
  },
  {
    site_group: "differentiated_thyroid",
    id: "thyroid-011",
    prompt:
      "59-year-old man with a 3.2 cm follicular thyroid carcinoma that grossly invades the tracheal wall. No distant metastasis is identified.",
    age: 59,
    histology: "follicular",
    tumor: {
      max_dimension_cm: 3.2,
      gross_extrathyroidal_extension: "trachea",
      multifocal: false,
    },
    expectedT: "T4a",
    nodes: { involved: false, compartments: [], laterality: "none", largest_node_cm: 0, ene: false },
    expectedN: "N0",
    expectedStage: "III",
    teaching_pearl: "Gross invasion of the trachea, larynx, esophagus, subcutaneous soft tissue, or RLN is T4a.",
  },
  {
    site_group: "differentiated_thyroid",
    id: "thyroid-012",
    prompt:
      "67-year-old man with locally advanced papillary thyroid carcinoma. Imaging demonstrates tumor encasement of the common carotid artery without distant metastasis.",
    age: 67,
    histology: "papillary",
    tumor: {
      max_dimension_cm: 4.8,
      gross_extrathyroidal_extension: "carotid_encasement",
      multifocal: false,
    },
    expectedT: "T4b",
    nodes: { involved: true, compartments: ["lateral_neck"], laterality: "ipsilateral", largest_node_cm: 2.4, ene: false },
    expectedN: "N1b",
    expectedStage: "IVA",
    teaching_pearl: "Carotid encasement, mediastinal vessel encasement, or invasion of prevertebral fascia is T4b; age ≥55 with M0 is stage IVA.",
  },

  // --- NODAL GEOGRAPHY ---
  {
    site_group: "differentiated_thyroid",
    id: "thyroid-013",
    prompt:
      "62-year-old woman with a 1.4 cm intrathyroidal papillary thyroid carcinoma. A metastatic 1.2 cm pretracheal lymph node in level VI is identified. There is no distant metastasis.",
    age: 62,
    histology: "papillary",
    tumor: {
      max_dimension_cm: 1.4,
      gross_extrathyroidal_extension: "none",
      multifocal: false,
    },
    expectedT: "T1b",
    nodes: { involved: true, compartments: ["level_VI"], laterality: "ipsilateral", largest_node_cm: 1.2, ene: false },
    expectedN: "N1a",
    expectedStage: "II",
    teaching_pearl: "Central compartment level VI nodes are N1a; in patients ≥55, T1–T2 N1 M0 is stage II.",
  },
  {
    site_group: "differentiated_thyroid",
    id: "thyroid-014",
    prompt:
      "65-year-old man with a 2.8 cm intrathyroidal papillary thyroid carcinoma and metastatic upper mediastinal lymph nodes immediately below the sternal notch (level VII). No lateral neck disease or distant metastasis is present.",
    age: 65,
    histology: "papillary",
    tumor: {
      max_dimension_cm: 2.8,
      gross_extrathyroidal_extension: "none",
      multifocal: false,
    },
    expectedT: "T2",
    nodes: { involved: true, compartments: ["level_VII"], laterality: "ipsilateral", largest_node_cm: 1.8, ene: false },
    expectedN: "N1a",
    expectedStage: "II",
    teaching_pearl: "Level VII (upper mediastinal) nodes are grouped with the central compartment as N1a.",
  },
  {
    site_group: "differentiated_thyroid",
    id: "thyroid-015",
    prompt:
      "60-year-old woman with a 1.6 cm intrathyroidal papillary thyroid carcinoma and a metastatic ipsilateral level III lymph node. There is no distant metastatic disease.",
    age: 60,
    histology: "papillary",
    tumor: {
      max_dimension_cm: 1.6,
      gross_extrathyroidal_extension: "none",
      multifocal: false,
    },
    expectedT: "T1b",
    nodes: { involved: true, compartments: ["lateral_neck"], laterality: "ipsilateral", largest_node_cm: 2.0, ene: false },
    expectedN: "N1b",
    expectedStage: "II",
    teaching_pearl: "Lateral cervical nodal disease is N1b, even when ipsilateral and small.",
  },
  {
    site_group: "differentiated_thyroid",
    id: "thyroid-016",
    prompt:
      "58-year-old man with a 3.0 cm intrathyroidal papillary thyroid carcinoma. Metastatic retropharyngeal lymphadenopathy is present, without distant metastasis.",
    age: 58,
    histology: "papillary",
    tumor: {
      max_dimension_cm: 3.0,
      gross_extrathyroidal_extension: "none",
      multifocal: false,
    },
    expectedT: "T2",
    nodes: { involved: true, compartments: ["retropharyngeal"], laterality: "ipsilateral", largest_node_cm: 1.5, ene: false },
    expectedN: "N1b",
    expectedStage: "II",
    teaching_pearl: "Retropharyngeal nodal metastasis is N1b in differentiated thyroid carcinoma.",
  },
  {
    site_group: "differentiated_thyroid",
    id: "thyroid-017",
    prompt:
      "69-year-old woman with a 1.9 cm intrathyroidal papillary thyroid carcinoma. She has bilateral lateral neck metastases, the largest measuring 5.8 cm with extranodal extension. No distant metastasis is identified.",
    age: 69,
    histology: "papillary",
    tumor: {
      max_dimension_cm: 1.9,
      gross_extrathyroidal_extension: "none",
      multifocal: false,
    },
    expectedT: "T1b",
    nodes: { involved: true, compartments: ["lateral_neck"], laterality: "bilateral", largest_node_cm: 5.8, ene: true },
    expectedN: "N1b",
    expectedStage: "II",
    teaching_pearl: "AJCC 8 thyroid N staging is based primarily on nodal compartment: large size, bilaterality, and ENE do not create N2/N3 categories.",
  },

  // --- AGE SWITCH ---
  {
    site_group: "differentiated_thyroid",
    id: "thyroid-018",
    prompt:
      "42-year-old woman with a 5.2 cm papillary thyroid carcinoma confined to the thyroid and metastatic bilateral lateral neck nodes. There is no distant metastasis.",
    age: 42,
    histology: "papillary",
    tumor: {
      max_dimension_cm: 5.2,
      gross_extrathyroidal_extension: "none",
      multifocal: false,
    },
    expectedT: "T3a",
    nodes: { involved: true, compartments: ["lateral_neck"], laterality: "bilateral", largest_node_cm: 3.3, ene: false },
    expectedN: "N1b",
    expectedStage: "I",
    teaching_pearl: "For differentiated thyroid cancer diagnosed before age 55, any T and any N with M0 is stage I.",
  },
  {
    site_group: "differentiated_thyroid",
    id: "thyroid-019",
    prompt:
      "62-year-old woman with a 5.2 cm papillary thyroid carcinoma confined to the thyroid and metastatic bilateral lateral neck nodes. There is no distant metastasis.",
    age: 62,
    histology: "papillary",
    tumor: {
      max_dimension_cm: 5.2,
      gross_extrathyroidal_extension: "none",
      multifocal: false,
    },
    expectedT: "T3a",
    nodes: { involved: true, compartments: ["lateral_neck"], laterality: "bilateral", largest_node_cm: 3.3, ene: false },
    expectedN: "N1b",
    expectedStage: "II",
    teaching_pearl: "The same T3aN1bM0 disease is stage II when the patient is ≥55; age changes the stage group, not TNM.",
  },
  {
    site_group: "differentiated_thyroid",
    id: "thyroid-020",
    prompt:
      "39-year-old man with papillary thyroid carcinoma grossly invading the trachea and metastatic contralateral lateral neck nodes. There is no distant metastasis.",
    age: 39,
    histology: "papillary",
    tumor: {
      max_dimension_cm: 3.8,
      gross_extrathyroidal_extension: "trachea",
      multifocal: false,
    },
    expectedT: "T4a",
    nodes: { involved: true, compartments: ["lateral_neck"], laterality: "contralateral", largest_node_cm: 2.7, ene: true },
    expectedN: "N1b",
    expectedStage: "I",
    teaching_pearl: "Even locally advanced T4a/N1b disease is stage I in a patient <55 if M0.",
  },

  // --- MIXED CLINICAL CHALLENGES ---
  {
    site_group: "differentiated_thyroid",
    id: "thyroid-023",
    prompt:
      "57-year-old woman has multifocal papillary thyroid carcinoma with foci measuring 0.6 cm, 0.9 cm, and 2.7 cm. All foci are confined to the thyroid. A metastatic Delphian node is present. There is no distant metastasis.",
    age: 57,
    histology: "papillary",
    tumor: {
      max_dimension_cm: 2.7,
      gross_extrathyroidal_extension: "none",
      multifocal: true,
    },
    expectedT: "T2",
    nodes: { involved: true, compartments: ["level_VI"], laterality: "ipsilateral", largest_node_cm: 0.9, ene: false },
    expectedN: "N1a",
    expectedStage: "II",
    teaching_pearl: "In multifocal differentiated thyroid carcinoma, T is determined by the largest focus; a Delphian/prelaryngeal node is level VI and therefore N1a.",
  },
  {
    site_group: "differentiated_thyroid",
    id: "thyroid-024",
    prompt:
      "MRI and endoscopy show a 3.6 cm papillary thyroid carcinoma grossly invading the esophageal muscular wall. Ultrasound and CT show ipsilateral level II-IV and central-compartment nodal metastases.",
    age: 64,
    histology: "papillary",
    tumor: {
      max_dimension_cm: 3.6,
      gross_extrathyroidal_extension: "esophagus",
      multifocal: false,
    },
    expectedT: "T4a",
    nodes: { involved: true, compartments: ["level_VI", "lateral_neck"], laterality: "ipsilateral", largest_node_cm: 4.6, ene: true },
    expectedN: "N1b",
    expectedStage: "III",
    teaching_pearl: "When both central and lateral nodes are involved, the lateral disease makes the nodal category N1b; T4a M0 is stage III at age ≥55 regardless of N category.",
  },
];
