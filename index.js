function clearResults() {
    var countrysContainer = document.querySelector(".countrys");
    countrysContainer.innerHTML = "";
  }
  
  function displayResults(data) {
    var countrysContainer = document.querySelector(".countrys");
    var markup = "";
  
    data.forEach((element) => {
      markup += `
        <a class="shteti dark" href="./details.html?code=${element.alpha3Code}">
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
        clearResults();
        displayResults(filteredData);
      });
  }
  
  fetch("./data.json")
    .then((res) => res.json())
    .then((data) => displayResults(data));

  var isToggled=false;

 function toggleDarkMode() {
  if (!isToggled) {
      isToggled=true;
      document.getElementById("shtyp").innerHTML = "<img src='https://www.svgrepo.com/show/511078/moon.svg'>Light Mode";
      document.querySelectorAll(".dark").forEach((el) => {
        el.style.backgroundColor = "hsl(209, 23%, 22%)";
      });
      document.querySelector(".body").style.backgroundColor = "hsl(207, 26%, 17%)";
      document.querySelector(".container").style.color="white";
      document.querySelectorAll(".datashteti").forEach((el) => {
        el.style.color = "white";
      });
      document.querySelector("#myInput").style.color="white";
      document.querySelector("#continents").style.color="white";
      
    }
   else {
    isToggled=false;
    document.getElementById("shtyp").innerHTML = "<img src='https://www.svgrepo.com/show/511078/moon.svg'>Dark Mode";
    document.querySelectorAll(".dark").forEach((el) => {
      el.style.backgroundColor = "white";
    });
    document.querySelector(".body").style.backgroundColor = "white";
    document.querySelector(".container").style.color="black";
    document.querySelectorAll(".datashteti").forEach((el) => {
      el.style.color = "black";
    });
    document.querySelector("#myInput").style.color="black";
    document.querySelector("#continents").style.color="black";
    
   }
}

function filterByRegion() {
  const region = document.getElementById("continents").value;
  fetch("./data.json")
  .then(res => res.json())
  .then(data => {
      const filteredData = data.filter(element =>
          element.region === region
      );
      clearResults();
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