# Changelog

## Clinical staging update

### Added

- `lib/modules.ts`: centralized module names, clinical-staging basis, AJCC edition/version, and answer choices.
- `lib/staging/nasopharynx.ts` and `data/nasopharynxCases.ts`: AJCC Version 9 nasopharyngeal carcinoma clinical staging with 20 cases.
- `lib/staging/oropharynxHPVPos.ts`: AJCC Version 9 HPV-associated oropharyngeal clinical staging.
- Regression and case-bank integrity tests for AJCC Version 9, classic head-and-neck cN boundaries, oral-cavity T boundaries, and stored case expectations.
- `STAGING_AUDIT.md` and `NPC_CASE_BANK.md`.

### Changed

- Replaced the HPV-associated oropharynx pathologic case bank with 18 pretreatment clinical cases; removed neck-dissection node-count logic.
- Corrected oral-cavity cT4a (`>4 cm` **and** `DOI >10 mm`), cT4b anatomic features, and removed generic extrinsic tongue-muscle involvement as a T4 shortcut.
- Corrected classic AJCC 8 clinical ENE nodal logic: one ipsilateral node `≤3 cm` with clinically overt ENE is cN2a; other clinically overt ENE patterns are cN3b.
- Corrected the `>6 cm` cN3a precedence over nodal laterality.
- Removed thyroid M1, microscopic-ETE pathology, and operative-only cases; thyroid grouping now assumes M0 and exposes no M answer.
- Removed unstageable TX/T0 larynx and hypopharynx drills that could not support a required overall stage-group answer.
- Consolidated the duplicated root and `/quiz` implementations into `components/StagingDojo.tsx` while preserving both routes.
- Updated UI terminology to identify clinical staging, radiographic iENE where applicable, clinically overt ENE for classic sites, and the module-specific AJCC system.
- Rewrote NPC nodal-focused prompts to describe the primary's clinical extent rather than disclosing its T category.
- Re-audited the complete 16-combination NPC cT/cN M0 stage-group matrix against the AJCC/UICC Version 9 publication; confirmed that cT4 and/or cN3 M0 is stage III (not the AJCC 8 stage IVA assignment) and added exhaustive regression coverage.
- Added a case-bank safeguard that rejects any NPC pre-answer prompt containing an explicit T category; T-category wording remains only in feedback shown after submission.

### Removed

- Legacy AJCC 8 HPV-associated oropharynx pathologic staging engine/tests.
- Stale duplicate `page1.tsx` and `src/` implementations that retained obsolete logic.
