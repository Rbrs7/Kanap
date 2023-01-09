
let kanaps = [];

fetch(`http://localhost:3000/api/products/`)
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
  let total = 0;
  let totalCart = document.getElementById("totalPrice");
  if (myCart !== null) {
    myCart.forEach(function (cartItem, index) {
      console.log("myCart forEach", index);
      const kanap = findKanapFromId(cartItem.id);
      console.log("kanap", kanap, kanap.price);
      total += cartItem.quantity * kanap.price;
      const rowData = { ...cartItem, ...kanap };
      console.log("rowData", rowData);
      data.push(rowData);
    });
    totalCart.textContent = total;
    displayCart(data);
    updateQuantity();
    deleteButton();
    displayNumberProduct();
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
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>`;
  });
  cartSection.innerHTML = html;
}

function displayNumberProduct() {
  const kanapNumber = getCart();
  let number = 0;
  let cartQuantity = document.getElementById("totalQuantity");
  cartQuantity.innerHTML = "";
  for (let product of kanapNumber) {
    number = number + product.quantity;
  }
  cartQuantity.append(number);
}

function removeProduct(id, color) {
  const kanaps = getCart();
  const indexToRemove = kanaps.findIndex(
    (item) => item.id === id && item.color === color
  );
  if (indexToRemove > -1) {
    console.log("indexToRemove", indexToRemove);
    kanaps.splice(indexToRemove, 1);
    console.log("newCart", kanaps);
  }
  saveCart(kanaps);
}

function deleteButton() {
  const deleteButtons = document.querySelectorAll(".deleteItem");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const parentElement = event.target.closest(".cart__item");
      console.log("parentHTML", parentElement);
      const id = parentElement.dataset.id;
      const color = parentElement.dataset.color;
      removeProduct(id, color);
      displayCartData();
    });
  });
}

function updateQuantity() {
  const quantityInputs = document.querySelectorAll(".itemQuantity");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", (event) => {
      console.log("La fonction a été exécutée");
      let newQuantity = event.target.value;
      newQuantity = parseInt(newQuantity, 10);
      console.log("La nouvelle quantité :", newQuantity);
      const parentElement = event.target.closest(".cart__item");
      console.log("L'élément parent le plus proche est :", parentElement);
      const id = parentElement.dataset.id;
      const color = parentElement.dataset.color;
      const myCart = getCart();
      const updateItem = myCart.find(
        (item) => item.id === id && item.color === color
      );
      console.log("Contenu de myCart :", myCart);
      console.log("id :", id, "color :", color);
      console.log("L'objet à mettre à jour :", updateItem);
      updateItem.quantity = newQuantity;
      saveCart(myCart);
      displayCartData();
    });
  });
}

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");
// REGEX
const firstNameRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
const lastNameRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
const addressRegex = /^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,40}$/;
const cityRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;
const emailRegex =
  /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;

const orderButton = document.querySelector("#order");

const firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
const lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
const addressErrorMsg = document.querySelector("#addressErrorMsg");
const cityErrorMsg = document.querySelector("#cityErrorMsg");
const emailErrorMsg = document.querySelector("#emailErrorMsg");

orderButton.addEventListener("click", function (e) {
  e.preventDefault();
  let firstNameValue = firstName.value;
  let lastNameValue = lastName.value;
  let addressValue = address.value;
  let cityValue = city.value;
  let emailValue = email.value;

  function orderValidation() {
    let myCart = getCart();

    if (
      firstNameRegex.test(firstNameValue) === false ||
      firstNameValue === null
    ) {
      firstNameErrorMsg.innerHTML = "Le prénom renseigné n'est pas valide";
      return false;
    } else if (
      lastNameRegex.test(lastNameValue) === false ||
      lastNameValue === null
    ) {
      lastNameErrorMsg.innerHTML =
        "Le nom de famille renseigné n'est pas valide";
      return false;
    } else if (
      addressRegex.test(addressValue) === false ||
      addressValue === null
    ) {
      addressErrorMsg.innerHTML = "L'adresse renseigné n'est pas valide";
      return false;
    } else if (cityRegex.test(cityValue) === false || cityValue === null) {
      cityErrorMsg.innerHTML = "La ville renseigné n'est pas valide";
      return false;
    } else if (emailRegex.test(emailValue) === false || emailValue === null) {
      emailErrorMsg.innerHTML = "L'email renseigné n'est pas valide";
      return false;
    } else {
      let formInfo = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        address: addressValue,
        city: cityValue,
        email: emailValue,
      };

      let productKanap = [];

      for (let id of myCart) {
        productKanap.push(id.id);
        console.log("PRODUCTKANAP", productKanap);
      }

      let orderObject = { ...formInfo, ...productKanap };
      console.log("ORDEROBJ", orderObject);

      const orderId = fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderObject),
      });
      orderId.then(async function (response) {
        const promise = await response.json();
        window.location.href = `confirmation.html?orderId=${promise.orderId}`;
      });
    }
  }
  orderValidation();
});
