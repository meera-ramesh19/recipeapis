

document.querySelector('#search').addEventListener('submit', function (e) {
    e.preventDefault()
    // result = document.querySelector('#result')
    inpValue = e.target.querySelector("input").value;
    fetchData4mAPI(inpValue);

 });

    // console.log('c',e.target[0].value)
  // if (e.target[0].value) {
  // if(inpValue){

  // changeTextButton(inpValue, 'SEARCHING...')
  //   search(inpValue)
    // changeTextButton(e.target[1], 'SEARCHING...')
    // search(e.target)
  // }
// }, false)


// function changeTextButton(button, text) {
// button.textContent = text
//
// }
//
//
//   function search(inputs) {
//
//
//     fetchData4mAPI(inputs);
//
// }


async function fetchData4mAPI(values){

  

  try{

       baseURl =`https://api.edamam.com/api/food-database/parser?app_id=${app_id}&app_key=${app_key}&ingr=${values}`
       const res = await fetch(baseURl)

       const resp = await res.json()
       console.log(resp.hints);

        if (resp.hints.length) {
          resp.hints.forEach(hint => {
            console.log(hint.food)
            // nutritionalLabels(hint.food.label, hint.measures.uri)
            insertCard(hint.food)

          });
      }
        // else {
        //   changeInput(form[0], 'placeholder', 'We didn\'t found any food.')
        //   resetInput(form[0])
        // }
        // changeTextButton(form[1], 'SEARCH');
        // changeInput(form[0], 'value', '');
    }catch(err){
        console.log(err);
        // changeTextButton(form[1], 'SEARCH')
        // changeInput(form[0], 'placeholder', 'An error has occurred. Try again later.')
        // resetInput(form[0])
      };
  }




function resetInput(input) {
    setTimeout(() => {
      changeInput(input, 'placeholder', 'Type a food or a meal...')
    }, 3000)
}

function changeInput(input, prop, value) {
    input[prop] = value
  }


    function insertCard(data) {


       const foodContent = data.foodContentsLabel ? `<li><b>FoodcontentsLabel:</b><span>${data.foodContentsLabel}</span></li>`:''
       const energy = data.nutrients.ENERC_KCAL ? `<li><b>Energy: </b><span>${data.nutrients.ENERC_KCAL.toFixed(1)}kcal</span></li>` : ''
       const carbs = data.nutrients.CHOCDF ? `<li><b>Carbs: </b><span>${data.nutrients.CHOCDF.toFixed(1)}g</span></li>` : ''
       const protein = data.nutrients.PROCNT ? `<li><b>Protein: </b><span>${data.nutrients.PROCNT.toFixed(1)}g</span></li>` : ''
       const fat = data.nutrients.FAT ? `<li><b>Fat: </b><span>${data.nutrients.FAT.toFixed(1)}g</span></li>` : ''

    document.querySelector("#result").insertAdjacentHTML("beforeend",`
       <div style=" max-width:960px; margin:4rem auto; border-bottom:3px solid #7cfc00" class="card">
        <div class="card-header" style="margin:0;padding:0">
          <h3 style="text-align:center;background:#7cfc00;width:100%">${data.label}</h3>
          <div class="brand-info" style="display:flex;justify-content:space-between;align-items:space-betwwen;">
          <h4 style="display:block">${data.category}</h4>
            <h4 style="display:block"><b>Brand: </b><span>${data.brand || 'Not Available'}</span></h4>
        </div>
        <div class="card-body">
          <ul>
            ${energy}
            ${carbs}
            ${protein}
            ${fat}
          </ul>
        </div>
      </div>
      `
    )
  }

