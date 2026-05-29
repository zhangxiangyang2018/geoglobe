# geoGlobe3D Vue3 Demo

基于 Vue 3 + Vite 构建的 geoGlobe3D 示例项目。

## 快速开始

```bash
# 1. 安装依赖（会自动安装本地的 geoglobe-3d 包）
npm install

# 2. 将 geoglobe 静态资源复制到 public 目录
npm run copy-assets

# 3. 启动开发服务器
npm run dev
```

## 目录说明

```
vue3-demo/
├── index.html
├── package.json
├── vite.config.js
├── scripts/
│   └── copy-geoglobe-assets.js   # 复制静态资源脚本
├── public/
│   └── geoglobe/                 # 运行 copy-assets 后生成
│       ├── Workers/
│       ├── Assets/
│       ├── Widgets/
│       └── ThirdParty/
└── src/
    ├── main.js
    ├── App.vue
    └── components/
        └── MapView.vue           # 地图组件
```

## 说明

- `geoglobe-3d` 的 ESM 产物（`geoglobe.esm.js`）通过 `import` 引入，Vite 会自动预构建
- Cesium 所需的静态资源（Workers / Assets / Widgets / ThirdParty）需要放在 `public/geoglobe/` 下
- `window.CESIUM_BASE_URL` 设置为 `/geoglobe/`，指向 public 下的静态资源目录
