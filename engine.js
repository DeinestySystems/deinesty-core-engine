/**
 * DEINESTY CORE ENGINE - Logic Module
 * Version: 1.5.0
 * This file lives in GitHub and controls the "Brain" of your sheets.
 */

/**
 * Primary function to determine the status of a KPI row.
 * @param {number} profit - The net profit value from the sheet.
 * @return {string} - The emoji status indicator.
 */
function getKpiStatus(profit) {
  
  // 1. Safety Check: Handle empty cells or text errors
  if (profit === "" || profit === null || isNaN(profit)) {
    return "";
  }
  
  // 2. Performance Logic
  // This is the "Secret Sauce" you can update remotely.
  
  // ELITE PERFORMANCE (Over $50)
  if (profit > 50) {
    return "🚀"; 
  } 
  
  // STEADY GROWTH (Between $20 and $50)
  else if (profit >= 20) {
    return "🔥";
  }
  
  // BREAK EVEN / MINIMUM (Between $0 and $19.99)
  else if (profit >= 0) {
    return "✅";
  }
  
  // LOSS / CRITICAL (Below $0)
  else {
    return "⚠️";
  }
}

/**
 * Future-Proofing: You can add more modular functions below 
 * and they will automatically be available to your Google Sheet.
 */
function calculateMargin(profit, gross) {
  if (gross <= 0) return 0;
  return (profit / gross);
}
