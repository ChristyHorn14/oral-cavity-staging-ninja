// lib/staging/hypopharynxStage.ts
// Hypopharynx T staging (AJCC 8–style rules; MVP feature-driven)
// Returns UI-friendly strings: "TX" | "T0" | "Tis" | "T1" | "T2" | "T3" | "T4a" | "T4b"
//
// Key rule decisions (documented):
// - Size thresholds: ≤2 cm (T1) ; >2–4 cm (T2) ; >4 cm (T3)
// - More than one hypopharyngeal subsite OR adjacent site involvement (without fixation / T4 features) => T2
// - Extension to (cervical) esophagus => T3  (AJCC-style)
// - Vocal cord/hemilarynx fixation => T3
// - Thyroid/cricoid cartilage invasion OR hyoid OR thyroid gland OR central-compartment/neck soft tissue => T4a
// - Prevertebral space/fascia invasion OR carotid encasement OR mediastinal structures => T4b

export type HypopharynxSubsite = "pyriform_sinus" | "posterior_pharyngeal_wall" | "postcricoid";

export type HypopharynxVocalCordMobility = "normal" | "impaired" | "fixed" | "unknown";

export type HypopharynxAdjacentSite =
  | "none"
  | "oropharynx"
  | "larynx"
  | "cervical_esophagus"
  | "multiple"
  | "unknown";

export type HypopharynxCartilageInvasion = "none" | "thyroid_or_cricoid" | "unknown";

export type HypopharynxUnresectableFeature =
  | "none"
  | "carotid_encasement"
  | "prevertebral_space"
  | "mediastinal_structures"
  | "unknown";

export type HypopharynxT = "TX" | "T0" | "Tis" | "T1" | "T2" | "T3" | "T4a" | "T4b";

export interface HypopharynxTInputs {
  primary_tumor_assessable: boolean; // if false => TX
  no_primary_tumor_identified?: boolean; // if true => T0
  carcinoma_in_situ?: boolean; // if true => Tis

  // size/extent
  max_dimension_cm: number; // use 0 for unknown only if you also mark primary_tumor_assessable=false; otherwise it will behave as ≤2
  limited_to_one_subsite: boolean; // true only if confined to a single hypopharynx subsite
  multiple_hypopharynx_subsites: boolean; // true if >1 hypopharynx subsite involved

  // adjacent site involvement (without deep invasion) usually pushes to T2;
  // explicit esophagus extension upgrades to T3 (see below).
  adjacent_site_involvement?: HypopharynxAdjacentSite;

  // laryngeal function
  vocal_cord_mobility?: HypopharynxVocalCordMobility; // "fixed" => T3

  // explicit esophagus extension (AJCC-style T3 rule)
  extends_to_esophagus?: boolean;

  // advanced local extension (T4a triggers)
  cartilage_invasion?: HypopharynxCartilageInvasion; // thyroid/cricoid
  hyoid_invasion?: boolean;
  thyroid_gland_invasion?: boolean;
  soft_tissue_neck_invasion?: boolean; // central compartment/strap muscles / beyond pharyngeal wall into neck soft tissues

  // very advanced/unresectable (T4b triggers)
  unresectable_feature?: HypopharynxUnresectableFeature;
}

export function computeT_Hypopharynx(i: HypopharynxTInputs): HypopharynxT {
  // Guardrails
  if (!i.primary_tumor_assessable) return "TX";
  if (i.no_primary_tumor_identified) return "T0";
  if (i.carcinoma_in_situ) return "Tis";

  const mobility = i.vocal_cord_mobility ?? "unknown";
  const adjacent = i.adjacent_site_involvement ?? "none";
  const cartilage = i.cartilage_invasion ?? "none";
  const unresectable = i.unresectable_feature ?? "none";

  // T4b
  if (
    unresectable === "carotid_encasement" ||
    unresectable === "prevertebral_space" ||
    unresectable === "mediastinal_structures"
  ) {
    return "T4b";
  }

  // T4a
  if (
    cartilage === "thyroid_or_cricoid" ||
    Boolean(i.hyoid_invasion) ||
    Boolean(i.thyroid_gland_invasion) ||
    Boolean(i.soft_tissue_neck_invasion)
  ) {
    return "T4a";
  }

  // T3
  if (mobility === "fixed") return "T3";
  if (Boolean(i.extends_to_esophagus)) return "T3"; // explicit AJCC-style rule
  if (i.max_dimension_cm > 4) return "T3";

  // T2
  // - size >2 and ≤4
  // - OR multiple hypopharyngeal subsites
  // - OR adjacent site involvement (larynx/oropharynx/etc) without fixation/T4 features
  if (i.max_dimension_cm > 2) return "T2";

  if (i.multiple_hypopharynx_subsites) return "T2";

  if (adjacent !== "none" && adjacent !== "unknown") {
    // Note: if adjacent is cervical_esophagus but extends_to_esophagus wasn't explicitly set,
    // we still treat it as T2 to avoid silently upgrading to T3. Set extends_to_esophagus=true for T3.
    return "T2";
  }

  // T1
  if (i.limited_to_one_subsite && i.max_dimension_cm <= 2) return "T1";

  // fallback: prefer the least-wrong non-advanced category
  return "T1";
}

export function explainT_Hypopharynx(i: HypopharynxTInputs, t: HypopharynxT): string {
  switch (t) {
    case "TX":
      return "Primary tumor cannot be assessed.";
    case "T0":
      return "No evidence of a primary tumor.";
    case "Tis":
      return "Carcinoma in situ.";
    case "T4b":
      return "Very advanced disease (prevertebral invasion, carotid encasement, or mediastinal involvement) = T4b.";
    case "T4a":
      return "Invades thyroid/cricoid cartilage, hyoid, thyroid gland, or neck soft tissues = T4a.";
    case "T3":
      return "Any of: >4 cm, hemilarynx/vocal cord fixation, or extension to esophagus = T3.";
    case "T2":
      return "Any of: >2–4 cm, multiple hypopharynx subsites, or adjacent site involvement (without fixation/T4 features) = T2.";
    case "T1":
      return "Limited to one hypopharyngeal subsite and ≤2 cm = T1.";
    default:
      return "T category assigned.";
  }
}
