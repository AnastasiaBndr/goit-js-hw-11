import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { JSONPlaceholderAPI } from './jsonplaceholpder-api';

const refs = {
  button: document.querySelector('.submit-button'),
  gallery: document.querySelector('.gallery'),
  input: document.querySelector('.search-box'),
  loadMore: document.querySelector('.load-more-button'),
};

let lightbox;

const jsonplaceholderInstance = new JSONPlaceholderAPI();

refs.button.addEventListener('click', onClick);
refs.loadMore.addEventListener('click', handleLoadMoreButtonClick);

function onClick(evt) {
  jsonplaceholderInstance.page = 1;
  refs.gallery.innerHTML = '';
  var text = refs.input.value.trim();

  if (text === '') {
    refs.loadMore.classList.add('load-more-hidden');
    Notiflix.Notify.failure('You didn`t wrote anything(');
  } else {
    jsonplaceholderInstance.query = text;

    jsonplaceholderInstance
      .fetchImages()
      .then(cards => {
        refs.gallery.innerHTML = renderCard(cards.hits);
        if (refs.gallery.innerHTML === '') {
          Notiflix.Notify.failure('No images found(');
          refs.loadMore.classList.add('load-more-hidden');
        } else {
          Notiflix.Notify.success(`We found ${cards.totalHits} images~`);
          const { limit, page } = jsonplaceholderInstance;
          if(cards.totalHits/limit <= page){
            refs.loadMore.classList.add('load-more-hidden');
          }else{
            refs.loadMore.classList.remove('load-more-hidden');
          }
          lightbox = new SimpleLightbox('.gallery a', {
            captions: true,
            captionsData: 'alt',
            captionSelector: 'img',
            captionPosition: 'outside',
            CaptionDelay: '150ms',
            scaleImageToRatio: true,
          });
          
        }
      })
      .catch(err => console.log);
  }
}

function renderCard(cards) {
  return cards
    .map(
      card =>
        `<div class="photo-card">
    <a href="${card.largeImageURL}" onclick="return false" loading="lazy">
    <img src='${card.webformatURL}' alt='${card.tags}'>
      </a>
    <div class="info">
      <p class="info-item">
        ${card.likes} ❤︎
      </p>
      <p class="info-item">
        ${card.views} 👁
      </p>
      <p class="info-item">
        ${card.comments} 🗨
      </p>
      <p class="info-item">
        ${card.downloads} ⬇
      </p>
    </div>
  </div>`
    )
    .join('');
}

function handleLoadMoreButtonClick() {
  jsonplaceholderInstance.page += 1;

  const { limit, page } = jsonplaceholderInstance;

  jsonplaceholderInstance
    .fetchImages()
    .then(cards => {
      refs.gallery.insertAdjacentHTML('beforeend', renderCard(cards.hits));
      console.log(`Total hits = ${cards.totalHits}\n limit = ${limit} \n page = ${page}`);
      if (limit * page >= cards.totalHits || cards.totalHits === 0) {
        refs.loadMore.classList.add('load-more-hidden');
        Notiflix.Notify.info('You`ve seen all we prepared ^_^');
      }
      lightbox.refresh();
    })
    .catch(err => console.log);
}
