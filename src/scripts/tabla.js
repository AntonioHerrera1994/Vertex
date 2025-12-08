  class ServiceTabs {
    constructor() {
      this.sidebarItems = document.querySelectorAll('.sidebar-item');
      this.panels = document.querySelectorAll('.service-panel');
      
      this.init();
    }

    init() {
      this.sidebarItems.forEach(item => {
        item.addEventListener('click', () => this.switchService(item));
      });
    }

    switchService(clickedItem) {
      const serviceId = clickedItem.dataset.service;

      // Update active sidebar item
      this.sidebarItems.forEach(item => item.classList.remove('active'));
      clickedItem.classList.add('active');

      // Update active panel
      this.panels.forEach(panel => {
        if (panel.dataset.panel === serviceId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });

      // Scroll to top of content
      const serviceContent = document.querySelector('.service-content');
      if (serviceContent) {
        serviceContent.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new ServiceTabs());
  } else {
    new ServiceTabs();
  }