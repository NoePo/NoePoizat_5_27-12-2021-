// récupérer les données du localStorage et les mettre dans listCart
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
      <input type="number" data-id="${article.id}" data-color="${article.color}" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${article.quantity}">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem" data-id="${article.id}" data-color="${article.color}" >Supprimer</p>
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

  })

  document.querySelector("#totalPrice").innerHTML += total

  // Modifier la quantité d'un produit directement dans le panier



  let modifie = document.querySelectorAll(".itemQuantity");

  modifie.forEach((changement) => {
    changement.addEventListener("change", (event) => {
      let idChangement = event.target.dataset.id;
      let colorChangement = event.target.dataset.color;
      let valueChangement = event.target.value;
      const trouverArticle = (articleAVerifier) => idChangement == articleAVerifier.id && colorChangement == articleAVerifier.color;
      const indexElementTrouver = listCart.findIndex(trouverArticle)
      if (indexElementTrouver > -1) {
        // => article trouvé
        listCart[indexElementTrouver].quantity = parseInt(valueChangement);
      }

      saveCart(listCart);

    })
  })

  function saveCart(newCart) {
    localStorage.setItem("listCart", JSON.stringify(newCart));
  }

  // Supprimer un produit

  let supprime = document.querySelectorAll(".deleteItem");

  supprime.forEach((supprimer) => {
    supprimer.addEventListener("click", (event) => {
      let idATrouver = event.target.dataset.id;
      let colorATrouver = event.target.dataset.color;
      const trouverArticleSupprimer = (articleATrouver) => idATrouver == articleATrouver.id && colorATrouver == articleATrouver.color;
      const indexElementASupprimer = listCart.findIndex(trouverArticleSupprimer)
      if (indexElementASupprimer > -1) {
        console.log(indexElementASupprimer)
        listCart = listCart.filter((canapAFiltrer) => !(canapAFiltrer.color == colorATrouver && canapAFiltrer.id == idATrouver));
      }

      document.querySelector("#cart__items").innerHTML = ""
      saveCart(listCart);
     
      for (let i in listCart) {
        AfficherObjectPanier(listCart[i]);
    
      }


    })
  })

  function saveCart(newCart) {
    localStorage.setItem("listCart", JSON.stringify(newCart));
    }


};


// Formulaire

// firstName

let nameRegex = /^[a-z A-Z\-çàéèêëïîôüù ]{2,}$/;

const firstName = document.getElementById('firstName');

firstName.addEventListener('input', (e) => {
  e.preventDefault();
  if (nameRegex.test(firstName.value) == false || firstName.value == "") {
    document.getElementById('firstNameErrorMsg').textContent = "Le prénom saisi n'est pas valide";
    return false;
  } else {
    document.getElementById('firstNameErrorMsg').textContent = "";
    return true;
  }
});

// lastName 

const lastName = document.getElementById('lastName');

lastName.addEventListener('input', (e) => {
  e.preventDefault();
  if (nameRegex.test(lastName.value) == false || lastName.value == "") {
    document.getElementById('lastNameErrorMsg').textContent = "Le nom saisi n'est pas valide";
    return false;
  } else {
    document.getElementById('lastNameErrorMsg').textContent = "";
    return true;
  }
});

// address

let addressRegex = /^[\w\s,.'-çàéèêëïîôüù]{4,}$/;


const address = document.getElementById('address');

address.addEventListener('input', (e) => {
  e.preventDefault();
  if (addressRegex.test(address.value) == false || address.value == "") {
    document.getElementById('addressErrorMsg').textContent = "L'adresse saisie n'est pas valide";
    return false;
  } else {
    document.getElementById('addressErrorMsg').textContent = "";
    return true;
  }
});

// city

const city = document.getElementById('city');

city.addEventListener('input', (e) => {
  e.preventDefault();
  if (nameRegex.test(city.value) == false || city.value == "") {
    document.getElementById('cityErrorMsg').textContent = "La ville saisie n'est pas valide";
    return false;
  } else {
    document.getElementById('cityErrorMsg').textContent = "";
    return true;
  }
});

// Mail

const mail = document.getElementById('email');

let mailRegex = /^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,4}$/;

mail.addEventListener('input', (e) => {
  e.preventDefault();
  if (mailRegex.test(mail.value) == false || mail.value == "") {
    document.getElementById('emailErrorMsg').textContent = "L'adresse mail saisie n'est pas valide";
    return false;
  } else {
    document.getElementById('emailErrorMsg').textContent = "";
    return true;
  }
});

// Commander

const commander = document.getElementById("order")

commander.addEventListener("click", (e) => {
  e.preventDefault();
  // données du client
  const contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: mail.value,
  }
console.log(listCart)
  // condition regex
  const TextRegex = nameRegex.test(firstName.value) == false || nameRegex.test(lastName.value) == false || addressRegex.test(address.value) == false || nameRegex.test(city.value) == false || mailRegex.test(mail.value) == false;
  // si formulaire bien remplis et un article dans le panier
  if (TextRegex || listCart.length == 0) {
    alert("Toutes les coordonnées doivent être renseignées afin de passer la commande et vous devez avoir au moins un produit dans votre panier")
  } 

  else {
    let products = listCart.map((objet) => objet.id);
    let commande = {contact, products};

const fetchUrl = "http://localhost:3000/api/products/order"

const fetchSettings = {
  method: 'POST',
  headers: {
    'Accept': 'application/json', 'Content-Type': 'application/json'
  },
  body: JSON.stringify(commande)
};

fetch(fetchUrl, fetchSettings)
  .then((data) => {
    return data.json()
  })
  .then((orderResult) => { // on appelle le paramètre orderResult parce que c'est à ça que ça correspond
    console.log(orderResult);
    const orderId = orderResult.orderId;
    const newUrl = "./confirmation.html?orderId=" + orderId;
    window.location.href = newUrl;
    localStorage.clear();
  });


  }

})
