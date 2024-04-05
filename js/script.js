document.addEventListener("DOMContentLoaded", function() {
  Chart.defaults.plugins.legend.display = false
  const allocationDescriptions = document.querySelectorAll('.allocation__description');
  const percentages = [];
  allocationDescriptions.forEach(description => {
    const percentageElement = description.querySelector('p:last-child');
    if(!percentageElement) return
    const percentage = parseFloat(percentageElement.textContent.replace('%', ''));
    percentages.push(percentage);
  });

  const data = {
    values: percentages,
    colors: ['#2E4FFF', '#23C953', '#FFC24C', '#FF754A', '#9B4DFF']
  };
  const ctx = document.getElementById('allocationChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: data.values,
        backgroundColor: data.colors,
        borderColor: 'transparent',
        borderWidth: 0,
      }]
    },
    options: {
      cutout: 90,
    }
  });

  async function getBitcoinData() {
    const response = await fetch('https://api.coindesk.com/v1/bpi/historical/close.json');
    const data = await response.json();
    return data;
  }

  async function createChart() {
    const bitcoinData = await getBitcoinData();
    const dates = Object.keys(bitcoinData.bpi);
    const prices = Object.values(bitcoinData.bpi);
    console.log(prices);

    const ctx = document.getElementById('bitcoinChart').getContext('2d');
    const bitcoinChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Bitcoin Price (USD)',
          data: prices,
          borderColor: '#21B04A',
          backgroundColor: 'rgba(255, 255, 255, 0.2)', 
          fill: false,
          borderWidth: 2,
          pointRadius: 0
        }]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          x: {
            display: false
          },
          y: {
            display: false
          }
        }
      }
    });
  }
  createChart()
});