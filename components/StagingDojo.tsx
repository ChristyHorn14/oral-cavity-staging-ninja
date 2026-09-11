"use client";

/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/static-components */

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import CaseCountLine from "@/components/CaseCountLine";
import { moduleMetadata, stagingSystemLabel, type CasePool, type ModuleId } from "@/lib/modules";

// ---- Oral cavity ----
import { oralTongueCases } from "@/data/oralTongueCases";
import { floorOfMouthCases } from "@/data/floorOfMouthCases";
import { alveolarRidgeCases } from "@/data/alveolarRidgeCases";
import { buccalMucosaCases } from "@/data/buccalMucosaCases";
import { hardPalateCases } from "@/data/hardPalateCases";
import { retromolarTrigoneCases } from "@/data/retromolarTrigoneCases";
import { computeT, computeN, computeStageGroup } from "@/lib/staging/staging";
import { OralCavityCase } from "@/lib/staging/types";

// ---- Oropharynx HPV+ ----
import { oropharynxHPVPosCases } from "@/data/oropharynxHPVPosCases";
import {
  computeT_OropharynxHPVPos,
  computeN_OropharynxHPVPos,
  computeStageGroup_OropharynxHPVPos,
} from "@/lib/staging/oropharynxHPVPos";

// ---- Nasopharynx ----
import { nasopharynxCases } from "@/data/nasopharynxCases";
import {
  computeT_Nasopharynx,
  computeN_Nasopharynx,
  computeStageGroup_Nasopharynx,
} from "@/lib/staging/nasopharynx";

// ---- Oropharynx HPV− ----
import { oropharynxHPVNegCases } from "@/data/oropharynxHPVNegCases";
import {
  computeT_OropharynxHPVNeg,
  computeN_OropharynxHPVNeg,
  computeStageGroup_OropharynxHPVNeg,
} from "@/lib/staging/oropharynxHPVNeg";

// ---- Larynx glottic ----
import { larynxGlotticCases } from "@/data/larynxGlotticCases";
import {
  computeT_LarynxGlottic,
  computeN_LarynxGlottic,
  computeStageGroup_LarynxGlottic,
} from "@/lib/staging/larynxGlottic";

// ---- Larynx supraglottic ----
import { larynxSupraglotticCases } from "@/data/larynxSupraglotticCases";
import { computeT_Supraglottic } from "@/lib/staging/larynxSupraglotticStage";

// ---- Larynx subglottic ----
import { larynxSubglotticCases } from "@/data/larynxSubglotticCases";
import { computeT_LarynxSubglottic } from "@/lib/staging/larynxSubglotticStage";

// ---- Hypopharynx ----
import { hypopharynxCases } from "@/data/hypopharynxCases";
import { computeT_Hypopharynx } from "@/lib/staging/hypopharynxStage";

// ---- Maxillary sinus ----
import { maxillarySinusCases } from "@/data/maxillarySinusCases";
import {
  computeT_MaxillarySinus,
  computeN_MaxillarySinus,
  computeStageGroup_MaxillarySinus,
} from "@/lib/staging/maxillarySinusStage";

// ---- Differentiated thyroid ----
import { differentiatedThyroidCases } from "@/data/differentiatedThyroidCases";
import {
  computeT_DifferentiatedThyroid,
  computeN_DifferentiatedThyroid,
  computeStageGroup_DifferentiatedThyroid,
} from "@/lib/staging/differentiatedThyroidStage";

function randIndex(n: number) {
  return Math.floor(Math.random() * n);
}

/**
 * Defensive default nodes to prevent crashes when case.nodes is missing.
 */
const DEFAULT_HN_NODES = {
  positive_node_count: 0,
  laterality: "none",
  largest_node_cm: 0,
  ene: false,
} as const;

function getNodesOrDefault(c: any) {
  return c?.nodes ?? DEFAULT_HN_NODES;
}

/**
 * Normalize some staging strings if a module returns lowercase (e.g., "t1").
 */
function normalizeT(t: any): string {
  if (!t || typeof t !== "string") return "";
  const s = t.trim();

  // common lowercase patterns
  if (/^tx$/i.test(s)) return "TX";
  if (/^t0$/i.test(s)) return "T0";
  if (/^tis$/i.test(s)) return "Tis";

  // t1, t2, t3, t4a, t4b
  if (/^t\d[a-b]?$/i.test(s)) {
    const up = s.toUpperCase(); // T4A
    // convert suffix A/B to lowercase for UI consistency: T4a / T4b
    if (up.endsWith("A")) return up.slice(0, -1) + "a";
    if (up.endsWith("B")) return up.slice(0, -1) + "b";
    return up;
  }

  // already fine
  return s;
}

type OropharynxHPVPosCase = (typeof oropharynxHPVPosCases)[number];
type NasopharynxCase = (typeof nasopharynxCases)[number];
type OropharynxHPVNegCase = (typeof oropharynxHPVNegCases)[number];
type LarynxGlotticCase = (typeof larynxGlotticCases)[number];
type LarynxSupraglotticCase = (typeof larynxSupraglotticCases)[number];
type HypopharynxCase = (typeof hypopharynxCases)[number];
type MaxillarySinusCase = (typeof maxillarySinusCases)[number];
type DifferentiatedThyroidCase = (typeof differentiatedThyroidCases)[number];

// “inputs-shaped” subglottic case (from your de-keyed file)
type SubglotticInputsCase = {
  id: string;
  prompt: string;
  inputs: any;
  expectedT?: any;
  teaching_pearl?: string;
  nodes?: any;
};

type AnyCase =
  | OralCavityCase
  | OropharynxHPVPosCase
  | NasopharynxCase
  | OropharynxHPVNegCase
  | LarynxGlotticCase
  | LarynxSupraglotticCase
  | HypopharynxCase
  | MaxillarySinusCase
  | DifferentiatedThyroidCase
  | SubglotticInputsCase
  | any;

