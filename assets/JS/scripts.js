// CONFIG START - Map adjustments made to both JS and CSS
import { mapConfig, markerConfig } from './config.js';

function updateMapSize() {
    const mapElement = document.getElementById('map');
    mapElement.style.width = mapConfig.width + 'px';
    mapElement.style.height = mapConfig.height + 'px';
}

function updateMarkerSize() {
    const markers = document.getElementsByClassName('marker');
    for (let marker of markers) {
        marker.style.width = markerConfig.size.width + 'px';
        marker.style.height = markerConfig.size.height + 'px';
    }
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

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('csvFileInput');

dropZone.addEventListener('click', () => fileInput.click());
dropZone.addEventListener('dragover', (event) => {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
});
dropZone.addEventListener('drop', (event) => {
    event.stopPropagation();
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        processCSV(files[0]);
    }
});
fileInput.addEventListener('change', (event) => {
    if (event.target.files.length > 0) {
        processCSV(event.target.files[0]);
    }
});

// Cleans CSV file and parses it
function processCSV(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        let text = e.target.result;
        // Remove any leading empty lines and then remove leading commas from the header and data lines
        let fixedText = text.replace(/^\s*[\r\n]+/gm, '').replace(/^,+/gm, '');
        Papa.parse(fixedText, {
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                if (results && results.data) {
                    processLocations(results.data);
                } else {
                    console.error(`No data found in CSV: ${file.name}`);
                }
            },
            error: function(error) {
                console.error('Error parsing CSV:', error);
            }
        });
    };
    reader.onerror = function(error) {
        console.error('Error reading file:', error);
    };
    reader.readAsText(file);
}

// Takes the headers City and State, change them in location.**** if needed
function processLocations(locations) {
    for (const location of locations) {
        const city = location.City;  // Adjust these according to your CSV column names
        const state = location.State;
        getCoordinates(city, state);
    }
}
// END CSV HANDLER

// Gets Latitude and Longitude from OpenStreetMap API
function getCoordinates(city, state) {
    const url = `https://nominatim.openstreetmap.org/search?city=${city}&state=${state}&format=json`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if(data && data.length > 0) {
                const latitude = parseFloat(data[0].lat);
                const longitude = parseFloat(data[0].lon);
                addMarker(latitude, longitude, state); // Pass the state name here
            } else {
                console.error('No coordinates found for this location');
            }
        })
        .catch(error => console.error('Error fetching coordinates:', error));
}

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
    let xRelative = (longitude - mapBounds.west) / (mapBounds.east - mapBounds.west);
    let xPos = xRelative * mapWidth;
    let radianLatitude = latitude * (Math.PI / 180);
    let mercatorY = Math.log(Math.tan((Math.PI / 4) + (radianLatitude / 2)));
    let yMin = Math.log(Math.tan((Math.PI / 4) + (mapBounds.south * Math.PI / 360)));
    let yMax = Math.log(Math.tan((Math.PI / 4) + (mapBounds.north * Math.PI / 360)));
    let yRelative = (mercatorY - yMin) / (yMax - yMin);
    let yPos = (1 - yRelative) * mapHeight;

    // Create and position the marker
    let marker = document.createElement('div');
    marker.className = 'marker';
    positionMarker(marker, xPos, yPos);

    // Set marker content with the state name instead of coordinates
    let text = document.createElement('span');
    text.className = 'marker-text';
    text.innerHTML = state; // Use the state name here
    marker.appendChild(text);

    // Add the marker to the map
    document.getElementById('map').appendChild(marker);
}

// Used to add a single marker or test
document.getElementById('mapForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    getCoordinates(city, state);
});



















// function plotPredefinedPoints() {
//     addMarker(41.8781, -87.6298); // Chicago
//     addMarker(39.7392, -104.9903); // Denver
//     addMarker(33.7490, -84.3880); // Atlanta
//     addMarker(42.3601, -71.0589); // Boston
//     addMarker(36.9991, -109.0452); // Four corners
//     addMarker(29.7604, -95.3698); // Houston
//     addMarker(40.7128, -74.0060); // New York
//     addMarker(34.0522, -118.2437); // Los Angeles`
//     addMarker(45.9445, -104.0446); // Corner of North and South Dakota
//     addMarker(25.7617, -80.1918); // Miami
//         addMarker(26, -100) // Miami
//     addMarker(49, -109) // Miami

// }

// window.onload = function() {
//     plotPredefinedPoints();
// };
