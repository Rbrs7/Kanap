fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    // Une erreur est survenue
  });

function saveCart(canap) {
  localStorage.setItem("kanap", JSON.stringify(canap));
}

function getCart() {
  let canap = localStorage.getItem("kanap");
  if (canap == null) {
    return [];
  } else {
    return JSON.parse(canap);
  }
}

function addCart(product) {
  let canap = getCart();
  let foundKanap = canap.find((p) => p.id == product.id);
  if (foundKanap != undefined) {
    foundKanap.quantity++;
  } else {
    product.quantity = 1;
    canap.push(product);
  }

  saveCart(canap);
}

function removeCart(product) {
  let canap = getCart();
  canap = canap.filter((p) => p.id != product.id);
  saveCart(canap);
}

function changeQuantity(product, quantity) {
  let canap = getCart();
  let foundKanap = canap.find((p) => p.id == product.id);
  if (foundKanap != undefined) {
    foundKanap.quantity += quantity;
    if (foundKanap.quantity <= 0) {
      removeCart(foundKanap);
    } else {
      saveCart(canap);
    }
  }
}

function getNumberProduct(){
  let canap = getCart();
  let number = 0
  for(let product of canap){
    number += product.quantity;
  }
  return number
}

function getTotalPrice(){
  let canap = getCart();
  let total = 0
  for(let product of canap){
    total += product.quantity * product.price;
  }
  return total
}

/* test console 
  addCart({id : "50", "name": "aaaa", "price": 15})
  removeCart({id:"50"})
  changeQuantity({id:"50"},-5) 
  getTotalPrice()
*/

/*
function display(data) {
    let html = "";
    data.map(function (kanap) {
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