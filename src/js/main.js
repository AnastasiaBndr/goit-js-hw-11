import { JSONPlaceholderAPI } from './jsonplaceholpder-api';

const refs = {
  button: document.querySelector('.submit-button'),
  gallery: document.querySelector('.gallery'),
  input: document.querySelector('.search-box'),
  loadMore: document.querySelector('.load-more-button'),
};

const jsonplaceholderInstance = new JSONPlaceholderAPI();

refs.button.addEventListener('click', onClick);
refs.loadMore.addEventListener('click', handleLoadMoreButtonClick);

const POST_COUNT=500;

function onClick(evt) {
  jsonplaceholderInstance.page=1;
  refs.gallery.innerHTML = '';
  var text = refs.input.value;

  jsonplaceholderInstance
    .fetchImages()
    .then(cards => {refs.gallery.innerHTML = renderCard(cards.hits);
    refs.loadMore.classList.remove("load-more-hidden")})
    .catch(err => console.log);
}

function renderCard(cards) {
  return cards
    .map(
      card =>
        `<div class="photo-card">
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
  </div>`
    )
    .join('');
}

function handleLoadMoreButtonClick (){

    jsonplaceholderInstance.page+=1;
    if(jsonplaceholderInstance.getLimit()*jsonplaceholderInstance.page>=POST_COUNT){
      refs.loadMore.classList.add("load-more-hidden")
    }

    jsonplaceholderInstance
    .fetchImages()
    .then(cards => {refs.gallery.insertAdjacentHTML("beforeend",renderCard(cards.hits));})
    .catch(err => console.log);
}
