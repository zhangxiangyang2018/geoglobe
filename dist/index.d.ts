/**
 * geoGlobe3D - 基于 Cesium 的三维地图框架
 * TypeScript 类型声明
 */

import * as Cesium from 'cesium';

// ──────────────────────────────────────────────────────────
// 配置接口
// ──────────────────────────────────────────────────────────

export interface GeoMapOptions {
  /** 底图配置 */
  baseImagery?: 'naturalEarth' | 'osm' | 'none' | object;
  /** Cesium Ion AccessToken */
  accessToken?: string;
  /** 场景配置 */
  scene?: {
    sceneMode?: Cesium.SceneMode;
    globe?: {
      baseColor?: string | Cesium.Color;
      depthTestAgainstTerrain?: boolean;
      enableLighting?: boolean;
      showGroundAtmosphere?: boolean;
    };
  };
  /** 控件配置 */
  control?: {
    baseLayerPicker?: boolean;
    geocoder?: boolean;
    homeButton?: boolean;
    sceneModePicker?: boolean;
    navigationHelpButton?: boolean;
    animation?: boolean;
    timeline?: boolean;
    fullscreenButton?: boolean;
    vrButton?: boolean;
    infoBox?: boolean;
    selectionIndicator?: boolean;
    navigation?: boolean | NavigationOptions;
    navBar?: boolean | NavBarOptions;
    toolbar?: boolean | ToolbarOptions;
  };
  /** Popup 弹窗 */
  popup?: boolean | PopupOptions;
  /** Tooltip 悬浮提示 */
  tooltip?: boolean | TooltipOptions;
  /** 天空盒配置 */
  skyBox?: 'space' | 'default' | false | SkyBoxOptions;
  /** 地形配置 */
  terrain?: {
    enabled?: boolean;
    url?: string;
    ionAssetId?: number;
  };
  /** 相机配置 */
  camera?: {
    position?: [number, number, number];
    heading?: number;
    pitch?: number;
    roll?: number;
  };
}

export interface SkyBoxOptions {
  sources?: Record<string, string>;
  resolution?: number;
  starCount?: number;
  brightStarCount?: number;
  nebulaIntensity?: number;
  milkyWayIntensity?: number;
  backgroundColor?: string;
  animate?: boolean;
  speed?: number;
  meteorInterval?: number;
  meteorSpeed?: number;
  maxMeteors?: number;
}

export interface NavigationOptions {
  enableCompass?: boolean;
  enableZoomControls?: boolean;
  enableDistanceLegend?: boolean;
  enableCompassOuterRing?: boolean;
}

export interface NavBarOptions {
  position?: 'left' | 'right';
  top?: string | number;
  showCompass?: boolean;
  showHome?: boolean;
  showSceneMode?: boolean;
  showZoom?: boolean;
  zoomFactor?: number;
}

export interface ToolbarOptions {
  showLon?: boolean;
  showLat?: boolean;
  showProjection?: boolean;
  showAltitude?: boolean;
  showLevel?: boolean;
  showHeading?: boolean;
  showPitch?: boolean;
  showCameraHeight?: boolean;
  showFPS?: boolean;
  showScalebar?: boolean;
}

export interface PopupOptions {
  auto?: boolean;
  className?: string;
  offset?: [number, number];
  closeButton?: boolean;
  followCamera?: boolean;
}

export interface TooltipOptions {
  className?: string;
  offset?: [number, number];
}

export interface GraphicOptions {
  id?: string;
  name?: string;
  position?: [number, number, number?];
  positions?: number[][];
  show?: boolean;
  style?: Record<string, any>;
  popup?: string | ((graphic: BaseGraphic) => string);
  tooltip?: string | ((graphic: BaseGraphic) => string);
  [key: string]: any;
}

export interface LayerOptions {
  id?: string;
  name?: string;
  show?: boolean;
  [key: string]: any;
}

export interface ImageryLayerOptions extends LayerOptions {
  type: 'xyz' | 'tms' | 'osm' | 'ion' | 'singleColor' | 'singleTile' | 'wmts' | 'wms' | 'arcgis';
  url?: string;
  assetId?: number;
  color?: string;
  alpha?: number;
  brightness?: number;
  contrast?: number;
  [key: string]: any;
}

