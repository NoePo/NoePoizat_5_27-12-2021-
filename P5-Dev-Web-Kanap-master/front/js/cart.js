let listCart = JSON.parse(localStorage.getItem('listCart'))

const AfficherObjectPanier = (article) => {
  document.querySelector("#cart__items").innerHTML += 
    ` <article class="cart__item" data-id="${article.id}" data-color="${article.color}">

<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>${article.name}</h2>
    <p>${article.color}</p>
    <p>${article.price}€</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${article.quantity}">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article>
`
}

if (listCart) {


  for (let i in listCart) {
    AfficherObjectPanier(listCart[i]);

 }

// Ajouter au panier
  document.querySelectorAll(".cart").forEach(addToCart => {
    addToCart.addEventListener("click", function () {
      cart(this.dataset.id);
    })
  })

// Faire le total des quantités

  let quantite = 0;

  listCart.forEach(objet => {
    quantite = quantite + objet.quantity;
  
  })
  
  document.querySelector("#totalQuantity").innerHTML += quantite

// Faire le total du prix

let total = 0;

listCart.forEach(objet => {
   total = total + objet.price * objet.quantity;
   console.log(total)

})

document.querySelector("#totalPrice").innerHTML += total

// Modifier la quantité d'un produit directement dans le panier




// Supprimer un produit
document.querySelectorAll(".deleteItem").forEach(Supprimer => {
  Supprimer.addEventListener("click", () => {
  })
});


};
