function saveCart(kanap) {
    localStorage.setItem("kanap", JSON.stringify(kanap));
  }
  
  function getCart() {
    const kanap = localStorage.getItem("kanap");
    if (kanap === null) {
      return [];
    } else {
      return JSON.parse(kanap);
    }
  }
  
  function addCart(product) {
    const kanap = getCart();
    let foundKanap = kanap.find((p) => p.id === product.id && p.color === product.color);
    if (foundKanap) { // ou if (!foundKanap)
      foundKanap.quantity += Number(product.quantity);
    } else {
      kanap.push(product);
    }
  
    saveCart(kanap);
  }
  
  function removeCart(products) {
    let kanap = getCart();
    kanap = kanap.filter((p) => p.id !== products.id && p.color === products.color);
    saveCart(kanap);
  }
  
function changeQuantity(product, quantity) {
    const kanap = getCart();
    let foundKanap = kanap.find((p) => p.id === product.id && p.color === product.color);
    if (foundKanap) {
      foundKanap.quantity += quantity;
      if (foundKanap.quantity <= 0) {
        removeCart(foundKanap);
      } else {
        saveCart(kanap);
      }
    }
  }

  
  function getNumberProduct(){
    const kanap = getCart();
    let number = 0
    for(let product of kanap){
      number += product.quantity;
    }
    return number
  }
  
  function getTotalPrice(){
    const kanap = getCart();
    let total = 0
    for(let product of kanap){
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