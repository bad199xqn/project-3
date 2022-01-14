import React, { Component, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

import "./dashboard.scss";

const columnWidthCal = (colNum) => {
  switch (colNum) {
    case 1:
      return "4%";
      break;
    case 3:
      return "10%";
      break;
    case 7:
      return "15%";
      break;
    case 15:
      return "35%";
      break;
    case 30:
      return "50%";
      break;
    default:
      break;
  }
};

function StackedColumnChart(props) {
  const [options, setOptions] = useState({
    chart: {
      height: 359,
      type: "bar",
      stacked: !0,
      toolbar: {
        show: 1,
      },
      zoom: {
        enabled: !0,
      },
    },
    plotOptions: {
      bar: {
        horizontal: !1,
        columnWidth: "15%",
        // endingShape: "rounded"
      },
    },
    dataLabels: {
      enabled: !1,
    },
    xaxis: {
      categories: [],
    },
    colors: ["#19CE8C", "#8692A3", "#FF4A5E"],
    legend: {
      position: "bottom",
    },
    fill: {
      opacity: 1,
    },
  });

  const [series, setSeries] = useState([
    {
      name: "Tích cực",
      data: [],
    },
    {
      name: "Trung tính",
      data: [],
    },
    {
      name: "Tiêu cực",
      data: [],
    },
  ]);

  useEffect(() => {
    let pos_data = [];
    let neg_data = [];
    let neu_data = [];
    let total_data = [];
    let categories_x = [];

    props.data.positive_series.map((sen) => {
      pos_data = [...pos_data, sen.count];
    });

    props.data.negative_series.map((sen) => {
      neg_data = [...neg_data, sen.count];
    });

    props.data.total_series.map((sen) => {
      total_data = [...total_data, sen.count];
      categories_x = [...categories_x, sen.group_date];
    });

    for (var i = 0; i < props.data.total_series.length; i++) {
      neu_data[i] = total_data[i] - pos_data[i] - neg_data[i];
    }

    setSeries([
      {
        name: "Tích cực",
        data: pos_data,
      },
      {
        name: "Trung tính",
        data: neu_data,
      },
      {
        name: "Tiêu cực",
        data: neg_data,
      },
    ]);

    setOptions({
      chart: {
        background: "#f8f8fb",
        height: 359,
        type: "bar",
        stacked: !0,
        toolbar: {
          show: 1,
        },
        zoom: {
          enabled: !0,
        },
        events: {
          click: (event, chartContext, config) => {
            const element = event.target;

            if (
              String(element.textContent).search("-") !== -1 &&
              element.tagName === "tspan"
            ) {
              const time = element.textContent;
              props.timeClick(time, "0,1,2,3,4", 1);
            }
          },
          mouseMove: function (event, chartContext, config) {
            const element = event.target;
            if (
              String(element.textContent).search("-") !== -1 &&
              element.tagName === "tspan"
            ) {
              element.style.cursor = "pointer";
            }
          },
          dataPointMouseEnter: function (event, chartContext, config) {
            // event.path[0].style.cursor = "pointer";
          },
        },
      },
      plotOptions: {
        bar: {
          horizontal: !1,
          columnWidth: columnWidthCal(props.data.total_series.length),
          // endingShape: "rounded"
        //   borderRadius: 8,
        },
      },
      dataLabels: {
        enabled: !1,
      },
      xaxis: {
        categories: categories_x,
      },
      colors: ["#19CE8C", "#8692A3", "#FF4A5E"],
      // colors: ["#34c38f", "#ec4561"],
      legend: {
        position: "bottom",
        show: false,
      },
      fill: {
        opacity: 1,
      },
    });
  }, [props.data]);

  return (
    <React.Fragment>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height="287"
      />
    </React.Fragment>
  );
}

export default StackedColumnChart;
