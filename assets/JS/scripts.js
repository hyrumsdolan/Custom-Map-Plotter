// CONFIG START - Map adjustments made to both JS and CSS
import { mapConfig, markerConfig } from "./config.js";
import jsonData from './mapdata.js';

function updateMapSize() {
  const mapElement = document.getElementById("map");
  mapElement.style.width = mapConfig.width + "px";
  mapElement.style.height = mapConfig.height + "px";
}

function updateMarkerSize() {
  // Create a style element
  var style = document.createElement("style");

  // Define the CSS rule for markers
  var css = `
        .marker {
            width: ${markerConfig.size.width}px;
            height: ${markerConfig.size.height}px;
        }
    `;

  // Add the CSS to the style element
  if (style.styleSheet) {
    style.styleSheet.cssText = css; // Support for IE
  } else {
    style.appendChild(document.createTextNode(css)); // Support for other browsers
  }

  // Append the style element to the head of the document
  document.head.appendChild(style);
}

// Initial setup
updateMapSize();
updateMarkerSize();

// CONFIG END



// CSV HANDLER START
// Drag and Drop or Select CSV file
function handleFileSelect(evt) {
  const file = evt.target.files[0];
  processCSV(file);
}

const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("csvFileInput");

dropZone.addEventListener("click", () => fileInput.click());
dropZone.addEventListener("dragover", (event) => {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = "copy";
});
dropZone.addEventListener("drop", (event) => {
  event.stopPropagation();
  event.preventDefault();
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    processCSV(files[0]);
  }
});
fileInput.addEventListener("change", (event) => {
  if (event.target.files.length > 0) {
    processCSV(event.target.files[0]);
  }
});

// Cleans CSV file and parses it
function processCSV(file) {
  const reader = new FileReader();
  reader.onload = function (e) {
    let text = e.target.result;
    // Remove any leading empty lines and then remove leading commas from the header and data lines
    let fixedText = text.replace(/^\s*[\r\n]+/gm, "").replace(/^,+/gm, "");
    Papa.parse(fixedText, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        if (results && results.data) {
          processLocations(results.data);
        } else {
          console.error(`No data found in CSV: ${file.name}`);
        }
      },
      error: function (error) {
        console.error("Error parsing CSV:", error);
      },
    });
  };
  reader.onerror = function (error) {
    console.error("Error reading file:", error);
  };
  reader.readAsText(file);
}

// Takes the headers City and State, change them in location.**** if needed
function processLocations(locations) {
  for (const location of locations) {
    const city = location.City; // Adjust these according to your CSV column names
    const state = location.State;
    if (!city || !state) {
      console.error("Missing City or State");
      continue;
    }
    getCoordinates(city, state);
  }
}
// END CSV HANDLER


function getCoordinates(city, state) {
  const apiKey = 'GOOGLE_API_KEY'; // Replace with your Google Geocoding API key
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city},${state}&key=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'OK') {
        const latitude = data.results[0].geometry.location.lat;
        const longitude = data.results[0].geometry.location.lng;
        console.log(`${state}, ${city}Latitude: ${latitude}, Longitude: ${longitude}`);
        addMarker(latitude, longitude, state);
      } else {
        console.log(`${state}, ${city}`)
        console.error("Geocoding failed:", data.status);
      }
    })
    .catch(error => console.error("Error fetching coordinates:", error));
}


// Gets Latitude and Longitude from OpenStreetMap API
// function getCoordinates(city, state) {
//   // Find the matching entry in the JSON data
//   const location = jsonData.find(entry => 
//     entry.CITY.toLowerCase() === city.toLowerCase() && 
//     (entry.STATE_NAME.toLowerCase() === state.toLowerCase() || 
//      entry.STATE_CODE.toLowerCase() === state.toLowerCase()));
//   console.log(location);
  
//   if (location) {
//     // Extract latitude and longitude
//     const latitude = parseFloat(location.LATITUDE);
//     const longitude = parseFloat(location.LONGITUDE);

//     // Continue with your existing logic to add markers
//     addMarker(latitude, longitude, state);
//   } else {
//     console.error("No coordinates found for this location");
//   }
// }

// THIS WORKS AND IS WORTH TRYING - I think I messed up the usage rules for the API and got blocked. But it is more robust (Knows LA, CA is Los Angeles), but it is slower (1 point per second)
// Gets Latitude and Longitude from OpenStreetMap API
// function getCoordinates(city, state) {
//   const url = `https://nominatim.openstreetmap.org/search?city=${city}&state=${state}&format=json`;
//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       if (data && data.length > 0) {
//         const latitude = parseFloat(data[0].lat);
//         const longitude = parseFloat(data[0].lon);
//         addMarker(latitude, longitude, state); // Pass the state name here
//       } else {
//         console.error("No coordinates found for this location");
//       }
//     })
//     .catch((error) => console.error("Error fetching coordinates:", error));
// }



// Needed for offset of markersize - Change marker size in config.js
function positionMarker(marker, xPos, yPos) {
  marker.style.left = `${xPos - markerConfig.adjustment}px`;
  marker.style.top = `${yPos - markerConfig.adjustment}px`;
}

// Adds Markers to the map, only works with Mercator Projection Maps.
function addMarker(latitude, longitude, state) {
  const mapBounds = mapConfig.bounds;
  const mapWidth = mapConfig.width;
  const mapHeight = mapConfig.height;

  // Calculate position
  let xRelative =
    (longitude - mapBounds.west) / (mapBounds.east - mapBounds.west);
  let xPos = xRelative * mapWidth;
  let radianLatitude = latitude * (Math.PI / 180);
  let mercatorY = Math.log(Math.tan(Math.PI / 4 + radianLatitude / 2));
  let yMin = Math.log(
    Math.tan(Math.PI / 4 + (mapBounds.south * Math.PI) / 360)
  );
  let yMax = Math.log(
    Math.tan(Math.PI / 4 + (mapBounds.north * Math.PI) / 360)
  );
  let yRelative = (mercatorY - yMin) / (yMax - yMin);
  let yPos = (1 - yRelative) * mapHeight;

  // Create and position the marker
  let marker = document.createElement("div");
  marker.className = "marker";
  positionMarker(marker, xPos, yPos);

  // Add State Name to marker
  let text = document.createElement("span");
  text.className = "marker-text";
  text.innerHTML = state; // Use the state name here
  marker.appendChild(text);

  // Add the marker to the map
  document.getElementById("map").appendChild(marker);
}

// Single point add
document.getElementById("mapForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  getCoordinates(city, state);
});

//Export Map with Markers
document.getElementById("exportButton").addEventListener("click", function () {
  html2canvas(document.getElementById("map")).then(function (canvas) {
    // Create an image
    var img = canvas.toDataURL("image/png");

    // Create a link to download it
    var link = document.createElement("a");
    link.download = "map_export.png";
    link.href = img;
    link.click();
  });
});
