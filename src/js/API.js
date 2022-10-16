import axios from "axios";
const URL = 'https://pixabay.com/api/';
const key = '30502346-d120979d6222d217ab4c63b0e';

export async function getImages(text, page) {
    try {
   return response = await axios.get(`${URL}?key=${key}&q=${text}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`);
       }
  
  catch (error) {
    console.error(error);
  }
}