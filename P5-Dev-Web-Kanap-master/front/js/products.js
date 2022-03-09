/* Ajouter un produit */

let listCart = JSON.parse(localStorage.getItem('listCart'))
let params = (new URL(document.location)).searchParams;
let articlesId = params.get('id');

fetch("http://localhost:3000/api/products/" + articlesId)
  .then(data => data.json())
  .then(jsonArticle => {
    let article = new Article(jsonArticle);
    document.querySelector(".item__img").innerHTML += `<img src="${article.imageUrl}" alt="${article.altTxt}"> `
    document.querySelector("#title").innerHTML = `${article.name}`
    document.querySelector("#price").innerHTML = `${article.price}`
    document.querySelector("#description").innerHTML += `${article.description}`

    for (let color of article.colors) {
      document.querySelector("#colors").innerHTML += `<option value="${color}">${color}</option>`
    }

    document.querySelector("#addToCart").addEventListener("click", function (e) {
      e.preventDefault();
      const color = document.querySelector("#colors").value;
      const quantity = parseInt(document.querySelector("#quantity").value);
      const price = parseInt(document.querySelector("#price").innerHTML);
      const name = document.querySelector("#title").innerHTML;
    
      let productChose = {
        id: articlesId,
        color: color,
        quantity: quantity,
        price: price,
        name: name
      }

      /*
                      if (Array.isArray(listCart) && listCart.color == color && listCart.articlesId == articlesId) {
                      
                      }
                      else if (Array.isArray(listCart)) {
                      listCart.push(productChose)
                      }
                      else {
                      listCart = [
                      productChose
                      ]
                      }
                      ;
      
                      */

      /*
SI panier est un tableau
SI le produit existe déjà dans le panier
SINON
SINON
Créer tableau
Mettre nouveauProduit dedans
Assigner à listCart
 
const listCart = [
  {
    id: 1,
    color: 'red',
    quantity: 12
  },
  {
    id: 2,
    color: 'blue',
    quantity: 14
  }
]
 
'blue' est égal 'red' => false => il continue
'blue' est égal à 'blue' => vrai => 1

const color = "red";

const productChose = {
  id : 2,
  color: 'blue,
  quantity : 1
}
*/

      if (Array.isArray(listCart)) {
        // => panier est un tableau

        const trouverElement = (articleVerifie) => productChose.color == articleVerifie.color && productChose.id == articleVerifie.id;
        const indexDeLelementTrouve = listCart.findIndex(trouverElement)
      
        if (indexDeLelementTrouve > -1) {
          // => le produit existe
          listCart[indexDeLelementTrouve].quantity = productChose.quantity + listCart[indexDeLelementTrouve].quantity
        } else {
          // => le produit existe pas
          listCart.push(productChose)
        }
      } else {
        listCart = [
          productChose
        ]
      }

      saveCart(listCart);
    });

  })

function saveCart(newCart) {
  localStorage.setItem("listCart", JSON.stringify(newCart));
}



