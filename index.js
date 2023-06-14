fetch("./data.json")
.then((res) => res.json())
.then((data) => displayResults(data));

function displayResults(data) {
    var countrysContainer = document.querySelector(".countrys");
    var markup = "";
  
    data.map((element) => {
      markup += `
        <a class="shteti" href="./details.html?code=${element.alpha3Code}">
          <img src="${element.flags.svg}">
          <div class="datashteti">
          <p class="emrishteti">${element.name}</p>
          <p class="name"><b>Population:</b> ${element.population.toLocaleString()}</p>
          <p><b>Region:</b> ${element.region}</p>
          <p><b>Capital:</b> ${element.capital}</p>
          </div>
        </a>
      `;
    });
    countrysContainer.innerHTML = markup;
  }
  
  function searchCountry() {
    var search = document.getElementById("myInput").value.toLowerCase();
  
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => {
        var filteredData = data.filter((element) =>
          element.name.toLowerCase().includes(search)
        );
        displayResults(filteredData);
      });
  }
  
function filterByRegion() {
  const region = document.getElementById("continents").value;
  fetch("./data.json")
  .then(res => res.json())
  .then(data => {
      const filteredData = data.filter(element =>
          element.region === region
      );
      displayResults(filteredData);
  });
}

function populateCountryDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (code) {
    fetch("./data.json")
      .then((res) => res.json())
      .then((data) => {
        const country = data.find((element) => element.alpha3Code === code);
        if (country) {
          document.getElementById("shtetiafi").src = country.flags.svg;
          document.getElementById("countryName").textContent = country.name;
          document.getElementById("nativename").innerHTML = `<b>Native Name: </b> ${country.nativeName}`;
          document.getElementById("population").innerHTML = `<b>Population: </b> ${country.population.toLocaleString()}`;
          document.getElementById("region").innerHTML = `<b>Region: </b> ${country.region}`;
          document.getElementById("subregion").innerHTML = `<b>Sub Region: </b> ${country.region}`;
          document.getElementById("capital").innerHTML = `<b>Capital: </b> ${country.capital}`;
          document.getElementById("tldomain").innerHTML = `<b>Top Level Domain: </b> ${country.topLevelDomain.join(", ")}`;
          document.getElementById("currencies").innerHTML = `<b>Currencies: </b> ${country.currencies.map(curr => curr.name).join(", ")}`;
          document.getElementById("languages").innerHTML = `<b>Languages: </b> ${country.languages.map(lang => lang.name).join(", ")}`;
          document.getElementById("border").innerHTML = `<b>Border Countries: </b>${country.borders}`;
        }
      });
  }
}

populateCountryDetails();

function goBack() {
      window.history.back();
    }

    document.addEventListener('DOMContentLoaded', () => {
      const isDarkMode = localStorage.getItem('darkMode') === 'true';
      const body = document.body;
    
      if (isDarkMode) {
        body.classList.add("dark-mode");
      }
    
      updateDarkModeText(isDarkMode);
    });
    
    function toggleDarkMode() {
      const body = document.body;
      const isDarkMode = body.classList.toggle("dark-mode");
    
      updateDarkModeText(isDarkMode);
      localStorage.setItem('darkMode', isDarkMode.toString());
    }
    
    function updateDarkModeText(isDarkMode) {
      const shtyp = document.getElementById("shtyp");
      shtyp.innerHTML = isDarkMode
        ? '<img src="https://www.svgrepo.com/show/433086/light-mode.svg"> Light Mode'
        : '<img src="https://www.svgrepo.com/show/511078/moon.svg"> Dark Mode';
    }
    
    window.addEventListener('pageshow', function(event) {
      if (event.persisted) {
        // Page is loaded from the cache
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        const body = document.body;
    
        if (isDarkMode) {
          body.classList.add("dark-mode");
        }
    
        updateDarkModeText(isDarkMode);
      }
    });
  