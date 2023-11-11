function plotPoint() {
    const mapWidth = 2184; // Same as in CSS
    const mapHeight = 1200; // Same as in CSS
    const mapBounds = { north: 48.99900, south: 24.396308, east: -66.93457, west: -125.00165 }; // Bounds for the US, adjust as needed

    let latitude = parseFloat(document.getElementById('latitude').value);
    let longitude = parseFloat(document.getElementById('longitude').value);

    // Apply cosine correction for latitude
    let cosLatitude = Math.cos(latitude * Math.PI / 180);

    let x = (longitude - mapBounds.west) * (mapWidth / (mapBounds.east - mapBounds.west));
    let y = mapHeight - ((latitude - mapBounds.south) * (mapHeight / (mapBounds.north - mapBounds.south)) * cosLatitude);

    // Create and position the marker
    let marker = document.createElement('div');
    marker.className = 'marker';
    marker.style.left = `${x - 15}px`; // Offset by half the marker's width to center it
    marker.style.top = `${y - 15}px`; // Offset by half the marker's height to center it

    // Add the marker to the map
    document.getElementById('map').appendChild(marker);
}
