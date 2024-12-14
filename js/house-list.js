import { addToWishlist, rentHouse } from './user-handler.js'
const HOUSE_CONTAINER = document.getElementById('house-list');

export function houseLoader() {
    let CONTENT = ''; // we have to ensure that there´s not previous html
    HOUSE_CONTAINER.innerHTML = CONTENT;
    fetch('../data/house-list.json') // GET json
        .then(RESPONSE => RESPONSE.json())
        .then(DATA => {
            let CONTENT = ''; // same here
            DATA.forEach((ELEMENT, INDEX) => { // for each element, creates a property card.. could be better with react  or pug.
                CONTENT += `
                  <div class="property-card" id="${INDEX}">
                      <img src="${ELEMENT.image}" alt="${ELEMENT.title}">
                      <div class="details">
                          <h3>${ELEMENT.title} 
                              <i class="bi bi-heart wishlist-icon" data-id="${INDEX}"></i>
                          </h3>
                          <p>${ELEMENT.description}</p>
                          <p class="price">${ELEMENT.price} IVA Incluido</p>
                      </div>
                  </div>
                `;
            });
            HOUSE_CONTAINER.innerHTML = CONTENT; // inject the generated html in the body

            document.querySelectorAll('.wishlist-icon').forEach(ICON => { // for each heart icon
                ICON.addEventListener('click', function (EVENT) {
                    EVENT.stopPropagation(); // stop the propagation of the events and get only the 1st
                    const HOUSE_ID = this.getAttribute('data-id'); 
                    if (this.style.color == 'red') {
                        this.style.color = 'black';
                    } else { 
                        this.style.color = 'red'; // notging to explain
                    }
                    addToWishlist(HOUSE_ID);
                });
            });

            document.querySelectorAll('.property-card').forEach(CARD => {
                CARD.addEventListener('click', function () {
                    const HOUSE_ID = this.id;
                    rentHouse(HOUSE_ID); // if click on the property card, "rent the house"
                });
            });
        })
        .catch(ERROR => console.error('Error al obtener los datos:', ERROR));
}

export function filterByPrice(PRICE) {
    fetch('../data/house-list.json')
        .then(RESPONSE => RESPONSE.json())
        .then(DATA => {
            let CONTENT = '';
            for (let I = 0; I < DATA.length; I++) {
                const HOUSE = DATA[I];

                if (Number(HOUSE.price.split("€")[0]) <= PRICE) { // same as above, but, if the price given by the user is lower that the house, display it.
                    CONTENT += `
                        <div class="property-card" id="${I}">
                            <img src="${HOUSE.image}" alt="${HOUSE.title}">
                            <div class="details">
                                <h3>${HOUSE.title} 
                                    <i class="bi bi-heart wishlist-icon" data-id="${I}"></i>
                                </h3>
                                <p>${HOUSE.description}</p>
                                <p class="price">${HOUSE.price} IVA Incluido</p>
                            </div>
                        </div>
                    `;
                }
            }

            HOUSE_CONTAINER.innerHTML = CONTENT;

            document.querySelectorAll('.wishlist-icon').forEach(ICON => {
                ICON.addEventListener('click', function (EVENT) {
                    EVENT.stopPropagation();
                    const HOUSE_ID = this.getAttribute('data-id');
                    addToWishlist(HOUSE_ID);
                });
            });

            document.querySelectorAll('.property-card').forEach(CARD => {
                CARD.addEventListener('click', function () {
                    const HOUSE_ID = this.id;
                    rentHouse(HOUSE_ID);
                });
            });
        })
        .catch(ERROR => console.error('Error al obtener los datos:', ERROR));
}

houseLoader();