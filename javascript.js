let cart = [];


function updateCartIcon() {
    const cartIcon = document.getElementById('cart-icon');
    cartIcon.innerText = cart.length;
}


function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    updateCartIcon();

    localStorage.setItem('cart', JSON.stringify(cart));
}


function displayCartPage() {
    const cartPage = document.getElementById('cart-page');
    cartPage.innerHTML = ''; 

    cart.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('cart-item');
        productItem.innerHTML = `
            <p>${product.name}</p>
            <p>${product.price}</p>
        `;
        cartPage.appendChild(productItem);
    });
}

const savedCart = localStorage.getItem('cart');
cart = savedCart ? JSON.parse(savedCart) : [];

const cartLink = document.getElementById('cart-link');
cartLink.addEventListener('click', () => {
    displayCartPage();
});

const addToCartButtons = document.querySelectorAll('.product button');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const productContainer = button.parentElement;
        const productName = productContainer.querySelector('h3').innerText;
        const productPrice = parseFloat(productContainer.querySelector('p').innerText.slice(1));
        addToCart(productName, productPrice);
    });
});


const languageSelector = document.getElementById('language-selector');
languageSelector.addEventListener('change', function() {
    const selectedLanguage = languageSelector.value;

    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        switch (selectedLanguage) {
            case 'ro':
                link.textContent = 'Listă de dorințe';
                break;
            case 'ru':
                link.textContent = 'Список желаний';
                break;
            default:
                link.textContent = 'Wishlist';
                break;
        }
    });

});

function filterByCategory(category) {
    const products = document.querySelectorAll('.product');
    
    products.forEach(product => {
        const categoryName = product.getAttribute('data-category');
        if (categoryName === category || category === 'all') {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}
function resetFilter() {
    const products = document.querySelectorAll('.product');
    
    products.forEach(product => {
        product.style.display = 'block';
    });
}

