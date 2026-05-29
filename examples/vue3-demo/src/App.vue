<template>
  <div class="app">
    <h1 class="title">geoGlobe3D Vue3 Demo</h1>
    <MapView />
  </div>
</template>

<script setup>
import MapView from './components/MapView.vue';
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app, .app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.title {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  color: #fff;
  font-size: 18px;
  text-shadow: 0 1px 4px rgba(0,0,0,0.6);
  pointer-events: none;
}
</style>
