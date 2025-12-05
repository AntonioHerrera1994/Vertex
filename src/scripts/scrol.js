  class FooterComponent {
    constructor() {
      this.scrollTopBtn = document.querySelector('.scroll-top');
      this.init();
    }

    init() {
      // Scroll to top functionality
      window.addEventListener('scroll', () => this.handleScroll());
      this.scrollTopBtn?.addEventListener('click', () => this.scrollToTop());
    }

    handleScroll() {
      if (window.scrollY > 300) {
        this.scrollTopBtn?.classList.add('visible');
      } else {
        this.scrollTopBtn?.classList.remove('visible');
      }
    }

    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new FooterComponent());
  } else {
    new FooterComponent();
  }