import axios from 'axios'

export const baseUrl = 'https://bayut.p.rapidapi.com'

// url: 'https://bayut.p.rapidapi.com/auto-complete'

export const fetchApi = async (url) => {
   const { data } = await axios.get((url), {
      headers: {
         'X-RapidAPI-Key': `${process.env.RAPID_API_KEY}`,
         'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
      }
   });
   return data;
}