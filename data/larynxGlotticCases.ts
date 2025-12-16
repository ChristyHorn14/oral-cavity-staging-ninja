// data/larynxGlotticCases.ts
// 30 Glottic larynx SCC cases (AJCC 8) for Staging Ninja
// Uses mobility + extension + cartilage flags (not size-based)

import type { LarynxGlotticTumor, LarynxGlotticNodes } from "@/lib/staging/larynxGlottic";

export type LarynxGlotticCase = {
  site_group: "larynx";
  subsite: "glottic";
  stem: {
    age: number;
    sex: "male" | "female";
    risk: "none" | "tobacco" | "etoh" | "both";
    symptom?: string;
  };
  tumor: LarynxGlotticTumor;
  nodes: LarynxGlotticNodes;
  teaching_pearl: string;
};

export const larynxGlotticCases: readonly LarynxGlotticCase[] = [
  // -----------------------------
  // Stage 0 (optional)
  // -----------------------------
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 54, sex: "male", risk: "tobacco", symptom: "hoarseness" },
    tumor: { vocal_cord_mobility: "normal", in_situ: true },
    nodes: { positive_node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl: "Tis N0 is Stage 0. (You can remove Tis cases if you don’t want Stage 0 in the UI yet.)",
  },

  // -----------------------------
  // Early: T1 N0 → I (mobility normal, no extension)
  // -----------------------------
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 61, sex: "male", risk: "tobacco", symptom: "persistent hoarseness" },
    tumor: { vocal_cord_mobility: "normal" },
    nodes: { positive_node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl: "Glottic tumors are staged by mobility + extension, not by size.",
  },
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 49, sex: "female", risk: "none", symptom: "hoarseness" },
    tumor: { vocal_cord_mobility: "normal" },
    nodes: { positive_node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl: "Normal cord mobility with no extension is T1 in this MVP.",
  },
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 67, sex: "male", risk: "both", symptom: "hoarseness" },
    tumor: { vocal_cord_mobility: "normal" },
    nodes: { positive_node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl: "T1 N0 → Stage I.",
  },

  // -----------------------------
  // T2: impaired mobility OR extension to supra/subglottis
  // -----------------------------
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 63, sex: "male", risk: "tobacco", symptom: "progressive hoarseness" },
    tumor: { vocal_cord_mobility: "impaired" },
    nodes: { positive_node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl: "Impaired vocal cord mobility is a T2 feature (glottic).",
  },
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 58, sex: "female", risk: "both", symptom: "hoarseness" },
    tumor: { vocal_cord_mobility: "normal", extends_to_supraglottis: true },
    nodes: { positive_node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl: "Glottic extension to supraglottis/subglottis upgrades to at least T2.",
  },
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 71, sex: "male", risk: "tobacco", symptom: "hoarseness with throat discomfort" },
    tumor: { vocal_cord_mobility: "normal", extends_to_subglottis: true },
    nodes: { positive_node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl: "Subglottic extension from a glottic primary is a T2 feature.",
  },

  // T2 N0 → Stage II
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 56, sex: "male", risk: "etoh", symptom: "hoarseness" },
    tumor: { vocal_cord_mobility: "impaired", extends_to_subglottis: false, extends_to_supraglottis: false },
    nodes: { positive_node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl: "T2 N0 → Stage II.",
  },

  // -----------------------------
  // Stage III: T3 N0 OR (T1–T3 N1)
  // -----------------------------
  // T3 via fixation
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 62, sex: "male", risk: "tobacco", symptom: "hoarseness and dyspnea" },
    tumor: { vocal_cord_mobility: "fixed" },
    nodes: { positive_node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl: "Vocal cord fixation is a classic T3 discriminator.",
  },
  // T3 via paraglottic invasion (even if mobility not fixed)
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 55, sex: "male", risk: "both", symptom: "hoarseness and odynophagia" },
    tumor: { vocal_cord_mobility: "normal", paraglottic_space_invasion: true },
    nodes: { positive_node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl: "Paraglottic space invasion is treated as T3 here even if mobility is not fixed.",
  },
  // T2 N1 (single ipsi ≤3, ENE−) => Stage III
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 60, sex: "female", risk: "etoh", symptom: "hoarseness with neck mass" },
    tumor: { vocal_cord_mobility: "impaired" },
    nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 2.9, ene: false },
    teaching_pearl: "N1 with T1–T3 gives Stage III in the classic scheme.",
  },
  // T1 N1 => Stage III
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 64, sex: "male", risk: "tobacco", symptom: "hoarseness with neck mass" },
    tumor: { vocal_cord_mobility: "normal" },
    nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 2.4, ene: false },
    teaching_pearl: "Even with an early primary (T1), N1 pushes to Stage III.",
  },
  // T3 N1 => Stage III
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 59, sex: "male", risk: "both", symptom: "hoarseness and neck mass" },
    tumor: { vocal_cord_mobility: "fixed" },
    nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 2.7, ene: false },
    teaching_pearl: "T3 plus N1 remains Stage III (not IVA) in the classic pattern.",
  },

  // -----------------------------
  // Stage IVA: N2 disease OR T4a (unless N3/T4b)
  // -----------------------------
  // N2a single >3–6
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 66, sex: "female", risk: "tobacco", symptom: "hoarseness with neck mass" },
    tumor: { vocal_cord_mobility: "impaired" },
    nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 4.8, ene: false },
    teaching_pearl: "Single ipsilateral node >3–6 cm (ENE−) is N2a → Stage IVA.",
  },
  // N2b multiple ipsilateral
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 70, sex: "male", risk: "both", symptom: "hoarseness with neck swelling" },
    tumor: { vocal_cord_mobility: "impaired" },
    nodes: { positive_node_count: 3, laterality: "ipsilateral", largest_node_cm: 3.2, ene: false },
    teaching_pearl: "Multiple ipsilateral nodes (ENE−, ≤6 cm) are N2b → Stage IVA.",
  },
  // N2c contralateral
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 57, sex: "male", risk: "tobacco", symptom: "hoarseness with contralateral neck node" },
    tumor: { vocal_cord_mobility: "normal" },
    nodes: { positive_node_count: 2, laterality: "contralateral", largest_node_cm: 2.6, ene: false },
    teaching_pearl: "Contralateral/bilateral nodes (≤6 cm, ENE−) are N2c → Stage IVA.",
  },
  // N2c bilateral
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 65, sex: "female", risk: "both", symptom: "hoarseness with bilateral neck nodes" },
    tumor: { vocal_cord_mobility: "impaired" },
    nodes: { positive_node_count: 2, laterality: "bilateral", largest_node_cm: 2.9, ene: false },
    teaching_pearl: "Bilateral nodes (≤6 cm, ENE−) are N2c → Stage IVA.",
  },

  // T4a features (cartilage through cortex / extralaryngeal)
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 72, sex: "male", risk: "both", symptom: "hoarseness with anterior neck pain" },
    tumor: { vocal_cord_mobility: "fixed", cartilage_through_cortex_or_extralaryngeal: true },
    nodes: { positive_node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl: "Cartilage through cortex / extralaryngeal extension is T4a → Stage IVA if not N3/T4b.",
  },
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 60, sex: "male", risk: "tobacco", symptom: "hoarseness with neck mass" },
    tumor: { vocal_cord_mobility: "fixed", cartilage_through_cortex_or_extralaryngeal: true },
    nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 2.3, ene: false },
    teaching_pearl: "T4a with N0–N2 remains IVA; IVB requires T4b or N3.",
  },
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 68, sex: "female", risk: "etoh", symptom: "hoarseness with multiple ipsilateral nodes" },
    tumor: { vocal_cord_mobility: "impaired", cartilage_through_cortex_or_extralaryngeal: true },
    nodes: { positive_node_count: 2, laterality: "ipsilateral", largest_node_cm: 3.0, ene: false },
    teaching_pearl: "T4a + N2 stays IVA (unless N3/T4b).",
  },

  // -----------------------------
  // Stage IVB: T4b OR any N3
  // -----------------------------
  // N3a (>6 cm, ENE−)
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 59, sex: "male", risk: "both", symptom: "large neck mass with hoarseness" },
    tumor: { vocal_cord_mobility: "impaired" },
    nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 6.7, ene: false },
    teaching_pearl: "Largest node >6 cm (ENE−) is N3a → Stage IVB regardless of T.",
  },
  // N3a with multiple nodes (still N3a by size)
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 66, sex: "female", risk: "tobacco", symptom: "hoarseness with bulky nodal disease" },
    tumor: { vocal_cord_mobility: "normal" },
    nodes: { positive_node_count: 3, laterality: "ipsilateral", largest_node_cm: 7.2, ene: false },
    teaching_pearl: "If the largest node is >6 cm and ENE−, it is N3a even with multiple nodes.",
  },
  // N3b (ENE+)
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 62, sex: "female", risk: "tobacco", symptom: "hoarseness with enlarging neck mass" },
    tumor: { vocal_cord_mobility: "impaired" },
    nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 2.2, ene: true },
    teaching_pearl: "ENE+ nodal disease is N3b → Stage IVB.",
  },
  // N3b bilateral ENE+
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 71, sex: "male", risk: "both", symptom: "hoarseness with bilateral nodes" },
    tumor: { vocal_cord_mobility: "fixed" },
    nodes: { positive_node_count: 2, laterality: "bilateral", largest_node_cm: 3.1, ene: true },
    teaching_pearl: "ENE+ overrides laterality/size: N3b, Stage IVB.",
  },

  // T4b (very advanced extension) — Stage IVB even if N0
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 69, sex: "male", risk: "both", symptom: "hoarseness with severe dysphagia" },
    tumor: { vocal_cord_mobility: "fixed", very_advanced_extension: true },
    nodes: { positive_node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl: "T4b is Stage IVB regardless of nodal status.",
  },
  // T4b + N1
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 64, sex: "female", risk: "tobacco", symptom: "hoarseness with neck mass" },
    tumor: { vocal_cord_mobility: "impaired", very_advanced_extension: true },
    nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 2.6, ene: false },
    teaching_pearl: "Once T4b is present, stage grouping is IVB regardless of N.",
  },
  // T4b + N2c
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 73, sex: "male", risk: "both", symptom: "hoarseness with bilateral neck nodes" },
    tumor: { vocal_cord_mobility: "fixed", very_advanced_extension: true },
    nodes: { positive_node_count: 2, laterality: "bilateral", largest_node_cm: 3.0, ene: false },
    teaching_pearl: "T4b overrides N2 disease; stage is still IVB.",
  },
  // T4b + ENE+ (still IVB)
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 60, sex: "male", risk: "tobacco", symptom: "hoarseness with painful neck mass" },
    tumor: { vocal_cord_mobility: "impaired", very_advanced_extension: true },
    nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 2.0, ene: true },
    teaching_pearl: "T4b and/or N3 leads to IVB; ENE+ specifically is N3b.",
  },

  // -----------------------------
  // Additional edge-mix to reach 30
  // -----------------------------
  // T2 by extension + N2a
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 52, sex: "female", risk: "both", symptom: "hoarseness with neck mass" },
    tumor: { vocal_cord_mobility: "normal", extends_to_supraglottis: true },
    nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 4.1, ene: false },
    teaching_pearl: "T2 can be due to extension (even with normal mobility); N2a then stages IVA.",
  },
  // T3 (paraglottic) + N2b
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 65, sex: "male", risk: "tobacco", symptom: "hoarseness with neck swelling" },
    tumor: { vocal_cord_mobility: "normal", paraglottic_space_invasion: true },
    nodes: { positive_node_count: 2, laterality: "ipsilateral", largest_node_cm: 2.8, ene: false },
    teaching_pearl: "T3 + N2 disease is stage IVA (classic grouping).",
  },
  // T1 + N2c
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 57, sex: "male", risk: "etoh", symptom: "hoarseness with contralateral node" },
    tumor: { vocal_cord_mobility: "normal" },
    nodes: { positive_node_count: 2, laterality: "contralateral", largest_node_cm: 2.5, ene: false },
    teaching_pearl: "Even early primaries become IVA with N2c disease in HPV-negative staging patterns.",
  },
  // T4a + N2c
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 69, sex: "female", risk: "tobacco", symptom: "hoarseness with bilateral nodes" },
    tumor: { vocal_cord_mobility: "fixed", cartilage_through_cortex_or_extralaryngeal: true },
    nodes: { positive_node_count: 2, laterality: "bilateral", largest_node_cm: 3.4, ene: false },
    teaching_pearl: "T4a with N2 disease remains stage IVA; IVB requires T4b or N3.",
  },
  // T2 + N3b (ENE+)
  {
    site_group: "larynx",
    subsite: "glottic",
    stem: { age: 63, sex: "male", risk: "both", symptom: "hoarseness with tender node" },
    tumor: { vocal_cord_mobility: "impaired" },
    nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 2.6, ene: true },
    teaching_pearl: "ENE+ makes N3b (Stage IVB) regardless of T category.",
  },
] as const;
