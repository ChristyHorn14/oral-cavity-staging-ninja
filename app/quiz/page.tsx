"use client";

import React, { useEffect, useMemo, useState } from "react";
import { oralTongueCases } from "@/data/oralTongueCases";
import { floorOfMouthCases } from "@/data/floorOfMouthCases";
import { alveolarRidgeCases } from "@/data/alveolarRidgeCases";
import { buccalMucosaCases } from "@/data/buccalMucosaCases";
import { hardPalateCases } from "@/data/hardPalateCases";
import { retromolarTrigoneCases } from "@/data/retromolarTrigoneCases";
import Image from "next/image";

import { oropharynxHPVPosCases } from "@/data/oropharynxHPVPosCases";
import {
  computeT_OropharynxHPVPos_Path,
  computeN_OropharynxHPVPos_Path,
  computeStageGroup_OropharynxHPVPos_Path,
} from "@/lib/staging/oropharynxHPVPosPath";

import { oropharynxHPVNegCases } from "@/data/oropharynxHPVNegCases";
import {
  computeT_OropharynxHPVNeg,
  computeN_OropharynxHPVNeg,
  computeStageGroup_OropharynxHPVNeg,
} from "@/lib/staging/oropharynxHPVNeg";

import { larynxGlotticCases } from "@/data/larynxGlotticCases";
import {
  computeT_LarynxGlottic,
  computeN_LarynxGlottic,
  computeStageGroup_LarynxGlottic,
} from "@/lib/staging/larynxGlottic";

import { computeT, computeN, computeStageGroup } from "@/lib/staging/staging";
import { OralCavityCase } from "@/lib/staging/types";

function randIndex(n: number) {
  return Math.floor(Math.random() * n);
}

/**
 * Case typing
 * - Oral cavity uses your existing OralCavityCase.
 * - Oropharynx HPV+ and HPV− are separate shapes from data files.
 * - Larynx glottic uses its own case shape from data file.
 * We’ll treat them as a union locally.
 */
type OropharynxHPVPosCase = (typeof oropharynxHPVPosCases)[number];
type OropharynxHPVNegCase = (typeof oropharynxHPVNegCases)[number];
type LarynxGlotticCase = (typeof larynxGlotticCases)[number];

type AnyCase = OralCavityCase | OropharynxHPVPosCase | OropharynxHPVNegCase | LarynxGlotticCase;

type CasePool =
  | "oral_cavity"
  | "oropharynx_hpv_pos"
  | "oropharynx_hpv_neg"
  | "larynx_glottic"
  | "mixed";

// All oral cavity cases (all subsites)
const oralCavityCases: OralCavityCase[] = [
  ...oralTongueCases,
  ...floorOfMouthCases,
  ...alveolarRidgeCases,
  ...buccalMucosaCases,
  ...hardPalateCases,
  ...retromolarTrigoneCases,
];

// Mixed pool: oral cavity + HPV+ OP + HPV− OP + Larynx (glottic)
const mixedCases: readonly AnyCase[] = [
  ...oralCavityCases,
  ...oropharynxHPVPosCases,
  ...oropharynxHPVNegCases,
  ...larynxGlotticCases,
];

// Pool resolver
function getCasesForPool(pool: CasePool): readonly AnyCase[] {
  switch (pool) {
    case "oral_cavity":
      return oralCavityCases;
    case "oropharynx_hpv_pos":
      return oropharynxHPVPosCases;
    case "oropharynx_hpv_neg":
      return oropharynxHPVNegCases;
    case "larynx_glottic":
      return larynxGlotticCases;
    case "mixed":
    default:
      return mixedCases;
  }
}

/**
 * Oral cavity pretty labels (only used when c is OralCavityCase).
 */
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

function isOralCavityCase(c: AnyCase): c is OralCavityCase {
  return (c as any)?.site_group === "oral_cavity" || (c as any)?.tumor?.doi_mm !== undefined;
}

