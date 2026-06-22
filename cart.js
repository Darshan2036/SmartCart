$(document).ready(function () {

    let cart = JSON.parse(localStorage.getItem("smartCart")) || [];

    function saveCart() {
        localStorage.setItem("smartCart", JSON.stringify(cart));
    }

    function updateCartCount() {
        let totalItems = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
        $(".navbar .badge").text(totalItems);
    }

    function renderCart() {

        let cartItems = $("#cartItems");
        cartItems.empty();

        if (cart.length === 0) {
            cartItems.html(`
                <div class="empty-cart">
                    <h4>Your cart is empty</h4>
                    <p>Add products from the products page.</p>
                    <a href="products.html" class="btn btn-warning">Shop Now</a>
                </div>
            `);

            $("#subtotal").text("₹0");
            $("#totalAmount").text("₹0");

            updateCartCount();
            return;
        }

        let subtotal = 0;

        cart.forEach((item, index) => {

            let qty = item.qty || 1;
            let price = item.price || 0;

            let itemTotal = price * qty;
            subtotal += itemTotal;

            cartItems.append(`
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">

                    <div class="cart-info">
                        <h5>${item.name}</h5>
                        <p class="price">₹${price.toLocaleString()}</p>
                    </div>

                    <div class="qty-box">
                        <button class="decrease" data-index="${index}">-</button>
                        <span>${qty}</span>
                        <button class="increase" data-index="${index}">+</button>
                    </div>

                    <button class="btn btn-danger btn-sm remove-item" data-index="${index}">
                        Remove
                    </button>
                </div>
            `);
        });

        $("#subtotal").text("₹" + subtotal.toLocaleString());
        $("#totalAmount").text("₹" + subtotal.toLocaleString());

        updateCartCount();
    }

    $(document).on("click", ".increase", function () {
        let index = $(this).data("index");
        cart[index].qty++;
        saveCart();
        renderCart();
    });

    $(document).on("click", ".decrease", function () {
        let index = $(this).data("index");

        if (cart[index].qty > 1) {
            cart[index].qty--;
        } else {
            cart.splice(index, 1);
        }

        saveCart();
        renderCart();
    });

    $(document).on("click", ".remove-item", function () {
        let index = $(this).data("index");
        cart.splice(index, 1);
        saveCart();
        renderCart();
    });

    $("#clearCart").click(function () {
        cart = [];
        saveCart();
        renderCart();
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $("#backToTop").fadeIn();
        } else {
            $("#backToTop").fadeOut();
        }
    });

    $("#backToTop").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 600);
    });

    renderCart();
});