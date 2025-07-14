const products = document.querySelector(".product-list");
fetch("https://dummyjson.com/products")
    .then((res) => res.json())
    .then((data) => {
        data.products.forEach((product) => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.dataset.id = product.id;
            const productImage = document.createElement("img");
            productImage.src = product.thumbnail;
            productImage.alt = product.title;
            productCard.appendChild(productImage);
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
            const productPrice = document.createElement("span");
            productPrice.classList.add("price");
            productPrice.textContent = `$${product.price}`;
            footerCard.appendChild(productPrice);
            const productStock = document.createElement("span");
            productStock.classList.add("stock");
            productStock.textContent = `Stock: ${product.stock}`;
            footerCard.appendChild(productStock);
            productCard.appendChild(footerCard);
            console.log(footerCard);

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
