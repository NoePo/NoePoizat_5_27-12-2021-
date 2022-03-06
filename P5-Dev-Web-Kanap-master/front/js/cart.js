let listCart = JSON.parse(localStorage.getItem('listCart'))

const AfficherObjectPanier = (article) => {
  document.querySelector("#cart__items").innerHTML +=
    ` <article class="cart__item" data-id="${article.id}" data-color="${article.color}">
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <p>${article.color}</p>
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
    console.log(listCart[i])
    AfficherObjectPanier(listCart[i]);

 }

  /*
  fetch("http://localhost:3000/api/products/"+listCart.id)
  .then(data => data.json())
  .then(jsonArticle => {
          let article = new Article(jsonArticle); */


  document.querySelectorAll(".cart").forEach(addToCart => {
    addToCart.addEventListener("click", function () {
      cart(this.dataset.id);
    })
  })



  document.querySelectorAll(".deleteItem").forEach(Supprimer => {
    Supprimer.addEventListener("click", function () {
      listCart.unshift("articlesId");
    })
  });

  let totalQuantity = listCart.quantity;
  let totalPrice = article.price + listCart.quantity;

  document.querySelector("#cart__price").innerHTML +=
    `   <p>Total (<span id="totalQuantity">${totalQuantity}</span> articles) : <span id="totalPrice">${total.Price}</span> €</p>`



}




  ;
