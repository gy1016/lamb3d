<!-- PROJECT LOGO -->
<br />
<p align="center">
  <!-- <a href="https://github.com/gy1016/lamb3d">
    <img src="https://s2.ax1x.com/2020/03/10/8iEuqO.png" alt="Logo" width="80" height="80">
  </a> -->
  <h1 align="center">lamb3d</h1>
</p>

<!-- ABOUT THE PROJECT -->

# Introduction

A javascript 3d mini engine for gis.

# Architecture

![Engine Architecture](./lamb3d.png)

# Usage

```js
import { Engine, PrimitiveMesh, Entity } from 'lamb3d';

// 创建引擎
const engine = new Engine('gy');

// 创建正方形网格
const mesh = PrimitiveMesh.createCuboid(2, 2, 2);
// 根据正方形网格实力化实体（此步实际上是向entity上添加了顶点与片元着色信息）
const entity = new Entity('cube1', mesh);

// 利用引擎创建场景
const scene1 = engine.createScene();
// 将实体添加到场景当中
scene1.addEntity(entity);

// 运行引擎
engine.run()
```


# Reference

- oasis : https://github.com/oasis-engine/engine

- cesium: https://github.com/CesiumGS/cesium

- MadDream3D: https://github.com/bajieSummer/MadDream3D