// ──────────────────────────────────────────────────────────
// 核心类
// ──────────────────────────────────────────────────────────

export class GeoMap {
  constructor(container: string | HTMLElement, options?: GeoMapOptions);

  readonly container: HTMLElement;
  readonly viewer: Cesium.Viewer;
  readonly layers: Layer[];
  readonly events: EventManager;
  readonly navigation: Navigation | null;
  readonly navBar: NavBar | null;
  readonly toolbar: Toolbar | null;
  readonly popup: PopupManager | null;
  readonly tooltip: TooltipManager | null;
  readonly options: GeoMapOptions;

  // 天空盒
  setSkyBox(option: 'space' | 'default' | false | SkyBoxOptions): this;

  // 飞行
  flyTo(position: [number, number, number?], options?: {
    duration?: number;
    heading?: number;
    pitch?: number;
    roll?: number;
  }): void;

  // 图层管理
  addLayer(layer: Layer): this;
  removeLayer(layer: Layer): this;
  removeLayerById(id: string): this;
  removeAllLayers(): this;
  getLayer(id: string): Layer | undefined;
  getLayerByName(name: string): Layer | undefined;
  getLayers(): Layer[];
  hasLayer(layer: Layer): boolean;
  getLayerCount(): number;
  raiseLayer(layer: Layer): this;
  lowerLayer(layer: Layer): this;
  raiseLayerToTop(layer: Layer): this;
  lowerLayerToBottom(layer: Layer): this;
  moveLayerTo(layer: Layer, targetIndex: number): this;
  showLayer(id: string): this;
  hideLayer(id: string): this;
  toggleLayer(id: string): this;

  // 相机
  getCurrentExtent(): { west: number; south: number; east: number; north: number } | null;
  getCenter(): [number, number, number] | null;
  getCamera(): { position: [number, number, number]; heading: number; pitch: number; roll: number };
  setCamera(opts: { position?: [number, number, number]; heading?: number; pitch?: number; roll?: number; duration?: number }): this;
  setView(opts: { position?: [number, number, number]; heading?: number; pitch?: number; roll?: number }): this;
  resetView(): this;
  zoomIn(amount?: number): this;
  zoomOut(amount?: number): this;
  zoomTo(target: Layer | BaseGraphic | Cesium.Entity, options?: { duration?: number }): Promise<void>;

  // 底图 & 地形
  setBaseImagery(baseImagery: 'naturalEarth' | 'osm' | 'none' | object): this;
  setTerrain(opts?: { enabled?: boolean; url?: string; ionAssetId?: number }): Promise<this>;

  // 场景效果
  setFog(opts?: { enabled?: boolean; density?: number; minimumBrightness?: number }): this;
  setAtmosphere(opts?: { enabled?: boolean; hueShift?: number; saturationShift?: number; brightnessShift?: number }): this;
  setSunLight(enabled: boolean): this;

  // 时钟
  setClock(opts?: { startTime?: string; stopTime?: string; currentTime?: string; multiplier?: number; shouldAnimate?: boolean; clockRange?: number; clockStep?: number }): this;
  getTime(): string;
  setTime(isoString: string): this;
  setTimeSpeed(multiplier: number): this;
  startClock(): this;
  stopClock(): this;

  // 截图
  screenshot(opts?: { format?: string; quality?: number }): string;
  downloadScreenshot(filename?: string): this;

  // 场景模式
  setSceneMode(mode: string | Cesium.SceneMode, duration?: number): this;

  // 销毁
  destroy(): void;
}

/** GeoMap 别名 */
export { GeoMap as Map };

// ──────────────────────────────────────────────────────────
// 事件管理
// ──────────────────────────────────────────────────────────

export class EventManager {
  constructor(map: GeoMap);
  on(eventName: string, callback: (event: any) => void): this;
  off(eventName: string, callback?: (event: any) => void): this;
  destroy(): void;
}

