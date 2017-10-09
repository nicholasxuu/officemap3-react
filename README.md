### TODO:
1. Fix redux router (using custom hack right now)
2. Fix localstorage usage (don't want to store everything)
3. Complete airbnb code style change.

### SVG Matrixes
1. viewport matrix
   Transformation matrix representing original image size v.s. viewport scale.
2. transform matrix
   Transformation matrix for pan, zoom total image in image viewer.
3. final matrix
   viewportMatrix * transformMatrix.
   Used for converting SVG point into client/page point.