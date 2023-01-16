//Création d'une nouvelle instance de l'objet URL en utilisant l'URL actuelle de la page
const url = new URL(location.href);
//Récupération de la valeur d'orderId dans l'URL
const orderIdKanap = url.searchParams.get("orderId");
//Récupération de l'élément HTML "orderId"
const orderId = document.getElementById("orderId");
//Remplacement du contenu HTML "orderId" avec la valeur de l'argument "orderId" de l'URL
orderId.innerHTML = `${orderIdKanap}`;
//Effacer les données stockées dans le localStorage du navigateur
localStorage.clear();
