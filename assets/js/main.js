const getCategories= async () =>{
    try{
        const {data}= await axios.get("https://fakestoreapi.com/products/categories");
        return data;

    }catch(error){
        return [];

    }
    
}

const displayCategories=async()=>{
    try{
        const categories= await getCategories();
            const result=categories.map( (category)=>{
                return`
                <div class="category">
                <h2>${category}</h2>
                <a href="./details.html?category=${category}" class="details-btn">Details</a>
                </div>    
                `
            } ).join("");
            console.log(categories);
            document.querySelector(".categories .row").innerHTML=result;
    }catch(error){
        document.querySelector(".categories .row").innerHTML=`<p> please try again..${error}</p>`;
        
    }finally{
        document.querySelector(".loading").classList.add("d-none");

    }   
}
displayCategories();
window.onscroll = function() {
    const header = document.querySelector("header");

    if (window.scrollY > 0) {
        header.classList.add("header-scrolled");
    } else {
        header.classList.remove("header-scrolled");
    }
}

