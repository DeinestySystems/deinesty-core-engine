/**
 * DEINESTY SYSTEMS - CORE ENGINE v1.5 (UNIVERSAL HYBRID)
 * Powers both the Interactive Sheet and the Web SaaS UI.
 */

const DEINESTY_CONFIG = {
  THEME: { 
    bg: '#000000', 
    amber: '#FFBF00', 
    white: '#FFFFFF', 
    green: '#00FF00', 
    font: 'Lexend', 
    inputBox: '#443a00' 
  },
  VERSION: 'v1.5', 
  CORE_WIDTH: 1150 
};

// ==========================================
// 1. CORE LOGIC (Shared by Sheet & SaaS Web)
// ==========================================
const BUSINESS_RULES = {
  MARGIN_ROCKET: 0.30, // 30%
  MARGIN_FIRE: 0.15,   // 15%
  
  // This is the function the Web SaaS will call
  getStatus: function(net, gross) {
    if (!gross || gross <= 0) return "";
    const margin = net / gross;
    if (net <= 0) return "⚠️";
    if (margin >= this.MARGIN_ROCKET) return "🚀";
    if (margin >= this.MARGIN_FIRE) return "🔥";
    return "✅";
  },
  
  // This is the formula the Google Sheet will use
  getSheetFormula: function() {
    return '=IF(K9="","",IF(K9<=0,"⚠️",IF((K9/H9)>=0.3,"🚀",IF((K9/H9)>=0.15,"🔥","✅"))))';
  }
};

// ==========================================
// 2. SHEET UI (Interactive Product Only)
// ==========================================
function onOpen() {
  SpreadsheetApp.getUi().createMenu('🚀 DEINESTY TOOLS')
    .addItem('1. Rebuild Dashboard', 'bootSequence')
    .addItem('2. Center for My Screen', 'setFluidSymmetry')
    .addToUi();
}

function bootSequence() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  sheet.clear();
  sheet.clearFormats();
  
  const currentCols = sheet.getMaxColumns();
  if (currentCols > 13) { sheet.deleteColumns(14, currentCols - 13); } 
  else if (currentCols < 13) { sheet.insertColumnsAfter(currentCols, 13 - currentCols); }
  
  sheet.getRange(1, 1, 1000, 13).setBackground(DEINESTY_CONFIG.THEME.bg);
  
  // BRANDING
  sheet.getRange("B2:L2").merge().setValue("The Core | KPI Command Center")
    .setFontColor(DEINESTY_CONFIG.THEME.amber).setFontSize(28).setFontWeight("bold").setFontFamily(DEINESTY_CONFIG.THEME.font).setHorizontalAlignment("center");
  
  // KPI COCKPIT (Summary Row)
  sheet.getRange("B7:C7").merge().setFormula("=SUM(H9:H1000)").setFontColor(DEINESTY_CONFIG.THEME.amber).setFontSize(22).setNumberFormat("$#,##0.00").setHorizontalAlignment("center");
  sheet.getRange("F7:I7").merge().setFormula("=SUM(K9:K1000)").setFontColor(DEINESTY_CONFIG.THEME.green).setFontSize(26).setFontWeight("bold").setNumberFormat("$#,##0.00").setHorizontalAlignment("center");

  // DATA ENGINE
  sheet.getRange("B9:L1000").setFontColor(DEINESTY_CONFIG.THEME.white).setVerticalAlignment("middle").setHorizontalAlignment("center").setFontFamily(DEINESTY_CONFIG.THEME.font);
  sheet.getRange("G9:K1000").setNumberFormat("$#,##0.00");
  
  // The Math (Net Profit)
  sheet.getRange("K9:K1000").setFormula('=IF(H9<>"", H9-G9-I9-J9, "")').setFontColor(DEINESTY_CONFIG.THEME.green).setFontWeight("bold");
  
  // THE UNIVERSAL STATUS (Pulled from BUSINESS_RULES)
  sheet.getRange("L9:L1000").setFormula(BUSINESS_RULES.getSheetFormula());

  // SYMMETRY
  const dataWidths = [110, 140, 120, 120, 55, 110, 110, 110, 110, 120, 80]; 
  dataWidths.forEach((w, i) => sheet.setColumnWidth(i + 2, w));
  sheet.setFrozenRows(8);
  setFluidSymmetry();
}

function setFluidSymmetry() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const screenEstimate = 1400; 
  const sideBuffer = Math.max(50, (screenEstimate - DEINESTY_CONFIG.CORE_WIDTH) / 2);
  sheet.setColumnWidth(1, sideBuffer); 
  sheet.setColumnWidth(13, sideBuffer);
}
