const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn= document.querySelector('.recipe-close-btn');

const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Loadig Recipes...</h2>";
    try {
        
    
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('Div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML=`
        <img src = "${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belong to <span>${meal.strCategory}</span> Category</p>
        `
        const button = document.createElement('button');
        button.textContent= "View Recipe";
        recipeDiv.appendChild(button);
        button.addEventListener('click', ()=>{
            openRecipePopup(meal);
        });
        recipeContainer.appendChild(recipeDiv);
    });
} catch (error) {
    recipeContainer.innerHTML = "<h2>Error in Loading Recipes...</h2>";
}
   //console.log(response);
}

const fetchIngredients = (meal) =>{
    let IngredientsList ="";
    for(let i=1; i<=20; i++){
        const Ingredient = meal[`strIngredient${i}`];
        if(Ingredient){
            const measure = meal[`strMeasure${i}`];
            IngredientsList += `<li>${measure} ${Ingredient}</li>`
        }
        else{
            break;
        }
    }
    return IngredientsList;
}

const openRecipePopup =(meal) =>{
    recipeDetailsContent.innerHTML = `
    <h2 class ="recipeName">${meal.strMeal}</h2>
     <h3>Ingredents:</h3>
    <ul class = "ingredientsList">${fetchIngredients(meal)}</ul>
    <div class = "recipeInstructions">
        <h3>Instruction:</h3>
        <p>${meal.strInstructions}</p>
     </div>
    `
    
    recipeDetailsContent.parentElement.style.display = "block";
}
recipeCloseBtn.addEventListener('click', () => {
    recipeDetailsContent.parentElement.style.display = "none";
});
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();

    if(!searchInput){
        recipeContainer.innerHTML = `<h2>Type the meal you want to search.</h2>`;
        return;
    }
    fetchRecipes(searchInput);
    //console.log("clicked");
});