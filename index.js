console.log('Happy developing ✨')
function calculate() {
    const spendAmount = parseFloat(document.getElementById('spendAmount').value);
    const timeFrame = parseFloat(document.getElementById('timeFrame').value);
    const monthlySpend = parseFloat(document.getElementById('monthlySpend').value);

    const requiredSpendPerMonth = spendAmount / timeFrame;
    let resultText;

    if (monthlySpend >= requiredSpendPerMonth) {
        resultText = `You will meet the spending requirement in ${timeFrame} months!`;
    } else {
        const monthsNeeded = Math.ceil(spendAmount / monthlySpend);
        resultText = `You will need approximately ${monthsNeeded} months to meet the spending requirement.`;
    }

    document.getElementById('result').textContent = resultText;
}









