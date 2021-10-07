import React, { useState, useEffect } from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'
import { fetchCountries } from '../../api'
import styles from "./CountryPicker.module.css"
import Form from "react-bootstrap/Form";

const CountryPicker = ({ handleCountryChange }) => {
    const [countries, setCountries] = useState([]);
     const [searchCountries, setSearchCountries] = useState("");

    useEffect(() => {
        const fetchAPI = async () => {
            setCountries(await fetchCountries());
        };
        
        fetchAPI();
    }, []);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="">Global</option>
                {countries.map((country, i) => {
                    return (
                        <option key={i} value={country}>
                            {country}
                        </option>
                    );
                })}
            </NativeSelect>
        </FormControl>

            //  <Form>
            //     <Form.Group controlId="formGroupSearch">
            //         <Form.Control type="text" placeholder="Search a country" onChange={(e => handleCountryChange(e.target.value))}>
            //             {countries.map((country) => {
            //                 return searchCountries !== "" ? country.toLowerCase().includes(searchCountries.toLowerCase()) : country;
            //             })}
            //         </Form.Control>
            //     </Form.Group>
            // </Form> 
    )
}

export default CountryPicker;