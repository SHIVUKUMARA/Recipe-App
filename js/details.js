// to read router query from the url
let params = new Proxy(new URLSearchParams(window.location.search), {
  get: (par, prop) => par.get(prop),
});

if (params) {
  console.log(`params: `, params.recipeId);
}

let recipeEle = document.getElementById("recipe");
let URL = "https://dummyjson.com";

let getData = async (id) => {
  await fetch(`${URL}/recipes/${id}`)
    .then((res) => res.json())
    .then((out) => {
      console.log(`recipes =`, out);
      printData(out);
    })
    .catch((err) => console.log(err.message));
};

getData(params.recipeId);

let printData = (data) => {
  recipeEle.innerHTML = `
  <div class="card-body details">
    <img src="${data.image}" alt="${data.name}"/>
    
        <h2>${data.name}</h2>
    <div class="recipe-body">
        <div className="item">Meal Type: ${data.mealType}</div>
        <div className="item">Difficulty : ${data.difficulty} Level </div>
        <div className="item">Calories Per Serving : ${
          data.caloriesPerServing
        } calories </div>
        <div className="item">Servings : ${data.servings}</div>
        <div className="item">CookTime : ${data.cookTimeMinutes} min </div>
        <div className="item">Preparation Time : ${
          data.prepTimeMinutes
        } min </div>
        
        <div className="item">Rating : ${data.rating}</div>
        <div className="item">Reviews : ${data.reviewCount}</div>
        <div className="item">Tags : ${data.tags.join(", ")}</div>
    </div>

    <hr />
    <h2>Ingredients</h2>
    <ol>
    ${data.ingredients.map((item) => `<li>${item}</li>`).join("")}
    </ol>

    <hr />

    <h2>Instructions</h2>
    <ol>${data.instructions.map((item) => `<li>${item}</li>`).join("")}
    </ol>
    </div>
    </div>`;
};
