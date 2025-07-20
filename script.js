// Simple scroll fade-in
window.addEventListener('scroll', () => {
    document.querySelectorAll('section').forEach(section => {
        const rect = section.getBoundingClientRect();
        if(rect.top < window.innerHeight - 50) {
            section.classList.add('visible');
        }
    });
});
