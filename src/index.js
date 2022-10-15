import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";
import axios from "axios";

const searchField = document.querySelector("input[name='searchQuery']")
const searchButton = document.querySelector("button[type='submit']")
const gallerys = document.querySelector(".gallery")

searchButton.addEventListener("click", function(event) {
    event.preventDefault()
    getImages(searchField.value)
})


const lightbox = new SimpleLightbox(".gallery a", {
  captionDelay: 250,
  captionSelector: "img",
  captionType: "attr",
  captionsData: "alt",
  captionPosition: "bottom",
  captionClass: "",
  
});

//const { height: cardHeight } = document
//  .querySelector(".gallery")
//  .firstElementChild.getBoundingClientRect();
//
//window.scrollBy({
//  top: cardHeight * 2,
//  behavior: "smooth",
//});



  async function getImages(text) {
    console.log(text)
    try {
      const response = await axios.get(`https://pixabay.com/api/?key=30502346-d120979d6222d217ab4c63b0e&q=${text}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`);
      console.log(response.data.hits);
      Notiflix.Notify.success(`Hooray! We found ${response.data.totalHits} images.`)
      gallerys.innerHTML = "";
      for (hit of response.data.hits) {
           gallerys.insertAdjacentHTML('beforeend',
       `<a href="${hit.largeImageURL}"><div class="photo-card">
  <img src="${hit.webformatURL}" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Like</b>${hit.likes}
    </p>
    <p class="info-item">
      <b>Views</b>${hit.views}
    </p>
    <p class="info-item">
      <b>Comments</b>${hit.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${hit.downloads}
    </p>
  </div>
</div></a>`
     )
      }
    
    } catch (error) {
      console.error(error);
    }
  }