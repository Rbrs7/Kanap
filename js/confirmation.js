/* 
const formElem = document.querySelector("form");
formElem.addEventListener("submit", (event) => {
  event.preventDefault();
  new FormData(formElem);
});

formElem.onformdata = (event) => {
  let data = event.formData;
  for (var value of data.values()) {
    console.log(value);
    if (value) {
      window.open("http://127.0.0.1:5500/front/html/confirmation.html");
    }
  }

  const request = new XMLHttpRequest();
  request.open("POST", "http://localhost:3000/api/products/order");
  request.send[data];
};

let fd = new FormData();
fd.append("test", "test");
let fdEv = new FormDataEvent("formdata", { formData: fd });
for (let value of fdEv.formData.values()) {
  console.log(value);
}
 */

