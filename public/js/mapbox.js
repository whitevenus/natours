/* eslint-disable */
export const displayMap = (locations) => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZHJ5c2QwaGluMiIsImEiOiJjbHIwZTZ3bnIwaHpiMnB0YWMzNzRrZDEyIn0.YEDMJ_sakIGPen2K1nMFHw";

  const map = new mapboxgl.Map({
    container: "map", // container ID
    style: "mapbox://styles/drysd0hin2/clr0iq06d008e01p52tkcfmql", // style URL
    center: [-118.113491, 34.111745], // starting position [lng, lat]
    zoom: 8, // starting zoom
    // scrollZoom: false, // disable zoom
    // interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement("div");
    el.className = "marker";

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: "bottom",
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
