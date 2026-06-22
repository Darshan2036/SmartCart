$(document).ready(function () {

    let cart = JSON.parse(localStorage.getItem("smartCart")) || [];

    function saveCart() {
        localStorage.setItem("smartCart", JSON.stringify(cart));
    }

    function updateCartCount() {
        let totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        $(".navbar .badge").text(totalItems);
    }

    $(".product-card button").click(function () {

        let card = $(this).closest(".product-card");

        let name = card.find("h5").text().trim();

        let priceText = card.find(".price").text()
            .replace("₹", "")
            .replace(/,/g, "")
            .trim();

        let price = Number(priceText);
        let image = card.find("img").attr("src");

        let existingProduct = cart.find(item => item.name === name);

        if (existingProduct) {
            existingProduct.qty++;
        } else {
            cart.push({
                name: name,
                price: price,
                image: image,
                qty: 1
            });
        }

        saveCart();
        updateCartCount();

        let btn = $(this);
        btn.text("Added");
        btn.removeClass("btn-warning").addClass("btn-success");

        setTimeout(() => {
            btn.text("Add to Cart");
            btn.removeClass("btn-success").addClass("btn-warning");
        }, 1000);
    });

    function filterProducts() {

        let searchValue = $("#productSearch").val().toLowerCase();
        let selectedCategory = $("#categoryFilter").val();

        $(".product-item").each(function () {

            let name = ($(this).data("name") || "").toLowerCase();
            let category = $(this).data("category");

            let searchMatch = name.includes(searchValue);
            let categoryMatch = selectedCategory === "all" || category === selectedCategory;

            if (searchMatch && categoryMatch) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    $("#productSearch").on("keyup", filterProducts);
    $("#categoryFilter").on("change", filterProducts);

    $("#sortPrice").on("change", function () {

        let sortValue = $(this).val();
        let products = $(".product-item").toArray();

        products.sort(function (a, b) {

            let priceA = Number($(a).data("price"));
            let priceB = Number($(b).data("price"));

            if (sortValue === "low") {
                return priceA - priceB;
            } else if (sortValue === "high") {
                return priceB - priceA;
            } else {
                return 0;
            }
        });

        $("#productsGrid").html(products);
    });

    $("#loginForm").submit(function (e) {
        e.preventDefault();

        let email = $("#loginEmail").val().trim();
        let password = $("#loginPassword").val().trim();
        let valid = true;

        $("#loginEmailError").text("");
        $("#loginPasswordError").text("");

        if (email === "") {
            $("#loginEmailError").text("Email is required");
            valid = false;
        }

        if (password === "") {
            $("#loginPasswordError").text("Password is required");
            valid = false;
        }

        if (valid) {
            alert("Login successful");
            window.location.href = "index.html";
        }
    });

    $("#registerForm").submit(function (e) {
        e.preventDefault();

        let name = $("#regName").val().trim();
        let email = $("#regEmail").val().trim();
        let password = $("#regPassword").val().trim();
        let confirmPassword = $("#regConfirmPassword").val().trim();

        let valid = true;

        $("#regNameError").text("");
        $("#regEmailError").text("");
        $("#regPasswordError").text("");
        $("#regConfirmPasswordError").text("");

        if (name === "") {
            $("#regNameError").text("Name is required");
            valid = false;
        }

        if (email === "") {
            $("#regEmailError").text("Email is required");
            valid = false;
        }

        if (password.length < 6) {
            $("#regPasswordError").text("Password must be at least 6 characters");
            valid = false;
        }

        if (confirmPassword !== password) {
            $("#regConfirmPasswordError").text("Passwords do not match");
            valid = false;
        }

        if (valid) {
            alert("Registration successful");
            window.location.href = "login.html";
        }
    });

    $("#contactForm").submit(function (e) {
        e.preventDefault();

        let name = $("#contactName").val().trim();
        let email = $("#contactEmail").val().trim();
        let message = $("#contactMessage").val().trim();

        let valid = true;

        $("#contactNameError").text("");
        $("#contactEmailError").text("");
        $("#contactMessageError").text("");

        if (name === "") {
            $("#contactNameError").text("Name is required");
            valid = false;
        }

        if (email === "") {
            $("#contactEmailError").text("Email is required");
            valid = false;
        }

        if (message.length < 10) {
            $("#contactMessageError").text("Message must be at least 10 characters");
            valid = false;
        }

        if (valid) {
            alert("Message sent successfully");
            $("#contactForm")[0].reset();
        }
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

    updateCartCount();

});