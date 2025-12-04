  class HeroCarousel {
    constructor() {
      this.currentSlide = 0;
      this.slides = document.querySelectorAll('.slide');
      this.indicators = document.querySelectorAll('.indicator');
      this.autoplayInterval = null;
      this.autoplayDelay = 5000; // 5 segundos

      this.init();
    }

    init() {
      // Navegación
      document.querySelector('.prev')?.addEventListener('click', () => this.prevSlide());
      document.querySelector('.next')?.addEventListener('click', () => this.nextSlide());

      // Indicadores
      this.indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => this.goToSlide(index));
      });

      // Autoplay
      this.startAutoplay();

      // Pausar en hover
      const carousel = document.querySelector('.carousel-container');
      carousel?.addEventListener('mouseenter', () => this.stopAutoplay());
      carousel?.addEventListener('mouseleave', () => this.startAutoplay());

      // Keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') this.prevSlide();
        if (e.key === 'ArrowRight') this.nextSlide();
      });
    }

    goToSlide(index) {
      this.slides[this.currentSlide].classList.remove('active');
      this.indicators[this.currentSlide].classList.remove('active');

      this.currentSlide = index;

      this.slides[this.currentSlide].classList.add('active');
      this.indicators[this.currentSlide].classList.add('active');
    }

    nextSlide() {
      const next = (this.currentSlide + 1) % this.slides.length;
      this.goToSlide(next);
    }

    prevSlide() {
      const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
      this.goToSlide(prev);
    }

    startAutoplay() {
      this.autoplayInterval = setInterval(() => this.nextSlide(), this.autoplayDelay);
    }

    stopAutoplay() {
      if (this.autoplayInterval) {
        clearInterval(this.autoplayInterval);
        this.autoplayInterval = null;
      }
    }
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new HeroCarousel());
  } else {
    new HeroCarousel();
  }