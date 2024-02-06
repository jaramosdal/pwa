"use strict";

self.addEventListener("install", (event) => {
  console.log("install event", event);
});

self.addEventListener("activate", (event) => {
  console.log("activate event", event);
});
