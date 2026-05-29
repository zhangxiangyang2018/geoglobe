<template>
  <div class="map-wrapper">
    <!-- 工具栏 -->
    <div class="toolbar">
      <div class="bar-group">
        <span class="group-label">绘制</span>
        <button @click="doDraw('point')">点</button>
        <button @click="doDraw('polyline')">线</button>
        <button @click="doDraw('polygon')">面</button>
        <button @click="doDraw('rectangle')">矩形</button>
        <button @click="doDraw('circle')">圆</button>
        <button class="danger" @click="clearDraw()">清除</button>
      </div>
      <div class="bar-group">
        <span class="group-label">量算</span>
        <button @click="doMeasure('distance')">距离</button>
        <button @click="doMeasure('area')">面积</button>
        <button @click="doMeasure('height')">高度</button>
        <button class="danger" @click="clearMeasure()">清除</button>
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
      toolbar: true,
      navBar: true,
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

.toolbar {
  position: absolute;
  top: 50px;
  left: 10px;
  z-index: 1000;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  max-width: calc(100% - 20px);
}

.bar-group {
  background: rgba(24, 28, 36, 0.92);
  border-radius: 6px;
  padding: 6px 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 2px 8px rgba(0,0,0,.35);
}

.group-label {
  font-size: 11px;
  color: #888;
  margin-right: 4px;
  white-space: nowrap;
  user-select: none;
}

.bar-group button {
  background: #3a3f4b;
  color: #ddd;
  border: 1px solid rgba(255,255,255,.08);
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  transition: background .2s, color .2s;
}

.bar-group button:hover {
  background: #4a90d9;
  color: #fff;
}

.bar-group button.danger {
  color: #f06;
}

.bar-group button.danger:hover {
  background: #d32f2f;
  color: #fff;
}
</style>
