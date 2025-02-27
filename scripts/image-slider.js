document.addEventListener('DOMContentLoaded', () => {
    const galleries = document.querySelectorAll('.product-gallery-items');
    
    galleries.forEach(gallery => {
        const items = gallery.querySelectorAll('.product-gallery-item');
        let currentIndex = 0;
        let startX = 0;

        // Touch events
        gallery.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        gallery.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = endX - startX;
            
            if (Math.abs(diff) > 30) {
                if (diff > 0) {
                    goToPrevious();
                } else {
                    goToNext();
                }
            }
        });

        function goToNext() {
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % items.length;
            items[currentIndex].classList.add('active');
        }

        function goToPrevious() {
            items[currentIndex].classList.remove('active');
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            items[currentIndex].classList.add('active');
        }
    });
}); 