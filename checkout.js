$(document).ready(function () {

    let cart = JSON.parse(localStorage.getItem("smartCart")) || [];

    function updateCartCount() {
        let totalItems = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
        $(".navbar .badge").text(totalItems);
    }

    function loadCheckout() {

        let checkoutItems = $("#checkoutItems");
        checkoutItems.empty();

        if (!cart || cart.length === 0) {
            checkoutItems.html("<p>Your cart is empty.</p>");
            $("#checkoutTotal").text("₹0");
            updateCartCount();
            return;
        }

        let total = 0;

        cart.forEach(function (item) {

            let qty = item.qty || 1;
            let price = item.price || 0;

            let itemTotal = price * qty;
            total += itemTotal;

            checkoutItems.append(`
                <div class="checkout-item">
                    <span>${item.name} × ${qty}</span>
                    <span>₹${itemTotal.toLocaleString()}</span>
                </div>
            `);
        });

        $("#checkoutTotal").text("₹" + total.toLocaleString());
        updateCartCount();
    }

    $("#checkoutForm").submit(function (e) {
        e.preventDefault();

        let name = $("#checkoutName").val().trim();
        let phone = $("#checkoutPhone").val().trim();
        let address = $("#checkoutAddress").val().trim();
        let payment = $("#paymentMethod").val();

        let valid = true;

        $("#checkoutNameError").text("");
        $("#checkoutPhoneError").text("");
        $("#checkoutAddressError").text("");
        $("#paymentError").text("");

        if (name === "") {
            $("#checkoutNameError").text("Name is required");
            valid = false;
        }

        if (!/^\d{10}$/.test(phone)) {
            $("#checkoutPhoneError").text("Enter valid 10 digit mobile number");
            valid = false;
        }

        if (address.length < 10) {
            $("#checkoutAddressError").text("Address must be at least 10 characters");
            valid = false;
        }

        if (payment === "") {
            $("#paymentError").text("Select payment method");
            valid = false;
        }

        if (!cart || cart.length === 0) {
            alert("Cart is empty");
            valid = false;
        }

        if (valid) {
            localStorage.removeItem("smartCart");
            alert("Order placed successfully");
            window.location.href = "success.html";
        }
    });

    loadCheckout();
});