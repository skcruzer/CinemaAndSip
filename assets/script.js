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
<<<<<<< HEAD
//take search input value
=======
  //take search input value
>>>>>>> 71b23af537380cf584a22f35f9edf5a280881873

let drinkName
let drinkImg
let drinkIngr = []
let drinkInstr

<<<<<<< HEAD
function getIngr(x) {
  fetch(x)
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log("looks like there was a problem");
          return;
        }
        response.json().then(function (data) {
          let ingr1 = data.drinks[0].strIngredient1
          drinkIngr.push(ingr1)

          let ingr2 = data.drinks[0].strIngredient2
          if (!ingr2) {
            return
          }
          drinkIngr.push(ingr2)

          let ingr3 = data.drinks[0].strIngredient3
          if (!ingr3) {
            return
          }
          drinkIngr.push(ingr3)

          let ingr4 = data.drinks[0].strIngredient4
          if (!ingr4) {
            return
          }
          drinkIngr.push(ingr4)

          let ingr5 = data.drinks[0].strIngredient5
          if (!ingr5) {
            return
          }
          drinkIngr.push(ingr5)

          let ingr6 = data.drinks[0].strIngredient6
          if (!ingr6) {
            return
          }
          drinkIngr.push(ingr6)

        });
      }
    )
    .catch(function (err) {
      console.log("fetch error," + err);
    });
}

function getDrink(x) {
  fetch(x)
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log("looks like there was a problem");
          return;
        }
        response.json().then(function (data) {
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
    .catch(function (err) {
      console.log("fetch error," + err);
    });
=======
function getIngr(x){
  fetch(x)
  .then(
    function(response){
      if (response.status !== 200){
        console.log("looks like there was a problem");
        return;
      }
      response.json().then(function(data){
        let ingr1 = data.drinks[0].strIngredient1
        let meas1 = data.drinks[0].strMeasure1

        drinkIngr.push({[ingr1]: meas1})

        let ingr2 = data.drinks[0].strIngredient2
        let meas2 = data.drinks[0].strMeasure2
          if (!ingr2){
            return
          }        
        drinkIngr.push({[ingr2]: meas2})
          
        let ingr3 = data.drinks[0].strIngredient3
        let meas3 = data.drinks[0].strMeasure3
          if (!ingr3){
            return
          }
        drinkIngr.push({[ingr3]: meas3})

        let ingr4 = data.drinks[0].strIngredient4
        let meas4 = data.drinks[0].strMeasure4
          if (!ingr4){
            return
          }
        drinkIngr.push({[ingr4]: meas4})

        let ingr5 = data.drinks[0].strIngredient5
        let meas5 = data.drinks[0].strMeasure5
          if (!ingr5){
            return
          }
        drinkIngr.push({[ingr5]: meas5})

        let ingr6 = data.drinks[0].strIngredient6
        let meas6 = data.drinks[0].strMeasure6
          if (!ingr6){
            return
          }
        drinkIngr.push({[ingr6]: meas6})

      });
    }
  )
  .catch(function(err){
    console.log("fetch error," + err);
  });
}

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
>>>>>>> 71b23af537380cf584a22f35f9edf5a280881873
  getIngr(x);
  console.log(drinkIngr)
}


//getDrink through search value
<<<<<<< HEAD
var drinkInputValue = "margarita"

function inputDrinkName(x) {
  var searchDrink = x
  var searchUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchDrink

=======
var drinkInputValue = "margarita"    

function inputDrinkName(x){
  var searchDrink = x
  var searchUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + searchDrink
  
>>>>>>> 71b23af537380cf584a22f35f9edf5a280881873
  getDrink(searchUrl)
}

//add in click event listener
//uncomment to test out =>
// inputDrinkName(drinkInputValue)



//random drink from selected category
<<<<<<< HEAD
//take category input from dropdown
//top ingrdients are vodka, gin, rum, tequila, etc. 
=======
  //take category input from dropdown
  //top ingrdients are vodka, gin, rum, tequila, etc. 
>>>>>>> 71b23af537380cf584a22f35f9edf5a280881873
// var selectedCat = ... input value
//ex: 
var selectedCateg = "vodka"

//randomizie selected drink from within category
<<<<<<< HEAD
function getDrinkFromCateg(x) {
  fetch(x)
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log("looks like there was a problem");
          return;
        }
        response.json().then(function (data) {
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
    .catch(function (err) {
      console.log("fetch error," + err);
    });

}

//input selected Category
function selectCateg(x) {
=======
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
>>>>>>> 71b23af537380cf584a22f35f9edf5a280881873
  var drinkCateg = x
  var categUrl = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + drinkCateg;

  getDrinkFromCateg(categUrl)
}

//add in click event listener
//uncomment to test out =>
<<<<<<< HEAD
// selectCateg(selectedCateg);
=======
// selectCateg(selectedCateg);

//for suggested drink of the day
var suggestedUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php"
// getDrink(suggestedUrl);
>>>>>>> 71b23af537380cf584a22f35f9edf5a280881873
