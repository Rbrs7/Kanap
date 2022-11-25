var str =
  "http://127.0.0.1:5500/front/html/product.html?id=107fb5b75607497b96722bda5b504926";
var url = new URL(window.location.href);
var id = url.searchParams.get("id");
console.log(id);

function displayProduct(data) {
  let itemImg = "";
  let title = "";
  let price = "";
  let kanapDesc = "";
  let color = "";
  data.map(function (kanap) {
    if (id === `${kanap._id}`) {
      itemImg += `<img src="${kanap.imageUrl}" alt="${kanap.altTxt}">`;
      title += `${kanap.name}`;
      price += `${kanap.price}`;
      kanapDesc += `${kanap.description}`;
      /*color += `<option value="${kanap.colors}">${kanap.colors}</option>
      <option value="${kanap.colors}">${kanap.colors}</option>`; */
    }
  });
  console.log(itemImg, title, price, kanapDesc, color);
  let itemClass = document.getElementsByClassName("item__img");
  itemClass.innerHTML = itemImg;
  let titleId = document.getElementById("title");
  titleId.innerHTML = title;
  let priceId = document.getElementById("price");
  priceId.innerHTML = price;
  let kanapDescId = document.getElementById("description");
  kanapDescId.innerHTML = kanapDesc;
  /* let colorsId = document.getElementById("colors");
  colorsId.innerHTML = color; */
}

fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (data) {
    displayProduct(data);
  })
  .catch(function (err) {
    // Une erreur est survenue
  });
