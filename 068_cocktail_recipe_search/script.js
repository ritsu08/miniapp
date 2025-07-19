const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const cocktailResults = document.getElementById('cocktail-results');
const errorMessage = document.getElementById('error-message');

// Modal elements
const modal = document.getElementById('cocktail-modal');
const modalContent = document.getElementById('modal-cocktail-content');
const closeModalBtn = document.querySelector('.close-btn');

const COCKTAILDB_SEARCH_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const COCKTAILDB_LOOKUP_URL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

// --- Event Listeners ---
searchBtn.addEventListener('click', fetchCocktails);
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        fetchCocktails();
    }
});
closeModalBtn.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => {
    if (e.target == modal) {
        modal.style.display = 'none';
    }
});

// --- Functions ---

async function fetchCocktails() {
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) {
        errorMessage.textContent = 'Please enter a cocktail name.';
        cocktailResults.innerHTML = '';
        return;
    }

    errorMessage.textContent = `Searching for "${searchTerm}"...`;
    cocktailResults.innerHTML = '';

    try {
        const response = await fetch(`${COCKTAILDB_SEARCH_URL}${searchTerm}`);
        const data = await response.json();

        if (data.drinks) {
            errorMessage.textContent = ''; // Clear message on success
            displayCocktails(data.drinks);
        } else {
            errorMessage.textContent = `No cocktails found for "${searchTerm}".`;
        }
    } catch (error) {
        errorMessage.textContent = 'An error occurred. Please check your connection.';
        console.error('Error fetching cocktails:', error);
    }
}

function displayCocktails(drinks) {
    cocktailResults.innerHTML = ''; // Clear previous results
    drinks.forEach(drink => {
        const cocktailCard = document.createElement('div');
        cocktailCard.classList.add('cocktail-card');
        cocktailCard.setAttribute('data-drink-id', drink.idDrink);
        cocktailCard.innerHTML = `
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
            <h3>${drink.strDrink}</h3>
        `;
        cocktailCard.addEventListener('click', () => fetchCocktailDetails(drink.idDrink));
        cocktailResults.appendChild(cocktailCard);
    });
}

async function fetchCocktailDetails(drinkId) {
    try {
        const response = await fetch(`${COCKTAILDB_LOOKUP_URL}${drinkId}`);
        const data = await response.json();
        if (data.drinks && data.drinks[0]) {
            displayCocktailDetails(data.drinks[0]);
        } else {
            alert('Could not find cocktail details.');
        }
    } catch (error) {
        alert('An error occurred while fetching details.');
        console.error('Error fetching details:', error);
    }
}

function displayCocktailDetails(drink) {
    let ingredientsHtml = '<ul>';
    for (let i = 1; i <= 15; i++) { // Cocktails typically have up to 15 ingredients
        const ingredient = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== '') {
            ingredientsHtml += `<li>${ingredient} - ${measure}</li>`;
        }
    }
    ingredientsHtml += '</ul>';

    modalContent.innerHTML = `
        <h2>${drink.strDrink}</h2>
        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
        <h3>Ingredients</h3>
        ${ingredientsHtml}
        <h3>Instructions</h3>
        <p>${drink.strInstructions}</p>
        ${drink.strVideo ? `<a href="${drink.strVideo}" target="_blank">Watch on YouTube</a>` : ''}
    `;

    modal.style.display = 'block';
}
