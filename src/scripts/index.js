
// The following line makes sure your styles are included in the project. Don't remove this.
import "../styles/main.scss";
import "babel-polyfill";
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendData();
});
function getFormDataObj() {
  const formDataObj = {};
  /* Goal object: { name: "xxxx", password: "xxxx", ... } */
  // form.elements includes all input elements as
  // an collection ("Array")
  for (let inputEl of form.elements) {
    if (inputEl.type === "checkbox") {
      formDataObj[inputEl.id] = inputEl.checked ? true : false;
    } else if (inputEl.type === "submit") {
      //soll nicht übermittelt werden
    } else {
      formDataObj[inputEl.id] = inputEl.value;
    }
    console.log(formDataObj);
  }
  return formDataObj;
}
async function sendData() {
  const url = "https://jsonplaceholder.typicode.com/posts";
  const data = getFormDataObj();
  const fetchedResponse = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  if (fetchedResponse.ok) {
    const responseData = await fetchedResponse.text();
    alert("Than you for submitting your details\n\n" + responseData);
  }
}