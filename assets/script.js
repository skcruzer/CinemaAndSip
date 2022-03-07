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
    // console.log($target);

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


//for suggested drink of the day
var suggestedUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php"

//uses random suggestedUrl to display random drink picture in the suggested pairing suggestion
var drinkSug = document.getElementById('drinkSuggestion')
function getSuggDrink(suggestedUrl) {
  fetch(suggestedUrl)
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log("looks like there was a problem");
          return;
        }

        //creates img src for each suggested drink
        response.json().then(function (data) {

          const drinkEntries = Object.entries(data.drinks[0])
          ingredientsArray = drinkEntries
            .filter(([key, value]) => key.startsWith("strIngredient") && value && value.trim())
            .map(([key, value]) => value),
            measuresArray = drinkEntries
              .filter(([key, value]) => key.startsWith("strMeasure") && value && value.trim())
              .map(([key, value]) => value);


          var toolTipHTML = ``;
          // also for loop thru ingredients.length
          for (i = 0; i < ingredientsArray.length; i++) {
            if (ingredientsArray[i] && !measuresArray[i]) {
              toolTipHTML = toolTipHTML + ingredientsArray[i] + "&#10;"
            } else if (ingredientsArray[i] && measuresArray[i]) {
              toolTipHTML = toolTipHTML + measuresArray[i] + "- " + ingredientsArray[i] + "&#10;"
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
    .catch(function (err) {
      console.log("fetch error," + err);
    });

}
getSuggDrink(suggestedUrl);

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
        console.log(data);
        
        let random1 = Math.floor(Math.random() * data.drinks.length);
        let random2 = Math.floor(Math.random() * data.drinks.length);
        let random3 = Math.floor(Math.random() * data.drinks.length);
        let random4 = Math.floor(Math.random() * data.drinks.length);
        let random5 = Math.floor(Math.random() * data.drinks.length);
        
        let randomCategID1 = data.drinks[random1].idDrink
        let randomCategID2 = data.drinks[random2].idDrink
        let randomCategID3 = data.drinks[random3].idDrink
        let randomCategID4 = data.drinks[random4].idDrink
        let randomCategID5 = data.drinks[random5].idDrink
        
        let randomCategDrink1 = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + randomCategID1;
        let randomCategDrink2 = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + randomCategID2;
        let randomCategDrink3 = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + randomCategID3;
        let randomCategDrink4 = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + randomCategID4;
        let randomCategDrink5 = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + randomCategID5;
          
        function getCategDrink1(x){
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
                const drinkEntries = Object.entries(data.drinks[0])
                  ingredientsArray = drinkEntries
                  .filter(([key, value]) => key.startsWith("strIngredient") && value && value.trim())
                  .map(([key, value]) => value),
                  measuresArray = drinkEntries
                  .filter(([key, value]) => key.startsWith("strMeasure") && value && value.trim())
                  .map(([key, value]) => value);
                
                var toolTipHTML1 = ``;
                // also for loop thru ingredients.length
                for (i = 0; i < ingredientsArray.length; i++) {
                  if (ingredientsArray[i] && !measuresArray[i]) {
                  toolTipHTML1 = toolTipHTML1 + ingredientsArray[i] + "&#10;"
                  } else if (ingredientsArray[i] && measuresArray[i]) {
                  toolTipHTML1 = toolTipHTML1 + measuresArray[i] + "- " + ingredientsArray[i] + "&#10;"
                }
                }
                console.log(toolTipHTML1);

                document.getElementById("drinkRec1").innerHTML = 
                `<img src="` + drinkImg1 + `" id="suggDrink1Img" class="img-fluid">
                <div id="suggDrink1Name" class="has-tooltipl-multiline" style="font-size: 24px"data-tooltip="`+ toolTipHTML1 + `">` + drinkName1 + `</div>`
                
              });
            }
          )
          .catch(function(err){
            console.log("fetch error," + err);
          });
          
        }
        getCategDrink1(randomCategDrink1);

        function getCategDrink2(x){
          fetch(x)
          .then(
            function(response){
              if (response.status !== 200){
                console.log("looks like there was a problem");
                return;
              }
              response.json().then(function(data){
                console.log(data);

                drinkName2 = data.drinks[0].strDrink
                drinkImg2 = data.drinks[0].strDrinkThumb
                const drinkEntries = Object.entries(data.drinks[0])
                  ingredientsArray = drinkEntries
                  .filter(([key, value]) => key.startsWith("strIngredient") && value && value.trim())
                  .map(([key, value]) => value),
                  measuresArray = drinkEntries
                  .filter(([key, value]) => key.startsWith("strMeasure") && value && value.trim())
                  .map(([key, value]) => value);
                
                var toolTipHTML2 = ``;
                // also for loop thru ingredients.length
                for (i = 0; i < ingredientsArray.length; i++) {
                  if (ingredientsArray[i] && !measuresArray[i]) {
                  toolTipHTML2 = toolTipHTML2 + ingredientsArray[i] + "&#10;"
                  } else if (ingredientsArray[i] && measuresArray[i]) {
                  toolTipHTML2 = toolTipHTML2 + measuresArray[i] + "- " + ingredientsArray[i] + "&#10;"
                }
                }
                console.log(toolTipHTML2);

                document.getElementById("drinkRec2").innerHTML = 
                `<img src="` + drinkImg2 + `" id="suggDrink2Img" class="img-fluid">
                <div id="suggDrink2Name" class="has-tooltipl-multiline" style="font-size: 24px" data-tooltip="`+ toolTipHTML2 + `">` + drinkName2 + `</div>`
                
              });
            }
          )
          .catch(function(err){
            console.log("fetch error," + err);
          });
          
        }
        getCategDrink2(randomCategDrink2);
        
        function getCategDrink3(x){
          fetch(x)
          .then(
            function(response){
              if (response.status !== 200){
                console.log("looks like there was a problem");
                return;
              }
              response.json().then(function(data){
                console.log(data);

                drinkName3 = data.drinks[0].strDrink
                drinkImg3 = data.drinks[0].strDrinkThumb
                const drinkEntries = Object.entries(data.drinks[0])
                  ingredientsArray = drinkEntries
                  .filter(([key, value]) => key.startsWith("strIngredient") && value && value.trim())
                  .map(([key, value]) => value),
                  measuresArray = drinkEntries
                  .filter(([key, value]) => key.startsWith("strMeasure") && value && value.trim())
                  .map(([key, value]) => value);
                
                var toolTipHTML3 = ``;
                // also for loop thru ingredients.length
                for (i = 0; i < ingredientsArray.length; i++) {
                  if (ingredientsArray[i] && !measuresArray[i]) {
                  toolTipHTML3 = toolTipHTML3 + ingredientsArray[i] + "&#10;"
                  } else if (ingredientsArray[i] && measuresArray[i]) {
                  toolTipHTML3 = toolTipHTML3 + measuresArray[i] + "- " + ingredientsArray[i] + "&#10;"
                }
                }
                console.log(toolTipHTML3);

                document.getElementById("drinkRec3").innerHTML = 
                `<img src="` + drinkImg3 + `" id="suggDrink3Img" class="img-fluid">
                <div id="suggDrink3Name" class="has-tooltipl-multiline" style="font-size: 24px" data-tooltip="`+ toolTipHTML3 + `">` + drinkName3 + `</div>`
                
              });
            }
          )
          .catch(function(err){
            console.log("fetch error," + err);
          });
          
        }
        getCategDrink3(randomCategDrink3);

        function getCategDrink4(x){
          fetch(x)
          .then(
            function(response){
              if (response.status !== 200){
                console.log("looks like there was a problem");
                return;
              }
              response.json().then(function(data){
                console.log(data);

                drinkName4 = data.drinks[0].strDrink
                drinkImg4 = data.drinks[0].strDrinkThumb
                const drinkEntries = Object.entries(data.drinks[0])
                  ingredientsArray = drinkEntries
                  .filter(([key, value]) => key.startsWith("strIngredient") && value && value.trim())
                  .map(([key, value]) => value),
                  measuresArray = drinkEntries
                  .filter(([key, value]) => key.startsWith("strMeasure") && value && value.trim())
                  .map(([key, value]) => value);
                
                var toolTipHTML4 = ``;
                // also for loop thru ingredients.length
                for (i = 0; i < ingredientsArray.length; i++) {
                  if (ingredientsArray[i] && !measuresArray[i]) {
                  toolTipHTML4 = toolTipHTML4 + ingredientsArray[i] + "&#10;"
                  } else if (ingredientsArray[i] && measuresArray[i]) {
                  toolTipHTML4 = toolTipHTML4 + measuresArray[i] + "- " + ingredientsArray[i] + "&#10;"
                }
                }
                console.log(toolTipHTML4);

                document.getElementById("drinkRec4").innerHTML = 
                `<img src="` + drinkImg4 + `" id="suggDrink4Img" class="img-fluid">
                <div id="suggDrink4Name" class="has-tooltipl-multiline" style="font-size: 24px" data-tooltip="`+ toolTipHTML4 + `">` + drinkName4 + `</div>`
                
              });
            }
          )
          .catch(function(err){
            console.log("fetch error," + err);
          });
          
        }
        getCategDrink4(randomCategDrink4);

        function getCategDrink5(x){
          fetch(x)
          .then(
            function(response){
              if (response.status !== 200){
                console.log("looks like there was a problem");
                return;
              }
              response.json().then(function(data){
                console.log(data);

                drinkName5 = data.drinks[0].strDrink
                drinkImg5 = data.drinks[0].strDrinkThumb
                const drinkEntries = Object.entries(data.drinks[0])
                  ingredientsArray = drinkEntries
                  .filter(([key, value]) => key.startsWith("strIngredient") && value && value.trim())
                  .map(([key, value]) => value),
                  measuresArray = drinkEntries
                  .filter(([key, value]) => key.startsWith("strMeasure") && value && value.trim())
                  .map(([key, value]) => value);
                
                var toolTipHTML5 = ``;
                // also for loop thru ingredients.length
                for (i = 0; i < ingredientsArray.length; i++) {
                  if (ingredientsArray[i] && !measuresArray[i]) {
                  toolTipHTML5 = toolTipHTML5 + ingredientsArray[i] + "&#10;"
                  } else if (ingredientsArray[i] && measuresArray[i]) {
                  toolTipHTML5 = toolTipHTML5 + measuresArray[i] + "- " + ingredientsArray[i] + "&#10;"
                }
                }
                console.log(toolTipHTML5);

                document.getElementById("drinkRec5").innerHTML = 
                `<img src="` + drinkImg5 + `" id="suggDrink5Img" class="img-fluid">
                <div id="suggDrink5Name" class="has-tooltipl-multiline" style="font-size: 24px" data-tooltip="`+ toolTipHTML5 + `">` + drinkName5 + `</div>`
                
              });
            }
          )
          .catch(function(err){
            console.log("fetch error," + err);
          });
          
        }
        getCategDrink5(randomCategDrink5);
      });
    }
  )
  .catch(function(err){
    console.log("fetch error," + err);
  });

})