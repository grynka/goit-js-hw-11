import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";
import { getImages } from "./js/API";
import markup from './js/templates/markup.hbs'



const searchField = document.querySelector("input[name='searchQuery']")
const searchButton = document.querySelector("button[type='submit']")
const gallerys = document.querySelector(".gallery")

searchButton.addEventListener("click", function(event) {
  gallerys.innerHTML = "";
    event.preventDefault()
    getImages(searchField.value).then(data =>   {
      Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`)
      gallerys.insertAdjacentHTML('beforeend', markup(response.data.hits));
      const { height: cardHeight } = gallerys.firstElementChild.getBoundingClientRect();
window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});

      })
})


const lightbox = new SimpleLightbox(".gallery a", {
  captionDelay: 250,
  captionSelector: "img",
  captionType: "attr",
  captionsData: "alt",
  captionPosition: "bottom",
  captionClass: "",
  
});




  