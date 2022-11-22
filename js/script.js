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

/* let a = document.createElement("a");
 a.href = "href='./product.html?id=42'";
 let article = document.createElement("article");
 a.append(article)
 let image1 = document.createElement("img");
 image1.setAttribute(
  "src",
  "`${kanap.imageUrl}`"
 );
 image1.setAttribute("alt", "`${kanap.altTxt}`")
 article.append(image1);
 etc... */

 // peut-être enlever guillemets sur (`${kanap.imageUrl}`)
