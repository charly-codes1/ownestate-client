const dropdownBtn = document.querySelector(".dropbtn");
const dropdownContent = document.querySelector(".dropdown-content");
const monthYearList = document.getElementById("monthYearList");

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function generateMonthYearOptions() {
  const currentYear = new Date().getFullYear();
  let optionsHTML = "";

  for (let year = currentYear - 5; year <= currentYear + 5; year++) {
    for (let month = 0; month < 12; month++) {
      optionsHTML += `<li>${months[month]} ${year}</li>`;
    }
  }

  monthYearList.innerHTML = optionsHTML;

  const listItems = monthYearList.querySelectorAll("li");
  listItems.forEach((item) => {
    item.addEventListener("click", () => {
      dropdownBtn.textContent = item.textContent; // Directly set the button text
      dropdownContent.classList.remove("show");
    });
  });
}

generateMonthYearOptions();

dropdownBtn.addEventListener("click", () => {
  if (dropdownContent.classList.contains("show")) {
    dropdownContent.classList.remove("show");
  } else {
    dropdownContent.classList.add("show");
  }
});

// Doughnut
// setup
const data = {
  labels: ["8 lands", "6 apartments", "4 houses"],
  datasets: [
    {
      label: "Sales Analytics",
      data: [60, 30, 10],
      backgroundColor: [
        "rgba(36, 26, 158, 1)",
        "rgba(38, 93, 168, 1)",
        "rgba(85, 102, 254, 1)",
      ],
      borderColor: [
        "rgba(36, 26, 158, 0.2)",
        "rgba(38, 93, 168, 0.2)",
        "rgba(85, 102, 254, 0.2)",
      ],
      borderWidth: 1,
    },
  ],
};

const doughtnutlabel = {
  id: "doughtnutlabel",
  beforeDatasetsDraw(chart, args, pluginOptions) {
    const { ctx, data } = chart;

    ctx.save();
    const xCoor = chart.getDatasetMeta(0).data[0].x;
    const yCoor = chart.getDatasetMeta(0).data[0].y;
    ctx.font = "bold 15px Anek Latin";
    (ctx.fillStyle = "black"), (ctx.textAlign = "center");
    ctx.textBaseline = "middle";
    ctx.fillText(
      `${data.labels[0]}: ${data.datasets[0].data[0] + "%"}`,
      xCoor,
      yCoor
    );
  },
};
// config
const config = {
  type: "doughnut",
  data,
  options: {},
  plugins: [doughtnutlabel],
};

// render init block
const myChart = new Chart(document.getElementById("myChart"), config);

//  Bar Chart
const xValues = ["Sun", "Mon", "Tues", "Wed", "Thursday", "Friday", "Saturday"];
const yValues = [55, 49, 44, 24, 15];
const barColors = ["red", "green", "blue", "orange", "brown"];

new Chart("bar-chart", {
  type: "bar",
  data: {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Houses",
        data: [62, 65, 45, 25, 75, 93, 60],
        backgroundColor: ["rgba(85, 102, 254, 1)"],
        borderColor: ["rgba(85, 102, 254, 0.2)"],
        borderWidth: 1,
      },
      {
        label: "Lands",
        data: [83, 43, 75, 98, 25, 40, 85],
        backgroundColor: ["rgba(36, 26, 158, 1)"],
        borderColor: ["rgba(36, 26, 158, 0.2)"],
        borderWidth: 1,
      },
    ],
  },
  options: {
    legend: { display: false },
    scales: {
      yAxes: [
        {
          stacked: true,
        },
      ],
      xAxes: [
        {
          stacked: true,
          gridLines: {
            display: false,
          },
        },
      ],
    },
  },
});
