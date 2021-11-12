


function submitForm(ev) {
form = document.querySelector('form')

form.addEventListener('submit', function(e) {
    e.preventDefault();
    inpValue = e.target.querySelector("input").value
    let selectInputs = document.querySelectorAll("select");
    let res = [];
    selectInputs.forEach((input) => {
        res.push(input.value);
      });
    getRecipe(inpValue,res);
})
}


function clearField() {
  document.querySelector("input").value = ""
    // changeInput(input, 'placeholder', 'Type a food or a meal...')
    // document.querySelector('#meal-type').selectedindex=null;
      // document.querySelector('#meal-type').value="";
}

function changeInput(input, prop, value) {
  input[prop] = value
}




async function getRecipe(inpVal,res) {
  document.querySelector("#showRecipe").innerHTML = ""

  
  try{
  url = `https://api.edamam.com/search?q=${inpVal}&app_id=${app_id}&app_key=${app_key}&mealType=${res[0]}`;
    const foodItem = await fetch(url)
    const foodItemData = await foodItem.json()
    

    for(let j = 0; j < foodItemData.hits.length; j++){
      createIngredients(foodItemData.hits[j])
    }

    clearField()
  } catch (err) {
    console.log(err)
  }
}

const createIngredients = (meal) => {
  console.log(meal.recipe)
  const ingredients = []
  const healthy = []
  for (let i = 0; i <= 20; i++) {
    if (meal.recipe.ingredientLines[`${i}`]) {
      ingredients.push(meal.recipe.ingredientLines[`${i}`])

    } else {
         break
      }
  }


  for (let h = 0; h <= 35; h++) {
    if (meal.recipe.healthLabels[`${h}`]) {
    healthy.push(meal.recipe.healthLabels[`${h}`])

    } else {
         break
      }
  }

  showRecipe(meal,healthy,ingredients);
}

