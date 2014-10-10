# glsl-determinant
Computes the determinant of a matrix in glsl

# Example

```glsl
#pragma glslify: det = require(glsl-determinant)

void main() {
  mat3 m = mat3(1, 2, 3,
                4, 5, 6,
                7, 8, 9);

  float d = det(m);

  //d is the determinant of m (0 in this case)
}
```

# Usage

Install with npm:

```
npm install glsl-determinant
```

Then use with [glslify](https://github.com/stackgl/glslify).

# API

```glsl
#pragma glslify: determinant = require(glsl-determinant)
```

### `float d = determinant(float|mat2|mat3|mat4 m)`
Computes the determinant of a matrix

* `m` is a matrix, either `float, mat2, mat3` or `mat4`

**Returns** The determinant of `m`

# License
(c) 2014 Mikola Lysenko. MIT License