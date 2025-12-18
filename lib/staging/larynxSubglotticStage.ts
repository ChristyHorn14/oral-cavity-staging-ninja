// lib/staging/larynxSubglotticStage.ts
// Subglottic larynx T staging (AJCC 8 style logic)
// Conventions:
// - Returns lowercase: "t0" | "tis" | "t1" | "t2" | "t3" | "t4a" | "t4b"
// - Designed for boolean/feature-driven staging (no size/DOI cutoffs in subglottis)

export type SubglotticVocalCordMobility = "normal" | "impaired" | "fixed" | "unknown";

export type SubglotticThyroidCartilage = "none" | "inner_cortex" | "through" | "unknown";

export type SubglotticExtralaryngealExtension =
  | "none"
  | "trachea"
  | "soft_tissues_neck"
  | "thyroid"
  | "esophagus"
  | "other"
  | "unknown";

export type SubglotticUnresectableFeature =
  | "none"
  | "carotid_encasement"
  | "prevertebral_space"
  | "mediastinal_structures"
  | "unknown";

export type SubglotticT =
  | "t0"
  | "tis"
  | "t1"
  | "t2"
  | "t3"
  | "t4a"
  | "t4b"
  | "tx";

export interface SubglotticTInputs {
  // housekeeping
  primary_tumor_assessable: boolean; // if false => "tx"
  no_primary_tumor_identified?: boolean; // if true => "t0" (optional but useful for unknown primary workflows)
  carcinoma_in_situ?: boolean; // if true => "tis" (unless tx/t0 override)

  // extent / behavior
  limited_to_subglottis: boolean; // tumor confined to subglottis
  extends_to_vocal_cord: boolean; // subglottic primary extends to true vocal cord(s)
  vocal_cord_mobility?: SubglotticVocalCordMobility; // relevant if extends_to_vocal_cord or larynx involvement

  // deep spaces / cartilage
  paraglottic_space_invasion: boolean; // if true => at least t3
  thyroid_cartilage?: SubglotticThyroidCartilage; // inner_cortex => at least t3; through => t4a

  // beyond larynx
  extralaryngeal_extension?: SubglotticExtralaryngealExtension; // trachea/neck soft tissue/thyroid/esophagus => t4a

  // very advanced/unresectable
  unresectable_feature?: SubglotticUnresectableFeature; // any of these => t4b
}

export function computeT_LarynxSubglottic(i: SubglotticTInputs): SubglotticT {
  // 0) TX / T0 / Tis guardrails
  if (!i.primary_tumor_assessable) return "tx";
  if (i.no_primary_tumor_identified) return "t0";
  if (i.carcinoma_in_situ) return "tis";

  const mobility = i.vocal_cord_mobility ?? "unknown";
  const thyroidCartilage = i.thyroid_cartilage ?? "unknown";
  const extra = i.extralaryngeal_extension ?? "none";
  const unresectable = i.unresectable_feature ?? "none";

  // 1) T4b: very advanced (unresectable features)
  if (
    unresectable === "carotid_encasement" ||
    unresectable === "prevertebral_space" ||
    unresectable === "mediastinal_structures"
  ) {
    return "t4b";
  }

  // 2) T4a: through thyroid cartilage or extralaryngeal extension (including trachea)
  const isT4aExtralaryngeal =
    extra === "trachea" ||
    extra === "soft_tissues_neck" ||
    extra === "thyroid" ||
    extra === "esophagus" ||
    extra === "other";

  if (thyroidCartilage === "through" || isT4aExtralaryngeal) {
    return "t4a";
  }

  // 3) T3: cord fixation OR paraglottic space OR inner cortex thyroid cartilage erosion
  if (mobility === "fixed") return "t3";
  if (i.paraglottic_space_invasion) return "t3";
  if (thyroidCartilage === "inner_cortex") return "t3";

  // 4) T2: extends to vocal cord(s) with normal or impaired mobility
  // If it reaches the cords, it's at least T2 unless already T3+ above.
  if (i.extends_to_vocal_cord) {
    // normal/impaired/unknown -> treat as T2 unless fixed (already handled)
    return "t2";
  }

  // 5) T1: limited to subglottis
  if (i.limited_to_subglottis) return "t1";

  // 6) Fallback: if data are inconsistent (not limited to subglottis but also not extending to cords, etc.)
  // Choose the least-wrong conservative category rather than crashing.
  // If the tumor is in larynx but inputs don't map cleanly, default to T1.
  return "t1";
}

// Optional helper: gives a short explanation string for UI "teaching pearl" style feedback.
export function explainT_LarynxSubglottic(i: SubglotticTInputs, t: SubglotticT): string {
  switch (t) {
    case "tx":
      return "Primary tumor cannot be assessed (TX).";
    case "t0":
      return "No evidence of a primary tumor (T0).";
    case "tis":
      return "Carcinoma in situ (Tis).";
    case "t4b":
      return "Very advanced disease with unresectable features (carotid encasement, prevertebral or mediastinal invasion).";
    case "t4a":
      return "Through thyroid cartilage or extralaryngeal extension (e.g., trachea/neck soft tissues/thyroid/esophagus).";
    case "t3":
      return "Cord fixation, paraglottic space invasion, or inner cortex thyroid cartilage erosion.";
    case "t2":
      return "Extends to vocal cords with mobility not fixed (normal/impaired/unknown).";
    case "t1":
      return "Limited to the subglottis.";
    default:
      return "T category assigned.";
  }
}
