import { describe, expect, it } from "vitest";
import { differentiatedThyroidCases } from "@/data/differentiatedThyroidCases";
import { hypopharynxCases } from "@/data/hypopharynxCases";
import { larynxSubglotticCases } from "@/data/larynxSubglotticCases";
import { maxillarySinusCases } from "@/data/maxillarySinusCases";
import { nasopharynxCases } from "@/data/nasopharynxCases";
import { oropharynxHPVPosCases } from "@/data/oropharynxHPVPosCases";
import {
  computeN_DifferentiatedThyroid,
  computeStageGroup_DifferentiatedThyroid,
  computeT_DifferentiatedThyroid,
} from "./differentiatedThyroidStage";
import { computeT_Hypopharynx } from "./hypopharynxStage";
import { computeT_LarynxSubglottic } from "./larynxSubglotticStage";
import { computeT_MaxillarySinus } from "./maxillarySinusStage";
import { computeN_Nasopharynx, computeStageGroup_Nasopharynx, computeT_Nasopharynx } from "./nasopharynx";
import {
  computeN_OropharynxHPVPos,
  computeStageGroup_OropharynxHPVPos,
  computeT_OropharynxHPVPos,
} from "./oropharynxHPVPos";

describe("case-bank staging integrity", () => {
  it("does not disclose the T answer in any NPC prompt", () => {
    const explicitTCategory = /\b(?:cT|T)[1-4]\b|\bT\s+(?:category|stage)\b/i;

    for (const c of nasopharynxCases) {
      expect(c.prompt, c.id).not.toMatch(explicitTCategory);
    }
  });

  it("keeps all stored T expectations aligned with their staging engines", () => {
    for (const c of hypopharynxCases) expect(computeT_Hypopharynx(c.tumor), c.id).toBe(c.expectedT);
    for (const c of larynxSubglotticCases) expect(computeT_LarynxSubglottic(c.inputs), c.id).toBe(c.expectedT);
    for (const c of maxillarySinusCases) expect(computeT_MaxillarySinus(c.tumor), c.id).toBe(c.expectedT);
  });

  it("keeps differentiated-thyroid M0 expectations aligned", () => {
    for (const c of differentiatedThyroidCases) {
      const T = computeT_DifferentiatedThyroid(c.tumor);
      const N = computeN_DifferentiatedThyroid(c.nodes);
      expect(T, `${c.id} T`).toBe(c.expectedT);
      expect(N, `${c.id} N`).toBe(c.expectedN);
      expect(computeStageGroup_DifferentiatedThyroid(c.age, T, N), `${c.id} stage`).toBe(c.expectedStage);
    }
  });

  it("keeps all Version 9 case answers aligned with their engines", () => {
    expect(nasopharynxCases).toHaveLength(20);
    expect(oropharynxHPVPosCases).toHaveLength(18);
    const npcExpected = [
      ["T1", "N0", "IA"], ["T1", "N0", "IA"], ["T2", "N0", "IA"], ["T2", "N0", "IA"],
      ["T2", "N0", "IA"], ["T3", "N0", "II"], ["T3", "N0", "II"], ["T3", "N0", "II"],
      ["T4", "N0", "III"], ["T4", "N0", "III"], ["T4", "N0", "III"], ["T4", "N1", "III"],
      ["T1", "N1", "IB"], ["T2", "N1", "IB"], ["T1", "N2", "II"], ["T2", "N3", "III"],
      ["T1", "N3", "III"], ["T2", "N1", "IB"], ["T1", "N3", "III"], ["T1", "N1", "IB"],
    ];
    const hpvExpected = [
      ["T1", "N0", "I"], ["T1", "N1", "I"], ["T2", "N1", "I"], ["T2", "N2", "II"],
      ["T1", "N2", "II"], ["T2", "N3", "III"], ["T2", "N1", "I"], ["T3", "N0", "II"],
      ["T3", "N0", "II"], ["T4", "N1", "III"], ["T2", "N1", "I"], ["T2", "N2", "II"],
      ["T1", "N2", "II"], ["T1", "N3", "III"], ["T0", "N1", "I"], ["T2", "N1", "I"],
      ["T4", "N2", "III"], ["T2", "N2", "II"],
    ];
    nasopharynxCases.forEach((c, index) => {
      const T = computeT_Nasopharynx(c.tumor);
      const N = computeN_Nasopharynx(c.nodes);
      expect([T, N, computeStageGroup_Nasopharynx(T, N)], c.id).toEqual(npcExpected[index]);
    });
    oropharynxHPVPosCases.forEach((c, index) => {
      const T = computeT_OropharynxHPVPos(c.tumor);
      const N = computeN_OropharynxHPVPos(c.nodes);
      expect([T, N, computeStageGroup_OropharynxHPVPos(T, N)], c.id).toEqual(hpvExpected[index]);
    });
  });
});
