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

var str =
  "http://127.0.0.1:5500/front/html/product.html?id=107fb5b75607497b96722bda5b504926";
var url = new URL(str);
var id = url.searchParams.get("id");
console.log(id);
