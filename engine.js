/**
 * DEINESTY CORE ENGINE - SaaS Logic v1.5
 * Handles Efficiency Math and UI Feedback for 4-Card Layout
 */

function updateDashboard(data) {
    // 1. Extract and Clean Data
    const sales = parseFloat(data.totalSales) || 0;
    const ads = parseFloat(data.adBurn) || 0;
    const profit = parseFloat(data.netProfit) || 0;
    const target = parseFloat(data.targetProfit) || 0;

    // 2. Calculate Margin % (Hidden Background Logic)
    const margin = sales > 0 ? ((profit / sales) * 100).toFixed(1) : 0;

    // 3. Update the UI Text
    document.getElementById('sales-val').innerText = formatCurrency(sales);
    document.getElementById('ads-val').innerText = formatCurrency(ads);
    document.getElementById('profit-val').innerText = formatCurrency(profit);
    document.getElementById('target-val').innerText = formatCurrency(target);

    // 4. The "Deep Logic" - Business Health Assessment
    const statusText = document.getElementById('status-text');
    const rocket = document.getElementById('rocket');

    // Reset styles first
    rocket.style.transform = "rotate(0deg) scale(1)";

    if (sales === 0) {
        statusText.innerText = "WAITING FOR DATA";
        statusText.style.color = "#555";
    } else if (margin >= 30) {
        statusText.innerText = "🚀 ELITE PERFORMANCE";
        statusText.style.color = "#00FF00";
        rocket.style.transform = "scale(1.3) translateY(-15px)";
    } else if (margin >= 15) {
        statusText.innerText = "✅ SYSTEMS NOMINAL";
        statusText.style.color = "#FFFFFF";
        rocket.style.transform = "scale(1)";
    } else if (margin > 0) {
        statusText.innerText = "⚠️ LEAN MARGINS";
        statusText.style.color = "#FFBF00";
        rocket.style.transform = "scale(0.9)";
    } else {
        statusText.innerText = "🛑 CRITICAL: UNDERPERFORMING";
        statusText.style.color = "#FF0000";
        rocket.style.transform = "rotate(90deg) scale(0.8)";
    }
}

// Helper to keep numbers pretty
function formatCurrency(num) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(num);
}

// FOR TESTING: You can uncomment the line below to see it work without the Sheet!
// updateDashboard({totalSales: 1000, adBurn: 200, netProfit: 350, targetProfit: 500});
