const REGISTER_MODAL = document.getElementById("register-modal");
const LOGIN_MODAL = document.getElementById('login-modal');
const REG_BTN = document.getElementById("register-modal-opener");
const LOG_BTN = document.getElementById('login-modal-opener');
const CLOSE_MODAL = document.getElementsByClassName("close")[0];
const CLOSE_LOGIN_MODAL = document.getElementsByClassName("close")[1];
const CLOSE_WISH_MODAL = document.getElementsByClassName("close")[2];
const BUTTON_REGISTER = document.getElementById('submit-register');
const BUTTON_LOGIN = document.getElementById('submit-login');
const SEE_WISHLIST = document.getElementById('wishlist-viewer');
const WISHLIST = document.getElementById('wishlist');
const WISHLIST_CONTAINER = document.getElementById('wishlist-container');
const CLOSE_BOOK_MODAL = document.getElementsByClassName('close')[3];



const SEE_BOOKINGS = document.getElementById('bookings-viewer');
const BOOKINGS = document.getElementById('bookings');
const BOOKINGS_CONTAINER = document.getElementById('bookings-container');


import { initializeApp as INITIALIZE_APP } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth as GET_AUTH, createUserWithEmailAndPassword as CREATE_USER_WITH_EMAIL_AND_PASSWORD, signInWithEmailAndPassword as SIGN_IN_WITH_EMAIL_AND_PASSWORD, updateProfile as UPDATE_PROFILE } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore as GET_FIRESTORE, doc as DOC, setDoc as SET_DOC, getDoc as GET_DOC, arrayUnion as ARRAY_UNION, arrayRemove as ARRAY_REMOVE } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getDatabase, ref, onValue, push, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Firebase config
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyC1rzgKotUmuqYdrFcZ71bCAHEfo0rNm2c",
  authDomain: "proyecto-lnd-8a35f.firebaseapp.com",
  projectId: "proyecto-lnd-8a35f",
  storageBucket: "proyecto-lnd-8a35f.appspot.com",
  messagingSenderId: "1076534043083",
  appId: "1:1076534043083:web:df702ce4d24aeff779964e"
};

// firebase initialization
const APP = INITIALIZE_APP(FIREBASE_CONFIG);

const AUTH = GET_AUTH(APP);
const DB = GET_FIRESTORE(APP);

REG_BTN.onclick = function () {
  REGISTER_MODAL.style.display = "block";
};

CLOSE_MODAL.onclick = function () {
  REGISTER_MODAL.style.display = "none";
};
CLOSE_LOGIN_MODAL.onclick = function () {
  LOGIN_MODAL.style.display = "none";
};
CLOSE_WISH_MODAL.onclick = function () {
  WISHLIST.style.display = "none";
};
CLOSE_BOOK_MODAL.onclick = function () {
  BOOKINGS.style.display = "none";
};
LOG_BTN.onclick = function () {
  LOGIN_MODAL.style.display = "block";
};

window.onclick = function (EVENT) {
  if (EVENT.target == REGISTER_MODAL) {
    REGISTER_MODAL.style.display = "none";
  }
};

BUTTON_REGISTER.addEventListener('click', function (EVENT) {
  EVENT.preventDefault();

  const IS_VALID_PASS = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/; // regex that checks the password
 // validation..
  const FIRST_NAME = document.getElementById('first-name').value;
  const LAST_NAME = document.getElementById('last-name').value;
  const EMAIL = document.getElementById('email').value;
  const PASSWORD = document.getElementById('password').value;

  let IS_VALID = true;

  if (FIRST_NAME.trim() === "") {
    document.getElementById('error-first-name').style.display = 'block';
    document.getElementById('first-name').style.borderColor = 'red';
    IS_VALID = false;
  } else {
    document.getElementById('error-first-name').style.display = 'none';
    document.getElementById('first-name').style.borderColor = '';
  }
 
  if (LAST_NAME.trim() === "") {
    document.getElementById('error-second-name').style.display = 'block';
    document.getElementById('last-name').style.borderColor = 'red';
    IS_VALID = false;
  } else {
    document.getElementById('error-second-name').style.display = 'none';
    document.getElementById('last-name').style.borderColor = '';
  }

  const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!EMAIL_PATTERN.test(EMAIL)) {
    document.getElementById('error-email').style.display = 'block';
    document.getElementById('email').style.borderColor = 'red';
    IS_VALID = false;
  } else {
    document.getElementById('error-email').style.display = 'none';
    document.getElementById('email').style.borderColor = '';
  }

  if (!IS_VALID_PASS.test(PASSWORD)) {
    document.getElementById('error-password').style.display = 'block';
    document.getElementById('password').style.borderColor = 'red';
    IS_VALID = false;
  } else {
    document.getElementById('error-password').style.display = 'none';
    document.getElementById('password').style.borderColor = '';
  }

  if (IS_VALID) {
    registerWithEmail(EMAIL, PASSWORD, FIRST_NAME, LAST_NAME);
  } else {
    console.log("Hay errores en el formulario.");
  }
});

