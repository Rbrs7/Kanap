let kanaps = [];

// Envoie une requête GET
fetch(`http://localhost:3000/api/products/`)
  // Si la réponse est ok
  .then(function (res) {
    if (res.ok) {
      // Convertit la réponse en format JSON
      return res.json();
    }
  })
  // Utilise les données reçues pour mettre à jour la variable "kanaps" et appelle la fonction "displayCartData"
  .then(function (products) {
    kanaps = products;
    displayCartData();
  })
  // Si une erreur survient
  .catch(function (err) {
    // Une erreur est survenue
  });

// fonction "findKanapFromId" qui prend en paramètre "id"
function findKanapFromId(id) {
  // Recherche un produit dans "kanaps" ayant l'id spécifié
  const kanap = kanaps.find(function (kanap) {
    // Retourne vrai si l'id de "kanap" est égal à "id"
    return kanap._id === id;
  });
  // Retourne le produit trouvé
  return kanap;
}

// Fonction "displayCartData"
function displayCartData() {
  // Récupère les produits dans le panier en utilisant la fonction "getCart"
  const myCart = getCart();
  // Créer un tableau pour stocker les données des produits
  const data = [];
  // Créer une variable pour stocker le total
  let total = 0;
  // Récupère l'élément HTML pour afficher le total
  let totalCart = document.getElementById("totalPrice");
  // Si le panier n'est pas vide
  if (myCart.length > 0) {
    // Pour chaque produit dans le panier
    myCart.forEach(function (cartItem) {
      // Récupère les informations du produit en utilisant la fonction "findKanapFromId"
      const kanap = findKanapFromId(cartItem.id);
      // Ajoute le prix total pour ce produit à la variable "total"
      total += cartItem.quantity * kanap.price;
      // Combine "cartItem" et "kanap" dans un nouvel objet "rowData"
      const rowData = { ...cartItem, ...kanap };
      // Ajoute "rowData" au tableau "data"
      data.push(rowData);
    });
    // Affiche le total dans l'élément HTML correspondant
    totalCart.textContent = total;
    // Appelle la fonction "displayCart" qui prend en paramètre "data"
    displayCart(data);
    // Appelle la fonction "updateQuantity"
    updateQuantity();
    // Appelle la fonction "deleteButton"
    deleteButton();
    // Appelle la fonction "displayNumberProduct"
    displayNumberProduct();
  } else {
    // Si le panier est vide, cache la section du panier (formulaire de contact & boutton commander) et affiche un message
    objectJavascript = document.querySelector("section");
    objectJavascript.style.display = "none";
    document.querySelector("h1").innerHTML =
      "Vous n'avez pas d'article dans votre panier";
  }
}

