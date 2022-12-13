function displayKanap(data) {
  data.forEach(function (kanap) {
    const a = document.createElement("a");
    const article = document.createElement("article");
    const image = document.createElement("img");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    a.href = `./product.html?id=${kanap._id}`;
    a.append(article);
    image.setAttribute("src", `${kanap.imageUrl}`);
    image.setAttribute("alt", `${kanap.altTxt}`);
    article.append(image);
    h3.className = "productName";
    let h3Text = document.createTextNode(`${kanap.name}`);
    h3.appendChild(h3Text);
    article.append(h3);
    p.className = `productDescription`;
    let pText = document.createTextNode(`${kanap.description}`);
    p.appendChild(pText);
    article.append(p);
    let itemsDiv = document.getElementById("items");
    itemsDiv.append(a);
  });
}

fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (data) {
    displayKanap(data);
  })
  .catch(function (err) {
    // Une erreur est survenue
  });

/* DOM mode console 

    let a = document.createElement("a");
    a.href = "href='./product.html?id=${kanap._id}'";
    let article = document.createElement("article");
    a.append(article);
    let image = document.createElement("img");
    image.setAttribute("src", "${kanap.imageUrl}");
    image.setAttribute("alt", "${kanap.altTxt}");
    article.append(image);
    let h3 = document.createElement("h3");
    h3.className = "productName";
    let h3Text = document.createTextNode("${kanap.name}");
    h3.appendChild(h3Text);
    article.append(h3);
    let p = document.createElement("p");
    p.className = "productDescription";
    let pText = document.createTextNode("${kanap.description}");
    p.appendChild(pText);
    article.append(p);
*/

/* HTML mode "brut"
function displayKanap(data) {
  let html = ""
  data.map(function (kanap) {
    html += `<a href="./product.html?id=${kanap._id}">
    <article>
      <img src="${kanap.imageUrl}" alt="${kanap.description}">
      <h3 class="productName">${kanap.name}</h3>
      <p class="productDescription">${kanap.description}</p>
    </article>
  </a>`
  });
  console.log(html);
  let itemsDiv = document.getElementById("items");
  itemsDiv.innerHTML = html;
}
*/

/* Mode DOM pour le site
function displayKanap(data) {
  let a = document.createElement("a");
  let article = document.createElement("article");
  let image = document.createElement("img");
  let h3 = document.createElement("h3");
  let p = document.createElement("p");
  data.map(function (kanap) {
    a.href = `href=./product.html?id=${kanap._id}`;
    a.append(article);
    image.setAttribute("src", `${kanap.imageUrl}`);
    image.setAttribute("alt", `${kanap.altTxt}`);
    article.append(image);
    h3.className = "productName";
    let h3Text = document.createTextNode(`${kanap.name}`);
    h3.appendChild(h3Text);
    article.append(h3);
    p.className = `productDescription`;
    let pText = document.createTextNode(`${kanap.description}`);
    p.appendChild(pText);
    article.append(p);
  });
  console.log(a);
  let itemsDiv = document.getElementById("items");
  itemsDiv.innerHTML = a;
}

*/
