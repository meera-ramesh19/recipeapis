document.querySelector("button").addEventListener("click", getit);

function clearInput() {
  document.querySelector('#search').value = ""
}
async function getit() {
  try{
  const inputVal = document.querySelector("input").value;
  let random = Math.floor(Math.random() * 5);

  const url =
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${inputVal}`;
    const res = await fetch(url)
    const data = await res.json()
  // console.log(inputVal);
  // fetch(url)
  //   .then((res) => res.json())
  //   .then((data) => {
      console.log(data);
      let len = data.length;
      console.log(data.meals);

      function rotate(i) {
        if (i >= 0) {
        //  for(let index = 0; index < data.meals.length; index++){
        //      console.log(data.meals[index])
            mealRecipe(data.meals[i],inputVal)
      // }
      
      return setTimeout(function () {
        rotate(i - 1);
      }, 3000);
    }
   }
   rotate(data.meals.length - 1);
   clearInput()
    }catch (err){
      console.log(err)
  }
}    

  async function mealRecipe(meal,value){
    console.log(meal)
    try{
      const url2=`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal.strMeal}`;
      const res = await fetch(url2)
      const dataas = await res.json()
      // fetch(url2)
      // .then((resp) => resp.json())
      // .then((dataas) => {
        console.log("second",dataas);

       let recipe=dataas.meals[0]
       console.log(recipe.strIngredient1)
      
       
          const ingredients = []
          for(let j=1; j<=20; j++) {
            if(recipe[`strIngredient${j}`]) {
              ingredients.push(`${recipe[`strIngredient${j}`]} - ${recipe[`strMeasure${j}`]}`)
            } else {
              break
            }
          }
     
      // document.querySelector("h2").innerHTML = data.meals[random].strMeal;
      // document.getElementById("image").style.display = "block"
      // document.querySelector("h3").innerHTML = data.meals[random].idMeal;
      // document.querySelector("img").src = data.meals[random].strMealThumb;
      document.querySelector("#recipeContainer").innerHTML=`
     <div class="entireContainer">
          <h2 class="cuisine">${value.toUpperCase()} RECIPES</h2>
     <div class="card">
     <div class="leftContainer">
         <div class="profile-main">
             <h2 class="profile-name">${meal.strMeal}</h2>
                   
  
                      <h3 class="ingredientsHeader">Ingredients:</h3>
                       ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                       ${dataas.meals[0].strYoutube===null
                         ?`<p class="enjoy">Enjoy your drink!!!!</p>`
                        :  `<a href="${dataas.meals[0].strYoutube}" target="_blank" class="showButton">Click for full recipe</a>`
  
                       }
                    </div>
  
              </div>
             <div class="rightContainer">
             <div class="profile-sidebar">
                    <img class="profile-image" src="${dataas.meals[0].strMealThumb}"  onerror="this.onerror=null;this.src='cup.jpg';" width=70% alt="recipe image">
                    <ul class="recipe-card__nav">
                       <h3 class="instructionsHeader">Instructions:</h3>
                       <p class="instruct-text">${dataas.meals[0].strInstructions}</p>
                    </ul>
             </div>
             </div>
  
         </div>
       </div>`
  
     
     
  }catch (err){
    console.log(err)
}

  
}



/************cocktails
 * 
 */
 //  <p class="profile-classification">Classification: ${cocktail.strAlcoholic}</p>
//  fetch(url)
//  .then((res) => res.json())
//  .then((data) => {
//    function rotate(i) {
//      if (i >= 0) {
//    console.log(data);
//    len = data.length;
//    console.log(data.drinks[0]);

//    let random = Math.floor(Math.random() * 5);
//    let drinkname = data.drinks[random].strDrink;
//    let drinkThumb = data.drinks[random].strDrinkThumb;
//    let drinkInst =    data.drinks[random].strInstructions;
//    // let drinkname = data.drinks[i].strDrink;
//    // let drinkThumb = data.drinks[i].strDrinkThumb;
//    // let drinkInst = data.drinks[i].strInstructions;

//    document.querySelector("h2").innerText = drinkname;
//    document.getElementById("image").style.visibility = "visible"
//    document.querySelector("img").src = drinkThumb;
//    document.querySelector("h3").innerText = drinkInst;
//    return setTimeout(function () {
//      rotate(i - 1);
//    }, 3000);
//  }
// }
// rotate(data.drinks.length - 1);
//  })
//  .catch((err) => {
//    console.log(`error  ${err}`);
//  });
// }

