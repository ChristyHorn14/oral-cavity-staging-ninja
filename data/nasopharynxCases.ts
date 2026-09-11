import type { NasopharynxNodesInput, NasopharynxTumorInput } from "@/lib/staging/nasopharynx";

export type NasopharynxCaseDifficulty = "anchor" | "edge";

export interface NasopharynxCase {
  readonly id: string;
  readonly site_group: "nasopharynx";
  readonly difficulty: NasopharynxCaseDifficulty;
  readonly prompt: string;
  readonly tumor: NasopharynxTumorInput;
  readonly nodes: NasopharynxNodesInput;
  readonly teaching_pearl: string;
}

const n0: NasopharynxNodesInput = {
  cervical_laterality: "none",
  retropharyngeal_laterality: "none",
  largest_node_cm: 0,
  extends_below_caudal_cricoid: false,
  advanced_ene_cervical: false,
};

// AJCC Version 9 clinical staging. All cases are M0 and never ask for M.
export const nasopharynxCases: readonly NasopharynxCase[] = [
  {
    id: "NPC9-001", site_group: "nasopharynx", difficulty: "anchor",
    prompt: "Endoscopic biopsy shows nonkeratinizing nasopharyngeal carcinoma confined to the left fossa of Rosenmüller. MRI shows no parapharyngeal, muscular, bony, cranial, or nodal involvement.",
    tumor: { features: [] }, nodes: n0,
    teaching_pearl: "Tumor confined to the nasopharynx is T1. With N0 and presumed M0, T1N0 is stage IA.",
  },
  {
    id: "NPC9-002", site_group: "nasopharynx", difficulty: "edge",
    prompt: "A nasopharyngeal primary crosses the choana into the posterior nasal cavity and extends inferiorly along the oropharyngeal mucosa. MRI shows preserved parapharyngeal fat and no adjacent-structure invasion or nodes.",
    tumor: { features: ["nasal_cavity", "oropharynx"] }, nodes: n0,
    teaching_pearl: "Nasal-cavity and/or oropharyngeal mucosal extension remains T1 when adjacent structures are not invaded. T2 would require parapharyngeal or specified soft-tissue invasion.",
  },
  {
    id: "NPC9-003", site_group: "nasopharynx", difficulty: "anchor",
    prompt: "MRI shows a nasopharyngeal carcinoma obliterating parapharyngeal fat without muscle or bone invasion. There are no suspicious nodes.",
    tumor: { features: ["parapharyngeal_space"] }, nodes: n0,
    teaching_pearl: "Parapharyngeal-space invasion is T2. T2N0M0 is stage IA in Version 9.",
  },
  {
    id: "NPC9-004", site_group: "nasopharynx", difficulty: "edge",
    prompt: "A nasopharyngeal carcinoma invades the medial pterygoid muscle on MRI. The pterygoid plates retain normal cortex and marrow. No nodes are involved.",
    tumor: { features: ["medial_pterygoid_muscle"] }, nodes: n0,
    teaching_pearl: "Pterygoid muscle invasion is T2. Do not confuse muscle with pterygoid bone: unequivocal pterygoid-structure bone invasion would be T3.",
  },
  {
    id: "NPC9-005", site_group: "nasopharynx", difficulty: "edge",
    prompt: "MRI shows direct invasion of the prevertebral muscles. The adjacent clivus is sclerotic on CT, but there is no cortical destruction, marrow replacement, or intraosseous tumor. The neck is negative.",
    tumor: { features: ["prevertebral_muscle"] }, nodes: n0,
    teaching_pearl: "Prevertebral muscle invasion is T2. Reactive sclerosis alone is not unequivocal bone infiltration, so the tempting T3 answer is wrong.",
  },
  {
    id: "NPC9-006", site_group: "nasopharynx", difficulty: "anchor",
    prompt: "CT and contrast MRI show nasopharyngeal carcinoma with cortical destruction and tumor replacement of clival marrow. There is no intracranial or cranial-nerve involvement and no nodes.",
    tumor: { features: ["unequivocal_skull_base_bone"] }, nodes: n0,
    teaching_pearl: "Unequivocal skull-base bone infiltration is T3. T3N0M0 is stage II.",
  },
  {
    id: "NPC9-007", site_group: "nasopharynx", difficulty: "edge",
    prompt: "A nasopharyngeal primary invades the lateral pterygoid muscle and produces definite cortical destruction of the adjacent pterygoid plate. MRI shows no intracranial, cranial-nerve, orbital, parotid, hypopharyngeal, or more extensive lateral soft-tissue invasion. The neck is negative.",
    tumor: { features: ["lateral_pterygoid_muscle", "unequivocal_pterygoid_bone"] }, nodes: n0,
    teaching_pearl: "The pterygoid muscle alone would be T2, but unequivocal pterygoid bone invasion raises the primary to T3. T3N0 is stage II.",
  },
  {
    id: "NPC9-008", site_group: "nasopharynx", difficulty: "anchor",
    prompt: "MRI demonstrates direct nasopharyngeal tumor extension into the sphenoid sinus. There is no intracranial, orbital, cranial-nerve, or nodal involvement.",
    tumor: { features: ["paranasal_sinus"] }, nodes: n0,
    teaching_pearl: "Paranasal sinus involvement is T3. In the absence of N3 or T4 features, the M0 stage group is II.",
  },
  {
    id: "NPC9-009", site_group: "nasopharynx", difficulty: "anchor",
    prompt: "Contrast MRI shows nasopharyngeal carcinoma extending through the skull base into the cavernous sinus. There are no regional nodes.",
    tumor: { features: ["unequivocal_skull_base_bone", "intracranial_extension"] }, nodes: n0,
    teaching_pearl: "Intracranial extension is T4 and overrides the T3 bone feature. Any T4M0 nasopharyngeal carcinoma is stage III.",
  },
  {
    id: "NPC9-010", site_group: "nasopharynx", difficulty: "edge",
    prompt: "A patient with nasopharyngeal carcinoma has new abducens palsy. MRI shows unequivocal tumor tracking along cranial nerve VI; there is no intracranial mass extension and no nodes.",
    tumor: { features: ["unequivocal_cranial_nerve_involvement"] }, nodes: n0,
    teaching_pearl: "Unequivocal clinical and/or radiographic cranial-nerve involvement is independently T4; a separate intracranial mass is not required.",
  },
  {
    id: "NPC9-011", site_group: "nasopharynx", difficulty: "edge",
    prompt: "MRI demonstrates tumor reaching and infiltrating the inferior orbital fissure, with no globe involvement. The neck is negative.",
    tumor: { features: ["orbit_or_inferior_orbital_fissure"] }, nodes: n0,
    teaching_pearl: "Version 9 explicitly includes the inferior orbital fissure within orbital involvement, making this T4 rather than T3.",
  },
  {
    id: "NPC9-012", site_group: "nasopharynx", difficulty: "edge",
    prompt: "Nasopharyngeal tumor extends through the masticator region beyond the anterolateral surface of the lateral pterygoid muscle. No intracranial or orbital disease is present. Imaging shows bilateral retropharyngeal nodes up to 2.0 cm but no cervical nodes.",
    tumor: { features: ["beyond_anterolateral_lateral_pterygoid"] },
    nodes: { cervical_laterality: "none", retropharyngeal_laterality: "bilateral", largest_node_cm: 2.0, extends_below_caudal_cricoid: false, advanced_ene_cervical: false },
    teaching_pearl: "Soft-tissue spread beyond the anterolateral surface of lateral pterygoid is T4. Bilateral retropharyngeal nodes are still N1, but T4 makes the stage III.",
  },
  {
    id: "NPC9-013", site_group: "nasopharynx", difficulty: "anchor",
    prompt: "Endoscopy and MRI show a nasopharyngeal carcinoma confined to the nasopharynx, without parapharyngeal, muscular, bony, or other adjacent-structure invasion. A single ipsilateral upper cervical node measures 3.0 cm, remains above the caudal border of the cricoid, and has no advanced ENE.",
    tumor: { features: [] },
    nodes: { cervical_laterality: "unilateral", retropharyngeal_laterality: "none", largest_node_cm: 3.0, extends_below_caudal_cricoid: false, advanced_ene_cervical: false },
    teaching_pearl: "Unilateral cervical nodal disease ≤6 cm, above the caudal cricoid boundary, and without advanced ENE is N1. T1N1M0 is stage IB.",
  },
  {
    id: "NPC9-014", site_group: "nasopharynx", difficulty: "edge",
    prompt: "MRI shows a nasopharyngeal carcinoma extending into the parapharyngeal space without bone or more advanced local invasion. There are bilateral retropharyngeal nodes and one unilateral level II cervical node. The largest node is exactly 6.0 cm; all nodal disease is above the caudal cricoid border and has no advanced ENE.",
    tumor: { features: ["parapharyngeal_space"] },
    nodes: { cervical_laterality: "unilateral", retropharyngeal_laterality: "bilateral", largest_node_cm: 6.0, extends_below_caudal_cricoid: false, advanced_ene_cervical: false },
    teaching_pearl: "Bilateral retropharyngeal disease plus unilateral cervical disease remains N1. Exactly 6 cm satisfies ≤6 cm; N3 begins above 6 cm. T2N1 is stage IB.",
  },
  {
    id: "NPC9-015", site_group: "nasopharynx", difficulty: "anchor",
    prompt: "Endoscopy and MRI show a nasopharyngeal carcinoma confined to the nasopharynx, with no adjacent-structure invasion. Bilateral cervical nodal metastases measure up to 4.5 cm. All nodes are above the caudal cricoid border and none has advanced ENE.",
    tumor: { features: [] },
    nodes: { cervical_laterality: "bilateral", retropharyngeal_laterality: "none", largest_node_cm: 4.5, extends_below_caudal_cricoid: false, advanced_ene_cervical: false },
    teaching_pearl: "Bilateral cervical nodes ≤6 cm, above the caudal cricoid border, and without advanced ENE are N2. T1N2M0 is stage II.",
  },
  {
    id: "NPC9-016", site_group: "nasopharynx", difficulty: "edge",
    prompt: "MRI shows a nasopharyngeal carcinoma directly invading the prevertebral muscles, without bone or more advanced local invasion. One unilateral cervical node measures 6.1 cm; it is above the caudal cricoid boundary and does not show advanced ENE.",
    tumor: { features: ["prevertebral_muscle"] },
    nodes: { cervical_laterality: "unilateral", retropharyngeal_laterality: "none", largest_node_cm: 6.1, extends_below_caudal_cricoid: false, advanced_ene_cervical: false },
    teaching_pearl: "A cervical node >6 cm is N3 even if unilateral, high in the neck, and without advanced ENE. Any N3M0 disease is stage III.",
  },
  {
    id: "NPC9-017", site_group: "nasopharynx", difficulty: "edge",
    prompt: "Endoscopy and MRI show a nasopharyngeal carcinoma confined to the nasopharynx, without adjacent-structure invasion. A 2.0 cm unilateral level IV cervical node has an inferior extent crossing below the caudal border of the cricoid cartilage. There is no advanced ENE.",
    tumor: { features: [] },
    nodes: { cervical_laterality: "unilateral", retropharyngeal_laterality: "none", largest_node_cm: 2.0, extends_below_caudal_cricoid: true, advanced_ene_cervical: false },
    teaching_pearl: "Extension below the caudal border of the cricoid makes cervical nodal disease N3 regardless of size. The boundary is anatomic, not a generic level-IV label.",
  },
  {
    id: "NPC9-018", site_group: "nasopharynx", difficulty: "edge",
    prompt: "MRI shows a nasopharyngeal carcinoma invading the medial pterygoid muscle, with preserved pterygoid bone and no more advanced local invasion. A 3.4 cm unilateral cervical node above the caudal cricoid border has irregular margins and perinodal stranding, but no unequivocal invasion of muscle, skin, or neurovascular structures.",
    tumor: { features: ["medial_pterygoid_muscle"] },
    nodes: { cervical_laterality: "unilateral", retropharyngeal_laterality: "none", largest_node_cm: 3.4, extends_below_caudal_cricoid: false, advanced_ene_cervical: false },
    teaching_pearl: "Irregularity or stranding alone is not Version 9 advanced ENE. Without unequivocal adjacent-structure invasion, this remains N1 rather than N3; T2N1 is stage IB.",
  },
  {
    id: "NPC9-019", site_group: "nasopharynx", difficulty: "edge",
    prompt: "Endoscopy and MRI show a nasopharyngeal carcinoma confined to the nasopharynx, without adjacent-structure invasion. A 3.0 cm unilateral cervical node above the caudal cricoid boundary shows unequivocal direct invasion of the internal jugular vein on contrast MRI.",
    tumor: { features: [] },
    nodes: { cervical_laterality: "unilateral", retropharyngeal_laterality: "none", largest_node_cm: 3.0, extends_below_caudal_cricoid: false, advanced_ene_cervical: true },
    teaching_pearl: "Unequivocal invasion of a neurovascular structure is advanced radiographic ENE and makes cervical nodal disease N3, even when the node is small.",
  },
  {
    id: "NPC9-020", site_group: "nasopharynx", difficulty: "edge",
    prompt: "The nasopharyngeal primary is confined to the mucosa on endoscopy and MRI, without direct extension into adjacent structures. A separate 2.5 cm retropharyngeal node appears to invade prevertebral muscle, but there are no cervical nodes and no node extends below the caudal cricoid border.",
    tumor: { features: [] },
    nodes: { cervical_laterality: "none", retropharyngeal_laterality: "unilateral", largest_node_cm: 2.5, extends_below_caudal_cricoid: false, advanced_ene_cervical: false, advanced_ene_retropharyngeal: true },
    teaching_pearl: "Advanced ENE attributed solely to a retropharyngeal node is excluded from the Version 9 N3 criterion because it is hard to separate from direct primary extension. This remains N1 and stage IB.",
  },
];
