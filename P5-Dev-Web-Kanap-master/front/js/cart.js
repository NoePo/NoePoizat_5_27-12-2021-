// Récupérer les données du localStorage et les mettre dans listCart
let listCart = JSON.parse(localStorage.getItem('listCart'))

// Sauvegarder le panier
function saveCart(newCart) {
  localStorage.setItem("listCart", JSON.stringify(newCart));
}




// Afficher les objets du panier à partir du localstorage
const AfficherObjectPanier = (article) => {
  document.querySelector("#cart__items").innerHTML +=
    ` <article class="cart__item" data-id="${article.id}" data-color="${article.color}">
    <div class="cart__item__img">
    <img src="${article.imageURL}" alt="${article.altTxt}">
  </div>
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

// Afficher le prix et les images depuis l'API 

fetch("http://localhost:3000/api/products")
.then(data => data.json())
.then(jsonListArticle => {


  for (let i in listCart) {
     const trouverPrix = (OuiLePrix) => listCart[i].id == OuiLePrix._id;
     const indexElementPrix = jsonListArticle.findIndex(trouverPrix);
  const panier = {
      id: listCart[i].id,
      name: listCart[i].name,
      color: listCart[i].color,
      quantity: listCart[i].quantity,
      price: jsonListArticle[indexElementPrix].price,
      imageURL: jsonListArticle[indexElementPrix].imageUrl,
      altTxt: jsonListArticle[indexElementPrix].altTxt
    }   
    AfficherObjectPanier(panier);
  }

  mettreAJourBoutonModifier();
  mettreAJourBoutonSupprimer();

  // Faire le total des quantités
  
  let quantite = 0;
  
  listCart.forEach(objet => {       
    quantite = quantite + objet.quantity;
  })
  document.querySelector("#totalQuantity").innerHTML += quantite
  
  // Faire le total du prix
  

  let total = 0;
  listCart.forEach(objet => {
    const trouverPrixPourTotal = (PrixTotal) => PrixTotal._id == objet.id;
    const indexElementPrixTotal = jsonListArticle.findIndex(trouverPrixPourTotal);
    
    total = total + jsonListArticle[indexElementPrixTotal].price * objet.quantity;
  }
  
  )
  document.querySelector("#totalPrice").innerHTML += total

})

// Modifier la quantité d'un produit directement dans le panier

const mettreAJourBoutonModifier = () =>{
let modifie = document.querySelectorAll(".itemQuantity");

modifie.forEach((changement) => {
  // Ecouter quand il y a un changement
  changement.addEventListener("change", (event) => {
    // Prendre l'id, la couleur et la quantité de la cible du changement
    let idChangement = event.target.dataset.id;     
    let colorChangement = event.target.dataset.color;
    let valueChangement = event.target.value;
    // Trouver l'article similaire dans le tableau
    const trouverArticle = (articleAVerifier) => idChangement == articleAVerifier.id && colorChangement == articleAVerifier.color;
    const indexElementTrouver = listCart.findIndex(trouverArticle) 
    // Modifier la quantité avec la nouveau valeur
    if (indexElementTrouver > -1) {
      // ParseInt renvoie un nombre au lieu d'une chaine de caractère
      listCart[indexElementTrouver].quantity = parseInt(valueChangement); 
    }

  // Sauvegarder le nouveau tableau
    saveCart(listCart); 
    location.reload();

  })
})
}

// Supprimer un produit

const mettreAJourBoutonSupprimer = () =>{
let supprime = document.querySelectorAll(".deleteItem");

supprime.forEach((supprimer) => {
  supprimer.addEventListener("click", (event) => {
    let idATrouver = event.target.dataset.id;
    let colorATrouver = event.target.dataset.color;
    const trouverArticleSupprimer = (articleATrouver) => idATrouver == articleATrouver.id && colorATrouver == articleATrouver.color;
    const indexElementASupprimer = listCart.findIndex(trouverArticleSupprimer)
    if (indexElementASupprimer > -1) {
      listCart = listCart.filter((canapAFiltrer) => !(canapAFiltrer.color == colorATrouver && canapAFiltrer.id == idATrouver));
    }

    // Supprimer le HTML 
    document.querySelector("#cart__items").innerHTML = ""
    saveCart(listCart);
    // Remettre le HTML sans l'objet supprimé
    for (let i in listCart) {
      AfficherObjectPanier(listCart[i]);
  
    }
    
    location.reload();


  })
})
}

// Formulaire

// FirstName

let nameRegex = /^[a-z A-Z\-çàéèêëïîôüù ]{2,}$/; // Condition du regex

const firstName = document.getElementById('firstName');

firstName.addEventListener('input', (e) => {
  e.preventDefault();
  // => Si le test du Regex est faux ou qu'il n'y a rien dans la champ
  if (nameRegex.test(firstName.value) == false || firstName.value == "") {
    document.getElementById('firstNameErrorMsg').textContent = "Le prénom saisi n'est pas valide";
    return false;
  } else {
    document.getElementById('firstNameErrorMsg').textContent = "";
    return true;
  }
});

// LastName 

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

// Address

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

// City

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

// Ecouter si quelqu'un clique sur commander
commander.addEventListener("click", (e) => {
  e.preventDefault();
  // Données du client
  const contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: mail.value,
  }
console.log(listCart)
  // Conditions regex
  const TextRegex = nameRegex.test(firstName.value) == false || nameRegex.test(lastName.value) == false || addressRegex.test(address.value) == false || nameRegex.test(city.value) == false || mailRegex.test(mail.value) == false;
  // Vérifier si le formulaire est bien remplis et un article dans le panier
  if (TextRegex || listCart.length == 0) {
  // Si ce n'est pas le cas il y a une alerte
    alert("Toutes les coordonnées doivent être renseignées afin de passer la commande et vous devez avoir au moins un produit dans votre panier")
  } 
  // Sinon on prend l'ID et les données du client
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
 // Envoie des données à l'API
fetch(fetchUrl, fetchSettings)
  .then((data) => {
    return data.json()
  })
  .then((orderResult) => { 
    console.log(orderResult);

    const orderId = orderResult.orderId;
    // Prendre l'orderId qu'on nous renvoie et l'envoyer avec l'utilisateur sur la page de confirmation
    const newUrl = "./confirmation.html?orderId=" + orderId;
    window.location.href = newUrl;
    // Supprimer le localStorage
    localStorage.clear();
  });


  }

})
