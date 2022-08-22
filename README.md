<!-- PROJECT LOGO -->
<div align="center">

# lamb3d

_✨ Author: lamb ✨_
</div>

<p align="center">
  <a href="https://github.com/gy1016/lamb3d">
    <img src="https://img.shields.io/badge/Github-lamb3d-brightgreen?logo=github" alt="frontend_repository">
  </a>
  <a href="stargazers">
    <img src="https://img.shields.io/github/stars/gy1016/lamb3d?color=yellow&label=Github%20Stars" alt="star">
  </a>
  <a href="release">
    <img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" alt="release">
  </a>
</p>

<!-- ABOUT THE PROJECT -->

# Introduction

A 3d gis engine written in TypeScript and WebAssembly.

# Document

Here you can see the mind map of the design engine, system architecture and my [brainstorming](https://www.yuque.com/shengaoyang-rl1fl/apm3zh). 

Documentation generated with Typedoc is [here](http://www.sgyat.cn/lamb3d/)!


# Architecture

The modules currently included in lamb3d are shown in the following figure:

![Engine Xmind](http://121.199.160.202/images/project/lamb3d/xmind.png)

The system architecture diagram of lamb3d is as follows:

![Engine Architecture](http://121.199.160.202/images/project/lamb3d/systemstruct.png)

# Usage

First we use pnpm to install.

```bash
pnpm install lamb3d
```

Then we create a canvas tag and specify the id.

```html
<canvas id="lamb">Your browser does not support canvas~<canvas>
```

Finally, we write a piece of js code.

```js
import { Engine } from 'lamb3d';

const lamb3d = new Engine('lamb');
lamb3d.run();
```

Let's see the effect:

![Engine Architecture](http://121.199.160.202/images/project/lamb3d/earth.png)

# Reference

- oasis : https://github.com/oasis-engine/engine

- cesium: https://github.com/CesiumGS/cesium

- MadDream3D: https://github.com/bajieSummer/MadDream3D
