import { filterByPrice, houseLoader } from './house-list.js';

// Get elements from html
const PRICE_FILTER_BTN = document.getElementById('price-filter-btn');
const CLEAR_FILTERS_BTN = document.getElementById('clear-filters-btn');
const PRICE_RANGE = document.getElementById('price-range');
const PRICE_FILTER = document.getElementById('price-filter');

// show the price filter when te button is clicked
PRICE_FILTER_BTN.addEventListener('click', () => {
    PRICE_RANGE.style.display = PRICE_RANGE.style.display === 'none' ? 'inline-block' : 'none';
});

// clean filters
CLEAR_FILTERS_BTN.addEventListener('click', () => {
    PRICE_FILTER.value = 0; // default price range
    PRICE_RANGE.style.display = 'none'; // hide price range
    houseLoader() // reload without filter
});

// Actualizar el precio máximo seleccionado
PRICE_FILTER.addEventListener('input', () => {
    filterByPrice(PRICE_FILTER.value); // Reload house with the filter
});