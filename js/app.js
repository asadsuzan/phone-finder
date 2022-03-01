/*------------ load data from api-------------------------*/
const loadPhones = () => {
  // selectors
  const searchFiled = document.getElementById("search-filed");
  const searchTxt = searchFiled.value;
  const url = ` https://openapi.programming-hero.com/api/phones?search=${searchTxt}`;
  //   clear search txt
  searchFiled.value = "";
  //   fetch data
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayData(data.data));
  //   console.log(url);
};

/*-----------------display data----------------*/
const displayData = (phones) => {
  // selectors
  const initaialResult = phones.slice(1, 21);
  const status = document.getElementById("status");
  const resultContainer = document.getElementById("result-container");
  resultContainer.innerHTML = "";
  //   Check data,if it's contains data or not
  if (phones.length === 0) {
    resultContainer.textContent = "";
    status.textContent = "No Result Found";
  }
  //  show initialy 20 result
  else if (phones.length > 20) {
    status.textContent = "";
    initaialResult.forEach((phone) => {
      const div = document.createElement("div");
      div.innerHTML = `<div class="cards shadow-sm rounded">
     <div class="card-img "> <img src="${phone.image}" alt="" width="300px"></div>
      <div class="cards-body">
          <span class="ratting">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
          </span>
          <h6 class="name"><span id="name">Name:</span> ${phone.phone_name}</h6>
          <h6 class="brands"><span id="brand">Brand:</span> ${phone.brand}</h6>
          <button onclick="loadDetails('${phone.slug}')" class="card-btn" data-bs-toggle="modal" data-bs-target="#myModal">Explore</button>

      </div>
  </div>`;
      resultContainer.appendChild(div);
    });
    seeMore("block");
  } else {
    status.textContent = "";
    phones.forEach((phone) => {
      const div = document.createElement("div");
      div.innerHTML = `<div class="cards shadow-sm rounded">
      <div class="card-img "> <img src="${phone.image}" alt="" width="300px"></div>
      <div class="cards-body">
          <span class="ratting">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
          </span>
          <h6 class="name"><span id="name">Name:</span> ${phone.phone_name}</h6>
          <h6 class="brands"><span id="brand">Brand:</span> ${phone.brand}</h6>
          <button onclick="loadDetails('${phone.slug}')" class="card-btn" data-bs-toggle="modal" data-bs-target="#myModal">Explore</button>

      </div>
  </div>`;
      resultContainer.appendChild(div);
    });
    seeMore("none");
  }
};

/*---------load details----------- */
const loadDetails = (id) => {
  // selectors
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  //   fetch details
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDetails(data.data));
};

/*---------display details----------- */
const displayDetails = () => {
  console.log("yes");
};
/*---------see more result----------- */

const seeMore = (showHide) => {
  const seeMoreBtn = document.querySelector(".more-btn");
  seeMoreBtn.style.display = showHide;
};
