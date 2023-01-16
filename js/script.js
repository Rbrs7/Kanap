// Affiche les informations de chaque produit dans la page d'accueil
function displayKanap(data) {
  // Pour chaque produit dans la liste "data"
  data.forEach(function (kanap) {
    // Crée les éléments HTML
    const a = document.createElement("a");
    const article = document.createElement("article");
    const image = document.createElement("img");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    // Change l'URL en utilisant l'ID du produit
    a.href = `./product.html?id=${kanap._id}`;
    // Ajoute "article" à l'intérieur de l'élément "a"
    a.append(article);
    // Définit les attributs src et alt de l'élément img avec les valeurs du produit
    image.setAttribute("src", `${kanap.imageUrl}`);
    image.setAttribute("alt", `${kanap.altTxt}`);
    // Ajoute "img" à l'intérieur de l'élément "article"
    article.append(image);
    // Définit la classe de l'élément "h3"
    h3.className = "productName";
    // Crée un nœud de texte avec le nom du produit
    let h3Text = document.createTextNode(`${kanap.name}`);
    // Ajoute le nœud de texte à l'intérieur de "h3"
    h3.appendChild(h3Text);
    // Ajoute "h3" à l'intérieur de "article"
    article.append(h3);
    // Définit la classe de "p"
    p.className = `productDescription`;
    // Crée un nœud de texte avec la description du produit
    let pText = document.createTextNode(`${kanap.description}`);
    // Ajoute le nœud de texte à l'intérieur de "p"
    p.appendChild(pText);
    // Ajoute "p" à l'intérieur de "article"
    article.append(p);
    // Récupère "items"
    let itemsDiv = document.getElementById("items");
    // Ajoute "a" à l'intérieur de "items"
    itemsDiv.append(a);
  });
}

// // Requête l'API pour récupérer la liste de tous les produits
fetch("http://localhost:3000/api/products")
  .then(function (res) {
    // Si la réponse HTTP est valide
    if (res.ok) {
      return res.json(); // Convertit la réponse en objet
    }
  })
  .then(function (data) {
    // Affiche les informations de chaque produit dans la page HTML
    displayKanap(data);
  })
  .catch(function (err) {
    // Une erreur est survenue
  });
