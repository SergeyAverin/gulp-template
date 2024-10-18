const searchInit = () => {
  const search = document.querySelector("#search");

  const searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location.href = `https://www.google.ru/search?q=${search.value}`;
  });
};

export default searchInit;
