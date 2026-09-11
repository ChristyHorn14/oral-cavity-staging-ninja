// AJCC 8th edition differentiated thyroid carcinoma staging engine.
// Applies to differentiated follicular-cell derived thyroid carcinomas
// (e.g., papillary, follicular, oncocytic/Hürthle cell carcinoma).

export type ThyroidT = "T1a" | "T1b" | "T2" | "T3a" | "T3b" | "T4a" | "T4b";
export type ThyroidN = "N0" | "N1a" | "N1b";
export type ThyroidStage = "I" | "II" | "III" | "IVA";

export type ThyroidTumorInput = {
  max_dimension_cm: number;
  gross_extrathyroidal_extension:
    | "none"
    | "strap_muscles_only"
    | "subcutaneous_soft_tissue"
    | "larynx"
    | "trachea"
    | "esophagus"
    | "recurrent_laryngeal_nerve"
    | "prevertebral_fascia"
    | "carotid_encasement"
    | "mediastinal_vessel_encasement";
  multifocal?: boolean;
};

export type ThyroidNodesInput = {
  involved: boolean;
  compartments: Array<"level_VI" | "level_VII" | "lateral_neck" | "retropharyngeal">;
  laterality?: "none" | "ipsilateral" | "contralateral" | "bilateral";
  largest_node_cm?: number;
  ene?: boolean;
};

export function computeT_DifferentiatedThyroid(tumor: ThyroidTumorInput): ThyroidT {
  const ete = tumor.gross_extrathyroidal_extension;

  // Gross ETE takes precedence over size.
  if (
    ete === "prevertebral_fascia" ||
    ete === "carotid_encasement" ||
    ete === "mediastinal_vessel_encasement"
  ) {
    return "T4b";
  }

  if (
    ete === "subcutaneous_soft_tissue" ||
    ete === "larynx" ||
    ete === "trachea" ||
    ete === "esophagus" ||
    ete === "recurrent_laryngeal_nerve"
  ) {
    return "T4a";
  }

  if (ete === "strap_muscles_only") return "T3b";

  const size = tumor.max_dimension_cm;
  if (!Number.isFinite(size) || size <= 0) {
    throw new Error(`Invalid differentiated thyroid tumor size: ${size}`);
  }

  if (size <= 1) return "T1a";
  if (size <= 2) return "T1b";
  if (size <= 4) return "T2";
  return "T3a";
}

export function computeN_DifferentiatedThyroid(nodes: ThyroidNodesInput): ThyroidN {
  if (!nodes.involved) return "N0";

  const compartments = nodes.compartments ?? [];

  // Lateral cervical or retropharyngeal disease is N1b, even if central nodes
  // are also involved.
  if (compartments.some((x) => x === "lateral_neck" || x === "retropharyngeal")) {
    return "N1b";
  }

  // Level VI (central neck) and level VII (upper mediastinal) nodes are N1a.
  if (compartments.some((x) => x === "level_VI" || x === "level_VII")) {
    return "N1a";
  }

  throw new Error("Thyroid nodal disease marked involved but no recognized nodal compartment was supplied.");
}

export function computeStageGroup_DifferentiatedThyroid(
  age: number,
  T: ThyroidT,
  N: ThyroidN,
): ThyroidStage {
  if (!Number.isFinite(age) || age < 0) throw new Error(`Invalid age: ${age}`);

  // AJCC 8 age cutoff for differentiated thyroid carcinoma.
  if (age < 55) return "I";

  if (T === "T4b") return "IVA";
  if (T === "T4a") return "III";
  if (T === "T3a" || T === "T3b") return "II";

  // T1-T2: nodal disease moves stage I -> II.
  if (N === "N1a" || N === "N1b") return "II";
  return "I";
}

export function computeDifferentiatedThyroidStage(input: {
  age: number;
  tumor: ThyroidTumorInput;
  nodes: ThyroidNodesInput;
}) {
  const T = computeT_DifferentiatedThyroid(input.tumor);
  const N = computeN_DifferentiatedThyroid(input.nodes);
  const stage = computeStageGroup_DifferentiatedThyroid(input.age, T, N);
  return { T, N, stage };
}
