// data/oropharynxHPVNegCases.ts
// HPV-Negative Oropharynx cases using T4a / T4b schema (AJCC 8)
// 30 cases including deliberate edge cases for staging logic.

export const oropharynxHPVNegCases = [
  // -----------------------------
  // EDGE: T0 primary, node-positive (occult primary scenario)
  // -----------------------------
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "tonsil",
    stem: { age: 61, sex: "male", risk: "tobacco", laterality: "right", symptom: "neck mass" },
    tumor: { size_cm: 1 },
    nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 2.2, ene: false },
    teaching_pearl: "T0 can occur with an occult primary; staging is driven by nodal disease.",
  },

  // 2) T0 N2c (bilateral) — still IVA because N2
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "pharyngeal_wall",
    stem: { age: 68, sex: "male", risk: "both", laterality: "midline", symptom: "neck swelling" },
    tumor: { size_cm: 1 },
    nodes: { positive_node_count: 2, laterality: "bilateral", largest_node_cm: 3.0, ene: false },
    teaching_pearl: "In HPV-negative OP, any N2 disease places the patient into stage IVA (if not N3/T4b).",
  },

  // -----------------------------
  // EARLY STAGE: I / II
  // -----------------------------
  // 3) T1 N0 → I
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "tonsil",
    stem: { age: 52, sex: "female", risk: "none", laterality: "left", symptom: "sore throat" },
    tumor: { size_cm: 1.6 },
    nodes: { positive_node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl: "Stage I (HPV-negative OP) is T1 N0.",
  },

  // 4) T2 N0 → II
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "base_of_tongue",
    stem: { age: 59, sex: "male", risk: "etoh", laterality: "right", symptom: "dysphagia" },
    tumor: { size_cm: 3.2 },
    nodes: { positive_node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl: "Stage II is T2 N0 (HPV-negative OP).",
  },

  // -----------------------------
  // STAGE III EDGE: T3 N0 or T1–T3 N1
  // -----------------------------
  // 5) T3 N0 → III
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "soft_palate",
    stem: { age: 64, sex: "male", risk: "tobacco", laterality: "midline", symptom: "odynophagia" },
    tumor: { size_cm: 4.6 },
    nodes: { positive_node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl: "T3 N0 is stage III in HPV-negative OP.",
  },

  // 6) T1 N1 → III
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "tonsil",
    stem: { age: 57, sex: "male", risk: "both", laterality: "right", symptom: "neck mass" },
    tumor: { size_cm: 1.8 },
    nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 2.8, ene: false },
    teaching_pearl: "A single ipsilateral node ≤3 cm (ENE−) is N1 → stage III if T1–T3.",
  },

  // 7) T2 N1 → III
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "base_of_tongue",
    stem: { age: 60, sex: "male", risk: "tobacco", laterality: "left", symptom: "otalgia" },
    tumor: { size_cm: 2.7 },
    nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 2.9, ene: false },
    teaching_pearl: "T2 N1 (ENE−, ≤3 cm) is stage III in HPV-negative OP.",
  },

  // 8) T3 N1 → III
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "pharyngeal_wall",
    stem: { age: 55, sex: "female", risk: "etoh", laterality: "right", symptom: "dysphagia" },
    tumor: { size_cm: 5.1 },
    nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 2.2, ene: false },
    teaching_pearl: "T3 with N1 remains stage III (HPV-negative OP).",
  },

  // -----------------------------
  // N2 disease → Stage IVA (if not T4b/N3)
  // -----------------------------
  // 9) T1 N2a (single >3–6) → IVA
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "tonsil",
    stem: { age: 63, sex: "male", risk: "tobacco", laterality: "left", symptom: "neck mass" },
    tumor: { size_cm: 1.9 },
    nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 4.2, ene: false },
    teaching_pearl: "Single ipsilateral node >3–6 cm (ENE−) is N2a → stage IVA if T1–T3.",
  },

  // 10) T2 N2a → IVA
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "base_of_tongue",
    stem: { age: 49, sex: "female", risk: "both", laterality: "right", symptom: "odynophagia" },
    tumor: { size_cm: 3.7 },
    nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 5.5, ene: false },
    teaching_pearl: "N2a upstages to IVA in HPV-negative OP.",
  },

  // 11) T3 N2a → IVA
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "soft_palate",
    stem: { age: 66, sex: "male", risk: "etoh", laterality: "left", symptom: "dysphagia" },
    tumor: { size_cm: 4.3 },
    nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 3.6, ene: false },
    teaching_pearl: "T3 with N2a is stage IVA (HPV-negative OP).",
  },

  // 12) T1 N2b (multiple ipsi) → IVA
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "tonsil",
    stem: { age: 58, sex: "male", risk: "tobacco", laterality: "right", symptom: "neck swelling" },
    tumor: { size_cm: 1.2 },
    nodes: { positive_node_count: 3, laterality: "ipsilateral", largest_node_cm: 2.6, ene: false },
    teaching_pearl: "Multiple ipsilateral nodes (all ≤6 cm, ENE−) is N2b → stage IVA.",
  },

  // 13) T2 N2b → IVA
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "base_of_tongue",
    stem: { age: 62, sex: "female", risk: "both", laterality: "left", symptom: "neck mass" },
    tumor: { size_cm: 2.4 },
    nodes: { positive_node_count: 2, laterality: "ipsilateral", largest_node_cm: 2.9, ene: false },
    teaching_pearl: "N2b (multiple ipsilateral) drives stage IVA in HPV-negative OP.",
  },

  // 14) T3 N2b → IVA
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "pharyngeal_wall",
    stem: { age: 71, sex: "male", risk: "tobacco", laterality: "right", symptom: "odynophagia" },
    tumor: { size_cm: 4.9 },
    nodes: { positive_node_count: 4, laterality: "ipsilateral", largest_node_cm: 3.1, ene: false },
    teaching_pearl: "Even with large primary (T3), N2b stays IVA (unless N3/T4b).",
  },

  // 15) T1 N2c (contralateral) → IVA
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "tonsil",
    stem: { age: 56, sex: "female", risk: "etoh", laterality: "left", symptom: "neck mass" },
    tumor: { size_cm: 1.7 },
    nodes: { positive_node_count: 2, laterality: "contralateral", largest_node_cm: 2.7, ene: false },
    teaching_pearl: "Contralateral or bilateral nodes (≤6 cm, ENE−) are N2c → stage IVA.",
  },

  // 16) T2 N2c (bilateral) → IVA
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "base_of_tongue",
    stem: { age: 65, sex: "male", risk: "both", laterality: "midline", symptom: "neck swelling" },
    tumor: { size_cm: 3.9 },
    nodes: { positive_node_count: 3, laterality: "bilateral", largest_node_cm: 3.4, ene: false },
    teaching_pearl: "Bilateral nodes ≤6 cm (ENE−) are N2c → stage IVA.",
  },

  // 17) T3 N2c → IVA
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "soft_palate",
    stem: { age: 54, sex: "male", risk: "tobacco", laterality: "midline", symptom: "dysphagia" },
    tumor: { size_cm: 4.2 },
    nodes: { positive_node_count: 2, laterality: "bilateral", largest_node_cm: 2.8, ene: false },
    teaching_pearl: "T1–T3 with N2c is stage IVA in HPV-negative OP.",
  },

  // -----------------------------
  // T4a (advanced local extension) → IVA unless N3
  // -----------------------------
  // 18) T4a N0 → IVA (key edge)
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "tonsil",
    stem: { age: 69, sex: "male", risk: "tobacco", laterality: "right", symptom: "trismus" },
    tumor: { size_cm: 3.0, advanced_local_extension: true, very_advanced_local_extension: false },
    nodes: { positive_node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl: "T4a does NOT automatically mean IVB; T4a N0 is stage IVA.",
  },

  // 19) T4a N1 → IVA
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "base_of_tongue",
    stem: { age: 60, sex: "female", risk: "both", laterality: "left", symptom: "odynophagia" },
    tumor: { size_cm: 4.0, advanced_local_extension: true, very_advanced_local_extension: false },
    nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 2.4, ene: false },
    teaching_pearl: "T4a with N0–N2 remains stage IVA (HPV-negative OP).",
  },

  // 20) T4a N2b → IVA
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "pharyngeal_wall",
    stem: { age: 73, sex: "male", risk: "tobacco", laterality: "right", symptom: "neck mass" },
    tumor: { size_cm: 2.6, advanced_local_extension: true, very_advanced_local_extension: false },
    nodes: { positive_node_count: 2, laterality: "ipsilateral", largest_node_cm: 3.0, ene: false },
    teaching_pearl: "T4a stays IVA unless there is N3 or T4b.",
  },

  // -----------------------------
  // N3 disease → IVB
  // -----------------------------
  // 21) N3a (>6 cm, ENE−) with small primary
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "tonsil",
    stem: { age: 58, sex: "male", risk: "both", laterality: "left", symptom: "large neck mass" },
    tumor: { size_cm: 1.3 },
    nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 6.4, ene: false },
    teaching_pearl: "Node >6 cm (ENE−) is N3a → stage IVB regardless of T.",
  },

  // 22) N3a with multiple nodes (still N3a by size)
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "base_of_tongue",
    stem: { age: 67, sex: "female", risk: "tobacco", laterality: "right", symptom: "neck mass" },
    tumor: { size_cm: 2.1 },
    nodes: { positive_node_count: 3, laterality: "ipsilateral", largest_node_cm: 7.1, ene: false },
    teaching_pearl: "Largest node >6 cm (ENE−) is N3a even with multiple nodes.",
  },

  // 23) N3b (ENE+) with small nodes
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "soft_palate",
    stem: { age: 53, sex: "male", risk: "etoh", laterality: "left", symptom: "neck swelling" },
    tumor: { size_cm: 2.5 },
    nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 2.0, ene: true },
    teaching_pearl: "Any ENE+ nodal disease is N3b → stage IVB.",
  },

  // 24) N3b with bilateral nodes
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "pharyngeal_wall",
    stem: { age: 62, sex: "male", risk: "both", laterality: "midline", symptom: "neck mass" },
    tumor: { size_cm: 3.8 },
    nodes: { positive_node_count: 2, laterality: "bilateral", largest_node_cm: 3.1, ene: true },
    teaching_pearl: "ENE+ overrides laterality/size categories: N3b.",
  },

  // -----------------------------
  // T4b disease → IVB (even if N0)
  // -----------------------------
  // 25) T4b N0 (key edge)
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "tonsil",
    stem: { age: 74, sex: "female", risk: "tobacco", laterality: "right", symptom: "trismus" },
    tumor: { size_cm: 4.4, advanced_local_extension: true, very_advanced_local_extension: true },
    nodes: { positive_node_count: 0, laterality: "none", largest_node_cm: 0, ene: false },
    teaching_pearl: "T4b is stage IVB regardless of nodal status.",
  },

  // 26) T4b N1
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "base_of_tongue",
    stem: { age: 66, sex: "male", risk: "both", laterality: "left", symptom: "neck mass" },
    tumor: { size_cm: 3.9, advanced_local_extension: true, very_advanced_local_extension: true },
    nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 2.6, ene: false },
    teaching_pearl: "Once T4b is present, the stage group is IVB regardless of N.",
  },

  // 27) T4b N2c
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "pharyngeal_wall",
    stem: { age: 59, sex: "female", risk: "tobacco", laterality: "midline", symptom: "dysphagia" },
    tumor: { size_cm: 2.9, advanced_local_extension: true, very_advanced_local_extension: true },
    nodes: { positive_node_count: 2, laterality: "bilateral", largest_node_cm: 3.0, ene: false },
    teaching_pearl: "T4b overrides N2 categories; stage is IVB.",
  },

  // 28) T4b with ENE+ (still IVB)
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "soft_palate",
    stem: { age: 63, sex: "male", risk: "etoh", laterality: "right", symptom: "neck swelling" },
    tumor: { size_cm: 4.0, advanced_local_extension: true, very_advanced_local_extension: true },
    nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 2.4, ene: true },
    teaching_pearl: "T4b and/or N3 makes stage IVB; ENE+ specifically is N3b.",
  },

  // -----------------------------
  // Additional mix to round to 30
  // -----------------------------
  // 29) T2 N2b (IVA) – common presentation
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "tonsil",
    stem: { age: 50, sex: "male", risk: "both", laterality: "right", symptom: "neck mass" },
    tumor: { size_cm: 3.4 },
    nodes: { positive_node_count: 2, laterality: "ipsilateral", largest_node_cm: 2.7, ene: false },
    teaching_pearl: "Common pattern: T2 with multiple ipsilateral nodes (ENE−) is IVA.",
  },

  // 30) T1 N2c (IVA) – contralateral spread edge
  {
    site_group: "oropharynx_hpv_neg",
    subsite: "base_of_tongue",
    stem: { age: 57, sex: "female", risk: "tobacco", laterality: "left", symptom: "neck swelling" },
    tumor: { size_cm: 1.9 },
    nodes: { positive_node_count: 2, laterality: "contralateral", largest_node_cm: 2.9, ene: false },
    teaching_pearl: "Contralateral nodal disease (≤6 cm, ENE−) is N2c → stage IVA.",
  },
] as const;
