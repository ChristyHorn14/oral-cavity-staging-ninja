"use client";

import React, { useEffect, useMemo, useState } from "react";
import { oralTongueCases } from "@/data/oralTongueCases";
import { floorOfMouthCases } from "@/data/floorOfMouthCases";
import { computeT, computeN, computeStageGroup } from "@/lib/staging/staging";
import {
  OralCavityCase,
  TCategory,
  NCategory,
  StageGroup,
} from "@/lib/staging/types";

function randIndex(n: number) {
  return Math.floor(Math.random() * n);
}

// Pools of cases to draw from
type CasePool = "oral_tongue" | "floor_of_mouth" | "mixed";

function prettySite(c: OralCavityCase) {
  const base = c.subsite === "oral_tongue" ? "oral tongue" : "floor of mouth";
  const lat = c.stem?.laterality;
  if (lat && lat !== "midline") return `${lat} ${base}`;
  if (lat === "midline") return `midline ${base}`;
  return base;
}

function renderStem(c: OralCavityCase) {
  const s = c.stem ?? {};
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

  return parts.length ? parts.join(", ") : "Oral cavity SCC case";
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
  const { title, choices, value, onChange, submitted, correctValue, isMobile } =
    props;

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

          // Default (not submitted)
          let border = isSelected ? "2px solid #f9fafb" : "1px solid #4b5563";
          let background = isSelected ? "#1f2937" : "#111827";
          let opacity = 1;

          // After submit: show correct (green) and selected wrong (red)
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
      // guard for SSR
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 768);
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ----- case pools -----
  const [pool, setPool] = useState<CasePool>("oral_tongue");

  const allCases: OralCavityCase[] = useMemo(
    () => [...oralTongueCases, ...floorOfMouthCases],
    []
  );

  const cases: OralCavityCase[] =
    pool === "oral_tongue"
      ? oralTongueCases
      : pool === "floor_of_mouth"
      ? floorOfMouthCases
      : allCases;

  const [caseIdx, setCaseIdx] = useState(() => randIndex(cases.length));
  const c = cases[caseIdx];

  const correct = useMemo(() => {
    const T = computeT(c.tumor);
    const N = computeN(c.nodes);
    const stage = computeStageGroup(T, N);
    return { T, N, stage };
  }, [c]);

  const [userT, setUserT] = useState<TCategory | "">("");
  const [userN, setUserN] = useState<NCategory | "">("");
  const [userStage, setUserStage] = useState<StageGroup | "">("");
  const [submitted, setSubmitted] = useState(false);

  const resetAnswers = () => {
    setSubmitted(false);
    setUserT("");
    setUserN("");
    setUserStage("");
  };

  const resetForNext = () => {
    resetAnswers();
    setCaseIdx(randIndex(cases.length));
  };

  const handlePoolChange = (next: CasePool) => {
    if (next === pool) return;
    setPool(next);
    resetAnswers();

    const nextCases: OralCavityCase[] =
      next === "oral_tongue"
        ? oralTongueCases
        : next === "floor_of_mouth"
        ? floorOfMouthCases
        : allCases;

    setCaseIdx(randIndex(nextCases.length));
  };

  const canSubmit = Boolean(userT && userN && userStage);

  const tChoices: TCategory[] = ["T1", "T2", "T3", "T4a"];
  const nChoices: NCategory[] = [
    "N0",
    "N1",
    "N2a",
    "N2b",
    "N2c",
    "N3a",
    "N3b",
  ];
  const stageChoices: StageGroup[] = ["I", "II", "III", "IVA", "IVB"];

  const tCorrect = submitted && userT === correct.T;
  const nCorrect = submitted && userN === correct.N;
  const stageCorrect = submitted && userStage === correct.stage;

  return (
    <div
      style={{
        maxWidth: 980,
        margin: "0 auto",
        padding: 16,
        fontFamily: "system-ui, sans-serif",
        minHeight: "100vh",
        backgroundColor: "#020617", // dark background
        color: "#e5e7eb", // light text
      }}
    >
      <h1 style={{ marginBottom: 6 }}>Oral Cavity Staging Ninja (MVP)</h1>

      {/* Pool toggle: oral tongue / FOM / mixed */}
      <div
        style={{
          display: "inline-flex",
          borderRadius: 999,
          border: "1px solid #4b5563",
          overflow: "hidden",
          marginBottom: 12,
          backgroundColor: "#020617",
        }}
      >
        <button
          type="button"
          onClick={() => handlePoolChange("oral_tongue")}
          style={{
            padding: "6px 14px",
            border: "none",
            backgroundColor:
              pool === "oral_tongue" ? "#1f2937" : "transparent",
            color: "#e5e7eb",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          Oral tongue
        </button>
        <button
          type="button"
          onClick={() => handlePoolChange("floor_of_mouth")}
          style={{
            padding: "6px 14px",
            border: "none",
            backgroundColor:
              pool === "floor_of_mouth" ? "#1f2937" : "transparent",
            color: "#e5e7eb",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          Floor of mouth
        </button>
        <button
          type="button"
          onClick={() => handlePoolChange("mixed")}
          style={{
            padding: "6px 14px",
            border: "none",
            backgroundColor: pool === "mixed" ? "#1f2937" : "transparent",
            color: "#e5e7eb",
            cursor: "pointer",
            fontSize: 14,
          }}
        >
          Mixed
        </button>
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
        <ul
          style={{
            marginTop: 0,
            marginBottom: 0,
            lineHeight: 1.7,
            fontSize: 18,
          }}
        >
          <li>Tumor size: {c.tumor.size_cm} cm</li>
          <li>Depth of invasion: {c.tumor.doi_mm} mm</li>
          <li>Bone invasion: {c.tumor.bone_invasion ? "yes" : "no"}</li>
          <li>
            Extrinsic muscle involved:{" "}
            {c.tumor.extrinsic_muscle_involved ? "yes" : "no"}
          </li>
          <li>Skin invasion: {c.tumor.skin_invasion ? "yes" : "no"}</li>
          <li>
            Nodes: count {c.nodes.node_count}, laterality {c.nodes.laterality},
            largest {c.nodes.largest_node_cm} cm, ENE{" "}
            {c.nodes.ene ? "yes" : "no"}
          </li>
        </ul>
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
          value={userT}
          onChange={(v) => setUserT(v as any)}
          submitted={submitted}
          correctValue={correct.T}
          isMobile={isMobile}
        />

        <ChoiceGrid
          title="Pick N"
          choices={nChoices}
          value={userN}
          onChange={(v) => setUserN(v as any)}
          submitted={submitted}
          correctValue={correct.N}
          isMobile={isMobile}
        />

        <ChoiceGrid
          title="Pick Stage Group"
          choices={stageChoices}
          value={userStage}
          onChange={(v) => setUserStage(v as any)}
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
            backgroundColor:
              canSubmit && !submitted ? "#1f2937" : "#020617",
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
              T: your answer {userT} →{" "}
              {tCorrect ? "correct" : `wrong (correct: ${correct.T})`}
            </li>
            <li>
              N: your answer {userN} →{" "}
              {nCorrect ? "correct" : `wrong (correct: ${correct.N})`}
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
            Teaching pearl: {c.teaching_pearl}
          </div>
        </div>
      )}
    </div>
  );
}
