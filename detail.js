const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
console.log("Product ID:", params.get("id"));

const productDetail = document.querySelector(".product-detail");
const container = document.querySelector(".container");
if (productId) {
    fetch(`https://dummyjson.com/products/${productId}`)
        .then((res) => res.json())
        .then((product) => {
            const discountedPrice = (
                product.price *
                (1 - product.discountPercentage / 100)
            ).toFixed(2);
            productDetail.innerHTML = "";
            // Nút quay về trang danh sách sản phẩm
            const backBtn = document.createElement("a");
            backBtn.href = "index.html";
            backBtn.className = "back-button";
            backBtn.textContent = "← Quay lại danh sách sản phẩm";
            container.appendChild(backBtn);

            const imageSection = document.createElement("div");
            imageSection.className = "product-image";

            const mainImage = document.createElement("img");
            mainImage.src = product.images[0];
            mainImage.alt = product.title;
            mainImage.className = "main-image";
            mainImage.id = "mainImage";

            imageSection.appendChild(mainImage);

            const gallery = document.createElement("div");
            gallery.className = "image-gallery";

            product.images.forEach((img) => {
                const thumb = document.createElement("img");
                thumb.src = img;
                thumb.alt = "Ảnh sản phẩm";
                thumb.addEventListener("click", () => {
                    mainImage.src = img;
                });
                gallery.appendChild(thumb);
            });

            imageSection.appendChild(gallery);

            const infoSection = document.createElement("div");
            infoSection.className = "product-info";

            const title = document.createElement("h1");
            title.className = "product-title";
            title.textContent = product.title;

            const priceDiv = document.createElement("div");
            priceDiv.className = "product-price";

            const originalPrice = document.createElement("span");
            originalPrice.className = "original-price";
            originalPrice.textContent = `$${product.price}`;

            const discount = document.createElement("span");
            discount.className = "discount";
            discount.textContent = `$${discountedPrice}`;

            priceDiv.appendChild(originalPrice);
            priceDiv.appendChild(discount);

            const desc = document.createElement("p");
            desc.className = "product-description";
            desc.textContent = product.description;

            const meta = document.createElement("div");
            meta.className = "product-meta";

            meta.innerHTML = `
        <p><span>Thương hiệu:</span> ${
            product.brand ? product.brand : "No brand"
        }</p>
        <p><span>Danh mục:</span> ${product.category}</p>
        <p><span>Đánh giá:</span>  ${
            product.rating
        }<span class="stars"><i class="fa-solid fa-star"></i></span></p>
        <p><span>Tồn kho:</span> ${
            product.stock > 0 ? `${product.stock} sản phẩm` : "Hết hàng"
        }</p>
      `;
            infoSection.appendChild(title);
            infoSection.appendChild(priceDiv);
            infoSection.appendChild(desc);
            infoSection.appendChild(meta);

            productDetail.appendChild(imageSection);
            productDetail.appendChild(infoSection);
            container.appendChild(productDetail);
        })
        .catch((err) => {
            productDetail.innerHTML = `<p style="color:red;">Không tìm thấy sản phẩm với ID = ${productId}</p>`;
        });
} else {
    productDetail.innerHTML =
        '<p style="color:red;">Thiếu tham số ?id= trong URL</p>';
}
