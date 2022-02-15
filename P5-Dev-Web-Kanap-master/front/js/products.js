/* Ajouter un produit */

let params = (new URL(document.location)).searchParams;
let articlesId = params.get('id'); 

fetch("http://localhost:3000/api/products/"+articlesId)
.then(data => data.json())
.then(jsonArticle => {
        let article = new Article(jsonArticle);

document.querySelector(".item__img").innerHTML += `<img src="${article.imageUrl}" alt="${article.altTxt}"> `
document.querySelector("#title").innerHTML += `${article.name}`
document.querySelector("#price").innerHTML += `${article.price}`
document.querySelector("#description").innerHTML += `${article.description}`

for(let color of article.colors){

document.querySelector("#colors").innerHTML += `<option value="${color}">${color}</option>`

}

})





