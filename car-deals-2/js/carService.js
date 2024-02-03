import { API_URL_LATEST } from "./constants.js";
import { appendCars } from "./template.js";
import { addCars, getCars, getLastItemId } from "./clientStorage.js";

export const loadCars = async () => {
  // Obtiene 3 coches vía API y los carga en BBDD local
  await loadCarsRequest();

  // Carga los 3 primeros coches de la BBDD local
  const cars = await getCars();

  console.log(cars);

  appendCars(cars);
};

export const loadCarsRequest = async () => {
  // Obtiene 3 coches a partir del indicado
  const requestURL = `${API_URL_LATEST}?carId=${await getLastItemId()}`;
  const response = await fetch(requestURL);
  const data = await response.json();

  // Añade los 3 coches a la BBDD local
  await addCars(data.cars);
};