BUTTON_LOGIN.addEventListener('click', function (EVENT) {
  EVENT.preventDefault();
  const IS_VALID_PASS = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
  const EMAIL = document.getElementById('login-email').value;
  const PASSWORD = document.getElementById('login-password').value;

  let IS_VALID = true;

  const EMAIL_PATTERN = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!EMAIL_PATTERN.test(EMAIL)) {
    document.getElementById('login-error-email').style.display = 'block';
    document.getElementById('login-email').style.borderColor = 'red';
    IS_VALID = false;
  } else {
    document.getElementById('login-error-email').style.display = 'none';
    document.getElementById('login-email').style.borderColor = '';
  }

  if (!IS_VALID_PASS.test(PASSWORD)) {
    document.getElementById('login-error-password').style.display = 'block';
    document.getElementById('login-password').style.borderColor = 'red';
    IS_VALID = false;
  } else {
    document.getElementById('login-error-password').style.display = 'none';
    document.getElementById('login-password').style.borderColor = '';
  }

  if (IS_VALID) {
    loginWithEmail(EMAIL, PASSWORD);
  } else {
    console.log("Hay errores en el formulario.");
  }
});

SEE_WISHLIST.addEventListener('click', async function () {
  WISHLIST.style.display = 'flex';
  WISHLIST_CONTAINER.innerHTML = '';

  const WISHLIST_DATA = await getUserData(localStorage.getItem('uid'));
  const HOUSE_LIST = await fetch('../data/house-list.json')
    .then(RESPONSE => RESPONSE.json())
    .then(DATA => DATA)
    .catch(ERROR => {
      console.error('Error al cargar las casas desde el archivo JSON:', ERROR);
      return [];
    });

  for (let INDEX = 0; INDEX < WISHLIST_DATA.wishlistArray.length; INDEX++) {
    const HOUSE_INDEX = WISHLIST_DATA.wishlistArray[INDEX];
    if (HOUSE_INDEX >= 0 && HOUSE_INDEX < HOUSE_LIST.length) {
      const HOUSE_DATA = HOUSE_LIST[HOUSE_INDEX];
      WISHLIST_CONTAINER.innerHTML += `
                <div class="wishlist-card">
                    <div class="wishlist-card-header">
                        <img src="${HOUSE_DATA.image}" alt="${HOUSE_DATA.title}" class="wishlist-card-image">
                        <div class="wishlist-card-info">
                            <h3 class="wishlist-card-title">${HOUSE_DATA.title}</h3>
                            <p class="wishlist-card-description">${HOUSE_DATA.description}</p>
                        </div>
                    </div>
                    <div class="wishlist-card-footer">
                        <p class="wishlist-card-price">${HOUSE_DATA.price} <span>IVA incluido</span></p>
                        <button class="remove-from-wishlist" id="${HOUSE_INDEX}">Eliminar</button>
                    </div>
                </div>
            `;
    } else {
      console.error("error");
    }
  }
});

SEE_BOOKINGS.addEventListener('click', async function () {
  BOOKINGS.style.display = 'flex';
  cartLoader();
});

BOOKINGS_CONTAINER.addEventListener('click', async function (EVENT) {
  if (EVENT.target.classList.contains('remove-from-bookings')) {
    const HOUSE_ID = EVENT.target.id;
    rentHouse(HOUSE_ID);
  }
});

WISHLIST_CONTAINER.addEventListener('click', async function (EVENT) {
  if (EVENT.target.classList.contains('remove-from-wishlist')) {
    const WISHLIST_ID = EVENT.target.id;
    addToWishlist(WISHLIST_ID);
  }
});

