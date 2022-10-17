import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";
import { getImages } from "./js/API";
import markup from "./js/templates/markup.hbs"

const searchField = document.querySelector("input[name='searchQuery']")
const searchButton = document.querySelector("button[type='submit']")
const gallerys = document.querySelector(".gallery")
const loadMore = document.querySelector(".load-more")
const lightbox = new SimpleLightbox(".gallery a");
let page;

searchButton.addEventListener("click", function(event) {
  page = 1;
  gallerys.innerHTML = "";
    event.preventDefault()
    getImages(searchField.value, page).then(data =>   {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
      gallerys.insertAdjacentHTML('beforeend', markup(data.hits));
      lightbox.refresh();
      const { height: cardHeight } = gallerys
      .firstElementChild.getBoundingClientRect();
      window.scrollBy({
          top: cardHeight * 2,
            behavior: "smooth",
          });
      })
      loadMore.removeAttribute('hidden');

    })

loadMore.addEventListener("click", onLoad)

function onLoad() {
 page += 1
  getImages(searchField.value, page).then(data =>   {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`)
    gallerys.insertAdjacentHTML('beforeend', markup(data.hits));
    lightbox.refresh();
    if(data.totalHits/40 <= page) {
      Notiflix.Notify.success("We're sorry, but you've reached the end of search results.")
      loadMore.setAttribute('hidden', true)
    }
})

}