export class PopupManager {
  constructor(map: GeoMap, options?: PopupOptions);
  show(content: string, position: [number, number, number?] | Cesium.Cartesian3): this;
  hide(): this;
  readonly visible: boolean;
  destroy(): void;
}

export class TooltipManager {
  constructor(map: GeoMap, options?: TooltipOptions);
  show(content: string, screenPos: { x: number; y: number }): this;
  hide(): this;
  readonly visible: boolean;
  destroy(): void;
}

// ──────────────────────────────────────────────────────────
// 图层
// ──────────────────────────────────────────────────────────

export class Layer {
  constructor(options?: LayerOptions);
  readonly id: string;
  name: string;
  show: boolean;
  map: GeoMap | null;

  addTo(map: GeoMap): this;
  remove(): this;
  setShow(show: boolean): this;
  toggle(): this;
  on(event: string, callback: Function): this;
  once(event: string, callback: Function): this;
  off(event: string, callback?: Function): this;
  destroy(): void;
}

export class ImageryLayer extends Layer {
  constructor(options: ImageryLayerOptions);
  setAlpha(alpha: number): this;
  setBrightness(brightness: number): this;
  setContrast(contrast: number): this;
  setSaturation(saturation: number): this;
  setHue(hue: number): this;
  setGamma(gamma: number): this;
  raise(): this;
  lower(): this;
  raiseToTop(): this;
  lowerToBottom(): this;
}

export class TerrainLayer extends Layer {
  constructor(options?: LayerOptions & { type?: 'ion' | 'cesium' | 'ellipsoid'; url?: string; ionAssetId?: number });
}

export class TilesetLayer extends Layer {
  constructor(options?: LayerOptions & { url?: string; ionAssetId?: number; position?: [number, number, number]; rotation?: [number, number, number] });
}

export class GeoJsonLayer extends Layer {
  constructor(options?: LayerOptions & { url?: string; data?: object; style?: Record<string, any>; clampToGround?: boolean });
  flyTo(options?: { duration?: number }): this;
  raise(): this;
  lower(): this;
}

export class GraphicLayer extends Layer {
  constructor(options?: LayerOptions & { clustering?: { enabled?: boolean; pixelRange?: number; minimumClusterSize?: number } });
  addGraphic(graphic: BaseGraphic): this;
  removeGraphic(graphic: BaseGraphic): this;
  removeAllGraphics(): this;
  getGraphicById(id: string): BaseGraphic | undefined;
  getGraphics(): BaseGraphic[];
}

export class KmlLayer extends Layer {
  constructor(options?: LayerOptions & { url?: string });
  flyTo(options?: { duration?: number }): this;
  raise(): this;
  lower(): this;
}

export class CzmlLayer extends Layer {
  constructor(options?: LayerOptions & { url?: string; data?: any[] });
  process(czml: any[]): this;
  flyTo(options?: { duration?: number }): this;
  raise(): this;
  lower(): this;
}

// ──────────────────────────────────────────────────────────
// 图形
// ──────────────────────────────────────────────────────────

export class BaseGraphic {
  constructor(options?: GraphicOptions);
  readonly id: string;
  name: string;
  position: [number, number, number?];
  show: boolean;
  style: Record<string, any>;
  popup: string | ((graphic: BaseGraphic) => string) | undefined;
  tooltip: string | ((graphic: BaseGraphic) => string) | undefined;
  readonly entity: Cesium.Entity | null;

  setPosition(position: [number, number, number?]): this;
  setShow(show: boolean): this;
  setStyle(style: Record<string, any>): this;
  flyTo(options?: { duration?: number }): this;
}

export class PointGraphic extends BaseGraphic {}
export class BillboardGraphic extends BaseGraphic {}
export class LabelGraphic extends BaseGraphic {}
export class ModelGraphic extends BaseGraphic {
  setOrientation(orientation: { heading?: number; pitch?: number; roll?: number }): this;
}

export class PolylineGraphic extends BaseGraphic {
  setPositions(positions: number[][]): this;
}

export class PolygonGraphic extends BaseGraphic {
  setPositions(positions: number[][]): this;
  setHoles(holes: number[][][]): this;
}

export class CircleGraphic extends BaseGraphic {
  setRadius(radius: number): this;
}

