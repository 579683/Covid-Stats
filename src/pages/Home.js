import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Columns from "react-columns";
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import ReactApexChart from "react-apexcharts";
// import Chart from "./Chart"
import image from "../images/image.png"
import {Cards, Chart, CountryPicker} from "./index"
import {fetchData} from '../api';

   /*https://disease.sh/v2/historical/ 204 */

function Home() {
    /* Relevant hooks */
    const [results, setResults] = useState([]);
    const [darkTheme, setDarkTheme] = useState(false);

    const [data, setData] = useState({})
    const [country, setCountry] = useState("")    
    
    const [chart, setChart] = useState({});


    /* Get the info from API's */
    useEffect(() => {

        axios.get("https://disease.sh/v3/covid-19/countries")
        .then(responseArr => {
            setResults(responseArr.data);
        })
        .catch(err => {
            console.log(err);
        });
        //console.log(cases, deaths, recovered, obj)
    }, []);

    useEffect(async () => {
      // getData();

      const fetchedData = await fetchData();
      setData(fetchedData);
    }, [])

    const handleCountryChange = async (country) => {
      const fetchedData = await fetchData(country)
      setData(fetchedData);
      setCountry(country)
    }

    const getData = async () => {
      try {
        const res = await axios.get(
          `https://disease.sh/v3/covid-19/historical/norway`
        );

        setChart({
          labels: Object.keys(res.data.timeline.cases),
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
              data: Object.values(res.data.timeline.cases)
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
              data: Object.values(res.data.timeline.deaths)
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
              data: Object.values(res.data.timeline.recovered)
            }
          ]
        });
      } catch (error) {
        console.log(error.response);
      }
    };

    const filterCountry = results.filter(item => {
         return item.country === "Norway";
    })

    
    const countries = filterCountry.map((data, i) => {
        return (
            <Card key={i} bg={darkTheme ? "dark" : "light"} text={darkTheme ? "light" : "dark"} style={{margin: "10px", display: "block", position: "relative", width: "400px"}}>
                <Card.Img variant="top" src={data.countryInfo.flag} />
                <Card.Body>
                    <Card.Title>{data.country}</Card.Title>
                    <Card.Text>Cases: {data.cases}</Card.Text>
                    <Card.Text>Deaths: {data.deaths}</Card.Text>
                    <Card.Text>Recovered: {data.recovered}</Card.Text>
                    <Card.Text>Today's cases: {data.todayCases}</Card.Text>
                    <Card.Text>Today's deaths: {data.todayDeaths}</Card.Text>
                    <Card.Text>Active: {data.active}</Card.Text>
                    <Card.Text>Critical: {data.critical}</Card.Text>
                </Card.Body>
            </Card>
        );
    });


    var queries = [{
        columns: 2,
        query: 'min-width: 500px'
    }, {
        columns: 3,
        query: 'min-width: 1000px'
    }];

    const handleDarkThemeChange = () => {
        setDarkTheme(!darkTheme)
    };

    return (
        <div style = {{backgroundColor: darkTheme ? "black" : "white", color: darkTheme ? "white" : "black"}}>
            <br />
            {/* <h2 style={{textAlign: "center"}}>Norway's Covid-19 Live Statistics</h2> */}
            <img src={image} style={{width: "400px", marginTop: "10px", marginLeft: "auto", marginRight: "auto", display: "block" }} alt="Norway's Covid-19 Live Statistics" />
            <br />
            <div style={{textAlign: "center"}}>
            <Toggle
                defaultChecked={false}
                icons={{
                    checked: "🌜",
                    unchecked: "🌞",
                }}
                onChange={handleDarkThemeChange} 
                />
            </div>
            <br />
            <div style={{marginLeft: "20px"}}>
              <Columns queries={queries}>{countries}</Columns>
            </div>
            <div style={{ margin: "10px", display: "block", position: "relative", left: "550px", top:"-650px", width: "1950px", height: "30%" }}>
              {/* <Chart data={chart} /> */}
              <Cards data={data} />
              <CountryPicker handleCountryChange={handleCountryChange} />
              <Chart data={data} country={country} />
              <br />
            </div>
        </div>
    );
}
export default Home;
