
// Création du localstorage
let listCart = JSON.parse(localStorage.getItem('listCart'))

// Rechercher l'ID dans l'URL
let params = (new URL(document.location)).searchParams;
let articlesId = params.get('id');

// Récupération depuis l'API des différentes caractéristiques des produits
fetch("http://localhost:3000/api/products/" + articlesId)
  .then(data => data.json())
  .then(jsonArticle => {
    let article = new Article(jsonArticle);
    document.querySelector(".item__img").innerHTML += `<img src="${article.imageUrl}" alt="${article.altTxt}"> `
    document.querySelector("#title").innerHTML = `${article.name}`
    document.querySelector("#price").innerHTML = `${article.price}`
    document.querySelector("#description").innerHTML += `${article.description}`

    // 
    for (let color of article.colors) {
      document.querySelector("#colors").innerHTML += `<option value="${color}">${color}</option>`
    }

    // Quand il y a un click sur le bouton addToCart
    document.querySelector("#addToCart").addEventListener("click", function (e) {
      e.preventDefault();
    // Prendre les diffférentes valeurs
      const color = document.querySelector("#colors").value;
      const quantity = parseInt(document.querySelector("#quantity").value);
      const name = document.querySelector("#title").innerHTML;
    // Les mettre dans la variable productChose
      let productChose = {
        id: articlesId,
        color: color,
        quantity: quantity,
        name: name
      }


        // Si le panier est un tableau
      if (Array.isArray(listCart)) {

        // Trouver l'index du nouveau produit dans ce tableau
        const trouverElement = (articleVerifie) => productChose.color == articleVerifie.color && productChose.id == articleVerifie.id;
        const indexDeLelementTrouve = listCart.findIndex(trouverElement)
      
        // Si le produit existe
        if (indexDeLelementTrouve > -1) {
        // Incrémenter la quantité
          listCart[indexDeLelementTrouve].quantity = productChose.quantity + listCart[indexDeLelementTrouve].quantity
        // Si le produit n'existe pas
        } else {
        // Mettre le produit dans le tableau listCart
          listCart.push(productChose)
        }
        // S'il n'y a pas encore de tableau, créer un tableau
      } else {
        listCart = [
          productChose
        ]
      }

      // Sauvegarder le tableau
      saveCart(listCart);
    });

  })

// Sauvegarder le tableau dans le localStorage
function saveCart(newCart) {
  localStorage.setItem("listCart", JSON.stringify(newCart));
}



