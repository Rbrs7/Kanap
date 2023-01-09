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
  let foundKanap = kanap.find(
    (p) => p.id === product.id && p.color === product.color
  );
  if (foundKanap) {
    // ou if (!foundKanap)
    foundKanap.quantity += Number(product.quantity);
  } else {
    kanap.push(product);
  }

  saveCart(kanap);
}

