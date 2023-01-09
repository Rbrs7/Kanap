let url = new URL(location.href);
let orderIdKanap = url.searchParams.get("orderId");
const orderId = document.getElementById("orderId");
orderId.innerHTML = `${orderIdKanap}`;
/* localStorage.clear() */