const countriesList = document.getElementById("countries-list");
const modal = document.querySelector(".modal");

const sortCountries = (countries) => {
    const orderedCountries = countries.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
    );

    return orderedCountries;
};

const closeModal = () => {
    modal.classList.add("hidden")
}

const printCountryDetail = (country) => {
    const { flags, name, capital: cap, population, car } = country;
    const { side } = car;
    const capital = cap[0] ? cap[0] : "No tiene capital";
    const { common } = name;
    const [, img] = flags;
    modal.classList.remove("hidden");
    modal.innerHTML = `
    <div class="country-modal">
    <div class="img-info-container">
    <img src="${img}"/>
    <div>
    <h2>${common}</h2>
    <p>Capital: ${capital}</p>
    <p>Población: ${population}</p>
    <p>Lado de la carretera: ${side}</p>
    </div>
    </div>
    <div>
    <button onclick="closeModal()">Cerrar</button>
    </div>
    </div>
    `;
};

const printCountries = (countries) => {
    countries.forEach((country) => {
        const { flags, name } = country;
        const { common } = name;
        const [, img] = flags;
        countriesList.innerHTML += `
        <div class="card">
        <img src="${img}"/>
        <p>${common}</p>
        <div>
        `;
    });

    countries.forEach((country, index) => {
        const countryElement = document.getElementsByClassName("card")[index];
        countryElement.addEventListener("click", () => printCountryDetail(country));
    });
};

const getCountries = async() => {
    try {
        const res = await fetch("https://restcountries.com/v3/all");
        if (!res.ok) {
            throw new Error("Hubo un problema al cargar los países");
        }
        const countries = await res.json();
        const orderedCountries = sortCountries(countries);
        printCountries(orderedCountries);
    } catch (error) {
        console.error(error);
    }
};

getCountries();

