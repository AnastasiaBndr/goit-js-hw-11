import axios from 'axios';
import Notiflix from 'notiflix';

export class JSONPlaceholderAPI {
  
    #BASE_URL = 'https://pixabay.com/';
    #API_KEY = 'api/?key=38590711-cd4e1138b2603dfebaf6d7de9';

  #limit = 10;
  page=1;

  getLimit(){
    return this.#limit;
  }

  fetchImages() {
    return axios
      .get(`${this.#BASE_URL + this.#API_KEY}&per_page=${this.#limit}&page=${this.page}`)
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