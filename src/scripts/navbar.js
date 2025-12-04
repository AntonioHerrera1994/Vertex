 class Navigation {
    constructor() {
      this.navbar = document.querySelector('.navbar');
      this.hamburger = document.querySelector('.hamburger');
      this.sidebar = document.querySelector('.sidebar');
      this.overlay = document.querySelector('.sidebar-overlay');
      this.closeBtn = document.querySelector('.close-btn');
      this.scrollThreshold = 50;
      
      this.init();
    }

    init() {
      // Scroll detection
      this.handleScroll();
      window.addEventListener('scroll', () => this.handleScroll());

      // Mobile menu
      this.hamburger?.addEventListener('click', () => this.toggleMenu());
      this.closeBtn?.addEventListener('click', () => this.closeMenu());
      this.overlay?.addEventListener('click', () => this.closeMenu());

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.sidebar?.classList.contains('active')) {
          this.closeMenu();
        }
      });
    }

    handleScroll() {
      if (window.scrollY > this.scrollThreshold) {
        this.navbar?.classList.add('scrolled');
      } else {
        this.navbar?.classList.remove('scrolled');
      }
    }

    toggleMenu() {
      this.hamburger?.classList.toggle('active');
      this.sidebar?.classList.toggle('active');
      this.overlay?.classList.toggle('active');
      document.body.style.overflow = this.sidebar?.classList.contains('active') ? 'hidden' : '';
    }

    closeMenu() {
      this.hamburger?.classList.remove('active');
      this.sidebar?.classList.remove('active');
      this.overlay?.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new Navigation());
  } else {
    new Navigation();
  }