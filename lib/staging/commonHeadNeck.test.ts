import { describe, expect, it } from "vitest";
import { computeN_HeadNeckHPVNeg } from "./commonHeadNeck";

describe("AJCC 8 classic head-and-neck clinical N staging", () => {
  it("distinguishes the two clinically overt ENE categories", () => {
    expect(computeN_HeadNeckHPVNeg({
      positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 3, ene: true,
    })).toBe("N2a");
    expect(computeN_HeadNeckHPVNeg({
      positive_node_count: 1, laterality: "ipsilateral", largest_node_cm: 3.1, ene: true,
    })).toBe("N3b");
    expect(computeN_HeadNeckHPVNeg({
      positive_node_count: 2, laterality: "ipsilateral", largest_node_cm: 2, ene: true,
    })).toBe("N3b");
  });

  it("gives the >6 cm boundary precedence over laterality", () => {
    expect(computeN_HeadNeckHPVNeg({
      positive_node_count: 2, laterality: "bilateral", largest_node_cm: 6.1, ene: false,
    })).toBe("N3a");
  });
});
