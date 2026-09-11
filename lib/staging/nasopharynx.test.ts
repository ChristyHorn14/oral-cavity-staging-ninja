import { describe, expect, it } from "vitest";
import { computeN_Nasopharynx, computeStageGroup_Nasopharynx, computeT_Nasopharynx } from "./nasopharynx";

describe("AJCC Version 9 nasopharynx clinical staging", () => {
  it("separates pterygoid muscle T2 from pterygoid bone T3", () => {
    expect(computeT_Nasopharynx({ features: ["medial_pterygoid_muscle"] })).toBe("T2");
    expect(computeT_Nasopharynx({ features: ["unequivocal_pterygoid_bone"] })).toBe("T3");
  });

  it("keeps nasal-cavity or oropharyngeal extension without parapharyngeal extension at T1", () => {
    expect(computeT_Nasopharynx({ features: ["nasal_cavity", "oropharynx"] })).toBe("T1");
  });

  it("uses bilateral retropharyngeal nodes as N1 and bilateral cervical nodes as N2", () => {
    const base = { largest_node_cm: 3, extends_below_caudal_cricoid: false, advanced_ene_cervical: false };
    expect(computeN_Nasopharynx({ ...base, cervical_laterality: "none", retropharyngeal_laterality: "bilateral" })).toBe("N1");
    expect(computeN_Nasopharynx({ ...base, cervical_laterality: "bilateral", retropharyngeal_laterality: "none" })).toBe("N2");
  });

  it("uses >6 cm, below-cricoid disease, or advanced cervical ENE as N3", () => {
    const base = { cervical_laterality: "unilateral" as const, retropharyngeal_laterality: "none" as const };
    expect(computeN_Nasopharynx({ ...base, largest_node_cm: 6, extends_below_caudal_cricoid: false, advanced_ene_cervical: false })).toBe("N1");
    expect(computeN_Nasopharynx({ ...base, largest_node_cm: 6.1, extends_below_caudal_cricoid: false, advanced_ene_cervical: false })).toBe("N3");
    expect(computeN_Nasopharynx({ ...base, largest_node_cm: 2, extends_below_caudal_cricoid: true, advanced_ene_cervical: false })).toBe("N3");
    expect(computeN_Nasopharynx({ ...base, largest_node_cm: 2, extends_below_caudal_cricoid: false, advanced_ene_cervical: true })).toBe("N3");
  });

  it("does not use advanced ENE solely in a retropharyngeal node for N3", () => {
    expect(computeN_Nasopharynx({
      cervical_laterality: "none", retropharyngeal_laterality: "unilateral", largest_node_cm: 2,
      extends_below_caudal_cricoid: false, advanced_ene_cervical: false, advanced_ene_retropharyngeal: true,
    })).toBe("N1");
  });

  it("groups T2N1M0 as IB and T3N2M0 as II", () => {
    expect(computeStageGroup_Nasopharynx("T2", "N1")).toBe("IB");
    expect(computeStageGroup_Nasopharynx("T3", "N2")).toBe("II");
  });

  it.each([
    ["T1", "N0", "IA"],
    ["T1", "N1", "IB"],
    ["T1", "N2", "II"],
    ["T1", "N3", "III"],
    ["T2", "N0", "IA"],
    ["T2", "N1", "IB"],
    ["T2", "N2", "II"],
    ["T2", "N3", "III"],
    ["T3", "N0", "II"],
    ["T3", "N1", "II"],
    ["T3", "N2", "II"],
    ["T3", "N3", "III"],
    ["T4", "N0", "III"],
    ["T4", "N1", "III"],
    ["T4", "N2", "III"],
    ["T4", "N3", "III"],
  ] as const)("groups %s%sM0 as stage %s", (T, N, expectedStage) => {
    expect(computeStageGroup_Nasopharynx(T, N)).toBe(expectedStage);
  });
});