function showRecipe(meals,healthy,ingredients){
  document.querySelector("#showRecipe").insertAdjacentHTML("beforeend",`
   <div class="card-container">
     <div class="card-wrapper">
      <div class="card-details">
        <div class="card-info">
           <h3 class="card-title">${meals.recipe.label}</h3>
           <p class="cuisine"><strong>CUISINE:</strong>${meals.recipe.cuisineType}</p>
           <p class="cuisine">SOurce:${meals.recipe.source}</p>
           <p class="cuisine">Type of dish:${meals.recipe.dishType}</p>
           <p class="cuisine">Total Calories:${ meals.recipe.calories.toFixed(2)}</p>
           <p class="time">Total time:${meals.recipe.totalTime}</p>
           <p class="servings">Servings:${meals.recipe.yield}</p>
         </div>
          <div class="card-image">
            <img class="images" src="${meals.recipe.image}" alt="Avatar" style="width:100%">
          </div>
        </div>

        <div class="container">
          <span class="health">Health Labels:</span>
         ${healthy.map(hLabel => `<span> ${hLabel} </span>`).join(',')}
       </div>
        <div class="ingredients">
          <h4><b>Ingredients</b></h4>
         <div class="card-ingredients">

           ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
         </div>
        </div>
        <div class="recipe-card__nav">

        <a href="#" id="modal-btn" class="btn btn-primary">Nutrition Info</a>
        <a href="${meals.recipe.url}" target="_blank" class="btn btn-primary getRecipe">Click for full recipe</a>
       </div>
   </div>
      </div>
    ` )

             //MODAL POPUPS
             // Get DOM Elements

             const modalBody = document.querySelector(".modal-body");
             const modal = document.querySelector("#my-modal");
             const modalBtn = document.querySelector("#modal-btn");
             const closeBtn = document.querySelector(".close");

             // Events
             modalBtn.addEventListener("click", openModal);
             closeBtn.addEventListener("click", closeModal);
             window.addEventListener("click", outsideClick);
             
             
             // Open
             function openModal() {
               modal.style.display = "block";
               displayNutrients(meals.recipe,meals.recipe.totalDaily, meals.recipe.totalNutrients);
             }

             // Close
             function closeModal() {
               modal.style.display = "none";
             }

             // Close If Outside Click
             function outsideClick(e) {
               if (e.target == modal) {
                 modal.style.display = "none";
               }
             }


    }

           
             const displayNutrients = (nutrientInfo,daily, nutrient) => {
               


               const fat = nutrient.FAT ? `${nutrient.FAT.quantity.toFixed(0)}g` : ''
               const calFat=nutrient.FAT ? `${(9*nutrient.FAT.quantity).toFixed(0)}` : ''
               const dailyFat=daily.FAT? `${daily.FAT.quantity.toFixed(0)}%`: ''
               const fasat=nutrient.FASAT ? `${nutrient.FASAT.quantity.toFixed(0)}g`:''
               const dailyFasat=daily.FASAT ? `${daily.FASAT.quantity.toFixed(0)}%`:''
               const fatRn=nutrient.FATRN ? `${nutrient.FATRN.quantity.toFixed(0)}g`:''
               const chole= nutrient.CHOLE ? `${nutrient.CHOLE.quantity.toFixed(0)}g`:''
               const dailyChole= daily.CHOLE ? `${daily.CHOLE.quantity.toFixed(0)}%`:''
               const na= nutrient.NA ? `${nutrient.NA.quantity.toFixed(0)}g`:''
               const dailyNa = daily.NA ? `${daily.NA.quantity.toFixed(0)}%`:''
               const chocDf = nutrient.CHOCDF ? `${nutrient.CHOCDF.quantity.toFixed(0)}g`:''
               const dailyChocDf = daily.CHOCDF ? `${daily.CHOCDF.quantity.toFixed(0)}%`:''
               const fibTg= nutrient.FIBTG ? `${nutrient.FIBTG.quantity.toFixed(0)}g`:''
               const dailyFibTg= daily.FIBTG ? `${daily.FIBTG.quantity.toFixed(0)}%`:''
               const sugar= nutrient.SUGAR ? `${nutrient.SUGAR.quantity.toFixed(0)}g`:''
               const procnt= nutrient.PROCNT ? `${nutrient.PROCNT.quantity.toFixed(0)}g`:''
               const dailyfoldFe= daily.FOLDFE ? `${daily.FOLDFE.quantity.toFixed(0)}%`:''
               const dailyvitd= daily.VITD ? `${daily.VITD.quantity.toFixed(0)}%`:''
               const dailyvitc= daily.VITC ? `${daily.VITC.quantity.toFixed(0)}%`:''
               const dailyvitarae= daily.VITA_RAE ? `${daily.VITA_RAE.quantity.toFixed(0)}%`:''
               const dailyvitb6a= daily.VITB6A ? `${daily.VITB6A.quantity.toFixed(0)}%`:''
               const dailyCa= daily.CA ? `${daily.CA.quantity.toFixed(0)}%`:''
               const dailyFe= daily.FE ? `${daily.FE.quantity.toFixed(0)}%`:''
               const dailyk= daily.K ? `${daily.K.quantity.toFixed(0)}%`:''

                document.querySelector('#modal-body').innerHTML=`
              <div id="nutritionfacts">
                 <table width="242" cellspacing="0" cellpadding="0">
                 <tbody>
                   <tr>
                     <td align="center" class="header">Nutrition Facts</td>
                   </tr>
                   <tr>
                     <td>
                       <div class="serving">Per <span class="highlighted">${(nutrientInfo.totalWeight/nutrientInfo.yield).toFixed(0)}</span> Serving Size</div>
                     </td>
                   </tr>
                   <tr style="height: 7px">
                     <td bgcolor="#000000"></td>
                   </tr>
                   <tr>
                     <td style="font-size: 7pt">
                       <div class="line">Amount Per Serving</div>
                     </td>
                   </tr>
                   <tr>
                     <td>
                       <div class="line">
                         <div class="label">Calories 
                           <div class="weight">${(nutrientInfo.calories/nutrientInfo.yield).toFixed(0)}</div>
                         </div>
                         <div style="padding-top: 1px; float: right;" class="labellight">Calories from Fat 
                              <span class="weights">${calFat}</span>
                         </div>
                       </div>
                     </td>
                   </tr>
                   <tr>
                     <td>
                       <div class="line">
                         <div class="dvlabel">% Daily Value<sup>*</sup></div>
                       </div>
                     </td>
                   </tr>
                   <tr>
                     <td>
                       <div class="line">
                         <div class="label">Total Fat <div class="weight">${fat}</div>
                         </div>
                         <div class="dv">${dailyFat}
                          </div>
                       </div>
                     </td>
                   </tr>
                   <tr>
                     <td class="indent">
                       <div class="line">
                         <div class="labellight">Saturated Fat <div class="weight">${fasat}</div>
                         </div>
                         <div class="dv">${dailyFasat}</div>
                       </div>
                     </td>
                   </tr>
                   <tr>
                     <td class="indent">
                       <div class="line">
                         <div class="labellight"><i>Trans</i> Fat <div class="weight">${fatRn}</div>
                         </div>
                       </div>
                     </td>
                   </tr>
                   <tr>
                     <td>
                       <div class="line">
                         <div class="label">Cholesterol <div class="weight">${chole}</div>
                         </div>
                         <div class="dv">${dailyChole}</div>
                       </div>
                     </td>
                   </tr>
                   <tr>
                     <td>
                       <div class="line">
                         <div class="label">Sodium <div class="weight">${na}</div>
                         </div>
                         <div class="dv">${dailyNa}</div>
                       </div>
                     </td>
                   </tr>
                   <tr>
                     <td>
                       <div class="line">
                         <div class="label">Total Carbohydrates <div class="weight">${chocDf}</div>
                         </div>
                         <div class="dv">${dailyChocDf}</div>
                       </div>
                     </td>
                   </tr>
                   <tr>
                     <td class="indent">
                       <div class="line">
                         <div class="labellight">Dietary Fiber <div class="weight">${fibTg}</div>
                         </div>
                         <div class="dv">${dailyFibTg}</div>
                       </div>
                     </td>
                   </tr>
                   <tr>
                     <td class="indent">
                       <div class="line">
                         <div class="labellight">Sugars <div class="weight">${sugar}</div>
                         </div>
                       </div>
                     </td>
                   </tr>
                   <tr>
                     <td>
                       <div class="line">
                         <div class="label">Protein <div class="weight">${procnt}</div>
                         </div>
                       </div>
                     </td>
                   </tr>
                   <tr style="height: 7px">
                     <td bgcolor="#000000"></td>
                   </tr>
                   <tr>
                     <td>
                       <table cellspacing="0" cellpadding="0" border="0" class="vitamins">
                         <tbody>
                         <tr>
                           <td>Vitamin C &nbsp;&nbsp; ${dailyvitc}</td>
                           <td align="center"></td>
                           <td align="right">Potassium &nbsp;&nbsp; ${dailyk}</td>
                         </tr>
                           <tr>
                             <td>Vitamin A &nbsp;&nbsp; ${dailyvitarae}</td>
                             <td align="center"></td>
                             <td align="right">Calcium &nbsp;&nbsp;${dailyCa} </td>
                           </tr>
                           <tr>
                             <td>Vitamin D &nbsp;&nbsp; ${dailyvitd}</td>
                             <td align="center"></td>
                             <td align="right">Folate &nbsp;&nbsp; ${dailyfoldFe}</td>
                           </tr>
                           <tr>
                             <td>Vitamin B &nbsp;&nbsp; ${dailyvitb6a}</td>
                             <td align="center"></td>
                             <td align="right">Iron &nbsp;&nbsp; ${dailyFe}</td>
                           </tr>
                          
                           
                         </tbody>
                       </table>
                     </td>
                   </tr>
                   <tr>
                     <td>
                       <div class="line">
                         <div class="labellight">* Based on a regular <a href="#">2000 calorie diet</a>
                           <br><br><i>Nutritional details are an estimate and should only be used as a guide for approximation.</i>
                         </div>
                       </div>
                     </td>
                   </tr>
                 </tbody>
               </table>
             </div>

              `
            }
