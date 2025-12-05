 class FAQComponent {
    constructor() {
      this.tabButtons = document.querySelectorAll('.tab-button');
      this.tabPanels = document.querySelectorAll('.tab-panel');
      this.accordionItems = document.querySelectorAll('.accordion-item');
      
      this.init();
    }

    init() {
      // Tab switching
      this.tabButtons.forEach(button => {
        button.addEventListener('click', () => this.switchTab(button));
      });

      // Accordion toggle
      this.accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header?.addEventListener('click', () => this.toggleAccordion(item));
      });
    }

    switchTab(clickedButton) {
      const targetTab = clickedButton.dataset.tab;

      // Update active tab button
      this.tabButtons.forEach(btn => btn.classList.remove('active'));
      clickedButton.classList.add('active');

      // Update active panel
      this.tabPanels.forEach(panel => {
        if (panel.dataset.panel === targetTab) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });

      // Close all accordions when switching tabs
      this.accordionItems.forEach(item => item.classList.remove('active'));
    }

    toggleAccordion(item) {
      const isActive = item.classList.contains('active');
      
      // Close all accordions in the current panel
      const currentPanel = item.closest('.tab-panel');
      currentPanel?.querySelectorAll('.accordion-item').forEach(accItem => {
        accItem.classList.remove('active');
      });

      // Toggle clicked accordion
      if (!isActive) {
        item.classList.add('active');
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new FAQComponent());
  } else {
    new FAQComponent();
  }