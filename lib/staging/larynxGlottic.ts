// lib/staging/larynxGlottic.ts
// AJCC 8 – Larynx (Glottic) – MVP
// - Uses common HPV-negative H&N N staging + classic stage grouping
// - Glottic-specific T staging is driven by mobility + extension + cartilage involvement
// - Includes optional Stage 0 (Tis N0)

import {
  computeN_HeadNeckHPVNeg,
  computeStageGroup_HeadNeckClassic,
  type HeadNeckN,
  type HeadNeckNodes,
  type HeadNeckStage,
} from "@/lib/staging/commonHeadNeck";

export type LarynxGlotticT = "Tis" | "T1" | "T2" | "T3" | "T4a" | "T4b";
export type LarynxGlotticN = HeadNeckN;
export type LarynxGlotticStage = "0" | HeadNeckStage;

export interface LarynxGlotticTumor {
  /**
   * Core discriminator for glottic tumors.
   * - normal: neither impaired nor fixed
   * - impaired: decreased mobility (T2 feature)
   * - fixed: fixation (T3 feature)
   */
  vocal_cord_mobility: "normal" | "impaired" | "fixed";

  /**
   * Adjacent-subsite extension for a glottic primary (T2 feature).
   */
  extends_to_supraglottis?: boolean;
  extends_to_subglottis?: boolean;

  /**
   * T3 feature independent of mobility (MVP field).
   */
  paraglottic_space_invasion?: boolean;

  /**
   * T4a bucket (moderately advanced local disease).
   * Use for thyroid cartilage through cortex and/or extralaryngeal extension.
   */
  cartilage_through_cortex_or_extralaryngeal?: boolean;

  /**
   * T4b bucket (very advanced/unresectable).
   * Examples: prevertebral space invasion, carotid encasement, mediastinal invasion.
   */
  very_advanced_extension?: boolean;

  /**
   * Optional for Stage 0 support.
   * If true, computeT returns Tis (in situ).
   */
  in_situ?: boolean;
}

export interface LarynxGlotticNodes extends HeadNeckNodes {}

export function computeT_LarynxGlottic(t: LarynxGlotticTumor): LarynxGlotticT {
  // Stage 0 support
  if (t.in_situ) return "Tis";

  // T4b overrides everything
  if (t.very_advanced_extension) return "T4b";

  // T4a overrides T3/T2/T1
  if (t.cartilage_through_cortex_or_extralaryngeal) return "T4a";

  // T3: fixation or paraglottic invasion
  if (t.vocal_cord_mobility === "fixed" || t.paraglottic_space_invasion) return "T3";

  // T2: impaired mobility OR extension to supra/subglottis
  if (
    t.vocal_cord_mobility === "impaired" ||
    t.extends_to_supraglottis ||
    t.extends_to_subglottis
  ) {
    return "T2";
  }

  // MVP: treat remaining as T1 (later you can split T1a/T1b)
  return "T1";
}

export function computeN_LarynxGlottic(n: LarynxGlotticNodes): LarynxGlotticN {
  return computeN_HeadNeckHPVNeg(n);
}

export function computeStageGroup_LarynxGlottic(
  T: LarynxGlotticT,
  N: LarynxGlotticN
): LarynxGlotticStage {
  // Stage 0
  if (T === "Tis" && N === "N0") return "0";

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
  const Ns: LarynxGlotticN[] = ["N0", "N1", "N2a", "N2b", "N2c", "N3a", "N3b"];

  // T4b must always stage IVB (except Tis special-case not relevant)
  for (const N of Ns) {
    const stage = computeStageGroup_LarynxGlottic("T4b", N);
    if (stage !== "IVB") {
      throw new Error(`Invariant failed: Glottic T4b ${N} staged as ${stage}`);
    }
  }

  // Any N3 must stage IVB for classic grouping (non-Tis)
  for (const N of ["N3a", "N3b"] as const) {
    const stage = computeStageGroup_LarynxGlottic("T1", N);
    if (stage !== "IVB") {
      throw new Error(`Invariant failed: Glottic T1 ${N} staged as ${stage}`);
    }
  }
}
