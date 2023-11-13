# Custom-Map-Plotter

## Description

Can plot multiple points at once on a custom map of the US with a CSV file.

## Resources

### Map Source

[https://mapsvg.com/maps/usa](https://mapsvg.com/maps/usa)

This has a downloadable SVG of the US. Ignore the $50 Buy Now, that's just for the API.
Hit "Download the Map of USA"

The file is an SVG and will look like garbage unless specifically used with an SVG editor.

### SVG Editor

[https://boxy-svg.com/](https://boxy-svg.com/)

This will allow for you to add borders (add stroke with Type:Solid option) to the states and change each states indivdual colors (shift clicking allows for batch changes)

This one worked out really well for me. The only issue I had was text size (for some reason it won't got below 15), how ever I realized after that you can just make the map bigger and the relative text size is smaller.

## API

[https://www.openstreetmap.org/](https://www.openstreetmap.org/)

No API token required.

I needed this for batches of 30-50 - this option is free, but may have some limitations for bigger datasets.

## Current Known Issues

### Don't change the marker diameter

I got a weird bug that popped up, but it was after I calibrated the plot points. It's probably an easy fix and I will hopefully get to it soon.

## Desired Next Steps

### 1. Make it look nicer

Add a cute little drag and drop box or something, maybe have a dark mode.

### 2. Export Image

Right now you just need to screen shot the map, but it'd be export directly into an email friendly filetype.

### 3. Size slider and color editor for marker
