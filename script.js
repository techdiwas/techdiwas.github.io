// Throttle function for better performance
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func.apply(this, args);
        }
    };
}

// Simple scroll fade-in with throttling
const handleScroll = throttle(() => {
    const sections = document.querySelectorAll('section');
    const windowHeight = window.innerHeight;
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if(rect.top < windowHeight - 50) {
            section.classList.add('visible');
        }
    });
}, 100);

window.addEventListener('scroll', handleScroll, { passive: true });
// Trigger on load to handle initial viewport
handleScroll();
