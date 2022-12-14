function saveCart(canap) {
    localStorage.setItem("kanap", JSON.stringify(canap));
  }
  
  function getCart() {
    const canap = localStorage.getItem("kanap");
    if (canap === null) {
      return [];
    } else {
      return JSON.parse(canap);
    }
  }
  
  function addCart(product) {
    const canap = getCart();
    let foundKanap = canap.find((p) => p.id === product.id);
    if (foundKanap) { // ou if (!foundKanap)
      foundKanap.quantity++;
    } else {
      product.quantity = 1;
      canap.push(product);
    }
  
    saveCart(canap);
  }
  
  function removeCart(product) {
    let canap = getCart();
    canap = canap.filter((p) => p.id !== product.id);
    saveCart(canap);
  }
  
  function changeQuantity(product, quantity) {
    const canap = getCart();
    let foundKanap = canap.find((p) => p.id == product.id);
    if (foundKanap) {
      foundKanap.quantity += quantity;
      if (foundKanap.quantity <= 0) {
        removeCart(foundKanap);
      } else {
        saveCart(canap);
      }
    }
  }
  
  function getNumberProduct(){
    const canap = getCart();
    let number = 0
    for(let product of canap){
      number += product.quantity;
    }
    return number
  }
  
  function getTotalPrice(){
    const canap = getCart();
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