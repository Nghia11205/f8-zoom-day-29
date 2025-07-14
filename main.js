const products = document.querySelector(".product-list");
fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
        data.products.forEach((product) => {
            const discountedPrice = (
                product.price *
                (1 - product.discountPercentage / 100)
            ).toFixed(2);
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.dataset.id = product.id;
            const imageSection = document.createElement("div");
            imageSection.classList.add("product-image");
            const productImage = document.createElement("img");
            productImage.src = product.thumbnail;
            productImage.alt = product.title;
            imageSection.appendChild(productImage);
            productCard.appendChild(imageSection);
            const productContent = document.createElement("div");
            productContent.classList.add("product-content");
            const productTitle = document.createElement("h3");
            productTitle.textContent = product.title;
            productContent.appendChild(productTitle);
            const productDescription = document.createElement("p");
            productDescription.textContent = product.description;
            productContent.appendChild(productDescription);
            productCard.appendChild(productContent);

            const footerCard = document.createElement("div");
            footerCard.classList.add("product-footer");

            const priceDiv = document.createElement("div");
            priceDiv.className = "product-price";
            if (discountedPrice < product.price) {
                const originalPrice = document.createElement("span");
                originalPrice.className = "original-price";
                originalPrice.textContent = `$${product.price}`;

                const discount = document.createElement("span");
                discount.className = "discount";
                discount.textContent = `$${discountedPrice}`;

                priceDiv.appendChild(originalPrice);
                priceDiv.appendChild(discount);
            } else {
                const price = document.createElement("span");
                price.className = "discount";
                price.textContent = `$${product.price}`;
                priceDiv.appendChild(price);
            }
            footerCard.appendChild(priceDiv);
            const productStock = document.createElement("span");
            productStock.classList.add("stock");
            productStock.textContent = `Tồn kho: ${product.stock}`;
            footerCard.appendChild(productStock);
            productCard.appendChild(footerCard);
            //chuyển hướng đến trang chi tiết sản phẩm khi nhấp vào thẻ sản phẩm.
            productCard.addEventListener("click", () => {
                window.location.href = `./detail.html?id=${product.id}`;
            });
            products.appendChild(productCard);
        });
    })
    .catch((error) => {
        console.error("Lỗi khi tải dữ liệu:", error);
    });
