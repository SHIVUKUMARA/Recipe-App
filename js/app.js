let URL = "https://dummyjson.com";
let inputEle = document.getElementById("recipe");
let searchBtn = document.getElementById("search");
let allBtn = document.getElementById("all");
let sortRatingBtn = document.getElementById("sort-rating");
let sortReviewBtn = document.getElementById("sort-review");
let sortBreakFast = document.getElementById("sort-Breakfast");
let sortLunch = document.getElementById("sort-Lunch");
let sortDinner = document.getElementById("sort-Dinner");

let isSearch = false;

let getData = async () => {
  await fetch(`${URL}/recipes`)
    .then((res) => res.json())
    .then((out) => {
      console.log(`out =`, out);
      printData(out.recipes);
    })
    .catch((err) => console.log(err.message));
};

getData();

let recipesEle = document.getElementById("recipes");

let printData = (data) => {
  data.forEach((item) => {
    recipesEle.innerHTML += `
    <a class="card-link" href="details.html?recipeId=${item.id}">
            <div class="card">
                <img src="${item.image}" alt="${item.title}" class="image"/>
                <div class="card-body">
                  <h3>${item.name}</h3>
                  <h4>Rating : ${item.rating}</h4>
                  <h4>Review : ${item.reviewCount}</h4>
                </div>
            </div>
            </a>
          `;
  });
};

// search handler
searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  let input = inputEle.value;

  await fetch(`${URL}/recipes/search?q=${input}`)
    .then((res) => res.json())
    .then((search) => {
      console.log(`search =`, search);
      if (search.recipes.length > 0) {
        recipesEle.innerHTML = " ";
        printData(search.recipes);
      } else {
        recipesEle.innerHTML = "<p>No recipes found for your search.</p>";
      }
    })
    .catch((err) => console.log(err.message));
});

// all handler
allBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  await fetch(`${URL}/recipes`)
    .then((res) => res.json())
    .then((all) => {
      console.log(`all =`, all);
      recipesEle.innerHTML = " ";
      printData(all.recipes);
    })
    .catch((err) => console.log(err.message));
});

// Sort function based on rating
sortRatingBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  await fetch(`${URL}/recipes?sortBy=rating&order=desc`)
    .then((res) => res.json())
    .then((sort) => {
      console.log(`Sort by Rating =`, sort);
      recipesEle.innerHTML = " ";
      printData(sort.recipes);
    });
});

// Sort function based on review
sortReviewBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  await fetch(`${URL}/recipes?sortBy=reviewCount&order=desc`)
    .then((res) => res.json())
    .then((sort) => {
      console.log(`Sort by ReviewCount =`, sort);
      recipesEle.innerHTML = " ";
      printData(sort.recipes);
    });
});

// Sort function based on mealtype = breakfast
sortBreakFast.addEventListener("click", async (e) => {
  e.preventDefault();
  await fetch(`${URL}/recipes/meal-type/breakfast`)
    .then((res) => res.json())
    .then((sort) => {
      console.log(`Sort by Breakfast =`, sort);
      recipesEle.innerHTML = " ";
      printData(sort.recipes);
    });
});

// Sort function based on mealtype = lunch
sortLunch.addEventListener("click", async (e) => {
  e.preventDefault();
  await fetch(`${URL}/recipes/meal-type/lunch`)
    .then((res) => res.json())
    .then((sort) => {
      console.log(`Sort by Lunch =`, sort);
      recipesEle.innerHTML = " ";
      printData(sort.recipes);
    });
});

// Sort function based on mealtype = dinner
sortDinner.addEventListener("click", async (e) => {
  e.preventDefault();
  await fetch(`${URL}/recipes/meal-type/dinner`)
    .then((res) => res.json())
    .then((sort) => {
      console.log(`Sort by Dinner =`, sort);
      recipesEle.innerHTML = " ";
      printData(sort.recipes);
    });
});
