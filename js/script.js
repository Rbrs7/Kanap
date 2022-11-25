function displayKanap(data) {
  let html = "";
  data.map(function (kanap) {
    html += `<a href="./product.html?id=${kanap._id}">
    <article>
      <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
      <h3 class="productName">${kanap.name}</h3>
      <p class="productDescription">${kanap.description}</p>
    </article>
  </a>`;
  });
  console.log(html);
  let itemsDiv = document.getElementById("items");
  itemsDiv.innerHTML = html;
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

/*
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

/* function display(data) {
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


