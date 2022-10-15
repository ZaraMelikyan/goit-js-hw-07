import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const itemsContainerRef = document.querySelector('.gallery');
const itemMarkup = createGalleryItemMarkup(galleryItems);
itemsContainerRef.insertAdjacentHTML('beforeend', itemMarkup);

function createGalleryItemMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt= "${description}"
    />
  </a>
</div> `;
    })
    .join('');
}

itemsContainerRef.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(event) {
  event.preventDefault();

  if (!event.target.classList.contains('gallery__image')) {
    return;
  }

  const originalImg = event.target.dataset.source;

  showModal(originalImg);
}

function showModal(imgUrl) {
  const modal = basicLightbox.create(`
    <img src="${imgUrl}" width="800" height="600">
`);

  modal.show(() => window.addEventListener('keydown', closeModalByEsc));

  function closeModalByEsc(event) {
    if (event.code === 'Escape') {
      modal.close(() => window.removeEventListener('keydown', closeModalByEsc));
    }
  }
}
