import React from 'react';
import "../App.css";
import ReactApexChart from "react-apexcharts";

function Graph() {

    const series = [{
        name: 'Cases',
        data: [557, 78602, 344205, 2651321, 5222614, 9076656, 15231862, 23234707, 31648244, 41761275, 58806043, 78134244, 98259983, 111762700, 123692736, 144742575]
      }, {
        name: 'Deaths',
        data: [17, 2459, 14877, 190322, 341708, 472157, 620018, 805137, 971441, 1138473, 1390694, 1722788, 2115423, 2476309, 2723640, 3072152]
      }, {
        name: 'Recovered',
        data: [30, 22889, 97867, 710018, 2053577, 4526441, 8647438, 14921385, 21733547, 28388094, 37520306, 44086740, 54147169, 63016514, 70137879, 83128167]
      }];
    
    const options = {
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          type: 'datetime',
          categories: 
          ["1/22/20", 
          "2/22/20", 
          "3/22/20", 
          "4/22/20", 
          "5/22/20", 
          "6/22/20", 
          "7/22/20",
          "8/22/20",
          "9/22/20",
          "10/22/20",
          "11/22/20",
          "12/22/20",
          "1/22/21",
          "2/22/21",
          "3/22/21",
          "4/22/21"]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy'
          },
        },
      };

    return (
        <div 
            style={{
                backgroundColor: "white",
                textAlign: "center",
            }}
            >
                <br/>
                <h2>COVID-19 Global graphs</h2>
                <br />
                <ReactApexChart options={options} series={series} type="area" height={350} />
                <br />
                <br />
                <ReactApexChart options={options} series={series} type="bar" height={350} />
                <br />
            </div>
    );
}
export default Graph;