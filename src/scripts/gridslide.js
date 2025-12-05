  class ServicesCarousel {
    constructor() {
      this.viewport = document.querySelector('.carousel-viewport');
      this.slides = document.querySelector('.carousel-slides');
      this.items = document.querySelectorAll('.carousel-item');
      this.prevBtn = document.querySelector('.carousel-prev');
      this.nextBtn = document.querySelector('.carousel-next');
      
      this.totalSlides = 3; // Número real de slides (sin contar clones)
      this.currentIndex = this.totalSlides; // Empezar en los slides originales (no en los clones)
      
      this.isDragging = false;
      this.startPos = 0;
      this.currentTranslate = 0;
      this.prevTranslate = 0;
      this.animationID = 0;

      this.init();
    }

    init() {
      // Posicionar en el primer slide original (saltando los clones del inicio)
      this.setPositionByIndex(false);

      this.prevBtn?.addEventListener('click', () => this.prev());
      this.nextBtn?.addEventListener('click', () => this.next());

      this.viewport?.addEventListener('touchstart', (e) => this.touchStart(e));
      this.viewport?.addEventListener('touchend', () => this.touchEnd());
      this.viewport?.addEventListener('touchmove', (e) => this.touchMove(e));

      this.viewport?.addEventListener('mousedown', (e) => this.touchStart(e));
      this.viewport?.addEventListener('mouseup', () => this.touchEnd());
      this.viewport?.addEventListener('mouseleave', () => this.touchEnd());
      this.viewport?.addEventListener('mousemove', (e) => this.touchMove(e));

      this.viewport?.addEventListener('contextmenu', (e) => e.preventDefault());

      window.addEventListener('resize', () => this.updatePosition());
    }

    getPositionX(event) {
      return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    touchStart(event) {
      this.isDragging = true;
      this.startPos = this.getPositionX(event);
      this.animationID = requestAnimationFrame(() => this.animation());
      this.viewport?.classList.add('grabbing');
      this.slides?.classList.add('dragging');
    }

    touchMove(event) {
      if (this.isDragging) {
        const currentPosition = this.getPositionX(event);
        this.currentTranslate = this.prevTranslate + currentPosition - this.startPos;
      }
    }

    touchEnd() {
      this.isDragging = false;
      cancelAnimationFrame(this.animationID);
      this.viewport?.classList.remove('grabbing');
      this.slides?.classList.remove('dragging');

      const movedBy = this.currentTranslate - this.prevTranslate;

      if (movedBy < -100) {
        this.next();
      } else if (movedBy > 100) {
        this.prev();
      } else {
        this.setPositionByIndex();
      }
    }

    animation() {
      this.setSliderPosition();
      if (this.isDragging) {
        requestAnimationFrame(() => this.animation());
      }
    }

    setSliderPosition() {
      if (this.slides) {
        this.slides.style.transform = `translateX(${this.currentTranslate}px)`;
      }
    }

    setPositionByIndex(transition = true) {
      const itemWidth = this.items[0]?.offsetWidth + 30;
      this.currentTranslate = this.currentIndex * -itemWidth;
      this.prevTranslate = this.currentTranslate;
      
      if (!transition) {
        this.slides?.classList.add('no-transition');
      }
      
      this.setSliderPosition();
      
      if (!transition) {
        // Forzar reflow para que el cambio sin transición se aplique
        this.slides?.offsetHeight;
        this.slides?.classList.remove('no-transition');
      }
    }

    updatePosition() {
      this.setPositionByIndex(false);
    }

    next() {
      this.currentIndex++;
      this.setPositionByIndex();
      
      // Si llegamos al último clon, saltar instantáneamente al primer original
      if (this.currentIndex >= this.totalSlides * 2) {
        setTimeout(() => {
          this.currentIndex = this.totalSlides;
          this.setPositionByIndex(false);
        }, 500); // Esperar a que termine la transición
      }
    }

    prev() {
      this.currentIndex--;
      this.setPositionByIndex();
      
      // Si llegamos al primer clon, saltar instantáneamente al último original
      if (this.currentIndex < this.totalSlides) {
        setTimeout(() => {
          this.currentIndex = this.totalSlides * 2 - 1;
          this.setPositionByIndex(false);
        }, 500); // Esperar a que termine la transición
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ServicesCarousel());
  } else {
    new ServicesCarousel();
  }