export class RectangleGraphic extends BaseGraphic {}
export class WallGraphic extends BaseGraphic {}
export class CylinderGraphic extends BaseGraphic {}
export class BoxGraphic extends BaseGraphic {}
export class EllipsoidGraphic extends BaseGraphic {}
export class EllipseGraphic extends BaseGraphic {}

// ──────────────────────────────────────────────────────────
// 工具
// ──────────────────────────────────────────────────────────

export class Draw {
  constructor(map: GeoMap);
  point(): Promise<{ position: number[]; cancelled?: boolean }>;
  polyline(): Promise<{ positions: number[][]; distance: number; cancelled?: boolean }>;
  polygon(): Promise<{ positions: number[][]; area: number; cancelled?: boolean }>;
  rectangle(): Promise<{ positions: number[][]; cancelled?: boolean }>;
  circle(): Promise<{ center: number[]; radius: number; cancelled?: boolean }>;
  stop(): this;
  clear(): this;
  destroy(): void;
}

export class Measure {
  constructor(map: GeoMap);
  distance(): Promise<{ distance: number; positions: number[][]; cancelled?: boolean }>;
  area(): Promise<{ area: number; positions: number[][]; cancelled?: boolean }>;
  height(): Promise<{ height: number; position: number[]; cancelled?: boolean }>;
  angle(): Promise<{ angle: number; positions: number[][]; cancelled?: boolean }>;
  stop(): this;
  clear(): this;
  destroy(): void;
}

// ──────────────────────────────────────────────────────────
// 控件
// ──────────────────────────────────────────────────────────

export class Navigation {
  constructor(map: GeoMap, options?: NavigationOptions);
  setNavigationLocked(locked: boolean): this;
  getNavigationLocked(): boolean;
  getInstance(): any;
  destroy(): void;
}

export class Toolbar {
  constructor(map: GeoMap, options?: ToolbarOptions);
  show(): this;
  hide(): this;
  toggle(): this;
  getInfo(): {
    lon: number;
    lat: number;
    altitude: number;
    heading: number;
    pitch: number;
    cameraHeight: number;
    level: number;
    fps: number;
  };
  destroy(): void;
}

export class NavBar {
  constructor(map: GeoMap, options?: NavBarOptions);
  show(): this;
  hide(): this;
  toggle(): this;
  destroy(): void;
}

// ──────────────────────────────────────────────────────────
// 天空盒
// ──────────────────────────────────────────────────────────

export class SpaceSkyBox {
  static create(options?: SkyBoxOptions): Cesium.SkyBox;
  static startAnimation(viewer: Cesium.Viewer, options?: { starCount?: number; speed?: number }): void;
  static stopAnimation(): void;
  static startMeteorAnimation(viewer: Cesium.Viewer, options?: { interval?: number; speed?: number; maxMeteors?: number }): void;
  static stopMeteorAnimation(): void;
}

// ──────────────────────────────────────────────────────────
// 工具函数
// ──────────────────────────────────────────────────────────

export namespace Util {
  function merge(target: object, source: object): object;
  function isArray(obj: any): obj is any[];
  function isObject(obj: any): obj is Record<string, any>;
  function isFunction(obj: any): obj is Function;
  function uuid(): string;
  function lngLatToCartesian(lng: number, lat: number, height?: number): Cesium.Cartesian3;
  function positionToCartesian(position: [number, number, number?]): Cesium.Cartesian3;
  function positionsToCartesians(positions: number[][]): Cesium.Cartesian3[];
  function cartesianToLngLat(cartesian: Cesium.Cartesian3): [number, number, number];
}

// ──────────────────────────────────────────────────────────
// 常量枚举（re-export from Cesium）
// ──────────────────────────────────────────────────────────

