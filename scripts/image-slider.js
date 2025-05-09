document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const galleryItems = card.querySelectorAll('.product-gallery-item');
        let currentIndex = 0;
        
        // เพิ่ม event listener สำหรับการ swipe
        let touchStartX = 0;
        let touchEndX = 0;
        
        card.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        card.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left
                    showNextImage();
                } else {
                    // Swipe right
                    showPreviousImage();
                }
            }
        }
        
        function showNextImage() {
            galleryItems[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % galleryItems.length;
            galleryItems[currentIndex].classList.add('active');
        }
        
        function showPreviousImage() {
            galleryItems[currentIndex].classList.remove('active');
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            galleryItems[currentIndex].classList.add('active');
        }
    });
}); 