// All oral cavity cases (all subsites)
const oralCavityCases: OralCavityCase[] = [
  ...oralTongueCases,
  ...floorOfMouthCases,
  ...alveolarRidgeCases,
  ...buccalMucosaCases,
  ...hardPalateCases,
  ...retromolarTrigoneCases,
];

// Mixed pool
const mixedCases: readonly AnyCase[] = [
  ...oralCavityCases,
  ...oropharynxHPVPosCases,
  ...oropharynxHPVNegCases,
  ...nasopharynxCases,
  ...larynxGlotticCases,
  ...larynxSupraglotticCases,
  ...larynxSubglotticCases,
  ...hypopharynxCases,
  ...maxillarySinusCases,
  ...differentiatedThyroidCases,
];

function getCasesForPool(pool: CasePool): readonly AnyCase[] {
  switch (pool) {
    case "oral_cavity":
      return oralCavityCases;
    case "oropharynx_hpv_pos":
      return oropharynxHPVPosCases;
    case "oropharynx_hpv_neg":
      return oropharynxHPVNegCases;
    case "nasopharynx":
      return nasopharynxCases;
    case "larynx_glottic":
      return larynxGlotticCases;
    case "larynx_supraglottic":
      return larynxSupraglotticCases;
    case "larynx_subglottic":
      return larynxSubglotticCases;
    case "hypopharynx":
      return hypopharynxCases;
    case "maxillary_sinus":
      return maxillarySinusCases;
    case "differentiated_thyroid":
      return differentiatedThyroidCases;
    case "mixed":
    default:
      return mixedCases;
  }
}

// ---- Type guards ----
function isOralCavityCase(c: AnyCase): c is OralCavityCase {
  return (c as any)?.site_group === "oral_cavity" || ((c as any)?.tumor?.doi_mm !== undefined && (c as any)?.tumor?.size_cm !== undefined);
}

function isOropharynxHPVPosCase(c: AnyCase): c is OropharynxHPVPosCase {
  return (c as any)?.site_group === "oropharynx_hpv_pos";
}

function isOropharynxHPVNegCase(c: AnyCase): c is OropharynxHPVNegCase {
  return (c as any)?.site_group === "oropharynx_hpv_neg";
}

function isOropharynxCase(c: AnyCase): c is OropharynxHPVPosCase | OropharynxHPVNegCase {
  const g = (c as any)?.site_group;
  return g === "oropharynx_hpv_pos" || g === "oropharynx_hpv_neg";
}

function isNasopharynxCase(c: AnyCase): c is NasopharynxCase {
  return (c as any)?.site_group === "nasopharynx";
}

function isLarynxGlotticCase(c: AnyCase): c is LarynxGlotticCase {
  return (c as any)?.site_group === "larynx" && (c as any)?.subsite === "glottic";
}

function isLarynxSupraglotticCase(c: AnyCase): c is LarynxSupraglotticCase {
  return (c as any)?.site_group === "larynx" && (c as any)?.subsite === "supraglottic";
}

// structured subglottic (if you later add site_group/subsite)
function isLarynxSubglotticStructuredCase(c: AnyCase): boolean {
  return (c as any)?.site_group === "larynx" && (c as any)?.subsite === "subglottic";
}

// inputs-shaped subglottic (your current de-keyed cases)
function isLarynxSubglotticInputsCase(c: AnyCase): c is SubglotticInputsCase {
  return typeof (c as any)?.prompt === "string" && (c as any)?.inputs && !((c as any)?.tumor);
}

function isHypopharynxCase(c: AnyCase): c is HypopharynxCase {
  return (c as any)?.site_group === "hypopharynx";
}

function isMaxillarySinusCase(c: AnyCase): c is MaxillarySinusCase {
  return (c as any)?.site_group === "paranasal_sinus" && (c as any)?.subsite === "maxillary_sinus";
}

function isDifferentiatedThyroidCase(c: AnyCase): c is DifferentiatedThyroidCase {
  return (c as any)?.site_group === "differentiated_thyroid";
}

function moduleIdForCase(c: AnyCase): ModuleId {
  if (isNasopharynxCase(c)) return "nasopharynx";
  if (isOropharynxHPVPosCase(c)) return "oropharynx_hpv_pos";
  if (isOropharynxHPVNegCase(c)) return "oropharynx_hpv_neg";
  if (isLarynxGlotticCase(c)) return "larynx_glottic";
  if (isLarynxSupraglotticCase(c)) return "larynx_supraglottic";
  if (isLarynxSubglotticStructuredCase(c) || isLarynxSubglotticInputsCase(c)) return "larynx_subglottic";
  if (isHypopharynxCase(c)) return "hypopharynx";
  if (isMaxillarySinusCase(c)) return "maxillary_sinus";
  if (isDifferentiatedThyroidCase(c)) return "differentiated_thyroid";
  return "oral_cavity";
}

// ---- Helpers for display ----
function prettySubsiteLabel(subsite: OralCavityCase["subsite"]): string {
  switch (subsite) {
    case "oral_tongue":
      return "oral tongue";
    case "floor_of_mouth":
      return "floor of mouth";
    case "alveolar_ridge":
      return "alveolar ridge / gingiva";
    case "buccal_mucosa":
      return "buccal mucosa";
    case "hard_palate":
      return "hard palate";
    case "retromolar_trigone":
      return "retromolar trigone";
    default:
      return "oral cavity";
  }
}

