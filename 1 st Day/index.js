const fh_up = document.querySelector(".fh");
const get_meal_btn = document.querySelector(".meal-btn");
const meal_container = document.querySelector(".meal");

//get_meal_btn.addEventListener("click", () => {});

//const showRecipe = async function () {
// try {
//   const res = await fetch("www.themealdb.com/api/json/v1/1/random.php");
//   const data = await res.json();
// } catch (err) {}
//};

const showRecipe = async function () {
  try {
    const res = await fetch(
      "https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bca10"
    );
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe);

    const markup = `
    <div class="meal">
    <div class= "testing">
      <img src="${recipe.image}" alt="${recipe.title}" />
      <div class="paragh">
        <h2>${recipe.title}</h2>
        <p class = "rezept" >
        ${recipe.sourceUrl} 
        </p>
      </div>
      <div class="food-cat">
        <p><strong>Category:</strong>Side</p>
        <p><strong>Area:</strong>Irish</p>
      </div>
    </div>
    <div class="ing">
      <h3>Ingredients:</h3>
      <ul class= "list">
      ${recipe.ingredients
        .map((ing) => {
          return `
        <li class= "recipe__ingredient">
        <div class = "recipe__quantity"> ${ing.quantity} </div>
        <div class = "recipe__descripton"> 
        <span class="recipe__unit" > ${ing.unit} </span>
        ${ing.description} </div>
        </li>
     `;
        })
        .join("")}
    </div>
  </div>
    
    `;
    meal_container.insertAdjacentHTML("afterbegin", markup);
    document.querySelector(".fh").style.marginLeft = "60rem";
    document.querySelector(".rezept").textContent =
      "Wenn du keine frische Hefe zuhause hast, kannst du 1 Würfel Hefe einfach mit 2 Pck. Trockenhefe ersetzen. Die Schritte führst du trotzdem ganz normal durch. Beim Kneten solltest du aber einfach 2-3 Minuten länger kneten, damit die Trockenhefe aktiviert wird und der Teig trotzdem schön fluffig aufgeht.";
    document.querySelector(".rezept").style.width = "40rem";
  } catch (err) {
    alert(err);
  }
};

get_meal_btn.addEventListener("click", showRecipe);
