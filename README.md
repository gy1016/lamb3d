<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h1 align="center">lamb3d</h1>
</p>

<!-- ABOUT THE PROJECT -->

# Introduction

A TypeScript 3d mini engine for gis.

# Document

Here you can see [engine documentation](https://www.yuque.com/shengaoyang-rl1fl/apm3zh), mind maps, system architecture and my brainstorming!

# Architecture

The modules currently included in lamb3d are shown in the following figure:

![Engine Xmind](./images/lamb3d_xmind.png)

The system architecture diagram of lamb3d is as follows:

![Engine Architecture](./images/lamb3d_systemstruct.png)

# Usage

```js
import { Engine, Scene, PrimitiveMesh, Entity, Material, Shader, Camera, Vector3 } from '../dist/index.esm.js';

const lamb3d = new Engine('gy');
const camera = new Camera(lamb3d);
camera.transform.setPosition(0, 0, 7.0);
lamb3d.activeScene.camera = camera;

const shader = initShader('CustomShader');
const material = new Material('phong', shader);

const mesh = PrimitiveMesh.createCuboid(lamb3d, 1, 1, 1);
const entity = new Entity('cube1', mesh, material);

lamb3d.activeScene.addEntity(entity);
lamb3d.run();

function initShader(name) {
  var VSHADER_SOURCE = 
  'attribute vec3 POSITION;\n' + 
  'uniform mat4 u_viewMat;\n' + 
  'uniform mat4 u_projMat;\n' + 
  'void main() {\n' + 
  '  gl_Position = u_projMat * u_viewMat * vec4(POSITION, 1.0);\n' + 
  '}\n';

  // Fragment shader program
  var FSHADER_SOURCE =
  'precision mediump float;\n' + 
  'void main() {\n' + 
  '  gl_FragColor = vec4(0.5, 0.0, 0.0, 0.5);\n' + 
  '}\n';

  return Shader.create(name, VSHADER_SOURCE, FSHADER_SOURCE)
}
```

# Reference

- oasis : https://github.com/oasis-engine/engine

- cesium: https://github.com/CesiumGS/cesium

- MadDream3D: https://github.com/bajieSummer/MadDream3D
