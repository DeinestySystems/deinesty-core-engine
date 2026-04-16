/**
 * DEINESTY CORE ENGINE - LOGIC UNIT
 * This function now calculates based on Margin % rather than flat $
 */
function getKpiStatus(netProfit, grossSales) {
  if (!grossSales || grossSales <= 0) return "😶";
  
  const margin = netProfit / grossSales;

  if (margin >= 0.30) return "🚀"; // 30%+ Margin
  if (margin >= 0.15) return "🔥"; // 15-30% Margin
  if (margin >= 0.05) return "✅"; // 5-15% Margin
  return "⚠️"; // Below 5% Margin
}
