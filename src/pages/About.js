import React, {useEffect, useState} from 'react';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Columns from "react-columns";
import Form from "react-bootstrap/Form";
import NumberFormat from 'react-number-format';
import Toggle from 'react-toggle';
import "react-toggle/style.css";

function About() {

    /* Relevant hooks */
    const [latest, setLatest] = useState([]);
    const [results, setResults] = useState([]);
    const [searchCountries, setSearchCountries] = useState("");
    const [darkTheme, setDarkTheme] = useState(false);

    /* Get the info from API's */
    useEffect(() => {
        axios
        .all([
            axios.get("https://disease.sh/v3/covid-19/all"),
            axios.get("https://disease.sh/v3/covid-19/countries")
        ])
        .then(responseArr => {
            setLatest(responseArr[0].data);
            setResults(responseArr[1].data);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    const date = new Date(parseInt(latest.updated));
    const lastUpdated = date.toString();

    const filterCountries = results.filter(item => {
         return searchCountries !== "" ? item.country.toLowerCase().includes(searchCountries.toLowerCase()) : item;
    })

    const countries = filterCountries.map((data, i) => {
        return (
            <Card key={i} bg={darkTheme ? "dark" : "light"} text={darkTheme ? "light" : "dark"} className="text-center" style={{margin: "10px"}}>
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
            <h2 style={{textAlign: "center"}}>Covid-19 Live Statistics</h2>
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
            <br/>
            <CardDeck>

            {/* Displays case count */}
            <Card bg="secondary" text="white" className="text-center" style={{margin: "10px"}}>  
                <Card.Body>
                <Card.Title>Cases</Card.Title>
                {/* <Card.Text>{latest.cases}</Card.Text> */}
                <NumberFormat value={latest.cases} displayType={'text'} thousandSeparator={true} />
                </Card.Body>
                <Card.Footer>
                <small>Last updated: {lastUpdated}</small>
                </Card.Footer>
            </Card>

            {/* Displays death count */}
            <Card bg="danger" text={"white"} className="text-center" style={{margin: "10px"}}>     
                <Card.Body>
                <Card.Title>Deaths</Card.Title>
                {/* <Card.Text>{latest.deaths}</Card.Text> */}
                <NumberFormat value={latest.deaths} displayType={'text'} thousandSeparator={true} />
                </Card.Body>
                <Card.Footer>
                <small>Last updated: {lastUpdated}</small>
                </Card.Footer>
            </Card>

            {/* Displays recovered count */}
            <Card bg="success" text={"white"} className="text-center" style={{margin: "10px"}}>
                <Card.Body>
                <Card.Title>Recovered</Card.Title>
                {/* <Card.Text>{latest.recovered}</Card.Text> */}
                <NumberFormat value={latest.recovered} displayType={'text'} thousandSeparator={true} />
                </Card.Body>
                <Card.Footer>
                <small>Last updated: {lastUpdated}</small>
                </Card.Footer>
            </Card>
            </CardDeck>
            <br />

            {/* Displays search field */}
            <Form>
                <Form.Group controlId="formGroupSearch">
                    <Form.Control type="text" placeholder="Search a country" onChange={(e => setSearchCountries(e.target.value))} />
                </Form.Group>
            </Form>

            <Columns queries={queries}>{countries}</Columns>
        </div>
    );
}

export default About;