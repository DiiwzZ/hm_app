// กำหนดค่าเริ่มต้นสำหรับ active tab
let currentSection = 'Women';

document.addEventListener('DOMContentLoaded', () => {
    // จัดการ navbar
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // ถ้าเป็นลิงก์ภายใน (#) ให้ป้องกันการ reload หน้า
            if (item.getAttribute('href') === '#') {
                e.preventDefault();
            }
            
            // ลบ active state จากทุกปุ่ม
            navItems.forEach(navItem => navItem.classList.remove('active'));
            
            // เพิ่ม active state ให้ปุ่มที่กด
            item.classList.add('active');
        });
    });

    // กำหนด active state ตามหน้าปัจจุบัน
    const currentPath = window.location.pathname;
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && (
            currentPath.endsWith(href) || 
            (currentPath === '/' && href === 'index.html') ||
            (currentPath.endsWith('index.html') && href === 'index.html') ||
            (currentPath.endsWith('search.html') && href === 'search.html')
        )) {
            item.classList.add('active');
        }
    });

    // จัดการ Category Tabs
    const categoryTabs = document.querySelectorAll('.tab-item');
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // จัดการ Promo Banner
    const promoBanner = document.querySelector('.promo-banner');
    const promoToggle = document.querySelector('.promo-toggle');

    if (promoToggle && promoBanner) {
        const isCollapsed = localStorage.getItem('promoBannerCollapsed') === 'true';
        if (isCollapsed) {
            promoBanner.classList.add('collapsed');
        }

        promoToggle.addEventListener('click', () => {
            promoBanner.classList.toggle('collapsed');
            localStorage.setItem(
                'promoBannerCollapsed', 
                promoBanner.classList.contains('collapsed')
            );
        });
    }
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