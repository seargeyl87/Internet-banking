let newsList = [];
function loadNews() {
    let getData = () => { 
        fetch("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=45e2b47d695544ff82d070b366d2fd8c")
            .then(
                (req) => {
                    return req.json();
                
                }
            )
            .then(
                (data) => {
           
                    newsList = data.articles;
                renderNews();
                })

    }
    getData()

}
loadNews()

function renderNews() {
    let containerNews = document.querySelector(".container-news");
    newsList.forEach((item) => {
        containerNews.innerHTML+=`<div class="content-news">
        <div class="img-news">${ item.urlToImage ? `<img src=${item.urlToImage}>` : "" }  </div>
        <div class="news-txt">
            <div class="date-news">${new Date(item.publishedAt).toLocaleDateString("ru-RU")}</div>
            <div class="title-news">${item.title}</div>
            <div class="description-news">${item.description}</div>
            <div class="source-news"><a href=${item.url}>read in source...</a></div>
        </div>
    </div>`

    })
}

