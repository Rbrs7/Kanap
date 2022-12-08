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



window.localStorage.setItem("name", "${kanap.name}")
const kanapName = window.localStorage.getItem("name");

window.localStorage.setItem("id", "${kanap.id}")
const kanapId = window.localStorage.getItem("id");

window.localStorage.setItem("colors", "${kanap.colors}")
const kanapColors = window.localStorage.getItem("colors");
console.log(localStorage);