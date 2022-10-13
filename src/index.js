import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";
import axios from "axios";

const searchField = document.querySelector("input[name='searchQuery']")
const searchButton = document.querySelector("button[type='submit']")
const gallery = document.querySelector(".gallery")

searchButton.addEventListener("click", function(event) {
    console.log(searchField.value)
    event.preventDefault()
    getImages(searchField.value)
})


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
      const response = await axios.get(`https://pixabay.com/api/?key=30502346-d120979d6222d217ab4c63b0e&q=${text}&image_type=photo&orientation=horizontal&safesearch=true`);
      console.log(response.data.hits);
      for (hit of response.data.hits) {
     gallery.insertAdjacentHTML('beforeend',
       `<div class="photo-card">
  <img src="${hit.previewURL}" alt="" loading="lazy" />
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
</div>`
     )
      }
    
    } catch (error) {
      console.error(error);
    }
  }