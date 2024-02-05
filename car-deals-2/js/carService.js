import { preCacheDetailsPage } from "./carPageService.js";
import { API_URL_LATEST } from "./constants.js";
import { appendCars } from "./template.js";
import { addCars, getCars, getLastItemId } from "./clientStorage.js";

export const loadCars = async () => {
  document.getElementById("connection-status").innerHTML = await fetchPromise();

  // Carga los 3 primeros coches de la BBDD local
  const cars = await getCars();

  console.log(cars);

  appendCars(cars);
};

const fetchPromise = () => {
  const promiseRequest = new Promise(async (resolve) => {
    try {
      await loadCarsRequest();
    } catch (error) {
      resolve("Mo connection, showing offline results");
    }
    resolve("This connection is OK, showing latest results");
  });
  const promiseHanging = new Promise((resolve) => {
    setTimeout(
      resolve,
      3000,
      "The connection is hanging, showing offline results"
    );
  });
  return Promise.race([promiseRequest, promiseHanging]);
};

// Obtiene 3 coches vía API y los carga en BBDD local
export const loadCarsRequest = async () => {
  // Obtiene 3 coches a partir del indicado
  const requestURL = `${API_URL_LATEST}?carId=${await getLastItemId()}`;
  const response = await fetch(requestURL);
  const data = await response.json();

  // Añade los 3 coches a la BBDD local
  await addCars(data.cars);
  data.cars.forEach(preCacheDetailsPage);
};