function prettySite(c: AnyCase) {
  if (isNasopharynxCase(c)) return "nasopharynx";
  if (isLarynxGlotticCase(c)) return "glottic larynx";
  if (isLarynxSupraglotticCase(c)) return "supraglottic larynx";
  if (isLarynxSubglotticStructuredCase(c) || isLarynxSubglotticInputsCase(c)) return "subglottic larynx";
  if (isHypopharynxCase(c)) return "hypopharynx";
  if (isMaxillarySinusCase(c)) return "maxillary sinus";
  if (isDifferentiatedThyroidCase(c)) return "differentiated thyroid carcinoma";

  if (isOropharynxCase(c)) {
    const lat = (c as any).stem?.laterality;
    const sub =
      (c as any).subsite === "base_of_tongue"
        ? "base of tongue"
        : (c as any).subsite === "soft_palate"
        ? "soft palate"
        : (c as any).subsite === "pharyngeal_wall"
        ? "pharyngeal wall"
        : (c as any).subsite === "unknown_primary"
        ? "unknown primary"
        : "tonsil";

    if (lat && lat !== "midline") return `${lat} ${sub}`;
    if (lat === "midline") return `midline ${sub}`;
    return `${sub}`;
  }

  if (isOralCavityCase(c)) {
    const oc = c as OralCavityCase;
    const base = prettySubsiteLabel(oc.subsite);
    const lat = oc.stem?.laterality;
    if (lat && lat !== "midline") return `${lat} ${base}`;
    if (lat === "midline") return `midline ${base}`;
    return base;
  }

  return "head & neck";
}

function renderStemOrPrompt(c: AnyCase) {
  // For inputs-shaped cases, show the vignette prompt directly.
  if (typeof (c as any)?.prompt === "string") return (c as any).prompt;

  const s = (c as any).stem ?? {};
  const parts: string[] = [];

  if (s.age && s.sex) parts.push(`${s.age}-year-old ${s.sex}`);

  if (s.risk && s.risk !== "none") {
    const riskLabel = s.risk === "both" ? "alcohol and tobacco" : s.risk === "etoh" ? "alcohol" : s.risk;
    parts.push(`risk: ${riskLabel}`);
  }

  const site = prettySite(c);

  if (s.symptom) {
    parts.push(`presents with ${s.symptom} of the ${site}`);
  } else {
    parts.push(`with a lesion of the ${site}`);
  }

  return parts.length ? parts.join(", ") : "Head & neck SCC case";
}

function renderValue(v: any): string {
  if (v === null || v === undefined) return "—";
  if (typeof v === "boolean") return v ? "yes" : "no";
  if (Array.isArray(v)) return v.length ? v.join(", ") : "—";
  if (typeof v === "number") return Number.isFinite(v) ? String(v) : "—";
  if (typeof v === "string") return v.length ? v : "—";
  if (typeof v === "object") return "…";
  return String(v);
}

