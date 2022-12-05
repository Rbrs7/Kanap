var url = new URL(window.location.href);
var id = url.searchParams.get("id");
console.log(id);

function displayProduct(kanap) {

  kanap.colors.map(function(color) {
    const colorHtml = document.createElement('option')
    colorHtml.value = color
    colorHtml.textContent = color
    let select = document.getElementById("colors");
    select.append(colorHtml)
  })
    
  console.log('kanap', kanap)
  let itemClass = document.getElementsByClassName("item__img");
  itemClass.innerHTML = `<img src="${kanap.imageUrl}" alt="${kanap.altTxt}">`;
  let titleId = document.getElementById("title");
  titleId.innerHTML = kanap.name;
  let priceId = document.getElementById("price");
  priceId.innerHTML = kanap.price;
  let kanapDescId = document.getElementById("description");
  kanapDescId.innerHTML = kanap.description;
}

fetch(`http://localhost:3000/api/products/${id}`)
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