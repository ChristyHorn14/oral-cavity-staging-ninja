"use client";

import React, { useMemo, useState } from "react";
import { oralTongueCases } from "@/data/oralTongueCases";
import { computeT, computeN, computeStageGroup } from "@/lib/staging/staging";
import { OralTongueCase, TCategory, NCategory, StageGroup } from "@/lib/staging/types";

function randIndex(n: number) {
  return Math.floor(Math.random() * n);
}

function renderStem(c: OralTongueCase) {
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

  const site = s.laterality ? `${s.laterality} oral tongue` : "oral tongue";

  if (s.symptom) {
    parts.push(`presents with ${s.symptom} of the ${site}`);
  } else if (s.laterality) {
    parts.push(`${site}`);
  }

  return parts.length ? parts.join(", ") : "Oral tongue SCC case";
}

function ChoiceGrid<T extends string>(props: {
  title: string;
  choices: readonly T[];
  value: T | "";
  onChange: (v: T) => void;
  submitted: boolean;
  correctValue: T;
}) {
  const { title, choices, value, onChange, submitted, correctValue } = props;

  return (
    <div>
      <div style={{ marginBottom: 8, fontSize: 16 }}>{title}</div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 10 }}>
        {choices.map((x) => {
          const isSelected = value === x;
          const isCorrect = x === correctValue;

          // Default (not submitted)
          let border = isSelected ? "2px solid #fff" : "1px solid rgba(255,255,255,0.25)";
          let background = isSelected ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)";
          let opacity = 1;

          // After submit: show correct (green) and selected wrong (red)
          if (submitted) {
            opacity = isCorrect || isSelected ? 1 : 0.55;

            if (isCorrect) {
              border = "2px solid rgba(34,197,94,0.9)";
              background = "rgba(34,197,94,0.18)";
            } else if (isSelected && !isCorrect) {
              border = "2px solid rgba(239,68,68,0.9)";
              background = "rgba(239,68,68,0.15)";
            } else {
              border = "1px solid rgba(255,255,255,0.18)";
              background = "rgba(255,255,255,0.04)";
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
                color: "rgba(255,255,255,0.92)",
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
  const [caseIdx, setCaseIdx] = useState(() => randIndex(oralTongueCases.length));
  const c = oralTongueCases[caseIdx];

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

  const resetForNext = () => {
    setSubmitted(false);
    setUserT("");
    setUserN("");
    setUserStage("");
    setCaseIdx(randIndex(oralTongueCases.length));
  };

  const canSubmit = Boolean(userT && userN && userStage);

  const tChoices: TCategory[] = ["T1", "T2", "T3", "T4a"];
  const nChoices: NCategory[] = ["N0", "N1", "N2a", "N2b", "N2c", "N3a", "N3b"];
  const stageChoices: StageGroup[] = ["I", "II", "III", "IVA", "IVB"];

  const tCorrect = submitted && userT === correct.T;
  const nCorrect = submitted && userN === correct.N;
  const stageCorrect = submitted && userStage === correct.stage;

  return (
    <div style={{ maxWidth: 980, margin: "24px auto", padding: 16, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ marginBottom: 10 }}>Oral Cavity Staging Ninja (MVP)</h1>

      <div style={{ color: "rgba(255,255,255,0.65)", marginBottom: 16, fontSize: 18 }}>{renderStem(c)}</div>

      <div
        style={{
          border: "1px solid rgba(255,255,255,0.22)",
          borderRadius: 16,
          padding: 18,
          marginBottom: 18,
          background: "rgba(255,255,255,0.04)",
        }}
      >
        <div style={{ marginBottom: 10, fontSize: 18 }}>Findings</div>
        <ul style={{ marginTop: 0, marginBottom: 0, lineHeight: 1.7, fontSize: 18 }}>
          <li>Tumor size: {c.tumor.size_cm} cm</li>
          <li>Depth of invasion: {c.tumor.doi_mm} mm</li>
          <li>Bone invasion: {c.tumor.bone_invasion ? "yes" : "no"}</li>
          <li>Extrinsic muscle involved: {c.tumor.extrinsic_muscle_involved ? "yes" : "no"}</li>
          <li>Skin invasion: {c.tumor.skin_invasion ? "yes" : "no"}</li>
          <li>
            Nodes: count {c.nodes.node_count}, laterality {c.nodes.laterality}, largest {c.nodes.largest_node_cm} cm,
            ENE {c.nodes.ene ? "yes" : "no"}
          </li>
        </ul>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, marginBottom: 18 }}>
        <ChoiceGrid
          title="Pick T"
          choices={tChoices}
          value={userT}
          onChange={(v) => setUserT(v as any)}
          submitted={submitted}
          correctValue={correct.T}
        />

        <ChoiceGrid
          title="Pick N"
          choices={nChoices}
          value={userN}
          onChange={(v) => setUserN(v as any)}
          submitted={submitted}
          correctValue={correct.N}
        />

        <ChoiceGrid
          title="Pick Stage Group"
          choices={stageChoices}
          value={userStage}
          onChange={(v) => setUserStage(v as any)}
          submitted={submitted}
          correctValue={correct.stage}
        />
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button
          onClick={() => setSubmitted(true)}
          disabled={!canSubmit || submitted}
          style={{
            padding: "12px 16px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.25)",
            background: canSubmit && !submitted ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.92)",
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
            border: "1px solid rgba(255,255,255,0.18)",
            background: "rgba(255,255,255,0.04)",
            color: "rgba(255,255,255,0.9)",
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
            border: "1px solid rgba(255,255,255,0.22)",
            borderRadius: 16,
            padding: 18,
            background: "rgba(255,255,255,0.04)",
          }}
        >
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

          <div style={{ marginTop: 12, color: "rgba(255,255,255,0.8)", fontSize: 18 }}>
            Teaching pearl: {c.teaching_pearl}
          </div>
        </div>
      )}
    </div>
  );
}
