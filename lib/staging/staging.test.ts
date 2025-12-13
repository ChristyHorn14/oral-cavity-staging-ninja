import { describe, it, expect } from "vitest";
import { computeT, computeN, computeStageGroup } from "./staging";

type TumorInputs = {
  size_cm: number;
  doi_mm: number;
  bone_invasion: boolean;
  extrinsic_muscle_involved: boolean;
  skin_invasion: boolean;
};

type NodeInputs = {
  node_count: number;
  laterality: "none" | "ipsilateral" | "contralateral" | "bilateral";
  largest_node_cm: number;
  ene: boolean;
};

const acceptanceCases: Array<{
  id: string;
  tumor: TumorInputs;
  nodes: NodeInputs;
  expected: { T: string; N: string; stage: string };
}> = [
  {
    id: "AT-OT-001",
    tumor: { size_cm: 1.6, doi_mm: 4, bone_invasion: false, extrinsic_muscle_involved: false, skin_invasion: false },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0.0, ene: false },
    expected: { T: "T1", N: "N0", stage: "I" },
  },
  {
    id: "AT-OT-002",
    tumor: { size_cm: 1.8, doi_mm: 9, bone_invasion: false, extrinsic_muscle_involved: false, skin_invasion: false },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0.0, ene: false },
    expected: { T: "T2", N: "N0", stage: "II" },
  },
  {
    id: "AT-OT-003",
    tumor: { size_cm: 2.4, doi_mm: 14, bone_invasion: false, extrinsic_muscle_involved: false, skin_invasion: false },
    nodes: { node_count: 1, laterality: "ipsilateral", largest_node_cm: 2.1, ene: false },
    expected: { T: "T3", N: "N1", stage: "III" },
  },
  {
    id: "AT-OT-004",
    tumor: { size_cm: 3.5, doi_mm: 18, bone_invasion: true, extrinsic_muscle_involved: false, skin_invasion: false },
    nodes: { node_count: 1, laterality: "ipsilateral", largest_node_cm: 2.8, ene: false },
    expected: { T: "T4a", N: "N1", stage: "IVA" },
  },
  {
    id: "AT-OT-005",
    tumor: { size_cm: 2.2, doi_mm: 8, bone_invasion: false, extrinsic_muscle_involved: false, skin_invasion: false },
    nodes: { node_count: 2, laterality: "ipsilateral", largest_node_cm: 3.4, ene: true },
    expected: { T: "T2", N: "N3b", stage: "IVB" },
  },
  {
    id: "AT-OT-006",
    tumor: { size_cm: 1.9, doi_mm: 5, bone_invasion: false, extrinsic_muscle_involved: false, skin_invasion: false },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0.0, ene: false },
    expected: { T: "T1", N: "N0", stage: "I" },
  },
  {
    id: "AT-OT-007",
    tumor: { size_cm: 1.7, doi_mm: 6, bone_invasion: false, extrinsic_muscle_involved: false, skin_invasion: false },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0.0, ene: false },
    expected: { T: "T2", N: "N0", stage: "II" },
  },
  {
    id: "AT-OT-008",
    tumor: { size_cm: 4.3, doi_mm: 7, bone_invasion: false, extrinsic_muscle_involved: false, skin_invasion: false },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0.0, ene: false },
    expected: { T: "T3", N: "N0", stage: "III" },
  },
  {
    id: "AT-OT-009",
    tumor: { size_cm: 3.0, doi_mm: 9, bone_invasion: false, extrinsic_muscle_involved: true, skin_invasion: false },
    nodes: { node_count: 0, laterality: "none", largest_node_cm: 0.0, ene: false },
    expected: { T: "T4a", N: "N0", stage: "IVA" },
  },
  {
    id: "AT-OT-010",
    tumor: { size_cm: 2.6, doi_mm: 11, bone_invasion: false, extrinsic_muscle_involved: false, skin_invasion: false },
    nodes: { node_count: 2, laterality: "bilateral", largest_node_cm: 2.5, ene: false },
    expected: { T: "T3", N: "N2c", stage: "IVA" },
  },
];

describe("AJCC8 oral cavity (oral tongue) acceptance tests", () => {
  for (const c of acceptanceCases) {
    it(c.id, () => {
      const T = computeT(c.tumor as any);
      const N = computeN(c.nodes as any);
      const stage = computeStageGroup(T as any, N as any);

      expect(T).toBe(c.expected.T);
      expect(N).toBe(c.expected.N);
      expect(stage).toBe(c.expected.stage);
    });
  }
});
