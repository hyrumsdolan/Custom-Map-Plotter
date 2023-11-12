const mapBounds = { north: 49.85, south: 25.45, east: -67.4, west: -125.35 }; //
const mapWidth = 1650; // Same as in CSS
    const mapHeight = 895; // Same as in CSS

function plotPoint() {
    let latitude = parseFloat(document.getElementById('latitude').value);
    let longitude = parseFloat(document.getElementById('longitude').value);

    // Calculate the relative position within the map bounds for longitude
    let xRelative = (longitude - mapBounds.west) / (mapBounds.east - mapBounds.west);
    let xPos = xRelative * mapWidth;

    // Calculate Mercator projection's y-coordinate for latitude
    let radianLatitude = latitude * (Math.PI / 180); // Convert latitude to radians
    let mercatorY = Math.log(Math.tan((Math.PI / 4) + (radianLatitude / 2)));
    
    // Find the relative y position within the map bounds
    let yMin = Math.log(Math.tan((Math.PI / 4) + (mapBounds.south * Math.PI / 360)));
    let yMax = Math.log(Math.tan((Math.PI / 4) + (mapBounds.north * Math.PI / 360)));
    let yRelative = (mercatorY - yMin) / (yMax - yMin);
    // Convert to pixel position

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


    

document.getElementById('mapForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
    plotPoint();
});

function addMarker(latitude, longitude) {
   

    // Calculate the relative position within the map bounds for longitude
    let xRelative = (longitude - mapBounds.west) / (mapBounds.east - mapBounds.west);
    let xPos = xRelative * mapWidth;

    // Calculate Mercator projection's y-coordinate for latitude
    let radianLatitude = latitude * (Math.PI / 180); // Convert latitude to radians
    let mercatorY = Math.log(Math.tan((Math.PI / 4) + (radianLatitude / 2)));
    
    // Find the relative y position within the map bounds
    let yMin = Math.log(Math.tan((Math.PI / 4) + (mapBounds.south * Math.PI / 360)));
    let yMax = Math.log(Math.tan((Math.PI / 4) + (mapBounds.north * Math.PI / 360)));
    let yRelative = (mercatorY - yMin) / (yMax - yMin);
    // Convert to pixel position

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

// function createGrid() {
//     const latLines = 10; // Number of latitude lines you want to display
//     const lngLines = mapBounds.east - mapBounds.west; // Number of longitude lines

//     const map = document.getElementById('map');

//     // Create Latitude Lines (Horizontal)
//     for (let i = 0; i <= latLines; i++) {
//         let latitude = mapBounds.south + (i * (mapBounds.north - mapBounds.south) / latLines);
//         let radianLatitude = latitude * (Math.PI / 180);
//         let mercatorY = Math.log(Math.tan((Math.PI / 4) + (radianLatitude / 2)));

//         let yMin = Math.log(Math.tan((Math.PI / 4) + (mapBounds.south * Math.PI / 360)));
//         let yMax = Math.log(Math.tan((Math.PI / 4) + (mapBounds.north * Math.PI / 360)));
//         let yPos = (mercatorY - yMin) / (yMax - yMin) * mapHeight;

//         let line = document.createElement('div');
//         line.className = 'grid-line horizontal';
//         line.style.top = `${yPos}px`;
//         map.appendChild(line);
//     }

//     // Create Longitude Lines (Vertical)
//     for (let i = 0; i <= lngLines; i++) {
//         let xPos = (i * (mapWidth / lngLines));
//         let line = document.createElement('div');
//         line.className = 'grid-line vertical';
//         line.style.left = `${xPos}px`;
//         map.appendChild(line);
//     }
// }

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
//     createGrid();
//     plotPredefinedPoints();
// };



// addMarker(47.6062, -122.3321); // Seattle
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
//     addMarker(26, -100) // Miami
//     addMarker(49, -109) // Miami


//     //Adjusted
// // addMarker(35.84, -108.95); // Four corners
// //     addMarker(28.9, -95); // Houston
// //     addMarker(39.8, -73.25); // New York
// //     addMarker(33, -118.2437); // Los Angeles
// //     addMarker(45.4, -103.8); // Corner of North and South Dakota
// //     addMarker(25.2, -79.9); // Miami

// addMarker(26, -109);
// addMarker(27, -109);
// addMarker(28, -109);
// addMarker(29, -109);
// addMarker(30, -109);
// addMarker(31, -109);
// addMarker(32, -109);
// addMarker(33, -109);
// addMarker(34, -109);
// addMarker(35, -109);
// addMarker(36, -109);
// addMarker(37, -109);
// addMarker(38, -109);
// addMarker(39, -109);
// addMarker(40, -109);
// addMarker(41, -109);
// addMarker(42, -109);
// addMarker(43, -109);
// addMarker(44, -109);
// addMarker(45, -109);
// addMarker(46, -109);
// addMarker(47, -109);
// addMarker(48, -109);
// addMarker(49, -109);
// addMarker(40, -126);
// addMarker(40, -125);
// addMarker(40, -124);
// addMarker(40, -123);
// addMarker(40, -122);
// addMarker(40, -121);
// addMarker(40, -120);
// addMarker(40, -119);
// addMarker(40, -118);
// addMarker(40, -117);
// addMarker(40, -116);
// addMarker(40, -115);
// addMarker(40, -114);
// addMarker(40, -113);
// addMarker(40, -112);
// addMarker(40, -111);
// addMarker(40, -110);
// addMarker(40, -109);
// addMarker(40, -108);
// addMarker(40, -107);
// addMarker(40, -106);
// addMarker(40, -105);
// addMarker(40, -104);
// addMarker(40, -103);
// addMarker(40, -102);
// addMarker(40, -101);
// addMarker(40, -100);
// addMarker(40, -99);
// addMarker(40, -98);
// addMarker(40, -97);
// addMarker(40, -96);
// addMarker(40, -95);
// addMarker(40, -94);
// addMarker(40, -93);
// addMarker(40, -92);
// addMarker(40, -91);
// addMarker(40, -90);
// addMarker(40, -89);
// addMarker(40, -88);
// addMarker(40, -87);
// addMarker(40, -86);
// addMarker(40, -85);
// addMarker(40, -84);
// addMarker(40, -83);
// addMarker(40, -82);
// addMarker(40, -81);
// addMarker(40, -80);
// addMarker(40, -79);
// addMarker(40, -78);
// addMarker(40, -77);
// addMarker(40, -76);
// addMarker(40, -75);
// addMarker(40, -74);
// addMarker(40, -73);
// addMarker(40, -72);
// addMarker(40, -71);
// addMarker(40, -70);
// addMarker(40, -69);
// addMarker(40, -68);
// addMarker(40, -67);
// addMarker(40, -66);