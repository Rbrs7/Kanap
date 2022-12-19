fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (product) {
    getCartData(product);
  })
  .catch(function (err) {
    // Une erreur est survenue
  });

/*
const cartSection = document.getElementById("cart__items");
const cartPrice = document.getElementsByClassName("cart__price");
const h1 = document.getElementsByTagName("h1");

function displayCart() {
  let kanap = getCart();
  let price = 0;
  if (localStorage.getItem("kanap") != null) {
    cartSection.innerHTML += `<article class="cart__item" data-id="${localStorage.getItem("id")}" data-color="${localStorage.getItem("color")}">
      <div class="cart__item__img">
        <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
          <h2>${kanap.name}</h2>
          <p>${localStorage.getItem("color")}</p>
          <p>${price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" onchange="changeQuantity('${localStorage.getItem("id")}', '${localStorage.getItem("color")}', this.value)" min="1" max="100" value="${localStorage.getItem("quantity")}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem" onclick="deleteItem('${localStorage.getItem("id")}','${localStorage.getItem("color")}')">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;
  } else {
    document.querySelector("h1").innerHTML =
      "Vous n'avez pas d'article dans votre panier";
  }
}
*/

/*
function display(data) {
    let html = "";
    data.forEach(function (kanap) {
      html += `<article class="cart__item" data-id=${kanap._id} data-color=${kanap.colors}>
      <div class="cart__item__img">
        <img src="${kanap.imageUrl}" alt="${kanap.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${kanap.name}</h2>
          <p>${kanap.colors}</p>
          <p>${kanap.price}</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;
    });
    console.log(html);
    let itemsCart = document.getElementById("cart__items");
    itemsCart.innerHTML = html;
  }
  */

function getCartData(product) {
  const myCart = JSON.parse(localStorage.getItem("kanap"));
  if (myCart != null) {
    for (let purchase of myCart) {
      for (let a = 0, b = product.length; a < b; a++) {
        if (purchase.id === product[a].id) {
          purchase.name = products[a].name;
          purchase.price = products[a].price;
          purchase.imageUrl = products[a].imageUrl;
          purchase.altTxt = products[a].altTxt;
          purchase.description = products[a].description;
        }
      }
    }
    displayCart(myCart);
  } else {
    document.querySelector("h1").innerHTML =
      "Vous n'avez pas d'article dans votre panier";
  }
}

function displayCart(myCart) {
  const cartSection = document.getElementById("cart__items");
  cartSection.innerHTML += myCart.map(
    (purchase) =>
      `<article class="cart__item" data-id="${purchase.id}" data-color="${purchase.color}">
      <div class="cart__item__img">
        <img src="${purchase.imageUrl}" alt="${purchase.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__titlePrice">
          <h2>${purchase.name}</h2>
          <p>${purchase.color}</p>
          <p>${purchase.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" onchange="changeQuantity('${purchase.id}', '${purchase.color}', this.value)" min="1" max="100" value="${purchase.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem" onclick="deleteItem('${purchase.id}','${purchase.color}')">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`
  );
}
