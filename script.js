const key = '2d803594992f4feca92a3e412a035cd4';

const Container = document.getElementById('blog-container');
const search = document.getElementById("search-input")
const searchb = document.getElementById("search-button")

searchb.addEventListener("click", async () =>{
    const query = search.value.trim()
    if(query !== " "){
        try{
            const articles = await fetchQuery(query) 
                display(articles)
            
        }catch(error){
            console.log("Error search on query", error);
        }
    }
});

async function fetchQuery(query) {
    try {
        //store url
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&PageSize=50&apikey=${key}`
        const res = await fetch(apiUrl)
        const data = await res.json()
        return data.articles
    }catch(error){
        console.log("Error fetching news", error);
        return [];
    }
}
const btn = document.getElementById("search-button");
async function fetchNews(){
    try {
        //store url
        const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&PageSize=50&apikey=${key}`
        const res = await fetch(apiUrl)
        const data = await res.json()
        return data.articles
    }catch(error){
        console.log("Error fetching news", error);
        return [];
    }
}
function display(articles){
    Container.innerHTML = " " //set to empty per load
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        const trunc = article.title.length > 50 ? article.title.slice(0, 50) + "...." : article.title;
        title.textContent = trunc
        const desc = document.createElement("p");
        const truncx = article.description.length > 30?article.description.slice(0, 100) + "....":article.description.description;
        desc.textContent = truncx;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(desc);
        blogCard.addEventListener("click", () =>{
            window.open(article.url, "_blank");
        });
        
        Container.appendChild(blogCard);
    });
}


(async ()=>{
    try{

        const articles = await fetchNews();
        display(articles);

    }catch(error){
        console.log("Error fetching news", error);
    }
})();