// functions 
export async function addToWishlist(HOUSE_ID) {
  if (!HOUSE_ID) {
    console.log("No se proporcionó ningún ID para manejar en la wishlist.");
    return;
  }

  const USER_ID = localStorage.getItem("uid");
  if (!USER_ID) {
    console.error("No se encontró el UID del usuario en localStorage.");
    return;
  }

  const USER_REF = DOC(DB, "users", USER_ID);

  try {
    const DOC_SNAP = await GET_DOC(USER_REF); // get data uf the referenced user.

    if (DOC_SNAP.exists()) { // if the data exist, save the array in a constant
      const USER_DATA = DOC_SNAP.data();
      const WISHLIST_ARRAY = USER_DATA.wishlistArray || [];

      if (WISHLIST_ARRAY.includes(HOUSE_ID)) { // double use function. if the house isnt int the wishlist, add it. if is, remove it.
        sendMessage("Producto eliminado de la lista de deseos.");
        await SET_DOC(
          USER_REF,
          { wishlistArray: ARRAY_REMOVE(HOUSE_ID) },
          { merge: true }
        );
        console.log(`ID ${HOUSE_ID} eliminado de la wishlist.`);
      } else {
        sendMessage("Producto añadido a la lista de deseos.");
        await SET_DOC(
          USER_REF,
          { wishlistArray: ARRAY_UNION(HOUSE_ID) },
          { merge: true }
        );
        console.log(`ID ${HOUSE_ID} agregado a la wishlist.`);
      }
    } else {
      console.log("El documento del usuario no existe, creando una nueva wishlist.");
      await SET_DOC(
        USER_REF,
        { wishlistArray: ARRAY_UNION(HOUSE_ID) },
        { merge: true }
      );
      console.log(`ID ${HOUSE_ID} agregado a la nueva wishlist.`);
    }
  } catch (ERROR) {
    console.error("Error al manejar la wishlist:", ERROR.message);
  }
}

export async function rentHouse(HOUSE_ID) { // same as above..
  const DAYS_TRAVELLING = localStorage.getItem('daysTravelling');
  const USER_ID = localStorage.getItem("uid");
  if (!USER_ID) {
    sendMessage("Debes iniciar sesión para poder alquilar una casa.");
    return;
  }
  if (!HOUSE_ID || !DAYS_TRAVELLING) {
    sendMessage("Debes introducir los días que quieres viajar.");
    return;
  }


 

  const USER_REF = DOC(DB, "users", USER_ID);

  try {
    const DOC_SNAP = await GET_DOC(USER_REF);
    let HOUSE_ARRAY = [];

    if (DOC_SNAP.exists()) {
      const USER_DATA = DOC_SNAP.data();
      HOUSE_ARRAY = USER_DATA.houseArray || [];
    }

    const EXISTING_INDEX = HOUSE_ARRAY.findIndex(HOUSE => HOUSE.houseId === HOUSE_ID);

    if (EXISTING_INDEX !== -1) {
      HOUSE_ARRAY.splice(EXISTING_INDEX, 1);
      sendMessage("Casa eliminada de tus reservas.");
      console.log(`ID ${HOUSE_ID} eliminado de la houseArray.`);
    } else {
      const HOUSE_DATA = {
        houseId: HOUSE_ID,
        daysTravelling: DAYS_TRAVELLING
      };
      HOUSE_ARRAY.push(HOUSE_DATA);
      sendMessage("Casa añadida a tus reservas.");
      console.log(`ID ${HOUSE_ID} agregado a la houseArray.`);
    }

    await SET_DOC(USER_REF, { houseArray: HOUSE_ARRAY }, { merge: true });
  } catch (ERROR) {
    console.error("Error al manejar la houseArray:", ERROR.message);
  }
}

function registerWithEmail(EMAIL, PASSWORD, FIRST_NAME, LAST_NAME) {
  CREATE_USER_WITH_EMAIL_AND_PASSWORD(AUTH, EMAIL, PASSWORD)
    .then((USER_CREDENTIAL) => {
      const USER = USER_CREDENTIAL.user;
      UPDATE_PROFILE(USER, {
        displayName: `${FIRST_NAME} ${LAST_NAME}` // wont be showed in the UI
      }).then(() => {
        console.log("Perfil actualizado con nombre y apellidos:", USER.displayName);
        document.getElementById("register-modal").style.display = 'none';
        localStorage.setItem('uid', USER.uid);
        localStorage.setItem("dispname", USER.displayName);
        const USER_DATA = {
          houseArray: [],
          wishlistArray: []
        };
        saveUserData(USER.uid, USER_DATA);

      }).catch((ERROR) => {
        console.error("Error al actualizar el perfil:", ERROR.message);
      });
    })
    .catch((ERROR) => {
      console.error("Error en el registro:", ERROR.message);
    });
}

