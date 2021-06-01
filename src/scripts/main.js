const main = () => {
    const baseUrl = "https://www.thecocktaildb.com/api/json/v1/1";
    const getCocktail = async () => {
        try {
            const response = await fetch(`${baseUrl}/filter.php?c=Soft Drink / Soda`);
            const responseJson = await response.json();
            if (responseJson.drinks) {
                if (responseJson.drinks.length > 9) {
                    responseJson.drinks.pop();
                }
                renderCocktails(responseJson.drinks);
            } else {
                showResponseMessage("data tidak ditemukan");
            }
        } catch (error) {
            showResponseMessage(error);
        }
    };

    const getCategory = async () => {
        try {
            const response = await fetch(`${baseUrl}/list.php?c=list`);
            const responseJson = await response.json();
            if (responseJson.drinks) {
                renderCategory(responseJson.drinks);
            } else {
                showResponseMessage("data tidak ditemukan");
            }
        } catch (error) {
            showResponseMessage(error);
        }
    };

    const getByName = async (name) => {
        try {
            const response = await fetch(`${baseUrl}/search.php?s=${name}`);
            const responseJson = await response.json();
            if (responseJson.drinks) {
                renderCocktails(responseJson.drinks);
            } else {
                showResponseMessage("data tidak ditemukan");
            }
        } catch (error) {
            showResponseMessage(error);
        }
    };

    const getByCategory = async (cocktailId) => {
        try {
            const response = await fetch(`${baseUrl}/filter.php?c=${cocktailId}`);
            const responseJson = await response.json();
            if (responseJson.drinks) {
                renderCocktails(responseJson.drinks);
            } else {
                showResponseMessage("data tidak ditemukan");
            }
        } catch (error) {
            showResponseMessage(error);
        }
    };

    const renderCategory = (drinks) => {
        const listCategory = document.querySelector("#category");
        listCategory.innerHTML = "";

        drinks.forEach((drink) => {
            listCategory.innerHTML += `<a id="${drink.strCategory}" class="list-group-item list-group-item-action menu">${drink.strCategory}</a>`;
        });

        const buttons = document.querySelectorAll(".menu");
        buttons.forEach((button) => {
            button.addEventListener("click", (event) => {
                const cocktailId = event.target.id;
                getByCategory(cocktailId);
            });
        });
    };
    const renderCocktails = (drinks) => {
        const listCocktail = document.querySelector("#listCocktail");
        listCocktail.innerHTML = "";

        drinks.forEach((drink) => {
            listCocktail.innerHTML += `
            <div class="col-md-4">
            <div class="card item">
              <img
                src="${drink.strDrinkThumb}"
                class="card-img"
                alt="${drink.strCategory}"
              />
              <div class="card-body">
                <h5 class="card-title">${drink.strDrink}</h5>
                <button
                  id="${drink.idDrink}"
                  class="btn-block btn-sm btn-warning detail"
                  data-toggle="modal" data-target="#exampleModal"
                >
                  Detail
                </button>
              </div>
            </div>
          </div>
            `;
        });

        const buttons = document.querySelectorAll(".detail");
        buttons.forEach((button) => {
            button.addEventListener("click", (event) => {
                const cocktailId = event.target.id;
                getDetails(cocktailId);
            });
        });
    };

    const showDetail = (drinks) => {
        const detailCocktail = document.querySelector("#detail");
        detailCocktail.innerHTML = "";

        detailCocktail.innerHTML += `
                <form>
                  <div>
                    <label class="col-md-5">Name</label>
                    <span class="col-md-7">: ${drinks[0].strDrink}</span>
                  </div>
                  <div>
                    <label class="col-md-5">Category</label>
                    <span class="col-md-7">: ${drinks[0].strCategory}</span>
                  </div>
                  <div>
                    <label class="col-md-5">Alcoholic</label>
                    <span class="col-md-7">: ${drinks[0].strAlcoholic}</span>
                  </div>
                  <div>
                    <label class="col-md-5">Glass</label>
                    <span class="col-md-7">: ${drinks[0].strGlass}</span>
                  </div>
                  <div>
                    <label class="col-md-5">Instructions</label>
                    <span class="col-md-7">: ${drinks[0].strInstructions}</span>
                  </div>
                  <br/>
                  <div>
                    <img
                      src="${drinks[0].strDrinkThumb}"
                      class="img-fluid"
                    />
                  </div>
                </form>
                `;
    };

    const getDetails = async (cocktailId) => {
        try {
            const response = await fetch(`${baseUrl}/lookup.php?i=${cocktailId}`);
            const responseJson = await response.json();
            if (responseJson.drinks) {
                showDetail(responseJson.drinks);
            } else {
                showResponseMessage("data tidak ditemukan");
            }
        } catch (error) {
            showResponseMessage(error);
        }
    };

    const showResponseMessage = (message = "Check your internet connection") => {
        alert(message);
    };

    const searchParameter = document.querySelector("#inputSearch");
    const searchButton = document.querySelector("#search");
    searchButton.addEventListener("click", () => {
        const name = searchParameter.value;
        getByName(name);
    });

    document.addEventListener("DOMContentLoaded", () => {
        getCocktail();
        getCategory();
    });
};

export default main;