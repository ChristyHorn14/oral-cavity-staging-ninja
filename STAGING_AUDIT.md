# Clinical staging audit

All modules require cT, cN, and an overall **clinical** stage group. M0 is assumed and M is never an answer field. Module labels and answer choices live in one location: `lib/modules.ts`.

| Module | Current system | Clinical-only confirmation | Audit result |
|---|---|---|---|
| Oral cavity | AJCC 8th Edition | Yes | cT uses size/DOI and verified T4 anatomy; cN uses clinically overt ENE; M0 stage groups verified. |
| Oropharynx, HPV-associated | AJCC Version 9 | Yes | cT and clinical stage groups retained from AJCC 8; cN incorporates unequivocal imaging ENE (iENE). No pN node-count logic remains. |
| Oropharynx, HPV-independent | AJCC 8th Edition | Yes | Classic cT/cN and M0 stage groups; ENE means clinically overt ENE. |
| Nasopharynx | AJCC Version 9 | Yes | Version 9 cT, cN, and clinical M0 stage groups implemented. |
| Larynx, glottic | AJCC 8th Edition | Yes | Mobility/anatomic cT, classic cN, and M0 stage groups verified. The UI asks for parent cT1 rather than optional cT1a/cT1b subdivision. |
| Larynx, supraglottic | AJCC 8th Edition | Yes | Subsite/mobility/anatomic cT, classic cN, and M0 stage groups verified. |
| Larynx, subglottic | AJCC 8th Edition | Yes | Extent/mobility/anatomic cT, classic cN, and M0 stage groups verified. |
| Hypopharynx | AJCC 8th Edition | Yes | Size/subsite/fixation/anatomic cT, classic cN, and M0 stage groups verified. |
| Maxillary sinus | AJCC 8th Edition | Yes | Anatomy-based cT, classic cN, and M0 stage groups verified. |
| Differentiated thyroid | AJCC 8th Edition | Yes | Age-dependent M0 clinical stage groups, gross ETE, and clinical nodal compartments verified; microscopic ETE and M testing removed. |

## Nasopharynx Version 9 M0 stage-group matrix

The complete clinical M0 matrix was re-audited against Table 2 of the AJCC/UICC expert-panel publication and is covered by an exhaustive regression test.

| cT \\ cN | cN0 | cN1 | cN2 | cN3 |
|---|---|---|---|---|
| cT1 | IA | IB | II | III |
| cT2 | IA | IB | II | III |
| cT3 | II | II | II | III |
| cT4 | III | III | III | III |

This is an intentional Version 9 change: nonmetastatic cT4 and/or cN3 disease moved from AJCC 8 stage IVA to Version 9 stage III. Version 9 reserves stage IVA and IVB for M1a and M1b disease, respectively. Because Staging Dojo assumes M0 and does not test M, IVA and IVB are not NPC answer choices.

## Verification sources

- American College of Surgeons, **AJCC Current Staging System (2026)**: confirms Version 9 for nasopharynx (2025) and HPV-associated oropharynx (2026), while the other implemented head-and-neck and differentiated-thyroid sites remain AJCC 8. <https://www.facs.org/media/c5ik5tkr/ajcc-current-staging-system-2026.pdf>
- American College of Surgeons, **AJCC Version 9**: Version 8 sites remain current until replaced by a Version 9 protocol. <https://www.facs.org/quality-programs/cancer-programs/american-joint-committee-on-cancer/version-9/>
- AJCC/UICC expert panel, **Nasopharyngeal Carcinoma Staging: An AJCC/UICC International Committee Proposal for the Ninth Edition**. <https://jamanetwork.com/journals/jamaoncology/fullarticle/2824837>
- AJCC/UICC expert panel, **HPV-Associated Oropharyngeal Squamous Cell Carcinoma – Key Updates to the AJCC/UICC TNM9 Staging System**. DOI: <https://doi.org/10.1245/s10434-026-19496-2>
- NCI PDQ AJCC 8 tables: [oral cavity](https://www.cancer.gov/types/head-and-neck/hp/adult/lip-mouth-treatment-pdq), [larynx](https://www.cancer.gov/types/head-and-neck/hp/adult/laryngeal-treatment-pdq), [hypopharynx](https://www.cancer.gov/types/head-and-neck/hp/adult/hypopharyngeal-treatment-pdq), [paranasal sinus](https://www.cancer.gov/types/head-and-neck/hp/adult/paranasal-sinus-treatment-pdq), and [thyroid](https://www.cancer.gov/types/thyroid/hp/thyroid-treatment-pdq).

## Items for human review

- The licensed AJCC Version 9 protocol should remain the final institutional authority. Public expert-panel materials define HPV-associated cN2 as ipsilateral iENE-positive disease or bilateral iENE-negative disease and cN3 as bilateral iENE-positive disease or any node >6 cm; they do not explicitly spell out the very uncommon single contralateral-only iENE-positive permutation. The engine assigns that permutation cN2 by applying the unilateral/one-category-up principle, but no case tests it.
- Glottic cases intentionally ask for the parent cT1 category. If a curriculum requires cT1a versus cT1b, the case schema must add reliable one-cord versus both-cord extent before enabling those answer choices.
- Radiographic ENE classification has known interobserver variability. The Version 9 cases follow the published rule to use iENE only when imaging evidence is unequivocal and otherwise assign the lower category.