function ChoiceGrid<T extends string>(props: {
  title: string;
  choices: readonly T[];
  value: T | "";
  onChange: (v: T) => void;
  submitted: boolean;
  correctValue: T;
  isMobile: boolean;
}) {
  const { title, choices, value, onChange, submitted, correctValue, isMobile } = props;

  return (
    <div>
      <div style={{ marginBottom: 8, fontSize: 16 }}>{title}</div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, minmax(0, 1fr))" : "repeat(4, minmax(0, 1fr))",
          gap: 10,
        }}
      >
        {choices.map((x) => {
          const isSelected = value === x;
          const isCorrect = x === correctValue;

          let border = isSelected ? "2px solid #f9fafb" : "1px solid #4b5563";
          let background = isSelected ? "#1f2937" : "#111827";
          let opacity = 1;

          if (submitted) {
            opacity = isCorrect || isSelected ? 1 : 0.6;

            if (isCorrect) {
              border = "2px solid #22c55e";
              background = "#14532d";
            } else if (isSelected && !isCorrect) {
              border = "2px solid #ef4444";
              background = "#7f1d1d";
            } else {
              border = "1px solid #4b5563";
              background = "#020617";
            }
          }

          return (
            <button
              key={x}
              type="button"
              onClick={() => onChange(x)}
              disabled={submitted}
              style={{
                padding: "12px 10px",
                borderRadius: 12,
                border,
                background,
                color: "#f9fafb",
                cursor: submitted ? "default" : "pointer",
                opacity,
                textAlign: "center",
                fontSize: 16,
              }}
            >
              {x}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function titleCaseFromSnake(key: string) {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function yn(v: any) {
  if (typeof v === "boolean") return v ? "yes" : "no";
  if (v === "yes" || v === "no") return v;
  return renderValue(v);
}

function prettyTumorLine(tumor: any, key: string, label?: string) {
  const v = tumor?.[key];
  const textLabel = label ?? titleCaseFromSnake(key);
  return (
    <li key={key}>
      {textLabel}: {yn(v)}
    </li>
  );
}

function prettyTumorLineNumber(tumor: any, key: string, label?: string, suffix = "") {
  const v = tumor?.[key];
  const textLabel = label ?? titleCaseFromSnake(key);
  return (
    <li key={key}>
      {textLabel}: {typeof v === "number" ? `${v}${suffix}` : renderValue(v)}
    </li>
  );
}

export default function StagingDojo() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      if (typeof window !== "undefined") setIsMobile(window.innerWidth < 768);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const [pool, setPool] = useState<CasePool>("oral_cavity");

  const cases = useMemo(() => {
    const list = getCasesForPool(pool);
    if (!list || list.length === 0) return mixedCases;
    return list;
  }, [pool]);

  const [caseIdx, setCaseIdx] = useState(() => randIndex(oralCavityCases.length));

  const clampedIdx = useMemo(() => {
    return Math.min(caseIdx, cases.length - 1);
  }, [caseIdx, cases.length]);

  const c = cases[clampedIdx]!;

  const feedbackUrl = c?.id
    ? `https://docs.google.com/forms/d/e/1FAIpQLSebfGEEnAVhneAXZsHibWc_64qfJ9Q8tXXQ3YnaXgd4YKjHJA/viewform?usp=pp_url&entry.1860175722=${encodeURIComponent(c.id)}`
    : "https://docs.google.com/forms/d/e/1FAIpQLSebfGEEnAVhneAXZsHibWc_64qfJ9Q8tXXQ3YnaXgd4YKjHJA/viewform";

  type AnyT = string;
  type AnyN = string;
  type AnyStage = string;

  const [userT, setUserT] = useState<AnyT | "">("");
  const [userN, setUserN] = useState<AnyN | "">("");
  const [userStage, setUserStage] = useState<AnyStage | "">("");
  const [submitted, setSubmitted] = useState(false);
  const [countedThisCase, setCountedThisCase] = useState(false);

  const correct = useMemo(() => {
    // Nasopharynx (AJCC Version 9; M0 assumed)
    if (isNasopharynxCase(c)) {
      const T = computeT_Nasopharynx(c.tumor);
      const N = computeN_Nasopharynx(c.nodes);
      const stage = computeStageGroup_Nasopharynx(T, N);
      return { T, N, stage };
    }

    // Larynx glottic
    if (isLarynxGlotticCase(c)) {
      const T = normalizeT(computeT_LarynxGlottic((c as any).tumor));
      const N = computeN_LarynxGlottic(getNodesOrDefault(c));
      const stage = computeStageGroup_LarynxGlottic(T as any, N as any);
      return { T, N, stage };
    }

    // Larynx supraglottic
    if (isLarynxSupraglotticCase(c)) {
      const T = normalizeT(computeT_Supraglottic((c as any).tumor));
      const N = computeN_LarynxGlottic(getNodesOrDefault(c));
      const stage = computeStageGroup_LarynxGlottic(T as any, N as any);
      return { T, N, stage };
    }

    // Larynx subglottic (structured)
    if (isLarynxSubglotticStructuredCase(c)) {
      const T = normalizeT(computeT_LarynxSubglottic((c as any).tumor));
      const N = computeN_LarynxGlottic(getNodesOrDefault(c));
      const stage = computeStageGroup_LarynxGlottic(T as any, N as any);
      return { T, N, stage };
    }

    // Larynx subglottic (inputs-shaped)
    if (isLarynxSubglotticInputsCase(c)) {
      const T = normalizeT(computeT_LarynxSubglottic((c as any).inputs));
      const N = computeN_LarynxGlottic(getNodesOrDefault(c));
      const stage = computeStageGroup_LarynxGlottic(T as any, N as any);
      return { T, N, stage };
    }

    // Hypopharynx
    if (isHypopharynxCase(c)) {
      const T = normalizeT(computeT_Hypopharynx((c as any).tumor));
      const N = computeN_LarynxGlottic(getNodesOrDefault(c));
      const stage = computeStageGroup_LarynxGlottic(T as any, N as any);
      return { T, N, stage };
    }

    // Maxillary sinus
    if (isMaxillarySinusCase(c)) {
      const T = normalizeT(computeT_MaxillarySinus((c as any).tumor));
      const N = computeN_MaxillarySinus(getNodesOrDefault(c));
      const stage = computeStageGroup_MaxillarySinus(T as any, N as any);
      return { T, N, stage };
    }

    // Differentiated thyroid carcinoma
    if (isDifferentiatedThyroidCase(c)) {
      const T = normalizeT(computeT_DifferentiatedThyroid((c as any).tumor));
      const N = computeN_DifferentiatedThyroid((c as any).nodes);
      const stage = computeStageGroup_DifferentiatedThyroid((c as any).age, T as any, N as any);
      return { T, N, stage };
    }

    // Oropharynx HPV+
    if (isOropharynxHPVPosCase(c)) {
      const T = normalizeT(computeT_OropharynxHPVPos(c.tumor));
      const N = computeN_OropharynxHPVPos(c.nodes);
      const stage = computeStageGroup_OropharynxHPVPos(T as any, N);
      return { T, N, stage };
    }

    // Oropharynx HPV−
    if (isOropharynxHPVNegCase(c)) {
      const T = normalizeT(computeT_OropharynxHPVNeg((c as any).tumor));
      const N = computeN_OropharynxHPVNeg(getNodesOrDefault(c));
      const stage = computeStageGroup_OropharynxHPVNeg(T as any, N as any);
      return { T, N, stage };
    }

    // Oral cavity (ONLY if actually oral cavity)
    if (isOralCavityCase(c)) {
      const oc = c as OralCavityCase;
      const T = normalizeT(computeT(oc.tumor));
      const N = computeN(oc.nodes);
      const stage = computeStageGroup(T as any, N as any);
      return { T, N, stage };
    }

    // Absolute fallback (should not happen): don’t crash
    return { T: "T1", N: "N0", stage: "I" };
  }, [c]);

  const resetForNext = () => {
    setSubmitted(false);
    setUserT("");
    setUserN("");
    setUserStage("");
    setCountedThisCase(false);

    const list = getCasesForPool(pool) || mixedCases;
    const safeList = list.length > 0 ? list : mixedCases;
    setCaseIdx(safeList.length > 0 ? randIndex(safeList.length) : 0);
  };

  const handlePoolChange = (next: CasePool) => {
    if (next === pool) return;
    const nextCases = getCasesForPool(next);
    setPool(next);
    setCaseIdx(randIndex(nextCases.length));
    setSubmitted(false);
    setUserT("");
    setUserN("");
    setUserStage("");
    setCountedThisCase(false);
  };

  const canSubmit = Boolean(userT && userN && userStage);
  const activeModuleId = moduleIdForCase(c);
  const activeMetadata = moduleMetadata[activeModuleId];
  const tChoices = activeMetadata.tChoices;
  const nChoices = activeMetadata.nChoices;
  const stageChoices = activeMetadata.stageChoices;

  const tCorrect = submitted && userT === correct.T;
  const nCorrect = submitted && userN === correct.N;
  const stageCorrect = submitted && userStage === correct.stage;

  const Findings = () => {
if (isNasopharynxCase(c)) {
  const featureLabels: Record<string, string> = {
    nasal_cavity: "nasal cavity",
    oropharynx: "oropharynx",
    parapharyngeal_space: "parapharyngeal space",
    medial_pterygoid_muscle: "medial pterygoid muscle",
    lateral_pterygoid_muscle: "lateral pterygoid muscle",
    prevertebral_muscle: "prevertebral muscle",
    unequivocal_skull_base_bone: "unequivocal skull-base bone invasion",
    unequivocal_pterygoid_bone: "unequivocal pterygoid bone invasion",
    unequivocal_cervical_vertebra: "unequivocal cervical vertebral invasion",
    paranasal_sinus: "paranasal sinus",
    intracranial_extension: "intracranial extension",
    unequivocal_cranial_nerve_involvement: "unequivocal cranial-nerve involvement",
    hypopharynx: "hypopharynx",
    orbit_or_inferior_orbital_fissure: "orbit / inferior orbital fissure",
    parotid_gland: "parotid gland",
    beyond_anterolateral_lateral_pterygoid: "beyond anterolateral surface of lateral pterygoid",
  };
  const features = c.tumor.features.map((feature) => featureLabels[feature]);
  return (
    <ul style={{ marginTop: 0, marginBottom: 0, lineHeight: 1.7, fontSize: 18 }}>
      <li>Primary extent: {features.length ? features.join(", ") : "confined to nasopharynx"}</li>
      <li>Cervical nodes: {c.nodes.cervical_laterality}</li>
      <li>Retropharyngeal nodes: {c.nodes.retropharyngeal_laterality}</li>
      <li>Largest node: {c.nodes.largest_node_cm} cm</li>
      <li>Extends below caudal cricoid border: {c.nodes.extends_below_caudal_cricoid ? "yes" : "no"}</li>
      <li>Advanced ENE in cervical node: {c.nodes.advanced_ene_cervical ? "yes" : "no"}</li>
      {c.nodes.advanced_ene_retropharyngeal && <li>Advanced ENE attributed only to retropharyngeal node: yes</li>}
    </ul>
  );
}

if (isDifferentiatedThyroidCase(c)) {
  const tumor = (c as any).tumor ?? {};
  const nodes = (c as any).nodes ?? {};

  const eteLabel: Record<string, string> = {
    none: "none",
    strap_muscles_only: "strap muscles only",
    subcutaneous_soft_tissue: "subcutaneous soft tissue",
    larynx: "larynx",
    trachea: "trachea",
    esophagus: "esophagus",
    recurrent_laryngeal_nerve: "recurrent laryngeal nerve",
    prevertebral_fascia: "prevertebral fascia",
    carotid_encasement: "carotid encasement",
    mediastinal_vessel_encasement: "mediastinal vessel encasement",
  };

  return (
    <ul style={{ marginTop: 0, marginBottom: 0, lineHeight: 1.7, fontSize: 18 }}>
      <li>Age: {(c as any).age}</li>
      <li>Histology: {(c as any).histology}</li>
      <li>Maximum tumor dimension: {tumor.max_dimension_cm} cm</li>
      <li>Gross extrathyroidal extension: {eteLabel[tumor.gross_extrathyroidal_extension] ?? renderValue(tumor.gross_extrathyroidal_extension)}</li>
      <li>Multifocal: {tumor.multifocal ? "yes" : "no"}</li>
      <li>Regional nodes involved: {nodes.involved ? "yes" : "no"}</li>
      {nodes.involved && <li>Nodal compartments: {Array.isArray(nodes.compartments) && nodes.compartments.length ? nodes.compartments.join(", ") : "—"}</li>}
      {nodes.involved && <li>Nodal laterality: {renderValue(nodes.laterality)}</li>}
    </ul>
  );
}

if (isMaxillarySinusCase(c)) {
  const tumor = (c as any).tumor ?? {};
  const nodes = getNodesOrDefault(c);

  const involvedStructures = [
    ["Bone erosion/destruction", tumor.bone_erosion_or_destruction],
    ["Hard palate", tumor.hard_palate],
    ["Middle nasal meatus", tumor.middle_nasal_meatus],
    ["Posterior maxillary sinus wall", tumor.posterior_wall_maxillary_sinus],
    ["Subcutaneous tissues", tumor.subcutaneous_tissues],
    ["Orbital floor / medial wall", tumor.orbital_floor_or_medial_wall],
    ["Pterygoid fossa", tumor.pterygoid_fossa],
    ["Ethmoid sinus", tumor.ethmoid_sinus],
    ["Anterior orbital contents", tumor.anterior_orbital_contents],
    ["Cheek skin", tumor.cheek_skin],
    ["Pterygoid plates", tumor.pterygoid_plates],
    ["Infratemporal fossa", tumor.infratemporal_fossa],
    ["Cribriform plate", tumor.cribriform_plate],
    ["Sphenoid sinus", tumor.sphenoid_sinus],
    ["Frontal sinus", tumor.frontal_sinus],
    ["Orbital apex", tumor.orbital_apex],
    ["Dura", tumor.dura],
    ["Brain", tumor.brain],
    ["Middle cranial fossa", tumor.middle_cranial_fossa],
    ["Cranial nerve other than V2", tumor.cranial_nerve_other_than_v2],
    ["Nasopharynx", tumor.nasopharynx],
    ["Clivus", tumor.clivus],
  ].filter(([, present]) => Boolean(present));

  return (
    <ul style={{ marginTop: 0, marginBottom: 0, lineHeight: 1.7, fontSize: 18 }}>
      <li>Primary site: maxillary sinus</li>
      <li>Involved structures: {involvedStructures.length ? involvedStructures.map(([label]) => label).join(", ") : "maxillary sinus mucosa only"}</li>
      <li>
        Nodes: positive nodes {nodes.positive_node_count}
        {nodes.laterality ? `, laterality ${nodes.laterality}` : ""}
        {typeof nodes.largest_node_cm === "number" ? `, largest ${nodes.largest_node_cm} cm` : ""}
        {typeof nodes.ene === "boolean" ? `, clinically overt ENE ${nodes.ene ? "yes" : "no"}` : ""}
      </li>
    </ul>
  );
}

if (isLarynxSubglotticInputsCase(c) || isLarynxSubglotticStructuredCase(c)) {
  const tumor = isLarynxSubglotticInputsCase(c) ? (c as any).inputs ?? {} : (c as any).tumor ?? {};
  const nodes = getNodesOrDefault(c);

  return (
     <ul style={{ marginTop: 0, marginBottom: 0, lineHeight: 1.7, fontSize: 18 }}>
      {prettyTumorLine(tumor, "primary_tumor_assessable", "Primary tumor assessable")}
      {prettyTumorLine(tumor, "limited_to_subglottis", "Limited to subglottis")}
      {prettyTumorLine(tumor, "extends_to_vocal_cord", "Extends to vocal cord")}
      {prettyTumorLine(tumor, "paraglottic_space_invasion", "Paraglottic space invasion")}
          <li>Vocal cord mobility: {renderValue(tumor.vocal_cord_mobility)}</li>

      <li>Thyroid cartilage invasion: {renderValue(tumor.thyroid_cartilage)}</li>

      <li>Extralaryngeal extension: {renderValue(tumor.extralaryngeal_extension)}</li>

      <li>Unresectable feature: {renderValue(tumor.unresectable_feature)}</li>



      <li>
        Nodes: positive nodes {nodes.positive_node_count}
        {nodes.laterality ? `, laterality ${nodes.laterality}` : ""}
        {typeof nodes.largest_node_cm === "number" ? `, largest ${nodes.largest_node_cm} cm` : ""}
        {typeof nodes.ene === "boolean" ? `, clinically overt ENE ${nodes.ene ? "yes" : "no"}` : ""}
      </li>
    </ul>
  );
}

if (isHypopharynxCase(c)) {
  const tumor = (c as any).tumor ?? {};
  const nodes = getNodesOrDefault(c);

  return (
    <ul style={{ marginTop: 0, marginBottom: 0, lineHeight: 1.7, fontSize: 18 }}>
      {prettyTumorLine(tumor, "primary_tumor_assessable", "Primary tumor assessable")}
      {prettyTumorLine(tumor, "no_primary_tumor_identified", "No primary tumor identified")}
      {prettyTumorLine(tumor, "carcinoma_in_situ", "Carcinoma in situ ")}

      {prettyTumorLineNumber(tumor, "max_dimension_cm", "Max dimension", " cm")}
      {prettyTumorLine(tumor, "limited_to_one_subsite", "Limited to one hypopharynx subsite")}
      <li>Adjacent site involvement: {renderValue(tumor.adjacent_site_involvement)}</li>
      <li>Vocal cord mobility: {renderValue(tumor.vocal_cord_mobility)}</li>
      {prettyTumorLine(tumor, "extends_to_esophagus", "Extends to (cervical) esophagus")}

      <li>Cartilage invasion: {renderValue(tumor.cartilage_invasion)}</li>
      {prettyTumorLine(tumor, "hyoid_invasion", "Hyoid invasion")}
      {prettyTumorLine(tumor, "thyroid_gland_invasion", "Thyroid gland invasion")}
      {prettyTumorLine(tumor, "soft_tissue_neck_invasion", "Neck soft-tissue invasion")}
      <li>Unresectable feature: {renderValue(tumor.unresectable_feature)}</li>

      <li>
        Nodes: positive nodes {nodes.positive_node_count}
        {nodes.laterality ? `, laterality ${nodes.laterality}` : ""}
        {typeof nodes.largest_node_cm === "number" ? `, largest ${nodes.largest_node_cm} cm` : ""}
        {typeof nodes.ene === "boolean" ? `, clinically overt ENE ${nodes.ene ? "yes" : "no"}` : ""}
      </li>
    </ul>
  );
}


    if (isLarynxGlotticCase(c)) {
      const tumor = (c as any).tumor ?? {};
      const nodes = getNodesOrDefault(c);

      return (
        <ul style={{ marginTop: 0, marginBottom: 0, lineHeight: 1.7, fontSize: 18 }}>
          <li>Vocal cord mobility: {tumor.vocal_cord_mobility}</li>
          <li>In situ (Tis): {tumor.in_situ ? "yes" : "no"}</li>
          <li>Extends to supraglottis: {tumor.extends_to_supraglottis ? "yes" : "no"}</li>
          <li>Extends to subglottis: {tumor.extends_to_subglottis ? "yes" : "no"}</li>
          <li>Paraglottic space invasion: {tumor.paraglottic_space_invasion ? "yes" : "no"}</li>
          <li>
            Cartilage through cortex / extralaryngeal extension:{" "}
            {tumor.cartilage_through_cortex_or_extralaryngeal ? "yes" : "no"}
          </li>
          <li>
            Very advanced extension: {tumor.very_advanced_extension ? "yes" : "no"}
          </li>
          <li>
            Nodes: positive nodes {nodes.positive_node_count}
            {nodes.laterality ? `, laterality ${nodes.laterality}` : ""}
            {typeof nodes.largest_node_cm === "number" ? `, largest ${nodes.largest_node_cm} cm` : ""}
            {typeof nodes.ene === "boolean" ? `, clinically overt ENE ${nodes.ene ? "yes" : "no"}` : ""}
          </li>
        </ul>
      );
    }

    if (isLarynxSupraglotticCase(c)) {
      const tumor = (c as any).tumor ?? {};
      const nodes = getNodesOrDefault(c);

      return (
        <ul style={{ marginTop: 0, marginBottom: 0, lineHeight: 1.7, fontSize: 18 }}>
          <li>
            Supraglottic subsites involved:{" "}
            {Array.isArray(tumor.involved_supraglottic_subsites)
              ? tumor.involved_supraglottic_subsites.join(", ")
              : "—"}
          </li>
          <li>Cord mobility: {tumor.cord_mobility ?? "—"}</li>
          <li>In situ (Tis): {tumor.tis ? "yes" : "no"}</li>
          <li>Extends to glottis: {tumor.extends_to_glottis ? "yes" : "no"}</li>
          <li>Extends to vallecula: {tumor.extends_to_vallecula ? "yes" : "no"}</li>
          <li>Invades pre-epiglottic space: {tumor.invades_pre_epiglottic_space ? "yes" : "no"}</li>
          <li>Invades paraglottic space: {tumor.invades_paraglottic_space ? "yes" : "no"}</li>
          <li>Invades postcricoid area: {tumor.invades_postcricoid_area ? "yes" : "no"}</li>
          <li>Inner cortex thyroid cartilage: {tumor.inner_cortex_thyroid_cartilage ? "yes" : "no"}</li>
          <li>
            Extralaryngeal invasion:{" "}
            {Array.isArray(tumor.extralaryngeal_invasion) && tumor.extralaryngeal_invasion.length
              ? tumor.extralaryngeal_invasion.join(", ")
              : "no"}
          </li>
          <li>
            Very advanced invasion:{" "}
            {Array.isArray(tumor.very_advanced_invasion) && tumor.very_advanced_invasion.length
              ? tumor.very_advanced_invasion.join(", ")
              : "no"}
          </li>
          <li>
            Nodes: positive nodes {nodes.positive_node_count}
            {nodes.laterality ? `, laterality ${nodes.laterality}` : ""}
            {typeof nodes.largest_node_cm === "number" ? `, largest ${nodes.largest_node_cm} cm` : ""}
            {typeof nodes.ene === "boolean" ? `, clinically overt ENE ${nodes.ene ? "yes" : "no"}` : ""}
          </li>
        </ul>
      );
    }

    if (isOropharynxHPVPosCase(c)) {
      const t4 = c.tumor.t4_structures?.join(", ") ?? "none";
      return (
        <ul style={{ marginTop: 0, marginBottom: 0, lineHeight: 1.7, fontSize: 18 }}>
          <li>Tumor size: {c.tumor.size_cm} cm</li>
          <li>Lingual epiglottic extension: {c.tumor.extends_to_lingual_epiglottis ? "yes" : "no"}</li>
          <li>T4 structure invasion: {t4}</li>
          <li>Nodes: {c.nodes.positive_node_count} radiographically involved, {c.nodes.laterality}, largest {c.nodes.largest_node_cm} cm</li>
          <li>Unequivocal imaging ENE: {c.nodes.unequivocal_imaging_ene ? "yes" : "no"}</li>
          <li>HPV status: associated</li>
        </ul>
      );
    }

    if (isOropharynxHPVNegCase(c)) {
      const hpvLabel = isOropharynxHPVNegCase(c) ? "negative" : "positive";
      const tumor = (c as any).tumor ?? {};
      const nodes = getNodesOrDefault(c);

      const adv = Boolean(tumor.advanced_local_extension);
      const veryAdv = Boolean(tumor.very_advanced_local_extension);

      return (
        <ul style={{ marginTop: 0, marginBottom: 0, lineHeight: 1.7, fontSize: 18 }}>
          <li>Tumor size: {tumor.size_cm} cm</li>
          <li>Advanced local extension: {adv ? "yes" : "no"}</li>
          <li>Very advanced extension: {veryAdv ? "yes" : "no"}</li>
          <li>
            Nodes: positive nodes {nodes.positive_node_count}
            {nodes.laterality ? `, laterality ${nodes.laterality}` : ""}
            {typeof nodes.largest_node_cm === "number" ? `, largest ${nodes.largest_node_cm} cm` : ""}
            {typeof nodes.ene === "boolean" ? `, clinically overt ENE ${nodes.ene ? "yes" : "no"}` : ""}
          </li>
          <li>HPV status: {hpvLabel}</li>
        </ul>
      );
    }

    if (isOralCavityCase(c)) {
      const oc = c as OralCavityCase;
      return (
        <ul style={{ marginTop: 0, marginBottom: 0, lineHeight: 1.7, fontSize: 18 }}>
          <li>Tumor size: {oc.tumor.size_cm} cm</li>
          <li>Depth of invasion: {oc.tumor.doi_mm} mm</li>
          <li>Through-cortical bone invasion: {oc.tumor.bone_invasion ? "yes" : "no"}</li>
          <li>Extrinsic muscle involved: {oc.tumor.extrinsic_muscle_involved ? "yes" : "no"}</li>
          <li>Skin invasion: {oc.tumor.skin_invasion ? "yes" : "no"}</li>
          <li>Maxillary sinus invasion: {oc.tumor.maxillary_sinus_invasion ? "yes" : "no"}</li>
          <li>Masticator space / pterygoid plate / skull base / carotid involvement: {oc.tumor.masticator_space_invasion || oc.tumor.pterygoid_plate_invasion || oc.tumor.skull_base_invasion || oc.tumor.internal_carotid_encasement ? "yes" : "no"}</li>
          <li>
            Nodes: count {oc.nodes.node_count}, laterality {oc.nodes.laterality}, largest {oc.nodes.largest_node_cm} cm, clinically overt ENE{" "}
            {oc.nodes.ene ? "yes" : "no"}
          </li>
        </ul>
      );
    }

    return <div style={{ fontSize: 18 }}>—</div>;
  };

  return (
    <div
      style={{
        maxWidth: 980,
        margin: "0 auto",
        padding: 16,
        fontFamily: "system-ui, sans-serif",
        minHeight: "100vh",
        backgroundColor: "#020617",
        color: "#e5e7eb",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <Image
          src="/crabs.png"
          alt="CrabsMcChaffey crab logo"
          width={120}
          height={60}
          style={{ borderRadius: 12, objectFit: "cover" }}
        />

        <h1 style={{ margin: 0, fontSize: 24 }}>🦀🦀 CrabsMcChaffey Staging Dojo 🦀🦀</h1>
        <p style={{ margin: 0, fontSize: 14, color: "#9ca3af" }}>Interactive clinical TNM drills for head and neck cancer</p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
        {(
          [
            "oral_cavity",
            "oropharynx_hpv_pos",
            "oropharynx_hpv_neg",
            "nasopharynx",
            "larynx_glottic",
            "larynx_supraglottic",
            "larynx_subglottic",
            "hypopharynx",
            "maxillary_sinus",
            "differentiated_thyroid",
            "mixed",
          ] as readonly CasePool[]
        ).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => handlePoolChange(value)}
            style={{
              padding: "6px 12px",
              borderRadius: 999,
              border: "1px solid #4b5563",
              backgroundColor: pool === value ? "#1f2937" : "transparent",
              color: "#e5e7eb",
              cursor: "pointer",
              fontSize: 13,
              whiteSpace: "nowrap",
            }}
          >
            {value === "mixed" ? "Mixed" : moduleMetadata[value].label}
          </button>
        ))}
      </div>

      <div style={{ color: "#93c5fd", marginBottom: 12, fontSize: 14, fontWeight: 600 }}>
        {stagingSystemLabel(activeModuleId)} · M0 assumed; M category is not tested
      </div>

      <div style={{ color: "#e5e7eb", marginBottom: 16, fontSize: 18 }}>{renderStemOrPrompt(c)}</div>

      <div style={{ border: "1px solid #4b5563", borderRadius: 16, padding: 18, marginBottom: 18, background: "#020617" }}>
        <div style={{ marginBottom: 10, fontSize: 18 }}>Findings</div>
        <Findings />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
          gap: 18,
          marginBottom: 18,
        }}
      >
        <ChoiceGrid
          title="Pick T"
          choices={tChoices as any}
          value={userT as any}
          onChange={(v) => setUserT(v)}
          submitted={submitted}
          correctValue={correct.T as any}
          isMobile={isMobile}
        />

        <ChoiceGrid
          title="Pick N"
          choices={nChoices as any}
          value={userN as any}
          onChange={(v) => setUserN(v)}
          submitted={submitted}
          correctValue={correct.N as any}
          isMobile={isMobile}
        />

        <ChoiceGrid
          title="Pick Stage Group"
          choices={stageChoices as any}
          value={userStage as any}
          onChange={(v) => setUserStage(v)}
          submitted={submitted}
          correctValue={correct.stage as any}
          isMobile={isMobile}
        />
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button
          onClick={async () => {
            setSubmitted(true);

            if (!countedThisCase) {
              setCountedThisCase(true);
              try {
                await fetch("/api/case-count", { method: "POST" });
              } catch {
                // ignore
              }
            }
          }}
          disabled={!canSubmit || submitted}
          style={{
            padding: "12px 16px",
            borderRadius: 12,
            border: "1px solid #4b5563",
            backgroundColor: canSubmit && !submitted ? "#1f2937" : "#020617",
            color: "#e5e7eb",
            cursor: canSubmit && !submitted ? "pointer" : "default",
            fontSize: 16,
          }}
        >
          Submit
        </button>

        <button
          onClick={resetForNext}
          style={{
            padding: "12px 16px",
            borderRadius: 12,
            border: "1px solid #4b5563",
            backgroundColor: "#020617",
            color: "#e5e7eb",
            cursor: "pointer",
            fontSize: 16,
          }}
        >
          Next case
        </button>
      </div>

      {submitted && (
        <div style={{ marginTop: 18, border: "1px solid #4b5563", borderRadius: 16, padding: 18, background: "#020617" }}>
          <div style={{ marginBottom: 10, fontSize: 18 }}>Results</div>
          <ul style={{ marginTop: 0, marginBottom: 0, lineHeight: 1.7, fontSize: 18 }}>
            <li>
              T: your answer {userT} → {tCorrect ? "correct" : `wrong (correct: ${correct.T})`}
            </li>
            <li>
              N: your answer {userN} → {nCorrect ? "correct" : `wrong (correct: ${correct.N})`}
            </li>
            <li>
              Stage: your answer {userStage} → {stageCorrect ? "correct" : `wrong (correct: ${correct.stage})`}
            </li>
          </ul>

          <div style={{ marginTop: 12, color: "#e5e7eb", fontSize: 18 }}>
            Teaching pearl: {(c as any).teaching_pearl ?? "—"}
          </div>

          <div style={{ marginTop: 14, fontSize: 14, color: "#9ca3af" }}>
            Think something is incorrect?{" "}
            <a
              href={feedbackUrl}
              target="_blank"
              rel="noreferrer"
              style={{ color: "#e5e7eb", textDecoration: "underline" }}
            >
              Report an issue
            </a>
          </div>
        </div>
      )}

      <footer
        style={{
          marginTop: 28,
          paddingTop: 14,
          borderTop: "1px solid #4b5563",
          color: "#9ca3af",
          fontSize: 13,
          lineHeight: 1.5,
          textAlign: "center",
        }}
      >
        <div>
          Built by{" "}
          <a
            href="https://medium.com/@chrishornung14"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#e5e7eb", textDecoration: "underline" }}
          >
            Chris Hornung, MD
          </a>
        </div>
        <CaseCountLine />
      </footer>
    </div>
  );
}
