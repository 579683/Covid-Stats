import React, {useState, useEffect} from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {fetchDailyData} from "../api";
import { Grid } from "@material-ui/core";
// import style from "./ChartStyle.css"

// ENDRE DATA, Å FÅ GRAFEN TIL Å FUNKE

const Chart = ({
  // data: {confirmed, recovered, deaths},
  // country,
  data
}) => {
  
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async() => {
      setDailyData(await fetchDailyData());
    }

    fetchAPI();
  }, [])
  
  const lineChart = dailyData.length ? (
    <Line data={{
        labels: 'Test',
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infected",
            borderColor: "#ffad1f80",
            backgroundColor: "#ffad1f80",
            fill: true, 
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Infected",
            borderColor: "#ffad1f80",
            backgroundColor: "#ffad1f80",
            fill: true, 
          }
        ]

    }} />
  ) : null;

  return (
    <div>
      <Line data={data} width={2000} height={1500} options={{responsive: true, maintainAspectRatio: false }} /> 
    </div>

    // <Grid container className={style.container}>
    //   <Grid item xs={12} lg={8}>
    //       {lineChart}
    //   </Grid>
    // </Grid>
  )
};

export default Chart;