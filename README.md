# Custom-Map-Plotter

## Description

Can plot multiple points at once on a custom map of the US with a CSV file.

https://hyrumsdolan.github.io/Custom-Map-Plotter/

## How to Use
Go to this URL: https://console.cloud.google.com/google/maps-apis/credentials
Sign in to Google Account
Agree to the TOS
Click CREATE PROJECT (the URL should have taken you to Key & Credentials tab)
Click Create
Click Keys and Credentials
It will ask for credit card (It will not charge you unless you do more than, I thik 100,000 plots per month, maybe even more. It also won't charge without direct permission)
Go back to Keys and Crendtials
Create API Key
Copy the API Key
Go to https://hyrumsdolan.github.io/Custom-Map-Plotter/
Paste that into the bottom where it asks for the API KEY
Drop a CSV that has a column labeled State, and another with City
It will auto plot everything.
Click export to save a picture of the map with the plots



## Resources

### Map Source

If you would like to customize the map, take this map and then use the SVG editor to edit the colors to your liking. Replace the IMLC-Map.svg in /assets/images/ (must be named exactly the same)

[https://mapsvg.com/maps/usa](https://mapsvg.com/maps/usa)

This has a downloadable SVG of the US. Ignore the $50 Buy Now, that's just for the API.
Hit "Download the Map of USA"

The file is an SVG and will look like garbage unless specifically used with an SVG editor.

### SVG Editor

[https://boxy-svg.com/](https://boxy-svg.com/)

This will allow for you to add borders (add stroke with Type:Solid option) to the states and change each states indivdual colors (shift clicking allows for batch changes)

This one worked out really well for me. The only issue I had was text size (for some reason it won't got below 15), how ever I realized after that you can just make the map bigger and the relative text size is smaller.


## Current Known Issues



## Desired Next Steps

### 1. Size slider and color editor for marker
