export default async () => {
  if (!"serviceWorker" in navigator) {
    return;
  }
  const swRegistration = await navigator.serviceWorker.register("sw.js");
  console.log(swRegistration);
};
