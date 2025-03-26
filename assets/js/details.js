const getCategoryProducts = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryName = urlParams.get("category");
    
    try {
        const { data } = await axios.get(`https://fakestoreapi.com/products/category/${categoryName}`);
        return data;
    } catch (error) {
        console.error("Error fetching category products:", error);
        return [];
    }
};

const displayProducts = async () => {
    
    document.querySelector(".loading").classList.remove("d-none");
    
    const products = await getCategoryProducts();
    
    document.querySelector(".loading").classList.add("d-none");

    const result = products.map((product) => {
        return `
        <div class='product'>
            <img src="${product.image}" width="20%" />
            <h2>${product.title}</h2>
            <p>${product.price}&#36;</p>
            <a href='./index.html?id=${product.id}'>Details</a>
        </div>
        `;
    }).join("");

    document.querySelector(".products .row").innerHTML = result;
    console.log(products);
};

displayProducts();