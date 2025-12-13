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
  if (s.risk && s.risk !== "none") parts.push(`risk: ${s.risk}`);
  if (s.symptom) parts.push(`presents with ${s.symptom}`);
  if (s.laterality) parts.push(`(${s.laterality} oral tongue)`);

  return parts.length ? parts.join(", ") : "Oral tongue SCC case";
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

  const canSubmit = userT && userN && userStage;

  const tChoices: TCategory[] = ["T1", "T2", "T3", "T4a"];
  const nChoices: NCategory[] = ["N0", "N1", "N2a", "N2b", "N2c", "N3a", "N3b"];
  const stageChoices: StageGroup[] = ["I", "II", "III", "IVA", "IVB"];

  const tCorrect = submitted && userT === correct.T;
  const nCorrect = submitted && userN === correct.N;
  const stageCorrect = submitted && userStage === correct.stage;

  return (
    <div style={{ maxWidth: 880, margin: "24px auto", padding: 16, fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ marginBottom: 8 }}>Oral Cavity Staging Ninja (MVP)</h1>

      <div style={{ color: "#444", marginBottom: 16 }}>{renderStem(c)}</div>

      <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 16, marginBottom: 16 }}>
        <div style={{ marginBottom: 8 }}>Findings</div>
        <ul style={{ marginTop: 0 }}>
          <li>Tumor size: {c.tumor.size_cm} cm</li>
          <li>Depth of invasion: {c.tumor.doi_mm} mm</li>
          <li>Bone invasion: {String(c.tumor.bone_invasion)}</li>
          <li>Extrinsic muscle involved: {String(c.tumor.extrinsic_muscle_involved)}</li>
          <li>Skin invasion: {String(c.tumor.skin_invasion)}</li>
          <li>
            Nodes: count {c.nodes.node_count}, laterality {c.nodes.laterality}, largest {c.nodes.largest_node_cm} cm, ENE{" "}
            {String(c.nodes.ene)}
          </li>
        </ul>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
        <div>
          <div style={{ marginBottom: 6 }}>Pick T</div>
          <select value={userT} onChange={(e) => setUserT(e.target.value as any)} style={{ width: "100%", padding: 10 }}>
            <option value="">Select</option>
            {tChoices.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div style={{ marginBottom: 6 }}>Pick N</div>
          <select value={userN} onChange={(e) => setUserN(e.target.value as any)} style={{ width: "100%", padding: 10 }}>
            <option value="">Select</option>
            {nChoices.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div style={{ marginBottom: 6 }}>Pick Stage Group</div>
          <select
            value={userStage}
            onChange={(e) => setUserStage(e.target.value as any)}
            style={{ width: "100%", padding: 10 }}
          >
            <option value="">Select</option>
            {stageChoices.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button
          onClick={() => setSubmitted(true)}
          disabled={!canSubmit}
          style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #222" }}
        >
          Submit
        </button>

        <button onClick={resetForNext} style={{ padding: "10px 14px", borderRadius: 10, border: "1px solid #aaa" }}>
          Next case
        </button>
      </div>

      {submitted && (
        <div style={{ marginTop: 18, border: "1px solid #ddd", borderRadius: 12, padding: 16 }}>
          <div style={{ marginBottom: 8 }}>Results</div>
          <ul style={{ marginTop: 0 }}>
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

          <div style={{ marginTop: 10, color: "#333" }}>Teaching pearl: {c.teaching_pearl}</div>
        </div>
      )}
    </div>
  );
}
