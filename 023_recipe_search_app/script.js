const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const recipeResults = document.getElementById('recipe-results');
const errorMessage = document.getElementById('error-message');

// Modal elements
const modal = document.getElementById('recipe-modal');
const modalContent = document.getElementById('modal-recipe-content');
const closeModalBtn = document.querySelector('.close-btn');

const MEALDB_SEARCH_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const MEALDB_LOOKUP_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

// --- Event Listeners ---
searchBtn.addEventListener('click', fetchRecipes);
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        fetchRecipes();
    }
});
closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
});

// --- Functions ---

async function fetchRecipes() {
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) {
        errorMessage.textContent = 'Please enter a meal name.';
        recipeResults.innerHTML = '';
        return;
    }

    errorMessage.textContent = `Searching for "${searchTerm}"...`;
    recipeResults.innerHTML = '';

    try {
        const response = await fetch(`${MEALDB_SEARCH_URL}${searchTerm}`);
        const data = await response.json();

        if (data.meals) {
            errorMessage.textContent = ''; // Clear message on success
            displayRecipes(data.meals);
        } else {
            errorMessage.textContent = `No recipes found for "${searchTerm}".`;
        }
    } catch (error) {
        errorMessage.textContent = 'An error occurred. Please check your connection.';
        console.error('Error:', error);
    }
}

function displayRecipes(meals) {
    recipeResults.innerHTML = ''; // Clear previous results
    meals.forEach(meal => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.setAttribute('data-meal-id', meal.idMeal);
        recipeCard.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <h3>${meal.strMeal}</h3>
        `;
        recipeCard.addEventListener('click', () => fetchRecipeDetails(meal.idMeal));
        recipeResults.appendChild(recipeCard);
    });
}

async function fetchRecipeDetails(mealId) {
    try {
        const response = await fetch(`${MEALDB_LOOKUP_URL}${mealId}`);
        const data = await response.json();
        if (data.meals && data.meals[0]) {
            displayRecipeDetails(data.meals[0]);
        } else {
            alert('Could not find recipe details.');
        }
    } catch (error) {
        alert('An error occurred while fetching details.');
        console.error('Error fetching details:', error);
    }
}

function displayRecipeDetails(meal) {
    let ingredientsHtml = '<ul>';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredientsHtml += `<li>${ingredient} - ${measure}</li>`;
        }
    }
    ingredientsHtml += '</ul>';

    modalContent.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>Ingredients</h3>
        ${ingredientsHtml}
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
        ${meal.strYoutube ? `<a href="${meal.strYoutube}" target="_blank">Watch on YouTube</a>` : ''}
    `;

    modal.style.display = 'block';
}
