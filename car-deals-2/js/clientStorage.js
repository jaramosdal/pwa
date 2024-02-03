const carsInstance = localforage.createInstance({
  name: "cars",
});
let lastIndex = -1;

// Añade coches a la BBDD local
export const addCars = async (newCars) => {
  // Guarda los nuevos coches AL PRINCIPIO del array de BBDD local
  // Es decir, los 3 nuevos, siempre van a ocupar las posiciones 0, 1 y 2
  await carsInstance.setItems(newCars);
};

export const getCars = async () => {
  // Como en BBDD local, los últimos se almacenan los primeros, damos la vuelta para que los últimos sean los últimos
  const keys = (await carsInstance.keys()).reverse();
  if (lastIndex >= keys.length) return;
  const results = await carsInstance.getItems(keys.splice(lastIndex + 1, 3));
  lastIndex += 3;
  return Object.values(results).reverse();
};

export const getLastItemId = async () => {
  const keys = (await carsInstance.keys()).reverse();
  return keys[lastIndex];
};
