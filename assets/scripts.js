const mapBounds = { north: 50, south: 25.2, east: -66.5, west: -125 }; //
const mapWidth = 2184; // Same as in CSS
    const mapHeight = 1200; // Same as in CSS

function plotPoint() {



    let latitude = parseFloat(document.getElementById('latitude').value);
    let longitude = parseFloat(document.getElementById('longitude').value);

    // Calculate the relative position within the map bounds
    let xRelative = (longitude - mapBounds.west) / (mapBounds.east - mapBounds.west);
    let yRelative = (latitude - mapBounds.south) / (mapBounds.north - mapBounds.south);

    // Convert to pixel position
    let xPos = xRelative * mapWidth;
    let yPos = (1 - yRelative) * mapHeight; // Subtract from 1 because the y-axis is inverted in most UI frameworks

    // Create and position the marker
    let marker = document.createElement('div');
    marker.className = 'marker';
    marker.style.left = `${xPos - 35}px`; // Adjust by half the marker's width if necessary
    marker.style.top = `${yPos - 35}px`; // Adjust by half the marker's height if necessary

    // Add text to the marker
    let text = document.createElement('span');
    text.className = 'marker-text';
    text.innerHTML = `${latitude.toFixed(2)},${longitude.toFixed(2)}`; // Adjust decimal places as necessary
    marker.appendChild(text);

    // Add the marker to the map
    document.getElementById('map').appendChild(marker);
    }


function createGrid() {
    


    const latLines = mapBounds.north - mapBounds.south;
    const lngLines = mapBounds.east - mapBounds.west;

    const map = document.getElementById('map');

    // Create Latitude Lines (Horizontal)
    for (let i = 0; i <= latLines; i++) {
        let line = document.createElement('div');
        line.className = 'grid-line horizontal';
        let yPos = (i * (mapHeight / latLines));
        line.style.top = `${yPos}px`;
        map.appendChild(line);
    }

    // Create Longitude Lines (Vertical)
    for (let i = 0; i <= lngLines; i++) {
        let line = document.createElement('div');
        line.className = 'grid-line vertical';
        let xPos = (i * (mapWidth / lngLines));
        line.style.left = `${xPos}px`;
        map.appendChild(line);
    }
}

document.getElementById('mapForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    plotPoint();
});

// function addMarker(latitude, longitude) {
//     let xRelative = (longitude - mapBounds.west) / (mapBounds.east - mapBounds.west);
//     let yRelative = (latitude - mapBounds.south) / (mapBounds.north - mapBounds.south);

//     let xPos = xRelative * mapWidth;
//     let yPos = (1 - yRelative) * mapHeight;

//     let marker = document.createElement('div');
//     marker.className = 'marker';
//     marker.style.left = `${xPos - 35}px`;
//     marker.style.top = `${yPos - 35}px`;

//     let text = document.createElement('span');
//     text.className = 'marker-text';
//     text.innerHTML = `${latitude.toFixed(2)},${longitude.toFixed(2)}`;
//     marker.appendChild(text);

//     document.getElementById('map').appendChild(marker);
// }

// function plotPredefinedPoints() {
//     addMarker(47.6062, -122.3321); // Seattle
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
// }

window.onload = function() {
    createGrid();
    // plotPredefinedPoints();
};






//     //Adjusted
// // addMarker(35.84, -108.95); // Four corners
// //     addMarker(28.9, -95); // Houston
// //     addMarker(39.8, -73.25); // New York
// //     addMarker(33, -118.2437); // Los Angeles
// //     addMarker(45.4, -103.8); // Corner of North and South Dakota
// //     addMarker(25.2, -79.9); // Miami