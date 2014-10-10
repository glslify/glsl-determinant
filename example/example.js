var glslify       = require('glslify')
var drawTriangle  = require('a-big-triangle')
var det2          = require('gl-mat2/determinant')
var det3          = require('gl-mat3/determinant')
var det4          = require('gl-mat4/determinant')

var canvas = document.createElement('canvas')
var gl = canvas.getContext('webgl')

var shader = glslify({
  vert: '\
attribute vec2 position;\
void main() {\
  gl_Position = vec4(position,0.0,1.0);\
}',
  frag: '\
precision highp float;\n\
#pragma glslify: det = require(../index.glsl)\n\
uniform float m0;\
uniform mat2  m1;\
uniform mat3  m2;\
uniform mat4  m3;\
uniform float d0,d1,d2,d3;\
void main() {\
  gl_FragColor = 100.0 * vec4(\
    abs(det(m0) - d0),\
    abs(det(m1) - d1),\
    abs(det(m2) - d2),\
    abs(det(m3) - d3));\
}',
  inline: true
})(gl)

function runTest(m0, m1, m2, m3) {
  shader.bind()
  shader.uniforms = {
    d0: m0,
    d1: det2(m1),
    d2: det3(m2),
    d3: det4(m3),
    m0: m0,
    m1: m1,
    m2: m2,
    m3: m3
  }
  drawTriangle(gl)

  var result = new Uint8Array(4)
  gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, result)

  if(result[0] > 0 ||
     result[1] > 0 ||
     result[2] > 0 ||
     result[3] > 0) {
    console.log('fail', result[0], result[1], result[2], result[3])
  } else {
    console.log('ok')
  }
}


function randFloat() {
  return (Math.random() - 0.5) * Math.pow(2, 20*(Math.random()-0.5))
}
function randArray(n) {
  var r = new Array(n)
  for(var i=0; i<n; ++i) {
    r[i] = randFloat()
  }
  return r
}

for(var i=0; i<100; ++i) {
  runTest(randFloat(), randArray(4), randArray(9), randArray(16))
}