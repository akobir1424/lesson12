let ContId;
const countries = document.getElementById("countries");
const row = document.querySelector(".row");

const single = document.querySelector(".single");
const singleContent = single.querySelector(".content");
const back = single.querySelector(".back");

async function loadCountryAPI() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  let data = await res.json();

  displayCountries(data);
  const input = document.querySelector(".input");
  input.addEventListener("input", (e) => {
    displayCountries(
      data.filter((c) =>
        c.name.common.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  });

  const select = document.querySelector(".select");
  select.addEventListener("change", (e) => {
    input.value = "";
    displayCountries(
      data.filter((c) =>
        c.region.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  });

  function sinleSwitch() {
    if (ContId == undefined) {
      row.classList.add("active");
      countries.classList.add("active");
      single.classList.remove("active");
      singleContent.innerHTML = ""
    } else {
      row.classList.remove("active");
      countries.classList.remove("active");
      single.classList.add("active");
      const cont = data.find((c) => c.name.common === ContId);
      console.log(cont);
      countries.innerHTML = "";
      singleContent.innerHTML = `
      <div class="single-cont">
      <img src="${cont.flags.png}">
      <div>
      <h2 class="toSingle">${cont.name.common}</h2>
      <hr>
      <h4>Native Name: ${
        cont.name?.nativeName?.eng?.official || cont.name.common
      }</h4>
      <h4>Population: ${cont.population}</h4>
      <h4>Regoin: ${cont.region}</h4>
      <h4>Capital: ${cont.capital}</h4></div>
      </div>
      `;
      countries.offsetHeight = 0;
    }
  }

  sinleSwitch();

  function displayCountries(data) {
    if (data.length) {
      const countriesHTML = data.map((country) => getCountry(country));
      countries.innerHTML = countriesHTML.join(" ");
      const titles = document.querySelectorAll(".toSingle");
      countries.addEventListener("click", (e) => {
        if (e.target.classList.contains("toSingle")) {
          ContId = e.target.innerHTML;
        }
        sinleSwitch();
      });
    } else {
      const countries = document.getElementById("countries");
      countries.innerHTML = "not found countries";
    }
  }

  function getCountry(country) {
    return `
      <div class="country-div">
      <img src="${country.flags.png}">
      <h2 class="toSingle">${country.name.common}</h2>
      <hr>
      <h4>Population: ${country.population}</h4>
      <h4>Regoin: ${country.region}</h4>
      <h4>Capital: ${country.capital}</h4>
      </div>
  `;
  }

  back.addEventListener("click", (e) => {
    ContId = undefined;
    sinleSwitch();
    loadCountryAPI();
  });
}

let btn = document.querySelector(".mode");
let body = document.querySelector("body");
btn.addEventListener("click", () => {
  body.classList.toggle("dark");
});

loadCountryAPI();
