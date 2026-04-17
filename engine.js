/**
 * DEINESTY CORE ENGINE - SaaS Logic v1.5
 * Handles Efficiency Math and UI Feedback
 */

function updateDashboard(data) {
    // 1. Calculate Margin %
    const sales = parseFloat(data.sales) || 0;
    const profit = parseFloat(data.profit) || 0;
    const margin = sales > 0 ? ((profit / sales) * 100).toFixed(1) : 0;

    // 2. Update the UI Text
    document.getElementById('sales-val').innerText = formatCurrency(data.sales);
    document.getElementById('ads-val').innerText = formatCurrency(data.ads);
    document.getElementById('profit-val').innerText = formatCurrency(data.profit);
    document.getElementById('target-val').innerText = formatCurrency(data.target);
    document.getElementById('margin-val').innerText = margin + "%";

    // 3. The "Deep Logic" - Business Health Assessment
    const statusText = document.getElementById('status-text');
    const rocket = document.getElementById('rocket');
    const marginCard = document.getElementById('margin-val');

    if (margin >= 30) {
        statusText.innerText = "🚀 ELITE PERFORMANCE";
        statusText.style.color = "#00FF00";
        marginCard.style.color = "#00FF00";
        rocket.style.transform = "scale(1.2) translateY(-10px)";
    } else if (margin >= 15) {
        statusText.innerText = "✅ SYSTEMS NOMINAL";
        statusText.style.color = "#FFFFFF";
        marginCard.style.color = "#FFFFFF";
        rocket.style.transform = "scale(1)";
    } else if (margin > 0) {
        statusText.innerText = "⚠️ LEAN MARGINS";
        statusText.style.color = "#FFBF00";
        marginCard.style.color = "#FFBF00";
    } else {
        statusText.innerText = "🛑 CRITICAL: UNDERPERFORMING";
        statusText.style.color = "#FF0000";
        marginCard.style.color = "#FF0000";
        rocket.style.transform = "rotate(90deg)";
    }
}

// Helper to keep numbers pretty
function formatCurrency(num) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(num);
}
