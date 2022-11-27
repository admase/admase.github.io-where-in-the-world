"use strict";

// Global Variables
const countryCode = "https://restcountries.com/v3.1/alpha/";
const showCountries = document.querySelector("#showCountries");
const showCountryDetail = document.querySelector("#showCountryDetail");
const controlsContainer = document.querySelector("#controls_container");
const backBtn = document.querySelector("#backBtn");
const searchInput = document.querySelector("#search_input");
const backtotop = document.querySelector("#backToTop");
const select = document.querySelector("#selectRegion");

// Fetch REST Countries
async function getRestCountries() {
    const endpoint = await fetch("https://restcountries.com/v3.1/all");
    const res = await endpoint.json();
    res.forEach((data) => {
        renderCountries(data);
    });
}
// Function Call
getRestCountries();

// Render Countries
function renderCountries(countryData) {
    let country = document.createElement("div");
    country.innerHTML = `<div class="card shadow-lg ${countryData.region.toLowerCase()}" id="countryCard">
        <img src="${countryData.flags['png']}" alt="The Flag of ${countryData.name['common']}" class="card-img-top">
        <div class="card-body" id="${countryData.cca3}">
            <h4 class="card-title"><span id="country_name">${countryData.name['common']}</span></h4>
            <p class="card-text"><strong>Population:</strong> <span>${addCommas(countryData.population)}</span></p>
            <p class="card-text"><strong>Region:</strong> <span id="country_region">${countryData.region}</span></p>
            <p class="card-text"><strong>Capital:</strong> <span>${countryData.capital}</span></p>
        </div></div>`;
    showCountries.append(country);

    // Set Event Listener
    country.addEventListener("click", () => {
        renderCountryDetails(countryData);
        showCountries.style.display = "none";
        controlsContainer.style.display = "none";
        if (typeof backBtn == null || typeof backBtn == 'undefined')
            backBtn.addEventListener("click", () => {
                showCountryDetail.style.display = "none";
                controlsContainer.style.display = "block";
            });
    });
}

// Render Country Details
function renderCountryDetails(countryData) {
    showCountryDetail.style.display = "block";
    let borders = new Array(countryData.borders);
    let ul = '<ul class="list-inline" id="country_borders">';
    borders.forEach(border => {
        if (typeof border == 'undefined' || typeof countryData.borders == 'undefined') {
            showCountryDetail.style.display = "block";
        } else {
            ul += `
                <li class="list-inline-item"><a target="_blank" rel="noopener noreferrer" href="${countryCode + border[0]}" class="shadow-lg">${border[0]}</a></li>
                <li class="list-inline-item"><a target="_blank" rel="noopener noreferrer" href="${countryCode + border[1]}" class="shadow-lg">${border[1]}</a></li>
                <li class="list-inline-item"><a target="_blank" rel="noopener noreferrer" href="${countryCode + border[2]}" class="shadow-lg">${border[2]}</a></li>`;
        }
    });
    ul += '</ul>';

    showCountryDetail.innerHTML = `<div class="back-button-wrap shadow-lg">
        <a href="./index.html" class="btn btn-sm btn-back" id="backBtn">
        <i class="fa fa-arrow-left fa-fw"></i>&nbsp; Back</a>
        </div>
        <div class="card" id="detailCard">
        <div class="row">
        <div class="col-md-5">
        <img src="${countryData.flags["png"]}" alt="The Flag of ${countryData.name["common"]}" id="country_flag" class="img-fluid">
        </div>
        <div class="col-md-7">
        <div class="card-body">
        <h4 class="card-title" id="countryName">${countryData.name["common"]}</h4>
        <div class="row">
        <div class="col-md-6">
        <p class="card-text"><strong>Native Name:</strong>&nbsp; <span id="country_nativeName">${countryData.name['official']}</span></p>
        <p class="card-text"><strong>Population:</strong>&nbsp; <span id="country_population">${addCommas(countryData.population)}</span></p>
        <p class="card-text"><strong>Region:</strong>&nbsp; <span id="countryRegion">${countryData.region}</span></p>
        <p class="card-text"><strong>Sub Region:</strong>&nbsp; <span id="country_subregion">${countryData.subregion}</span></p>
        <p class="card-text"><strong>Capital:</strong>&nbsp; <span id="country_capital">${countryData.capital}</span></p>
        </div>
        <div class="col-md-6">
        <p class="card-text"><strong>Top Level Domain:</strong>&nbsp; <span id="country_tld">${countryData.tld}</span></p>
        <p class="card-text"><strong>Currencies:</strong>&nbsp; <span id="country_currency">${Object.keys(countryData.currencies)[0].toString().split(",").join(", ")}</span></p>
        <p class="card-text"><strong>Languages:</strong>&nbsp; <span id="country_languages">${Object.values(countryData.languages).toString().split(",").join(", ")}</span></p>
        </div>
        </div>
        </div>
        <div class="card-footer">
        <div class="card-text d-flex"><strong>Border Countries:</strong> ${ul}</div>
        </div>
        </div>
        </div>`;
}

// Add Commas
const addCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Search for a Country
searchInput.addEventListener("keyup", () => {
    const countryName = [...document.querySelectorAll("#country_name")];
    let searchText = searchInput.value.toLowerCase();
    countryName.forEach((country) => {
        if (country.textContent.toLowerCase().includes(searchText)) {
            country.parentElement.parentElement.parentElement.parentElement.style.display = "block";
        }
        else {
            country.parentElement.parentElement.parentElement.parentElement.style.display = "none";
        }
    });
});

// Filter By Region
select.onchange = () => {
    const filterByRegion = [...document.querySelectorAll("#country_region")];
    filterByRegion.forEach(region => {
        const isRegion = region.innerHTML.toLowerCase();
        if (isRegion == select.value || select.value == "all") {
            region.parentElement.parentElement.parentElement.parentElement.style.display = "block";
        } else {
            region.parentElement.parentElement.parentElement.parentElement.style.display = "none";
        }
    });
}

// Toggle Theme Mode (Dark/Light)
function toggleThemeMode() {
    const elem = document.body;
    elem.classList.toggle("dark-mode");
}

// Get Current Year
function getCurrentYear() {
    const date = new Date().getFullYear();
    document.getElementById("currentYear").innerHTML = date;
    return date;
}
// Function Call
getCurrentYear();

// Back To Top
window.onscroll = function () { scrollToTop() };
function scrollToTop() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backtotop.style.display = "block";
    } else {
        backtotop.style.display = "none";
    }
}
function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}