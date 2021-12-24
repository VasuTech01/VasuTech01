
// fetch('http://localhost:3000/weather?address=gulmarg').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error);
//         } else {
//             console.log(data.location);
//             console.log(data.forcast);
//         }
//     })
// })
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msgone = document.querySelector("#msg-1");
const msgTwo = document.querySelector("#msg-2");
msgone.textContent = "Location";
msgTwo.textContent = "Weather";

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  console.log(location);

  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          msgone.textContent = data.error;
          msgTwo.textContent = "";
        } else {
          msgone.textContent = data.location;
          msgTwo.textContent = data.forcast;
          console.log(data.location);
        }
      });
    }
  );
});
