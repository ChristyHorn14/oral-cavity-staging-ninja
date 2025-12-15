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

import { computeT, computeN, computeStageGroup } from "@/lib/staging/staging";
import { OralCavityCase, TCategory, NCategory, StageGroup } from "@/lib/staging/types";

function randIndex(n: number) {
  return Math.floor(Math.random() * n);
}

/**
 * Case typing
 * - Oral cavity uses your existing OralCavityCase.
 * - Oropharynx HPV+ cases are a separate shape (from your new file).
 * We’ll treat them as a union locally.
 */
type OropharynxHPVPosCase = (typeof oropharynxHPVPosCases)[number];
type AnyCase = OralCavityCase | OropharynxHPVPosCase;

type CasePool = "oral_cavity" | "oropharynx_hpv_pos" | "mixed";

// All oral cavity cases (all subsites)
const oralCavityCases: OralCavityCase[] = [
  ...oralTongueCases,
  ...floorOfMouthCases,
  ...alveolarRidgeCases,
  ...buccalMucosaCases,
  ...hardPalateCases,
  ...retromolarTrigoneCases,
];

// Mixed pool: oral cavity + HPV+ OP
const mixedCases: readonly AnyCase[] = [...oralCavityCases, ...oropharynxHPVPosCases];

// Pool resolver
function getCasesForPool(pool: CasePool): readonly AnyCase[] {
  switch (pool) {
    case "oral_cavity":
      return oralCavityCases;
    case "oropharynx_hpv_pos":
      return oropharynxHPVPosCases;
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
  // Oral cavity cases have these guaranteed fields in your type:
  // - subsite is one of oral cavity subsites
  // - tumor has doi_mm etc.
  return (c as any)?.site_group === "oral_cavity" || (c as any)?.tumor?.doi_mm !== undefined;
}

function isOropharynxCase(c: AnyCase): c is OropharynxHPVPosCase {
  return (c as any)?.site_group === "oropharynx";
}

function prettySite(c: AnyCase) {
  if (isOropharynxCase(c)) {
    // Keep it simple; your OP stem already contains laterality + symptom.
    // You can refine later with subsite labels if desired.
    const lat = c.stem?.laterality;
    const sub =
      c.subsite === "base_of_tongue"
        ? "base of tongue"
        : c.subsite === "soft_palate"
        ? "soft palate"
        : c.subsite === "pharyngeal_wall"
        ? "pharyngeal wall"
        : "tonsil";
    if (lat && lat !== "midline") return `${lat} ${sub} (oropharynx)`;
    if (lat === "midline") return `midline ${sub} (oropharynx)`;
    return `${sub} (oropharynx)`;
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
    const riskLabel =
      s.risk === "both"
        ? "alcohol and tobacco"
        : s.risk === "etoh"
        ? "alcohol"
        : s.risk;
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
          gridTemplateColumns: isMobile
            ? "repeat(2, minmax(0, 1fr))"
            : "repeat(4, minmax(0, 1fr))",
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

  // If pool changes, ensure caseIdx is valid + reset answers
  useEffect(() => {
    const list = getCasesForPool(pool);
    const safeList = list && list.length > 0 ? list : mixedCases;

    // Always pick a valid random index for the new pool
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
    if (isOropharynxCase(c)) {
      const T = computeT_OropharynxHPVPos_Path(c.tumor);
      const N = computeN_OropharynxHPVPos_Path(c.nodes);
      const stage = computeStageGroup_OropharynxHPVPos_Path(T, N);
      return { T, N, stage };
    }

    // Oral cavity default
    const oc = c as OralCavityCase;
    const T = computeT(oc.tumor);
    const N = computeN(oc.nodes);
    const stage = computeStageGroup(T, N);
    return { T, N, stage };
  }, [c]);

  // ---- answer state (string unions) ----
  // We keep these as strings so the same UI can handle both oral cavity and OP.
  type AnyT = string;
  type AnyN = string;
  type AnyStage = string;

  const [userT, setUserT] = useState<AnyT | "">("");
  const [userN, setUserN] = useState<AnyN | "">("");
  const [userStage, setUserStage] = useState<AnyStage | "">("");
  const [submitted, setSubmitted] = useState(false);

  const resetAnswers = () => {
    setSubmitted(false);
    setUserT("");
    setUserN("");
    setUserStage("");
  };

  const resetForNext = () => {
    resetAnswers();
    const list = getCasesForPool(pool) || mixedCases;
    const safeList = list.length > 0 ? list : mixedCases;
    const nextIdx = safeList.length > 0 ? randIndex(safeList.length) : 0;
    setCaseIdx(nextIdx);
  };

  const handlePoolChange = (next: CasePool) => {
    if (next === pool) return;
    setPool(next);
    // the useEffect on [pool] will reset everything safely
  };

  const canSubmit = Boolean(userT && userN && userStage);

  const isOP = isOropharynxCase(c);

  // Choice sets depend on site
  const tChoices = (isOP
    ? (["T0", "T1", "T2", "T3", "T4"] as const)
    : (["T1", "T2", "T3", "T4a"] as const)) as readonly string[];

  const nChoices = (isOP
    ? (["N0", "N1", "N2"] as const)
    : (["N0", "N1", "N2a", "N2b", "N2c", "N3a", "N3b"] as const)) as readonly string[];

  const stageChoices = (isOP
    ? (["I", "II", "III"] as const)
    : (["I", "II", "III", "IVA", "IVB"] as const)) as readonly string[];

  const tCorrect = submitted && userT === correct.T;
  const nCorrect = submitted && userN === correct.N;
  const stageCorrect = submitted && userStage === correct.stage;

  // Findings renderer: handle both schemas without breaking styling
  const Findings = () => {
    if (isOropharynxCase(c)) {
      return (
        <ul
          style={{
            marginTop: 0,
            marginBottom: 0,
            lineHeight: 1.7,
            fontSize: 18,
          }}
        >
          <li>Tumor size: {c.tumor.size_cm} cm</li>
          <li>Advanced local extension: {c.tumor.advanced_local_extension ? "yes" : "no"}</li>
          <li>
            Nodes: positive nodes {c.nodes.positive_node_count}
            {c.nodes.laterality ? `, laterality ${c.nodes.laterality}` : ""}
            {typeof c.nodes.largest_node_cm === "number" ? `, largest ${c.nodes.largest_node_cm} cm` : ""}
            {typeof c.nodes.ene === "boolean" ? `, ENE ${c.nodes.ene ? "yes" : "no"}` : ""}
          </li>
          <li>HPV status: positive</li>
        </ul>
      );
    }

    const oc = c as OralCavityCase;
    return (
      <ul
        style={{
          marginTop: 0,
          marginBottom: 0,
          lineHeight: 1.7,
          fontSize: 18,
        }}
      >
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
          style={{
            borderRadius: 12,
            objectFit: "cover",
          }}
        />

        <h1
          style={{
            margin: 0,
            fontSize: 24,
          }}
        >
          🦀🦀 CrabsMcChaffey Staging Ninja 🦀🦀
        </h1>

        <p
          style={{
            margin: 0,
            fontSize: 14,
            color: "#9ca3af",
          }}
        >
          Interactive TNM drills for HN Cancer Staging
        </p>
      </div>

      {/* Pool toggle */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          marginBottom: 12,
        }}
      >
        {(
          [
            ["oral_cavity", "Oral cavity"],
            ["oropharynx_hpv_pos", "Oropharynx (HPV+)"],
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

      <div
        style={{
          color: "#e5e7eb",
          marginBottom: 16,
          fontSize: 18,
        }}
      >
        {renderStem(c)}
      </div>

      <div
        style={{
          border: "1px solid #4b5563",
          borderRadius: 16,
          padding: 18,
          marginBottom: 18,
          background: "#020617",
        }}
      >
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
          choices={tChoices}
          value={userT as any}
          onChange={(v) => setUserT(v)}
          submitted={submitted}
          correctValue={correct.T}
          isMobile={isMobile}
        />

        <ChoiceGrid
          title="Pick N"
          choices={nChoices}
          value={userN as any}
          onChange={(v) => setUserN(v)}
          submitted={submitted}
          correctValue={correct.N}
          isMobile={isMobile}
        />

        <ChoiceGrid
          title="Pick Stage Group"
          choices={stageChoices}
          value={userStage as any}
          onChange={(v) => setUserStage(v)}
          submitted={submitted}
          correctValue={correct.stage}
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
        <div
          style={{
            marginTop: 18,
            border: "1px solid #4b5563",
            borderRadius: 16,
            padding: 18,
            background: "#020617",
          }}
        >
          <div style={{ marginBottom: 10, fontSize: 18 }}>Results</div>
          <ul
            style={{
              marginTop: 0,
              marginBottom: 0,
              lineHeight: 1.7,
              fontSize: 18,
            }}
          >
            <li>
              T: your answer {userT} → {tCorrect ? "correct" : `wrong (correct: ${correct.T})`}
            </li>
            <li>
              N: your answer {userN} → {nCorrect ? "correct" : `wrong (correct: ${correct.N})`}
            </li>
            <li>
              Stage: your answer {userStage} →{" "}
              {stageCorrect ? "correct" : `wrong (correct: ${correct.stage})`}
            </li>
          </ul>

          <div
            style={{
              marginTop: 12,
              color: "#e5e7eb",
              fontSize: 18,
            }}
          >
            Teaching pearl: {(c as any).teaching_pearl}
          </div>
        </div>
      )}
    </div>
  );
}
