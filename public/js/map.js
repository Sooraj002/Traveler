// let mapToken = mapToken;
mapboxgl.accessToken = mapToken;
console.log(mapToken);

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: coordinates,
  zoom: 12,
});

// const marker = new mapboxgl.Marker()
// .setLngLat(coordinates)
// .addTo(map);

const marker = new mapboxgl.Marker({color: "red"}).setLngLat(coordinates).addTo(map);
