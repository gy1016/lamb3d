const fs = require('fs');
const path = require('path');

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import glslify from 'rollup-plugin-glslify';
import serve from 'rollup-plugin-serve';
import replace from '@rollup/plugin-replace';

const { BUILD_TYPE, NODE_ENV } = process.env;

const pkgsRoot = path.join(__dirname, 'packages');
const pkgs = fs
  .readdirSync(pkgsRoot)
  .filter((dir) => dir !== 'wasm')
  .map((dir) => path.join(pkgsRoot, dir))
  .filter((dir) => fs.statSync(dir).isDirectory())
  .map((location) => {
    return {
      location: location,
      pkgJson: require(path.resolve(location, 'package.json')),
    };
  });

const extensions = ['.js', '.ts'];
const mainFields = NODE_ENV === 'development' ? ['debug', 'module', 'main'] : undefined;

const commonPlugins = [
  resolve({ extensions, preferBuiltins: true, mainFields }),
  glslify({
    include: [/\.glsl$/],
  }),
  commonjs(),
  NODE_ENV === 'development'
    ? serve({
        contentBase: 'packages',
        port: 9999,
      })
    : null,
];

function config({ location, pkgJson }) {
  const input = path.join(location, 'src', 'index.ts');
  const dependencies = Object.assign({}, pkgJson.dependencies ?? {}, pkgJson.peerDependencies ?? {});
  const external = Object.keys(dependencies);

  commonPlugins.push(
    typescript({
      // 不查文档谁能找到这个设置，这个插件太铸币了
      useTsconfigDeclarationDir: true,
      // /root/projects/fontend/lamb3d/packages/math/tsconfig.json
      tsconfig: path.resolve(location, 'tsconfig.json'),
    }),
    replace({
      preventAssignment: true,
      __buildVersion: pkgJson.version,
    }),
  );

  return {
    // mini: () => {
    //   const plugins = [...commonPlugins, ...miniProgramPlugin];
    //   return {
    //     input,
    //     output: [
    //       {
    //         format: 'cjs',
    //         file: path.join(location, 'dist/miniprogram.js'),
    //         sourcemap: false,
    //       },
    //     ],
    //     external: Object.keys(pkgJson.dependencies || {})
    //       .concat('@oasis-engine/miniprogram-adapter')
    //       .map((name) => `${name}/dist/miniprogram`),
    //     plugins,
    //   };
    // },
    module: () => {
      const plugins = [...commonPlugins];
      return {
        input,
        external,
        output: [
          {
            file: path.join(location, pkgJson.module),
            format: 'es',
            sourcemap: true,
          },
          {
            file: path.join(location, pkgJson.main),
            format: 'commonjs',
            sourcemap: true,
          },
        ],
        plugins,
      };
    },
  };
}

async function makeRollupConfig({ type, compress = true, visualizer = true, ..._ }) {
  return config({ ..._ })[type](compress, visualizer);
}

let promises = [];

switch (BUILD_TYPE) {
  case 'MODULE':
    promises.push(...getModule());
    break;
  case 'MINI':
    promises.push(...getMini());
    break;
  case 'ALL':
    promises.push(...getAll());
    break;
  default:
    break;
}

function getModule() {
  const configs = [...pkgs];
  return configs.map((config) => makeRollupConfig({ ...config, type: 'module' }));
}

function getMini() {
  const configs = [...pkgs];
  return configs.map((config) => makeRollupConfig({ ...config, type: 'mini' }));
}

function getAll() {
  return [...getModule(), ...getMini()];
}

export default Promise.all(promises);
