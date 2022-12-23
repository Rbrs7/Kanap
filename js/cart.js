let kanaps = [];
fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (products) {
    kanaps = products;
    displayCartData();
  })
  .catch(function (err) {
    // Une erreur est survenue
  });

function findKanapFromId(id) {
  const kanap = kanaps.find(function (kanap) {
    return kanap._id === id;
  });
  return kanap;
}

function displayCartData() {
  console.log("displayCartData");
  const myCart = getCart();
  console.log("myCart", myCart);
  const data = [];
  if (myCart !== null) {
    myCart.forEach(function (cartItem, index) {
      console.log("myCart forEach", index);
      const kanap = findKanapFromId(cartItem.id);
      console.log("kanap", kanap);
      const rowData = { ...cartItem, ...kanap };
      console.log("rowData", rowData);
      data.push(rowData);
    });
    displayCart(data);
  } else {
    document.querySelector("h1").innerHTML =
      "Vous n'avez pas d'article dans votre panier";
  }
}

function displayCart(rowData) {
  console.log("displayCart", rowData);
  const cartSection = document.getElementById("cart__items");
  let html = "";
  rowData.forEach(function (rowItem, index) {
    console.log("displayCart rowItem", rowItem, index);
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
            <p class="deleteItem"><button class = "del">Supprimer</button></p>
          </div>
        </div>
      </div>
    </article>`;
  });
  cartSection.innerHTML = html;
}

const removeBtn = document.querySelectorAll(".del");
removeBtn.forEach((btn, i) => {
  btn.addEventListener("click", () => deleteItemSelect(i));
});

function deleteItemSelect(index, rowItem) {
  items.splice(index, 1);
  localStorage.setItem("kanap", JSON.stringify(rowItem));

  if (items.length === 0) {
    localStorage.removeItem("kanap");
  }
}
