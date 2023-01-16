//fonction "saveCart" qui prend en paramètre "kanap"
function saveCart(kanap) {
  // Enregistre dans le localStorage sous la clé "kanap" en le convertissant en format JSON
  localStorage.setItem("kanap", JSON.stringify(kanap));
}

// fonction "getCart"
function getCart() {
  // Récupère la valeur associée à la clé "kanap" dans le localStorage
  const kanap = localStorage.getItem("kanap");
  // Si la valeur est null (n'existe pas dans le localStorage)
  if (kanap === null) {
    // Retourne un tableau vide
    return [];
  } else {
    // Sinon, retourne la valeur convertie en format JavaScript à partir de son format JSON
    return JSON.parse(kanap);
  }
}

// fonction "addCart" qui prend en paramètre "product"
function addCart(product) {
  // Récupère les produits dans le panier en utilisant la fonction "getCart"
  const kanap = getCart();
  // Recherche un produit correspondant aux propriétés "id" et "color" de "product" dans le panier
  let foundKanap = kanap.find(
    (p) => p.id === product.id && p.color === product.color
  );
  // Si un produit est trouvé
  if (foundKanap) {
    // Ajoute la quantité de "product" à celle du produit trouvé dans le panier
    foundKanap.quantity += Number(product.quantity);
  } else {
    // Sinon, ajoute "product" au panier
    kanap.push(product);
  }
  // Enregistre les produits dans le panier en utilisant la fonction "saveCart"
  saveCart(kanap);
}
