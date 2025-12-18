// data/larynxSubglotticCases.ts
//
// Final intended filename.
// Non-leading prompts: vignette-style text that doesn’t telegraph the rule.
// Staging-relevant facts live in `inputs`.

import type { SubglotticTInputs, SubglotticT } from "@/lib/staging/larynxSubglotticStage";

export type LarynxSubglotticCase = {
  id: string;
  prompt: string;
  inputs: SubglotticTInputs;
  expectedT: SubglotticT;
  teaching_pearl: string;

  nodes: {
    positive_node_count: number;
    laterality: "none" | "ipsilateral" | "contralateral" | "bilateral" | "unknown";
    largest_node_cm: number;
    ene: boolean;
  };
};

export const larynxSubglotticCases: LarynxSubglotticCase[] = [
  {
    id: "subglottic-001",
    prompt:
      "64-year-old with progressive dyspnea and noisy breathing. Endoscopy shows a subglottic mass; no additional concerning extension is described in the note.",
    inputs: {
      primary_tumor_assessable: true,
      limited_to_subglottis: true,
      extends_to_vocal_cord: false,
      vocal_cord_mobility: "normal",
      paraglottic_space_invasion: false,
      thyroid_cartilage: "none",
      extralaryngeal_extension: "none",
      unresectable_feature: "none",
    },
    expectedT: "t1",
    teaching_pearl: "Subglottis only = T1 (no size/DOI cutoffs).",
    nodes: { positive_node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
  },
  {
    id: "subglottic-002",
    prompt:
      "58-year-old with hoarseness and mild dyspnea. Laryngoscopy notes subglottic disease with glottic-level involvement; cord motion is documented as present.",
    inputs: {
      primary_tumor_assessable: true,
      limited_to_subglottis: false,
      extends_to_vocal_cord: true,
      vocal_cord_mobility: "normal",
      paraglottic_space_invasion: false,
      thyroid_cartilage: "none",
      extralaryngeal_extension: "none",
      unresectable_feature: "none",
    },
    expectedT: "t2",
    teaching_pearl: "If it reaches cords and fixation isn’t established, it’s at least T2.",
    nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 2.3, ene: false },
  },
  {
    id: "subglottic-003",
    prompt:
      "71-year-old with several months of hoarseness. Endoscopy shows subglottic disease with glottic-level involvement; motion is reduced but not absent.",
    inputs: {
      primary_tumor_assessable: true,
      limited_to_subglottis: false,
      extends_to_vocal_cord: true,
      vocal_cord_mobility: "impaired",
      paraglottic_space_invasion: false,
      thyroid_cartilage: "none",
      extralaryngeal_extension: "none",
      unresectable_feature: "none",
    },
    expectedT: "t2",
    teaching_pearl: "Impaired mobility is not fixation; fixation is what bumps to T3.",
    nodes: { positive_node_count: 2, laterality: "ipsilateral", largest_node_cm: 3.4, ene: false },
  },
  {
    id: "subglottic-004",
    prompt:
      "62-year-old with hoarseness. Flexible laryngoscopy documents absent motion of the involved cord in the setting of subglottic disease.",
    inputs: {
      primary_tumor_assessable: true,
      limited_to_subglottis: false,
      extends_to_vocal_cord: true,
      vocal_cord_mobility: "fixed",
      paraglottic_space_invasion: false,
      thyroid_cartilage: "none",
      extralaryngeal_extension: "none",
      unresectable_feature: "none",
    },
    expectedT: "t3",
    teaching_pearl: "Cord fixation = T3 even without cartilage invasion.",
    nodes: { positive_node_count: 3, laterality: "ipsilateral", largest_node_cm: 4.2, ene: true },
  },
  {
    id: "subglottic-005",
    prompt:
      "66-year-old with airway symptoms. Imaging suggests deep space involvement associated with a subglottic primary; no extralaryngeal spread described.",
    inputs: {
      primary_tumor_assessable: true,
      limited_to_subglottis: false,
      extends_to_vocal_cord: false,
      vocal_cord_mobility: "unknown",
      paraglottic_space_invasion: true,
      thyroid_cartilage: "none",
      extralaryngeal_extension: "none",
      unresectable_feature: "none",
    },
    expectedT: "t3",
    teaching_pearl: "Paraglottic space invasion is a T3 feature.",
    nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 2.8, ene: false },
  },
  {
    id: "subglottic-006",
    prompt:
      "59-year-old. CT describes early cartilage involvement associated with subglottic malignancy; no definite extralaryngeal spread is reported.",
    inputs: {
      primary_tumor_assessable: true,
      limited_to_subglottis: false,
      extends_to_vocal_cord: false,
      vocal_cord_mobility: "unknown",
      paraglottic_space_invasion: false,
      thyroid_cartilage: "inner_cortex",
      extralaryngeal_extension: "none",
      unresectable_feature: "none",
    },
    expectedT: "t3",
    teaching_pearl: "Inner cortex thyroid cartilage erosion = at least T3.",
    nodes: { positive_node_count: 2, laterality: "bilateral", largest_node_cm: 3.0, ene: false },
  },
  {
    id: "subglottic-007",
    prompt:
      "70-year-old with hoarseness. Endoscopy notes subglottic disease with glottic-level involvement, but the exam doesn’t clearly document mobility.",
    inputs: {
      primary_tumor_assessable: true,
      limited_to_subglottis: false,
      extends_to_vocal_cord: true,
      paraglottic_space_invasion: false,
      thyroid_cartilage: "none",
      extralaryngeal_extension: "none",
      unresectable_feature: "none",
    },
    expectedT: "t2",
    teaching_pearl:
      "If it reaches cords and fixation isn’t documented, treat as T2 (unless other T3+ features).",
    nodes: { positive_node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
  },
  {
    id: "subglottic-008",
    prompt:
      "63-year-old with progressive airway compromise. Imaging shows full-thickness cartilage involvement.",
    inputs: {
      primary_tumor_assessable: true,
      limited_to_subglottis: false,
      extends_to_vocal_cord: false,
      vocal_cord_mobility: "unknown",
      paraglottic_space_invasion: false,
      thyroid_cartilage: "through",
      extralaryngeal_extension: "none",
      unresectable_feature: "none",
    },
    expectedT: "t4a",
    teaching_pearl: "Through thyroid cartilage = T4a.",
    nodes: { positive_node_count: 3, laterality: "ipsilateral", largest_node_cm: 5.0, ene: true },
  },
  {
    id: "subglottic-009",
    prompt:
      "56-year-old with dyspnea. Imaging documents subglottic malignancy with inferior extension below the cricoid.",
    inputs: {
      primary_tumor_assessable: true,
      limited_to_subglottis: false,
      extends_to_vocal_cord: false,
      vocal_cord_mobility: "unknown",
      paraglottic_space_invasion: false,
      thyroid_cartilage: "none",
      extralaryngeal_extension: "trachea",
      unresectable_feature: "none",
    },
    expectedT: "t4a",
    teaching_pearl: "Tracheal extension beyond the larynx = T4a.",
    nodes: { positive_node_count: 2, laterality: "ipsilateral", largest_node_cm: 3.9, ene: false },
  },
  {
    id: "subglottic-010",
    prompt:
      "68-year-old. CT describes subglottic tumor with spread into anterior neck soft tissues.",
    inputs: {
      primary_tumor_assessable: true,
      limited_to_subglottis: false,
      extends_to_vocal_cord: false,
      vocal_cord_mobility: "unknown",
      paraglottic_space_invasion: false,
      thyroid_cartilage: "none",
      extralaryngeal_extension: "soft_tissues_neck",
      unresectable_feature: "none",
    },
    expectedT: "t4a",
    teaching_pearl: "Extralaryngeal soft tissue invasion = T4a.",
    nodes: { positive_node_count: 1, laterality: "contralateral", largest_node_cm: 2.7, ene: false },
  },
  {
    id: "subglottic-011",
    prompt:
      "61-year-old. Imaging suggests direct extension into the thyroid gland from a subglottic primary.",
    inputs: {
      primary_tumor_assessable: true,
      limited_to_subglottis: false,
      extends_to_vocal_cord: false,
      vocal_cord_mobility: "unknown",
      paraglottic_space_invasion: false,
      thyroid_cartilage: "none",
      extralaryngeal_extension: "thyroid",
      unresectable_feature: "none",
    },
    expectedT: "t4a",
    teaching_pearl: "Thyroid invasion counts as extralaryngeal extension (T4a).",
    nodes: { positive_node_count: 3, laterality: "bilateral", largest_node_cm: 4.1, ene: true },
  },
  {
    id: "subglottic-012",
    prompt:
      "65-year-old with dysphagia symptoms. Imaging describes posterior spread consistent with esophageal involvement.",
    inputs: {
      primary_tumor_assessable: true,
      limited_to_subglottis: false,
      extends_to_vocal_cord: false,
      vocal_cord_mobility: "unknown",
      paraglottic_space_invasion: false,
      thyroid_cartilage: "none",
      extralaryngeal_extension: "esophagus",
      unresectable_feature: "none",
    },
    expectedT: "t4a",
    teaching_pearl: "Esophageal invasion from larynx is treated as extralaryngeal extension (T4a).",
    nodes: { positive_node_count: 2, laterality: "ipsilateral", largest_node_cm: 5.3, ene: true },
  },
  {
    id: "subglottic-013",
    prompt:
      "69-year-old. Imaging demonstrates extensive local disease with vascular encasement.",
    inputs: {
      primary_tumor_assessable: true,
      limited_to_subglottis: false,
      extends_to_vocal_cord: true,
      vocal_cord_mobility: "impaired",
      paraglottic_space_invasion: true,
      thyroid_cartilage: "through",
      extralaryngeal_extension: "soft_tissues_neck",
      unresectable_feature: "carotid_encasement",
    },
    expectedT: "t4b",
    teaching_pearl: "Carotid encasement is a T4b (unresectable) feature.",
    nodes: { positive_node_count: 4, laterality: "bilateral", largest_node_cm: 4.9, ene: true },
  },
  {
    id: "subglottic-014",
    prompt:
      "73-year-old. Imaging describes posterior deep invasion into prevertebral tissues.",
    inputs: {
      primary_tumor_assessable: true,
      limited_to_subglottis: false,
      extends_to_vocal_cord: false,
      vocal_cord_mobility: "unknown",
      paraglottic_space_invasion: false,
      thyroid_cartilage: "none",
      extralaryngeal_extension: "none",
      unresectable_feature: "prevertebral_space",
    },
    expectedT: "t4b",
    teaching_pearl: "Prevertebral space invasion = T4b.",
    nodes: { positive_node_count: 1, laterality: "unknown", largest_node_cm: 2.2, ene: false },
  },
  {
    id: "subglottic-015",
    prompt:
      "60-year-old. Imaging describes inferior extension with involvement of mediastinal structures.",
    inputs: {
      primary_tumor_assessable: true,
      limited_to_subglottis: false,
      extends_to_vocal_cord: false,
      vocal_cord_mobility: "unknown",
      paraglottic_space_invasion: false,
      thyroid_cartilage: "none",
      extralaryngeal_extension: "none",
      unresectable_feature: "mediastinal_structures",
    },
    expectedT: "t4b",
    teaching_pearl: "Mediastinal invasion = T4b.",
    nodes: { positive_node_count: 3, laterality: "bilateral", largest_node_cm: 3.8, ene: false },
  },
  {
    id: "subglottic-016",
    prompt: "Biopsy shows carcinoma in situ involving subglottic mucosa.",
    inputs: {
      primary_tumor_assessable: true,
      carcinoma_in_situ: true,
      limited_to_subglottis: true,
      extends_to_vocal_cord: false,
      vocal_cord_mobility: "normal",
      paraglottic_space_invasion: false,
      thyroid_cartilage: "none",
      extralaryngeal_extension: "none",
      unresectable_feature: "none",
    },
    expectedT: "tis",
    teaching_pearl: "In situ disease is Tis (when assessable).",
    nodes: { positive_node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
  },
  {
    id: "subglottic-017",
    prompt: "Workup for suspected laryngeal primary is negative; no primary tumor identified.",
    inputs: {
      primary_tumor_assessable: true,
      no_primary_tumor_identified: true,
      limited_to_subglottis: false,
      extends_to_vocal_cord: false,
      vocal_cord_mobility: "unknown",
      paraglottic_space_invasion: false,
      thyroid_cartilage: "none",
      extralaryngeal_extension: "none",
      unresectable_feature: "none",
    },
    expectedT: "t0",
    teaching_pearl: "If explicitly no primary tumor: T0.",
    nodes: { positive_node_count: 1, laterality: "unknown", largest_node_cm: 1.4, ene: false },
  },
  {
    id: "subglottic-018",
    prompt:
      "Outside records are incomplete; clinician documents that the primary tumor cannot be assessed.",
    inputs: {
      primary_tumor_assessable: false,
      limited_to_subglottis: false,
      extends_to_vocal_cord: false,
      paraglottic_space_invasion: false,
    },
    expectedT: "tx",
    teaching_pearl:
      "If you cannot assess the primary tumor: TX. When the primary tumor cannot be assessed (TX), overall stage grouping cannot be assigned.",
    nodes: { positive_node_count: 2, laterality: "ipsilateral", largest_node_cm: 3.1, ene: false },
  },
  {
    id: "subglottic-019",
    prompt:
      "Sparse documentation: subglottic malignancy is noted, but the note lacks clear descriptors of mobility or extension.",
    inputs: {
      primary_tumor_assessable: true,
      limited_to_subglottis: false,
      extends_to_vocal_cord: false,
      vocal_cord_mobility: "unknown",
      paraglottic_space_invasion: false,
      thyroid_cartilage: "none",
      extralaryngeal_extension: "none",
      unresectable_feature: "none",
    },
    expectedT: "t1",
    teaching_pearl:
      "When non-advanced and underspecified, this implementation falls back to T1 rather than crashing.",
    nodes: { positive_node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
  },
  {
    id: "subglottic-020",
    prompt:
      "Advanced local disease described with both immobility on exam and inferior extension below the cricoid.",
    inputs: {
      primary_tumor_assessable: true,
      limited_to_subglottis: false,
      extends_to_vocal_cord: true,
      vocal_cord_mobility: "fixed",
      paraglottic_space_invasion: true,
      thyroid_cartilage: "inner_cortex",
      extralaryngeal_extension: "trachea",
      unresectable_feature: "none",
    },
    expectedT: "t4a",
    teaching_pearl:
      "Extralaryngeal extension (e.g., trachea) upgrades to T4a even if T3 features are present.",
    nodes: { positive_node_count: 4, laterality: "bilateral", largest_node_cm: 4.6, ene: true },
  },
];
