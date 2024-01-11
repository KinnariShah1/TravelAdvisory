import axios from 'axios';

// const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary'

export const getPlacesData = async (type, sw, ne) => {
    try {
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                tr_latitude: ne.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
              },
              headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_TRAVEL_API_KEY,
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
              }
        });

        return data;
    } catch (error) {
        console.log(error)
    }
}

export const getWeatherData = async (lat, lng) => {
    try {
        const { data } = await axios.get('https://forecast9.p.rapidapi.com/rapidapi/forecast/${lat}/${lng}/hourly/',  
        {headers: {
            'X-RapidAPI-Key': 'feccb8ca16msh915773dcd972f73p183292jsn46cd60c88a84',
            'X-RapidAPI-Host': 'forecast9.p.rapidapi.com'
          }});

          return data;
    } catch (error) {
        console.log(error);
    }
}
