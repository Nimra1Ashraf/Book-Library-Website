const books = [
    { id: 1, title: "The Alchemist", category: "Fiction", price: 15 },
    { id: 2, title: "Clean Code", category: "Programming", price: 40 },
    { id: 3, title: "Atomic Habits", category: "Self-Help", price: 20 },
    { id: 4, title: "Harry Potter", category: "Fantasy", price: 25 },
    { id: 5, title: "Deep Work", category: "Productivity", price: 18 }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const booksGrid = document.getElementById("booksGrid");
const cartSidebar = document.getElementById("cartSidebar");
const cartBtn = document.getElementById("cartBtn");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const searchInput = document.getElementById("searchInput");

function renderBooks(data) {
    booksGrid.innerHTML = "";
    data.forEach(book => {
        booksGrid.innerHTML += `
            <div class="book-card">
                <div class="book-title">${book.title}</div>
                <div class="book-category">${book.category}</div>
                <div class="book-price">$${book.price}</div>
                <button class="add-btn" onclick="addToCart(${book.id})">Add to Cart</button>
            </div>
        `;
    });
}

function renderCategories() {
    const categories = [...new Set(books.map(b => b.category))];
    const container = document.getElementById("categories");
    container.innerHTML = `<button class="category-btn active" onclick="renderBooks(books)">All</button>`;
    
    categories.forEach(cat => {
        container.innerHTML += `
            <button class="category-btn" onclick="filterCategory('${cat}')">${cat}</button>
        `;
    });
}

function filterCategory(category) {
    renderBooks(books.filter(b => b.category === category));
}

searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    renderBooks(
        books.filter(b => b.title.toLowerCase().includes(value))
    );
});

function addToCart(id) {
    const book = books.find(b => b.id === id);
    const item = cart.find(i => i.id === id);

    if (item) {
        item.qty++;
    } else {
        cart.push({ ...book, qty: 1 });
    }

    updateCart();
}

function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;

        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.title} x${item.qty}</span>
                <span>$${item.price * item.qty}</span>
            </div>
        `;
    });

    cartTotal.textContent = total;
    cartCount.textContent = cart.length;

    localStorage.setItem("cart", JSON.stringify(cart));
}

cartBtn.addEventListener("click", () => {
    cartSidebar.classList.toggle("active");
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
    if (cart.length === 0) return alert("Cart is empty!");

    alert("Purchase successful!");
    localStorage.removeItem("cart");
    cart = [];
    updateCart();
});

renderBooks(books);
renderCategories();
updateCart();
