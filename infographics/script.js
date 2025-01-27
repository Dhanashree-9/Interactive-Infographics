// script.js

const ctx = document.getElementById('wildlifeChart').getContext('2d');

// Initial data for the chart (population trends over 5 years)
const wildlifeData = {
  labels: ['2018', '2019', '2020', '2021', '2022'],
  datasets: [
    {
      label: 'Tiger Population',
      data: [2967, 2992, 3000, 3050, 3150],
      borderColor: '#ff6f61',
      backgroundColor: 'rgba(255, 111, 97, 0.2)',
      fill: true,
    },
    {
      label: 'Elephant Population',
      data: [27000, 27300, 27500, 27800, 28000],
      borderColor: '#36a2eb',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      fill: true,
    },
    {
      label: 'Leopard Population',
      data: [12800, 13000, 13250, 13500, 14000],
      borderColor: '#ffce56',
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      fill: true,
    },
  ],
};

// Create the chart
const wildlifeChart = new Chart(ctx, {
  type: 'line',
  data: wildlifeData,
  options: {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Population Count'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Year'
        }
      }
    }
  }
});


// Handle dropdown species change
function handleSpeciesChange() {
    const species = document.getElementById('species-select').value;
    filterData(species);
  }
  
  // Filter data by year input
  function filterYear(year) {
    if (year < 2018 || year > 2023 || year === '') {
      alert('Please enter a valid year between 2018 and 2023.');
      return;
    }
  
    const yearIndex = wildlifeData.labels.indexOf(year); // Find the year index in the dataset
    if (yearIndex !== -1) {
      const filteredDatasets = wildlifeData.datasets.map(dataset => ({
        label: dataset.label,
        data: [dataset.data[yearIndex]],
        borderColor: dataset.borderColor,
        backgroundColor: dataset.backgroundColor,
        fill: true,
      }));
  
      // Update chart with the single year data
      wildlifeChart.data = {
        labels: [year],
        datasets: filteredDatasets,
      };
      wildlifeChart.update();
    }
  }
  
// Filter data for specific species
function filterData(species) {
  let filteredData;
  let label;
  
  if (species === 'Tiger') {
    filteredData = [2967, 2992, 3000, 3050, 3150];
    label = 'Tiger Population';
  } else if (species === 'Elephant') {
    filteredData = [27000, 27300, 27500, 27800, 28000];
    label = 'Elephant Population';
  } else if (species === 'Leopard') {
    filteredData = [12800, 13000, 13250, 13500, 14000];
    label = 'Leopard Population';
  }

  wildlifeChart.data.datasets = [
    {
      label: label,
      data: filteredData,
      borderColor: species === 'Tiger' ? '#ff6f61' : species === 'Elephant' ? '#36a2eb' : '#ffce56',
      backgroundColor: species === 'Tiger' ? 'rgba(255, 111, 97, 0.2)' : species === 'Elephant' ? 'rgba(54, 162, 235, 0.2)' : 'rgba(255, 206, 86, 0.2)',
      fill: true,
    }
  ];
  wildlifeChart.update();
}
