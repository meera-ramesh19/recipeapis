
// smoothScroll.init();


 document.querySelector("#btn").addEventListener("click", getDrink);

function clearInput() {
        document.querySelector('#search').value = ""
}

	// 			const selected = document.getElementById('search');
	// 			const option = selected.options[selected.selectedIndex];
 //        //
	// 			// document.getElementById('value').value = option.value;
	// 			// document.getElementById('text').value = option.text;
 //        //
 //

 //  try{
 //         const userChoice=option.value;
 //         console.log(userChoice)
 //       // const userChoice = document.querySelector('#search').value
 // var url=''
//        www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic
// www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic
    //  if (userChoice==='Alcoholic'){
    //   url = (`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`)
    // }else{
    //    url = (`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`)
    // }
  async function getDrink(){
     document.querySelector("#recipe").innerHTML = ""
     try{
      const userChoice = document.querySelector('#search').value
       const url = (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${userChoice}`)
       const res = await fetch(url)
       const data = await res.json()
       console.log(data)

       for(let index = 0; index < data.drinks.length; index++){
         console.log(data.drinks[index])
         cocktails(data.drinks[index])
       }
       clearInput()
     }catch (err){
      console.log(err)
  }

}


// function cocktails(cocktail) {

  const cocktails = (cocktail) => {
    const ingredients = []
    const videos=cocktail.strVideo;
    console.log(videos);
    for(let counter=1; counter<=20; counter++) {
       if(cocktail[`strIngredient${counter}`]) {
      ingredients.push(`${cocktail[`strIngredient${counter}`]} - ${cocktail[`strMeasure${counter}`]}`)

      } else {
        break
      }

    }


 // <p class="profile-position">${cocktail.strGlass}</p>
                       //
                       // ${(cocktail.strVideo!=="null")
                       //  ?  `<a href="${cocktail.strVideo}" target="_blank" class="btn btn-primary getRecipe">Click for full recipe</a>`
                       //   :  `<p class="enjoy">Enjoy !!!1</p>`
                       // }
    document.querySelector("#recipe").insertAdjacentHTML("beforeend",`
    <div class="entireContainer">

   <div class="card">
   <div class="leftContainer">
       <div class="profile-main">
           <h2 class="profile-name">${cocktail.strDrink}</h2>
                   <p class="profile-classification">Classification: ${cocktail.strAlcoholic}</p>

                    <h3 class="ingredientsHeader">Ingredients:</h3>
                     ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                     ${cocktail.strVideo===null
                       ?`<p class="enjoy">Enjoy your drink!!!!</p>`
                      :  `<a href="${cocktail.strVideo}" target="_blank" class="showButton">Click for full recipe</a>`

                     }
                  </div>

            </div>
           <div class="rightContainer">
           <div class="profile-sidebar">
                  <img class="profile-image" src="${cocktail.strDrinkThumb}"  onerror="this.onerror=null;this.src='cup.jpg';" width=70% alt="recipe image">
                  <ul class="recipe-card__nav">
                     <h3 class="instructionsHeader">Instructions:</h3>
                     <p class="instruct-text">${cocktail.strInstructions}</p>
                  </ul>
           </div>
           </div>

       </div>
     </div>`

    )
   }


// function getit() {
  // const inputVal = document.querySelector("input").value;

  // const url =
  //    "https:/drink/www.thecocktaildb.com/api/json/v1/1/search.php?s=" + inputVal;
/** start of the menu
  const stringVal = document.querySelector("input").value.split(" ").join("_");
  console.log(stringVal);
  const url =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + stringVal;
  fetch(url)
  console.log(data.s[0]);
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      len = data.length;


      let name = data.s[0].strDrink;
      let drinkThumb = data.drinks[0].strDrinkThumb;
      let drinkInst = data.drinks[0].strInstructions;
      document.querySelector("h2").innerText = drinkname;
      document.querySelector("img").src = drinkThumb;
      document.querySelector("h3").innerText = drinkInst;
      document.querySelector('div').innerText=
    })
    .catch((err) => {
      //console.log(`error  ${err}`);
    });
}*/
