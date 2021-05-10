import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Columns from "react-columns";
import Toggle from 'react-toggle';
import "react-toggle/style.css";
import ReactApexChart from "react-apexcharts";

function About() {
    /* Relevant hooks */
    const [results, setResults] = useState([]);
    const [darkTheme, setDarkTheme] = useState(false);


    /* Get the info from API's */
    useEffect(() => {
        axios
        .all([
            axios.get("https://disease.sh/v3/covid-19/countries")
        ])
        .then(responseArr => {
            setResults(responseArr[0].data);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);


    const filterCountries = results.filter(item => {
         return item.country === "Norway";
    })

    const countries = filterCountries.map((data, i) => {
        return (
            <Card key={i} bg={darkTheme ? "dark" : "light"} text={darkTheme ? "light" : "dark"} style={{margin: "10px", display: "block", position: "relative", right: "-100%"}}>
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

    /*https://disease.sh/v2/historical/ 202 */
    const series = [{
        name: 'Cases',
        data: [102974, 103621, 104269, 105008, 105607, 106224, 106727, 107144, 107510, 108028, 108342, 109137, 109581, 110061, 110390, 110612, 111162, 111686, 112156, 112541, 112970, 113259, 113469, 113952, 114436, 114905, 115411, 115818, 116134, 116365]
      }, {
        name: 'Deaths',
        data: [684, 684, 687, 688, 706, 707, 708, 708, 708, 709, 709, 734, 735, 736, 736, 736, 736, 736, 753, 754, 756, 756, 756, 757, 757, 767, 767, 767, 767, 767]
      }, {
        name: 'Recovered',
        data: [17998, 17998, 17998, 17998, 17998, 17998, 17998, 17998, 17998, 17998, 17998, 17998, 17998, 17998, 17998, 17998, 17998, 17998, 17998, 17998, 17998, 17998, 17998, 17998, 17998, 17998, 17998, 17998, 17998, 17998]
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
          ["4/10/21", 
          "4/11/21", 
          "4/12/21", 
          "4/13/21", 
          "4/14/21", 
          "4/15/21", 
          "4/16/21",
          "4/17/21",
          "4/18/21",
          "4/19/21",
          "4/20/21",
          "4/21/21",
          "4/22/21",
          "4/23/21",
          "4/24/21",
          "4/25/21",
          "4/26/21",
          "4/27/21",
          "4/28/21",
          "4/29/21",
          "4/30/21",
          "5/1/21",
          "5/2/21",
          "5/3/21",
          "5/4/21",
          "5/5/21",
          "5/6/21",
          "5/7/21",
          "5/8/21",
          "5/9/21"]
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy'
          },
        },
      };


    return (
        <div style = {{backgroundColor: darkTheme ? "black" : "white", color: darkTheme ? "white" : "black"}}>
            <br />
            <h2 style={{textAlign: "center"}}>Norway's Covid-19 Live Statistics</h2>
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
            <Columns queries={queries}>{countries}</Columns>
            <br />
            <ReactApexChart options={options} series={series} type="area" height={350} />
            <br />
        </div>
    );
}
export default About;