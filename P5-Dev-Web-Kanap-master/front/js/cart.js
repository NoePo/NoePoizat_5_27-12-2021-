let listCart = JSON.parse(localStorage.getItem('listCart'))

if(listCart){

  
fetch("http://localhost:3000/api/products/"+listCart.id)
.then(data => data.json())
.then(jsonArticle => {
        let article = new Article(jsonArticle);
        document.querySelector("#cart__items").innerHTML +=
        ` <article class="cart__item" data-id="${article._id}" data-color="${article.colors}">
        <div class="cart__item__img">
          <img src="${article.imageUrl}" alt="${article.altTxt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${article.name}</h2>
            <p>${listCart.color}</p>
            <p>${article.price}€</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${listCart.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>
      `
      ;
   
    document.querySelectorAll(".cart").forEach(addToCart =>{
    addToCart.addEventListener("click",function(){
    cart(this.dataset.id);
      })
    })


});


}