// Fonction "displayCart" qui prend en paramètre "rowData"
function displayCart(rowData) {
  // Récupère la section pour afficher les produits dans le panier
  const cartSection = document.getElementById("cart__items");
  // Créer une variable pour stocker le code HTML des produits
  let html = "";
  // Pour chaque produit dans "rowData"
  rowData.forEach(function (rowItem) {
    // Ajoute une structure HTML pour chaque produit, en utilisant les propriétées de "rowItem" pour remplir les éléments
    html += `
    <article class="cart__item" data-id="${rowItem.id}" data-color="${rowItem.color}">
      <div class="cart__item__img">
        <img src="${rowItem.imageUrl}" alt="${rowItem.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
          <h2>${rowItem.name}</h2>
          <p>${rowItem.color}</p>
          <p>${rowItem.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity"  min="1" max="100" value="${rowItem.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;
  });
  // Insère le code HTML généré dans la section pour afficher les produits
  cartSection.innerHTML = html;
}
// Fonction "displayNumberProduct"
function displayNumberProduct() {
  // Récupère les produits dans le panier en utilisant la fonction "getCart"
  const kanapNumber = getCart();
  // Créer une variable pour stocker le nombre total de produits
  let number = 0;
  // Récupère l'élément HTML pour afficher le nombre total de produits
  let cartQuantity = document.getElementById("totalQuantity");
  // Efface le contenu de l'élément HTML
  cartQuantity.innerHTML = "";
  // Pour chaque produit dans le panier
  for (let product of kanapNumber) {
    // Ajoute la quantité de ce produit à la variable "number"
    number = number + product.quantity;
  }
  // Ajoute le nombre total de produits à l'élément HTML
  cartQuantity.append(number);
}

// Fonction "removeProduct" qui prend en paramètre "id" et "color"
function removeProduct(id, color) {
  // Récupère les produits dans le panier en utilisant la fonction "getCart"
  const kanaps = getCart();
  // Trouve l'index du produit à supprimer en utilisant les propriétés "id" et "color"
  const indexToRemove = kanaps.findIndex(
    (item) => item.id === id && item.color === color
  );
  // Si le produit a été trouvé
  if (indexToRemove > -1) {
    // Supprime le produit du panier en utilisant la méthode "splice"
    kanaps.splice(indexToRemove, 1);
    // Actualise l'affichage des produits dans le panier en utilisant la fonction "displayCartData"
    displayCartData();
  }
  // Enregistre les produits dans le panier en utilisant la fonction "saveCart"
  saveCart(kanaps);
}

// Fonction "deleteButton"
function deleteButton() {
  // Récupère tous les boutons "Supprimer" de la page
  const deleteButtons = document.querySelectorAll(".deleteItem");
  // Pour chaque bouton "Supprimer"
  deleteButtons.forEach((button) => {
    // Ajoute un événement "click" sur le bouton
    button.addEventListener("click", (event) => {
      // Récupère l'élément HTML parent (l'élément "article" contenant le bouton) en utilisant la méthode "closest"
      const parentElement = event.target.closest(".cart__item");
      // Récupère les propriétés "data-id" et "data-color" de l'élément HTML parent
      const id = parentElement.dataset.id;
      const color = parentElement.dataset.color;
      // Utilise la fonction "removeProduct" pour supprimer le produit du panier
      removeProduct(id, color);
      // Actualise l'affichage des produits dans le panier en utilisant la fonction "displayCartData"
      displayCartData();
    });
  });
}

// Fonction "updateQuantity"
function updateQuantity() {
  // Récupère tous les input de quantité de la page
  const quantityInputs = document.querySelectorAll(".itemQuantity");
  // Pour chaque input de quantité
  quantityInputs.forEach((input) => {
    // Ajoute un événement "change" sur l'input
    input.addEventListener("change", (event) => {
      // Récupère la nouvelle quantité entrée dans le champ
      let newQuantity = event.target.value;
      // Convertit la nouvelle quantité en entier
      newQuantity = parseInt(newQuantity, 10);
      // Récupère l'élément HTML parent (l'élément "article" contenant l'input) en utilisant la méthode "closest"
      const parentElement = event.target.closest(".cart__item");
      // Récupère les propriétés "data-id" et "data-color" de l'élément HTML parent
      const id = parentElement.dataset.id;
      const color = parentElement.dataset.color;
      // Récupère les produits dans le panier en utilisant la fonction "getCart"
      const myCart = getCart();
      // Trouve l'objet à mettre à jour en utilisant les propriétés "id" et "color"
      const updateItem = myCart.find(
        (item) => item.id === id && item.color === color
      );

      if (newQuantity <= 0) {
        /*         removeProduct(id, color);
        displayCartData(); */
        alert("Veuillez régler la quantité sur 1 ou plus");
        event.target.value = updateItem.quantity;
        return false;
      }
      // Met à jour la propriété "quantity" de l'objet
      updateItem.quantity = newQuantity;
      // Enregistre les produits dans le panier en utilisant la fonction "saveCart"
      saveCart(myCart);
      // Actualise l'affichage des produits dans le panier en utilisant la fonction "displayCartData"
      displayCartData();
    });
  });
}

// REGEX
const firstNameRegex = /^[a-zA-ZÀ-ÿ']+(?:[\s-'][a-zA-Z]+)*$/;
const lastNameRegex = /^[a-zA-ZÀ-ÿ']+(?:[\s-'][a-zA-Z]+)*$/;
const addressRegex = /^[a-zA-ZÀ-ÿ\d']+(?:[\s-'][a-zA-ZÀ-ÿ\d]+)*$/;
const cityRegex = /^[a-zA-ZÀ-ÿ']+(?:[\s-'][a-zA-Z]+)*$/;
const emailRegex =
  /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-zA-Z]+)*(.[a-z]{2,4})$/;

const firstName = document.getElementById("firstName");
const firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");

const lastName = document.getElementById("lastName");
const lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");

const address = document.getElementById("address");
const addressErrorMsg = document.querySelector("#addressErrorMsg");

const city = document.getElementById("city");
const cityErrorMsg = document.querySelector("#cityErrorMsg");

const email = document.getElementById("email");
const emailErrorMsg = document.querySelector("#emailErrorMsg");

const orderButton = document.querySelector("#order");
const form = document.querySelector(".cart__order__form");

// Ajoute un événement "submit" sur le formulaire
form.addEventListener("submit", function (event) {
  // Empêche l'envoi par défaut du formulaire
  event.preventDefault();

  // Récupère les données du formulaire sous forme d'objet FormData
  const formData = new FormData(form);
  // Récupère la valeur de l'input/variable "firstname"
  const firstNameValue = formData.get("firstname") || firstName.value;
  // Récupère la valeur de l'input/variable "lastname"
  const lastNameValue = formData.get("lastname") || lastName.value;
  // Récupère la valeur de l'input/variable "address"
  const addressValue = formData.get("address") || address.value;
  // Récupère la valeur de l'input/variable "city"
  const cityValue = formData.get("city") || city.value;
  // Récupère la valeur de l'input/variable "email"
  const emailValue = formData.get("email") || email.value;
  // Déclare une fonction pour valider les informations de commande
  function orderValidation() {
    // Récupère les données du panier
    const myCart = getCart();

    // Vérifie si la valeur du prénom est rentrée et valide en utilisant le regex "firstNameRegex"
    const firstNameinvalid =
      firstNameRegex.test(firstNameValue) === false || firstNameValue === null;
    // Vérifie si la valeur du nom est rentrée et valide en utilisant la regex "lastNameRegex"
    const lastNameInvalid =
      lastNameRegex.test(lastNameValue) === false || lastNameValue === null;
    // Vérifie si la valeur de l'adresse est rentrée et valide en utilisant la regex "addressRegex"
    const addressInvalid =
      addressRegex.test(addressValue) === false || addressValue === null;
    // Vérifie si la valeur de la ville est rentrée et valide en utilisant la regex "cityRegex"
    const cityInvalid =
      cityRegex.test(cityValue) === false || cityValue === null;
    // Vérifie si la valeur de l'email est rentrée et valide en utilisant la regex "emailRegex"
    const emailInvalid =
      emailRegex.test(emailValue) === false || emailValue === null;

    // Si la valeur du prénom est invalide, affiche un message d'erreur et renvoie faux
    if (firstNameinvalid) {
      firstNameErrorMsg.innerHTML = "Le prénom renseigné n'est pas valide";
      return false;
    }
    // Si la valeur du nom est invalide, affiche un message d'erreur et renvoie faux
    if (lastNameInvalid) {
      lastNameErrorMsg.innerHTML =
        "Le nom de famille renseigné n'est pas valide";
      return false;
    }
    // Si la valeur de l'adresse est invalide, affiche un message d'erreur et renvoie faux
    if (addressInvalid) {
      addressErrorMsg.innerHTML = "L'adresse renseignée n'est pas valide";
      return false;
    }
    // Si la valeur de la ville est invalide, affiche un message d'erreur et renvoie faux
    if (cityInvalid) {
      cityErrorMsg.innerHTML = "La ville renseignée n'est pas valide";
      return false;
    }
    // Si la valeur de l'email est invalide, affiche un message d'erreur et renvoie faux
    if (emailInvalid) {
      emailErrorMsg.innerHTML = "L'email renseigné n'est pas valide";
      return false;
    }

    // Créer un objet contact qui va contenir les informations saisies dans le formulaire
    const contact = {
      firstName: firstNameValue,
      lastName: lastNameValue,
      address: addressValue,
      city: cityValue,
      email: emailValue,
    };

    // Créer un tableau products qui va contenir les id des produits du panier
    const products = [];
    for (let id of myCart) {
      products.push(id.id);
    }

    // Créer un objet "orderObject" qui va contenir l'objet contact et le tableau products (contenant l'id uniquement)
    const orderObject = { contact, products };
    console.log(
      "L'objet avec l'id des produits + formulaire de contact",
      orderObject
    );

    // On vérifie si le panier n'est pas vide avant de faire la requête
    if (Array.isArray(myCart) && myCart.length > 0) {
      // Envoi d'une requête HTTP POST avec les données de l'objet "orderObject"
      const orderId = fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        // Spécification des types de données acceptés et envoyés
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        // Conversion de l'objet "orderObject" en format JSON pour l'envoi de la requête
        body: JSON.stringify(orderObject),
      });
      // Attente et traitement de la réponse
      orderId.then(async function (response) {
        // Conversion de la réponse en format JSON
        const promise = await response.json();
        // Redirection vers la page de confirmation avec l'identifiant de commande reçu dans la réponse
        window.location.href = `confirmation.html?orderId=${promise.orderId}`;
      });
      // Affiche un message d'erreur si le panier est vide
    } else {
      alert("Votre panier est vide.");
    }
  }
  // Appel de la fonction de validation de la commande
  orderValidation();
  // Empêche que la page ne se rafraîchisse lorsque le formulaire est soumis
  return false;
});
