/* Ajouter un produit */

let listCart = JSON.parse(localStorage.getItem('listCart'))
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

        document.querySelector("#addToCart").addEventListener("click",function(e){
                e.preventDefault();
                const color = document.querySelector("#colors").value; 
                const quantity = document.querySelector("#quantity").value;
                let productChose = {
                   id: articlesId,
                   color: color,
                   quantity: quantity
                }
                
                if (Array.isArray(listCart)) {
                listCart.push(productChose)
                }
                else {
                listCart = [
                productChose
                ]
                }
                ;
                

                saveCart(listCart); 
        });

})

function saveCart(newCart){
        localStorage.setItem("listCart", JSON.stringify(newCart));
}



