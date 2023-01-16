// Récupère l'ID du produit à partir de l'URL de la page
var url = new URL(window.location.href);
var id = url.searchParams.get("id");

// Affiche les informations du produit dans la page HTML product
function displayProduct(kanap) {
  // Affiche la liste des couleurs disponibles dans la liste déroulante
  kanap.colors.forEach(function (color) {
    const colorHtml = document.createElement("option");
    colorHtml.value = color;
    colorHtml.textContent = color;
    let select = document.getElementById("colors");
    select.append(colorHtml);
  });

  let itemClass = document.getElementsByClassName("item__img");
  itemClass.innerHTML = `<img src="${kanap.imageUrl}" alt="${kanap.altTxt}">`; // Affiche l'image du produit
  let titleId = document.getElementById("title");
  titleId.innerHTML = kanap.name; // Affiche le titre du produit
  let priceId = document.getElementById("price");
  priceId.innerHTML = kanap.price; // Affiche le prix du produit
  let kanapDescId = document.getElementById("description");
  kanapDescId.innerHTML = kanap.description; // Affiche la description du produit
}

// Requête l'API pour récupérer les informations du produit à l'aide de l'ID
fetch(`http://localhost:3000/api/products/${id}`)
  .then(function (res) {
    // Si la réponse HTTP est valide
    if (res.ok) {
      return res.json(); // Convertit la réponse en objet
    }
  })
  .then(function (data) {
    displayProduct(data); // Affiche les informations du produit dans la page HTML product
  })
  .catch(function (err) {
    // Une erreur est survenue
  });

// Récupère le bouton "Ajouter au panier"
const addToCartBtn = document.getElementById("addToCart");

if (addToCartBtn) {
  // Ajoute un écouteur d'événement "click" au bouton
  addToCartBtn.addEventListener("click", function (event) {
    // Empêche l'exécution de l'action par défaut du bouton
    event.preventDefault();
    // Récupère la valeur sélectionné dans la liste des couleurs
    const selectColor = document.getElementById("colors");
    selectColor.value;
    // Récupère la quantitée saisie
    const quantity = document.getElementById("quantity");
    quantity.value;
    // Convertit la valeur de quantité en entier
    let qty = quantity.value;
    qty = parseInt(qty, 10);
    // Vérifie que la couleur et la quantitée sont renseignées
    if (qty > 0 && selectColor.value !== "") {
      // Crée un objet "product" avec les informations du produit à ajouter au panier
      const product = new Object();
      product.id = id;
      product.quantity = qty;
      product.color = selectColor.value;
      // Appelle la fonction "addCart" avec l'objet "product" en paramètre
      addCart(product);
    } else {
      // Affiche une alerte si la couleur et/ou la quantitée ne sont pas renseignées
      alert("Veuillez renseigner la couleur et le nombre d'article(s)");
    }
  });
}
