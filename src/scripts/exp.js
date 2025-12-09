const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};

const animateBars = (entries) => {  // <-- Quita ": IntersectionObserverEntry[]"
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.progress-fill');
      fills.forEach((fill) => {  // <-- Quita ": Element"
        fill.style.width = '0%';
        setTimeout(() => {
          const width = fill.getAttribute('data-width');
          fill.style.width = width;
        }, 100);
      });
    }
  });
};

const observer = new IntersectionObserver(animateBars, observerOptions);

const expertiseSection = document.querySelector('.expertise-section');
if (expertiseSection) {
  observer.observe(expertiseSection);
}