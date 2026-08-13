// lib/staging/maxillarySinusStage.ts
// AJCC 8 – Maxillary Sinus Carcinoma
// - T: anatomy-based local extension
// - N + Stage grouping: shared classic HPV-negative H&N logic
//
// AJCC 8 remains the current staging system for this disease site in 2026.

import {
  computeN_HeadNeckHPVNeg,
  computeStageGroup_HeadNeckClassic,
  type HeadNeckN,
  type HeadNeckNodes,
  type HeadNeckStage,
} from "@/lib/staging/commonHeadNeck";

export type MaxillarySinusT = "T1" | "T2" | "T3" | "T4a" | "T4b";
export type MaxillarySinusN = HeadNeckN;
export type MaxillarySinusStage = HeadNeckStage;

export interface MaxillarySinusTumor {
  // T2
  // Bone erosion/destruction other than posterior wall or pterygoid plates.
  // Includes extension into hard palate and/or middle nasal meatus.
  bone_erosion_or_destruction?: boolean;
  hard_palate?: boolean;
  middle_nasal_meatus?: boolean;

  // T3
  posterior_wall_maxillary_sinus?: boolean;
  subcutaneous_tissues?: boolean;
  orbital_floor_or_medial_wall?: boolean;
  pterygoid_fossa?: boolean;
  ethmoid_sinus?: boolean;

  // T4a – moderately advanced local disease
  anterior_orbital_contents?: boolean;
  cheek_skin?: boolean;
  pterygoid_plates?: boolean;
  infratemporal_fossa?: boolean;
  cribriform_plate?: boolean;
  sphenoid_sinus?: boolean;
  frontal_sinus?: boolean;

  // T4b – very advanced local disease
  orbital_apex?: boolean;
  dura?: boolean;
  brain?: boolean;
  middle_cranial_fossa?: boolean;
  cranial_nerve_other_than_v2?: boolean;
  nasopharynx?: boolean;
  clivus?: boolean;
}

export interface MaxillarySinusNodes extends HeadNeckNodes {}

export function computeT_MaxillarySinus(t: MaxillarySinusTumor): MaxillarySinusT {
  // T4b overrides everything
  if (
    t.orbital_apex ||
    t.dura ||
    t.brain ||
    t.middle_cranial_fossa ||
    t.cranial_nerve_other_than_v2 ||
    t.nasopharynx ||
    t.clivus
  ) {
    return "T4b";
  }

  // T4a next
  if (
    t.anterior_orbital_contents ||
    t.cheek_skin ||
    t.pterygoid_plates ||
    t.infratemporal_fossa ||
    t.cribriform_plate ||
    t.sphenoid_sinus ||
    t.frontal_sinus
  ) {
    return "T4a";
  }

  // T3
  if (
    t.posterior_wall_maxillary_sinus ||
    t.subcutaneous_tissues ||
    t.orbital_floor_or_medial_wall ||
    t.pterygoid_fossa ||
    t.ethmoid_sinus
  ) {
    return "T3";
  }

  // T2
  if (
    t.bone_erosion_or_destruction ||
    t.hard_palate ||
    t.middle_nasal_meatus
  ) {
    return "T2";
  }

  // T1: limited to maxillary sinus mucosa without bone erosion/destruction
  return "T1";
}

export function computeN_MaxillarySinus(n: MaxillarySinusNodes): MaxillarySinusN {
  return computeN_HeadNeckHPVNeg(n);
}

export function computeStageGroup_MaxillarySinus(
  T: MaxillarySinusT,
  N: MaxillarySinusN
): MaxillarySinusStage {
  return computeStageGroup_HeadNeckClassic({
    T,
    N,
    isT4a: (t) => t === "T4a",
    isT4b: (t) => t === "T4b",
    isT1: (t) => t === "T1",
    isT2: (t) => t === "T2",
    isT3: (t) => t === "T3",
  });
}

// -----------------------------
// Dev-only invariants (optional)
// -----------------------------
if (process.env.NODE_ENV !== "production") {
  const Ns: MaxillarySinusN[] = ["N0", "N1", "N2a", "N2b", "N2c", "N3a", "N3b"];

  // Any T4b disease is Stage IVB in the app's current M0/TN-only model.
  for (const N of Ns) {
    const stage = computeStageGroup_MaxillarySinus("T4b", N);
    if (stage !== "IVB") {
      throw new Error(`Invariant failed: Maxillary sinus T4b ${N} staged as ${stage}`);
    }
  }

  // Any N3 disease is IVB regardless of T.
  const Ts: MaxillarySinusT[] = ["T1", "T2", "T3", "T4a", "T4b"];
  for (const T of Ts) {
    for (const N of ["N3a", "N3b"] as MaxillarySinusN[]) {
      const stage = computeStageGroup_MaxillarySinus(T, N);
      if (stage !== "IVB") {
        throw new Error(`Invariant failed: Maxillary sinus ${T} ${N} staged as ${stage}`);
      }
    }
  }
}
