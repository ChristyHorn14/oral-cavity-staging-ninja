export type ModuleId =
  | "oral_cavity"
  | "oropharynx_hpv_pos"
  | "oropharynx_hpv_neg"
  | "nasopharynx"
  | "larynx_glottic"
  | "larynx_supraglottic"
  | "larynx_subglottic"
  | "hypopharynx"
  | "maxillary_sinus"
  | "differentiated_thyroid";

export type CasePool = ModuleId | "mixed";
export type AjccSystem = "AJCC 8th Edition" | "AJCC Version 9";

export interface ModuleMetadata {
  readonly label: string;
  readonly stagingBasis: "Clinical staging";
  readonly ajccSystem: AjccSystem;
  readonly tChoices: readonly string[];
  readonly nChoices: readonly string[];
  readonly stageChoices: readonly string[];
}

const CLASSIC_N = ["N0", "N1", "N2a", "N2b", "N2c", "N3a", "N3b"] as const;
const CLASSIC_STAGE = ["I", "II", "III", "IVA", "IVB"] as const;
const LARYNX_T = ["Tis", "T1", "T2", "T3", "T4a", "T4b"] as const;

export const moduleMetadata: Readonly<Record<ModuleId, ModuleMetadata>> = {
  oral_cavity: {
    label: "Oral cavity",
    stagingBasis: "Clinical staging",
    ajccSystem: "AJCC 8th Edition",
    tChoices: ["T1", "T2", "T3", "T4a", "T4b"],
    nChoices: CLASSIC_N,
    stageChoices: CLASSIC_STAGE,
  },
  oropharynx_hpv_pos: {
    label: "Oropharynx (HPV-associated)",
    stagingBasis: "Clinical staging",
    ajccSystem: "AJCC Version 9",
    tChoices: ["T0", "T1", "T2", "T3", "T4"],
    nChoices: ["N0", "N1", "N2", "N3"],
    stageChoices: ["I", "II", "III"],
  },
  oropharynx_hpv_neg: {
    label: "Oropharynx (HPV-independent)",
    stagingBasis: "Clinical staging",
    ajccSystem: "AJCC 8th Edition",
    tChoices: ["T0", "T1", "T2", "T3", "T4a", "T4b"],
    nChoices: CLASSIC_N,
    stageChoices: CLASSIC_STAGE,
  },
  nasopharynx: {
    label: "Nasopharynx",
    stagingBasis: "Clinical staging",
    ajccSystem: "AJCC Version 9",
    tChoices: ["T1", "T2", "T3", "T4"],
    nChoices: ["N0", "N1", "N2", "N3"],
    stageChoices: ["IA", "IB", "II", "III"],
  },
  larynx_glottic: {
    label: "Larynx (glottic)",
    stagingBasis: "Clinical staging",
    ajccSystem: "AJCC 8th Edition",
    tChoices: LARYNX_T,
    nChoices: CLASSIC_N,
    stageChoices: ["0", ...CLASSIC_STAGE],
  },
  larynx_supraglottic: {
    label: "Larynx (supraglottic)",
    stagingBasis: "Clinical staging",
    ajccSystem: "AJCC 8th Edition",
    tChoices: LARYNX_T,
    nChoices: CLASSIC_N,
    stageChoices: ["0", ...CLASSIC_STAGE],
  },
  larynx_subglottic: {
    label: "Larynx (subglottic)",
    stagingBasis: "Clinical staging",
    ajccSystem: "AJCC 8th Edition",
    tChoices: LARYNX_T,
    nChoices: CLASSIC_N,
    stageChoices: ["0", ...CLASSIC_STAGE],
  },
  hypopharynx: {
    label: "Hypopharynx",
    stagingBasis: "Clinical staging",
    ajccSystem: "AJCC 8th Edition",
    tChoices: LARYNX_T,
    nChoices: CLASSIC_N,
    stageChoices: ["0", ...CLASSIC_STAGE],
  },
  maxillary_sinus: {
    label: "Maxillary sinus",
    stagingBasis: "Clinical staging",
    ajccSystem: "AJCC 8th Edition",
    tChoices: ["T1", "T2", "T3", "T4a", "T4b"],
    nChoices: CLASSIC_N,
    stageChoices: CLASSIC_STAGE,
  },
  differentiated_thyroid: {
    label: "Differentiated thyroid",
    stagingBasis: "Clinical staging",
    ajccSystem: "AJCC 8th Edition",
    tChoices: ["T1a", "T1b", "T2", "T3a", "T3b", "T4a", "T4b"],
    nChoices: ["N0", "N1a", "N1b"],
    stageChoices: ["I", "II", "III", "IVA"],
  },
};

export function stagingSystemLabel(moduleId: ModuleId): string {
  const metadata = moduleMetadata[moduleId];
  return `${metadata.stagingBasis} · ${metadata.ajccSystem}`;
}

