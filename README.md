# Officemap

An interactive web app for indoor location mapping.

current version: 3.0.1

## Demo

[officemap.xusf.xyz](http://officemap.xusf.xyz)

## Getting Started

```
git clone https://github.com/nicholasxuu/officemap3-react.git
cd officemap3-react
npm install
npm start
```

Then open http://localhost:3001 in your browser

## Why This?

Pro:

- React redux for great performance and maintainability.
- Work well on both desktop and mobile browsers. (optimized for touch control and mobile performance)
- Open source, extendable to your own backend service for more mapped information (i.e. live office meeting room status)
- Allow you to use it internally, without having to publish online for everyone to see.

Con:

- Initial configuration is still a bit complicated, still need to build an SVG map, and configure each user's info into the data file. (data file can be served through an API)
- Not designed to handle huge scale floor plan with thousands of locations. (it load one floor at once, not by areas like google map).
- It does use redux. So, cannot use it as a dumb react component anymore.

## Code Style

[Airbnb Javascript Style](https://github.com/airbnb/javascript)

## License

GPL




### TODO:
1. Fix redux router (using custom hack right now)
2. Fix localstorage usage (don't want to store everything)
3. ~~Complete airbnb code style change.~~ => done

### SVG Matrixes
1. viewport matrix
   Transformation matrix representing original image size v.s. viewport scale.
2. transform matrix
   Transformation matrix for pan, zoom total image in image viewer.
3. final matrix
   viewportMatrix * transformMatrix.
   Used for converting SVG point into client/page point.