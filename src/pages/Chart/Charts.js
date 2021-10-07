import React, {useState, useEffect} from "react";
import {Line, Bar, Pie} from "react-chartjs-2"
import { fetchDailyData } from "../../api";
import styles from "./Chart.module.css"
import {Grid} from "@material-ui/core"

const Chart = ({
    data: {confirmed, recovered, deaths},
    country,
}) => {
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        };

        fetchAPI();
    }, [])

    const lineChart = dailyData.length ? (
        <Line 
            data={{
                labels: dailyData.map(({date}) => date),
                datasets: [
                    {
                        data: dailyData.map(({confirmed}) => confirmed),
                        label: "Infected",
                        borderColor: "#ffad1f80",
                        backgroundColor: "#ffad1f80",
                        fill: "true",
                    },
                    {
                        data: dailyData.map(({deaths}) => deaths),
                        label: "Deaths",
                        borderColor: "red",
                        backgroundColor: "rgba(255,0,0,0.5)",
                        fill: "true",
                    },
                ],
            }}
        />
    ) : null

    const barChart = confirmed ? (
        <Bar 
            data={{
                labels: ["Infected", "Recovered", "Deaths"],
                datasets: [
                    {
                        label: "People",
                        backgroundColor: [
                            "rgba(255, 187, 0, 0.5)",
                            "rgba(0, 255, 0, 0.5)",
                            "rgba(255, 0, 0, 0.5)",
                        ],
                        data: [confirmed.value, recovered.value, deaths.value],
                    },
                ],
            }}
            options={{
                legend: { display: false },
                title: { display: true, text: `Current state in ${country}`}
            }}
        />
    ) : null

    const pieChart = confirmed ? ( /* dailyData.length */
        <Pie
            data={{
                labels: ["Infected", "Recovered", "Deaths"],
                datasets: [
                    {
                        backgroundColor: [
                            "#ffad1f80",
                            "rgba(0, 255, 0, 0.5)",
                            "rgba(255, 0, 0, 0.5)",
                        ],
                        data: [confirmed.value, recovered.value, deaths.value],
                    },
                ],
            }}
            options={{
                title: {
                    display: true,
                    text: !country ? "Ratio in Global" : `Ratio in ${country}`,
                },
            }}
        />
    ) : null;

    return (
        <Grid container className={styles.container}>
            <Grid item xs={12} lg={7}>
                {country ? barChart : lineChart}
            </Grid>
            <Grid item xs={12} lg={3} style={{marginTop: "30px", marginLeft: "150px"}}>
                {pieChart}
            </Grid>
        </Grid>
    );
};

export default Chart;