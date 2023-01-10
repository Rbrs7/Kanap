const url = new URL(location.href);
const orderIdKanap = url.searchParams.get("orderId");
const orderId = document.getElementById("orderId");
orderId.innerHTML = `${orderIdKanap}`;
localStorage.clear();
