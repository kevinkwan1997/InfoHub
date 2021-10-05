const key = "3688e3a78f7a45e1b978b3f6304d5442";

const allArticles = [];

const latest = document.getElementById('latest');
const mainDiv = document.getElementById('main');
const fullArticle = document.getElementById('article-full');
const closeFullBtn = document.getElementById('close-full');
const searchBar = document.getElementById('search-bar');
const clearBtn = document.getElementById('clear');



let index = 0;

let articles = [];


latest.addEventListener('click', (event) => {
    fetchLatest();
})


closeFullBtn.addEventListener('click', () => {
    closeArticle();
})

searchBar.addEventListener('keydown', (e) => {
    if(e.keyCode === 13) {
        const searchWord = searchBar.value;
        search(searchWord);
    }

})

clearBtn.addEventListener('click', () => {
    clear();
})


function clear() {
    articles.splice(0, articles.length);
    mainDiv.innerHTML = '';
}

async function fetchLatest() {
    clear();
    var data = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey='+ key)
    .then(resp => resp.json())
    .then(data => {
        articles = data.articles;
    })

    generateDiv();
}

function generateDiv() {
    articles.forEach(function(article) {
        index = index + 1;
        var newDiv = document.createElement('div')
    
        var header = document.createElement('div')
        var title = document.createElement('h2');
        var author = document.createElement('p');
        
        var descContainer = document.createElement('div')
        var desc = document.createElement('p')

        title.style.fontSize = '18px';
        desc.style.fontSize = '12px';

        desc.classList.add('description');
        newDiv.classList.add('article');
        title.innerText = article.title;
        author.innerText = article.author;
        desc.innerText = article.description;
        header.appendChild(title);
        descContainer.appendChild(desc);
    
        newDiv.appendChild(header);
        newDiv.appendChild(descContainer);

        newDiv.addEventListener('click', event => {
            console.log(event);
            const title = document.getElementById('title-full')
            const text = document.getElementById('text-full')
            const desc = document.getElementById('desc-full')
            const link = document.getElementById('link-full')
            const img = document.getElementById('desc-img')
            title.innerText = article.title
            text.innerText = article.content
            desc.innerText = article.description
            link.href = article.url
            img.src = article.urlToImage
            fullArticle.style.display = 'flex';
        })
    
        mainDiv.appendChild(newDiv);
        

        
    })
}

async function search(searchWord) {
    clear();
    const starting = getMonthBackDate(); 
    var data = await fetch('https://newsapi.org/v2/everything?q=' + searchWord + '&from=' + starting + '&sortBy=popularity&apiKey=' + key)
    .then(resp => resp.json())
    .then(data => {
        articles = data.articles;
    })
    generateDiv();

}

function getMonthBackDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth()).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = yyyy + '-' + mm + '-' + dd;
    console.log(today);
}

function openArticle() {
    fullArticle.style.display = 'flex';
}

function closeArticle() {
    fullArticle.style.display = 'none';
}


    



