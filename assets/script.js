document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);
    console.log($target);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    const e = event || window.event;

    if (e.keyCode === 27) { // Escape key
      closeAllModals();
    }
  });
});

n = new Date();
m = n.getMonth() + 1;
d = n.getDate();
document.getElementById("suggestedPairing").innerHTML = `Suggested Pairing: <b>${m}/${d}</b>`;


//find drink through keyword
  //take search input value

let drinkName
let drinkImg
let drinkIngr = []
let drinkInstr


function getDrink(x){
  fetch(x)
  .then(
    function(response){
      if (response.status !== 200){
        console.log("looks like there was a problem");
        return;
      }
      response.json().then(function(data){
        console.log(data);

        drinkName = data.drinks[0].strDrink
        console.log(drinkName)

        drinkImg = data.drinks[0].strDrinkThumb
        console.log(drinkImg)

        drinkInstr = data.drinks[0].strInstructions
        console.log(drinkInstr)
        

      });
    }
  )
  .catch(function(err){
    console.log("fetch error," + err);
  });
  
}


//getDrink through search value
var drinkInputValue = "margarita"    

function inputDrinkName(x){
  var searchDrink = x
  var searchUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchDrink
  
  getDrink(searchUrl)
}

//add in click event listener
//uncomment to test out =>
// inputDrinkName(drinkInputValue)



//random drink from selected category
  //take category input from dropdown
  //top ingrdients are vodka, gin, rum, tequila, etc. 
// var selectedCat = ... input value
//ex: 
var selectedCateg = "vodka"

//randomizie selected drink from within category
function getDrinkFromCateg(x){
  fetch(x)
  .then(
    function(response){
      if (response.status !== 200){
        console.log("looks like there was a problem");
        return;
      }
      response.json().then(function(data){
        // console.log(data);
        
        let random = Math.floor(Math.random() * data.drinks.length);
        
        let randomID = data.drinks[random].idDrink

        // console.log(data.drinks[random])
        // console.log(randomID)
        
        let randomDrink = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + randomID;
          
        getDrink(randomDrink)

      });
    }
  )
  .catch(function(err){
    console.log("fetch error," + err);
  });
  
}

//input selected Category
function selectCateg(x){
  var drinkCateg = x
  var categUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + drinkCateg;

  getDrinkFromCateg(categUrl)
}

//add in click event listener
//uncomment to test out =>

selectCateg(selectedCateg);

//for suggested drink of the day
// var suggestedUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
// getDrink(suggestedUrl);

//uses random suggestedUrl to display random drink picture in the suggested pairing suggestion
// var drinkSug = document.getElementById('drinkSuggestion')
// function getDrink(suggestedUrl){
//   fetch(suggestedUrl)
//   .then(
//     function(response){
//       if (response.status !== 200){
//         console.log("looks like there was a problem");
//         return ;
//       }

//       //creates img src for each suggested drink
//       response.json().then(function(data){
//         drinkSug.innerHTML = 
//         `<img src="${data.drinks[0].strDrinkThumb}" id="randomDrinkSuggestion" class="img-fluid">`
//         console.log(data);
//       });
//     }
//   )
//   .catch(function(err){
//     console.log("fetch error," + err);
//   });
 
// }

// selectCateg(selectedCateg);

//for suggested drink of the day
var suggestedUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
// getDrink(suggestedUrl);

//uses random suggestedUrl to display random drink picture in the suggested pairing suggestion
var drinkSug = document.getElementById('drinkSuggestion')
function getDrink(suggestedUrl){
  fetch(suggestedUrl)
  .then(
    function(response){
      if (response.status !== 200){
        console.log("looks like there was a problem");
        return ;
      }

      //creates img src for each suggested drink
      response.json().then(function(data){
        
        const drinkEntries = Object.entries(data.drinks[0])
          ingredientsArray = drinkEntries
          .filter(([key, value]) => key.startsWith("strIngredient") && value && value.trim())
          .map(([key, value]) => value),
          measuresArray = drinkEntries
          .filter(([key, value]) => key.startsWith("strMeasure") && value && value.trim())
          .map(([key, value]) => value);
        
        
        var toolTipHTML = ``;
        // also for loop thru ingredients.length
        for (i=0; i< ingredientsArray.length; i++){
          if(ingredientsArray[i] && !measuresArray[i]){
            toolTipHTML = toolTipHTML + ingredientsArray[i] + "&#10;"
          } else if (ingredientsArray[i] && measuresArray[i]) {
            toolTipHTML = toolTipHTML + measuresArray[i] + "- "+ ingredientsArray[i] + "&#10;"
          }
        }
        console.log(toolTipHTML);
        

        drinkSug.innerHTML = 
        `<img src="${data.drinks[0].strDrinkThumb}" id="randomDrinkSuggestion" class="img-fluid">
        <div id="suggestedDrinkName" class="has-tooltipl-multiline" style="font-size: 24px" data-tooltip="`+ toolTipHTML + `">${data.drinks[0].strDrink}</div>`


        console.log(data);
      });
    }
  )
  .catch(function(err){
    console.log("fetch error," + err);
  });
  
}


document.getElementById("choose-alc").addEventListener('click', function (e){ 
  e.preventDefault();

  let userDrinkInput = document.getElementById("chosen-category").value;
  console.log("userDrinkInput:", userDrinkInput)

  let userCategUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + userDrinkInput;
  console.log(userCategUrl)

  fetch(userCategUrl)
  .then(
    function(response){
      if (response.status !== 200){
        console.log("looks like there was a problem");
        return;
      }
      response.json().then(function(data){
        // console.log(data);
        
        let random = Math.floor(Math.random() * data.drinks.length);
        
        let randomCategID = data.drinks[random].idDrink

        // console.log(data.drinks[random])
        console.log(randomCategID)
        
        let randomCategDrink = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + randomCategID;
        console.log(randomCategDrink)
          
        function getCategDrink(x){
          fetch(x)
          .then(
            function(response){
              if (response.status !== 200){
                console.log("looks like there was a problem");
                return;
              }
              response.json().then(function(data){
                console.log(data);

                drinkName1 = data.drinks[0].strDrink
                drinkImg1 = data.drinks[0].strDrinkThumb
                document.getElementById("drinkRec1").innerHTML = 
                `<img src="` + drinkImg1 + `" id="suggDrink1Img" class="img-fluid">
                <div id="suggDrink1Name" class="has-tooltipl-multiline" style="font-size: 24px">` + drinkName1 + `</div>`
                
                


              });
            }
          )
          .catch(function(err){
            console.log("fetch error," + err);
          });
          
        }
        getCategDrink(randomCategDrink);
        

      });
    }
  )
  .catch(function(err){
    console.log("fetch error," + err);
  });
   

})
