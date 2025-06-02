export function convertCmToFeetInches(cm: number): string {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${feet}'${inches}"`;
}

export function convertKgToLbs(kg: number): string {
  const pounds = kg * 2.20462;
  return `${pounds.toFixed(1)} lbs`;
}

export function convertDmToM(dm: number): number {
  return dm / 10;
}

export function convertHgtoKg(Hg: number): number {
  return Hg / 10;
}