function isOropharynxHPVPosCase(c: AnyCase): c is OropharynxHPVPosCase {
  return (c as any)?.site_group === "oropharynx";
}

function isOropharynxHPVNegCase(c: AnyCase): c is OropharynxHPVNegCase {
  return (c as any)?.site_group === "oropharynx_hpv_neg";
}

function isOropharynxCase(c: AnyCase): c is OropharynxHPVPosCase | OropharynxHPVNegCase {
  const g = (c as any)?.site_group;
  return g === "oropharynx" || g === "oropharynx_hpv_neg";
}

function isLarynxGlotticCase(c: AnyCase): c is LarynxGlotticCase {
  return (c as any)?.site_group === "larynx" && (c as any)?.subsite === "glottic";
}

function prettySite(c: AnyCase) {
  if (isLarynxGlotticCase(c)) {
    return "glottic larynx";
  }

  if (isOropharynxCase(c)) {
    const lat = (c as any).stem?.laterality;
    const sub =
      (c as any).subsite === "base_of_tongue"
        ? "base of tongue"
        : (c as any).subsite === "soft_palate"
        ? "soft palate"
        : (c as any).subsite === "pharyngeal_wall"
        ? "pharyngeal wall"
        : "tonsil";

    if (lat && lat !== "midline") return `${lat} ${sub}`;
    if (lat === "midline") return `midline ${sub}`;
    return `${sub}`;
  }

  // Oral cavity
  const oc = c as OralCavityCase;
  const base = prettySubsiteLabel(oc.subsite);
  const lat = oc.stem?.laterality;
  if (lat && lat !== "midline") return `${lat} ${base}`;
  if (lat === "midline") return `midline ${base}`;
  return base;
}

