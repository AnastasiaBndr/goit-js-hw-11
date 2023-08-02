import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = 'api/?key=38590711-cd4e1138b2603dfebaf6d7de9';
const URL = 'https://pixabay.com/';

const refs = {
  button: document.querySelector('.submit-button'),
  gallery: document.querySelector('.gallery'),
  input: document.querySelector('.search-box'),
};

function fetchImages(pages) {
  return axios
    .get(URL + API_KEY + pages)
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

refs.button.addEventListener('click', onClick);

function onClick(evt) {
  refs.gallery.innerHTML = '';
  var text = refs.input.value;

  const pages = '&page=';
  const totalHits = 500;
  const perpage = 20;

  for (var i = 1; i < totalHits / perpage; i++) {
    fetchImages(pages + i).then(cards => {
      for (let i = 0; i < cards.hits.length; i++) {
        if (cards.hits[i].tags.includes(text)) {
          refs.gallery.insertAdjacentHTML(
            'beforeend',
            `${renderCard(cards.hits[i])}`
          );
        }
      }
    });
  }
}

function renderCard(card) {
  return `<div class="photo-card">
  <figure style="background-image: url('${card.webformatURL}');">
  </figure>
    <div class="info">
      <p class="info-item">
        <b>Likes: </b>${card.likes}
      </p>
      <p class="info-item">
        <b>Views: </b>${card.views}
      </p>
      <p class="info-item">
        <b>Comments: </b>${card.comments}
      </p>
      <p class="info-item">
        <b>Downloads: </b>${card.downloads}
      </p>
    </div>
  </div>`;
}
