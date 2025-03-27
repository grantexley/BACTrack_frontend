export function calculateBAC(drinks) {
  if (!Array.isArray(drinks)) return 0;

  const weightKg = 77; // 170 pounds
  const r = 0.68; // Male
  const bodyWaterConstant = weightKg * r * 1000;

  const now = new Date();
  let totalAlcohol = 0;

  drinks.forEach((drink) => {
    const timeElapsedHrs = (now - new Date(drink.timestamp)) / (1000 * 60 * 60);

    console.log(timeElapsedHrs);

    // Convert fl oz to mL
    const volumeMl = drink.volume * 29.5735;

    // Calculate pure alcohol in mL
    const alcoholMl = volumeMl * (drink.alcoholContent / 100);

    // Convert to grams of alcohol
    const alcoholGrams = alcoholMl * 0.789;

    // Widmark formula
    const bac =
      (alcoholGrams / bodyWaterConstant) * 100 - 0.015 * timeElapsedHrs;

    totalAlcohol += Math.max(bac, 0);
  });

  return totalAlcohol.toFixed(3);
}
