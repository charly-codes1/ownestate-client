// scripts.js
const ctx = document.getElementById('investmentChart').getContext('2d');

const data = {
    labels: ['Olama Hotels', 'Olama Shortlets', 'Greenland Estate', 'Luxury Homes', 'Olama Estate', 'Comfort Homes'],
    datasets: [{
        label: 'Investment Progress',
        data: [20, 40, 10, 100, 100, 100],
        backgroundColor: [
            'rgba(46, 204, 113, 0.8)',
            'rgba(52, 152, 219, 0.8)',
            'rgba(155, 89, 182, 0.8)',
            'rgba(241, 196, 15, 0.8)',
            'rgba(231, 76, 60, 0.8)',
            'rgba(39, 174, 96, 0.8)',
        ]
    }]
};

const config = {
    type: 'bar',
    data: data,
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
            }
        }
    }
};

new Chart(ctx, config);