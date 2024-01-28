// let mapToken = mapToken;
mapboxgl.accessToken = mapToken;
console.log(mapToken);

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: coordinates, // Should be an array [lng, lat]
  zoom: 12,
});

// const marker = new mapboxgl.Marker({ color: "red" })
//   .setLngLat(listing)
//   .setPopup(new mapboxgl.Popup({ offset: 25 }))
//   .addTo(map);

const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(coordinates) // Should be an array [lng, lat]
  .setPopup(new mapboxgl.Popup({ offset: 25 })
  .setHTML(`<p>Exact location shared after booking</p>`))
  .addTo(map);
