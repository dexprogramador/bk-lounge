let index = 0;
const carousel = document.getElementById("carousel");
const slides = document.querySelectorAll(".slide");

// Atualiza a posição do slide
function updateSlider() {
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

// Avança pro próximo
document.querySelector(".carousel-btn.next").onclick = () => {
  index = (index + 1) % slides.length;
  updateSlider();
};

// Volta pro anterior
document.querySelector(".carousel-btn.prev").onclick = () => {
  index = (index - 1 + slides.length) % slides.length;
  updateSlider();
};

// Avança automaticamente a cada 5 segundos
setInterval(() => {
  index = (index + 1) % slides.length;
  updateSlider();
}, 5000);
