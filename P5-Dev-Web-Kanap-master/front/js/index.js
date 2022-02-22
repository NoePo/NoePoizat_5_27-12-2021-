
fetch("http://localhost:3000/api/products")
.then(data => data.json())
.then(jsonListArticle => {
    for(let jsonArticle of jsonListArticle) {
        let article = new Article(jsonArticle);
        document.querySelector(".items").innerHTML +=
        `   <a href="./product.html?id=${article._id}">
        <article>
          <img src="${article.imageUrl}" alt="${article.altTxt}">
          <h3 class="productName">${article.name}</h3>
          <p class="productDescription">${article.description}</p>
        </article>
      </a> 
      `
      ;
    }
    
})


.catch((error=> {
  console.log(error)
}))
;


