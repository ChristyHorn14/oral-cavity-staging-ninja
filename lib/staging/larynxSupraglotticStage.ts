// lib/staging/larynxSupraglotticStage.ts
// AJCC 8 (conceptual) supraglottic larynx T staging helper.
// Computes T only (Tis–T4b).

export type SupraglotticSubsite =
  | "laryngeal surface of epiglottis"
  | "aryepiglottic fold"
  | "arytenoid"
  | "false vocal cord"
  | "ventricle";

export type CordMobility = "normal" | "impaired" | "fixed" | "unknown";

export type ExtralaryngealInvasion =
  | "through thyroid cartilage"
  | "trachea"
  | "soft tissues of neck"
  | "strap muscles"
  | "thyroid"
  | "esophagus";

export type VeryAdvancedInvasion =
  | "prevertebral space"
  | "carotid encasement"
  | "mediastinal structures";

export type SupraglotticT = "Tis" | "T1" | "T2" | "T3" | "T4a" | "T4b";

export type SupraglotticTInputs = {
  tis?: boolean;

  involved_supraglottic_subsites: SupraglotticSubsite[];

  extends_to_glottis?: boolean;

  // Adjacent regions commonly described in notes (recorded as “extension” flags).
  extends_to_base_of_tongue_mucosa?: boolean;
  extends_to_vallecula?: boolean;
  extends_to_pharyngeal_wall?: boolean;

  cord_mobility: CordMobility;

  invades_pre_epiglottic_space?: boolean;
  invades_paraglottic_space?: boolean;
  invades_postcricoid_area?: boolean;

  inner_cortex_thyroid_cartilage?: boolean; // T3

  extralaryngeal_invasion?: ExtralaryngealInvasion[]; // T4a if any present
  very_advanced_invasion?: VeryAdvancedInvasion[]; // T4b if any present
};

function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function hasAny<T extends string>(arr: T[] | undefined, items: T[]): boolean {
  if (!arr || arr.length === 0) return false;
  const s = new Set(arr);
  return items.some((x) => s.has(x));
}

/**
 * Defensive normalization: UI/data layers sometimes introduce whitespace.
 * Without trimming, ["laryngeal surface of epiglottis", "laryngeal surface of epiglottis "]
 * incorrectly counts as 2 subsites and upstages T1 → T2.
 */
function normalizeSubsite(s: SupraglotticSubsite): SupraglotticSubsite {
  return s.trim() as SupraglotticSubsite;
}

export function computeT_Supraglottic(i: SupraglotticTInputs): SupraglotticT {
  if (i.tis) return "Tis";

  // T4b
  if (
    hasAny(i.very_advanced_invasion, [
      "prevertebral space",
      "carotid encasement",
      "mediastinal structures",
    ])
  ) {
    return "T4b";
  }

  // T4a
  if (
    hasAny(i.extralaryngeal_invasion, [
      "through thyroid cartilage",
      "trachea",
      "soft tissues of neck",
      "strap muscles",
      "thyroid",
      "esophagus",
    ])
  ) {
    return "T4a";
  }

  // T3
  const t3 =
    i.cord_mobility === "fixed" ||
    !!i.invades_pre_epiglottic_space ||
    !!i.invades_paraglottic_space ||
    !!i.invades_postcricoid_area ||
    !!i.inner_cortex_thyroid_cartilage;

  if (t3) return "T3";

  // T1 vs T2
  const subsites = uniq((i.involved_supraglottic_subsites || []).map(normalizeSubsite));
  const subsiteCount = subsites.length;

  const hasExtension =
    !!i.extends_to_glottis ||
    !!i.extends_to_base_of_tongue_mucosa ||
    !!i.extends_to_vallecula ||
    !!i.extends_to_pharyngeal_wall;

  const mobilityNormal = i.cord_mobility === "normal";
  const mobilityNotFixed = i.cord_mobility !== "fixed";

  // T1: one supraglottic subsite, normal mobility, no extension
  if (subsiteCount <= 1 && mobilityNormal && !hasExtension) return "T1";

  // Otherwise (with T3/T4 already excluded), default to T2 as long as not fixed
  if (mobilityNotFixed) {
    if (subsiteCount > 1 || hasExtension) return "T2";
    if (!mobilityNormal) return "T2"; // impaired or unknown
  }

  return "T2";
}
