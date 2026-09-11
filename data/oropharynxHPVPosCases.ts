import type {
  OropharynxHPVPosNodesInput,
  OropharynxHPVPosTumorInput,
} from "@/lib/staging/oropharynxHPVPos";

export interface OropharynxHPVPosCase {
  readonly id: string;
  readonly site_group: "oropharynx_hpv_pos";
  readonly subsite: "tonsil" | "base_of_tongue" | "soft_palate" | "pharyngeal_wall" | "unknown_primary";
  readonly prompt: string;
  readonly tumor: OropharynxHPVPosTumorInput;
  readonly nodes: OropharynxHPVPosNodesInput;
  readonly teaching_pearl: string;
}

// AJCC Version 9 clinical cases. All are M0. Nodal counts add realism but do
// not drive cN; side, size, and unequivocal imaging ENE do.
export const oropharynxHPVPosCases: readonly OropharynxHPVPosCase[] = [
  {
    id: "OPHPV9-001", site_group: "oropharynx_hpv_pos", subsite: "tonsil",
    prompt: "A 52-year-old man has a 1.8 cm right tonsil HPV-associated squamous cell carcinoma. Examination and contrast CT show no involved regional nodes.",
    tumor: { size_cm: 1.8 }, nodes: { positive_node_count: 0, laterality: "none", largest_node_cm: 0, unequivocal_imaging_ene: false },
    teaching_pearl: "T1 because the primary is ≤2 cm; cN0 because no node is clinically or radiographically involved. T1N0M0 is clinical stage I.",
  },
  {
    id: "OPHPV9-002", site_group: "oropharynx_hpv_pos", subsite: "base_of_tongue",
    prompt: "MRI shows a 2.0 cm HPV-associated left base-of-tongue primary and one ipsilateral level II node measuring 6.0 cm without unequivocal imaging extranodal extension.",
    tumor: { size_cm: 2.0 }, nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 6.0, unequivocal_imaging_ene: false },
    teaching_pearl: "Exactly 2.0 cm remains T1, and an ipsilateral node exactly 6.0 cm without iENE remains cN1. The tempting N3 answer requires a node >6 cm.",
  },
  {
    id: "OPHPV9-003", site_group: "oropharynx_hpv_pos", subsite: "tonsil",
    prompt: "A 3.1 cm left tonsil HPV-associated carcinoma has three ipsilateral nodes, the largest 4.2 cm. Their capsules and surrounding fat planes remain intact on MRI.",
    tumor: { size_cm: 3.1 }, nodes: { positive_node_count: 3, laterality: "ipsilateral", largest_node_cm: 4.2, unequivocal_imaging_ene: false },
    teaching_pearl: "T2 is >2 to ≤4 cm. Multiple ipsilateral nodes do not increase clinical N by count: all are ≤6 cm and iENE-negative, so cN1 and stage I.",
  },
  {
    id: "OPHPV9-004", site_group: "oropharynx_hpv_pos", subsite: "base_of_tongue",
    prompt: "Endoscopy and MRI show a 3.8 cm midline base-of-tongue HPV-associated carcinoma with bilateral cervical nodes, none larger than 3.4 cm and none with imaging ENE.",
    tumor: { size_cm: 3.8 }, nodes: { positive_node_count: 4, laterality: "bilateral", largest_node_cm: 3.4, unequivocal_imaging_ene: false },
    teaching_pearl: "Bilateral nodes ≤6 cm without iENE are cN2. T2N2M0 is clinical stage II; node count is not a clinical N criterion.",
  },
  {
    id: "OPHPV9-005", site_group: "oropharynx_hpv_pos", subsite: "tonsil",
    prompt: "A 1.6 cm right tonsil HPV-associated carcinoma has a 2.8 cm ipsilateral level II node. MRI unequivocally shows tumor extending through the nodal capsule into perinodal fat.",
    tumor: { size_cm: 1.6 }, nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 2.8, unequivocal_imaging_ene: true },
    teaching_pearl: "Version 9 upstages ipsilateral nodal disease ≤6 cm from cN1 to cN2 when iENE is unequivocal. T1N2M0 is stage II.",
  },
  {
    id: "OPHPV9-006", site_group: "oropharynx_hpv_pos", subsite: "tonsil",
    prompt: "A 2.5 cm left tonsil HPV-associated carcinoma has bilateral nodes up to 3.0 cm. One right level II node unequivocally invades adjacent sternocleidomastoid on MRI.",
    tumor: { size_cm: 2.5 }, nodes: { positive_node_count: 3, laterality: "bilateral", largest_node_cm: 3.0, unequivocal_imaging_ene: true },
    teaching_pearl: "Bilateral nodes with unequivocal iENE are cN3 in Version 9, not cN2. Any cN3 M0 disease is clinical stage III.",
  },
  {
    id: "OPHPV9-007", site_group: "oropharynx_hpv_pos", subsite: "base_of_tongue",
    prompt: "A 4.0 cm HPV-associated base-of-tongue primary has a single 2.2 cm ipsilateral node without iENE.",
    tumor: { size_cm: 4.0 }, nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 2.2, unequivocal_imaging_ene: false },
    teaching_pearl: "Exactly 4.0 cm remains T2; T3 begins above 4 cm unless there is lingual epiglottic extension. Ipsilateral iENE-negative disease is cN1, so stage I.",
  },
  {
    id: "OPHPV9-008", site_group: "oropharynx_hpv_pos", subsite: "base_of_tongue",
    prompt: "A 2.7 cm HPV-associated base-of-tongue tumor extends mucosally onto the lingual surface of the epiglottis without invasion of the pre-epiglottic space or laryngeal framework. The neck is cN0.",
    tumor: { size_cm: 2.7, extends_to_lingual_epiglottis: true }, nodes: { positive_node_count: 0, laterality: "none", largest_node_cm: 0, unequivocal_imaging_ene: false },
    teaching_pearl: "Lingual-surface epiglottic extension makes this T3, but mucosal extension alone is not laryngeal invasion/T4. T3N0M0 is stage II.",
  },
  {
    id: "OPHPV9-009", site_group: "oropharynx_hpv_pos", subsite: "tonsil",
    prompt: "A 4.1 cm HPV-associated tonsil carcinoma has no advanced local invasion and no regional nodal disease.",
    tumor: { size_cm: 4.1 }, nodes: { positive_node_count: 0, laterality: "none", largest_node_cm: 0, unequivocal_imaging_ene: false },
    teaching_pearl: "A primary just over 4 cm is T3. With N0 and M0, the overall clinical stage is II.",
  },
  {
    id: "OPHPV9-010", site_group: "oropharynx_hpv_pos", subsite: "tonsil",
    prompt: "A 1.9 cm HPV-associated tonsil primary invades the medial pterygoid muscle on MRI. There is one 2.0 cm ipsilateral node without iENE.",
    tumor: { size_cm: 1.9, t4_structures: ["medial_pterygoid"] }, nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 2.0, unequivocal_imaging_ene: false },
    teaching_pearl: "Medial pterygoid invasion makes the tumor T4 regardless of size. Any T4 M0 HPV-associated oropharyngeal cancer is clinical stage III.",
  },
  {
    id: "OPHPV9-011", site_group: "oropharynx_hpv_pos", subsite: "base_of_tongue",
    prompt: "A 3.4 cm HPV-associated base-of-tongue primary invades the intrinsic tongue musculature but not the deep extrinsic muscles. One ipsilateral 3.2 cm node has no iENE.",
    tumor: { size_cm: 3.4 }, nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 3.2, unequivocal_imaging_ene: false },
    teaching_pearl: "Intrinsic tongue muscle involvement is not the T4 discriminator; deep extrinsic muscle invasion is. Size therefore controls T2, with cN1 and stage I.",
  },
  {
    id: "OPHPV9-012", site_group: "oropharynx_hpv_pos", subsite: "tonsil",
    prompt: "A 2.2 cm right tonsil HPV-associated primary has a single contralateral level II node measuring 2.5 cm without iENE.",
    tumor: { size_cm: 2.2 }, nodes: { positive_node_count: 1, laterality: "contralateral", largest_node_cm: 2.5, unequivocal_imaging_ene: false },
    teaching_pearl: "Contralateral cervical nodal disease is cN2 when ≤6 cm and iENE-negative. T2N2M0 is stage II.",
  },
  {
    id: "OPHPV9-013", site_group: "oropharynx_hpv_pos", subsite: "tonsil",
    prompt: "A 1.4 cm left tonsil HPV-associated carcinoma has an ipsilateral nodal conglomerate formed by two coalescent nodes with lost intervening tissue planes. The mass is 4.8 cm.",
    tumor: { size_cm: 1.4 }, nodes: { positive_node_count: 2, laterality: "ipsilateral", largest_node_cm: 4.8, unequivocal_imaging_ene: true },
    teaching_pearl: "A coalescent, indivisible nodal mass with loss of intervening capsules is unequivocal iENE. Ipsilateral iENE-positive nodes ≤6 cm are cN2, not N1.",
  },
  {
    id: "OPHPV9-014", site_group: "oropharynx_hpv_pos", subsite: "tonsil",
    prompt: "A 2.0 cm right tonsil HPV-associated carcinoma has a 6.1 cm ipsilateral node. No imaging ENE is present.",
    tumor: { size_cm: 2.0 }, nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 6.1, unequivocal_imaging_ene: false },
    teaching_pearl: "A node >6 cm is cN3 even without iENE. T1N3M0 is clinical stage III.",
  },
  {
    id: "OPHPV9-015", site_group: "oropharynx_hpv_pos", subsite: "unknown_primary",
    prompt: "No mucosal primary is found after examination, imaging, and directed endoscopy. Biopsy of a 3.0 cm ipsilateral level II node shows HPV-associated squamous cell carcinoma; imaging shows no ENE.",
    tumor: { size_cm: 0, primary_unknown: true }, nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 3.0, unequivocal_imaging_ene: false },
    teaching_pearl: "HPV-associated nodal disease with no identified oropharyngeal primary is T0. Ipsilateral disease ≤6 cm without iENE is cN1, giving clinical stage I.",
  },
  {
    id: "OPHPV9-016", site_group: "oropharynx_hpv_pos", subsite: "tonsil",
    prompt: "A 3.0 cm HPV-associated tonsil carcinoma has an ipsilateral 3.6 cm node with blurred margins and mild surrounding fat stranding, but the radiologist states ENE is equivocal rather than unequivocal.",
    tumor: { size_cm: 3.0 }, nodes: { positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 3.6, unequivocal_imaging_ene: false },
    teaching_pearl: "Version 9 requires unequivocal imaging ENE. Equivocal stranding is staged to the lower category: cN1, not cN2; T2N1M0 remains stage I.",
  },
  {
    id: "OPHPV9-017", site_group: "oropharynx_hpv_pos", subsite: "tonsil",
    prompt: "A 3.9 cm HPV-associated tonsil carcinoma invades the mandible on MRI. Bilateral nodes measure up to 4.0 cm without iENE.",
    tumor: { size_cm: 3.9, t4_structures: ["mandible"] }, nodes: { positive_node_count: 3, laterality: "bilateral", largest_node_cm: 4.0, unequivocal_imaging_ene: false },
    teaching_pearl: "Mandibular invasion establishes T4. Bilateral nodes without iENE are cN2, but T4 makes the M0 clinical stage III.",
  },
  {
    id: "OPHPV9-018", site_group: "oropharynx_hpv_pos", subsite: "tonsil",
    prompt: "A 2.6 cm right tonsil HPV-associated carcinoma has bilateral nodes up to 5.9 cm without unequivocal iENE.",
    tumor: { size_cm: 2.6 }, nodes: { positive_node_count: 6, laterality: "bilateral", largest_node_cm: 5.9, unequivocal_imaging_ene: false },
    teaching_pearl: "Six involved nodes do not create a pathologic node-count category in this clinical module. Bilateral, ≤6 cm, iENE-negative disease is cN2; T2N2M0 is stage II.",
  },
];

