import axios from 'axios';
import Notiflix from 'notiflix';

export class JSONPlaceholderAPI {
  
    #BASE_URL = 'https://pixabay.com/api/?';
    #API_KEY = '38590711-cd4e1138b2603dfebaf6d7de9';

  limit = 40;
  page=1;
  query = null;

  baseSearchParams = {
    key: this.#API_KEY,
    per_page: this.limit, 
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  }

  fetchImages() {

    const searchParams=new URLSearchParams({
        ...this.baseSearchParams,
        q: this.query,
        page: this.page,
        
    });

    console.log(searchParams.toString());
    return axios
      .get(`${this.#BASE_URL + searchParams.toString()}`)
      .then(resp => {
        return resp.data;
      })
      .catch(err =>
        Notiflix.Report.failure(
          'Server Error!',
          'There is something wrong..',
          'Okaaay'
        )
      );
  }
}