export const SceneMode: typeof Cesium.SceneMode;
export const Color: typeof Cesium.Color;
export const HeightReference: typeof Cesium.HeightReference;
export const HorizontalOrigin: typeof Cesium.HorizontalOrigin;
export const VerticalOrigin: typeof Cesium.VerticalOrigin;
export const LabelStyle: typeof Cesium.LabelStyle;
export const ClassificationType: typeof Cesium.ClassificationType;
export const ArcType: typeof Cesium.ArcType;
export const ShadowMode: typeof Cesium.ShadowMode;
export const ColorBlendMode: typeof Cesium.ColorBlendMode;
export const Cartesian2: typeof Cesium.Cartesian2;
export const Cartesian3: typeof Cesium.Cartesian3;
export const Cartesian4: typeof Cesium.Cartesian4;
export const Cartographic: typeof Cesium.Cartographic;
export const Rectangle: typeof Cesium.Rectangle;
export const PolygonHierarchy: typeof Cesium.PolygonHierarchy;
export const BoundingSphere: typeof Cesium.BoundingSphere;
export const Quaternion: typeof Cesium.Quaternion;
export const Matrix2: typeof Cesium.Matrix2;
export const Matrix3: typeof Cesium.Matrix3;
export const Matrix4: typeof Cesium.Matrix4;
export const TranslationRotationScale: typeof Cesium.TranslationRotationScale;
export const HeadingPitchRange: typeof Cesium.HeadingPitchRange;
export const HeadingPitchRoll: typeof Cesium.HeadingPitchRoll;
export const NearFarScalar: typeof Cesium.NearFarScalar;
export const DistanceDisplayCondition: typeof Cesium.DistanceDisplayCondition;
export const ScreenSpaceEventType: typeof Cesium.ScreenSpaceEventType;
export const ScreenSpaceEventHandler: typeof Cesium.ScreenSpaceEventHandler;
export const CustomHeightmapTerrainProvider: typeof Cesium.CustomHeightmapTerrainProvider;
export const EllipsoidTerrainProvider: typeof Cesium.EllipsoidTerrainProvider;
export const Material: typeof Cesium.Material;
export const MaterialProperty: typeof Cesium.MaterialProperty;
export const ColorMaterialProperty: typeof Cesium.ColorMaterialProperty;
export const ImageMaterialProperty: typeof Cesium.ImageMaterialProperty;
export const CheckerboardMaterialProperty: typeof Cesium.CheckerboardMaterialProperty;
export const StripeMaterialProperty: typeof Cesium.StripeMaterialProperty;
export const GridMaterialProperty: typeof Cesium.GridMaterialProperty;
export const PolylineGlowMaterialProperty: typeof Cesium.PolylineGlowMaterialProperty;
export const PolylineOutlineMaterialProperty: typeof Cesium.PolylineOutlineMaterialProperty;
export const PolylineDashMaterialProperty: typeof Cesium.PolylineDashMaterialProperty;
export const PolylineArrowMaterialProperty: typeof Cesium.PolylineArrowMaterialProperty;
export const CallbackProperty: typeof Cesium.CallbackProperty;
export const ConstantProperty: typeof Cesium.ConstantProperty;
export const SampledProperty: typeof Cesium.SampledProperty;
export const SampledPositionProperty: typeof Cesium.SampledPositionProperty;
export const TimeIntervalCollectionProperty: typeof Cesium.TimeIntervalCollectionProperty;
export const JulianDate: typeof Cesium.JulianDate;
export const TimeInterval: typeof Cesium.TimeInterval;
export const TimeIntervalCollection: typeof Cesium.TimeIntervalCollection;
export const ClockRange: typeof Cesium.ClockRange;
export const ClockStep: typeof Cesium.ClockStep;
export const Resource: typeof Cesium.Resource;
export const Primitive: typeof Cesium.Primitive;
export const GeometryInstance: typeof Cesium.GeometryInstance;
export const PolygonGeometry: typeof Cesium.PolygonGeometry;
export const MaterialAppearance: typeof Cesium.MaterialAppearance;

export declare const CesiumMath: {
  toRadians(degrees: number): number;
  toDegrees(radians: number): number;
  PI: number;
  PI_OVER_TWO: number;
  PI_OVER_FOUR: number;
};

export const VERSION: string;

// 默认导出
declare const _default: {
  VERSION: string;
  GeoMap: typeof GeoMap;
  Map: typeof GeoMap;
  [key: string]: any;
};
export default _default;
