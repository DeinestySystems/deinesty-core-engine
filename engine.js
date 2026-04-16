/**
 * DEINESTY CORE ENGINE - LOGIC UNIT
 * Updated for Margin-based Analysis
 */
function getKpiStatus(net, gross) {
  if (!gross || gross <= 0) return "😶";
  
  const margin = net / gross;

  if (margin >= 0.40) return "🚀"; // Elite (40%+)
  if (margin >= 0.20) return "🔥"; // Good (20-40%)
  if (margin >= 0.05) return "✅"; // Average (5-20%)
  if (margin > 0) return "⚠️";     // Thin (0-5%)
  return "💀";                    // Loss
}
