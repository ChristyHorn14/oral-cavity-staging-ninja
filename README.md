# Staging Dojo

Staging Dojo is a deliberate-practice app for **clinical cancer staging only**. Cases use pretreatment information available from history, examination, endoscopy, imaging, and biopsy diagnosis. M0 is assumed throughout; learners answer only clinical T, clinical N, and the overall clinical stage group.

The app currently covers oral cavity, HPV-associated and HPV-independent oropharynx, nasopharynx, glottic/supraglottic/subglottic larynx, hypopharynx, maxillary sinus, and differentiated thyroid carcinoma. The staging system for each module is centralized in `lib/modules.ts` and displayed in the quiz.

## Local development

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>.

## Quality checks

```bash
npm test
npx tsc --noEmit
npm run lint
npm run build
```

See `STAGING_AUDIT.md` for the edition/version and clinical-staging audit of every module, and `NPC_CASE_BANK.md` for the nasopharynx curriculum map.
