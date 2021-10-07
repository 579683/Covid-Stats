import axios from "axios"

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
    let changeableurl = url;

    if(country) {
        changeableurl = `${url}/countries/${country}`
    }

    try {
        const {
            data: { confirmed, recovered, deaths, lastUpdate },
        } = await axios.get(changeableurl);

        const modifiedData = {
            confirmed,
            recovered,
            deaths,
            lastUpdate,
        };

        return modifiedData;
    }  catch(error) {
        return error;
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);

        const modifiedData = data.map((item) => ({
            confirmed: item.confirmed.total,
            deaths: item.deaths.total,
            date: item.reportDate,
        }));

        return modifiedData;
        //console.log(modifiedData)

    } catch (error) {
        return error;
    }
}

export const fetchCountries = async () => {
    try {
        const {
          data: { countries },
        } = await axios.get(`${url}/countries`);
    
        return countries.map((country) => country.name);
      } catch (error) {
        return error;
      }
};

// ------------------------------------------------------------------------------------------

// const url = "https://disease.sh/v3/covid-19";

// export const fetchData = async (country) => {
//     let changeableurl = url;

//     if(country) {
//         changeableurl = `${url}/countries/${country}`
//     }

//     try {
//         const {
//             data: { cases, recovered, deaths },
//         } = await axios.get(changeableurl);

//         const modifiedData = {
//             cases,
//             recovered,
//             deaths,
//         };

//         return modifiedData;
//     }  catch(error) {
//         return error;
//     }
// }

// export const fetchDailyData = async () => {
//     try {
//         const {
//             data: { cases, deaths, recovered }
//         } = await axios.get(`${url}/historical/all?lastdays=all`);

//         const modifiedData = {
//             cases,
//             deaths, 
//             recovered,
//         }

//         return modifiedData;
//         //console.log(modifiedData)

//     } catch (error) {
//         return error;
//     }
// }

// export const fetchCountries = async () => {
//     try {
//         const { data } = await axios.get(`${url}/countries`);
        
//         const modifiedData = data.map((item) => ({
//             country: item.country,
//         }));

//         //console.log(modifiedData)
//         return modifiedData;
        
//     } catch (error) {
//         return error;
//     }
// };