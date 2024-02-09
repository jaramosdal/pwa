export default async () => {
  if (!"serviceWorker" in navigator) {
    return;
  }
  const swRegistration = await navigator.serviceWorker.register("sw.js", {
    scope: "",
  });
  let serviceWorker;

  if (swRegistration.installing) {
    console.log("Resolved on installing: ", swRegistration);
    serviceWorker = swRegistration.installing;
  } else if (swRegistration.waiting) {
    console.log("Resolved on installed/waiting: ", swRegistration);
    serviceWorker = swRegistration.waiting;
  } else {
    console.log("Resolved on activated: ", swRegistration);
    serviceWorker = swRegistration.active;
  }

  serviceWorker.addEventListener("statechange", (e) => {
    console.log(e.target.state);
  });

  // Evento lanzado cuando Nueva versión de SW encontrada
  swRegistration.addEventListener("updatefound", () => {
    swRegistration.installing.addEventListener("statechange", (e) => {
      console.log("New service worker state: ", e.target.state);
    });
    console.log("New service worker found!: ", swRegistration);
  });

  // An extra event that is fired when the service worker controlling this page changes
  // through the self.skipWaiting()
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    console.log("Controller Changed!");
  });

  // Se comprueba si hay una nueva versión del SW cada vez que se navega a una página que forme parte de su scope o con cada fetch
  // Pero también podemos comprobar manualmente si hay una nueva versión de la siguiente manera:
  setInterval(() => {
    console.log("Comprobando nueva versión de SW.");
    swRegistration.update();
  }, 1000 * 5);
};