function renderStem(c: AnyCase) {
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

export default function QuizPage() {
  // ----- responsive layout -----
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768);
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ----- case pools -----
  const [pool, setPool] = useState<CasePool>("oral_cavity");

  const cases = useMemo(() => {
    const list = getCasesForPool(pool);
    if (!list || list.length === 0) return mixedCases;
    return list;
  }, [pool]);

  const safeCases = cases.length > 0 ? cases : mixedCases;

  // IMPORTANT: caseIdx must be clamped to the current safeCases length
  const [caseIdx, setCaseIdx] = useState(0);

  const clampedIdx = useMemo(() => {
    if (!safeCases || safeCases.length === 0) return 0;
    return Math.min(caseIdx, safeCases.length - 1);
  }, [caseIdx, safeCases.length]);

  const c = safeCases[clampedIdx];

  // ---- answer state (string unions) ----
  type AnyT = string;
  type AnyN = string;
  type AnyStage = string;

  const [userT, setUserT] = useState<AnyT | "">("");
  const [userN, setUserN] = useState<AnyN | "">("");
  const [userStage, setUserStage] = useState<AnyStage | "">("");
  const [submitted, setSubmitted] = useState(false);

  // If pool changes, ensure caseIdx is valid + reset answers
  useEffect(() => {
    const list = getCasesForPool(pool);
    const safeList = list && list.length > 0 ? list : mixedCases;

    const nextIdx = safeList.length > 0 ? randIndex(safeList.length) : 0;
    setCaseIdx(nextIdx);

    setSubmitted(false);
    setUserT("");
    setUserN("");
    setUserStage("");
  }, [pool]);

  // If something ever goes weird (shouldn't after clamping), fail gracefully
  if (!c) {
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
        Loading…
      </div>
    );
  }

  const correct = useMemo(() => {
    if (isLarynxGlotticCase(c)) {
      const T = computeT_LarynxGlottic(c.tumor);
      const N = computeN_LarynxGlottic(c.nodes);
      const stage = computeStageGroup_LarynxGlottic(T as any, N as any);
      return { T, N, stage };
    }

    if (isOropharynxHPVPosCase(c)) {
      const T = computeT_OropharynxHPVPos_Path(c.tumor);
      const N = computeN_OropharynxHPVPos_Path(c.nodes);
      const stage = computeStageGroup_OropharynxHPVPos_Path(T, N);
      return { T, N, stage };
    }

    if (isOropharynxHPVNegCase(c)) {
      const T = computeT_OropharynxHPVNeg(c.tumor);
      const N = computeN_OropharynxHPVNeg(c.nodes);
      const stage = computeStageGroup_OropharynxHPVNeg(T, N);
      return { T, N, stage };
    }

    // Oral cavity default
    const oc = c as OralCavityCase;
    const T = computeT(oc.tumor);
    const N = computeN(oc.nodes);
    const stage = computeStageGroup(T, N);
    return { T, N, stage };
  }, [c]);

  const resetForNext = () => {
    setSubmitted(false);
    setUserT("");
    setUserN("");
    setUserStage("");

    const list = getCasesForPool(pool) || mixedCases;
    const safeList = list.length > 0 ? list : mixedCases;
    const nextIdx = safeList.length > 0 ? randIndex(safeList.length) : 0;
    setCaseIdx(nextIdx);
  };

  const handlePoolChange = (next: CasePool) => {
    if (next === pool) return;
    setPool(next);
  };

  const canSubmit = Boolean(userT && userN && userStage);

  const isOPPos = isOropharynxHPVPosCase(c);
  const isOPNeg = isOropharynxHPVNegCase(c);
  const isOP = isOPPos || isOPNeg;

  const isLarynx = isLarynxGlotticCase(c);

  // Choice sets depend on site (and HPV status for OP)
  const tChoices = (isLarynx
    ? (["Tis", "T1", "T2", "T3", "T4a", "T4b"] as const)
    : isOPPos
    ? (["T0", "T1", "T2", "T3", "T4"] as const)
    : isOPNeg
    ? (["T0", "T1", "T2", "T3", "T4a", "T4b"] as const)
    : (["T1", "T2", "T3", "T4a", "T4b"] as const)) as readonly string[];

  const nChoices = (isOPPos
    ? (["N0", "N1", "N2"] as const)
    : (["N0", "N1", "N2a", "N2b", "N2c", "N3a", "N3b"] as const)) as readonly string[];

  const stageChoices = (isLarynx
    ? (["0", "I", "II", "III", "IVA", "IVB"] as const)
    : isOPPos
    ? (["I", "II", "III"] as const)
    : (["I", "II", "III", "IVA", "IVB"] as const)) as readonly string[];

  const tCorrect = submitted && userT === correct.T;
  const nCorrect = submitted && userN === correct.N;
  const stageCorrect = submitted && userStage === correct.stage;

  // Findings renderer: handle larynx, oropharynx, oral cavity
  const Findings = () => {
    if (isLarynxGlotticCase(c)) {
      const tumor = (c as any).tumor ?? {};
      const nodes = (c as any).nodes ?? {};

      return (
        <ul style={{ marginTop: 0, marginBottom: 0, lineHeight: 1.7, fontSize: 18 }}>
          <li>Vocal cord mobility: {tumor.vocal_cord_mobility}</li>
          <li>In situ (Tis): {tumor.in_situ ? "yes" : "no"}</li>
          <li>Extends to supraglottis: {tumor.extends_to_supraglottis ? "yes" : "no"}</li>
          <li>Extends to subglottis: {tumor.extends_to_subglottis ? "yes" : "no"}</li>
          <li>Paraglottic space invasion: {tumor.paraglottic_space_invasion ? "yes" : "no"}</li>
          <li>Cartilage through cortex / extralaryngeal extension : {tumor.cartilage_through_cortex_or_extralaryngeal ? "yes" : "no"}</li>
          <li>Invades prevertebral space, encases carotid artery, or invades mediastinal structures: {tumor.very_advanced_extension ? "yes" : "no"}</li>
          <li>
            Nodes: positive nodes {nodes.positive_node_count}
            {nodes.laterality ? `, laterality ${nodes.laterality}` : ""}
            {typeof nodes.largest_node_cm === "number" ? `, largest ${nodes.largest_node_cm} cm` : ""}
            {typeof nodes.ene === "boolean" ? `, ENE ${nodes.ene ? "yes" : "no"}` : ""}
          </li>
        </ul>
      );
    }

    if (isOropharynxCase(c)) {
      const hpvLabel = isOropharynxHPVNegCase(c) ? "negative" : "positive";
      const tumor = (c as any).tumor ?? {};
      const nodes = (c as any).nodes ?? {};

      const adv = Boolean(tumor.advanced_local_extension);
      const veryAdv = Boolean(tumor.very_advanced_local_extension);

      return (
        <ul style={{ marginTop: 0, marginBottom: 0, lineHeight: 1.7, fontSize: 18 }}>
          <li>Tumor size: {tumor.size_cm} cm</li>
          <li>Invades the larynx, extrinsic muscle of tongue, medial pterygoid, hard palate, or mandible?: {adv ? "yes" : "no"}</li>
          <li>Invades lateral pterygoid muscle, pterygoid plates, lateral nasopharynx, skull base, or encases carotid artery?: {veryAdv ? "yes" : "no"}</li>
          <li>
            Nodes: positive nodes {nodes.positive_node_count}
            {nodes.laterality ? `, laterality ${nodes.laterality}` : ""}
            {typeof nodes.largest_node_cm === "number" ? `, largest ${nodes.largest_node_cm} cm` : ""}
            {typeof nodes.ene === "boolean" ? `, ENE ${nodes.ene ? "yes" : "no"}` : ""}
          </li>
          <li>HPV status: {hpvLabel}</li>
        </ul>
      );
    }

    const oc = c as OralCavityCase;
    return (
      <ul style={{ marginTop: 0, marginBottom: 0, lineHeight: 1.7, fontSize: 18 }}>
        <li>Tumor size: {oc.tumor.size_cm} cm</li>
        <li>Depth of invasion: {oc.tumor.doi_mm} mm</li>
        <li>Bone invasion: {oc.tumor.bone_invasion ? "yes" : "no"}</li>
        <li>Extrinsic muscle involved: {oc.tumor.extrinsic_muscle_involved ? "yes" : "no"}</li>
        <li>Skin invasion: {oc.tumor.skin_invasion ? "yes" : "no"}</li>
        <li>
          Nodes: count {oc.nodes.node_count}, laterality {oc.nodes.laterality}, largest {oc.nodes.largest_node_cm} cm, ENE{" "}
          {oc.nodes.ene ? "yes" : "no"}
        </li>
      </ul>
    );
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
      {/* CrabsMcChaffey header */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 8, marginBottom: 16 }}>
        <Image
          src="/crabs.png"
          alt="CrabsMcChaffey crab logo"
          width={120}
          height={60}
          style={{
            borderRadius: 12,
            objectFit: "cover",
          }}
        />

        <h1 style={{ margin: 0, fontSize: 24 }}>🦀🦀 CrabsMcChaffey Staging Dojo 🦀🦀</h1>

        <p style={{ margin: 0, fontSize: 14, color: "#9ca3af" }}>Interactive TNM drills for HN Cancer Staging</p>
      </div>

      {/* Pool toggle */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
        {(
          [
            ["oral_cavity", "Oral cavity"],
            ["oropharynx_hpv_pos", "Oropharynx (HPV+)"],
            ["oropharynx_hpv_neg", "Oropharynx (HPV−)"],
            ["larynx_glottic", "Larynx (glottic)"],
            ["mixed", "Mixed"],
          ] as [CasePool, string][]
        ).map(([value, label]) => (
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
            {label}
          </button>
        ))}
      </div>

      <div style={{ color: "#e5e7eb", marginBottom: 16, fontSize: 18 }}>{renderStem(c)}</div>

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
          onClick={() => setSubmitted(true)}
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

          <div style={{ marginTop: 12, color: "#e5e7eb", fontSize: 18 }}>Teaching pearl: {(c as any).teaching_pearl}</div>
        </div>
      )}
    </div>
  );
}
