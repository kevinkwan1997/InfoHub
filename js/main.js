const key = "3688e3a78f7a45e1b978b3f6304d5442";

let articles = [];

    var data = fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey='+ key)
    .then(resp => resp.json())
    .then(data => {
        articles = data.articles;
    })

    const mainDiv = document.getElementById('main');

if(articles.length != 0) {
    articles.forEach(function(article) {
        var newDiv = document.createElement('div')
    
        var header = document.createElement('div')
        var title = document.createElement('h2');
        var author = document.createElement('p');
        
        var descContainer = document.createElement('div')
        var desc = document.createElement('p')
    
        newDiv.classList.add('article');
        title.innerText = article.title;
        author.innerText = article.author;
        desc.innerText = article.description;
        header.appendChild(title);
        descContainer.appendChild(desc);
    
        newDiv.appendChild(header);
        newDiv.appendChild(descContainer);
    
        mainDiv.appendChild(newDiv);
        
    })
}







