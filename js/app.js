// selectors 
const searchFiled = document.getElementById("search-filed");
const keywords = document.querySelector('.keywords')



/*------------ load data from api-------------------------*/
const loadPhones = () => {
  loadSpiner("block");
  clearData("none");
  seeMore("none");
  // selectors
  let searchTxt = searchFiled.value;

  let url;
  if(searchTxt){
    url = `https://openapi.programming-hero.com/api/phones?search=${searchTxt}`;
  }else{
    url = `https://openapi.programming-hero.com/api/phones?search=b`;
  }

  //   clear search txt
  searchFiled.value = "";
  //   fetch data
  fetch(url )
    .then((res) => res.json())
    .then((data) => displayData(data.data));
  
};

// initaialResult with default api 
window.addEventListener('DOMContentLoaded' ,loadPhones)

// serach by keywords 
keywords.addEventListener('click',(e)=>{

  if(e.target.innerText.length <= 1){
    searchFiled.value = e.target.innerText
    
    e.target.classList.add('completed')
   
    loadPhones()
  }

})

/*-----------------display data----------------*/
const displayData = (phones) => {
  clearData("grid");
  loadSpiner("none");

  //  show total found product
  const totalProduct = document.getElementById("totalProduct");
  totalProduct.innerHTML = ` <i class="fas fa-tags"></i> Total Product  (${phones.length})
  on your search`;
  totalProduct.style.color = "royalblue";

  // selectors
  const initaialResult = phones.slice(1, 21);
  const moreResult = phones.slice(21, phones.length);
  const status = document.getElementById("status");
  const resultContainer = document.getElementById("result-container");
  resultContainer.innerHTML = "";
  //   Check data,if it's contains data or not
  if (phones.length === 0) {
    resultContainer.textContent = "";
    status.textContent = "No Result Found";
    seeMore("none");
    totalProduct.innerHTML = ` <i class="fas fa-tags"></i> Total Product  (${phones.length})
    on your search`;
    totalProduct.style.color = "red";
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
    seeMore("block", moreResult);
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
const displayDetails = (details) => {
  // Selection
  const moadalImg = document.getElementById("moadal-img");
  const relaseDate = document.querySelector(".relase-date");
  const mainFetures = document.querySelector(".main-fetures");
  const sensors = document.querySelector(".sensors");
  const Others = document.querySelector(".Others");
  // cheeck details its contains others and release date key or not
  if (details[("others", "releaseDate")]) {
    moadalImg.src = details.image;
    relaseDate.innerHTML = details.releaseDate;
    mainFetures.innerHTML = `
                            <h5>MainFeatures</h5>
                            <li>ChipSet: <span>${details.mainFeatures.chipSet}</span> </li>
                            <li>DisplaySize: <span>${details.mainFeatures.displaySize}</li>
                            <li >Memory: <span>${details.mainFeatures.memory}</li>
                            <li>Storage: <span>${details.mainFeatures.storage}</span> </li>
    `;
    sensors.innerHTML = `${details.mainFeatures.sensors.join(", ")}`;
    Others.innerHTML = `
    <h5>Others</h5>
    <li>Bluetooth: <span>${details.others.Bluetooth}</span></li>
    <li>GPS:<span>${details.others.GPS}</span></li>
    <li> NFC:<span>${details.others.NFC}</span></li>
    <li> Radio:<span>${details.others.Radio}</span></li>
    <li> USB: <span>${details.others.USB}</span></li>
    <li> WLAN:<span>${details.others.WLAN}</span></li>
    `;
  } else {
    moadalImg.src = details.image;
    relaseDate.innerHTML = "";
    Others.innerHTML = "";
  }
};
/*---------see more result----------- */
const seeMore = (showHide, morePhones) => {
  const seeMoreBtn = document.querySelector(".more-btn");
  seeMoreBtn.addEventListener("click", function () {
    const resultContainer = document.getElementById("result-container");
    morePhones.forEach((phone) => {
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
      seeMore("none");
    });
  });
  seeMoreBtn.style.display = showHide;
};

// load spiner
const loadSpiner = (load) => {
  const spiner = document.querySelector(".spiner");
  spiner.style.display = load;
};
// clear curent result
const clearData = (cleanResult) => {
  const resultContainer = document.getElementById("result-container");
  resultContainer.style.display = cleanResult;
};
