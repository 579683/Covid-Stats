import React, {useState, useEffect} from 'react';
import "../App.css";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import image from "../images/image.png";
import {Chart} from "./index"
import {fetchData} from '../api';


function Graph() {
  
  const [chart, setChart] = useState({});
  const [data, setData] = useState({});

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    try {
      const res = await axios.get(
        `https://disease.sh/v3/covid-19/historical/all?lastdays=all`
      );
      
      setChart({
        labels: Object.keys(res.data.cases),
        datasets: [
          {
            label: "Cases",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: Object.values(res.data.cases)
          },
          {
            label: "Deaths",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "red",
            borderColor: "red",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: Object.values(res.data.deaths)
          },
          {
            label: "Recovered",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "blue",
            borderColor: "blue",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: Object.values(res.data.recovered)
          }
        ]
      });

    } catch (error) {
      console.log(error.response);
    }
  };

    return (
        <div 
            style={{
                backgroundColor: "white",
                textAlign: "center",
            }}
            >
                <br/>
                {/* <h2>COVID-19 Global graphs</h2> */}
                <img src={image} style={{width: "400px", marginTop: "10px", marginLeft: "auto", marginRight: "auto", display: "block" }} alt="COVID-19 Global graphs" />
                <br />
                {/* <ReactApexChart options={options} series={series} type="area" height={350} /> */}
                
                <div style={{ margin: "20px", width: "2150px", position: "relative", left: "550px", top:"-80px" }}>
                  <Chart data={chart} />
                </div>
                <br />
                <br />
                {/* <ReactApexChart options={options} series={series} type="bar" height={350} /> */}
                <br />
            </div>
    );
}
export default Graph;