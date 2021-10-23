const getRecipeBtn = document.getElementById('getRecipe').addEventListener('click', getRecipe)
const getRecipesBtns = document.querySelector('.getRecipe').addEventListener('click', getRecipe)
const recipeContainer = document.getElementById('meal')


async function getRecipe() {
	try {
	const url = ('https://www.themealdb.com/api/json/v1/1/random.php')
	const res = await fetch(url)
	const data = await res.json()
		console.log(data)
		randomRecipe(data.meals[0])
	}catch (error) {
		console.log(error)
	}
}


const randomRecipe = (recipe) => {
	const ingredients = []
	for(let i=1; i<=20; i++) {
		if(recipe[`strIngredient${i}`]) {
			ingredients.push(`${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`)
		} else {
			break
		}
	}



    const newInnerHTML = `
    <div class="secondContainer">
    <div class="recipe-card">
          <div style="background: url(${recipe.strMealThumb})no-repeat 50% 50%;background-size: cover;
          height: 400px;"></div>
          <div class="recipe-card__body">
            <h1 class="recipe-card__heading">${recipe.strMeal}</h1>
            <ul class="recipe-card__nav">
              <li>
                <h3 id="ingredientsActive" class="active">Ingredients</h3>
              </li>
              <li>
                <h3 id="instructionsActive" >Instructions</h3>
              </li>
            </ul>
            <ul class="recipe-card__ingredients active" >
            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <ul class="recipe-card__instructions hidden-element">
            <p>${recipe.strInstructions}</p>
            </ul>
            ${recipe.strYoutube ? `
            <div class="row">
                <h5 class="videoLabel active">Video Recipe</h5>
                <div class="videoWrapper">
                    <iframe
                    src="https://www.youtube.com/embed/${recipe.strYoutube.slice(-11)}">
                    </iframe>
                </div>
            </div>` : ''}
          </div>
        </div>
      </div>`

		//To toggle recipe from instruction to ingredients

        recipeContainer.innerHTML = newInnerHTML

    const ingredientsToggle = document.querySelector("#ingredientsActive")
    ingredientsToggle.addEventListener("click", showIngredients)

    function showIngredients() {
        document.querySelector(".recipe-card__instructions").classList.add("hidden-element")
        document.querySelector(".recipe-card__ingredients").classList.remove("hidden-element")
        document.querySelector("#instructionsActive").classList.remove("active")
        document.querySelector("#ingredientsActive").classList.add("active")
    }


    const instructionsToggle = document.querySelector("#instructionsActive")
    instructionsToggle.addEventListener("click", showInstructions)

    function showInstructions() {
        document.querySelector(".recipe-card__ingredients").classList.add("hidden-element")
        document.querySelector(".recipe-card__instructions").classList.remove("hidden-element")
        document.querySelector("#ingredientsActive").classList.remove("active")
        document.querySelector("#instructionsActive").classList.add("active")
    }



}
