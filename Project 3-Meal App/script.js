const mealsEl = document.getElementById('meals');
const favMealsContainer = document.getElementById('fav-meals');
const searchTerm = document.getElementById('search-term');
const searchbtn = document.getElementById('search');
const mealPopupEl = document.getElementById('meal-popup');
const btncloseEl = document.getElementById('btn-close-popup');
const mealInfoEl = document.getElementById("meal-info");
getRandonMeal();
fetchFavMeals();

async function getRandonMeal(){
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const data = await resp.json();
    const randomMeal = data.meals[0];

    addMeal(randomMeal, true);
}
async function getMealById(id){
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);

    const respData = await resp.json();

    const meal = respData.meals[0];
    return meal;
}
async function getMealsBySearch(term){
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term);
    const respData = await resp.json();
    const meals = respData.meals;

    return meals;
}
function addMeal(mealData, random = false){
    const meal = document.createElement('div');
    meal.classList.add('meal');
    meal.innerHTML = `
                <div class="meal-header">
                    ${random ? `<span class="random">Random Recipe</span>` : ''}
                        <img src=${mealData.strMealThumb} ${mealData.strMeal}>

                    </div>
                    <div class='meal-body'>
                        <h4>${mealData.strMeal}</h4>
                        <button class='fav-btn'>
                            <i class="fas fa-heart"></i>                       
                        </button>
                    </div>
                </div>
                `;
    const btn = meal.querySelector('.meal-body .fav-btn');
    btn.addEventListener("click", () =>{
        if(btn.classList.contains('active')){
            removeMealFromLS(mealData.idMeal);
            btn.classList.remove('active');
        }else{
            addMealToLS(mealData.idMeal);
            btn.classList.add('active'); 
        }
        fetchFavMeals();
    });
    // meal.addEventListener('click', () => {
    //     updateMealInfo(mealData);
    // })

    mealsEl.appendChild(meal);
}
function addMealToLS(mealId){
    const mealIds = getMealFromLS();
    //basically we are makign a shallow copy of w/e in the storage already and add a new favorite mealId to it.
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}
function addMealtoFav(mealData){
    const meal = document.createElement('li');
    meal.innerHTML = `
        <img
            src="${mealData.strMealThumb}"
            alt="${mealData.strMeal}"
        /><span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-window-close"></i></button>
    `;
    const btn = meal.querySelector('.clear');
    btn.addEventListener("click", () =>{
        removeMealFromLS(mealData.idMeal);
        fetchFavMeals();
    })
    favMealsContainer.appendChild(meal);
}
function getMealFromLS(){
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));
    return mealIds === null ? [] : mealIds;
}
function removeMealFromLS(mealId){
    const mealIds = getMealFromLS();
    localStorage.setItem(
        "mealIds", JSON.stringify(mealIds.filter((id) => id !== mealId))
    );
}
async function fetchFavMeals(){
    favMealsContainer.innerHTML = "";

    const mealIds = getMealFromLS();
    const meals = [];
    for(let i = 0; i < mealIds.length; i++){
        const mealId = mealIds[i];
        const meal = await getMealById(mealId);
        addMealtoFav(meal);
    }
    console.log(meals);
    //add to screen;
}
searchbtn.addEventListener('click', async ()=>{
    mealsEl.innerHTML = '';
    const searchValue = searchTerm.value;
    const meals = await getMealsBySearch(searchValue);
    if(meals){
        meals.forEach(meal =>{
            addMeal(meal);
        });
    }
   
});
btncloseEl.addEventListener('click',() =>{
    mealPopupEl.classList.add('hidden');
});

function updateMealInfo(mealData){
    const mealInfo = document.createElement('div');
    mealInfo.innerHTML = `
            <h1>${mealData.strMeal}</h1>
                <img src=${mealData.strMealThumb}" alt="">
                <div>
                    <p>${mealData.strInstructions}</p>
                </div>`
    mealInfo.appendChild(mealInfo);
    mealPopupEl.classList.remove('hidden');
    
}