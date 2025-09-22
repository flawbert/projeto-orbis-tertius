export function useTranslation(str: string) {
  const translationMap = new Map();
  translationMap.set("morphology", "morfologia");
  translationMap.set("physiology", "fisiologia");

  return translationMap.get(str) ?? "";
}
