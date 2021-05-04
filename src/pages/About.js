import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Columns from "react-columns";
import Toggle from 'react-toggle';
import "react-toggle/style.css";

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
        </div>
    );
}
export default About;