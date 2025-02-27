// กำหนดค่าเริ่มต้นสำหรับ active tab
let currentSection = 'Women';

// จัดการ Bottom Navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const navText = item.querySelector('span').textContent.trim();
        
        // ถ้าเป็นปุ่ม Home ให้ไปที่หน้า Women
        if (navText === 'Home') {
            updateActiveStates('Women');
        }
        // สำหรับปุ่มอื่นๆ
        else {
            document.querySelectorAll('.nav-item').forEach(i => {
                i.classList.remove('active');
            });
            item.classList.add('active');
        }
    });
});

// จัดการ Category Tabs
document.querySelectorAll('.tab-item').forEach(tab => {
    tab.addEventListener('click', (e) => {
        e.preventDefault();
        const tabText = tab.textContent.trim();
        updateActiveStates(tabText);
    });
});

// ฟังก์ชันสำหรับอัพเดท active states
function updateActiveStates(section) {
    currentSection = section;
    
    // อัพเดท tabs
    document.querySelectorAll('.tab-item').forEach(tab => {
        if (tab.textContent.trim() === section) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // อัพเดท bottom nav
    document.querySelectorAll('.nav-item').forEach(item => {
        const navText = item.querySelector('span').textContent.trim();
        // ถ้าเป็นปุ่ม Home และ section เป็น Women
        if ((navText === 'Home' && section === 'Women')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // อัพเดทเนื้อหาตามหมวดหมู่
    updateContent(section);
}

// ฟังก์ชันสำหรับอัพเดทเนื้อหา
function updateContent(section) {
    // จัดการ banner โปรโมชั่น
    const promoBanner = document.querySelector('.promo-banner');
    if (promoBanner) {
        if (section === 'HOME') {
            promoBanner.style.display = 'none';
        } else {
            promoBanner.style.display = 'block';
        }
    }

    // อัพเดท URL
    const sectionUrls = {
        'Women': '/women',
        'Men': '/men',
        'Baby': '/baby',
        'Kids': '/kids',
        'Sport': '/sport',
        'HOME': '/home'
    };
    
    history.pushState({section: section}, '', sectionUrls[section]);
}

// จัดการกับการกด back/forward ของเบราว์เซอร์
window.addEventListener('popstate', (event) => {
    if (event.state && event.state.section) {
        updateActiveStates(event.state.section);
    }
});

// จัดการการย่อ/ขยาย Promotion Banner
document.addEventListener('DOMContentLoaded', () => {
    const promoBanner = document.querySelector('.promo-banner');
    const promoToggle = document.querySelector('.promo-toggle');

    if (promoToggle && promoBanner) {
        // ตรวจสอบสถานะที่บันทึกไว้
        const isCollapsed = localStorage.getItem('promoBannerCollapsed') === 'true';
        if (isCollapsed) {
            promoBanner.classList.add('collapsed');
        }

        promoToggle.addEventListener('click', () => {
            promoBanner.classList.toggle('collapsed');
            // บันทึกสถานะ
            localStorage.setItem(
                'promoBannerCollapsed', 
                promoBanner.classList.contains('collapsed')
            );
        });
    }
}); 