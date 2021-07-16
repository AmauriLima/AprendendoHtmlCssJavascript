function handleSubmit() {
  const container = document.querySelector('#container')
  container.style.display = 'block';

  fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(result => result.json())
    .then(json => generateRecipe(json))
}

const recipeArea = document.querySelector('.recipe');
async function generateRecipe(recipe) {

  recipeArea.classList.remove('hide')

  recipe = recipe.meals[0]

  const img = recipeArea.querySelector('.image img')
  img.src = await recipe.strMealThumb

  const h2 = recipeArea.querySelector('h2');
  h2.innerHTML = recipe.strMeal;

  const p = recipeArea.querySelector('.instructions p');
  p.innerHTML = recipe.strInstructions;

  const category = recipeArea.querySelector('.category span')
  const area = recipeArea.querySelector('.area span')

  category.innerHTML = recipe.strCategory;
  area.innerHTML = recipe.strArea

  generateIngredientList(recipeArea, recipe);

  const video = recipeArea.querySelector('iframe')
  video.src = recipe.strYoutube.replace('watch?v=', 'embed/');
}

function generateIngredientList (recipeArea, recipe)  {
  const ingredients = recipeArea.querySelector('.ingredients ul');

  let ingredientList = [];
  let measureList = [];
  let ingredient;
  let measure;

  for(let i = 1; i <= 20; i++) {
    ingredient = `strIngredient${i}`
    measure = `strMeasure${i}`

    if (recipe[ingredient]) {
      ingredientList.push(recipe[ingredient]);
      measureList.push(recipe[measure]);
    }
  }

  const ingredientsInList = ingredients.querySelectorAll('li')
  ingredientsInList.forEach(ingredient => ingredient.remove());

  for (let i in ingredientList) {
    let li = document.createElement('li');
    li.innerHTML = `${ingredientList[i]} - ${measureList[i]}`;
    ingredients.appendChild(li);
  }

}

const buttonSubmit = document.querySelector('#generateMeal')
buttonSubmit.addEventListener('click', () => {
  handleSubmit()
});