//         `
//          <div id="nutritionfacts">
//           <table width="242" cellspacing="0" cellpadding="0">
//               <tbody><tr>
//                   <td align="center" class="header">Nutrition Facts</td>
//               </tr>
//               <tr>
//                   <td><div class="serving">Per <span class="highlighted"></span> Serving Size</div></td>
//               </tr>
//               <tr style="height: 7px">
//                   <td bgcolor="#000000"></td>
//               </tr>
//               <tr>
//                   <td style="font-size: 7pt"><div class="line">Amount Per Serving</div></td>
//               </tr>
//               <tr>
//                   <td>
//                       <div class="line">
//                       <div class="label">Calories <div class="weight">230</div></div><div style="padding-top: 1px; float: right;" class="labellight">Calories from Fat <div class="weight">56</div></div>
//                       </div>
//                   </td>
//               </tr>
//               <tr>
//                   <td><div class="line"><div class="dvlabel">% Daily Value<sup>*</sup></div></div></td>
//               </tr>
//               <tr>
//                   <td>
//                       <div class="line">
//                       <div class="label">Total Fat <div class="weight">6.2g</div></div>
//                       <div class="dv">10%</div>
//                       </div>
//                   </td>
//               </tr>
//                           <tr>
//                   <td class="indent">
//                       <div class="line">
//                       <div class="labellight">Saturated Fat <div class="weight">3.5g</div></div>
//                       <div class="dv">17%</div>
//                       </div>
//                   </td>
//               </tr>
//                           <tr>
//                   <td class="indent">
//                       <div class="line">
//                       <div class="labellight"><i>Trans</i> Fat <div class="weight">0.0g</div></div>
//                       </div>
//                   </td>
//               </tr>
//                           <tr>
//                   <td>
//                       <div class="line">
//                       <div class="label">Cholesterol <div class="weight">22mg</div></div>
//                       <div class="dv">7%</div>
//                       </div>
//                   </td>
//               </tr>
//                           <tr>
//                   <td>
//                       <div class="line">
//                       <div class="label">Sodium <div class="weight">618mg</div></div>
//                       <div class="dv">26%</div>
//                       </div>
//                   </td>
//               </tr>
//                           <tr>
//                   <td>
//                       <div class="line">
//                       <div class="label">Total Carbohydrates <div class="weight">32.2g</div></div>
//                       <div class="dv">11%</div>
//                       </div>
//                   </td>
//               </tr>
//                           <tr>
//                   <td class="indent">
//                       <div class="line">
//                       <div class="labellight">Dietary Fiber <div class="weight">5.2g</div></div>
//                       <div class="dv">21%</div>
//                   </div></td>
//               </tr>
//                           <tr>
//                   <td class="indent">
//                       <div class="line">
//                       <div class="labellight">Sugars <div class="weight">3.3g</div></div>
//                       </div>
//                   </td>
//               </tr>
//                           <tr>
//                   <td>
//                       <div class="line">
//                       <div class="label">Protein <div class="weight">11.4g</div>
//                       </div>
//                   </div></td>
//               </tr>
//               <tr style="height: 7px">
//                   <td bgcolor="#000000"></td>
//               </tr>
//                           <tr>
//                   <td>
//                       <table cellspacing="0" cellpadding="0" border="0" class="vitamins">
//                       <tbody>
//                       <tr>
//                           <td>Vitamin A &nbsp;&nbsp; 10%</td>
//                           <td align="center">•</td>
//                           <td align="right">Calcium &nbsp;&nbsp; 19%</td>
//                       </tr>
//                       <tr>
//                           <td>Vitamin B &nbsp;&nbsp; 22%</td>
//                           <td align="center">•</td>
//                           <td align="right">Iron &nbsp;&nbsp; 13%</td>
//                       </tr>
//                       <tr>
//                           <td>Vitamin C &nbsp;&nbsp; 16%</td>
//                           <td align="center">•</td>
//                           <td align="right">Potassium &nbsp;&nbsp; 7%</td>
//                       </tr>
//                       <tr>
//                           <td>Vitamin D &nbsp;&nbsp; 5%</td>
//                           <td align="center">•</td>
//                           <td align="right">Folate &nbsp;&nbsp; 40%</td>
//                       </tr>
//                       </tbody></table>
//                   </td>
//               </tr>
//                           <tr>
//                   <td><div class="line">
//                   <div class="labellight">* Based on a regular <a href="#">2000 calorie diet</a>
//                   <br><br><i>Nutritional details are an estimate and should only be used as a guide for approximation.</i>
//                   </div>
//                   </div>
//                   </td>
//               </tr>
//           </tbody></table>
//       </div>
// `
// return html
// }
