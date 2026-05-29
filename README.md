# geoGlobe3D

> 基于 [Cesium](https://cesium.com/) 的三维地图开发框架，提供简洁易用的 API，快速构建 WebGL 三维地球应用。

**版本** v1.3.0 · **协议** Apache-2.0 · **依赖** Cesium（内置）

[![npm](https://img.shields.io/npm/v/geoglobe-3d)](https://www.npmjs.com/package/geoglobe-3d)

**NPM:** <https://www.npmjs.com/package/geoglobe-3d>

---

## 目录

- [架构总览](#架构总览)
- [安装与构建](#安装与构建)
- [快速开始](#快速开始)
- [Vue 3 + Vite 集成](#vue-3--vite-集成)
- [产物说明](#产物说明)
- [GeoMap — 核心类](#geomap--核心类)
  - [构造参数](#构造参数)
  - [图层管理](#图层管理)
  - [相机与视图](#相机与视图)
  - [底图与地形](#底图与地形)
  - [场景效果](#场景效果)
  - [时钟与时间](#时钟与时间)
  - [截图与销毁](#截图与销毁)
- [图层 API](#图层-api)
  - [Layer — 基类](#layer--基类)
  - [ImageryLayer — 影像图层](#imagerylayer--影像图层)
  - [TerrainLayer — 地形图层](#terrainlayer--地形图层)
  - [TilesetLayer — 3D Tiles](#tilesetlayer--3d-tiles)
  - [GeoJsonLayer](#geojsonlayer)
    - [mapboxStyle — Mapbox GL Style 渲染](#mapboxstyle--mapbox-gl-style-渲染)
  - [GraphicLayer — 图形容器](#graphiclayer--图形容器)
  - [WfsLayer — WFS 图层](#wfslayer--wfs-图层)
  - [KmlLayer / CzmlLayer](#kmllayer--czmllayer)
  - [MapboxStyleLayer — Mapbox Style 图层](#mapboxstylelayer--mapbox-style-图层)
- [图形 API](#图形-api)
  - [BaseGraphic — 公共接口](#basegraphic--公共接口)
  - [PointGraphic](#pointgraphic)
  - [BillboardGraphic](#billboardgraphic)
  - [LabelGraphic](#labelgraphic)
  - [PolylineGraphic](#polylinegraphic)
  - [PolygonGraphic](#polygongraphic)
  - [CircleGraphic](#circlegraphic)
  - [RectangleGraphic](#rectanglegraphic)
  - [WallGraphic](#wallgraphic)
  - [ModelGraphic](#modelgraphic)
  - [BoxGraphic / CylinderGraphic / EllipsoidGraphic / EllipseGraphic](#boxgraphic--cylindergraphic--ellipsoidgraphic--ellipsegraphic)
- [工具类](#工具类)
  - [Draw — 绘制工具](#draw--绘制工具)
  - [Measure — 量算工具](#measure--量算工具)
  - [Buffer — 缓冲区分析](#buffer--缓冲区分析)
- [控件](#控件)
  - [Navigation](#navigation)
  - [NavBar](#navbar)
  - [Toolbar — 状态栏](#toolbar--状态栏)
- [管理器](#管理器)
  - [EventManager — 事件](#eventmanager--事件)
  - [PopupManager — 弹窗](#popupmanager--弹窗)
  - [TooltipManager — 提示](#tooltipmanager--提示)
- [SpaceSkyBox — 天空盒](#spaceskybox--天空盒)
- [常量与枚举](#常量与枚举)
- [实战案例](#实战案例)
- [FAQ](#faq)

---

## 架构总览

```
┌──────────────────────────────────────────────────────────┐
│                       geoGlobe3D                         │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │                     GeoMap                         │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │  │
│  │  │  Layers  │  │ Graphics │  │    Managers      │ │  │
│  │  │          │  │          │  │                  │ │  │
│  │  │ Imagery  │  │  Point   │  │  EventManager   │ │  │
│  │  │ Terrain  │  │  Line    │  │  PopupManager   │ │  │
│  │  │ Tileset  │  │  Polygon │  │  TooltipManager │ │  │
│  │  │ GeoJSON  │  │  Circle  │  │                  │ │  │
│  │  │ KML/CZML │  │  Model   │  └──────────────────┘ │  │
│  │  │ Graphic  │  │  Wall    │                        │  │
│  │  │          │  │  Rect    │  ┌──────────────────┐  │  │
│  │  └──────────┘  │  Box/... │  │    Controls      │  │  │
│  │                └──────────┘  │                  │  │  │
│  │  ┌──────────┐                │  NavBar          │  │  │
│  │  │  Tools   │                │  Navigation      │  │  │
│  │  │  Draw    │                │  Toolbar         │  │  │
│  │  │  Measure │                └──────────────────┘  │  │
│  │  │  Buffer  │                                       │  │
│  │  └──────────┘                                      │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│                   ┌──────────────┐                       │
│                   │  Cesium.js   │                       │
│                   └──────────────┘                       │
└──────────────────────────────────────────────────────────┘
```

**数据流向**：GeoMap 初始化 Cesium Viewer → 图层/图形/控件通过 `addTo(map)` 挂载 → EventManager 统一派发交互事件 → PopupManager / TooltipManager 响应图形交互。

**关键设计**：
- 所有坐标统一使用 **`[经度, 纬度, 高度]`** 度制数组
- 所有颜色支持 **CSS 字符串**（`'#ff0000'`、`'rgba(255,0,0,0.5)'`）或 Cesium.Color 实例
- 异步图层（Imagery / Terrain / Tileset / GeoJSON / KML / CZML）加载完成后触发 `'load'` 事件
- Draw / Measure / Buffer 使用 **Promise API** — `await draw.point()`，右键结束

---

## 安装与构建

```bash
# 安装依赖
npm install

# 生产构建
npm run build

# 开发模式（文件监听 + 自动重建）
npm run dev

# 本地预览 http://localhost:8080
npm start
```

---

## 快速开始

### UMD — 浏览器直接引用

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="dist/Widgets/widgets.css">
  <style>html, body, #map { margin: 0; width: 100%; height: 100%; }</style>
</head>
<body>
  <div id="map"></div>
  <script src="dist/geoglobe.min.js"></script>
  <script>
    // 创建地图
    const map = new geoGlobe.GeoMap('map', {
      skyBox: 'space',
      camera: { position: [116.4, 39.9, 8000000] }
    });

    // 添加影像图层
    const imagery = new geoGlobe.ImageryLayer({
      type: 'xyz',
      url: 'https://webst01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&style=6'
    });
    map.addLayer(imagery);

    // 在图层上绘制点
    const layer = new geoGlobe.GraphicLayer({ id: 'marks' });
    map.addLayer(layer);

    layer.addGraphic(new geoGlobe.PointGraphic({
      position: [116.4, 39.9, 0],
      style: { pixelSize: 12, color: '#ff0000' },
      popup: '<b>北京</b>',
      tooltip: '中国首都'
    }));
  </script>
</body>
</html>
```

### ESM — 模块化导入

```js
import { GeoMap, GraphicLayer, PointGraphic, ImageryLayer } from 'geoglobe-3d';

const map = new GeoMap('map', {
  skyBox: 'space',
  camera: { position: [116.4, 39.9, 8000000] }
});

const layer = new GraphicLayer({ id: 'marks' });
map.addLayer(layer);

layer.addGraphic(new PointGraphic({
  position: [116.4, 39.9, 0],
  style: { pixelSize: 12, color: '#ff0000' }
}));
```

### Vue 3 + Vite 集成

> 完整示例项目见 `examples/vue3-demo/`

#### 1. 安装

```bash
npm install geoglobe-3d
```

> Cesium 已内置于 geoglobe-3d，无需单独安装 cesium。

#### 2. 拷贝静态资源

将 `node_modules/geoglobe-3d/dist/` 整个目录拷贝到 `public/geoglobe/`（包含 JS 产物、Workers、Assets、Widgets、ThirdParty）：

```bash
# Linux / macOS
cp -r node_modules/geoglobe-3d/dist public/geoglobe

# Windows (PowerShell)
Copy-Item -Recurse -Force "node_modules/geoglobe-3d/dist" "public/geoglobe"
```

推荐在 `package.json` 中添加脚本自动执行：

```json
{
  "scripts": {
    "copy-assets": "node scripts/copy-geoglobe-assets.js"
  }
}
```

```js
// scripts/copy-geoglobe-assets.js
import { cpSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const src = resolve(root, 'node_modules/geoglobe-3d/dist');
const dest = resolve(root, 'public/geoglobe');

if (!existsSync(src)) {
  console.error('找不到 node_modules/geoglobe-3d/dist，请先运行 npm install');
  process.exit(1);
}
cpSync(src, dest, { recursive: true });
console.log('已复制 geoglobe-3d/dist -> public/geoglobe');
```

#### 3. 在 index.html 引入 UMD 版本

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>geoGlobe3D Vue3 Demo</title>
    <!-- 引入 Cesium 组件样式 -->
    <link rel="stylesheet" href="/geoglobe/Widgets/widgets.css" />
  </head>
  <body>
    <div id="app"></div>
    <!-- 引入 UMD 版本，注册全局 window.geoGlobe -->
    <script src="/geoglobe/geoglobe.js"></script>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

> UMD 版本加载后自动根据 script 标签路径推断 `CESIUM_BASE_URL`，无需手动设置。

#### 4. Vite 配置

```js
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()]
});
```

> 由于 geoglobe 通过 `<script>` 标签引入（非 ESM import），Vite 配置无需额外处理。

#### 5. 地图组件

```vue
<!-- src/components/MapView.vue -->
<template>
  <div class="map-wrapper">
    <!-- 自定义工具栏 -->
    <div class="toolbar">
      <div class="bar-group">
        <span class="label">绘制</span>
        <button @click="doDraw('point')">点</button>
        <button @click="doDraw('polyline')">线</button>
        <button @click="doDraw('polygon')">面</button>
        <button @click="doDraw('rectangle')">矩形</button>
        <button @click="doDraw('circle')">圆</button>
        <button @click="clearDraw()">清除</button>
      </div>
      <div class="bar-group">
        <span class="label">量算</span>
        <button @click="doMeasure('distance')">距离</button>
        <button @click="doMeasure('area')">面积</button>
        <button @click="doMeasure('height')">高度</button>
        <button @click="clearMeasure()">清除</button>
      </div>
    </div>
    <!-- 地图容器 -->
    <div ref="mapContainer" class="map-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// geoGlobe 通过 index.html 的 <script> 标签引入，挂载在 window.geoGlobe 上
const { GeoMap, Draw, Measure } = window.geoGlobe;

const mapContainer = ref(null);
let map = null;
let draw = null;
let measure = null;

onMounted(() => {
  map = new GeoMap(mapContainer.value, {
    skyBox: 'space',
    control: {
      timeline: false,
      animation: false,
      baseLayerPicker: false,
      homeButton: false,
      sceneModePicker: false,
      navigationHelpButton: false,
      fullscreenButton: false,
      toolbar: true,    // 底部状态栏
      navBar: true,     // 左侧导航栏
      navigation: false
    },
    camera: {
      position: [116.39, 39.91, 8000000],
      heading: 0,
      pitch: -90,
      roll: 0
    }
  });

  draw = new Draw(map);
  measure = new Measure(map);
});

function doDraw(type) {
  if (draw && draw[type]) draw[type]();
}
function clearDraw() {
  if (draw && draw.clear) draw.clear();
}
function doMeasure(type) {
  if (measure && measure[type]) measure[type]();
}
function clearMeasure() {
  if (measure && measure.clear) measure.clear();
}

onBeforeUnmount(() => {
  if (map && map.destroy) {
    map.destroy();
  }
});
</script>

<style scoped>
.map-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}
.map-container {
  width: 100%;
  height: 100%;
}
</style>
```

#### 6. 运行

```bash
npm install
npm run copy-assets   # 复制 geoglobe-3d/dist -> public/geoglobe
npm run dev            # 启动 Vite 开发服务器
```

> **注意事项**：
> - 确保 CSS 高度链完整：`html, body, #app` 都需设置 `width: 100%; height: 100%`，否则地图容器高度为 0。
> - 使用 `let` 而非 `ref()` 保存地图实例，避免 Vue 的 reactive proxy 深度代理 Cesium 内部对象导致性能问题。
> - 组件卸载时务必调用 `destroy()` 释放 WebGL 资源。
> - `public/geoglobe/` 目录由脚本生成，建议加入 `.gitignore`。

---

## 产物说明

| 文件 | 格式 | Cesium | 适用场景 |
|------|------|--------|----------|
| `dist/geoglobe.js` | UMD | 内含 | 浏览器 `<script>` 标签 |
| `dist/geoglobe.min.js` | UMD (压缩) | 内含 | 生产环境 |
| `dist/geoglobe.esm.js` | ES Module | 内含 | Webpack / Vite / Rollup |
| `dist/geoglobe.cjs.js` | CommonJS | 内含 | Node.js / SSR |
| `dist/index.d.ts` | TypeScript 声明 | — | Vue/React + TS 项目 |

附属资源（需整体部署）：

| 目录 | 说明 |
|------|------|
| `dist/Workers/` | Cesium Web Worker 文件 |
| `dist/Assets/` | 纹理、地形高度等静态资源 |
| `dist/Widgets/` | UI 组件样式 |

> 引用 UMD 版本时，框架自动推断 `CESIUM_BASE_URL`，无需手动设置。

---

## GeoMap — 核心类

```js
// UMD
const map = new geoGlobe.GeoMap(container, options);

// ESM
import { GeoMap } from 'geoglobe-3d';
const map = new GeoMap(container, options);
```

`container`：DOM 元素或元素 id 字符串。`GeoMap` 同时以 `Map` 别名导出。

### 构造参数

```js
const map = new GeoMap('map', {
  // ─── 底图 ───
  baseImagery: 'naturalEarth',    // 'naturalEarth'(默认) | 'osm' | 'none' | imageryProvider 实例

  // ─── 天空盒 ───
  skyBox: 'space',                // 'space'(默认) | 'default' | false | { sources, animate, ... }

  // ─── 场景 ───
  scene: {
    sceneMode: SceneMode.SCENE3D, // SCENE3D | SCENE2D | COLUMBUS_VIEW
    globe: {
      baseColor: Color.BLACK,
      depthTestAgainstTerrain: false,
      enableLighting: false,
      showGroundAtmosphere: true
    }
  },

  // ─── 控件 ───
  control: {
    // Cesium 原生控件（true/false）
    baseLayerPicker: false,       // 底图切换器
    geocoder: false,              // 地址搜索框
    homeButton: true,             // 复位按钮
    sceneModePicker: true,        // 场景模式切换（3D/2D/Columbus）
    navigationHelpButton: true,   // 帮助按钮
    animation: false,             // 动画时钟控件
    timeline: false,              // 时间轴
    fullscreenButton: true,       // 全屏按钮
    infoBox: false,               // 要素信息弹窗（原生）
    selectionIndicator: false,    // 选中指示器

    // 扩展控件：navigation（罗盘 + 缩放 + 比例尺）
    navigation: false,
    // 或传对象精细控制：
    navigation: {
      enableCompass: true,          // 罗盘
      enableZoomControls: true,     // 缩放按钮
      enableDistanceLegend: true,   // 比例尺
      enableCompassOuterRing: true, // 罗盘外环交互
    },

    // 扩展控件：navBar（左/右侧竖向导航栏）
    navBar: false,
    // 或传对象：
    navBar: {
      position: 'left',      // 'left' | 'right'
      top: '50%',            // CSS top 值
      showCompass: true,     // 罗盘
      showHome: true,        // 复位按钮
      showSceneMode: true,   // 场景模式切换
      showZoom: true,        // 缩放按钮
      zoomFactor: 1.5,       // 每次缩放倍率
    },

    // 扩展控件：toolbar（底部状态栏）
    toolbar: false,
    // 或传对象精细控制每一项：
    toolbar: {
      showLon: true,           // 经度
      showLat: true,           // 纬度
      showProjection: true,    // 横 / 纵（Web Mercator 投影坐标）
      showAltitude: true,      // 海拔（地形高程）
      showLevel: true,         // 层级 (0-22)
      showHeading: true,       // 方向角
      showPitch: true,         // 俯仰角
      showCameraHeight: true,  // 视高
      showFPS: true,           // 帧率
      showScalebar: true,      // 左上角比例尺
    },
  },

  // ─── 弹窗 & 提示 ───
  popup: true,   // true | false | { auto, closeButton, followCamera, offset, className }
  tooltip: true, // true | false | { offset, className }

  // ─── 地形 ───
  terrain: {
    enabled: false,
    url: undefined,          // 自定义 CTB URL；不填且 enabled:true 时使用 Cesium World Terrain
    ionAssetId: undefined,   // Cesium Ion 地形资产 ID
  },

  // ─── 地形夸张（scene.globe 配置项）───
  scene: {
    globe: {
      terrainExaggeration: 1.0  // 地形垂直夸张倍数，默认 1.0；设为 2.5 可增强地形立体感
    }
  },

  // ─── Ion Token ───
  accessToken: 'your-cesium-ion-token',

  // ─── 初始相机 ───
  camera: {
    position: [116.4, 39.9, 10000000], // [经度, 纬度, 高度(米)]
    heading: 0,   // 朝向角(度)
    pitch: -90,   // 俯仰角(度)
    roll: 0
  }
});
```

### 图层管理

#### 增删查

| 方法 | 签名 | 返回值 | 说明 |
|------|------|--------|------|
| `addLayer` | `(layer: Layer)` | `GeoMap` | 添加图层 |
| `removeLayer` | `(layer: Layer)` | `GeoMap` | 移除图层 |
| `removeLayerById` | `(id: string)` | `GeoMap` | 按 id 移除 |
| `removeAllLayers` | `()` | `GeoMap` | 移除全部 |
| `getLayer` | `(id: string)` | `Layer \| undefined` | 按 id 查找 |
| `getLayerByName` | `(name: string)` | `Layer \| undefined` | 按 name 查找 |
| `getLayers` | `()` | `Layer[]` | 获取全部(副本) |
| `hasLayer` | `(layer: Layer)` | `boolean` | 是否包含 |
| `getLayerCount` | `()` | `number` | 图层数量 |

#### 排序

| 方法 | 说明 |
|------|------|
| `raiseLayer(layer)` | 上移一层 |
| `lowerLayer(layer)` | 下移一层 |
| `raiseLayerToTop(layer)` | 置顶 |
| `lowerLayerToBottom(layer)` | 置底 |
| `moveLayerTo(layer, index)` | 移到指定位置（0 = 最底层） |

#### 显隐

| 方法 | 说明 |
|------|------|
| `showLayer(id)` | 显示图层 |
| `hideLayer(id)` | 隐藏图层 |
| `toggleLayer(id)` | 切换显隐 |

### 相机与视图

| 方法 | 签名 | 说明 |
|------|------|------|
| `flyTo` | `(position: [lng,lat,h], options?)` | 飞行动画。options: `{ duration, heading, pitch, roll }` |
| `setView` | `([lng,lat,h])` 或 `({ position, heading, pitch, roll })` | 瞬间跳转 |
| `setCamera` | `({ position?, heading?, pitch?, roll? })` | 设置相机 |
| `resetView` | `()` | 复位到初始位置 |
| `zoomIn` | `(amount=2)` | 放大 |
| `zoomOut` | `(amount=2)` | 缩小 |
| `zoomTo` | `(target, options?)` | 飞行到图层/图形范围 |
| `setSceneMode` | `(mode, duration=2)` | 切换场景: `'3d'`/`'2d'`/`'columbus'` |

#### 查询

| 方法 | 返回值 | 说明 |
|------|--------|------|
| `getCenter()` | `[lng, lat, h] \| undefined` | 视图中心 |
| `getCamera()` | `{ position, heading, pitch, roll, height }` | 相机姿态 |
| `getCurrentExtent()` | `{ west, south, east, north } \| undefined` | 视图范围(度) |

```js
// 飞行到北京上空
map.flyTo([116.4, 39.9, 5000], { duration: 2, pitch: -45 });

// 瞬间跳转（两种写法等价）
map.setView([116.4, 39.9, 5000]);
map.setView({ position: [116.4, 39.9, 5000], heading: 0, pitch: -45, roll: 0 });

// 切换到 2D 模式
map.setSceneMode('2d', 2);
```

### 底图与地形

```js
// 运行时切换底图
map.setBaseImagery('osm');
map.setBaseImagery('naturalEarth');
map.setBaseImagery(customProviderInstance);
map.setBaseImagery('none');

// 运行时切换地形（异步）
await map.setTerrain({ url: 'https://your-terrain-ctb' });  // 自定义 CTB
await map.setTerrain({ ionAssetId: 1 });                     // Cesium Ion 资产
await map.setTerrain({ type: 'arcgis' });                    // ArcGIS 全球地形（无需 Token）
await map.setTerrain({ enabled: false });                    // 关闭地形

// 地形夸张（初始化后也可直接访问 globe）
map.viewer.scene.globe.terrainExaggeration = 2.5;
```

### 场景效果

| 方法 | 参数 | 说明 |
|------|------|------|
| `setSkyBox(opt)` | `'space' \| 'default' \| false \| { sources }` | 天空盒 |
| `setFog(opts)` | `{ enabled, density, minimumBrightness }` | 雾效 |
| `setAtmosphere(opts)` | `{ show, lightIntensity, rayleighScaleHeight }` | 大气 |
| `setSunLight(enabled)` | `boolean` | 太阳光照 |

### 时钟与时间

| 方法 | 签名 | 说明 |
|------|------|------|
| `setClock` | `(opts)` | 配置时钟 |
| `getTime` | `()` → `string` | 获取当前时间 (ISO) |
| `setTime` | `(isoString)` | 跳转到指定时间 |
| `setTimeSpeed` | `(multiplier)` | 播放速率(负值倒放) |
| `startClock` | `()` | 开始 |
| `stopClock` | `()` | 暂停 |

`setClock` 参数：

| 属性 | 类型 | 说明 |
|------|------|------|
| `start` | `string` | 开始时间 ISO，如 `'2024-01-01T00:00:00Z'` |
| `stop` | `string` | 结束时间 ISO |
| `current` | `string` | 当前时间 ISO |
| `multiplier` | `number` | 时间倍率，默认 1 |
| `clockRange` | `string` | `'unbounded'` / `'clamped'` / `'loop'` |
| `animate` | `boolean` | 是否自动播放 |

```js
map.setClock({
  start: '2024-01-01T00:00:00Z',
  stop: '2024-12-31T23:59:59Z',
  current: '2024-06-01T12:00:00Z',
  multiplier: 100,
  clockRange: 'loop',
  animate: true
});
```

### 截图与销毁

```js
const base64 = map.screenshot();                                  // PNG base64
const jpeg   = map.screenshot({ type: 'image/jpeg', quality: 0.9 });
map.downloadScreenshot('my-map.png');                              // 浏览器下载

map.destroy(); // 销毁地图，释放所有资源
```

---

## 图层 API

### Layer — 基类

所有图层继承自 `Layer`，共享以下接口：

**构造参数**

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `id` | `string` | 自动 UUID | 唯一标识 |
| `name` | `string` | `''` | 名称 |
| `show` | `boolean` | `true` | 可见性 |

**公共方法**

| 方法 | 说明 |
|------|------|
| `addTo(map)` | 添加到地图 |
| `remove()` | 从地图移除 |
| `destroy()` | 移除并清理事件 |
| `setShow(show)` / `showLayer()` / `hideLayer()` / `toggleShow()` | 显隐控制 |
| `getIndex()` | 在 `map.layers` 中的索引 |
| `on(event, cb)` / `once(event, cb)` / `off(event, cb?)` | 事件监听 |

图层事件：`'load'`（加载完成）、`'error'`（加载失败）、`'click'`。

---

### ImageryLayer — 影像图层

```js
const layer = new ImageryLayer({
  id: 'gaode', name: '高德影像',
  type: 'xyz',
  url: 'https://webst01.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&style=6'
});
map.addLayer(layer);
```

**构造参数**（除 Layer 公共参数外）

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `string` | `'xyz'` | 类型，见下表 |
| `url` | `string` | — | 服务 URL |
| `alpha` | `number` | `1.0` | 透明度 (0~1) |
| `maximumLevel` | `number` | — | 最大层级 |
| `minimumLevel` | `number` | `0` | 最小层级 |
| `layer` | `string` | — | WMTS/WMS 图层名 |
| `style` | `string` | — | WMTS 样式名 |
| `format` | `string` | `'image/png'` | 瓦片格式 |
| `tileMatrixSetID` | `string` | — | WMTS 矩阵集 |
| `layers` | `string` | — | WMS 图层列表 |
| `ionAssetId` | `number` | — | Ion 资产 ID |
| `color` | `string` | — | 单色图层颜色 |
| `rectangle` | `number[]` | — | `[west,south,east,north]` 度 |

**type 取值对照**

| type | 底层 Provider | 说明 |
|------|--------------|------|
| `'xyz'` | `UrlTemplateImageryProvider` | XYZ 瓦片 |
| `'tms'` | `UrlTemplateImageryProvider` | TMS 服务（与 xyz 共用） |
| `'osm'` | `OpenStreetMapImageryProvider` | OSM 瓦片 |
| `'wmts'` | `WebMapTileServiceImageryProvider` | WMTS 服务 |
| `'wms'` | `WebMapServiceImageryProvider` | WMS 服务 |
| `'arcgis'` | `ArcGisMapServerImageryProvider` | ArcGIS 服务 |
| `'ion'` | `IonImageryProvider` | Cesium Ion 影像 |
| `'singleTile'` | `SingleTileImageryProvider` | 单张图片 |
| `'singleColor'` / `'color'` | Canvas 生成 | 纯色覆盖 |
| `'mvt'` | `CesiumMVTImageryProvider` | MVT 矢量瓦片 |

#### MVT 矢量瓦片

基于 [cesium-mvt-imagery-provider](https://github.com/reearth/cesium-mvt-imagery-provider) 渲染 Mapbox Vector Tile (MVT) 格式矢量瓦片。

**额外参数**

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `layerName` | `string` | `''` | 矢量瓦片中的图层名 |
| `mvtStyle` | `Function` | — | 样式函数 `(feature, tileCoord) => { fillStyle, strokeStyle, lineWidth }` |
| `onSelectFeature` | `Function` | — | 要素点击回调 `(feature) => void` |
| `headers` | `object` | — | 请求头 `{ Authorization: 'Bearer ...' }` |
| `credit` | `string` | — | 版权信息 |

```js
// 基础 MVT 图层
new ImageryLayer({
  type: 'mvt',
  url: 'https://your-server/tiles/{z}/{x}/{y}.pbf',
  layerName: 'buildings',
  maximumLevel: 16,
  mvtStyle: (feature) => {
    const type = feature.properties.type;
    return {
      fillStyle: type === 'commercial' ? 'rgba(255,100,0,0.6)' : 'rgba(100,149,237,0.4)',
      strokeStyle: '#333',
      lineWidth: 1
    };
  },
  onSelectFeature: (feature) => {
    console.log('选中要素:', feature.properties);
  }
}).addTo(map);

// 带鉴权的 MVT
new ImageryLayer({
  type: 'mvt',
  url: 'https://api.example.com/tiles/{z}/{x}/{y}.pbf',
  layerName: 'roads',
  headers: { Authorization: 'Bearer your-token' },
  mvtStyle: (feature) => ({
    strokeStyle: feature.properties.level === 'highway' ? '#e74c3c' : '#999',
    fillStyle: 'transparent',
    lineWidth: feature.properties.level === 'highway' ? 3 : 1
  })
}).addTo(map);
```

**图层调整方法**

| 方法 | 说明 |
|------|------|
| `setAlpha(v)` / `setOpacity(v)` | 透明度 (0~1) |
| `setBrightness(v)` | 亮度 (1.0=默认) |
| `setContrast(v)` | 对比度 |
| `setSaturation(v)` | 饱和度 (0=灰度) |
| `setHue(v)` | 色调 |
| `setGamma(v)` | 伽马 |
| `raise()` / `lower()` / `raiseToTop()` / `lowerToBottom()` | 排序 |

```js
// WMTS
new ImageryLayer({
  type: 'wmts',
  url: 'https://example.com/wmts',
  layer: 'layerName',
  style: 'default',
  tileMatrixSetID: 'EPSG:4326'
}).addTo(map);

// WMS
new ImageryLayer({
  type: 'wms',
  url: 'https://example.com/wms',
  layers: 'roads'
}).addTo(map);
```

---

### TerrainLayer — 地形图层

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `type` | `string` | `'ellipsoid'` | `'ion'` / `'cesium'` / `'ellipsoid'` |
| `url` | `string` | — | CTB 地形 URL（`cesium` 类型必填） |
| `ionAssetId` | `number` | `1` | Ion 资产 ID（`ion` 类型） |
| `requestVertexNormals` | `boolean` | `false` | 请求法线（光照用） |
| `requestWaterMask` | `boolean` | `false` | 请求水面遮罩 |

```js
new TerrainLayer({
  type: 'cesium',
  url: 'https://your-terrain-ctb-service'
}).addTo(map);
```

---

### TilesetLayer — 3D Tiles

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `url` | `string` | — | tileset.json URL |
| `ionAssetId` | `number` | — | Ion 资产 ID |
| `maximumScreenSpaceError` | `number` | `16` | 最大屏幕空间误差 |
| `maximumMemoryUsage` | `number` | `512` | 最大内存 (MB) |
| `position` | `number[]` | — | 位置偏移 `[lng, lat, height]` |
| `rotation` | `object` | — | 旋转 `{ heading, pitch, roll }`(度） |
| `shadows` | `boolean` | `false` | 阴影 |
| `backFaceCulling` | `boolean` | `true` | 背面剔除 |
| `style` | `object` | — | 3D Tiles Style，转为 `Cesium3DTileStyle` |
| `onClick` | `Function` | — | 点击回调 `(picked, click)` |
| `onReady` | `Function` | — | 加载完成回调 |

**方法**：`flyTo(options?)`、`raise()`、`lower()`、`raiseToTop()`、`lowerToBottom()`

```js
const tileset = new TilesetLayer({
  url: 'https://your-server/tileset.json',
  maximumScreenSpaceError: 16,
  position: [116.4, 39.9, 0],
  rotation: { heading: 0, pitch: 0, roll: 0 },
  style: { color: "color('white', 0.8)" }
});
map.addLayer(tileset);
tileset.flyTo();
```

---

### GeoJsonLayer

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `url` | `string` | — | GeoJSON 文件 URL |
| `data` | `object` | — | 内联 GeoJSON 对象 |
| `stroke` | `string` | `'#ffff00'` | 线颜色 |
| `strokeWidth` | `number` | `2` | 线宽 |
| `fill` | `string` | `'rgba(255,255,0,0.4)'` | 填充色 |
| `markerSize` | `number` | `48` | 点标记大小 |
| `markerColor` | `string` | `'#4169E1'` | 点标记颜色 |
| `clampToGround` | `boolean` | `false` | 贴地 |
| `onClick` | `Function` | — | 点击回调 `(entity, click)` |
| `onLoad` | `Function` | — | 加载回调 `(dataSource)` |
| `mapboxStyle` | `object \| object[]` | — | Mapbox GL Style 渲染规则（详见下文） |

> **注意**：样式属性在**顶层**，不嵌套在 `style` 对象中。

**方法**：`getEntities()`、`flyTo(options?)`、`raise()`、`lower()`、`raiseToTop()`、`lowerToBottom()`

```js
// URL 加载
new GeoJsonLayer({
  url: './data/china.geojson',
  stroke: '#ff6600',
  strokeWidth: 2,
  fill: '#ff6600',
  clampToGround: true
}).addTo(map);

// 内联数据
new GeoJsonLayer({
  data: { type: 'FeatureCollection', features: [...] }
}).addTo(map);
```

#### mapboxStyle — Mapbox GL Style 渲染

`mapboxStyle` 参数允许使用 Mapbox GL 的 `paint` 语法来声明式定义 GeoJSON 要素的样式，支持**表达式**（data-driven styling）和 **filter** 过滤。传入单个规则对象或规则数组。

**规则结构**

```js
{
  type: 'fill' | 'fill-extrusion' | 'line' | 'circle',  // 样式类型
  filter: [...],   // 可选，Mapbox 表达式过滤器
  paint: { ... }   // Mapbox GL paint 属性
}
```

**支持的 type 与 paint 属性**

| type | paint 属性 | 说明 |
|------|-----------|------|
| `fill` | `fill-color`, `fill-opacity`, `fill-outline-color` | 面填充 |
| `fill-extrusion` | 同 fill + `fill-extrusion-height` | 面拉伸体 |
| `line` | `line-color`, `line-width`, `line-opacity`, `line-dasharray` | 线 |
| `circle` | `circle-color`, `circle-radius`, `circle-opacity`, `circle-stroke-color`, `circle-stroke-width` | 点（圆） |

**支持的表达式**

所有 paint 属性值均可使用表达式，而非仅限静态值：

| 表达式 | 示例 | 说明 |
|--------|------|------|
| `['get', 'prop']` | `['get', 'type']` | 读取要素属性 |
| `['has', 'prop']` | `['has', 'name']` | 属性是否存在 |
| `['match', input, v1, o1, ..., fallback]` | 见下方示例 | 离散映射 |
| `['case', cond1, o1, ..., fallback]` | — | 条件分支 |
| `['step', input, base, s1, o1, ...]` | 见下方示例 | 阶梯映射 |
| `['interpolate', ['linear'], input, s1, o1, ...]` | — | 线性插值 |
| `['==']` `['!=']` `['>']` `['<']` `['>=']` `['<=']` | `['==', ['get','type'], 'A']` | 比较运算 |
| `['all', cond1, cond2, ...]` | — | 全部满足 |
| `['any', cond1, cond2, ...]` | — | 任一满足 |
| `['!', expr]` | — | 取反 |
| `['literal', value]` | `['literal', [8, 4]]` | 字面量 |
| `['coalesce', expr1, expr2, ...]` | — | 第一个非空值 |
| `['concat', ...]` | — | 拼接字符串 |
| `['to-number', expr]` / `['to-string', expr]` | — | 类型转换 |

**示例：match — 按类型分色**

```js
new GeoJsonLayer({
  data: geojsonData,
  clampToGround: true,
  mapboxStyle: {
    type: 'fill',
    paint: {
      'fill-color': ['match', ['get', 'type'],
        'residential', '#2ecc71',
        'commercial',  '#e74c3c',
        'industrial',  '#f39c12',
        '#95a5a6'  // fallback
      ],
      'fill-opacity': 0.6,
      'fill-outline-color': '#fff'
    }
  }
}).addTo(map);
```

**示例：step — 按人口阶梯上色**

```js
new GeoJsonLayer({
  data: geojsonData,
  mapboxStyle: {
    type: 'circle',
    paint: {
      'circle-color': ['step', ['get', 'population'],
        '#3498db',          // < 500
        500,  '#2ecc71',    // 500 ~ 1000
        1000, '#f39c12',    // 1000 ~ 2000
        2000, '#e74c3c'     // >= 2000
      ],
      'circle-radius': ['step', ['get', 'population'],
        4, 500, 6, 1000, 9, 2000, 12
      ],
      'circle-stroke-color': '#fff',
      'circle-stroke-width': 2
    }
  }
}).addTo(map);
```

**示例：fill-extrusion — 拉伸柱状图**

```js
new GeoJsonLayer({
  data: geojsonData,
  clampToGround: false,
  mapboxStyle: {
    type: 'fill-extrusion',
    paint: {
      'fill-color': ['match', ['get', 'type'],
        'municipality', '#e74c3c',
        'economic',     '#2ecc71',
        '#95a5a6'
      ],
      'fill-opacity': 0.75,
      'fill-extrusion-height': ['step', ['get', 'population'],
        50000,
        3000,  100000,
        5000,  200000,
        10000, 600000
      ]
    }
  }
}).addTo(map);
```

**示例：line + dasharray — 虚线道路**

```js
new GeoJsonLayer({
  data: roadData,
  clampToGround: true,
  mapboxStyle: {
    type: 'line',
    paint: {
      'line-color': '#4fc3f7',
      'line-width': 2,
      'line-dasharray': [8, 4],   // 实线段 8 + 间隔 4
      'line-opacity': 0.85
    }
  }
}).addTo(map);
```

**示例：多规则 + filter — 分层渲染**

```js
new GeoJsonLayer({
  data: cityData,
  mapboxStyle: [
    {
      type: 'circle',
      filter: ['==', ['get', 'category'], 'capital'],
      paint: { 'circle-color': '#e74c3c', 'circle-radius': 14,
               'circle-stroke-color': '#FFD700', 'circle-stroke-width': 3 }
    },
    {
      type: 'circle',
      filter: ['==', ['get', 'category'], 'tier1'],
      paint: { 'circle-color': '#f39c12', 'circle-radius': 10,
               'circle-stroke-color': '#fff', 'circle-stroke-width': 2 }
    },
    {
      type: 'circle',
      filter: ['any',
        ['==', ['get', 'category'], 'tier2'],
        ['==', ['get', 'category'], 'tier3']
      ],
      paint: { 'circle-color': '#3498db', 'circle-radius': 5,
               'circle-stroke-color': '#fff', 'circle-stroke-width': 1 }
    }
  ]
}).addTo(map);
```

**示例：混合几何 — 一份 GeoJSON 多种类型**

```js
// 同一份 GeoJSON 中包含 Polygon + LineString + Point
new GeoJsonLayer({
  data: mixedGeojson,
  clampToGround: true,
  mapboxStyle: [
    { type: 'fill',   paint: { 'fill-color': 'rgba(100,149,237,0.3)', 'fill-outline-color': '#6495ED' } },
    { type: 'line',   paint: { 'line-color': '#FFD700', 'line-width': 3 } },
    { type: 'circle', paint: { 'circle-color': '#e74c3c', 'circle-radius': 7,
                                'circle-stroke-color': '#fff', 'circle-stroke-width': 2 } }
  ]
}).addTo(map);
```

---

### GraphicLayer — 图形容器

承载 Graphic 图形对象的容器图层。

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `graphics` | `Array` | `[]` | 初始图形 |
| `clustering` | `object` | — | 聚合配置 `{ enabled, pixelRange, minimumClusterSize }` |

| 方法 | 签名 | 说明 |
|------|------|------|
| `addGraphic` | `(graphic)` | 添加单个图形 |
| `addGraphics` | `(graphics[])` | 批量添加 |
| `removeGraphic` | `(graphic)` | 移除图形 |
| `getGraphicById` | `(id)` → `BaseGraphic?` | 按 id 查找 |
| `getGraphics` | `()` → `Array` | 获取全部(副本) |
| `clear` / `clearGraphics` | `()` | 清空全部 |
| `flyTo` | `(options?)` | 飞行到范围 |

```js
const layer = new GraphicLayer({ id: 'marks', name: '标注' });
map.addLayer(layer);

layer.addGraphic(point);
layer.addGraphics([line, polygon]);
layer.removeGraphic(point);
layer.clear();
```

---

### WfsLayer — WFS 图层

通过 OGC WFS 协议加载矢量要素（GeoJSON 输出），是 `GeoJsonLayer` 的薄包装，自动拼装请求 URL。
继承 `GeoJsonLayer` 的全部样式参数和方法（`raise()` / `lower()` / `raiseToTop()` 等）。

**构造参数**（除 Layer 公共参数及 GeoJsonLayer 样式参数外）

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `url` | `string` | — | WFS 服务根地址（必填） |
| `typeName` | `string` | — | 要素类型名，如 `"workspace:layerName"`（必填） |
| `version` | `string` | `'2.0.0'` | WFS 版本，支持 `1.0.0` / `1.1.0` / `2.0.0` |
| `outputFormat` | `string` | `'application/json'` | 输出格式 |
| `srsName` | `string` | `'EPSG:4326'` | 空间参考 |
| `count` | `number` | — | 最大返回要素数（WFS 2.0 `COUNT` / 1.x `MAXFEATURES`） |
| `cqlFilter` | `string` | — | CQL 属性过滤，如 `"city = 'Beijing'"` |
| `bbox` | `number[]` | — | 空间范围过滤 `[minLon, minLat, maxLon, maxLat]` |
| `extraParams` | `object` | `{}` | 追加到 URL 的额外参数键值对 |

**独有方法**

| 方法 | 说明 |
|------|------|
| `reload(newOpts?)` | 更新参数并重新加载，如 `reload({ cqlFilter: "city='上海'" })` |

```js
// 基础用法
new WfsLayer({
  url: 'http://localhost:8080/geoserver/wfs',
  typeName: 'workspace:buildings',
  clampToGround: true,
  stroke: '#00ffff',
  fill: 'rgba(0,255,255,0.3)',
  onLoad: (ds) => console.log('要素数:', ds.entities.values.length),
}).addTo(map);

// 带过滤条件
const layer = new WfsLayer({
  url: 'http://localhost:8080/geoserver/wfs',
  typeName: 'ws:buildings',
  cqlFilter: "height > 30",
  count: 500,
}).addTo(map);

// 动态更新过滤条件
layer.reload({ cqlFilter: "city = 'Shanghai'" });

// 空间范围过滤
new WfsLayer({
  url: 'http://localhost:8080/geoserver/wfs',
  typeName: 'ws:roads',
  bbox: [116.3, 39.8, 116.5, 40.0],
}).addTo(map);
```

---

### KmlLayer / CzmlLayer

```js
// KML
new KmlLayer({ url: './data/file.kml' }).addTo(map);

// CZML
const czml = new CzmlLayer({ url: './data/scene.czml' });
map.addLayer(czml);

// CZML 增量更新
await czml.process(newCzmlPackets);
```

**共享方法**：`getEntities()`、`flyTo(options?)`、`raise()`、`lower()`、`raiseToTop()`、`lowerToBottom()`

CzmlLayer 独有方法：`process(czmlPacket)` — 异步追加/更新 CZML 数据包。

---

### MapboxStyleLayer — Mapbox Style 图层

`MapboxStyleLayer` 是 geoGlobe3D 中对 **Mapbox GL Style Spec v8** 的完整实现。它接受一个 Style JSON（本地文件路径、HTTP URL、`mapbox://styles/…` 云端地址或内联 JS 对象），在内部自动完成以下流程：

1. **加载 Style JSON** — 支持 HTTP 拉取、`mapbox://` 协议转换及 Access Token 注入；
2. **解析 sources** — 对每个 source 异步解析（vector 按 TileJSON/tiles 字段，raster 同理，geojson 按 `data` 字段）；
3. **按 source 类型创建 Cesium 对象**
   - `vector` → 内置 [`MVTImageryProvider`](#mvtimageryprovider) 解码 PBF 矢量瓦片，使用 Canvas 2D 按 Style 规则绘制；
   - `geojson` → `Cesium.GeoJsonDataSource`，并解析 layers 中对应的 fill / line paint 样式；
   - `raster` → `Cesium.UrlTemplateImageryProvider`，按 tiles 模板拼接 URL；
   - `background` → `Cesium.Globe.baseColor` 背景填色；
4. **统一生命周期管理** — 继承 `Layer` 基类，`addToMap` / `removeFromMap` / `setShow` / `setAlpha` 对内部所有 `ImageryLayer` 和 `DataSource` 同步操作。

> **适用场景**：已有 Mapbox GL JS 地图配置文件（如 MapTiler、本地 MVT 瓦片服务）想快速迁移到 Cesium 3D 场景时，直接传入同一份 `style.json` 即可，无需逐一创建图层。

支持的 source 类型：

| source type | Cesium 实现 | 说明 |
|-------------|------------|------|
| `vector` | `MVTImageryProvider`（Canvas 2D） | 矢量 MVT 瓦片，支持 fill / line / circle / symbol |
| `geojson` | `Cesium.GeoJsonDataSource` | GeoJSON 数据，解析 fill / line 样式 |
| `raster` | `Cesium.UrlTemplateImageryProvider` | 栅格瓦片，支持 TileJSON 异步解析 |
| `background` | `globe.baseColor` | 背景色设置 |

**构造参数**

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `style` | `string \| object` | — | Style JSON 的 URL、`mapbox://styles/...` 或内联 style 对象（必填） |
| `accessToken` | `string` | `''` | Mapbox Access Token（`mapbox://` 协议时必填） |
| `alpha` | `number` | `1.0` | 整体透明度 (0~1) |
| `onLoad` | `Function` | — | 加载完成回调，参数为解析后的 styleJson |

**方法**

| 方法 | 签名 | 说明 |
|------|------|------|
| `setAlpha` | `(alpha: number)` | 设置所有 ImageryLayer 透明度 |
| `getStyleJson` | `()` → `object\|null` | 获取已解析的 style JSON |
| `setShow` | `(show: boolean)` | 同步显隐到 ImageryLayer 和 DataSource |

**事件**：`'load'`（加载完成）、`'error'`（加载失败）

```js
// 从 URL 加载（含 vector + geojson + raster + background）
const layer = new MapboxStyleLayer({
  style: './assets/demotiles/plain.json',
  alpha: 1.0,
  onLoad(styleJson) {
    console.log('共', styleJson.layers.length, '个图层定义');
  }
});
map.addLayer(layer);

// Mapbox 云端样式（需 accessToken）
const layer = new MapboxStyleLayer({
  style: 'mapbox://styles/mapbox/streets-v12',
  accessToken: 'pk.eyJ1IjoiLi4uIn0...',
});
map.addLayer(layer);

// 内联 style 对象（vector source）
const layer = new MapboxStyleLayer({
  style: {
    version: 8,
    sources: {
      myTiles: {
        type: 'vector',
        tiles: ['http://localhost:8080/tiles/{z}/{x}/{y}.pbf'],
        maxzoom: 14,
      }
    },
    layers: [
      { id: 'buildings', type: 'fill', source: 'myTiles', 'source-layer': 'buildings',
        paint: { 'fill-color': '#aaa', 'fill-outline-color': '#333', 'fill-opacity': 0.8 } },
      { id: 'roads', type: 'line', source: 'myTiles', 'source-layer': 'roads',
        paint: { 'line-color': '#ff0', 'line-width': 2 } },
    ]
  }
});
map.addLayer(layer);

// 运行时控制
layer.setAlpha(0.7);       // 调整透明度
layer.show = false;        // 隐藏
map.removeLayer(layer);    // 完整移除（ImageryLayer + DataSource 全部清理）
```

> **与 `GeoJsonLayer.mapboxStyle` 的区别**：`mapboxStyle` 参数是对单个 GeoJSON 文件的样式声明；`MapboxStyleLayer` 则是加载一个完整的 Mapbox GL Style JSON，可同时管理多个 source（vector / geojson / raster）的全部图层。

---

#### Mapbox Style JSON 字段说明

下表列出框架**实际解析**的 Style Spec v8 字段（未列字段忽略不报错）。

**顶层字段**

| 字段 | 类型 | 说明 |
|------|------|------|
| `version` | `number` | 必须为 `8` |
| `name` | `string` | 样式名称（仅展示，不影响渲染） |
| `center` | `[lng, lat]` | 初始中心（不自动飞行，供业务层读取） |
| `zoom` | `number` | 初始缩放级别（不自动飞行，供业务层读取） |
| `glyphs` | `string` | 字体 PBF URL 模板（symbol 图层文字渲染时使用） |
| `sources` | `object` | Source 定义集合（见下表） |
| `layers` | `array` | Layer 定义数组（见下表） |

**sources 字段**

每个 source 以 `{ [id]: { type, ... } }` 形式定义：

| `type` | 支持的字段 | 说明 |
|--------|-----------|------|
| `vector` | `tiles: string[]`（优先）、`url: string`（TileJSON 地址）、`maxzoom`、`minzoom` | MVT 矢量瓦片；`tiles[0]` 作为瓦片 URL 模板，含 `{z}/{x}/{y}` 占位符 |
| `geojson` | `data: string \| object` | GeoJSON URL 或内联对象 |
| `raster` | `tiles: string[]`、`url: string`（TileJSON）、`maxzoom`、`minzoom`、`tileSize` | 栅格瓦片影像层 |

**layers 数组**

每个 layer 对象的公共字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | `string` | 唯一标识 |
| `type` | `string` | `background` / `fill` / `line` / `circle` / `symbol` / `raster` |
| `source` | `string` | 引用的 source id（`background` 类型无此字段） |
| `source-layer` | `string` | vector source 中的数据层名称 |
| `minzoom` / `maxzoom` | `number` | 显示的缩放范围 |
| `filter` | `expression` | 要素过滤表达式（见表达式说明） |
| `layout.visibility` | `"visible" \| "none"` | `"none"` 时该图层跳过渲染 |
| `paint` | `object` | 样式属性（各 type 不同，见下） |

**paint 属性（按 layer type）**

`background`

| 属性 | 类型 | 说明 |
|------|------|------|
| `background-color` | CSS 颜色字符串 | 作为每个 MVT canvas tile 的底色，同时设置 `globe.baseColor` |

`fill`

| 属性 | 类型 | 说明 |
|------|------|------|
| `fill-color` | 颜色 / 表达式 | 填充色 |
| `fill-opacity` | 数值 / 表达式 | 整体透明度，默认 `1` |
| `fill-outline-color` | 颜色 / 表达式 | 边框色（lineWidth 固定 0.5px） |

`line`

| 属性 | 类型 | 说明 |
|------|------|------|
| `line-color` | 颜色 / 表达式 | 线颜色 |
| `line-width` | 数值 / 表达式 / stops | 线宽（最小 0.5px） |
| `line-opacity` | 数值 / 表达式 | 透明度，默认 `1` |
| `line-dasharray` | `number[]` | 虚线模式，按 `lineWidth` 缩放 |

`circle`

| 属性 | 类型 | 说明 |
|------|------|------|
| `circle-color` | 颜色 / 表达式 | 圆填充色 |
| `circle-radius` | 数值 / 表达式 | 圆半径（像素），默认 `3` |
| `circle-opacity` | 数值 / 表达式 | 透明度，默认 `1` |

`symbol`（文字）

| 属性 / 字段 | 所属 | 类型 | 说明 |
|------------|------|------|------|
| `text-color` | `paint` | 颜色 / 表达式 | 文字颜色 |
| `text-halo-color` | `paint` | 颜色 / 表达式 | 光晕颜色 |
| `text-halo-width` | `paint` | 数值 | 光晕宽度（px） |
| `text-field` | `layout` | 字符串 / 表达式 | 文字内容，支持 `{property}` 模板 |
| `text-size` | `layout` | 数值 / 表达式 | 字号（px），最小 6，默认 12 |
| `text-transform` | `layout` | `"uppercase"` / `"lowercase"` | 大小写转换 |
| `symbol-placement` | `layout` | `"point"` / `"line"` | `"line"` 时取线段中点作为文字锚点 |

**表达式 / 数据驱动**

所有颜色/数值属性均支持以下写法：

```jsonc
// 固定值
"fill-color": "#ff0000"

// get — 按要素属性取值
"fill-color": ["get", "color"]

// match — 枚举映射
"fill-color": ["match", ["get", "type"], "park", "#00ff00", "water", "#0000ff", "#aaaaaa"]

// step — 分段阶梯
"line-width": ["step", ["zoom"], 1, 8, 2, 14, 4]

// interpolate — 线性/指数插值
"line-width": ["interpolate", ["linear"], ["zoom"], 4, 1, 14, 8]

// 旧版 stops 格式（同样支持）
"line-width": { "stops": [[4, 1], [14, 8]], "base": 1.5 }

// case — 条件分支
"fill-color": ["case", [">=", ["get", "pop"], 1000], "#f00", "#0f0"]

// coalesce — 空值回退
"text-field": ["coalesce", ["get", "name_zh"], ["get", "name"]]
```

支持的表达式算子：`literal` `get` `has` `to-string` `to-number` `zoom` `!` `==` `!=` `<` `>` `<=` `>=` `all` `any` `coalesce` `case` `match` `interpolate` `step` `concat` `downcase` `upcase`

---

## 图形 API

### BaseGraphic — 公共接口

所有图形继承 BaseGraphic，共享以下构造参数和方法。

**构造参数**

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `id` | `string` | 自动 UUID | 唯一标识 |
| `name` | `string` | `''` | 名称 |
| `show` | `boolean` | `true` | 可见性 |
| `position` | `number[]` | — | 位置 `[lng, lat, height]` |
| `style` | `object` | `{}` | 样式（各图形不同） |
| `attr` | `object` | `{}` | 自定义属性 |
| `popup` | `string \| Function` | — | 弹窗内容（HTML / 返回 HTML 的函数） |
| `tooltip` | `string \| Function` | — | 悬浮提示文本 |
| `onClick` | `Function` | — | 点击回调 `(graphic, event)` |
| `onMouseover` | `Function` | — | 鼠标进入 `(graphic, event)` |
| `onMouseout` | `Function` | — | 鼠标离开 `(graphic)` |

**公共方法**

| 方法 | 签名 | 说明 |
|------|------|------|
| `setPosition` | `(position: number[])` | 更新位置 |
| `setShow` | `(show: boolean)` | 显隐 |
| `setStyle` | `(style: object)` | 合并更新样式 |
| `flyTo` | `(options?)` | 相机飞行到此图形 |
| `entity` | getter | 底层 Cesium.Entity |

---

### PointGraphic

**style**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `pixelSize` | `number` | `10` | 像素大小 |
| `color` | `string` | `'#ff0000'` | 颜色 |
| `outlineColor` | `string` | — | 描边色 |
| `outlineWidth` | `number` | `0` | 描边宽 |
| `heightReference` | `string` | — | `'clamp'` / `'relative'` / `'none'` |
| `scaleByDistance` | `number[]` | — | `[near, nearScale, far, farScale]` |
| `distanceDisplayCondition` | `number[]` | — | `[near, far]` |

```js
new PointGraphic({
  position: [116.4, 39.9, 0],
  style: { pixelSize: 12, color: '#ff0000', outlineColor: '#fff', outlineWidth: 2 },
  popup: '<b>北京</b>'
});
```

---

### BillboardGraphic

**style**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `image` | `string` | — | 图片 URL |
| `scale` | `number` | `1.0` | 缩放 |
| `width` / `height` | `number` | — | 像素尺寸 |
| `rotation` | `number` | `0` | 旋转角(度) |
| `color` | `string` | — | 着色 |
| `pixelOffset` | `number[]` | — | `[x, y]` 像素偏移 |
| `horizontalOrigin` | `string` | `'center'` | `'center'`/`'left'`/`'right'` |
| `verticalOrigin` | `string` | `'center'` | `'center'`/`'top'`/`'bottom'` |
| `sizeInMeters` | `boolean` | — | 以米为单位 |
| `heightReference` | `string` | — | 高度参考 |
| `scaleByDistance` | `number[]` | — | NearFarScalar |
| `distanceDisplayCondition` | `number[]` | — | `[near, far]` |

```js
new BillboardGraphic({
  position: [116.4, 39.9, 0],
  style: {
    image: './icons/marker.png',
    width: 32, height: 32,
    verticalOrigin: 'bottom'
  }
});
```

---

### LabelGraphic

**style**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `text` | `string` | `''` | 文本 |
| `font` | `string` | `'14px sans-serif'` | CSS 字体 |
| `scale` | `number` | `1.0` | 缩放 |
| `fillColor` | `string` | `'#ffffff'` | 填充色 |
| `outlineColor` | `string` | `'#000000'` | 描边色 |
| `outlineWidth` | `number` | `1` | 描边宽 |
| `showBackground` | `boolean` | `false` | 显示背景 |
| `backgroundColor` | `string` | — | 背景色 |
| `backgroundPadding` | `number[]` | — | `[x, y]` 内边距 |
| `labelStyle` | `string` | — | `'fill'` / `'outline'` / `'fillAndOutline'` |
| `pixelOffset` | `number[]` | — | `[x, y]` |
| `horizontalOrigin` | `string` | `'center'` | 水平对齐 |
| `verticalOrigin` | `string` | `'center'` | 垂直对齐 |
| `heightReference` | `string` | — | 高度参考 |
| `scaleByDistance` | `number[]` | — | NearFarScalar |
| `distanceDisplayCondition` | `number[]` | — | `[near, far]` |

```js
new LabelGraphic({
  position: [116.4, 39.9, 100],
  style: {
    text: '北京',
    font: '16px Microsoft YaHei',
    fillColor: '#ffffff',
    outlineColor: '#000000',
    outlineWidth: 2
  }
});
```

---

### PolylineGraphic

**额外构造参数**：`positions: number[][]`（顶层，非 style 内）

可在顶层使用 `width`、`color`、`clampToGround` 简写，自动合并到 style。

**style**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `width` | `number` | `3` | 线宽 |
| `color` | `string` | `'#ff0000'` | 颜色 |
| `material` | `object` | — | 线材质(见下) |
| `clampToGround` | `boolean` | `false` | 贴地 |
| `depthFailColor` | `string` | — | 深度测试失败时颜色 |
| `arcType` | `string` | `'geodesic'` | `'geodesic'` / `'rhumb'` / `'none'` |
| `zIndex` | `number` | — | 层级 |
| `classificationType` | `string` | — | `'terrain'` / `'3dtiles'` / `'both'` |

**线材质类型**

| material.type | 参数 | 效果 |
|---------------|------|------|
| `'dash'` | `color, gapColor, dashLength` | 虚线 |
| `'glow'` | `color, glowPower` | 发光 |
| `'arrow'` | `color` | 箭头 |
| `'outline'` | `color, outlineColor, outlineWidth` | 描边 |

**额外方法**：`setPositions(positions: number[][])`

```js
// 纯色线
new PolylineGraphic({
  positions: [[116.0, 39.9, 0], [117.0, 39.9, 0]],
  style: { width: 5, color: '#ff0000' }
});

// 发光箭头线
new PolylineGraphic({
  positions: [[116.0, 39.9, 0], [117.0, 40.5, 0]],
  style: { width: 8, material: { type: 'arrow', color: 'cyan' } }
});
```

---

### PolygonGraphic

**额外构造参数**：`positions: number[][]`（外环），`holes: number[][][]`（内孔，可选）

**style**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `color` | `string` | `'rgba(255,255,0,0.4)'` | 填充色 |
| `material` | `object` | — | 面材质 |
| `fill` | `boolean` | `true` | 填充 |
| `outline` | `boolean` | `true` | 描边 |
| `outlineColor` | `string` | `'#ffff00'` | 描边色 |
| `outlineWidth` | `number` | `2` | 描边宽 |
| `height` | `number` | — | 拉伸底部高度 |
| `extrudedHeight` | `number` | — | 拉伸顶部高度 |
| `perPositionHeight` | `boolean` | `false` | 逐顶点高度 |
| `clampToGround` | `boolean` | `false` | 贴地 |
| `heightReference` | `string` | — | 高度参考 |
| `classificationType` | `string` | — | 分类类型 |
| `stRotation` | `number` | — | 纹理旋转(度) |

**额外方法**：`setPositions(positions)`、`setHoles(holes)`

```js
// 半透明多边形
new PolygonGraphic({
  positions: [[116,39.5,0],[117,39.5,0],[117,40.5,0],[116,40.5,0]],
  style: { color: 'rgba(68,136,255,0.5)', outline: true, outlineColor: '#fff' }
});

// 拉伸体
new PolygonGraphic({
  positions: [[116,39.5,0],[117,39.5,0],[117,40.5,0],[116,40.5,0]],
  style: { color: '#4488ff', height: 0, extrudedHeight: 500 }
});
```

---

### CircleGraphic

可在顶层使用 `radius`、`color` 简写。

**style**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `radius` | `number` | `1000` | 半径(米) |
| `color` | `string` | `'rgba(0,255,0,0.3)'` | 填充色 |
| `material` | `object` | — | 面材质 |
| `fill` / `outline` | `boolean` | `true` | 填充/描边 |
| `outlineColor` | `string` | `'#00ff00'` | 描边色 |
| `outlineWidth` | `number` | `2` | 描边宽 |
| `height` / `extrudedHeight` | `number` | — | 拉伸高度 |
| `clampToGround` | `boolean` | `false` | 贴地 |
| `heightReference` | `string` | — | 高度参考 |
| `rotation` | `number` | — | 旋转(度) |

**额外方法**：`setRadius(radius: number)`

```js
new CircleGraphic({
  position: [116.4, 39.9, 0],
  radius: 5000,
  style: { color: 'rgba(255,0,0,0.4)', outline: true, outlineColor: '#ff0000' }
});
```

---

### RectangleGraphic

**额外构造参数**：`coordinates: [west, south, east, north]`（度）

**style**：与 PolygonGraphic 类似 — `color`、`fill`、`outline`、`outlineColor`、`outlineWidth`、`height`、`extrudedHeight`、`rotation`、`clampToGround`、`heightReference`、`classificationType`

**额外方法**：`setCoordinates(coordinates: number[])`

```js
new RectangleGraphic({
  coordinates: [116.0, 39.5, 117.0, 40.5],
  style: { color: 'rgba(255,255,0,0.4)', extrudedHeight: 200 }
});
```

---

### WallGraphic

**额外构造参数**：`positions: number[][]`

**style**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `color` | `string` | `'rgba(255,0,0,0.6)'` | 填充色 |
| `material` | `object` | — | 面材质 |
| `outline` | `boolean` | `false` | 描边 |
| `outlineColor` | `string` | `'#ffffff'` | 描边色 |
| `outlineWidth` | `number` | `1` | 描边宽 |
| `maximumHeights` | `number[]` | — | 各顶点最大高度 |
| `minimumHeights` | `number[]` | — | 各顶点最小高度 |

**额外方法**：`setPositions(positions: number[][])`

```js
new WallGraphic({
  positions: [[116.0,39.9,0],[117.0,39.9,0],[117.5,40.5,0]],
  style: { maximumHeights: [500,500,500], minimumHeights: [0,0,0], color: 'rgba(0,0,255,0.6)' }
});
```

---

### ModelGraphic

**额外构造参数**：`orientation: { heading, pitch, roll }`（度）

**style**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `url` / `uri` | `string` | — | glTF/glb URL |
| `scale` | `number` | `1.0` | 缩放 |
| `minimumPixelSize` | `number` | `64` | 最小像素 |
| `maximumScale` | `number` | — | 最大缩放 |
| `shadows` | `boolean` | `false` | 阴影 |
| `runAnimations` | `boolean` | `true` | 播放内嵌动画 |
| `silhouetteColor` | `string` | — | 轮廓色 |
| `silhouetteSize` | `number` | `2` | 轮廓大小 |
| `color` | `string` | — | 着色 |
| `colorBlendMode` | `string` | `'highlight'` | `'highlight'` / `'replace'` / `'mix'` |
| `heightReference` | `string` | — | 高度参考 |

**额外方法**：`setOrientation({ heading, pitch, roll })`

```js
new ModelGraphic({
  position: [116.4, 39.9, 0],
  orientation: { heading: 45, pitch: 0, roll: 0 },
  style: { url: './models/car.glb', scale: 1.0, minimumPixelSize: 64 }
});
```

---

### BoxGraphic / CylinderGraphic / EllipsoidGraphic / EllipseGraphic

| 图形 | 定位参数 | 核心 style 属性 |
|------|----------|----------------|
| **BoxGraphic** | `position` = 中心 | `dimensions: [x, y, z]`(米，默认 `[20,20,40]`) |
| **CylinderGraphic** | `position` = 底部中心 | `length`(高，默认100), `topRadius`(默认20), `bottomRadius`(默认20), `slices` |
| **EllipsoidGraphic** | `position` = 球心 | `radii: [x, y, z]`(米，默认 `[50,50,50]`), `stackPartitions`(32), `slicePartitions`(32) |
| **EllipseGraphic** | `position` = 中心 | `semiMajorAxis`(5000m), `semiMinorAxis`(3000m), `rotation`(度) |

以上四种图形均支持 `color`、`fill`、`outline`、`outlineColor`、`outlineWidth`、`shadows`、`heightReference`、`distanceDisplayCondition` 等通用样式。

---

## 工具类

### Draw — 绘制工具

所有方法返回 **Promise**。左键操作，**右键结束**。调用 `stop()` 中断进行中操作（Promise resolve `{ cancelled: true }`）。

```js
const draw = new Draw(map);
```

| 方法 | 返回值 | 操作方式 |
|------|--------|----------|
| `draw.point(style?)` | `{ position: [lng,lat,h], entity }` | 左键单击 |
| `draw.polyline(style?)` | `{ positions: [[lng,lat,h],...], entity }` | 左键添加点，右键结束 |
| `draw.polygon(style?)` | `{ positions: [...], entity }` | 左键添加点(>=3)，右键结束 |
| `draw.rectangle(style?)` | `{ coordinates: [w,s,e,n], entity }` | 左键两次（对角） |
| `draw.circle(style?)` | `{ center: [lng,lat,h], radius: 米, entity }` | 左键两次（圆心+半径） |
| `draw.stop()` | `Draw` | 中断当前操作 |
| `draw.clear()` | `Draw` | 清除所有绘制结果 |
| `draw.destroy()` | `void` | 释放资源 |

**完整示例**

```js
const draw = new Draw(map);

// 绘制一个点
const pointResult = await draw.point({ pixelSize: 12, color: 'red' });
console.log('点位:', pointResult.position);

// 绘制多边形
const polyResult = await draw.polygon();
console.log('顶点:', polyResult.positions);

// 右键取消、或用按钮中断
document.getElementById('cancel-btn').onclick = () => draw.stop();

// 清除所有绘制
draw.clear();
```

---

### Buffer — 缓冲区分析

基于 **Turf.js** 的缓冲区分析工具，支持点、线、面三种类型。依赖 `@turf/turf`（已内置于 dist）。

```js
const buffer = new Buffer(map);
```

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| `buffer.point(opts?)` | `{ radius, style }` | `{ geojson, entity, center, radius }` | 点缓冲区，左键点击选中心点 |
| `buffer.line(opts?)` | `{ distance, side, style }` | `{ geojson, entity, inputPositions, distance, side }` | 线缓冲区，左键添加点，右键结束 |
| `buffer.polygon(opts?)` | `{ distance, direction, style }` | `{ geojson, entity, inputPositions, distance, direction }` | 面缓冲区，左键添加点(≥3)，右键结束 |
| `buffer.stop()` | — | `void` | 取消正在进行的绘制 |
| `buffer.clear()` | — | `void` | 清除所有缓冲区图形 |
| `buffer.destroy()` | — | `void` | 销毁并释放资源 |

**opts 参数说明**

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `radius` / `distance` | `number` | `1000` / `500` | 缓冲距离，单位：**米**（建议 ≤ 500000m） |
| `side` | `'both'\|'left'\|'right'` | `'both'` | 线缓冲方向（仅 `line`） |
| `direction` | `'outer'\|'inner'` | `'outer'` | 面缓冲方向（仅 `polygon`）；内缩距离超出面积时抛出错误 |
| `style.color` | `string` | `'#00cfff'` | 填充颜色（CSS 色值） |
| `style.alpha` | `number` | `0.3` | 填充透明度 |
| `style.outlineColor` | `string` | 同 color | 轮廓颜色 |
| `style.outlineWidth` | `number` | `2` | 轮廓宽度 |

**完整示例**

```js
const buffer = new Buffer(map);

// 点缓冲区（500m）
const r = await buffer.point({ radius: 500, style: { color: '#00cfff', alpha: 0.3 } });
console.log('缓冲圆:', r.geojson);

// 线缓冲区（左侧 300m）
const r2 = await buffer.line({ distance: 300, side: 'left' });

// 面缓冲区（外扩 200m）
const r3 = await buffer.polygon({ distance: 200, direction: 'outer' });

// 面缓冲区（内缩 100m）
try {
  const r4 = await buffer.polygon({ distance: 100, direction: 'inner' });
} catch (e) {
  console.warn(e.message); // 内缩距离超过多边形尺寸时抛出
}

// 取消绘制 / 清除结果
buffer.stop();
buffer.clear();
```

---

### Measure — 量算工具

与 Draw 类似的 Promise API。

```js
const measure = new Measure(map);
```

| 方法 | 返回值 | 说明 |
|------|--------|------|
| `measure.distance()` | `{ distance: 米, positions: [...] }` | 距离量算（折线） |
| `measure.area()` | `{ area: 平方米, positions: [...] }` | 面积量算（多边形，≥3点） |
| `measure.height()` | `{ height: 米, position: [lng,lat,h] }` | 高度量算（单点） |
| `measure.angle()` | `{ angle: 度, positions: [p1,p2,p3] }` | 角度量算（三点，p2为顶点） |
| `measure.stop()` | `Measure` | 中断当前操作 |
| `measure.clear()` | `Measure` | 清除所有量算结果及标注 |
| `measure.destroy()` | `void` | 释放资源 |

```js
const measure = new Measure(map);

const dist = await measure.distance();
console.log(`总距离: ${dist.distance.toFixed(2)} 米`);

const area = await measure.area();
console.log(`面积: ${area.area.toFixed(2)} 平方米`);

measure.clear();
```

---

## 控件

### Navigation

罗盘 + 缩放按钮 + 比例尺（基于 `cesium-navigation-es6`）。

```js
const map = new GeoMap('map', {
  control: {
    navigation: true
    // 或: navigation: { compass: true, zoomControls: true, distanceLegend: true }
  }
});
```

| 方法 | 说明 |
|------|------|
| `map.navigation.setNavigationLocked(locked)` | 锁定/解锁交互 |
| `map.navigation.getNavigationLocked()` | 查询锁定状态 |
| `map.navigation.getInstance()` | 获取底层 CesiumNavigation |
| `map.navigation.destroy()` | 销毁 |

---

### NavBar

左侧垂直导航栏：罗盘、复位、2D/3D 切换、缩放。

```js
const map = new GeoMap('map', {
  control: {
    navBar: true
    // 或: navBar: { position: 'left', showCompass: true, showHome: true, showSceneMode: true, showZoom: true, zoomFactor: 1.5 }
  }
});
```

| 方法 | 说明 |
|------|------|
| `map.navBar.show()` / `hide()` / `toggle()` | 显隐控制 |
| `map.navBar.destroy()` | 销毁 |

---

### Toolbar — 状态栏

底部状态栏：实时显示鼠标经纬度、投影坐标、海拔、层级、朝向、俯仰角、视高、FPS、比例尺。

```js
const map = new GeoMap('map', { control: { toolbar: true } });
```

| 方法 | 返回值 | 说明 |
|------|--------|------|
| `map.toolbar.show()` | `Toolbar` | 显示 |
| `map.toolbar.hide()` | `Toolbar` | 隐藏 |
| `map.toolbar.toggle()` | `Toolbar` | 切换 |
| `map.toolbar.getInfo()` | `object` | 获取当前状态快照 |
| `map.toolbar.destroy()` | `void` | 销毁 |

`getInfo()` 返回值：

```js
{
  lon, lat,          // 鼠标经纬度
  altitude,          // 地形海拔
  heading, pitch,    // 相机朝向/俯仰(度)
  cameraHeight,      // 相机高度(米)
  level,             // 层级 (0-22)
  fps                // 帧率
}
```

Toolbar 构造选项可精细控制显示项：

| 属性 | 默认 | 说明 |
|------|------|------|
| `showLon` / `showLat` | `true` | 经纬度 |
| `showProjection` | `true` | Web Mercator X/Y |
| `showAltitude` | `true` | 海拔 |
| `showLevel` | `true` | 层级 |
| `showHeading` / `showPitch` | `true` | 朝向/俯仰 |
| `showCameraHeight` | `true` | 视高 |
| `showFPS` | `true` | FPS |
| `showScalebar` | `true` | 比例尺 |

---

## 管理器

### EventManager — 事件

地图初始化后通过 `map.events` 访问，统一管理所有交互事件。

```js
map.events.on('leftClick', (e) => {
  console.log(e.lonlat);       // [lng, lat, height]
  console.log(e.entity);       // 拾取到的 Entity
  console.log(e.pickedObject); // scene.pick() 原始结果
});

map.events.on('mouseMove', (e) => { ... });
map.events.once('leftClick', handler);
map.events.off('leftClick', handler);
```

**鼠标事件回调参数**

| 属性 | 类型 | 说明 |
|------|------|------|
| `type` | `string` | 事件类型名 |
| `raw` | `object` | Cesium 原始 movement |
| `position` | `Cartesian2` | 屏幕坐标 |
| `pickedObject` | `object` | scene.pick() 结果 |
| `entity` | `Entity` | 拾取到的实体 |
| `primitive` | `object` | 拾取到的图元 |
| `cartesian` | `Cartesian3` | 世界坐标 |
| `lonlat` | `number[]` | `[lng, lat, height]` |

**支持的事件名**

鼠标事件：`leftClick`、`leftDoubleClick`、`leftDown`、`leftUp`、`rightClick`、`rightDown`、`rightUp`、`middleClick`、`middleDown`、`middleUp`、`mouseMove`、`wheel`

场景事件：`cameraChanged`、`sceneModeChanged`、`preRender`、`postRender`、`morphComplete`、`morphStart`

---

### PopupManager — 弹窗

通过 `map.popup` 访问。给图形设置 `popup` 属性后，左键点击自动弹出。

```js
// 声明式 — 图形自带 popup
new PointGraphic({
  position: [116.4, 39.9, 0],
  popup: '<b>北京</b><p>中国首都</p>'
});

// 命令式
map.popup.show('<b>自定义弹窗</b>', [116.4, 39.9, 0]);
map.popup.hide();
```

构造选项：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `auto` | `boolean` | `true` | 自动拦截左键点击 |
| `closeButton` | `boolean` | `true` | 关闭按钮 |
| `followCamera` | `boolean` | `true` | 跟随相机移动 |
| `offset` | `number[]` | `[0, -10]` | 像素偏移 |
| `className` | `string` | `'geoglobe-popup'` | CSS 类名 |

---

### TooltipManager — 提示

通过 `map.tooltip` 访问。给图形设置 `tooltip` 属性后，鼠标悬停自动显示。

```js
new PointGraphic({
  position: [116.4, 39.9, 0],
  tooltip: '北京市'
});

// 命令式
map.tooltip.show('提示文本', { x: 100, y: 200 });
map.tooltip.hide();
```

构造选项：

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `offset` | `number[]` | `[14, -14]` | 像素偏移 |
| `className` | `string` | `'geoglobe-tooltip'` | CSS 类名 |

---

## SpaceSkyBox — 天空盒

程序化生成星空背景，支持闪烁和流星效果。全部为**静态方法**。

### 通过构造参数配置

```js
const map = new GeoMap('map', {
  skyBox: {
    animate: true,
    speed: 2,
    starCount: 800,
    meteorInterval: 3000,
    meteorSpeed: 1,
    maxMeteors: 3
  }
});
```

### 运行时控制

```js
// 天空盒切换
map.setSkyBox('space');
map.setSkyBox('default');
map.setSkyBox(false);
map.setSkyBox({ sources: { positiveX: '...', negativeX: '...', ... } });

// 星星闪烁动画
SpaceSkyBox.startAnimation(map.viewer, { speed: 2, starCount: 800 });
SpaceSkyBox.stopAnimation();
SpaceSkyBox.setRotationSpeed(4);

// 流星效果
SpaceSkyBox.startMeteorAnimation(map.viewer, {
  interval: 3000,
  speed: 1,
  maxMeteors: 3
});
SpaceSkyBox.stopMeteorAnimation();
SpaceSkyBox.setMeteorInterval(5000);
```

**create() 选项**

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `resolution` | `number` | `2048` | 单面纹理分辨率 |
| `starCount` | `number` | `9000` | 基础星星数 |
| `brightStarCount` | `number` | `30` | 亮星数(带光晕) |
| `nebulaIntensity` | `number` | `0.5` | 星云亮度 (0~1) |
| `milkyWayIntensity` | `number` | `0.35` | 银河带亮度 (0~1) |
| `backgroundColor` | `string` | `'#000005'` | 背景色 |

---

## 常量与枚举

框架封装了常用 Cesium 常量，无需直接引用 Cesium 命名空间：

```js
import {
  // 场景 & 渲染
  SceneMode, Color, HeightReference,
  HorizontalOrigin, VerticalOrigin, LabelStyle,
  ClassificationType, ArcType, ShadowMode, ColorBlendMode,

  // 坐标 & 几何
  Cartesian2, Cartesian3, Cartesian4, Cartographic,
  Rectangle, PolygonHierarchy, BoundingSphere,

  // 数学 & 变换
  CesiumMath, Quaternion, Matrix2, Matrix3, Matrix4,
  TranslationRotationScale, HeadingPitchRange, HeadingPitchRoll,

  // 可见性
  NearFarScalar, DistanceDisplayCondition,

  // 材质属性
  Material, MaterialProperty, CallbackProperty,
  ColorMaterialProperty, ImageMaterialProperty,
  CheckerboardMaterialProperty, StripeMaterialProperty, GridMaterialProperty,
  PolylineGlowMaterialProperty, PolylineOutlineMaterialProperty,
  PolylineDashMaterialProperty, PolylineArrowMaterialProperty,

  // 动画/采样
  ConstantProperty, SampledProperty, SampledPositionProperty,
  TimeIntervalCollectionProperty,

  // 时间
  JulianDate, TimeInterval, TimeIntervalCollection,
  ClockRange, ClockStep,

  // 事件
  ScreenSpaceEventType, ScreenSpaceEventHandler,

  // Primitive API
  Resource, Primitive, GeometryInstance, PolygonGeometry, MaterialAppearance,

  // 地形
  CustomHeightmapTerrainProvider, EllipsoidTerrainProvider
} from 'geoglobe-3d';
```

快速示例：

```js
const red = Color.fromCssColorString('#ff0000');
const pos = Cartesian3.fromDegrees(116.4, 39.9, 100);
const rad = CesiumMath.toRadians(45);
```

---

## 实战案例

### 案例 1 — 加载 GeoJSON + Popup 交互

```js
const map = new GeoMap('map', {
  skyBox: 'space',
  camera: { position: [104, 35, 5000000] },
  control: { toolbar: true, navBar: true }
});

const geojson = new GeoJsonLayer({
  url: './data/china.geojson',
  stroke: '#ff6600',
  strokeWidth: 2,
  fill: 'rgba(255,102,0,0.3)',
  clampToGround: true,
  onClick: (entity) => {
    const name = entity.name || '未命名';
    map.popup.show(`<b>${name}</b>`, entity.position?.getValue());
  }
});
map.addLayer(geojson);

geojson.on('load', () => {
  console.log('GeoJSON 加载完成');
  geojson.flyTo();
});
```

### 案例 2 — 3D Tiles + 图形叠加

```js
const map = new GeoMap('map', {
  terrain: { enabled: true },
  camera: { position: [116.4, 39.9, 3000], pitch: -45 }
});

// 加载三维建筑
const tileset = new TilesetLayer({
  url: 'https://your-server/tileset.json',
  maximumScreenSpaceError: 8,
  style: { color: "color('white', 0.8)" }
});
map.addLayer(tileset);

// 在建筑旁添加标注
const marks = new GraphicLayer({ id: 'marks' });
map.addLayer(marks);

marks.addGraphics([
  new BillboardGraphic({
    position: [116.4, 39.9, 100],
    style: { image: './icons/pin.png', width: 32, height: 32, verticalOrigin: 'bottom' },
    popup: '<h3>国贸大厦</h3><p>高度: 330米</p>'
  }),
  new LabelGraphic({
    position: [116.4, 39.9, 350],
    style: { text: '国贸大厦', font: '14px Microsoft YaHei', fillColor: '#fff' }
  })
]);
```

### 案例 3 — 绘制 + 量算联动

```js
const draw = new Draw(map);
const measure = new Measure(map);

document.getElementById('btn-draw-polygon').onclick = async () => {
  const result = await draw.polygon();
  if (!result.cancelled) {
    console.log('绘制完成，顶点数:', result.positions.length);
  }
};

document.getElementById('btn-measure-dist').onclick = async () => {
  const result = await measure.distance();
  if (!result.cancelled) {
    alert(`总距离: ${(result.distance / 1000).toFixed(2)} km`);
  }
};

document.getElementById('btn-clear').onclick = () => {
  draw.clear();
  measure.clear();
};
```

### 案例 4 — 时间动画 + CZML 轨迹

```js
const map = new GeoMap('map', {
  control: { animation: true, timeline: true }
});

const czml = new CzmlLayer({ url: './data/satellite.czml' });
map.addLayer(czml);

czml.on('load', () => {
  czml.flyTo();
  map.setClock({
    multiplier: 100,
    clockRange: 'loop',
    animate: true
  });
});
```

### 案例 5 — MVT 矢量瓦片

```js
const map = new GeoMap('map', {
  camera: { position: [116.4, 39.9, 50000], pitch: -60 }
});

// 建筑 MVT 图层，按建筑用途上色
const buildings = new ImageryLayer({
  name: 'Buildings',
  type: 'mvt',
  url: 'https://your-server/tiles/{z}/{x}/{y}.pbf',
  layerName: 'buildings',
  maximumLevel: 16,
  mvtStyle: (feature) => {
    const colors = {
      residential: 'rgba(46,204,113,0.5)',
      commercial:  'rgba(231,76,60,0.5)',
      industrial:  'rgba(243,156,18,0.5)',
    };
    return {
      fillStyle: colors[feature.properties.usage] || 'rgba(149,165,166,0.3)',
      strokeStyle: '#333',
      lineWidth: 1
    };
  },
  onSelectFeature: (feature) => {
    map.popup.show(
      `<b>${feature.properties.name || '未命名'}</b><br>用途: ${feature.properties.usage}`,
      [feature.properties.lon, feature.properties.lat, 0]
    );
  }
});
map.addLayer(buildings);
```

### 案例 6 — GeoJSON + Mapbox Style 分色渲染

```js
const map = new GeoMap('map', {
  camera: { position: [105, 35, 5000000], pitch: -90 }
});

// 加载省份 GeoJSON，按类型分色 + 人口拉伸
const provinces = new GeoJsonLayer({
  url: './data/provinces.geojson',
  clampToGround: false,
  mapboxStyle: {
    type: 'fill-extrusion',
    paint: {
      'fill-color': ['match', ['get', 'region'],
        'east',    '#2ecc71',
        'west',    '#9b59b6',
        'central', '#f39c12',
        'north',   '#3498db',
        '#95a5a6'
      ],
      'fill-opacity': 0.7,
      'fill-outline-color': '#fff',
      'fill-extrusion-height': ['step', ['get', 'population'],
        50000,
        3000,  100000,
        5000,  200000,
        8000,  400000,
        10000, 600000
      ]
    }
  },
  onClick: (entity) => {
    const props = entity.properties.getValue(geoGlobe.JulianDate.now());
    map.popup.show(
      `<b>${props.name}</b><br>人口: ${props.population} 万`,
      entity.position?.getValue()
    );
  }
});
map.addLayer(provinces);

// 同时加载城市点位，按人口大小渲染
const cities = new GeoJsonLayer({
  url: './data/cities.geojson',
  mapboxStyle: [
    {
      type: 'circle',
      filter: ['>=', ['get', 'population'], 2000],
      paint: { 'circle-color': '#e74c3c', 'circle-radius': 12,
               'circle-stroke-color': '#fff', 'circle-stroke-width': 2 }
    },
    {
      type: 'circle',
      filter: ['all', ['>=', ['get', 'population'], 1000], ['<', ['get', 'population'], 2000]],
      paint: { 'circle-color': '#f39c12', 'circle-radius': 8,
               'circle-stroke-color': '#fff', 'circle-stroke-width': 1 }
    },
    {
      type: 'circle',
      filter: ['<', ['get', 'population'], 1000],
      paint: { 'circle-color': '#3498db', 'circle-radius': 5,
               'circle-stroke-color': '#fff', 'circle-stroke-width': 1 }
    }
  ]
});
map.addLayer(cities);
```

---

## FAQ

**Q: 地图显示黑屏**
检查浏览器 WebGL 2.0 支持，确保 `dist/` 目录完整部署，查看控制台报错。

**Q: 3D Tiles 位置偏移**
使用 `TilesetLayer` 的 `position` / `rotation` 参数调整：
```js
new TilesetLayer({
  url: '...',
  position: [lng, lat, height],
  rotation: { heading: 0, pitch: 0, roll: 0 }
});
```

**Q: 影像图层跨域报错**
服务端需配置 CORS，或通过代理转发请求。

**Q: 如何访问底层 Cesium API**
```js
const viewer = map.viewer;        // Cesium.Viewer
const scene  = map.viewer.scene;  // Cesium.Scene
const globe  = scene.globe;       // Cesium.Globe
```

**Q: 页面卸载时资源释放**
```js
window.addEventListener('beforeunload', () => map.destroy());
```

**Q: ESM 项目 Cesium Worker 路径配置**
在 Vite/Webpack 中需配置 `CESIUM_BASE_URL` 指向 Cesium 静态资源目录。UMD 版本框架自动处理。

---

## 项目结构

```
zgis-cesium/
├── src/
│   ├── index.js              # 主入口，统一导出
│   ├── constants/             # 常量与枚举封装
│   ├── core/
│   │   ├── Map.js             # GeoMap 核心类
│   │   ├── EventManager.js    # 事件管理
│   │   ├── PopupManager.js    # 弹窗管理
│   │   ├── TooltipManager.js  # 提示管理
│   │   └── SpaceSkyBox.js     # 程序化天空盒
│   ├── graphic/               # 14 种图形类
│   ├── layer/                 # 9 种图层类 + MVTImageryProvider
│   ├── tool/                  # Draw / Measure / Buffer
│   ├── control/               # Navigation / NavBar / Toolbar
│   └── utils/                 # 工具函数
├── dist/                      # 构建产物
├── examples/                  # 14 个示例 HTML
├── Build/                     # Cesium 本地源（UMD 打包用）
├── rollup.config.js           # Rollup 构建配置
└── package.json
```

---

## 示例列表

`npm start` 后访问 `http://localhost:8080`，或直接用浏览器打开对应 HTML 文件（需本地 HTTP 服务）。

| 文件 | 标题 | 功能概述 |
|------|------|----------|
| `base.html` | 基础示例 | **入门模板**。集成 Toolbar 状态栏 + NavBar 导航栏 + Draw 绘制工具（点/线/面/矩形/圆）+ Measure 量算工具（距离/面积/高度/角度）。适合作为新项目的起点。 |
| `advanced.html` | 高级功能演示 | **综合演示**。一页覆盖图形（Point/Billboard/Label/Polyline/Polygon/Circle/Model）、量算（距离/面积/高度）、绘制（点/线/面/圆）、图层（3D Tiles/GeoJSON/地形切换）。 |
| `graphic-layers.html` | 图形图层演示 | **所有 14 种图形**逐一添加演示：点、广告牌、文字、折线、多边形、圆、椭圆、矩形、墙、方盒、圆柱、球体。含显隐切换、定位、数量统计、清空操作。 |
| `layer-management.html` | 图层管理 | **图层管理面板**。动态添加 OSM/彩色底图，拖拽式排列支持上移▲/下移▼/置顶⤒/置底⤓/显隐👁/删除✕，实时可视化图层叠加顺序。 |
| `data-layers.html` | 数据图层 | **GeoJSON / KML / CZML** 三类数据图层演示。GeoJSON 加载随机点面要素；KML 加载城市标注；CZML 播放卫星轨道动画。含显隐/定位/删除/全部清除。 |
| `imagery-layers.html` | 影像图层 | **底图切换 + 叠加图层 + 滤镜**。支持自然地球/OSM/CARTO 亮色/CARTO 暗色/无底图切换；叠加纯色影像层；对底图应用亮度/对比度/饱和度/伽马值滤镜实时调节。 |
| `terrain.html` | 地形示例 | **Cesium World Terrain**（需 Ion Token）。飞往珠穆朗玛/科罗拉多峡谷/阿尔卑斯山/全国；可切换地形遮挡、太阳光照、Toolbar；地形夸张倍数循环切换（1×/1.5×/2.5×/5×）。 |
| `terrain-custom.html` | 自定义地形 | **CustomHeightmapTerrainProvider** 程序化地形。可切换噪声地形/正弦波地形/平坦椭球；支持线框模式、光照、地形遮挡、Toolbar/NavBar 显隐。 |
| `altitude-test.html` | 海拔测试 | **Toolbar 海拔显示验证**。使用 ArcGIS 地形（无需 Ion Token），飞往珠穆朗玛（+8849m）/吐鲁番（-155m）/死海（-430m）/科罗拉多峡谷/平原，验证正负海拔在状态栏的正确展示。 |
| `popup-tooltip.html` | 弹窗与提示 | **Popup + Tooltip 交互**。命令式弹窗（北京/上海/自定义 HTML 内容）；声明式 Tooltip（鼠标悬停提示）；事件监听演示（leftClick / mouseMove 回调）。 |
| `measure-tools.html` | 量算与绘制 | **量算工具 + 绘制工具**并行演示。量算：距离/面积/高度/角度，结果带标注留存地图；绘制：点/折线/多边形/矩形/圆，右键结束；各自独立清除。 |
| `camera-scene.html` | 相机与场景 | **相机控制全集**。flyTo 飞行动画（北京/上海/成都/全球）；setView 瞬间跳转；zoomIn/zoomOut/resetView；3D/2D/Columbus 视图切换；读取相机姿态和视野范围；截图预览与下载。 |
| `time-system.html` | 时间系统 | **时钟与日照动画**。预设白天/夜晚/日食/夏至时刻；播放/暂停/同步当前时间；1×/60×/3600×/倒放调速；循环/到头停止/无限时间范围；太阳光照/大气/雾效/阴影切换；快速预览全年光照变化。 |
| `materials.html` | 材质演示 | **Cesium 材质全集**。面材质：纯色/图片/棋盘/条纹/网格；线材质：实线/虚线/发光/箭头/描边；Fabric 高级材质：水面/边缘光/高程等值线/自定义 GLSL；运行时动态颜色与图片透明动画。 |
| `geojson-mapbox-style.html` | GeoJSON + Mapbox Style | **Mapbox GL Style 渲染 GeoJSON**。fill/line/circle 渲染类型；数组规则按条件分色；fill-extrusion 按人口拉伸高度；filter 属性过滤；点击要素弹出属性 Popup。 |
| `mapbox-style-layer.html` | MapboxStyleLayer | **MapboxStyleLayer 完整示例**。vector（MVT 矢量瓦片）/ geojson（行内数据）/ raster（WMS）/ background 四种 source 类型；支持动态更新 style 属性。 |
| `wms-demo.html` | WMS 图层 | **WMS 服务接入**。加载 GeoServer WMS 图层（配置了示例服务地址）；显隐切换；定位到图层范围；瓦片尺寸（256/512/1024）切换；透明度调节。 |
| `wfs-layer.html` | WFS 图层 | **WFS 服务接入**。全量加载与视野范围 BBOX 加载；CQL/OGC 属性过滤；显隐/置顶/定位操作；内置模拟数据（点/线/面要素）用于离线测试；点击要素弹出属性 Popup。 |
| `buffer-analysis.html` | 缓冲区分析 | **Buffer 工具完整演示**。点缓冲（圆形半径）；线缓冲（双侧/左侧/右侧三种方向）；面缓冲（外扩/内缩）；参数面板（距离/颜色/透明度）；结果展示面积；距离上限 500km，超出自动提示。 |
| `empty-demo.html` | 下钻演示 | **行政区划下钻**。以重庆市为起点，点击区县多边形下钻到下一级；面包屑导航 + 返回上级按钮；通过 GeoServer WFS 接口按需加载各级 GeoJSON；Popup 显示区划名称及面积。 |
| `vue3-demo/` | Vue 3 + Vite 集成 | **前端框架集成示例**。演示在 Vue 3 单文件组件中集成 geoGlobe3D，含地图初始化、图层管理、组件卸载时 destroy() 的最佳实践。运行方式：`cd examples/vue3-demo && npm install && npm run dev`。 |



---

*geoGlobe3D — 让三维地图开发更简单*
