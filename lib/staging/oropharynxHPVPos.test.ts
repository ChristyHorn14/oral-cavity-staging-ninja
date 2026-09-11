import { describe, expect, it } from "vitest";
import {
  computeN_OropharynxHPVPos,
  computeStageGroup_OropharynxHPVPos,
  computeT_OropharynxHPVPos,
} from "./oropharynxHPVPos";

describe("AJCC Version 9 HPV-associated oropharynx clinical staging", () => {
  it("keeps lingual epiglottic mucosal extension at T3", () => {
    expect(computeT_OropharynxHPVPos({ size_cm: 2, extends_to_lingual_epiglottis: true })).toBe("T3");
  });

  it("uses unequivocal imaging ENE for the ipsilateral N1/N2 boundary", () => {
    const base = { positive_node_count: 1, laterality: "ipsilateral" as const, largest_node_cm: 3 };
    expect(computeN_OropharynxHPVPos({ ...base, unequivocal_imaging_ene: false })).toBe("N1");
    expect(computeN_OropharynxHPVPos({ ...base, unequivocal_imaging_ene: true })).toBe("N2");
  });

  it("makes bilateral iENE-positive disease N3 but single contralateral disease N2", () => {
    const base = { positive_node_count: 1, largest_node_cm: 3, unequivocal_imaging_ene: true };
    expect(computeN_OropharynxHPVPos({ ...base, laterality: "bilateral" })).toBe("N3");
    expect(computeN_OropharynxHPVPos({ ...base, laterality: "contralateral" })).toBe("N2");
  });

  it("uses the strict greater-than-six-centimeter N3 boundary", () => {
    const base = { positive_node_count: 1, laterality: "ipsilateral" as const, unequivocal_imaging_ene: false };
    expect(computeN_OropharynxHPVPos({ ...base, largest_node_cm: 6 })).toBe("N1");
    expect(computeN_OropharynxHPVPos({ ...base, largest_node_cm: 6.1 })).toBe("N3");
  });

  it("groups T3N2M0 as stage II", () => {
    expect(computeStageGroup_OropharynxHPVPos("T3", "N2")).toBe("II");
  });
});
