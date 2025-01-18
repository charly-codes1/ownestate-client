document.getElementById("calculate-btn").addEventListener("click", function () {
  const propertyPrice = parseFloat(
    document.getElementById("property-select").value
  );
  const investment = parseFloat(document.getElementById("investment").value);

  if (isNaN(propertyPrice) || isNaN(investment)) {
    document.getElementById("result").innerText =
      "Please select a property and enter your investment.";
    return;
  }

  if (investment > propertyPrice) {
    document.getElementById("result").innerText =
      "Investment cannot be greater than the property price.";
    return;
  }

  const roi = ((propertyPrice - investment) / investment) * 100;
  document.getElementById("result").innerText = `Your ROI: ${roi.toFixed(2)}%`;
});
