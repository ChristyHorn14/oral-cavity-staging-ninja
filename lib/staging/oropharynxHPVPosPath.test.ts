import { describe, it, expect } from "vitest";
import {
  computeT_OropharynxHPVPos_Path,
  computeN_OropharynxHPVPos_Path,
  computeStageGroup_OropharynxHPVPos_Path,
} from "./oropharynxHPVPosPath";

describe("HPV+ Oropharynx AJCC8 (Pathologic) staging", () => {
  it("T1 N0 -> Stage I", () => {
    const T = computeT_OropharynxHPVPos_Path({ size_cm: 1.8, advanced_local_extension: false });
    const N = computeN_OropharynxHPVPos_Path({ positive_node_count: 0, laterality: "bilateral" });
    const S = computeStageGroup_OropharynxHPVPos_Path(T, N);
    expect(T).toBe("T1");
    expect(N).toBe("N0");
    expect(S).toBe("I");
  });

  it("T2 with >4 nodes -> N2 -> Stage III", () => {
    const T = computeT_OropharynxHPVPos_Path({ size_cm: 3.0, advanced_local_extension: false });
    const N = computeN_OropharynxHPVPos_Path({ positive_node_count: 5, laterality: "contralateral" });
    const S = computeStageGroup_OropharynxHPVPos_Path(T, N);
    expect(T).toBe("T2");
    expect(N).toBe("N2");
    expect(S).toBe("III");
  });

  it("T3 with N1 -> Stage II", () => {
    const T = computeT_OropharynxHPVPos_Path({ size_cm: 4.6, advanced_local_extension: false });
    const N = computeN_OropharynxHPVPos_Path({ positive_node_count: 2, laterality: "bilateral" });
    const S = computeStageGroup_OropharynxHPVPos_Path(T, N);
    expect(T).toBe("T3");
    expect(N).toBe("N1");
    expect(S).toBe("II");
  });

  it("T4 with N0 -> Stage II", () => {
    const T = computeT_OropharynxHPVPos_Path({ size_cm: 1.2, advanced_local_extension: true });
    const N = computeN_OropharynxHPVPos_Path({ positive_node_count: 0 });
    const S = computeStageGroup_OropharynxHPVPos_Path(T, N);
    expect(T).toBe("T4");
    expect(N).toBe("N0");
    expect(S).toBe("II");
  });

  it("Laterality does not affect pN in HPV+ OPSCC", () => {
    const N1 = computeN_OropharynxHPVPos_Path({ positive_node_count: 4, laterality: "ipsilateral" });
    const N2 = computeN_OropharynxHPVPos_Path({ positive_node_count: 4, laterality: "bilateral" });
    expect(N1).toBe("N1");
    expect(N2).toBe("N1");
  });
});