function loginWithEmail(EMAIL, PASSWORD) {
  SIGN_IN_WITH_EMAIL_AND_PASSWORD(AUTH, EMAIL, PASSWORD)
    .then((USER_CREDENTIAL) => {
      document.getElementById("login-modal").style.display = 'none';
      const USER = USER_CREDENTIAL.user;
      localStorage.setItem("dispname", USER.displayName);
      localStorage.setItem("uid", USER.uid);
      location.reload(); // reload to change html elements easily
    })
    .catch((ERROR) => {
      console.error("Error en el log-in:", ERROR.message);
    });
}

async function saveUserData(USER_ID, DATA) {
  try {
    await SET_DOC(DOC(DB, "users", USER_ID), DATA);
    console.log("Datos guardados exitosamente");
  } catch (ERROR) {
    console.error("Error al guardar datos:", ERROR);
  }
}

function sendMessage(DELETED_OR_NOT) { // best function imo
  const MESSAGE = document.getElementById('message');
  MESSAGE.textContent = DELETED_OR_NOT;
  MESSAGE.classList.remove('hide');
  MESSAGE.classList.add('show');
  setTimeout(() => {
    MESSAGE.classList.add('hide');
    setTimeout(() => {
      MESSAGE.classList.remove('show');
      MESSAGE.classList.remove('hide');
    }, 500);
  }, 3000);
}

async function getUserData(USER_ID) {
  try {
    const DOC_SNAP = await GET_DOC(DOC(DB, "users", USER_ID));
    if (DOC_SNAP.exists()) {
      return DOC_SNAP.data();
    } else {
      console.log("No se encontró el documento");
    }
  } catch (ERROR) {
    console.error("Error al obtener datos:", ERROR);
  }
}

async function cartLoader() { // same as rent house, add to wishlist.. but w the cart.
  try {
    const BOOKINGS_DATA = await getUserData(localStorage.getItem('uid'));
    const HOUSE_LIST = await fetch('../data/house-list.json')
      .then(RESPONSE => RESPONSE.json())
      .catch(ERROR => {
        console.error('Error al cargar las casas desde el archivo JSON:', ERROR);
        return [];
      });

    BOOKINGS_CONTAINER.innerHTML = '';
    const DAYS_TRAVELLING = Number(localStorage.getItem('daysTravelling'));
    console.log(DAYS_TRAVELLING);
    if (isNaN(DAYS_TRAVELLING)) {
      console.error('Días de viaje no definidos o inválidos');
      return;
    }

    for (let INDEX = 0; INDEX < BOOKINGS_DATA.houseArray.length; INDEX++) {
      const HOUSE_DATA_OBJECT = BOOKINGS_DATA.houseArray[INDEX];
      const HOUSE_ID = HOUSE_DATA_OBJECT.houseId;

      if (HOUSE_ID >= 0 && HOUSE_ID < HOUSE_LIST.length) {
        const HOUSE_DATA = HOUSE_LIST[HOUSE_ID];
        const PRICE = Number(HOUSE_DATA.price.split("€")[0]) * DAYS_TRAVELLING;
        console.log(PRICE);

        BOOKINGS_CONTAINER.innerHTML += `
          <div class="bookings-card">
            <div class="bookings-card-header">
              <img src="${HOUSE_DATA.image}" alt="${HOUSE_DATA.title}" class="bookings-card-image">
              <div class="bookings-card-info">
                <h3 class="bookings-card-title">${HOUSE_DATA.title}</h3>
                <p class="bookings-card-description">${HOUSE_DATA.description}</p>
              </div>
            </div>
            <div class="bookings-card-footer">
              <p class="bookings-card-price">${PRICE}€ Total <span>IVA incluido</span></p>
              <button class="remove-from-bookings" id="${HOUSE_ID}">Cancelar Reserva</button>
            </div>
          </div>
        `;
      } else {
        console.error('Índice de casa inválido:', HOUSE_DATA_OBJECT);
      }
    }

  } catch (ERROR) {
    console.error('Error al obtener los datos de reservas:', ERROR);
  }
}



