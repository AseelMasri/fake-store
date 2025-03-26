const getProducts = async (page) => {
    const limit = 4; 
    const skip = (page - 1) * limit;
    const { data } = await axios.get(`https://fakestoreapi.com/products`);
    return data.slice(skip, skip + limit); 
}

const displayProducts = async (page = 1) => {
    document.querySelector(".loading").classList.remove("d-none");
    const allData = await axios.get('https://fakestoreapi.com/products'); 
    const totalProducts = allData.data.length;
    const limit = 4; 
    const numberOfPages = Math.ceil(totalProducts / limit); 

    const data = await getProducts(page); 
    
    const result = data.map(product =>
        `<div class="product">
            <h2>${product.title}</h2>
            <img src="${product.image}" width="40%" class="products-image"/>
            <p class="product-price">$${product.price}</p>
        </div>`
    ).join(' ');

    document.querySelector('.products .row').innerHTML = result;
    customModel();


    let paginationLink = '';

    if (page > 1) {
        paginationLink = `<li><button onclick="displayProducts(${page - 1})">&lt;</button></li>`;
    } else {
        paginationLink = `<li><button disabled>&lt;</button></li>`;
    }

    for (let i = 1; i <= numberOfPages; i++) {
        paginationLink += `<li><button onclick="displayProducts(${i})" class="${i === page ? 'active' : ''}">${i}</button></li>`;    }

    if (page < numberOfPages) {
        paginationLink += `<li><button onclick="displayProducts(${page + 1})">&gt;</button></li>`;
    } else {
        paginationLink += `<li><button disabled>&gt;</button></li>`;
    }

    document.querySelector('.pagination').innerHTML = paginationLink;
    document.querySelector(".loading").classList.add("d-none");
}

displayProducts();  

function customModel() {
    const model = document.querySelector('.my-modal');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');
    const closeBtn = document.querySelector('.close-btn');
    const images = Array.from(document.querySelectorAll('.products-image'));
    let currentIndex = 0;

    images.forEach(function (img) {
        img.addEventListener('click', (e) => {
            model.classList.remove('d-none');
            model.querySelector('img').setAttribute('src', e.target.src);

            const currentImage = e.target;
            currentIndex = images.indexOf(currentImage);
        });
    });

    closeBtn.addEventListener('click', (e) => {
        model.classList.add('d-none');
    });

    rightBtn.addEventListener('click', (e) => {
        currentIndex++;
        if (currentIndex >= images.length) {
            currentIndex = 0;
        }
        const src = images[currentIndex].getAttribute('src');
        model.querySelector('img').setAttribute('src', src);
    });

    leftBtn.addEventListener('click', (e) => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = images.length - 1;
        }
        const src = images[currentIndex].getAttribute('src');
        model.querySelector('img').setAttribute('src', src);
    });

    // keyboard event
    document.addEventListener('keydown', (e) => {
        if (e.code == 'ArrowRight') {
            currentIndex++;
            if (currentIndex >= images.length) {
                currentIndex = 0;
            }
            const src = images[currentIndex].getAttribute('src');
            model.querySelector('img').setAttribute('src', src);
        } else if (e.code == 'ArrowLeft') {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = images.length - 1;
            }
            const src = images[currentIndex].getAttribute('src');
            model.querySelector('img').setAttribute('src', src);
        } else if (e.code == 'Escape') {
            model.classList.add('d-none');
        }
    });
}