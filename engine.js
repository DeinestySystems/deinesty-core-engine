/**
 * DEINESTY CORE ENGINE - Logic Module
 * Universal KPI Status Logic
 */

function getKpiStatus(profit) {
  // If the value is empty or not a number, return nothing
  if (profit === "" || profit === null || isNaN(profit)) return "";
  
  // The "Performance Brain"
  // This is where the Deinesty "Secret Sauce" lives
  if (profit > 20) {
    return "🔥";
  } else if (profit < 0) {
    return "⚠️";
  } else {
    return "✅";
  }
}
