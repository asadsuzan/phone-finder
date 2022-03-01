// load data from api
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
    .then((data) => console.log(data.status));
  console.log(url);
};
