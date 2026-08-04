// Dynamiczna baza produktów Nashi (symulacja mini bazy danych JSON)
// Zdjęcia pochodzą z Unsplash i imitują luksusowe kosmetyki w bursztynowych butelkach (jak Nashi)
const products = [
    {
        id: 1,
        name: "Nashi Argan Shampoo",
        category: "szampony",
        size: "200ml / 500ml",
        price: "od 85 zł",
        desc: "Klasyczny, głęboko nawilżający szampon do każdego rodzaju włosów. Delikatnie oczyszcza, nadaje blask i niezapomniany zapach.",
        img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=800&q=80",
        badge: "Bestseller"
    },
    {
        id: 2,
        name: "Nashi Argan Conditioner",
        category: "szampony",
        size: "200ml / 500ml",
        price: "od 95 zł",
        desc: "Kremowa odżywka rozplątująca. Natychmiastowo wygładza łuski włosa, ułatwia rozczesywanie i pozostawia pasma jedwabiście miękkie.",
        img: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=800&q=80",
        badge: ""
    },
    {
        id: 3,
        name: "Nashi Argan Oil",
        category: "olejki",
        size: "30ml / 100ml",
        price: "od 75 zł",
        desc: "Kultowy produkt marki. Olejek bez spłukiwania, który naprawia, odżywia i rozświetla włosy w jednym prostym geście.",
        img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80",
        badge: "Ikona Nashi"
    },
    {
        id: 4,
        name: "Nashi Deep Infusion",
        category: "szampony",
        size: "150ml",
        price: "125 zł",
        desc: "Głęboko regenerująca maska, która przywraca idealną strukturę nawet najbardziej zniszczonym i matowym włosom.",
        img: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=800&q=80",
        badge: "Głęboka Odnowa"
    },
    {
        id: 5,
        name: "Nashi Argan Body Scrub",
        category: "cialo",
        size: "300g",
        price: "145 zł",
        desc: "Złuszczający peeling do ciała z kryształkami soli morskiej i organicznymi olejami. Skóra po nim jest niesamowicie gładka.",
        img: "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&w=800&q=80",
        badge: "Nowość"
    },
    {
        id: 6,
        name: "Nashi Style Shaper",
        category: "olejki",
        size: "50ml",
        price: "80 zł",
        desc: "Pasta modelująca do kreatywnej stylizacji krótkich włosów. Zapewnia matowe wykończenie i naturalne, elastyczne utrwalenie.",
        img: "https://images.unsplash.com/photo-1615397323145-817684cb3229?auto=format&fit=crop&w=800&q=80",
        badge: ""
    }
];

// Pobieranie elementów DOM
const productGrid = document.getElementById('product-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('reservation-modal');
const closeModalBtn = document.getElementById('close-modal');
const modalProductName = document.getElementById('modal-product-name');
const hiddenProductName = document.getElementById('hidden-product-name');

// 1. Funkcja generująca HTML produktów
function renderProducts(category = 'all') {
    // Czyszczenie grida
    productGrid.innerHTML = '';
    
    // Filtrowanie z płynnym efektem (Fade in)
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(p => p.category === category);

    filteredProducts.forEach((product, index) => {
        // Tworzymy kartę produktu
        const card = document.createElement('div');
        card.className = 'product-card';
        // Lekkie opóźnienie animacji dla każdej karty
        card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
        card.style.opacity = '0';

        // Opcjonalny badge (Bestseller, Nowość itp.)
        const badgeHtml = product.badge 
            ? `<div class="product-badge">${product.badge}</div>` 
            : '';

        // Wstrzykiwanie zawartości
        card.innerHTML = `
            <div class="product-img-wrapper">
                ${badgeHtml}
                <img src="${product.img}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h4 class="product-title">${product.name}</h4>
                <span class="product-size">${product.size}</span>
                <p class="product-desc">${product.desc}</p>
                <div class="product-footer">
                    <span class="product-price">${product.price}</span>
                    <button class="btn-reserve" onclick="openModal('${product.name}')">Zarezerwuj</button>
                </div>
            </div>
        `;
        productGrid.appendChild(card);
    });
}

// 2. Obsługa filtrów (zakładek)
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Zdejmij klasę 'active' ze wszystkich przycisków
        filterBtns.forEach(b => b.classList.remove('active'));
        // Dodaj klasę 'active' do klikniętego
        e.target.classList.add('active');
        // Wywołaj renderowanie z odpowiednią kategorią
        renderProducts(e.target.dataset.filter);
    });
});

// 3. Logika okna modalnego (Rezerwacja)
window.openModal = function(productName) {
    // Aktualizacja tekstów w modalu
    modalProductName.textContent = productName;
    hiddenProductName.value = productName;
    
    // Pokaż modal i zablokuj przewijanie strony
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; 
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // odblokuj przewijanie
}

closeModalBtn.addEventListener('click', closeModal);

// Zamykanie modala po kliknięciu w rozmyte tło
modal.addEventListener('click', (e) => {
    if(e.target === modal) {
        closeModal();
    }
});

// 4. Inicjalizacja przy załadowaniu strony
document.addEventListener('DOMContentLoaded', () => {
    renderProducts('all');
    
    // Dodanie prostego keyframes dla płynnego ładowania do styli na żywo
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});
