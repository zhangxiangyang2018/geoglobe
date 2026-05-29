function $(n, e) {
  this.x = n, this.y = e;
}
$.prototype = {
  /**
   * Clone this point, returning a new point that can be modified
   * without affecting the old one.
   * @return {Point} the clone
   */
  clone() {
    return new $(this.x, this.y);
  },
  /**
   * Add this point's x & y coordinates to another point,
   * yielding a new point.
   * @param {Point} p the other point
   * @return {Point} output point
   */
  add(n) {
    return this.clone()._add(n);
  },
  /**
   * Subtract this point's x & y coordinates to from point,
   * yielding a new point.
   * @param {Point} p the other point
   * @return {Point} output point
   */
  sub(n) {
    return this.clone()._sub(n);
  },
  /**
   * Multiply this point's x & y coordinates by point,
   * yielding a new point.
   * @param {Point} p the other point
   * @return {Point} output point
   */
  multByPoint(n) {
    return this.clone()._multByPoint(n);
  },
  /**
   * Divide this point's x & y coordinates by point,
   * yielding a new point.
   * @param {Point} p the other point
   * @return {Point} output point
   */
  divByPoint(n) {
    return this.clone()._divByPoint(n);
  },
  /**
   * Multiply this point's x & y coordinates by a factor,
   * yielding a new point.
   * @param {number} k factor
   * @return {Point} output point
   */
  mult(n) {
    return this.clone()._mult(n);
  },
  /**
   * Divide this point's x & y coordinates by a factor,
   * yielding a new point.
   * @param {number} k factor
   * @return {Point} output point
   */
  div(n) {
    return this.clone()._div(n);
  },
  /**
   * Rotate this point around the 0, 0 origin by an angle a,
   * given in radians
   * @param {number} a angle to rotate around, in radians
   * @return {Point} output point
   */
  rotate(n) {
    return this.clone()._rotate(n);
  },
  /**
   * Rotate this point around p point by an angle a,
   * given in radians
   * @param {number} a angle to rotate around, in radians
   * @param {Point} p Point to rotate around
   * @return {Point} output point
   */
  rotateAround(n, e) {
    return this.clone()._rotateAround(n, e);
  },
  /**
   * Multiply this point by a 4x1 transformation matrix
   * @param {[number, number, number, number]} m transformation matrix
   * @return {Point} output point
   */
  matMult(n) {
    return this.clone()._matMult(n);
  },
  /**
   * Calculate this point but as a unit vector from 0, 0, meaning
   * that the distance from the resulting point to the 0, 0
   * coordinate will be equal to 1 and the angle from the resulting
   * point to the 0, 0 coordinate will be the same as before.
   * @return {Point} unit vector point
   */
  unit() {
    return this.clone()._unit();
  },
  /**
   * Compute a perpendicular point, where the new y coordinate
   * is the old x coordinate and the new x coordinate is the old y
   * coordinate multiplied by -1
   * @return {Point} perpendicular point
   */
  perp() {
    return this.clone()._perp();
  },
  /**
   * Return a version of this point with the x & y coordinates
   * rounded to integers.
   * @return {Point} rounded point
   */
  round() {
    return this.clone()._round();
  },
  /**
   * Return the magnitude of this point: this is the Euclidean
   * distance from the 0, 0 coordinate to this point's x and y
   * coordinates.
   * @return {number} magnitude
   */
  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  },
  /**
   * Judge whether this point is equal to another point, returning
   * true or false.
   * @param {Point} other the other point
   * @return {boolean} whether the points are equal
   */
  equals(n) {
    return this.x === n.x && this.y === n.y;
  },
  /**
   * Calculate the distance from this point to another point
   * @param {Point} p the other point
   * @return {number} distance
   */
  dist(n) {
    return Math.sqrt(this.distSqr(n));
  },
  /**
   * Calculate the distance from this point to another point,
   * without the square root step. Useful if you're comparing
   * relative distances.
   * @param {Point} p the other point
   * @return {number} distance
   */
  distSqr(n) {
    const e = n.x - this.x, t = n.y - this.y;
    return e * e + t * t;
  },
  /**
   * Get the angle from the 0, 0 coordinate to this point, in radians
   * coordinates.
   * @return {number} angle
   */
  angle() {
    return Math.atan2(this.y, this.x);
  },
  /**
   * Get the angle from this point to another point, in radians
   * @param {Point} b the other point
   * @return {number} angle
   */
  angleTo(n) {
    return Math.atan2(this.y - n.y, this.x - n.x);
  },
  /**
   * Get the angle between this point and another point, in radians
   * @param {Point} b the other point
   * @return {number} angle
   */
  angleWith(n) {
    return this.angleWithSep(n.x, n.y);
  },
  /**
   * Find the angle of the two vectors, solving the formula for
   * the cross product a x b = |a||b|sin(θ) for θ.
   * @param {number} x the x-coordinate
   * @param {number} y the y-coordinate
   * @return {number} the angle in radians
   */
  angleWithSep(n, e) {
    return Math.atan2(
      this.x * e - this.y * n,
      this.x * n + this.y * e
    );
  },
  /** @param {[number, number, number, number]} m */
  _matMult(n) {
    const e = n[0] * this.x + n[1] * this.y, t = n[2] * this.x + n[3] * this.y;
    return this.x = e, this.y = t, this;
  },
  /** @param {Point} p */
  _add(n) {
    return this.x += n.x, this.y += n.y, this;
  },
  /** @param {Point} p */
  _sub(n) {
    return this.x -= n.x, this.y -= n.y, this;
  },
  /** @param {number} k */
  _mult(n) {
    return this.x *= n, this.y *= n, this;
  },
  /** @param {number} k */
  _div(n) {
    return this.x /= n, this.y /= n, this;
  },
  /** @param {Point} p */
  _multByPoint(n) {
    return this.x *= n.x, this.y *= n.y, this;
  },
  /** @param {Point} p */
  _divByPoint(n) {
    return this.x /= n.x, this.y /= n.y, this;
  },
  _unit() {
    return this._div(this.mag()), this;
  },
  _perp() {
    const n = this.y;
    return this.y = this.x, this.x = -n, this;
  },
  /** @param {number} angle */
  _rotate(n) {
    const e = Math.cos(n), t = Math.sin(n), i = e * this.x - t * this.y, r = t * this.x + e * this.y;
    return this.x = i, this.y = r, this;
  },
  /**
   * @param {number} angle
   * @param {Point} p
   */
  _rotateAround(n, e) {
    const t = Math.cos(n), i = Math.sin(n), r = e.x + t * (this.x - e.x) - i * (this.y - e.y), s = e.y + i * (this.x - e.x) + t * (this.y - e.y);
    return this.x = r, this.y = s, this;
  },
  _round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  },
  constructor: $
};
$.convert = function(n) {
  if (n instanceof $)
    return (
      /** @type {Point} */
      n
    );
  if (Array.isArray(n))
    return new $(+n[0], +n[1]);
  if (n.x !== void 0 && n.y !== void 0)
    return new $(+n.x, +n.y);
  throw new Error("Expected [x, y] or {x, y} point format");
};
class tt {
  /**
   * @param {Pbf} pbf
   * @param {number} end
   * @param {number} extent
   * @param {string[]} keys
   * @param {(number | string | boolean)[]} values
   */
  constructor(e, t, i, r, s) {
    this.properties = {}, this.extent = i, this.type = 0, this.id = void 0, this._pbf = e, this._geometry = -1, this._keys = r, this._values = s, e.readFields(Ks, this, t);
  }
  loadGeometry() {
    const e = this._pbf;
    e.pos = this._geometry;
    const t = e.readVarint() + e.pos, i = [];
    let r, s = 1, o = 0, a = 0, l = 0;
    for (; e.pos < t; ) {
      if (o <= 0) {
        const c = e.readVarint();
        s = c & 7, o = c >> 3;
      }
      if (o--, s === 1 || s === 2)
        a += e.readSVarint(), l += e.readSVarint(), s === 1 && (r && i.push(r), r = []), r && r.push(new $(a, l));
      else if (s === 7)
        r && r.push(r[0].clone());
      else
        throw new Error(`unknown command ${s}`);
    }
    return r && i.push(r), i;
  }
  bbox() {
    const e = this._pbf;
    e.pos = this._geometry;
    const t = e.readVarint() + e.pos;
    let i = 1, r = 0, s = 0, o = 0, a = 1 / 0, l = -1 / 0, c = 1 / 0, u = -1 / 0;
    for (; e.pos < t; ) {
      if (r <= 0) {
        const f = e.readVarint();
        i = f & 7, r = f >> 3;
      }
      if (r--, i === 1 || i === 2)
        s += e.readSVarint(), o += e.readSVarint(), s < a && (a = s), s > l && (l = s), o < c && (c = o), o > u && (u = o);
      else if (i !== 7)
        throw new Error(`unknown command ${i}`);
    }
    return [a, c, l, u];
  }
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {Feature}
   */
  toGeoJSON(e, t, i) {
    const r = this.extent * Math.pow(2, i), s = this.extent * e, o = this.extent * t, a = this.loadGeometry();
    function l(h) {
      return [
        (h.x + s) * 360 / r - 180,
        360 / Math.PI * Math.atan(Math.exp((1 - (h.y + o) * 2 / r) * Math.PI)) - 90
      ];
    }
    function c(h) {
      return h.map(l);
    }
    let u;
    if (this.type === 1) {
      const h = [];
      for (const d of a)
        h.push(d[0]);
      const p = c(h);
      u = h.length === 1 ? { type: "Point", coordinates: p[0] } : { type: "MultiPoint", coordinates: p };
    } else if (this.type === 2) {
      const h = a.map(c);
      u = h.length === 1 ? { type: "LineString", coordinates: h[0] } : { type: "MultiLineString", coordinates: h };
    } else if (this.type === 3) {
      const h = ji(a), p = [];
      for (const d of h)
        p.push(d.map(c));
      u = p.length === 1 ? { type: "Polygon", coordinates: p[0] } : { type: "MultiPolygon", coordinates: p };
    } else
      throw new Error("unknown feature type");
    const f = {
      type: "Feature",
      geometry: u,
      properties: this.properties
    };
    return this.id != null && (f.id = this.id), f;
  }
}
tt.types = ["Unknown", "Point", "LineString", "Polygon"];
function Ks(n, e, t) {
  n === 1 ? e.id = t.readVarint() : n === 2 ? Qs(t, e) : n === 3 ? e.type = /** @type {0 | 1 | 2 | 3} */
  t.readVarint() : n === 4 && (e._geometry = t.pos);
}
function Qs(n, e) {
  const t = n.readVarint() + n.pos;
  for (; n.pos < t; ) {
    const i = e._keys[n.readVarint()], r = e._values[n.readVarint()];
    e.properties[i] = r;
  }
}
function ji(n) {
  const e = n.length;
  if (e <= 1) return [n];
  const t = [];
  let i, r;
  for (let s = 0; s < e; s++) {
    const o = eo(n[s]);
    o !== 0 && (r === void 0 && (r = o < 0), r === o < 0 ? (i && t.push(i), i = [n[s]]) : i && i.push(n[s]));
  }
  return i && t.push(i), t;
}
function eo(n) {
  let e = 0;
  for (let t = 0, i = n.length, r = i - 1, s, o; t < i; r = t++)
    s = n[t], o = n[r], e += (o.x - s.x) * (s.y + o.y);
  return e;
}
class to {
  /**
   * @param {Pbf} pbf
   * @param {number} [end]
   */
  constructor(e, t) {
    this.version = 1, this.name = "", this.extent = 4096, this.length = 0, this._pbf = e, this._keys = [], this._values = [], this._features = [], e.readFields(no, this, t), this.length = this._features.length;
  }
  /** return feature `i` from this layer as a `VectorTileFeature`
   * @param {number} i
   */
  feature(e) {
    if (e < 0 || e >= this._features.length) throw new Error("feature index out of bounds");
    this._pbf.pos = this._features[e];
    const t = this._pbf.readVarint() + this._pbf.pos;
    return new tt(this._pbf, t, this.extent, this._keys, this._values);
  }
}
function no(n, e, t) {
  n === 15 ? e.version = t.readVarint() : n === 1 ? e.name = t.readString() : n === 5 ? e.extent = t.readVarint() : n === 2 ? e._features.push(t.pos) : n === 3 ? e._keys.push(t.readString()) : n === 4 && e._values.push(ro(t));
}
function ro(n) {
  let e = null;
  const t = n.readVarint() + n.pos;
  for (; n.pos < t; ) {
    const i = n.readVarint() >> 3;
    e = i === 1 ? n.readString() : i === 2 ? n.readFloat() : i === 3 ? n.readDouble() : i === 4 ? n.readVarint64() : i === 5 ? n.readVarint() : i === 6 ? n.readSVarint() : i === 7 ? n.readBoolean() : null;
  }
  if (e == null)
    throw new Error("unknown feature value");
  return e;
}
class io {
  /**
   * @param {Pbf} pbf
   * @param {number} [end]
   */
  constructor(e, t) {
    this.layers = e.readFields(so, {}, t);
  }
}
function so(n, e, t) {
  if (n === 3) {
    const i = new to(t, t.readVarint() + t.pos);
    i.length && (e[i.name] = i);
  }
}
class Zi {
  /**
   * 构造数据源实例。注意：该构造函数由VectorTileset调用，请勿在其他模块直接调用
   * @param {import('@maplibre/maplibre-gl-style-spec').SourceSpecification} styleSource
   * @param {string} [path]
   * @see VectorSource
   * @see GeoJSONSource
   */
  constructor(e, t = "") {
    this.type = e.type, this.styleSource = e, this.path = t, this.errorEvent = new Cesium.Event();
  }
  async init() {
  }
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Promise<VectorTile>}
   */
  requestTile(e, t, i) {
  }
  destroy() {
    this.styleSource = null, this.errorEvent = null;
  }
}
const Wi = {};
function Xi(n, e) {
  Wi[n] = e;
}
class nt {
  constructor(e, t, i) {
    this._name = e, this.dataBuffer = t, typeof i == "number" ? this._size = i : (this.nullabilityBuffer = i, this._size = i.size());
  }
  getValue(e) {
    return this.nullabilityBuffer && !this.nullabilityBuffer.get(e) ? null : this.getValueFromBuffer(e);
  }
  has(e) {
    return this.nullabilityBuffer?.get(e) || !this.nullabilityBuffer;
  }
  get name() {
    return this._name;
  }
  get size() {
    return this._size;
  }
}
class nn extends nt {
}
class ar extends nn {
  getValueFromBuffer(e) {
    return this.dataBuffer[e];
  }
}
class lr extends nn {
  getValueFromBuffer(e) {
    return this.dataBuffer[e];
  }
}
class Yi extends nt {
  constructor(e, t, i, r) {
    super(e, t, r), this.delta = i;
  }
}
class cr extends Yi {
  constructor(e, t, i, r) {
    super(e, Int32Array.of(t), i, r);
  }
  getValueFromBuffer(e) {
    return this.dataBuffer[0] + e * this.delta;
  }
}
class ur extends nt {
  constructor(e, t, i, r) {
    super(e, r ? Int32Array.of(t) : Uint32Array.of(t), i);
  }
  getValueFromBuffer(e) {
    return this.dataBuffer[0];
  }
}
class oo {
  constructor(e, t, i, r, s = 4096) {
    this._name = e, this._geometryVector = t, this._idVector = i, this._propertyVectors = r, this._extent = s;
  }
  get name() {
    return this._name;
  }
  get idVector() {
    return this._idVector;
  }
  get geometryVector() {
    return this._geometryVector;
  }
  get propertyVectors() {
    return this._propertyVectors;
  }
  getPropertyVector(e) {
    return this.propertyVectorsMap || (this.propertyVectorsMap = new Map(this._propertyVectors.map((t) => [t.name, t]))), this.propertyVectorsMap.get(e);
  }
  get numFeatures() {
    return this.geometryVector.numGeometries;
  }
  get extent() {
    return this._extent;
  }
  /**
   * Returns all features as an array
   */
  getFeatures() {
    const e = [], t = this.geometryVector.getGeometries();
    for (let i = 0; i < this.numFeatures; i++) {
      let r;
      if (this.idVector) {
        const a = this.idVector.getValue(i);
        r = this.containsMaxSafeIntegerValues(this.idVector) && a !== null ? Number(a) : a;
      }
      const s = {
        coordinates: t[i],
        type: this.geometryVector.geometryType(i)
      }, o = {};
      for (const a of this.propertyVectors) {
        if (!a)
          continue;
        const l = a.name, c = a.getValue(i);
        c !== null && (o[l] = c);
      }
      e.push({ id: r, geometry: s, properties: o });
    }
    return e;
  }
  containsMaxSafeIntegerValues(e) {
    return e instanceof ar || e instanceof ur || e instanceof cr || e instanceof lr;
  }
}
const Ut = {
  FEATURE: 0
}, A = {
  BOOLEAN: 0,
  INT_8: 1,
  UINT_8: 2,
  INT_32: 3,
  UINT_32: 4,
  INT_64: 5,
  UINT_64: 6,
  FLOAT: 7,
  DOUBLE: 8,
  STRING: 9
}, dt = {
  GEOMETRY: 0,
  STRUCT: 1
}, fr = {
  ID: 0
};
class Hi {
  constructor(e) {
    this.value = e;
  }
  get() {
    return this.value;
  }
  set(e) {
    this.value = e;
  }
  increment() {
    return this.value++;
  }
  add(e) {
    this.value += e;
  }
}
var F;
(function(n) {
  n.NONE = "NONE", n.DELTA = "DELTA", n.COMPONENTWISE_DELTA = "COMPONENTWISE_DELTA", n.RLE = "RLE", n.MORTON = "MORTON", n.PDE = "PDE";
})(F || (F = {}));
var Se;
(function(n) {
  n.NONE = "NONE", n.FAST_PFOR = "FAST_PFOR", n.VARINT = "VARINT";
})(Se || (Se = {}));
const hr = new Uint32Array(33);
hr[0] = 0;
for (let n = 1; n <= 32; n++)
  hr[n] = n === 32 ? 4294967295 : 4294967295 >>> 32 - n;
const Un = hr, Ji = 65536, ce = 256;
function pr(n, e) {
  return n - n % e;
}
function ao(n) {
  return pr(n + 31, 32);
}
function lo(n) {
  if (!Number.isFinite(n) || n <= 0)
    return Ji;
  const e = pr(Math.floor(n), ce);
  return e === 0 ? ce : e;
}
function co(n) {
  const e = n >>> 0;
  return ((e & 255) << 24 | (e & 65280) << 8 | e >>> 8 & 65280 | e >>> 24 & 255) >>> 0;
}
function uo(n, e, t, i) {
  let r = i;
  const s = n[e] >>> 0, o = n[e + 1] >>> 0;
  t[r++] = s >>> 0 & 3, t[r++] = s >>> 2 & 3, t[r++] = s >>> 4 & 3, t[r++] = s >>> 6 & 3, t[r++] = s >>> 8 & 3, t[r++] = s >>> 10 & 3, t[r++] = s >>> 12 & 3, t[r++] = s >>> 14 & 3, t[r++] = s >>> 16 & 3, t[r++] = s >>> 18 & 3, t[r++] = s >>> 20 & 3, t[r++] = s >>> 22 & 3, t[r++] = s >>> 24 & 3, t[r++] = s >>> 26 & 3, t[r++] = s >>> 28 & 3, t[r++] = s >>> 30 & 3, t[r++] = o >>> 0 & 3, t[r++] = o >>> 2 & 3, t[r++] = o >>> 4 & 3, t[r++] = o >>> 6 & 3, t[r++] = o >>> 8 & 3, t[r++] = o >>> 10 & 3, t[r++] = o >>> 12 & 3, t[r++] = o >>> 14 & 3, t[r++] = o >>> 16 & 3, t[r++] = o >>> 18 & 3, t[r++] = o >>> 20 & 3, t[r++] = o >>> 22 & 3, t[r++] = o >>> 24 & 3, t[r++] = o >>> 26 & 3, t[r++] = o >>> 28 & 3, t[r] = o >>> 30 & 3;
}
function fo(n, e, t, i) {
  let r = i;
  const s = n[e] >>> 0, o = n[e + 1] >>> 0, a = n[e + 2] >>> 0;
  t[r++] = s >>> 0 & 7, t[r++] = s >>> 3 & 7, t[r++] = s >>> 6 & 7, t[r++] = s >>> 9 & 7, t[r++] = s >>> 12 & 7, t[r++] = s >>> 15 & 7, t[r++] = s >>> 18 & 7, t[r++] = s >>> 21 & 7, t[r++] = s >>> 24 & 7, t[r++] = s >>> 27 & 7, t[r++] = (s >>> 30 | (o & 1) << 2) & 7, t[r++] = o >>> 1 & 7, t[r++] = o >>> 4 & 7, t[r++] = o >>> 7 & 7, t[r++] = o >>> 10 & 7, t[r++] = o >>> 13 & 7, t[r++] = o >>> 16 & 7, t[r++] = o >>> 19 & 7, t[r++] = o >>> 22 & 7, t[r++] = o >>> 25 & 7, t[r++] = o >>> 28 & 7, t[r++] = (o >>> 31 | (a & 3) << 1) & 7, t[r++] = a >>> 2 & 7, t[r++] = a >>> 5 & 7, t[r++] = a >>> 8 & 7, t[r++] = a >>> 11 & 7, t[r++] = a >>> 14 & 7, t[r++] = a >>> 17 & 7, t[r++] = a >>> 20 & 7, t[r++] = a >>> 23 & 7, t[r++] = a >>> 26 & 7, t[r] = a >>> 29 & 7;
}
function ho(n, e, t, i) {
  let r = i;
  const s = n[e] >>> 0, o = n[e + 1] >>> 0, a = n[e + 2] >>> 0, l = n[e + 3] >>> 0;
  t[r++] = s >>> 0 & 15, t[r++] = s >>> 4 & 15, t[r++] = s >>> 8 & 15, t[r++] = s >>> 12 & 15, t[r++] = s >>> 16 & 15, t[r++] = s >>> 20 & 15, t[r++] = s >>> 24 & 15, t[r++] = s >>> 28 & 15, t[r++] = o >>> 0 & 15, t[r++] = o >>> 4 & 15, t[r++] = o >>> 8 & 15, t[r++] = o >>> 12 & 15, t[r++] = o >>> 16 & 15, t[r++] = o >>> 20 & 15, t[r++] = o >>> 24 & 15, t[r++] = o >>> 28 & 15, t[r++] = a >>> 0 & 15, t[r++] = a >>> 4 & 15, t[r++] = a >>> 8 & 15, t[r++] = a >>> 12 & 15, t[r++] = a >>> 16 & 15, t[r++] = a >>> 20 & 15, t[r++] = a >>> 24 & 15, t[r++] = a >>> 28 & 15, t[r++] = l >>> 0 & 15, t[r++] = l >>> 4 & 15, t[r++] = l >>> 8 & 15, t[r++] = l >>> 12 & 15, t[r++] = l >>> 16 & 15, t[r++] = l >>> 20 & 15, t[r++] = l >>> 24 & 15, t[r] = l >>> 28 & 15;
}
function po(n, e, t, i) {
  let r = i;
  const s = n[e] >>> 0, o = n[e + 1] >>> 0, a = n[e + 2] >>> 0, l = n[e + 3] >>> 0, c = n[e + 4] >>> 0;
  t[r++] = s >>> 0 & 31, t[r++] = s >>> 5 & 31, t[r++] = s >>> 10 & 31, t[r++] = s >>> 15 & 31, t[r++] = s >>> 20 & 31, t[r++] = s >>> 25 & 31, t[r++] = (s >>> 30 | (o & 7) << 2) & 31, t[r++] = o >>> 3 & 31, t[r++] = o >>> 8 & 31, t[r++] = o >>> 13 & 31, t[r++] = o >>> 18 & 31, t[r++] = o >>> 23 & 31, t[r++] = (o >>> 28 | (a & 1) << 4) & 31, t[r++] = a >>> 1 & 31, t[r++] = a >>> 6 & 31, t[r++] = a >>> 11 & 31, t[r++] = a >>> 16 & 31, t[r++] = a >>> 21 & 31, t[r++] = a >>> 26 & 31, t[r++] = (a >>> 31 | (l & 15) << 1) & 31, t[r++] = l >>> 4 & 31, t[r++] = l >>> 9 & 31, t[r++] = l >>> 14 & 31, t[r++] = l >>> 19 & 31, t[r++] = l >>> 24 & 31, t[r++] = (l >>> 29 | (c & 3) << 3) & 31, t[r++] = c >>> 2 & 31, t[r++] = c >>> 7 & 31, t[r++] = c >>> 12 & 31, t[r++] = c >>> 17 & 31, t[r++] = c >>> 22 & 31, t[r] = c >>> 27 & 31;
}
function yo(n, e, t, i) {
  let r = i;
  const s = n[e] >>> 0, o = n[e + 1] >>> 0, a = n[e + 2] >>> 0, l = n[e + 3] >>> 0, c = n[e + 4] >>> 0, u = n[e + 5] >>> 0;
  t[r++] = s >>> 0 & 63, t[r++] = s >>> 6 & 63, t[r++] = s >>> 12 & 63, t[r++] = s >>> 18 & 63, t[r++] = s >>> 24 & 63, t[r++] = (s >>> 30 | (o & 15) << 2) & 63, t[r++] = o >>> 4 & 63, t[r++] = o >>> 10 & 63, t[r++] = o >>> 16 & 63, t[r++] = o >>> 22 & 63, t[r++] = (o >>> 28 | (a & 3) << 4) & 63, t[r++] = a >>> 2 & 63, t[r++] = a >>> 8 & 63, t[r++] = a >>> 14 & 63, t[r++] = a >>> 20 & 63, t[r++] = a >>> 26 & 63, t[r++] = l >>> 0 & 63, t[r++] = l >>> 6 & 63, t[r++] = l >>> 12 & 63, t[r++] = l >>> 18 & 63, t[r++] = l >>> 24 & 63, t[r++] = (l >>> 30 | (c & 15) << 2) & 63, t[r++] = c >>> 4 & 63, t[r++] = c >>> 10 & 63, t[r++] = c >>> 16 & 63, t[r++] = c >>> 22 & 63, t[r++] = (c >>> 28 | (u & 3) << 4) & 63, t[r++] = u >>> 2 & 63, t[r++] = u >>> 8 & 63, t[r++] = u >>> 14 & 63, t[r++] = u >>> 20 & 63, t[r] = u >>> 26 & 63;
}
function mo(n, e, t, i) {
  let r = i;
  const s = n[e] >>> 0, o = n[e + 1] >>> 0, a = n[e + 2] >>> 0, l = n[e + 3] >>> 0, c = n[e + 4] >>> 0, u = n[e + 5] >>> 0, f = n[e + 6] >>> 0;
  t[r++] = s >>> 0 & 127, t[r++] = s >>> 7 & 127, t[r++] = s >>> 14 & 127, t[r++] = s >>> 21 & 127, t[r++] = (s >>> 28 | (o & 7) << 4) & 127, t[r++] = o >>> 3 & 127, t[r++] = o >>> 10 & 127, t[r++] = o >>> 17 & 127, t[r++] = o >>> 24 & 127, t[r++] = (o >>> 31 | (a & 63) << 1) & 127, t[r++] = a >>> 6 & 127, t[r++] = a >>> 13 & 127, t[r++] = a >>> 20 & 127, t[r++] = (a >>> 27 | (l & 3) << 5) & 127, t[r++] = l >>> 2 & 127, t[r++] = l >>> 9 & 127, t[r++] = l >>> 16 & 127, t[r++] = l >>> 23 & 127, t[r++] = (l >>> 30 | (c & 31) << 2) & 127, t[r++] = c >>> 5 & 127, t[r++] = c >>> 12 & 127, t[r++] = c >>> 19 & 127, t[r++] = (c >>> 26 | (u & 1) << 6) & 127, t[r++] = u >>> 1 & 127, t[r++] = u >>> 8 & 127, t[r++] = u >>> 15 & 127, t[r++] = u >>> 22 & 127, t[r++] = (u >>> 29 | (f & 15) << 3) & 127, t[r++] = f >>> 4 & 127, t[r++] = f >>> 11 & 127, t[r++] = f >>> 18 & 127, t[r] = f >>> 25 & 127;
}
function go(n, e, t, i) {
  let r = i;
  const s = n[e] >>> 0, o = n[e + 1] >>> 0, a = n[e + 2] >>> 0, l = n[e + 3] >>> 0, c = n[e + 4] >>> 0, u = n[e + 5] >>> 0, f = n[e + 6] >>> 0, h = n[e + 7] >>> 0;
  t[r++] = s >>> 0 & 255, t[r++] = s >>> 8 & 255, t[r++] = s >>> 16 & 255, t[r++] = s >>> 24 & 255, t[r++] = o >>> 0 & 255, t[r++] = o >>> 8 & 255, t[r++] = o >>> 16 & 255, t[r++] = o >>> 24 & 255, t[r++] = a >>> 0 & 255, t[r++] = a >>> 8 & 255, t[r++] = a >>> 16 & 255, t[r++] = a >>> 24 & 255, t[r++] = l >>> 0 & 255, t[r++] = l >>> 8 & 255, t[r++] = l >>> 16 & 255, t[r++] = l >>> 24 & 255, t[r++] = c >>> 0 & 255, t[r++] = c >>> 8 & 255, t[r++] = c >>> 16 & 255, t[r++] = c >>> 24 & 255, t[r++] = u >>> 0 & 255, t[r++] = u >>> 8 & 255, t[r++] = u >>> 16 & 255, t[r++] = u >>> 24 & 255, t[r++] = f >>> 0 & 255, t[r++] = f >>> 8 & 255, t[r++] = f >>> 16 & 255, t[r++] = f >>> 24 & 255, t[r++] = h >>> 0 & 255, t[r++] = h >>> 8 & 255, t[r++] = h >>> 16 & 255, t[r] = h >>> 24 & 255;
}
function xo(n, e, t, i) {
  let r = i;
  const s = n[e] >>> 0, o = n[e + 1] >>> 0, a = n[e + 2] >>> 0, l = n[e + 3] >>> 0, c = n[e + 4] >>> 0, u = n[e + 5] >>> 0, f = n[e + 6] >>> 0, h = n[e + 7] >>> 0, p = n[e + 8] >>> 0;
  t[r++] = s >>> 0 & 511, t[r++] = s >>> 9 & 511, t[r++] = s >>> 18 & 511, t[r++] = (s >>> 27 | (o & 15) << 5) & 511, t[r++] = o >>> 4 & 511, t[r++] = o >>> 13 & 511, t[r++] = o >>> 22 & 511, t[r++] = (o >>> 31 | (a & 255) << 1) & 511, t[r++] = a >>> 8 & 511, t[r++] = a >>> 17 & 511, t[r++] = (a >>> 26 | (l & 7) << 6) & 511, t[r++] = l >>> 3 & 511, t[r++] = l >>> 12 & 511, t[r++] = l >>> 21 & 511, t[r++] = (l >>> 30 | (c & 127) << 2) & 511, t[r++] = c >>> 7 & 511, t[r++] = c >>> 16 & 511, t[r++] = (c >>> 25 | (u & 3) << 7) & 511, t[r++] = u >>> 2 & 511, t[r++] = u >>> 11 & 511, t[r++] = u >>> 20 & 511, t[r++] = (u >>> 29 | (f & 63) << 3) & 511, t[r++] = f >>> 6 & 511, t[r++] = f >>> 15 & 511, t[r++] = (f >>> 24 | (h & 1) << 8) & 511, t[r++] = h >>> 1 & 511, t[r++] = h >>> 10 & 511, t[r++] = h >>> 19 & 511, t[r++] = (h >>> 28 | (p & 31) << 4) & 511, t[r++] = p >>> 5 & 511, t[r++] = p >>> 14 & 511, t[r] = p >>> 23 & 511;
}
function vo(n, e, t, i) {
  let r = i;
  const s = n[e] >>> 0, o = n[e + 1] >>> 0, a = n[e + 2] >>> 0, l = n[e + 3] >>> 0, c = n[e + 4] >>> 0, u = n[e + 5] >>> 0, f = n[e + 6] >>> 0, h = n[e + 7] >>> 0, p = n[e + 8] >>> 0, d = n[e + 9] >>> 0;
  t[r++] = s >>> 0 & 1023, t[r++] = s >>> 10 & 1023, t[r++] = s >>> 20 & 1023, t[r++] = (s >>> 30 | (o & 255) << 2) & 1023, t[r++] = o >>> 8 & 1023, t[r++] = o >>> 18 & 1023, t[r++] = (o >>> 28 | (a & 63) << 4) & 1023, t[r++] = a >>> 6 & 1023, t[r++] = a >>> 16 & 1023, t[r++] = (a >>> 26 | (l & 15) << 6) & 1023, t[r++] = l >>> 4 & 1023, t[r++] = l >>> 14 & 1023, t[r++] = (l >>> 24 | (c & 3) << 8) & 1023, t[r++] = c >>> 2 & 1023, t[r++] = c >>> 12 & 1023, t[r++] = c >>> 22 & 1023, t[r++] = u >>> 0 & 1023, t[r++] = u >>> 10 & 1023, t[r++] = u >>> 20 & 1023, t[r++] = (u >>> 30 | (f & 255) << 2) & 1023, t[r++] = f >>> 8 & 1023, t[r++] = f >>> 18 & 1023, t[r++] = (f >>> 28 | (h & 63) << 4) & 1023, t[r++] = h >>> 6 & 1023, t[r++] = h >>> 16 & 1023, t[r++] = (h >>> 26 | (p & 15) << 6) & 1023, t[r++] = p >>> 4 & 1023, t[r++] = p >>> 14 & 1023, t[r++] = (p >>> 24 | (d & 3) << 8) & 1023, t[r++] = d >>> 2 & 1023, t[r++] = d >>> 12 & 1023, t[r] = d >>> 22 & 1023;
}
function bo(n, e, t, i) {
  let r = i;
  const s = n[e] >>> 0, o = n[e + 1] >>> 0, a = n[e + 2] >>> 0, l = n[e + 3] >>> 0, c = n[e + 4] >>> 0, u = n[e + 5] >>> 0, f = n[e + 6] >>> 0, h = n[e + 7] >>> 0, p = n[e + 8] >>> 0, d = n[e + 9] >>> 0, y = n[e + 10] >>> 0;
  t[r++] = s >>> 0 & 2047, t[r++] = s >>> 11 & 2047, t[r++] = (s >>> 22 | (o & 1) << 10) & 2047, t[r++] = o >>> 1 & 2047, t[r++] = o >>> 12 & 2047, t[r++] = (o >>> 23 | (a & 3) << 9) & 2047, t[r++] = a >>> 2 & 2047, t[r++] = a >>> 13 & 2047, t[r++] = (a >>> 24 | (l & 7) << 8) & 2047, t[r++] = l >>> 3 & 2047, t[r++] = l >>> 14 & 2047, t[r++] = (l >>> 25 | (c & 15) << 7) & 2047, t[r++] = c >>> 4 & 2047, t[r++] = c >>> 15 & 2047, t[r++] = (c >>> 26 | (u & 31) << 6) & 2047, t[r++] = u >>> 5 & 2047, t[r++] = u >>> 16 & 2047, t[r++] = (u >>> 27 | (f & 63) << 5) & 2047, t[r++] = f >>> 6 & 2047, t[r++] = f >>> 17 & 2047, t[r++] = (f >>> 28 | (h & 127) << 4) & 2047, t[r++] = h >>> 7 & 2047, t[r++] = h >>> 18 & 2047, t[r++] = (h >>> 29 | (p & 255) << 3) & 2047, t[r++] = p >>> 8 & 2047, t[r++] = p >>> 19 & 2047, t[r++] = (p >>> 30 | (d & 511) << 2) & 2047, t[r++] = d >>> 9 & 2047, t[r++] = d >>> 20 & 2047, t[r++] = (d >>> 31 | (y & 1023) << 1) & 2047, t[r++] = y >>> 10 & 2047, t[r] = y >>> 21 & 2047;
}
function wo(n, e, t, i) {
  let r = i;
  const s = n[e] >>> 0, o = n[e + 1] >>> 0, a = n[e + 2] >>> 0, l = n[e + 3] >>> 0, c = n[e + 4] >>> 0, u = n[e + 5] >>> 0, f = n[e + 6] >>> 0, h = n[e + 7] >>> 0, p = n[e + 8] >>> 0, d = n[e + 9] >>> 0, y = n[e + 10] >>> 0, m = n[e + 11] >>> 0;
  t[r++] = s >>> 0 & 4095, t[r++] = s >>> 12 & 4095, t[r++] = (s >>> 24 | (o & 15) << 8) & 4095, t[r++] = o >>> 4 & 4095, t[r++] = o >>> 16 & 4095, t[r++] = (o >>> 28 | (a & 255) << 4) & 4095, t[r++] = a >>> 8 & 4095, t[r++] = a >>> 20 & 4095, t[r++] = l >>> 0 & 4095, t[r++] = l >>> 12 & 4095, t[r++] = (l >>> 24 | (c & 15) << 8) & 4095, t[r++] = c >>> 4 & 4095, t[r++] = c >>> 16 & 4095, t[r++] = (c >>> 28 | (u & 255) << 4) & 4095, t[r++] = u >>> 8 & 4095, t[r++] = u >>> 20 & 4095, t[r++] = f >>> 0 & 4095, t[r++] = f >>> 12 & 4095, t[r++] = (f >>> 24 | (h & 15) << 8) & 4095, t[r++] = h >>> 4 & 4095, t[r++] = h >>> 16 & 4095, t[r++] = (h >>> 28 | (p & 255) << 4) & 4095, t[r++] = p >>> 8 & 4095, t[r++] = p >>> 20 & 4095, t[r++] = d >>> 0 & 4095, t[r++] = d >>> 12 & 4095, t[r++] = (d >>> 24 | (y & 15) << 8) & 4095, t[r++] = y >>> 4 & 4095, t[r++] = y >>> 16 & 4095, t[r++] = (y >>> 28 | (m & 255) << 4) & 4095, t[r++] = m >>> 8 & 4095, t[r] = m >>> 20 & 4095;
}
function Co(n, e, t, i) {
  let r = i;
  const s = n[e] >>> 0, o = n[e + 1] >>> 0, a = n[e + 2] >>> 0, l = n[e + 3] >>> 0, c = n[e + 4] >>> 0, u = n[e + 5] >>> 0, f = n[e + 6] >>> 0, h = n[e + 7] >>> 0, p = n[e + 8] >>> 0, d = n[e + 9] >>> 0, y = n[e + 10] >>> 0, m = n[e + 11] >>> 0, x = n[e + 12] >>> 0, w = n[e + 13] >>> 0, v = n[e + 14] >>> 0, g = n[e + 15] >>> 0;
  t[r++] = s >>> 0 & 65535, t[r++] = s >>> 16 & 65535, t[r++] = o >>> 0 & 65535, t[r++] = o >>> 16 & 65535, t[r++] = a >>> 0 & 65535, t[r++] = a >>> 16 & 65535, t[r++] = l >>> 0 & 65535, t[r++] = l >>> 16 & 65535, t[r++] = c >>> 0 & 65535, t[r++] = c >>> 16 & 65535, t[r++] = u >>> 0 & 65535, t[r++] = u >>> 16 & 65535, t[r++] = f >>> 0 & 65535, t[r++] = f >>> 16 & 65535, t[r++] = h >>> 0 & 65535, t[r++] = h >>> 16 & 65535, t[r++] = p >>> 0 & 65535, t[r++] = p >>> 16 & 65535, t[r++] = d >>> 0 & 65535, t[r++] = d >>> 16 & 65535, t[r++] = y >>> 0 & 65535, t[r++] = y >>> 16 & 65535, t[r++] = m >>> 0 & 65535, t[r++] = m >>> 16 & 65535, t[r++] = x >>> 0 & 65535, t[r++] = x >>> 16 & 65535, t[r++] = w >>> 0 & 65535, t[r++] = w >>> 16 & 65535, t[r++] = v >>> 0 & 65535, t[r++] = v >>> 16 & 65535, t[r++] = g >>> 0 & 65535, t[r] = g >>> 16 & 65535;
}
function To(n, e, t, i) {
  let r = i, s = e;
  for (let o = 0; o < 8; o++) {
    const a = n[s++] >>> 0;
    t[r++] = a >>> 0 & 1, t[r++] = a >>> 1 & 1, t[r++] = a >>> 2 & 1, t[r++] = a >>> 3 & 1, t[r++] = a >>> 4 & 1, t[r++] = a >>> 5 & 1, t[r++] = a >>> 6 & 1, t[r++] = a >>> 7 & 1, t[r++] = a >>> 8 & 1, t[r++] = a >>> 9 & 1, t[r++] = a >>> 10 & 1, t[r++] = a >>> 11 & 1, t[r++] = a >>> 12 & 1, t[r++] = a >>> 13 & 1, t[r++] = a >>> 14 & 1, t[r++] = a >>> 15 & 1, t[r++] = a >>> 16 & 1, t[r++] = a >>> 17 & 1, t[r++] = a >>> 18 & 1, t[r++] = a >>> 19 & 1, t[r++] = a >>> 20 & 1, t[r++] = a >>> 21 & 1, t[r++] = a >>> 22 & 1, t[r++] = a >>> 23 & 1, t[r++] = a >>> 24 & 1, t[r++] = a >>> 25 & 1, t[r++] = a >>> 26 & 1, t[r++] = a >>> 27 & 1, t[r++] = a >>> 28 & 1, t[r++] = a >>> 29 & 1, t[r++] = a >>> 30 & 1, t[r++] = a >>> 31 & 1;
  }
}
function Io(n, e, t, i) {
  let r = i, s = e;
  for (let o = 0; o < 8; o++) {
    const a = n[s++] >>> 0, l = n[s++] >>> 0;
    t[r++] = a >>> 0 & 3, t[r++] = a >>> 2 & 3, t[r++] = a >>> 4 & 3, t[r++] = a >>> 6 & 3, t[r++] = a >>> 8 & 3, t[r++] = a >>> 10 & 3, t[r++] = a >>> 12 & 3, t[r++] = a >>> 14 & 3, t[r++] = a >>> 16 & 3, t[r++] = a >>> 18 & 3, t[r++] = a >>> 20 & 3, t[r++] = a >>> 22 & 3, t[r++] = a >>> 24 & 3, t[r++] = a >>> 26 & 3, t[r++] = a >>> 28 & 3, t[r++] = a >>> 30 & 3, t[r++] = l >>> 0 & 3, t[r++] = l >>> 2 & 3, t[r++] = l >>> 4 & 3, t[r++] = l >>> 6 & 3, t[r++] = l >>> 8 & 3, t[r++] = l >>> 10 & 3, t[r++] = l >>> 12 & 3, t[r++] = l >>> 14 & 3, t[r++] = l >>> 16 & 3, t[r++] = l >>> 18 & 3, t[r++] = l >>> 20 & 3, t[r++] = l >>> 22 & 3, t[r++] = l >>> 24 & 3, t[r++] = l >>> 26 & 3, t[r++] = l >>> 28 & 3, t[r++] = l >>> 30 & 3;
  }
}
function _o(n, e, t, i) {
  let r = i, s = e;
  for (let o = 0; o < 8; o++) {
    const a = n[s++] >>> 0, l = n[s++] >>> 0, c = n[s++] >>> 0;
    t[r++] = a >>> 0 & 7, t[r++] = a >>> 3 & 7, t[r++] = a >>> 6 & 7, t[r++] = a >>> 9 & 7, t[r++] = a >>> 12 & 7, t[r++] = a >>> 15 & 7, t[r++] = a >>> 18 & 7, t[r++] = a >>> 21 & 7, t[r++] = a >>> 24 & 7, t[r++] = a >>> 27 & 7, t[r++] = (a >>> 30 | (l & 1) << 2) & 7, t[r++] = l >>> 1 & 7, t[r++] = l >>> 4 & 7, t[r++] = l >>> 7 & 7, t[r++] = l >>> 10 & 7, t[r++] = l >>> 13 & 7, t[r++] = l >>> 16 & 7, t[r++] = l >>> 19 & 7, t[r++] = l >>> 22 & 7, t[r++] = l >>> 25 & 7, t[r++] = l >>> 28 & 7, t[r++] = (l >>> 31 | (c & 3) << 1) & 7, t[r++] = c >>> 2 & 7, t[r++] = c >>> 5 & 7, t[r++] = c >>> 8 & 7, t[r++] = c >>> 11 & 7, t[r++] = c >>> 14 & 7, t[r++] = c >>> 17 & 7, t[r++] = c >>> 20 & 7, t[r++] = c >>> 23 & 7, t[r++] = c >>> 26 & 7, t[r++] = c >>> 29 & 7;
  }
}
function So(n, e, t, i) {
  let r = i, s = e;
  for (let o = 0; o < 8; o++) {
    const a = n[s++] >>> 0, l = n[s++] >>> 0, c = n[s++] >>> 0, u = n[s++] >>> 0;
    t[r++] = a >>> 0 & 15, t[r++] = a >>> 4 & 15, t[r++] = a >>> 8 & 15, t[r++] = a >>> 12 & 15, t[r++] = a >>> 16 & 15, t[r++] = a >>> 20 & 15, t[r++] = a >>> 24 & 15, t[r++] = a >>> 28 & 15, t[r++] = l >>> 0 & 15, t[r++] = l >>> 4 & 15, t[r++] = l >>> 8 & 15, t[r++] = l >>> 12 & 15, t[r++] = l >>> 16 & 15, t[r++] = l >>> 20 & 15, t[r++] = l >>> 24 & 15, t[r++] = l >>> 28 & 15, t[r++] = c >>> 0 & 15, t[r++] = c >>> 4 & 15, t[r++] = c >>> 8 & 15, t[r++] = c >>> 12 & 15, t[r++] = c >>> 16 & 15, t[r++] = c >>> 20 & 15, t[r++] = c >>> 24 & 15, t[r++] = c >>> 28 & 15, t[r++] = u >>> 0 & 15, t[r++] = u >>> 4 & 15, t[r++] = u >>> 8 & 15, t[r++] = u >>> 12 & 15, t[r++] = u >>> 16 & 15, t[r++] = u >>> 20 & 15, t[r++] = u >>> 24 & 15, t[r++] = u >>> 28 & 15;
  }
}
function Lo(n, e, t, i) {
  let r = i, s = e;
  for (let o = 0; o < 8; o++) {
    const a = n[s++] >>> 0, l = n[s++] >>> 0, c = n[s++] >>> 0, u = n[s++] >>> 0, f = n[s++] >>> 0;
    t[r++] = a >>> 0 & 31, t[r++] = a >>> 5 & 31, t[r++] = a >>> 10 & 31, t[r++] = a >>> 15 & 31, t[r++] = a >>> 20 & 31, t[r++] = a >>> 25 & 31, t[r++] = (a >>> 30 | (l & 7) << 2) & 31, t[r++] = l >>> 3 & 31, t[r++] = l >>> 8 & 31, t[r++] = l >>> 13 & 31, t[r++] = l >>> 18 & 31, t[r++] = l >>> 23 & 31, t[r++] = (l >>> 28 | (c & 1) << 4) & 31, t[r++] = c >>> 1 & 31, t[r++] = c >>> 6 & 31, t[r++] = c >>> 11 & 31, t[r++] = c >>> 16 & 31, t[r++] = c >>> 21 & 31, t[r++] = c >>> 26 & 31, t[r++] = (c >>> 31 | (u & 15) << 1) & 31, t[r++] = u >>> 4 & 31, t[r++] = u >>> 9 & 31, t[r++] = u >>> 14 & 31, t[r++] = u >>> 19 & 31, t[r++] = u >>> 24 & 31, t[r++] = (u >>> 29 | (f & 3) << 3) & 31, t[r++] = f >>> 2 & 31, t[r++] = f >>> 7 & 31, t[r++] = f >>> 12 & 31, t[r++] = f >>> 17 & 31, t[r++] = f >>> 22 & 31, t[r++] = f >>> 27 & 31;
  }
}
function Eo(n, e, t, i) {
  let r = i, s = e;
  for (let o = 0; o < 8; o++) {
    const a = n[s++] >>> 0, l = n[s++] >>> 0, c = n[s++] >>> 0, u = n[s++] >>> 0, f = n[s++] >>> 0, h = n[s++] >>> 0;
    t[r++] = a >>> 0 & 63, t[r++] = a >>> 6 & 63, t[r++] = a >>> 12 & 63, t[r++] = a >>> 18 & 63, t[r++] = a >>> 24 & 63, t[r++] = (a >>> 30 | (l & 15) << 2) & 63, t[r++] = l >>> 4 & 63, t[r++] = l >>> 10 & 63, t[r++] = l >>> 16 & 63, t[r++] = l >>> 22 & 63, t[r++] = (l >>> 28 | (c & 3) << 4) & 63, t[r++] = c >>> 2 & 63, t[r++] = c >>> 8 & 63, t[r++] = c >>> 14 & 63, t[r++] = c >>> 20 & 63, t[r++] = c >>> 26 & 63, t[r++] = u >>> 0 & 63, t[r++] = u >>> 6 & 63, t[r++] = u >>> 12 & 63, t[r++] = u >>> 18 & 63, t[r++] = u >>> 24 & 63, t[r++] = (u >>> 30 | (f & 15) << 2) & 63, t[r++] = f >>> 4 & 63, t[r++] = f >>> 10 & 63, t[r++] = f >>> 16 & 63, t[r++] = f >>> 22 & 63, t[r++] = (f >>> 28 | (h & 3) << 4) & 63, t[r++] = h >>> 2 & 63, t[r++] = h >>> 8 & 63, t[r++] = h >>> 14 & 63, t[r++] = h >>> 20 & 63, t[r++] = h >>> 26 & 63;
  }
}
function ko(n, e, t, i) {
  let r = i, s = e;
  for (let o = 0; o < 8; o++) {
    const a = n[s++] >>> 0, l = n[s++] >>> 0, c = n[s++] >>> 0, u = n[s++] >>> 0, f = n[s++] >>> 0, h = n[s++] >>> 0, p = n[s++] >>> 0;
    t[r++] = a >>> 0 & 127, t[r++] = a >>> 7 & 127, t[r++] = a >>> 14 & 127, t[r++] = a >>> 21 & 127, t[r++] = (a >>> 28 | (l & 7) << 4) & 127, t[r++] = l >>> 3 & 127, t[r++] = l >>> 10 & 127, t[r++] = l >>> 17 & 127, t[r++] = l >>> 24 & 127, t[r++] = (l >>> 31 | (c & 63) << 1) & 127, t[r++] = c >>> 6 & 127, t[r++] = c >>> 13 & 127, t[r++] = c >>> 20 & 127, t[r++] = (c >>> 27 | (u & 3) << 5) & 127, t[r++] = u >>> 2 & 127, t[r++] = u >>> 9 & 127, t[r++] = u >>> 16 & 127, t[r++] = u >>> 23 & 127, t[r++] = (u >>> 30 | (f & 31) << 2) & 127, t[r++] = f >>> 5 & 127, t[r++] = f >>> 12 & 127, t[r++] = f >>> 19 & 127, t[r++] = (f >>> 26 | (h & 1) << 6) & 127, t[r++] = h >>> 1 & 127, t[r++] = h >>> 8 & 127, t[r++] = h >>> 15 & 127, t[r++] = h >>> 22 & 127, t[r++] = (h >>> 29 | (p & 15) << 3) & 127, t[r++] = p >>> 4 & 127, t[r++] = p >>> 11 & 127, t[r++] = p >>> 18 & 127, t[r++] = p >>> 25 & 127;
  }
}
function Fo(n, e, t, i) {
  let r = i, s = e;
  for (let o = 0; o < 8; o++) {
    const a = n[s++] >>> 0, l = n[s++] >>> 0, c = n[s++] >>> 0, u = n[s++] >>> 0, f = n[s++] >>> 0, h = n[s++] >>> 0, p = n[s++] >>> 0, d = n[s++] >>> 0;
    t[r++] = a >>> 0 & 255, t[r++] = a >>> 8 & 255, t[r++] = a >>> 16 & 255, t[r++] = a >>> 24 & 255, t[r++] = l >>> 0 & 255, t[r++] = l >>> 8 & 255, t[r++] = l >>> 16 & 255, t[r++] = l >>> 24 & 255, t[r++] = c >>> 0 & 255, t[r++] = c >>> 8 & 255, t[r++] = c >>> 16 & 255, t[r++] = c >>> 24 & 255, t[r++] = u >>> 0 & 255, t[r++] = u >>> 8 & 255, t[r++] = u >>> 16 & 255, t[r++] = u >>> 24 & 255, t[r++] = f >>> 0 & 255, t[r++] = f >>> 8 & 255, t[r++] = f >>> 16 & 255, t[r++] = f >>> 24 & 255, t[r++] = h >>> 0 & 255, t[r++] = h >>> 8 & 255, t[r++] = h >>> 16 & 255, t[r++] = h >>> 24 & 255, t[r++] = p >>> 0 & 255, t[r++] = p >>> 8 & 255, t[r++] = p >>> 16 & 255, t[r++] = p >>> 24 & 255, t[r++] = d >>> 0 & 255, t[r++] = d >>> 8 & 255, t[r++] = d >>> 16 & 255, t[r++] = d >>> 24 & 255;
  }
}
function Ao(n, e, t, i) {
  let r = i, s = e;
  for (let o = 0; o < 128; o++) {
    const a = n[s++] >>> 0;
    t[r++] = a & 65535, t[r++] = a >>> 16 & 65535;
  }
}
function zo(n, e, t, i, r) {
  const s = Un[r] >>> 0;
  let o = e, a = 0, l = n[o] >>> 0, c = i;
  for (let u = 0; u < 8; u++) {
    for (let f = 0; f < 32; f++)
      if (a + r <= 32) {
        const h = l >>> a & s;
        t[c + f] = h | 0, a += r, a === 32 && (a = 0, o++, f !== 31 && (l = n[o] >>> 0));
      } else {
        const h = 32 - a, p = l >>> a;
        o++, l = n[o] >>> 0;
        const d = r - h, y = -1 >>> 32 - d >>> 0, m = l & y, x = (p | m << h) & s;
        t[c + f] = x | 0, a = d;
      }
    c += 32, a = 0, u < 7 && (l = n[o] >>> 0);
  }
}
const Me = 32, Cn = Me + 1, Gn = lo(Ji), Oo = 3 * Gn / ce + Gn | 0;
function Ki() {
  const n = new Uint8Array(Oo);
  return {
    dataToBePacked: new Array(Cn),
    dataPointers: new Int32Array(Cn),
    byteContainer: n,
    byteContainerI32: new Int32Array(n.buffer, n.byteOffset, n.byteLength >>> 2),
    exceptionSizes: new Int32Array(Cn)
  };
}
function Mo(n = 16) {
  if (n < 0)
    throw new RangeError(`initialEncodedWordCapacity must be >= 0, got ${n}`);
  const e = Math.max(16, n | 0);
  return {
    encodedWords: new Uint32Array(e),
    decoderWorkspace: Ki()
  };
}
function Do(n, e) {
  if (e <= n.encodedWords.length)
    return n.encodedWords;
  const t = new Uint32Array(Math.max(16, e * 2));
  return n.encodedWords = t, t;
}
function No(n, e, t, i) {
  i.byteContainer.length < t && (i.byteContainer = new Uint8Array(t * 2), i.byteContainerI32 = void 0);
  const r = i.byteContainer, s = t >>> 2;
  if ((r.byteOffset & 3) === 0) {
    let a = i.byteContainerI32;
    (!a || a.buffer !== r.buffer || a.byteOffset !== r.byteOffset || a.length < s) && (a = i.byteContainerI32 = new Int32Array(r.buffer, r.byteOffset, r.byteLength >>> 2)), a.set(n.subarray(e, e + s));
  } else
    for (let a = 0; a < s; a = a + 1 | 0) {
      const l = n[e + a | 0] | 0, c = a << 2;
      r[c] = l & 255, r[c + 1 | 0] = l >>> 8 & 255, r[c + 2 | 0] = l >>> 16 & 255, r[c + 3 | 0] = l >>> 24 & 255;
    }
  const o = t & 3;
  if (o > 0) {
    const a = e + s | 0, l = n[a] | 0, c = s << 2;
    for (let u = 0; u < o; u = u + 1 | 0)
      r[c + u | 0] = l >>> (u << 3) & 255;
  }
  return r;
}
function Po(n, e, t) {
  const i = n[e++] | 0, r = t.dataToBePacked;
  for (let s = 2; s <= Me; s = s + 1 | 0) {
    if ((i >>> s - 1 & 1) === 0)
      continue;
    if (e >= n.length)
      throw new Error(`FastPFOR decode: truncated exception stream header (bitWidth=${s}, streamWordIndex=${e}, needWords=1, availableWords=${n.length - e}, encodedWords=${n.length})`);
    const o = n[e++] >>> 0, a = ao(o), l = o * s + 31 >>> 5;
    if (e + l > n.length)
      throw new Error(`FastPFOR decode: truncated exception stream (bitWidth=${s}, size=${o}, streamWordIndex=${e}, needWords=${l}, availableWords=${n.length - e}, encodedWords=${n.length})`);
    let c = r[s];
    (!c || c.length < a) && (c = r[s] = new Uint32Array(a));
    let u = 0;
    for (; u < o; u = u + 32 | 0)
      Wo(n, e, c, u, s), e = e + s | 0;
    const f = u - o | 0;
    e = e - (f * s >>> 5) | 0, t.exceptionSizes[s] = o;
  }
  return e;
}
function Bo(n, e, t, i, r) {
  switch (r) {
    case 1:
      To(n, e, t, i);
      break;
    case 2:
      Io(n, e, t, i);
      break;
    case 3:
      _o(n, e, t, i);
      break;
    case 4:
      So(n, e, t, i);
      break;
    case 5:
      Lo(n, e, t, i);
      break;
    case 6:
      Eo(n, e, t, i);
      break;
    case 7:
      ko(n, e, t, i);
      break;
    case 8:
      Fo(n, e, t, i);
      break;
    case 16:
      Ao(n, e, t, i);
      break;
    default:
      zo(n, e, t, i, r);
      break;
  }
  return e + (r << 3) | 0;
}
function Ro(n, e, t, i) {
  if (t + 2 > e)
    throw new Error(`FastPFOR decode: byteContainer underflow at block=${i} (need 2 bytes for [bitWidth, exceptionCount], bytePos=${t}, byteSize=${e})`);
  const r = n[t++], s = n[t++];
  if (r > Me)
    throw new Error(`FastPFOR decode: invalid bitWidth=${r} at block=${i} (expected 0..${Me}). This likely indicates corrupted or truncated input.`);
  return { bitWidth: r, exceptionCount: s, bytePosIn: t };
}
function $o(n, e, t, i, r, s) {
  if (t + 1 > e)
    throw new Error(`FastPFOR decode: exception header underflow at block=${s} (need 1 byte for maxBits, bytePos=${t}, byteSize=${e})`);
  const o = n[t++];
  if (o < i || o > Me)
    throw new Error(`FastPFOR decode: invalid maxBits=${o} at block=${s} (bitWidth=${i}, expected ${i}..${Me})`);
  const a = o - i | 0;
  if (a < 1 || a > Me)
    throw new Error(`FastPFOR decode: invalid exceptionBitWidth=${a} at block=${s} (bitWidth=${i}, maxBits=${o})`);
  if (t + r > e)
    throw new Error(`FastPFOR decode: exception positions underflow at block=${s} (need=${r}, have=${e - t})`);
  return { maxBits: o, exceptionBitWidth: a, bytePosIn: t };
}
function Vo(n, e, t, i, r, s, o, a, l) {
  const { maxBits: c, exceptionBitWidth: u, bytePosIn: f } = $o(r, s, o, t, i, l);
  if (o = f, u === 1) {
    const m = 1 << t;
    for (let x = 0; x < i; x = x + 1 | 0) {
      const w = r[o++];
      n[w + e | 0] |= m;
    }
    return o;
  }
  const h = a.dataToBePacked[u];
  if (!h)
    throw new Error(`FastPFOR decode: missing exception stream for exceptionBitWidth=${u} (bitWidth=${t}, maxBits=${c}) at block ${l}`);
  const p = a.dataPointers;
  let d = p[u] | 0;
  const y = a.exceptionSizes[u] | 0;
  if (d + i > y)
    throw new Error(`FastPFOR decode: exception stream overflow for exceptionBitWidth=${u} (ptr=${d}, need ${i}, size=${y}) at block ${l}`);
  for (let m = 0; m < i; m = m + 1 | 0) {
    const x = r[o++], w = h[d++] | 0;
    n[x + e | 0] |= w << t;
  }
  return p[u] = d, o;
}
function Uo(n, e, t, i, r, s, o, a, l, c) {
  let u = t | 0, f = 0;
  for (let h = 0; h < o; h = h + 1 | 0) {
    const p = Ro(a, l, f, h);
    f = p.bytePosIn;
    const d = p.bitWidth, y = p.exceptionCount, m = s + h * ce | 0;
    switch (d) {
      case 0:
        r.fill(0, m, m + ce);
        break;
      case 32:
        for (let x = 0; x < ce; x = x + 1 | 0)
          r[m + x | 0] = n[u + x | 0] | 0;
        u = u + ce | 0;
        break;
      default:
        u = Bo(n, u, r, m, d);
        break;
    }
    y > 0 && (f = Vo(r, m, d, y, a, l, f, c, h));
  }
  if (u !== i)
    throw new Error(`FastPFOR decode: packed region mismatch (pageStart=${e}, packedStart=${t}, consumedPackedEnd=${u}, expectedPackedEnd=${i}, packedWords=${i - t}, encoded.length=${n.length})`);
}
function Go(n, e, t, i, r, s) {
  const o = t | 0, a = n[o] | 0;
  if (a <= 0 || o + a > n.length - 1)
    throw new Error(`FastPFOR decode: invalid whereMeta=${a} at pageStart=${o} (expected > 0 and pageStart+whereMeta < encoded.length=${n.length})`);
  const l = o + 1 | 0, c = o + a | 0, u = n[c] >>> 0, f = u + 3 >>> 2, h = c + 1, p = h + f;
  if (p >= n.length)
    throw new Error(`FastPFOR decode: invalid byteSize=${u} (metaInts=${f}, pageStart=${o}, packedEnd=${c}, byteContainerStart=${h}) causes bitmapPos=${p} out of bounds (encoded.length=${n.length})`);
  const d = No(n, h, u, s), y = u, m = Po(n, p, s);
  s.dataPointers.fill(0);
  const w = i | 0, v = r / ce | 0;
  return Uo(n, o, l, c, e, w, v, d, y, s), m;
}
function qo(n, e, t, i, r, s) {
  const o = pr(r, ce), a = i + o;
  let l = i, c = t;
  for (; l !== a; ) {
    const u = Math.min(Gn, a - l);
    c = Go(n, e, c, l, u, s), l = l + u | 0;
  }
  return c;
}
function jo(n, e, t, i, r, s) {
  if (s === 0)
    return e;
  let o = 0, a = e;
  const l = e + t, c = r;
  let u = r;
  const f = r + s;
  let h = 0, p = 0;
  for (; a < l && u < f; ) {
    const y = n[a] >>> o & 255;
    if (o += 8, a += o >>> 5, o &= 31, h |= (y & 127) << p, (y & 128) !== 0)
      i[u++] = h | 0, h = 0, p = 0;
    else if (p += 7, p > 28)
      throw new Error(`FastPFOR VByte: unterminated value (expected MSB=1 terminator within 5 bytes; shift=${p}, partial=${h}, decoded=${u - c}/${s}, inPos=${a}, inEnd=${l})`);
  }
  if (u !== f)
    throw new Error(`FastPFOR VByte: truncated stream (decoded=${u - c}, expected=${s}, consumedWords=${a - e}/${t}, vbyteStart=${e}, vbyteEnd=${l})`);
  return a;
}
function Zo(n, e, t) {
  let i = 0, r = 0;
  const s = new Uint32Array(e), o = t ?? Ki();
  if (n.length > 0) {
    const c = n[i] | 0;
    if (i = i + 1 | 0, (c & ce - 1) !== 0)
      throw new Error(`FastPFOR decode: invalid alignedLength=${c} (expected multiple of ${ce})`);
    if (r + c > s.length)
      throw new Error(`FastPFOR decode: output buffer too small (outPos=${r}, alignedLength=${c}, out.length=${s.length})`);
    i = qo(n, s, i, r, c, o), r = r + c | 0;
  }
  const a = n.length - i | 0, l = e - r | 0;
  return jo(n, i, a, s, r, l), s;
}
function Wo(n, e, t, i, r) {
  switch (r) {
    case 2:
      uo(n, e, t, i);
      return;
    case 3:
      fo(n, e, t, i);
      return;
    case 4:
      ho(n, e, t, i);
      return;
    case 5:
      po(n, e, t, i);
      return;
    case 6:
      yo(n, e, t, i);
      return;
    case 7:
      mo(n, e, t, i);
      return;
    case 8:
      go(n, e, t, i);
      return;
    case 9:
      xo(n, e, t, i);
      return;
    case 10:
      vo(n, e, t, i);
      return;
    case 11:
      bo(n, e, t, i);
      return;
    case 12:
      wo(n, e, t, i);
      return;
    case 16:
      Co(n, e, t, i);
      return;
    case 32:
      for (let c = 0; c < 32; c = c + 1 | 0)
        t[i + c | 0] = n[e + c | 0] | 0;
      return;
  }
  const s = Un[r] >>> 0;
  let o = e, a = 0, l = n[o] >>> 0;
  for (let c = 0; c < 32; c++)
    if (a + r <= 32) {
      const u = l >>> a & s;
      t[i + c] = u | 0, a += r, a === 32 && (a = 0, o++, c !== 31 && (l = n[o] >>> 0));
    } else {
      const u = 32 - a, f = l >>> a;
      o++, l = n[o] >>> 0;
      const h = Un[r - u] >>> 0, p = l & h, d = (f | p << u) & s;
      t[i + c] = d | 0, a = r - u;
    }
}
function Xo(n, e, t, i) {
  if (e < 0 || t < 0 || e + t > n.length)
    throw new RangeError(`decodeBigEndianInt32sInto: out of bounds (offset=${e}, byteLength=${t}, bytes.length=${n.length})`);
  const r = Math.floor(t / 4), s = t % 4 !== 0, o = s ? r + 1 : r;
  if (i.length < o)
    throw new RangeError(`decodeBigEndianInt32sInto: out.length=${i.length} < ${o}`);
  if (r > 0) {
    const a = n.byteOffset + e;
    if ((a & 3) === 0) {
      const l = new Uint32Array(n.buffer, a, r);
      for (let c = 0; c < r; c++)
        i[c] = co(l[c]) | 0;
    } else
      for (let l = 0; l < r; l++) {
        const c = e + l * 4;
        i[l] = n[c] << 24 | n[c + 1] << 16 | n[c + 2] << 8 | n[c + 3] | 0;
      }
  }
  if (s) {
    const a = e + r * 4, l = t - r * 4;
    let c = 0;
    for (let u = 0; u < l; u++)
      c |= n[a + u] << 24 - u * 8;
    i[r] = c | 0;
  }
  return o;
}
function Z(n, e, t) {
  const i = new Uint32Array(t);
  let r = 0, s = e.get();
  for (let o = 0; o < i.length; o++) {
    let a = n[s++], l = a & 127;
    if (a < 128) {
      i[r++] = l;
      continue;
    }
    if (a = n[s++], l |= (a & 127) << 7, a < 128) {
      i[r++] = l;
      continue;
    }
    if (a = n[s++], l |= (a & 127) << 14, a < 128) {
      i[r++] = l;
      continue;
    }
    if (a = n[s++], l |= (a & 127) << 21, a < 128) {
      i[r++] = l;
      continue;
    }
    a = n[s++], l |= (a & 15) << 28, i[r++] = l;
  }
  return e.set(s), i;
}
function rt(n, e, t) {
  const i = new BigUint64Array(t);
  for (let r = 0; r < i.length; r++)
    i[r] = Yo(n, e);
  return i;
}
function Yo(n, e) {
  let t = 0n, i = 0, r = e.get();
  for (; r < n.length; ) {
    const s = n[r++];
    if (t |= BigInt(s & 127) << BigInt(i), (s & 128) === 0)
      break;
    if (i += 7, i >= 64)
      throw new Error("Varint too long");
  }
  return e.set(r), t;
}
function Ho(n, e, t) {
  const i = new Float64Array(t);
  for (let r = 0; r < t; r++)
    i[r] = Jo(n, e);
  return i;
}
function Jo(n, e) {
  let t, i;
  return i = n[e.get()], e.increment(), t = i & 127, i < 128 || (i = n[e.get()], e.increment(), t |= (i & 127) << 7, i < 128) || (i = n[e.get()], e.increment(), t |= (i & 127) << 14, i < 128) || (i = n[e.get()], e.increment(), t |= (i & 127) << 21, i < 128) ? t : (i = n[e.get()], t |= (i & 15) << 28, Ko(t, n, e));
}
function Ko(n, e, t) {
  let i, r;
  if (r = e[t.get()], t.increment(), i = (r & 112) >> 4, r < 128 || (r = e[t.get()], t.increment(), i |= (r & 127) << 3, r < 128) || (r = e[t.get()], t.increment(), i |= (r & 127) << 10, r < 128) || (r = e[t.get()], t.increment(), i |= (r & 127) << 17, r < 128) || (r = e[t.get()], t.increment(), i |= (r & 127) << 24, r < 128) || (r = e[t.get()], t.increment(), i |= (r & 1) << 31, r < 128))
    return i * 4294967296 + (n >>> 0);
  throw new Error("Expected varint not more than 10 bytes");
}
function Qo(n, e, t, i) {
  const r = Mo(t >>> 2);
  return ea(n, e, t, i, r);
}
function ea(n, e, t, i, r) {
  const s = i.get();
  if ((t & 3) !== 0)
    throw new Error(`FastPFOR: invalid encodedByteLength=${t} at offset=${s} (encodedBytes.length=${n.length}; expected a multiple of 4 bytes for an int32 big-endian word stream)`);
  const o = t >>> 2, a = Do(r, o);
  Xo(n, s, t, a);
  const l = Zo(a.subarray(0, o), e, r.decoderWorkspace);
  return i.add(t), l;
}
function O(n) {
  return n >>> 1 ^ -(n & 1);
}
function X(n) {
  return n >> 1n ^ -(n & 1n);
}
function Ae(n) {
  return n % 2 === 1 ? (n + 1) / -2 : n / 2;
}
function ta(n) {
  const e = new Int32Array(n.length);
  for (let t = 0; t < n.length; t++)
    e[t] = O(n[t]);
  return e;
}
function na(n) {
  const e = new BigInt64Array(n.length);
  for (let t = 0; t < n.length; t++)
    e[t] = X(n[t]);
  return e;
}
function qn(n, e, t) {
  if (t === void 0) {
    t = 0;
    for (let s = 0; s < e; s++)
      t += n[s];
  }
  const i = new Uint32Array(t);
  let r = 0;
  for (let s = 0; s < e; s++) {
    const o = n[s], a = n[s + e];
    i.fill(a, r, r + o), r += o;
  }
  return i;
}
function jn(n, e, t) {
  if (t === void 0) {
    t = 0;
    for (let s = 0; s < e; s++)
      t += Number(n[s]);
  }
  const i = new BigUint64Array(t);
  let r = 0;
  for (let s = 0; s < e; s++) {
    const o = Number(n[s]), a = n[s + e];
    i.fill(a, r, r + o), r += o;
  }
  return i;
}
function Qi(n, e, t) {
  const i = new Float64Array(t);
  let r = 0;
  for (let s = 0; s < e; s++) {
    const o = n[s], a = n[s + e];
    i.fill(a, r, r + o), r += o;
  }
  return i;
}
function Zr(n) {
  const e = new Int32Array(n.length);
  e[0] = O(n[0]);
  const t = n.length / 4 * 4;
  let i = 1;
  if (t >= 4)
    for (; i < t - 4; i += 4) {
      const r = n[i], s = n[i + 1], o = n[i + 2], a = n[i + 3];
      e[i] = O(r) + e[i - 1], e[i + 1] = O(s) + e[i], e[i + 2] = O(o) + e[i + 1], e[i + 3] = O(a) + e[i + 2];
    }
  for (; i !== n.length; ++i)
    e[i] = O(n[i]) + e[i - 1];
  return e;
}
function Wr(n) {
  const e = new BigInt64Array(n.length);
  e[0] = X(n[0]);
  const t = n.length / 4 * 4;
  let i = 1;
  if (t >= 4)
    for (; i < t - 4; i += 4) {
      const r = n[i], s = n[i + 1], o = n[i + 2], a = n[i + 3];
      e[i] = X(r) + e[i - 1], e[i + 1] = X(s) + e[i], e[i + 2] = X(o) + e[i + 1], e[i + 3] = X(a) + e[i + 2];
    }
  for (; i !== e.length; ++i)
    e[i] = X(n[i]) + e[i - 1];
  return e;
}
function ra(n) {
  n[0] = Ae(n[0]);
  const e = n.length / 4 * 4;
  let t = 1;
  if (e >= 4)
    for (; t < e - 4; t += 4) {
      const i = n[t], r = n[t + 1], s = n[t + 2], o = n[t + 3];
      n[t] = Ae(i) + n[t - 1], n[t + 1] = Ae(r) + n[t], n[t + 2] = Ae(s) + n[t + 1], n[t + 3] = Ae(o) + n[t + 2];
    }
  for (; t !== n.length; ++t)
    n[t] = Ae(n[t]) + n[t - 1];
}
function ia(n, e, t) {
  if (t === void 0) {
    t = 0;
    for (let s = 0; s < e; s++)
      t += n[s];
  }
  const i = new Int32Array(t);
  let r = 0;
  for (let s = 0; s < e; s++) {
    const o = n[s];
    let a = n[s + e];
    a = O(a), i.fill(a, r, r + o), r += o;
  }
  return i;
}
function sa(n, e, t) {
  if (t === void 0) {
    t = 0;
    for (let s = 0; s < e; s++)
      t += Number(n[s]);
  }
  const i = new BigInt64Array(t);
  let r = 0;
  for (let s = 0; s < e; s++) {
    const o = Number(n[s]);
    let a = n[s + e];
    a = X(a), i.fill(a, r, r + o), r += o;
  }
  return i;
}
function oa(n, e, t) {
  const i = new Float64Array(t);
  let r = 0;
  for (let s = 0; s < e; s++) {
    const o = n[s];
    let a = n[s + e];
    a = Ae(a), i.fill(a, r, r + o), r += o;
  }
  return i;
}
function dr(n) {
  const e = n.length / 4 * 4;
  let t = 1;
  if (e >= 4)
    for (let i = n[0]; t < e - 4; t += 4)
      i = n[t] += i, i = n[t + 1] += i, i = n[t + 2] += i, i = n[t + 3] += i;
  for (; t !== n.length; )
    n[t] += n[t - 1], ++t;
}
function aa(n) {
  let e = 0;
  for (let t = 0; t < n.length; t++)
    n[t] += e, e = n[t];
}
function la(n) {
  if (n.length < 2)
    return new Int32Array(n);
  const e = new Int32Array(n.length);
  e[0] = O(n[0]), e[1] = O(n[1]);
  const t = n.length / 4 * 4;
  let i = 2;
  if (t >= 4)
    for (; i < t - 4; i += 4) {
      const r = n[i], s = n[i + 1], o = n[i + 2], a = n[i + 3];
      e[i] = O(r) + e[i - 2], e[i + 1] = O(s) + e[i - 1], e[i + 2] = O(o) + e[i], e[i + 3] = O(a) + e[i + 1];
    }
  for (; i !== n.length; i += 2)
    e[i] = O(n[i]) + e[i - 2], e[i + 1] = O(n[i + 1]) + e[i - 1];
  return e;
}
function ca(n) {
  const e = new Int32Array(n.length + 1);
  e[0] = 0, e[1] = O(n[0]);
  let t = e[1];
  for (let i = 2; i !== e.length; ++i) {
    const r = n[i - 1], s = O(r);
    t += s, e[i] = e[i - 1] + t;
  }
  return new Uint32Array(e);
}
function ua(n, e, t) {
  const i = new Int32Array(t + 1);
  i[0] = 0;
  let r = 1, s = i[0];
  for (let o = 0; o < e; o++) {
    const a = n[o];
    let l = n[o + e];
    l = O(l);
    for (let c = r; c < r + a; c++)
      i[c] = l + s, s = i[c];
    r += a;
  }
  return i;
}
function fa(n, e, t) {
  const i = new Uint32Array(t + 1);
  i[0] = 0;
  let r = 1, s = i[0];
  for (let o = 0; o < e; o++) {
    const a = n[o], l = n[o + e];
    for (let c = r; c < r + a; c++)
      i[c] = l + s, s = i[c];
    r += a;
  }
  return i;
}
function ha(n, e, t) {
  const i = new Int32Array(t);
  let r = 0, s = 0;
  for (let o = 0; o < e; o++) {
    const a = n[o], l = n[o + e], c = O(l);
    for (let u = 0; u < a; u++)
      s += c, i[r++] = s;
  }
  return i;
}
function pa(n, e, t) {
  const i = new BigInt64Array(t);
  let r = 0, s = 0n;
  for (let o = 0; o < e; o++) {
    const a = Number(n[o]), l = n[o + e], c = X(l);
    for (let u = 0; u < a; u++)
      s += c, i[r++] = s;
  }
  return i;
}
function Xr(n) {
  const e = new Uint32Array(n.length);
  e[0] = O(n[0]) >>> 0;
  for (let t = 1; t < n.length; t++)
    e[t] = e[t - 1] + O(n[t]) >>> 0;
  return e;
}
function Yr(n) {
  const e = new BigUint64Array(n.length);
  e[0] = BigInt.asUintN(64, X(n[0]));
  for (let t = 1; t < n.length; t++)
    e[t] = BigInt.asUintN(64, e[t - 1] + X(n[t]));
  return e;
}
function da(n) {
  if (n.length < 2)
    return new Uint32Array(n);
  const e = new Uint32Array(n.length);
  e[0] = O(n[0]) >>> 0, e[1] = O(n[1]) >>> 0;
  for (let t = 2; t < n.length; t += 2)
    e[t] = e[t - 2] + O(n[t]) >>> 0, e[t + 1] = e[t - 1] + O(n[t + 1]) >>> 0;
  return e;
}
function ya(n) {
  return n[1];
}
function ma(n) {
  return O(n[1]);
}
function ga(n) {
  if (n.length === 2) {
    const i = O(n[1]);
    return [i, i];
  }
  const e = O(n[2]), t = O(n[3]);
  return [e, t];
}
function xa(n) {
  return n[1];
}
function va(n) {
  return X(n[1]);
}
function ba(n) {
  if (n.length === 2) {
    const i = X(n[1]);
    return [i, i];
  }
  const e = X(n[2]), t = X(n[3]);
  return [e, t];
}
var j;
(function(n) {
  n.PRESENT = "PRESENT", n.DATA = "DATA", n.OFFSET = "OFFSET", n.LENGTH = "LENGTH";
})(j || (j = {}));
var ue;
(function(n) {
  n.NONE = "NONE", n.SINGLE = "SINGLE", n.SHARED = "SHARED", n.VERTEX = "VERTEX", n.MORTON = "MORTON", n.FSST = "FSST";
})(ue || (ue = {}));
var ze;
(function(n) {
  n.VERTEX = "VERTEX", n.INDEX = "INDEX", n.STRING = "STRING", n.KEY = "KEY";
})(ze || (ze = {}));
var ne;
(function(n) {
  n.VAR_BINARY = "VAR_BINARY", n.GEOMETRIES = "GEOMETRIES", n.PARTS = "PARTS", n.RINGS = "RINGS", n.TRIANGLES = "TRIANGLES", n.SYMBOL = "SYMBOL", n.DICTIONARY = "DICTIONARY";
})(ne || (ne = {}));
function Y(n, e) {
  const t = Ta(n, e);
  return t.logicalLevelTechnique1 === F.MORTON ? wa(t, n, e) : (F.RLE === t.logicalLevelTechnique1 || F.RLE === t.logicalLevelTechnique2) && Se.NONE !== t.physicalLevelTechnique ? Ca(t, n, e) : t;
}
function wa(n, e, t) {
  const i = Z(e, t, 2);
  return {
    physicalStreamType: n.physicalStreamType,
    logicalStreamType: n.logicalStreamType,
    logicalLevelTechnique1: n.logicalLevelTechnique1,
    logicalLevelTechnique2: n.logicalLevelTechnique2,
    physicalLevelTechnique: n.physicalLevelTechnique,
    numValues: n.numValues,
    byteLength: n.byteLength,
    decompressedCount: n.decompressedCount,
    numBits: i[0],
    coordinateShift: i[1]
  };
}
function Ca(n, e, t) {
  const i = Z(e, t, 2);
  return {
    physicalStreamType: n.physicalStreamType,
    logicalStreamType: n.logicalStreamType,
    logicalLevelTechnique1: n.logicalLevelTechnique1,
    logicalLevelTechnique2: n.logicalLevelTechnique2,
    physicalLevelTechnique: n.physicalLevelTechnique,
    numValues: n.numValues,
    byteLength: n.byteLength,
    decompressedCount: i[1],
    runs: i[0],
    numRleValues: i[1]
  };
}
function Ta(n, e) {
  const t = n[e.get()], i = Object.values(j)[t >> 4];
  let r = null;
  switch (i) {
    case j.DATA:
      r = {
        dictionaryType: Object.values(ue)[t & 15]
      };
      break;
    case j.OFFSET:
      r = {
        offsetType: Object.values(ze)[t & 15]
      };
      break;
    case j.LENGTH:
      r = {
        lengthType: Object.values(ne)[t & 15]
      };
      break;
  }
  e.increment();
  const s = n[e.get()], o = Object.values(F)[s >> 5], a = Object.values(F)[s >> 2 & 7], l = Object.values(Se)[s & 3];
  e.increment();
  const c = Z(n, e, 2), u = c[0], f = c[1];
  return {
    physicalStreamType: i,
    logicalStreamType: r,
    logicalLevelTechnique1: o,
    logicalLevelTechnique2: a,
    physicalLevelTechnique: l,
    numValues: u,
    byteLength: f,
    decompressedCount: u
  };
}
var M;
(function(n) {
  n[n.FLAT = 0] = "FLAT", n[n.CONST = 1] = "CONST", n[n.SEQUENCE = 2] = "SEQUENCE", n[n.DICTIONARY = 3] = "DICTIONARY", n[n.FSST_DICTIONARY = 4] = "FSST_DICTIONARY";
})(M || (M = {}));
class ve {
  /**
   * @param values The byte buffer containing the bit values in least-significant bit (LSB)
   *     numbering
   */
  constructor(e, t) {
    this.values = e, this._size = t;
  }
  get(e) {
    const t = Math.floor(e / 8), i = e % 8;
    return (this.values[t] >> i & 1) === 1;
  }
  set(e, t) {
    const i = Math.floor(e / 8), r = e % 8;
    this.values[i] = this.values[i] | (t ? 1 : 0) << r;
  }
  getInt(e) {
    const t = Math.floor(e / 8), i = e % 8;
    return this.values[t] >> i & 1;
  }
  size() {
    return this._size;
  }
  getBuffer() {
    return this.values;
  }
}
function it(n, e, t) {
  if (!e)
    return n;
  const i = e.size(), r = n.constructor, s = new r(i);
  let o = 0;
  for (let a = 0; a < i; a++)
    s[a] = e.get(a) ? n[o++] : t;
  return s;
}
function Ia(n, e, t) {
  if (!t)
    return n;
  const i = t.size(), r = new ve(n, e), s = new ve(new Uint8Array(Math.ceil(i / 8)), i);
  let o = 0;
  for (let a = 0; a < i; a++) {
    const l = t.get(a) ? r.get(o++) : !1;
    s.set(a, l);
  }
  return s.getBuffer();
}
function Zn(n, e, t, i, r) {
  const s = st(n, e, t);
  return ka(s, t, i, r);
}
function te(n, e, t, i, r) {
  const s = st(n, e, t);
  return Fa(s, t, i, r);
}
function Ie(n, e, t) {
  const i = st(n, e, t);
  return Ma(i, t);
}
function st(n, e, t) {
  const i = t.physicalLevelTechnique;
  switch (i) {
    case Se.FAST_PFOR:
      return Qo(n, t.numValues, t.byteLength, e);
    case Se.VARINT:
      return Z(n, e, t.numValues);
    case Se.NONE: {
      const r = e.get(), s = t.byteLength;
      e.add(s);
      const o = n.subarray(r, e.get());
      return new Uint32Array(o);
    }
    default:
      throw new Error(`Specified physicalLevelTechnique ${i} is not supported (yet).`);
  }
}
function _a(n, e, t) {
  const i = st(n, e, t);
  return i.length === 1 ? O(i[0]) : ma(i);
}
function yr(n, e, t) {
  const i = st(n, e, t);
  return i.length === 1 ? i[0] : ya(i);
}
function es(n, e, t) {
  const i = st(n, e, t);
  return ga(i);
}
function ts(n, e, t) {
  const i = rt(n, e, t.numValues);
  return ba(i);
}
function Sa(n, e, t, i) {
  const r = rt(n, e, t.numValues);
  return Aa(r, t, i);
}
function ns(n, e, t, i) {
  const r = rt(n, e, t.numValues);
  return za(r, t, i);
}
function La(n, e, t) {
  const i = Ho(n, e, t.numValues);
  return Oa(i, t, !1);
}
function Ea(n, e, t) {
  const i = rt(n, e, t.numValues);
  return i.length === 1 ? X(i[0]) : va(i);
}
function rs(n, e, t) {
  const i = rt(n, e, t.numValues);
  return i.length === 1 ? i[0] : xa(i);
}
function ka(n, e, t, i) {
  let r;
  switch (e.logicalLevelTechnique1) {
    case F.DELTA:
      if (e.logicalLevelTechnique2 === F.RLE) {
        const s = e;
        if (!i)
          return ha(n, s.runs, s.numRleValues);
        n = qn(n, s.runs, s.numRleValues), r = Zr(n);
      } else
        r = Zr(n);
      break;
    case F.RLE:
      r = ia(n, e.runs, e.numRleValues);
      break;
    case F.MORTON:
      dr(n), r = new Int32Array(n);
      break;
    case F.COMPONENTWISE_DELTA:
      r = la(n);
      break;
    case F.NONE:
      r = ta(n);
      break;
    default:
      throw new Error(`The specified Logical level technique is not supported: ${e.logicalLevelTechnique1}`);
  }
  return i ? it(r, i, 0) : r;
}
function Fa(n, e, t, i) {
  let r;
  switch (e.logicalLevelTechnique1) {
    case F.DELTA:
      if (e.logicalLevelTechnique2 === F.RLE) {
        const s = e, o = qn(n, s.runs, s.numRleValues);
        r = Xr(o);
      } else
        r = Xr(n);
      break;
    case F.RLE:
      r = qn(n, e.runs, e.numRleValues);
      break;
    case F.MORTON:
      dr(n), r = n;
      break;
    case F.COMPONENTWISE_DELTA:
      r = da(n);
      break;
    case F.NONE:
      r = n;
      break;
    default:
      throw new Error(`The specified Logical level technique is not supported: ${e.logicalLevelTechnique1}`);
  }
  return i ? it(r, i, 0) : r;
}
function Aa(n, e, t) {
  let i;
  switch (e.logicalLevelTechnique1) {
    case F.DELTA:
      if (e.logicalLevelTechnique2 === F.RLE) {
        const r = e;
        if (!t)
          return pa(n, r.runs, r.numRleValues);
        n = jn(n, r.runs, r.numRleValues), i = Wr(n);
      } else
        i = Wr(n);
      break;
    case F.RLE:
      i = sa(n, e.runs, e.numRleValues);
      break;
    case F.NONE:
      i = na(n);
      break;
    default:
      throw new Error(`The specified Logical level technique is not supported: ${e.logicalLevelTechnique1}`);
  }
  return t ? it(i, t, 0n) : i;
}
function za(n, e, t) {
  let i;
  switch (e.logicalLevelTechnique1) {
    case F.DELTA:
      if (e.logicalLevelTechnique2 === F.RLE) {
        const r = e, s = jn(n, r.runs, r.numRleValues);
        i = Yr(s);
      } else
        i = Yr(n);
      break;
    case F.RLE:
      i = jn(n, e.runs, e.numRleValues);
      break;
    case F.NONE:
      i = n;
      break;
    default:
      throw new Error(`The specified Logical level technique is not supported: ${e.logicalLevelTechnique1}`);
  }
  return t ? it(i, t, 0n) : i;
}
function Oa(n, e, t) {
  switch (e.logicalLevelTechnique1) {
    case F.DELTA:
      if (e.logicalLevelTechnique2 === F.RLE) {
        const i = e;
        n = Qi(n, i.runs, i.numRleValues);
      }
      return ra(n), n;
    case F.RLE:
      return Na(n, e, t);
    case F.NONE:
      return n;
    default:
      throw new Error(`The specified Logical level technique is not supported: ${e.logicalLevelTechnique1}`);
  }
}
function Ma(n, e) {
  if (e.logicalLevelTechnique1 === F.DELTA && e.logicalLevelTechnique2 === F.NONE)
    return ca(n);
  if (e.logicalLevelTechnique1 === F.RLE && e.logicalLevelTechnique2 === F.NONE) {
    const t = e;
    return fa(n, t.runs, t.numRleValues);
  }
  if (e.logicalLevelTechnique1 === F.NONE && e.logicalLevelTechnique2 === F.NONE) {
    aa(n);
    const t = new Uint32Array(e.numValues + 1);
    return t[0] = 0, t.set(n, 1), t;
  }
  if (e.logicalLevelTechnique1 === F.DELTA && e.logicalLevelTechnique2 === F.RLE) {
    const t = e, i = ua(n, t.runs, t.numRleValues);
    return dr(i), new Uint32Array(i);
  }
  throw new Error("Only delta encoding is supported for transforming length to offset streams yet.");
}
function rn(n, e, t, i, r = "int32") {
  const s = n.logicalLevelTechnique1;
  if (s === F.RLE)
    return n.runs === 1 ? M.CONST : M.FLAT;
  if (s !== F.DELTA || n.logicalLevelTechnique2 !== F.RLE)
    return n.numValues === 1 ? M.CONST : M.FLAT;
  const o = e instanceof ve ? e.size() : e, a = n;
  if (a.numRleValues !== o)
    return M.FLAT;
  if (a.runs === 1)
    return M.SEQUENCE;
  if (a.runs !== 2)
    return n.numValues === 1 ? M.CONST : M.FLAT;
  const l = i.get();
  if (n.physicalLevelTechnique === Se.VARINT)
    return Da(t, i, r) ? M.SEQUENCE : n.numValues === 1 ? M.CONST : M.FLAT;
  const c = i.get(), u = new Int32Array(t.buffer, t.byteOffset + c, 4);
  i.set(l);
  const f = 2;
  return u[2] === f && u[3] === f ? M.SEQUENCE : n.numValues === 1 ? M.CONST : M.FLAT;
}
function Da(n, e, t) {
  const i = new Hi(e.get());
  if (t === "int64") {
    const s = rt(n, i, 4);
    return s[2] === 2n && s[3] === 2n;
  }
  const r = Z(n, i, 4);
  return r[2] === 2 && r[3] === 2;
}
function Na(n, e, t) {
  return t ? oa(n, e.runs, e.numRleValues) : Qi(n, e.runs, e.numRleValues);
}
class is extends nn {
  getValueFromBuffer(e) {
    return this.dataBuffer[e];
  }
}
class ss extends Yi {
  constructor(e, t, i, r) {
    super(e, BigInt64Array.of(t), i, r);
  }
  getValueFromBuffer(e) {
    return this.dataBuffer[0] + BigInt(e) * this.delta;
  }
}
function mr(n, e, t) {
  const i = Hr(n, e) - t, r = Hr(n >> 1, e) - t;
  return { x: i, y: r };
}
function Hr(n, e) {
  let t = 0;
  for (let i = 0; i < e; i++)
    t |= (n & 1 << 2 * i) >> i;
  return t;
}
var G;
(function(n) {
  n[n.POINT = 0] = "POINT", n[n.LINESTRING = 1] = "LINESTRING", n[n.POLYGON = 2] = "POLYGON", n[n.MULTIPOINT = 3] = "MULTIPOINT", n[n.MULTILINESTRING = 4] = "MULTILINESTRING", n[n.MULTIPOLYGON = 5] = "MULTIPOLYGON";
})(G || (G = {}));
var Jr;
(function(n) {
  n[n.POINT = 0] = "POINT", n[n.LINESTRING = 1] = "LINESTRING", n[n.POLYGON = 2] = "POLYGON";
})(Jr || (Jr = {}));
var Ee;
(function(n) {
  n[n.MORTON = 0] = "MORTON", n[n.VEC_2 = 1] = "VEC_2", n[n.VEC_3 = 2] = "VEC_3";
})(Ee || (Ee = {}));
function Pa(n) {
  const e = new Array(n.numGeometries);
  let t = 1, i = 1, r = 1, s = 0, o = 0, a = 0;
  const l = n.mortonSettings, c = n.topologyVector, u = c.geometryOffsets, f = c.partOffsets, h = c.ringOffsets, p = n.vertexOffsets, d = !p || p.length === 0, y = n.containsPolygonGeometry(), m = n.vertexBuffer;
  for (let x = 0; x < n.numGeometries; x++)
    switch (n.geometryType(x)) {
      case G.POINT:
        {
          let v, g;
          if (d)
            v = m[o++], g = m[o++];
          else if (n.vertexBufferType === Ee.MORTON) {
            const b = p[a++], T = m[b], I = mr(T, l.numBits, l.coordinateShift);
            v = I.x, g = I.y;
          } else {
            const b = p[a++] * 2;
            v = m[b], g = m[b + 1];
          }
          e[s++] = [[new $(v, g)]], u && r++, f && t++, h && i++;
        }
        break;
      case G.MULTIPOINT:
        {
          const v = u[r] - u[r - 1];
          r++;
          const g = new Array(v);
          if (d)
            for (let b = 0; b < v; b++) {
              const T = m[o++], I = m[o++];
              g[b] = new $(T, I);
            }
          else
            for (let b = 0; b < v; b++) {
              const T = p[a++] * 2, I = m[T], _ = m[T + 1];
              g[b] = new $(I, _);
            }
          e[s++] = g.map((b) => [b]), t += v, i += v;
        }
        break;
      case G.LINESTRING:
        {
          let v;
          y ? (v = h[i] - h[i - 1], i++) : v = f[t] - f[t - 1], t++;
          let g;
          d ? (g = Ue(m, o, v, !1), o += v * 2) : (g = Ve(n.vertexBufferType, m, p, a, v, !1, l), a += v), e[s++] = [g], u && r++;
        }
        break;
      case G.POLYGON:
        {
          const v = f[t] - f[t - 1];
          t++;
          const g = new Array(v - 1);
          let b, T = h[i] - h[i - 1];
          if (i++, d) {
            b = Ue(m, o, T, !0), o += T * 2;
            for (let I = 0; I < g.length; I++)
              T = h[i] - h[i - 1], i++, g[I] = Ue(m, o, T, !0), o += T * 2;
          } else {
            b = Ve(n.vertexBufferType, m, p, a, T, !0, l), a += T;
            for (let I = 0; I < g.length; I++)
              T = h[i] - h[i - 1], i++, g[I] = Ve(n.vertexBufferType, m, p, a, T, !0, l), a += T;
          }
          e[s++] = [b].concat(g), u && r++;
        }
        break;
      case G.MULTILINESTRING:
        {
          const v = u[r] - u[r - 1];
          r++;
          const g = new Array(v);
          for (let b = 0; b < v; b++) {
            let T;
            if (y ? (T = h[i] - h[i - 1], i++) : T = f[t] - f[t - 1], t++, d)
              g[b] = Ue(m, o, T, !1), o += T * 2;
            else {
              const I = Ve(n.vertexBufferType, m, p, a, T, !1, l);
              g[b] = I, a += T;
            }
          }
          e[s++] = g;
        }
        break;
      case G.MULTIPOLYGON:
        {
          const v = u[r] - u[r - 1];
          r++;
          const g = new Array(v);
          for (let b = 0; b < v; b++) {
            const T = f[t] - f[t - 1];
            t++;
            let I;
            const _ = new Array(T - 1), L = h[i] - h[i - 1];
            i++, d ? (I = Ue(m, o, L, !0), o += L * 2) : (I = Ve(n.vertexBufferType, m, p, a, L, !0, l), a += L);
            for (let P = 0; P < _.length; P++) {
              const V = h[i] - h[i - 1];
              i++, d ? (_[P] = Ue(m, o, V, !0), o += V * 2) : (_[P] = Ve(n.vertexBufferType, m, p, a, V, !0, l), a += V);
            }
            g[b] = [I].concat(_);
          }
          e[s++] = g.flat();
        }
        break;
      default:
        throw new Error("The specified geometry type is currently not supported.");
    }
  return e;
}
function Ve(n, e, t, i, r, s, o) {
  return n === Ee.MORTON ? Ra(e, t, i, r, s, o) : Ba(e, t, i, r, s);
}
function Ue(n, e, t, i) {
  const r = new Array(i ? t + 1 : t);
  for (let s = 0; s < t * 2; s += 2) {
    const o = n[e + s], a = n[e + s + 1];
    r[s / 2] = new $(o, a);
  }
  return i && (r[r.length - 1] = r[0]), r;
}
function Ba(n, e, t, i, r) {
  const s = new Array(r ? i + 1 : i);
  for (let o = 0; o < i * 2; o += 2) {
    const a = e[t + o / 2] * 2, l = n[a], c = n[a + 1];
    s[o / 2] = new $(l, c);
  }
  return r && (s[s.length - 1] = s[0]), s;
}
function Ra(n, e, t, i, r, s) {
  const o = new Array(r ? i + 1 : i);
  for (let a = 0; a < i; a++) {
    const l = e[t + a], c = n[l], u = mr(c, s.numBits, s.coordinateShift);
    o[a] = new $(u.x, u.y);
  }
  return r && (o[o.length - 1] = o[0]), o;
}
class os {
  constructor(e, t, i, r, s) {
    this._vertexBufferType = e, this._topologyVector = t, this._vertexOffsets = i, this._vertexBuffer = r, this._mortonSettings = s;
  }
  get vertexBufferType() {
    return this._vertexBufferType;
  }
  get topologyVector() {
    return this._topologyVector;
  }
  get vertexOffsets() {
    return this._vertexOffsets;
  }
  get vertexBuffer() {
    return this._vertexBuffer;
  }
  /* Allows faster access to the vertices since morton encoding is currently not used in the POC. Morton encoding
     will be used after adapting the shader to decode the morton codes on the GPU. */
  getSimpleEncodedVertex(e) {
    const t = this.vertexOffsets ? this.vertexOffsets[e] * 2 : e * 2, i = this.vertexBuffer[t], r = this.vertexBuffer[t + 1];
    return [i, r];
  }
  //TODO: add scaling information to the constructor
  getVertex(e) {
    if (this.vertexOffsets && this.mortonSettings) {
      const s = this.vertexOffsets[e], o = this.vertexBuffer[s], a = mr(o, this.mortonSettings.numBits, this.mortonSettings.coordinateShift);
      return [a.x, a.y];
    }
    const t = this.vertexOffsets ? this.vertexOffsets[e] * 2 : e * 2, i = this.vertexBuffer[t], r = this.vertexBuffer[t + 1];
    return [i, r];
  }
  getGeometries() {
    return Pa(this);
  }
  get mortonSettings() {
    return this._mortonSettings;
  }
}
function $a(n, e, t, i, r) {
  return new as(n, e, Ee.VEC_2, t, i, r);
}
function Va(n, e, t, i, r, s) {
  return new as(n, e, Ee.MORTON, t, i, r, s);
}
class as extends os {
  constructor(e, t, i, r, s, o, a) {
    super(i, r, s, o, a), this._numGeometries = e, this._geometryType = t;
  }
  geometryType(e) {
    return this._geometryType;
  }
  get numGeometries() {
    return this._numGeometries;
  }
  containsPolygonGeometry() {
    return this._geometryType === G.POLYGON || this._geometryType === G.MULTIPOLYGON;
  }
  containsSingleGeometryType() {
    return !0;
  }
}
function Ua(n, e, t, i) {
  return new ls(Ee.VEC_2, n, e, t, i);
}
function Ga(n, e, t, i, r) {
  return new ls(Ee.MORTON, n, e, t, i, r);
}
class ls extends os {
  constructor(e, t, i, r, s, o) {
    super(e, i, r, s, o), this._geometryTypes = t;
  }
  geometryType(e) {
    return this._geometryTypes[e];
  }
  get numGeometries() {
    return this._geometryTypes.length;
  }
  containsPolygonGeometry() {
    for (let e = 0; e < this.numGeometries; e++)
      if (this.geometryType(e) === G.POLYGON || this.geometryType(e) === G.MULTIPOLYGON)
        return !0;
    return !1;
  }
  containsSingleGeometryType() {
    return !1;
  }
}
class cs {
  constructor(e, t, i, r) {
    this._triangleOffsets = e, this._indexBuffer = t, this._vertexBuffer = i, this._topologyVector = r;
  }
  get triangleOffsets() {
    return this._triangleOffsets;
  }
  get indexBuffer() {
    return this._indexBuffer;
  }
  get vertexBuffer() {
    return this._vertexBuffer;
  }
  get topologyVector() {
    return this._topologyVector;
  }
  /**
   * Returns geometries as coordinate arrays by extracting polygon outlines from topology.
   * The vertexBuffer contains the outline vertices, separate from the tessellated triangles.
   */
  getGeometries() {
    if (!this._topologyVector)
      throw new Error("Cannot convert GpuVector to coordinates without topology information");
    const e = new Array(this.numGeometries), t = this._topologyVector, i = t.partOffsets, r = t.ringOffsets, s = t.geometryOffsets;
    let o = 0, a = 1, l = 1, c = 1;
    for (let u = 0; u < this.numGeometries; u++)
      switch (this.geometryType(u)) {
        case G.POLYGON:
          {
            const h = i[a] - i[a - 1];
            a++;
            const p = [];
            for (let d = 0; d < h; d++) {
              const y = r[l] - r[l - 1];
              l++;
              const m = [];
              for (let x = 0; x < y; x++) {
                const w = this._vertexBuffer[o++], v = this._vertexBuffer[o++];
                m.push(new $(w, v));
              }
              m.length > 0 && m.push(m[0]), p.push(m);
            }
            e[u] = p, s && c++;
          }
          break;
        case G.MULTIPOLYGON:
          {
            const h = s[c] - s[c - 1];
            c++;
            const p = [];
            for (let d = 0; d < h; d++) {
              const y = i[a] - i[a - 1];
              a++;
              for (let m = 0; m < y; m++) {
                const x = r[l] - r[l - 1];
                l++;
                const w = [];
                for (let v = 0; v < x; v++) {
                  const g = this._vertexBuffer[o++], b = this._vertexBuffer[o++];
                  w.push(new $(g, b));
                }
                w.length > 0 && w.push(w[0]), p.push(w);
              }
            }
            e[u] = p;
          }
          break;
      }
    return e;
  }
  [Symbol.iterator]() {
    return null;
  }
}
function Kr(n, e, t, i, r, s) {
  return new qa(n, e, t, i, r, s);
}
class qa extends cs {
  constructor(e, t, i, r, s, o) {
    super(i, r, s, o), this._numGeometries = e, this._geometryType = t;
  }
  geometryType(e) {
    return this._geometryType;
  }
  get numGeometries() {
    return this._numGeometries;
  }
  containsSingleGeometryType() {
    return !0;
  }
}
function Qr(n, e, t, i, r) {
  return new ja(n, e, t, i, r);
}
class ja extends cs {
  constructor(e, t, i, r, s) {
    super(t, i, r, s), this._geometryTypes = e;
  }
  geometryType(e) {
    return this._geometryTypes[e];
  }
  get numGeometries() {
    return this._geometryTypes.length;
  }
  containsSingleGeometryType() {
    return !1;
  }
}
function Za(n, e, t, i, r) {
  const s = Y(n, t), o = rn(s, i, n, t);
  let a, l, c, u;
  if (o === M.CONST) {
    const v = yr(n, t, s);
    let g, b, T, I;
    for (let _ = 0; _ < e - 1; _++) {
      const L = Y(n, t);
      switch (L.physicalStreamType) {
        case j.LENGTH:
          switch (L.logicalStreamType.lengthType) {
            case ne.GEOMETRIES:
              g = Ie(n, t, L);
              break;
            case ne.PARTS:
              b = Ie(n, t, L);
              break;
            case ne.RINGS:
              T = Ie(n, t, L);
              break;
            case ne.TRIANGLES:
              I = Ie(n, t, L);
          }
          break;
        case j.OFFSET: {
          switch (L.logicalStreamType.offsetType) {
            case ze.VERTEX:
              a = te(n, t, L);
              break;
            case ze.INDEX:
              u = te(n, t, L);
              break;
          }
          break;
        }
        case j.DATA: {
          if (ue.VERTEX === L.logicalStreamType.dictionaryType)
            l = Zn(n, t, L, r);
          else {
            const P = L;
            c = {
              numBits: P.numBits,
              coordinateShift: P.coordinateShift
            }, l = te(n, t, L, r);
          }
          break;
        }
      }
    }
    return u ? g !== void 0 || b !== void 0 ? Kr(i, v, I, u, l, { geometryOffsets: g, partOffsets: b, ringOffsets: T }) : Kr(i, v, I, u, l) : c === void 0 ? (
      /* Currently only 2D coordinates (Vec2) are implemented in the encoder  */
      $a(i, v, { geometryOffsets: g, partOffsets: b, ringOffsets: T }, a, l)
    ) : Va(i, v, { geometryOffsets: g, partOffsets: b, ringOffsets: T }, a, l, c);
  }
  const f = te(n, t, s);
  let h, p, d, y;
  for (let v = 0; v < e - 1; v++) {
    const g = Y(n, t);
    switch (g.physicalStreamType) {
      case j.LENGTH:
        switch (g.logicalStreamType.lengthType) {
          case ne.GEOMETRIES:
            h = te(n, t, g);
            break;
          case ne.PARTS:
            p = te(n, t, g);
            break;
          case ne.RINGS:
            d = te(n, t, g);
            break;
          case ne.TRIANGLES:
            y = Ie(n, t, g);
        }
        break;
      case j.OFFSET:
        switch (g.logicalStreamType.offsetType) {
          case ze.VERTEX:
            a = te(n, t, g);
            break;
          case ze.INDEX:
            u = te(n, t, g);
            break;
        }
        break;
      case j.DATA:
        if (ue.VERTEX === g.logicalStreamType.dictionaryType)
          l = Zn(n, t, g, r);
        else {
          const b = g;
          c = {
            numBits: b.numBits,
            coordinateShift: b.coordinateShift
          }, l = te(n, t, g, r);
        }
        break;
    }
  }
  let m, x, w;
  return h ? (m = Tn(f, h, 2), p && d ? (x = ei(f, m, p, !1), w = Xa(f, m, x, d)) : p && (x = Wa(f, m, p))) : p && d ? (x = Tn(f, p, 1), w = ei(f, x, d, !0)) : p && (x = Tn(f, p, 0)), u && !x ? Qr(f, y, u, l) : u ? Qr(f, y, u, l, {
    geometryOffsets: m,
    partOffsets: x,
    ringOffsets: w
  }) : c === void 0 ? Ua(f, { geometryOffsets: m, partOffsets: x, ringOffsets: w }, a, l) : Ga(f, { geometryOffsets: m, partOffsets: x, ringOffsets: w }, a, l, c);
}
function Tn(n, e, t) {
  const i = new Uint32Array(n.length + 1);
  let r = 0;
  i[0] = r;
  let s = 0;
  for (let o = 0; o < n.length; o++)
    r = i[o + 1] = r + (n[o] > t ? e[s++] : 1);
  return i;
}
function ei(n, e, t, i) {
  const r = new Uint32Array(e[e.length - 1] + 1);
  let s = 0;
  r[0] = s;
  let o = 1, a = 0;
  for (let l = 0; l < n.length; l++) {
    const c = n[l], u = e[l + 1] - e[l];
    if (c === 5 || c === 2 || i && (c === 4 || c === 1))
      for (let f = 0; f < u; f++)
        s = r[o++] = s + t[a++];
    else
      for (let f = 0; f < u; f++)
        r[o++] = ++s;
  }
  return r;
}
function Wa(n, e, t) {
  const i = new Uint32Array(e[e.length - 1] + 1);
  let r = 0;
  i[0] = r;
  let s = 1, o = 0;
  for (let a = 0; a < n.length; a++) {
    const l = n[a], c = e[a + 1] - e[a];
    if (l === 4 || l === 1)
      for (let u = 0; u < c; u++)
        r = i[s++] = r + t[o++];
    else
      for (let u = 0; u < c; u++)
        i[s++] = ++r;
  }
  return i;
}
function Xa(n, e, t, i) {
  const r = new Uint32Array(t[t.length - 1] + 1);
  let s = 0;
  r[0] = s;
  let o = 1, a = 1, l = 0;
  for (let c = 0; c < n.length; c++) {
    const u = n[c], f = e[c + 1] - e[c];
    if (u !== 0 && u !== 3)
      for (let h = 0; h < f; h++) {
        const p = t[o] - t[o - 1];
        o++;
        for (let d = 0; d < p; d++)
          s = r[a++] = s + i[l++];
      }
    else
      for (let h = 0; h < f; h++)
        r[a++] = ++s, o++;
  }
  return r;
}
class Ya extends nt {
  constructor(e, t, i) {
    super(e, t.getBuffer(), i), this.dataVector = t;
  }
  getValueFromBuffer(e) {
    return this.dataVector.get(e);
  }
}
class Ha extends nn {
  getValueFromBuffer(e) {
    return this.dataBuffer[e];
  }
}
class us extends nt {
  constructor(e, t, i, r) {
    super(e, r ? BigInt64Array.of(t) : BigUint64Array.of(t), i);
  }
  getValueFromBuffer(e) {
    return this.dataBuffer[0];
  }
}
function It(n, e, t, i, r) {
  const s = Math.ceil(e / 8), o = Ja(n, s, t, i);
  return r ? Ia(o, e, r) : o;
}
function Ja(n, e, t, i) {
  const r = new Uint8Array(e);
  let s = 0;
  const o = i.get() + t;
  for (; s < e && !(i.get() >= o); ) {
    const a = n[i.increment()];
    if (a <= 127) {
      const l = a + 3, c = n[i.increment()], u = Math.min(s + l, e);
      r.fill(c, s, u), s = u;
    } else {
      const l = 256 - a;
      for (let c = 0; c < l && s < e; c++)
        r[s++] = n[i.increment()];
    }
  }
  return i.set(o), r;
}
function Ka(n, e, t, i) {
  const r = e.get(), s = r + t * Float32Array.BYTES_PER_ELEMENT, o = new Uint8Array(n.subarray(r, s)).buffer, a = new Float32Array(o);
  return e.set(s), i ? it(a, i, 0) : a;
}
function Qa(n, e, t, i) {
  const r = e.get(), s = r + t * Float64Array.BYTES_PER_ELEMENT, o = new Uint8Array(n.subarray(r, s)).buffer, a = new Float64Array(o);
  return e.set(s), i ? it(a, i, 0) : a;
}
const el = 12, tl = new TextDecoder();
function gr(n, e, t) {
  return t - e >= el ? tl.decode(n.subarray(e, t)) : nl(n, e, t);
}
function nl(n, e, t) {
  let i = "", r = e;
  for (; r < t; ) {
    const s = n[r];
    let o = null, a = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1;
    if (r + a > t)
      break;
    let l, c, u;
    a === 1 ? s < 128 && (o = s) : a === 2 ? (l = n[r + 1], (l & 192) === 128 && (o = (s & 31) << 6 | l & 63, o <= 127 && (o = null))) : a === 3 ? (l = n[r + 1], c = n[r + 2], (l & 192) === 128 && (c & 192) === 128 && (o = (s & 15) << 12 | (l & 63) << 6 | c & 63, (o <= 2047 || o >= 55296 && o <= 57343) && (o = null))) : a === 4 && (l = n[r + 1], c = n[r + 2], u = n[r + 3], (l & 192) === 128 && (c & 192) === 128 && (u & 192) === 128 && (o = (s & 15) << 18 | (l & 63) << 12 | (c & 63) << 6 | u & 63, (o <= 65535 || o >= 1114112) && (o = null))), o === null ? (o = 65533, a = 1) : o > 65535 && (o -= 65536, i += String.fromCharCode(o >>> 10 & 1023 | 55296), o = 56320 | o & 1023), i += String.fromCharCode(o), r += a;
  }
  return i;
}
class xr extends nt {
  constructor(e, t, i, r) {
    super(e, i, r), this.offsetBuffer = t;
  }
}
class ti extends xr {
  constructor(e, t, i, r) {
    super(e, t, i, r ?? t.length - 1);
  }
  getValueFromBuffer(e) {
    const t = this.offsetBuffer[e], i = this.offsetBuffer[e + 1];
    return gr(this.dataBuffer, t, i);
  }
}
class We extends xr {
  constructor(e, t, i, r, s) {
    super(e, i, r, s ?? t.length), this.indexBuffer = t, this.indexBuffer = t;
  }
  getValueFromBuffer(e) {
    const t = this.indexBuffer[e], i = this.offsetBuffer[t], r = this.offsetBuffer[t + 1];
    return gr(this.dataBuffer, i, r);
  }
}
function rl(n, e, t) {
  const i = [], r = new Array(e.length).fill(0);
  for (let s = 1; s < e.length; s++)
    r[s] = r[s - 1] + e[s - 1];
  for (let s = 0; s < t.length; s++)
    if (t[s] === 255)
      i.push(t[++s]);
    else {
      const o = e[t[s]], a = r[t[s]];
      for (let l = 0; l < o; l++)
        i.push(n[a + l]);
    }
  return new Uint8Array(i);
}
class fs extends xr {
  constructor(e, t, i, r, s, o, a) {
    super(e, i, r, a ?? t.length), this.indexBuffer = t, this.symbolOffsetBuffer = s, this.symbolTableBuffer = o;
  }
  getValueFromBuffer(e) {
    this.decodedDictionary == null && (this.symbolLengthBuffer == null && (this.symbolLengthBuffer = this.offsetToLengthBuffer(this.symbolOffsetBuffer)), this.decodedDictionary = rl(this.symbolTableBuffer, this.symbolLengthBuffer, this.dataBuffer));
    const t = this.indexBuffer[e], i = this.offsetBuffer[t], r = this.offsetBuffer[t + 1];
    return gr(this.decodedDictionary, i, r);
  }
  // TODO: get rid of that conversion
  offsetToLengthBuffer(e) {
    const t = new Uint32Array(e.length - 1);
    let i = e[0];
    for (let r = 1; r < e.length; r++) {
      const s = e[r];
      t[r - 1] = s - i, i = s;
    }
    return t;
  }
}
function il(n, e, t, i, r) {
  let s = null, o = null, a = null, l = null, c = null, u = r ?? null, f = null, h = null;
  for (let p = 0; p < i; p++) {
    const d = Y(e, t);
    switch (d.physicalStreamType) {
      case j.PRESENT: {
        const y = It(e, d.numValues, d.byteLength, t), m = new ve(y, d.numValues);
        u = r ?? m;
        break;
      }
      case j.OFFSET: {
        o = te(e, t, d, void 0, u);
        break;
      }
      case j.LENGTH: {
        const y = Ie(e, t, d);
        ne.DICTIONARY === d.logicalStreamType.lengthType ? s = y : ne.SYMBOL === d.logicalStreamType.lengthType ? l = y : f = y;
        break;
      }
      case j.DATA: {
        const y = e.subarray(t.get(), t.get() + d.byteLength);
        t.add(d.byteLength);
        const m = d.logicalStreamType.dictionaryType;
        ue.FSST === m ? c = y : ue.SINGLE === m || ue.SHARED === m ? a = y : ue.NONE === m && (h = y);
        break;
      }
    }
  }
  return sl(n, c, o, s, a, l, u) ?? ol(n, a, o, s, u) ?? al(n, f, h, o, u);
}
function sl(n, e, t, i, r, s, o) {
  return e ? new fs(n, t, i, r, s, e, o) : null;
}
function ol(n, e, t, i, r) {
  return e ? r ? new We(n, t, i, e, r) : new We(n, t, i, e) : null;
}
function al(n, e, t, i, r) {
  if (!e || !t)
    return null;
  if (i)
    return r ? new We(n, i, e, t, r) : new We(n, i, e, t);
  if (r && r.size() !== e.length - 1) {
    const s = new Uint32Array(r.size());
    let o = 0;
    for (let a = 0; a < r.size(); a++)
      r.get(a) ? s[a] = o++ : s[a] = 0;
    return new We(n, s, e, t, r);
  }
  return r ? new ti(n, e, t, r) : new ti(n, e, t);
}
function ll(n, e, t, i) {
  let r = null, s = null, o = null, a = null, l = !1;
  for (; !l; ) {
    const h = Y(n, e);
    switch (h.physicalStreamType) {
      case j.LENGTH:
        ne.DICTIONARY === h.logicalStreamType.lengthType ? r = Ie(n, e, h) : o = Ie(n, e, h);
        break;
      case j.DATA:
        ue.SINGLE === h.logicalStreamType.dictionaryType || ue.SHARED === h.logicalStreamType.dictionaryType ? (s = n.subarray(e.get(), e.get() + h.byteLength), l = !0) : a = n.subarray(e.get(), e.get() + h.byteLength), e.add(h.byteLength);
        break;
    }
  }
  const c = t.complexType.children, u = [];
  let f = 0;
  for (const h of c) {
    const p = Z(n, e, 1)[0];
    if (p === 0)
      continue;
    const d = h.name ? `${t.name}${h.name}` : t.name;
    if (h.type !== "scalarField" || h.scalarField.physicalType !== A.STRING)
      throw new Error("Currently only scalar string fields are implemented for a struct.");
    if (p > 1 && !h.nullable || p === 1 && h.nullable)
      throw new Error(`The number of streams for the child field ${h.name} does not match its nullability. nullibilty: ${h.nullable}, numStreams: ${p}`);
    let y;
    if (h.nullable) {
      const w = Y(n, e), v = It(n, w.numValues, w.byteLength, e);
      y = new ve(v, w.numValues);
    }
    const m = Y(n, e), x = te(n, e, m, void 0, y);
    u[f++] = a ? new fs(d, x, r, s, o, a, y) : new We(d, x, r, s, y);
  }
  return u;
}
function cl(n, e, t, i, r, s) {
  return t.type === "scalarType" ? ul(i, n, e, r, t.scalarType, t) : i === 0 ? null : ll(n, e, t);
}
function ul(n, e, t, i, r, s) {
  let o = null;
  if (n === 0)
    return null;
  if (s.nullable) {
    const c = Y(e, t), u = c.numValues, f = t.get(), h = It(e, u, c.byteLength, t);
    t.set(f + c.byteLength), o = new ve(h, c.numValues);
  }
  const a = o ?? i;
  switch (r.physicalType) {
    case A.UINT_32:
    case A.INT_32:
      return yl(e, t, s, r, a);
    case A.STRING: {
      const c = s.nullable ? n - 1 : n;
      return il(s.name, e, t, c, o);
    }
    case A.BOOLEAN:
      return fl(e, t, s, i, a);
    case A.UINT_64:
    case A.INT_64:
      return dl(e, t, s, a, r);
    case A.FLOAT:
      return hl(e, t, s, a);
    case A.DOUBLE:
      return pl(e, t, s, a);
    default:
      throw new Error(`The specified data type for the field is currently not supported: ${r}`);
  }
}
function fl(n, e, t, i, r) {
  const s = Y(n, e), o = s.numValues, a = e.get(), l = _t(r) ? r : void 0, c = It(n, o, s.byteLength, e, l);
  e.set(a + s.byteLength);
  const u = new ve(c, o);
  return new Ya(t.name, u, r);
}
function hl(n, e, t, i) {
  const r = Y(n, e), s = _t(i) ? i : void 0, o = Ka(n, e, r.numValues, s);
  return new Ha(t.name, o, i);
}
function pl(n, e, t, i) {
  const r = Y(n, e), s = _t(i) ? i : void 0, o = Qa(n, e, r.numValues, s);
  return new lr(t.name, o, i);
}
function dl(n, e, t, i, r) {
  const s = Y(n, e), o = rn(s, i, n, e, "int64"), a = r.physicalType === A.INT_64;
  if (o === M.FLAT) {
    const c = _t(i) ? i : void 0, u = a ? Sa(n, e, s, c) : ns(n, e, s, c);
    return new is(t.name, u, i);
  }
  if (o === M.SEQUENCE) {
    const c = ts(n, e, s);
    return new ss(t.name, c[0], c[1], s.numRleValues);
  }
  const l = a ? Ea(n, e, s) : rs(n, e, s);
  return new us(t.name, l, i, a);
}
function yl(n, e, t, i, r) {
  const s = Y(n, e), o = rn(s, r, n, e), a = i.physicalType === A.INT_32;
  if (o === M.FLAT) {
    const c = _t(r) ? r : void 0, u = a ? Zn(n, e, s, void 0, c) : te(n, e, s, void 0, c);
    return new ar(t.name, u, r);
  }
  if (o === M.SEQUENCE) {
    const c = es(n, e, s);
    return new cr(t.name, c[0], c[1], s.numRleValues);
  }
  const l = a ? _a(n, e, s) : yr(n, e, s);
  return new ur(t.name, l, r, a);
}
function _t(n) {
  return n instanceof ve;
}
function hs(n) {
  switch (n) {
    case 0:
    case 1:
    case 2:
    case 3: {
      const e = {};
      e.nullable = (n & 1) !== 0, e.columnScope = Ut.FEATURE;
      const t = {};
      return t.type = "logicalType", t.logicalType = fr.ID, t.longID = (n & 2) !== 0, e.scalarType = t, e.type = "scalarType", e;
    }
    case 4: {
      const e = {};
      e.nullable = !1, e.columnScope = Ut.FEATURE;
      const t = {};
      return t.type = "physicalType", t.physicalType = dt.GEOMETRY, e.type = "complexType", e.complexType = t, e;
    }
    case 30: {
      const e = {};
      e.nullable = !1, e.columnScope = Ut.FEATURE;
      const t = {};
      return t.type = "physicalType", t.physicalType = dt.STRUCT, e.type = "complexType", e.complexType = t, e;
    }
    default:
      return vl(n);
  }
}
function ps(n) {
  return n >= 10;
}
function ds(n) {
  return n === 30;
}
function ml(n) {
  if (n.type === "scalarType") {
    const e = n.scalarType;
    if (e.type === "physicalType")
      switch (e.physicalType) {
        case A.BOOLEAN:
        case A.INT_8:
        case A.UINT_8:
        case A.INT_32:
        case A.UINT_32:
        case A.INT_64:
        case A.UINT_64:
        case A.FLOAT:
        case A.DOUBLE:
          return !1;
        case A.STRING:
          return !0;
        default:
          return !1;
      }
    if (e.type === "logicalType")
      return !1;
  } else if (n.type === "complexType") {
    const e = n.complexType;
    if (e.type === "physicalType")
      switch (e.physicalType) {
        case dt.GEOMETRY:
        case dt.STRUCT:
          return !0;
        default:
          return !1;
      }
  }
  return console.warn("Unexpected column type in hasStreamCount", n), !1;
}
function gl(n) {
  return n.type === "scalarType" && n.scalarType?.type === "logicalType" && n.scalarType.logicalType === fr.ID;
}
function xl(n) {
  return n.type === "complexType" && n.complexType?.type === "physicalType" && n.complexType.physicalType === dt.GEOMETRY;
}
function vl(n) {
  let e;
  switch (n) {
    case 10:
    case 11:
      e = A.BOOLEAN;
      break;
    case 12:
    case 13:
      e = A.INT_8;
      break;
    case 14:
    case 15:
      e = A.UINT_8;
      break;
    case 16:
    case 17:
      e = A.INT_32;
      break;
    case 18:
    case 19:
      e = A.UINT_32;
      break;
    case 20:
    case 21:
      e = A.INT_64;
      break;
    case 22:
    case 23:
      e = A.UINT_64;
      break;
    case 24:
    case 25:
      e = A.FLOAT;
      break;
    case 26:
    case 27:
      e = A.DOUBLE;
      break;
    case 28:
    case 29:
      e = A.STRING;
      break;
    default:
      return null;
  }
  const t = {};
  t.nullable = (n & 1) !== 0, t.columnScope = Ut.FEATURE;
  const i = {};
  return i.type = "physicalType", i.physicalType = e, t.type = "scalarType", t.scalarType = i, t;
}
const bl = new TextDecoder(), wl = "0-3(ID), 4(GEOMETRY), 10-29(scalars), 30(STRUCT)", Cl = "10-29(scalars), 30(STRUCT)";
function vr(n, e) {
  const t = Z(n, e, 1)[0];
  if (t === 0)
    return "";
  const i = e.get(), r = i + t, s = n.subarray(i, r);
  return e.add(t), bl.decode(s);
}
function Tl(n) {
  return {
    name: n.name,
    nullable: n.nullable,
    scalarField: n.scalarType,
    complexField: n.complexType,
    type: n.type === "scalarType" ? "scalarField" : "complexField"
  };
}
function ys(n, e) {
  const t = Z(n, e, 1)[0] >>> 0;
  if (t < 10 || t > 30)
    throw new Error(`Unsupported field type code ${t}. Supported: ${Cl}`);
  const i = hs(t);
  if (ps(t) && (i.name = vr(n, e)), ds(t)) {
    const r = Z(n, e, 1)[0] >>> 0;
    i.complexType.children = new Array(r);
    for (let s = 0; s < r; s++)
      i.complexType.children[s] = ys(n, e);
  }
  return Tl(i);
}
function Il(n, e) {
  const t = Z(n, e, 1)[0] >>> 0, i = hs(t);
  if (!i)
    throw new Error(`Unsupported column type code ${t}. Supported: ${wl}`);
  if (ps(t) ? i.name = vr(n, e) : t >= 0 && t <= 3 ? i.name = "id" : t === 4 && (i.name = "geometry"), ds(t)) {
    const r = Z(n, e, 1)[0] >>> 0, s = i.complexType;
    s.children = new Array(r);
    for (let o = 0; o < r; o++)
      s.children[o] = ys(n, e);
  }
  return i;
}
function _l(n, e) {
  const t = {};
  t.featureTables = [];
  const i = {};
  i.name = vr(n, e);
  const r = Z(n, e, 1)[0] >>> 0, s = Z(n, e, 1)[0] >>> 0;
  i.columns = new Array(s);
  for (let o = 0; o < s; o++)
    i.columns[o] = Il(n, e);
  return t.featureTables.push(i), [t, r];
}
function Sl(n, e, t = !0) {
  const i = new Hi(0), r = [];
  for (; i.get() < n.length; ) {
    const s = Z(n, i, 1)[0] >>> 0, a = i.get() + s;
    if (a > n.length)
      throw new Error(`Block overruns tile: ${a} > ${n.length}`);
    if (Z(n, i, 1)[0] >>> 0 !== 1) {
      i.set(a);
      continue;
    }
    const [c, u] = _l(n, i), f = c.featureTables[0];
    let h = null, p = null;
    const d = [];
    let y = 0;
    for (const x of f.columns) {
      const w = x.name;
      if (gl(x)) {
        let v = null;
        if (x.nullable) {
          const b = Y(n, i), T = i.get(), I = It(n, b.numValues, b.byteLength, i);
          i.set(T + b.byteLength), v = new ve(I, b.numValues);
        }
        const g = Y(n, i);
        y = v ? v.size() : g.decompressedCount, h = Ll(n, x, i, w, g, v ?? y, t);
      } else if (xl(x)) {
        const v = Z(n, i, 1)[0];
        if (y === 0) {
          const g = i.get();
          y = Y(n, i).decompressedCount, i.set(g);
        }
        p = Za(n, v, i, y, e);
      } else {
        const g = ml(x) ? Z(n, i, 1)[0] : 1;
        if (g === 0)
          continue;
        const b = cl(n, i, x, g, y);
        if (b)
          if (Array.isArray(b))
            for (const T of b)
              d.push(T);
          else
            d.push(b);
      }
    }
    const m = new oo(f.name, p, h, d, u);
    r.push(m), i.set(a);
  }
  return r;
}
function Ll(n, e, t, i, r, s, o = !1) {
  const a = e.scalarType;
  if (!a || a.type !== "logicalType" || a.logicalType !== fr.ID)
    throw new Error(`ID column must be a logical ID scalar type: ${i}`);
  const l = a.longID ? A.UINT_64 : A.UINT_32, c = typeof s == "number" ? void 0 : s, u = rn(r, s, n, t, l === A.UINT_64 ? "int64" : "int32");
  if (l === A.UINT_32)
    switch (u) {
      case M.FLAT: {
        const f = te(n, t, r, void 0, c);
        return new ar(i, f, s);
      }
      case M.SEQUENCE: {
        const f = es(n, t, r);
        return new cr(i, f[0], f[1], r.numRleValues);
      }
      case M.CONST: {
        const f = yr(n, t, r);
        return new ur(i, f, s, !1);
      }
    }
  switch (u) {
    case M.FLAT: {
      if (o) {
        const h = La(n, t, r);
        return new lr(i, h, s);
      }
      const f = ns(n, t, r, c);
      return new is(i, f, s);
    }
    case M.SEQUENCE: {
      const f = ts(n, t, r);
      return new ss(i, f[0], f[1], r.numRleValues);
    }
    case M.CONST: {
      const f = rs(n, t, r);
      return new us(i, f, s, !1);
    }
  }
  throw new Error("Vector type not supported for id column.");
}
class El {
  constructor(e, t) {
    switch (this._featureData = e, this.properties = this._featureData.properties || {}, this._featureData.geometry?.type) {
      case G.POINT:
      case G.MULTIPOINT:
        this.type = 1;
        break;
      case G.LINESTRING:
      case G.MULTILINESTRING:
        this.type = 2;
        break;
      case G.POLYGON:
      case G.MULTIPOLYGON:
        this.type = 3;
        break;
      default:
        this.type = 0;
    }
    this.extent = t, this.id = Number(this._featureData.id);
  }
  loadGeometry() {
    const e = [];
    for (const t of this._featureData.geometry.coordinates) {
      const i = [];
      for (const r of t)
        i.push(new $(r.x, r.y));
      e.push(i);
    }
    return e;
  }
}
class kl {
  constructor(e) {
    this.features = [], this.featureTable = e, this.name = e.name, this.extent = e.extent, this.version = 2, this.features = e.getFeatures(), this.length = this.features.length;
  }
  feature(e) {
    return new El(this.features[e], this.extent);
  }
}
class Fl {
  constructor(e) {
    this.layers = {};
    const t = Sl(new Uint8Array(e));
    this.layers = t.reduce((i, r) => ({ ...i, [r.name]: new kl(r) }), {});
  }
}
const Wn = 65536 * 65536, ni = 1 / Wn, Al = 12, ri = typeof TextDecoder > "u" ? null : new TextDecoder("utf-8"), In = 0, zt = 1, lt = 2, Ot = 5;
class zl {
  /**
   * @param {Uint8Array | ArrayBuffer} [buf]
   */
  constructor(e = new Uint8Array(16)) {
    this.buf = ArrayBuffer.isView(e) ? e : new Uint8Array(e), this.dataView = new DataView(this.buf.buffer), this.pos = 0, this.type = 0, this.length = this.buf.length;
  }
  // === READING =================================================================
  /**
   * @template T
   * @param {(tag: number, result: T, pbf: Pbf) => void} readField
   * @param {T} result
   * @param {number} [end]
   */
  readFields(e, t, i = this.length) {
    for (; this.pos < i; ) {
      const r = this.readVarint(), s = r >> 3, o = this.pos;
      this.type = r & 7, e(s, t, this), this.pos === o && this.skip(r);
    }
    return t;
  }
  /**
   * @template T
   * @param {(tag: number, result: T, pbf: Pbf) => void} readField
   * @param {T} result
   */
  readMessage(e, t) {
    return this.readFields(e, t, this.readVarint() + this.pos);
  }
  readFixed32() {
    const e = this.dataView.getUint32(this.pos, !0);
    return this.pos += 4, e;
  }
  readSFixed32() {
    const e = this.dataView.getInt32(this.pos, !0);
    return this.pos += 4, e;
  }
  // 64-bit int handling is based on github.com/dpw/node-buffer-more-ints (MIT-licensed)
  readFixed64() {
    const e = this.dataView.getUint32(this.pos, !0) + this.dataView.getUint32(this.pos + 4, !0) * Wn;
    return this.pos += 8, e;
  }
  readSFixed64() {
    const e = this.dataView.getUint32(this.pos, !0) + this.dataView.getInt32(this.pos + 4, !0) * Wn;
    return this.pos += 8, e;
  }
  readFloat() {
    const e = this.dataView.getFloat32(this.pos, !0);
    return this.pos += 4, e;
  }
  readDouble() {
    const e = this.dataView.getFloat64(this.pos, !0);
    return this.pos += 8, e;
  }
  /**
   * @param {boolean} [isSigned]
   */
  readVarint(e) {
    const t = this.buf;
    let i, r;
    return r = t[this.pos++], i = r & 127, r < 128 || (r = t[this.pos++], i |= (r & 127) << 7, r < 128) || (r = t[this.pos++], i |= (r & 127) << 14, r < 128) || (r = t[this.pos++], i |= (r & 127) << 21, r < 128) ? i : (r = t[this.pos], i |= (r & 15) << 28, Ol(i, e, this));
  }
  readVarint64() {
    return this.readVarint(!0);
  }
  readSVarint() {
    const e = this.readVarint();
    return e % 2 === 1 ? (e + 1) / -2 : e / 2;
  }
  readBoolean() {
    return !!this.readVarint();
  }
  readString() {
    const e = this.readVarint() + this.pos, t = this.pos;
    return this.pos = e, e - t >= Al && ri ? ri.decode(this.buf.subarray(t, e)) : Zl(this.buf, t, e);
  }
  readBytes() {
    const e = this.readVarint() + this.pos, t = this.buf.subarray(this.pos, e);
    return this.pos = e, t;
  }
  // verbose for performance reasons; doesn't affect gzipped size
  /**
   * @param {number[]} [arr]
   * @param {boolean} [isSigned]
   */
  readPackedVarint(e = [], t) {
    const i = this.readPackedEnd();
    for (; this.pos < i; ) e.push(this.readVarint(t));
    return e;
  }
  /** @param {number[]} [arr] */
  readPackedSVarint(e = []) {
    const t = this.readPackedEnd();
    for (; this.pos < t; ) e.push(this.readSVarint());
    return e;
  }
  /** @param {boolean[]} [arr] */
  readPackedBoolean(e = []) {
    const t = this.readPackedEnd();
    for (; this.pos < t; ) e.push(this.readBoolean());
    return e;
  }
  /** @param {number[]} [arr] */
  readPackedFloat(e = []) {
    const t = this.readPackedEnd();
    for (; this.pos < t; ) e.push(this.readFloat());
    return e;
  }
  /** @param {number[]} [arr] */
  readPackedDouble(e = []) {
    const t = this.readPackedEnd();
    for (; this.pos < t; ) e.push(this.readDouble());
    return e;
  }
  /** @param {number[]} [arr] */
  readPackedFixed32(e = []) {
    const t = this.readPackedEnd();
    for (; this.pos < t; ) e.push(this.readFixed32());
    return e;
  }
  /** @param {number[]} [arr] */
  readPackedSFixed32(e = []) {
    const t = this.readPackedEnd();
    for (; this.pos < t; ) e.push(this.readSFixed32());
    return e;
  }
  /** @param {number[]} [arr] */
  readPackedFixed64(e = []) {
    const t = this.readPackedEnd();
    for (; this.pos < t; ) e.push(this.readFixed64());
    return e;
  }
  /** @param {number[]} [arr] */
  readPackedSFixed64(e = []) {
    const t = this.readPackedEnd();
    for (; this.pos < t; ) e.push(this.readSFixed64());
    return e;
  }
  readPackedEnd() {
    return this.type === lt ? this.readVarint() + this.pos : this.pos + 1;
  }
  /** @param {number} val */
  skip(e) {
    const t = e & 7;
    if (t === In) for (; this.buf[this.pos++] > 127; )
      ;
    else if (t === lt) this.pos = this.readVarint() + this.pos;
    else if (t === Ot) this.pos += 4;
    else if (t === zt) this.pos += 8;
    else throw new Error(`Unimplemented type: ${t}`);
  }
  // === WRITING =================================================================
  /**
   * @param {number} tag
   * @param {number} type
   */
  writeTag(e, t) {
    this.writeVarint(e << 3 | t);
  }
  /** @param {number} min */
  realloc(e) {
    let t = this.length || 16;
    for (; t < this.pos + e; ) t *= 2;
    if (t !== this.length) {
      const i = new Uint8Array(t);
      i.set(this.buf), this.buf = i, this.dataView = new DataView(i.buffer), this.length = t;
    }
  }
  finish() {
    return this.length = this.pos, this.pos = 0, this.buf.subarray(0, this.length);
  }
  /** @param {number} val */
  writeFixed32(e) {
    this.realloc(4), this.dataView.setInt32(this.pos, e, !0), this.pos += 4;
  }
  /** @param {number} val */
  writeSFixed32(e) {
    this.realloc(4), this.dataView.setInt32(this.pos, e, !0), this.pos += 4;
  }
  /** @param {number} val */
  writeFixed64(e) {
    this.realloc(8), this.dataView.setInt32(this.pos, e & -1, !0), this.dataView.setInt32(this.pos + 4, Math.floor(e * ni), !0), this.pos += 8;
  }
  /** @param {number} val */
  writeSFixed64(e) {
    this.realloc(8), this.dataView.setInt32(this.pos, e & -1, !0), this.dataView.setInt32(this.pos + 4, Math.floor(e * ni), !0), this.pos += 8;
  }
  /** @param {number} val */
  writeVarint(e) {
    if (e = +e || 0, e > 268435455 || e < 0) {
      Ml(e, this);
      return;
    }
    this.realloc(4), this.buf[this.pos++] = e & 127 | (e > 127 ? 128 : 0), !(e <= 127) && (this.buf[this.pos++] = (e >>>= 7) & 127 | (e > 127 ? 128 : 0), !(e <= 127) && (this.buf[this.pos++] = (e >>>= 7) & 127 | (e > 127 ? 128 : 0), !(e <= 127) && (this.buf[this.pos++] = e >>> 7 & 127)));
  }
  /** @param {number} val */
  writeSVarint(e) {
    this.writeVarint(e < 0 ? -e * 2 - 1 : e * 2);
  }
  /** @param {boolean} val */
  writeBoolean(e) {
    this.writeVarint(+e);
  }
  /** @param {string} str */
  writeString(e) {
    e = String(e), this.realloc(e.length * 4), this.pos++;
    const t = this.pos;
    this.pos = Wl(this.buf, e, this.pos);
    const i = this.pos - t;
    i >= 128 && ii(t, i, this), this.pos = t - 1, this.writeVarint(i), this.pos += i;
  }
  /** @param {number} val */
  writeFloat(e) {
    this.realloc(4), this.dataView.setFloat32(this.pos, e, !0), this.pos += 4;
  }
  /** @param {number} val */
  writeDouble(e) {
    this.realloc(8), this.dataView.setFloat64(this.pos, e, !0), this.pos += 8;
  }
  /** @param {Uint8Array} buffer */
  writeBytes(e) {
    const t = e.length;
    this.writeVarint(t), this.realloc(t);
    for (let i = 0; i < t; i++) this.buf[this.pos++] = e[i];
  }
  /**
   * @template T
   * @param {(obj: T, pbf: Pbf) => void} fn
   * @param {T} obj
   */
  writeRawMessage(e, t) {
    this.pos++;
    const i = this.pos;
    e(t, this);
    const r = this.pos - i;
    r >= 128 && ii(i, r, this), this.pos = i - 1, this.writeVarint(r), this.pos += r;
  }
  /**
   * @template T
   * @param {number} tag
   * @param {(obj: T, pbf: Pbf) => void} fn
   * @param {T} obj
   */
  writeMessage(e, t, i) {
    this.writeTag(e, lt), this.writeRawMessage(t, i);
  }
  /**
   * @param {number} tag
   * @param {number[]} arr
   */
  writePackedVarint(e, t) {
    t.length && this.writeMessage(e, Pl, t);
  }
  /**
   * @param {number} tag
   * @param {number[]} arr
   */
  writePackedSVarint(e, t) {
    t.length && this.writeMessage(e, Bl, t);
  }
  /**
   * @param {number} tag
   * @param {boolean[]} arr
   */
  writePackedBoolean(e, t) {
    t.length && this.writeMessage(e, Vl, t);
  }
  /**
   * @param {number} tag
   * @param {number[]} arr
   */
  writePackedFloat(e, t) {
    t.length && this.writeMessage(e, Rl, t);
  }
  /**
   * @param {number} tag
   * @param {number[]} arr
   */
  writePackedDouble(e, t) {
    t.length && this.writeMessage(e, $l, t);
  }
  /**
   * @param {number} tag
   * @param {number[]} arr
   */
  writePackedFixed32(e, t) {
    t.length && this.writeMessage(e, Ul, t);
  }
  /**
   * @param {number} tag
   * @param {number[]} arr
   */
  writePackedSFixed32(e, t) {
    t.length && this.writeMessage(e, Gl, t);
  }
  /**
   * @param {number} tag
   * @param {number[]} arr
   */
  writePackedFixed64(e, t) {
    t.length && this.writeMessage(e, ql, t);
  }
  /**
   * @param {number} tag
   * @param {number[]} arr
   */
  writePackedSFixed64(e, t) {
    t.length && this.writeMessage(e, jl, t);
  }
  /**
   * @param {number} tag
   * @param {Uint8Array} buffer
   */
  writeBytesField(e, t) {
    this.writeTag(e, lt), this.writeBytes(t);
  }
  /**
   * @param {number} tag
   * @param {number} val
   */
  writeFixed32Field(e, t) {
    this.writeTag(e, Ot), this.writeFixed32(t);
  }
  /**
   * @param {number} tag
   * @param {number} val
   */
  writeSFixed32Field(e, t) {
    this.writeTag(e, Ot), this.writeSFixed32(t);
  }
  /**
   * @param {number} tag
   * @param {number} val
   */
  writeFixed64Field(e, t) {
    this.writeTag(e, zt), this.writeFixed64(t);
  }
  /**
   * @param {number} tag
   * @param {number} val
   */
  writeSFixed64Field(e, t) {
    this.writeTag(e, zt), this.writeSFixed64(t);
  }
  /**
   * @param {number} tag
   * @param {number} val
   */
  writeVarintField(e, t) {
    this.writeTag(e, In), this.writeVarint(t);
  }
  /**
   * @param {number} tag
   * @param {number} val
   */
  writeSVarintField(e, t) {
    this.writeTag(e, In), this.writeSVarint(t);
  }
  /**
   * @param {number} tag
   * @param {string} str
   */
  writeStringField(e, t) {
    this.writeTag(e, lt), this.writeString(t);
  }
  /**
   * @param {number} tag
   * @param {number} val
   */
  writeFloatField(e, t) {
    this.writeTag(e, Ot), this.writeFloat(t);
  }
  /**
   * @param {number} tag
   * @param {number} val
   */
  writeDoubleField(e, t) {
    this.writeTag(e, zt), this.writeDouble(t);
  }
  /**
   * @param {number} tag
   * @param {boolean} val
   */
  writeBooleanField(e, t) {
    this.writeVarintField(e, +t);
  }
}
function Ol(n, e, t) {
  const i = t.buf;
  let r, s;
  if (s = i[t.pos++], r = (s & 112) >> 4, s < 128 || (s = i[t.pos++], r |= (s & 127) << 3, s < 128) || (s = i[t.pos++], r |= (s & 127) << 10, s < 128) || (s = i[t.pos++], r |= (s & 127) << 17, s < 128) || (s = i[t.pos++], r |= (s & 127) << 24, s < 128) || (s = i[t.pos++], r |= (s & 1) << 31, s < 128)) return Ge(n, r, e);
  throw new Error("Expected varint not more than 10 bytes");
}
function Ge(n, e, t) {
  return t ? e * 4294967296 + (n >>> 0) : (e >>> 0) * 4294967296 + (n >>> 0);
}
function Ml(n, e) {
  let t, i;
  if (n >= 0 ? (t = n % 4294967296 | 0, i = n / 4294967296 | 0) : (t = ~(-n % 4294967296), i = ~(-n / 4294967296), t ^ 4294967295 ? t = t + 1 | 0 : (t = 0, i = i + 1 | 0)), n >= 18446744073709552e3 || n < -18446744073709552e3)
    throw new Error("Given varint doesn't fit into 10 bytes");
  e.realloc(10), Dl(t, i, e), Nl(i, e);
}
function Dl(n, e, t) {
  t.buf[t.pos++] = n & 127 | 128, n >>>= 7, t.buf[t.pos++] = n & 127 | 128, n >>>= 7, t.buf[t.pos++] = n & 127 | 128, n >>>= 7, t.buf[t.pos++] = n & 127 | 128, n >>>= 7, t.buf[t.pos] = n & 127;
}
function Nl(n, e) {
  const t = (n & 7) << 4;
  e.buf[e.pos++] |= t | ((n >>>= 3) ? 128 : 0), n && (e.buf[e.pos++] = n & 127 | ((n >>>= 7) ? 128 : 0), n && (e.buf[e.pos++] = n & 127 | ((n >>>= 7) ? 128 : 0), n && (e.buf[e.pos++] = n & 127 | ((n >>>= 7) ? 128 : 0), n && (e.buf[e.pos++] = n & 127 | ((n >>>= 7) ? 128 : 0), n && (e.buf[e.pos++] = n & 127)))));
}
function ii(n, e, t) {
  const i = e <= 16383 ? 1 : e <= 2097151 ? 2 : e <= 268435455 ? 3 : Math.floor(Math.log(e) / (Math.LN2 * 7));
  t.realloc(i);
  for (let r = t.pos - 1; r >= n; r--) t.buf[r + i] = t.buf[r];
}
function Pl(n, e) {
  for (let t = 0; t < n.length; t++) e.writeVarint(n[t]);
}
function Bl(n, e) {
  for (let t = 0; t < n.length; t++) e.writeSVarint(n[t]);
}
function Rl(n, e) {
  for (let t = 0; t < n.length; t++) e.writeFloat(n[t]);
}
function $l(n, e) {
  for (let t = 0; t < n.length; t++) e.writeDouble(n[t]);
}
function Vl(n, e) {
  for (let t = 0; t < n.length; t++) e.writeBoolean(n[t]);
}
function Ul(n, e) {
  for (let t = 0; t < n.length; t++) e.writeFixed32(n[t]);
}
function Gl(n, e) {
  for (let t = 0; t < n.length; t++) e.writeSFixed32(n[t]);
}
function ql(n, e) {
  for (let t = 0; t < n.length; t++) e.writeFixed64(n[t]);
}
function jl(n, e) {
  for (let t = 0; t < n.length; t++) e.writeSFixed64(n[t]);
}
function Zl(n, e, t) {
  let i = "", r = e;
  for (; r < t; ) {
    const s = n[r];
    let o = null, a = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1;
    if (r + a > t) break;
    let l, c, u;
    a === 1 ? s < 128 && (o = s) : a === 2 ? (l = n[r + 1], (l & 192) === 128 && (o = (s & 31) << 6 | l & 63, o <= 127 && (o = null))) : a === 3 ? (l = n[r + 1], c = n[r + 2], (l & 192) === 128 && (c & 192) === 128 && (o = (s & 15) << 12 | (l & 63) << 6 | c & 63, (o <= 2047 || o >= 55296 && o <= 57343) && (o = null))) : a === 4 && (l = n[r + 1], c = n[r + 2], u = n[r + 3], (l & 192) === 128 && (c & 192) === 128 && (u & 192) === 128 && (o = (s & 15) << 18 | (l & 63) << 12 | (c & 63) << 6 | u & 63, (o <= 65535 || o >= 1114112) && (o = null))), o === null ? (o = 65533, a = 1) : o > 65535 && (o -= 65536, i += String.fromCharCode(o >>> 10 & 1023 | 55296), o = 56320 | o & 1023), i += String.fromCharCode(o), r += a;
  }
  return i;
}
function Wl(n, e, t) {
  for (let i = 0, r, s; i < e.length; i++) {
    if (r = e.charCodeAt(i), r > 55295 && r < 57344)
      if (s)
        if (r < 56320) {
          n[t++] = 239, n[t++] = 191, n[t++] = 189, s = r;
          continue;
        } else
          r = s - 55296 << 10 | r - 56320 | 65536, s = null;
      else {
        r > 56319 || i + 1 === e.length ? (n[t++] = 239, n[t++] = 191, n[t++] = 189) : s = r;
        continue;
      }
    else s && (n[t++] = 239, n[t++] = 191, n[t++] = 189, s = null);
    r < 128 ? n[t++] = r : (r < 2048 ? n[t++] = r >> 6 | 192 : (r < 65536 ? n[t++] = r >> 12 | 224 : (n[t++] = r >> 18 | 240, n[t++] = r >> 12 & 63 | 128), n[t++] = r >> 6 & 63 | 128), n[t++] = r & 63 | 128);
  }
  return t;
}
class Xl extends Zi {
  constructor(e, t) {
    super(e, t), this.tilingScheme = new Cesium.WebMercatorTilingScheme();
  }
  async init() {
    const e = this.styleSource;
    let t = e.url;
    if (t && !e.tiles) {
      t = /^((http)|(https)|(data:)|\/)/.test(t) ? t : this.path + e.url;
      try {
        const i = await Cesium.Resource.fetchJson(t);
        for (const r in i)
          e[r] || (e[r] = i[r]);
      } catch (i) {
        this.errorEvent.raiseEvent(i);
      }
    }
  }
  async requestTile(e, t, i) {
    const r = this.styleSource;
    if (!r.tiles || !r.tiles.length) return;
    r.scheme === "tms" && (t = this.tilingScheme.getNumberOfYTilesAtLevel(i) - t - 1);
    let s = r.tiles[0].replace("{x}", e).replace("{y}", t).replace("{z}", i);
    s = /^((http)|(https)|(data:)|\/)/.test(s) ? s : this.path + s;
    try {
      const o = await fetch(s).then((l) => l.arrayBuffer());
      return r.encoding == "mlt" ? new Fl(o) : new io(new zl(o));
    } catch (o) {
      this.errorEvent.raiseEvent(o);
    }
  }
  /**
   * 仅拉取瓦片 ArrayBuffer，不解析；供 Web Worker 路径使用。
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {import('../../VectorTileset').VectorTileset} [tileset]
   * @returns {Promise<{buffer:ArrayBuffer,encoding:string}|undefined>}
   */
  async requestTileBuffer(e, t, i, r) {
    const s = this.styleSource;
    if (!s.tiles || !s.tiles.length) return;
    s.scheme === "tms" && (t = this.tilingScheme.getNumberOfYTilesAtLevel(i) - t - 1);
    let o = s.tiles[0].replace("{x}", e).replace("{y}", t).replace("{z}", i);
    o = /^((http)|(https)|(data:)|\/)/.test(o) ? o : this.path + o;
    try {
      const a = await fetch(o).then((c) => c.arrayBuffer()), l = s.encoding === "mlt" ? "mlt" : "mvt";
      return { buffer: a, encoding: l };
    } catch (a) {
      this.errorEvent.raiseEvent(a);
    }
  }
}
Xi("vector", Xl);
function Xn(n, e, t, i) {
  let r = i;
  const s = e + (t - e >> 1);
  let o = t - e, a;
  const l = n[e], c = n[e + 1], u = n[t], f = n[t + 1];
  for (let h = e + 3; h < t; h += 3) {
    const p = Yl(n[h], n[h + 1], l, c, u, f);
    if (p > r)
      a = h, r = p;
    else if (p === r) {
      const d = Math.abs(h - s);
      d < o && (a = h, o = d);
    }
  }
  r > i && (a - e > 3 && Xn(n, e, a, i), n[a + 2] = r, t - a > 3 && Xn(n, a, t, i));
}
function Yl(n, e, t, i, r, s) {
  let o = r - t, a = s - i;
  if (o !== 0 || a !== 0) {
    const l = ((n - t) * o + (e - i) * a) / (o * o + a * a);
    l > 1 ? (t = r, i = s) : l > 0 && (t += o * l, i += a * l);
  }
  return o = n - t, a = e - i, o * o + a * a;
}
function yt(n, e, t, i) {
  const r = {
    id: n ?? null,
    type: e,
    geometry: t,
    tags: i,
    minX: 1 / 0,
    minY: 1 / 0,
    maxX: -1 / 0,
    maxY: -1 / 0
  };
  if (e === "Point" || e === "MultiPoint" || e === "LineString")
    Mt(r, t);
  else if (e === "Polygon")
    Mt(r, t[0]);
  else if (e === "MultiLineString")
    for (const s of t)
      Mt(r, s);
  else if (e === "MultiPolygon")
    for (const s of t)
      Mt(r, s[0]);
  return r;
}
function Mt(n, e) {
  for (let t = 0; t < e.length; t += 3)
    n.minX = Math.min(n.minX, e[t]), n.minY = Math.min(n.minY, e[t + 1]), n.maxX = Math.max(n.maxX, e[t]), n.maxY = Math.max(n.maxY, e[t + 1]);
}
function Hl(n, e) {
  const t = [];
  if (n.type === "FeatureCollection")
    for (let i = 0; i < n.features.length; i++)
      Gt(t, n.features[i], e, i);
  else n.type === "Feature" ? Gt(t, n, e) : Gt(t, { geometry: n }, e);
  return t;
}
function Gt(n, e, t, i) {
  if (!e.geometry) return;
  const r = e.geometry.coordinates;
  if (r && r.length === 0) return;
  const s = e.geometry.type, o = Math.pow(t.tolerance / ((1 << t.maxZoom) * t.extent), 2);
  let a = [], l = e.id;
  if (t.promoteId ? l = e.properties[t.promoteId] : t.generateId && (l = i || 0), s === "Point")
    si(r, a);
  else if (s === "MultiPoint")
    for (const c of r)
      si(c, a);
  else if (s === "LineString")
    Yn(r, a, o, !1);
  else if (s === "MultiLineString")
    if (t.lineMetrics) {
      for (const c of r)
        a = [], Yn(c, a, o, !1), n.push(yt(l, "LineString", a, e.properties));
      return;
    } else
      _n(r, a, o, !1);
  else if (s === "Polygon")
    _n(r, a, o, !0);
  else if (s === "MultiPolygon")
    for (const c of r) {
      const u = [];
      _n(c, u, o, !0), a.push(u);
    }
  else if (s === "GeometryCollection") {
    for (const c of e.geometry.geometries)
      Gt(n, {
        id: l,
        geometry: c,
        properties: e.properties
      }, t, i);
    return;
  } else
    throw new Error("Input data is not a valid GeoJSON object.");
  n.push(yt(l, s, a, e.properties));
}
function si(n, e) {
  e.push(ms(n[0]), gs(n[1]), 0);
}
function Yn(n, e, t, i) {
  let r, s, o = 0;
  for (let l = 0; l < n.length; l++) {
    const c = ms(n[l][0]), u = gs(n[l][1]);
    e.push(c, u, 0), l > 0 && (i ? o += (r * u - c * s) / 2 : o += Math.sqrt(Math.pow(c - r, 2) + Math.pow(u - s, 2))), r = c, s = u;
  }
  const a = e.length - 3;
  e[2] = 1, Xn(e, 0, a, t), e[a + 2] = 1, e.size = Math.abs(o), e.start = 0, e.end = e.size;
}
function _n(n, e, t, i) {
  for (let r = 0; r < n.length; r++) {
    const s = [];
    Yn(n[r], s, t, i), e.push(s);
  }
}
function ms(n) {
  return n / 360 + 0.5;
}
function gs(n) {
  const e = Math.sin(n * Math.PI / 180), t = 0.5 - 0.25 * Math.log((1 + e) / (1 - e)) / Math.PI;
  return t < 0 ? 0 : t > 1 ? 1 : t;
}
function ge(n, e, t, i, r, s, o, a) {
  if (t /= e, i /= e, s >= t && o < i) return n;
  if (o < t || s >= i) return null;
  const l = [];
  for (const c of n) {
    const u = c.geometry;
    let f = c.type;
    const h = r === 0 ? c.minX : c.minY, p = r === 0 ? c.maxX : c.maxY;
    if (h >= t && p < i) {
      l.push(c);
      continue;
    } else if (p < t || h >= i)
      continue;
    let d = [];
    if (f === "Point" || f === "MultiPoint")
      Jl(u, d, t, i, r);
    else if (f === "LineString")
      xs(u, d, t, i, r, !1, a.lineMetrics);
    else if (f === "MultiLineString")
      Sn(u, d, t, i, r, !1);
    else if (f === "Polygon")
      Sn(u, d, t, i, r, !0);
    else if (f === "MultiPolygon")
      for (const y of u) {
        const m = [];
        Sn(y, m, t, i, r, !0), m.length && d.push(m);
      }
    if (d.length) {
      if (a.lineMetrics && f === "LineString") {
        for (const y of d)
          l.push(yt(c.id, f, y, c.tags));
        continue;
      }
      (f === "LineString" || f === "MultiLineString") && (d.length === 1 ? (f = "LineString", d = d[0]) : f = "MultiLineString"), (f === "Point" || f === "MultiPoint") && (f = d.length === 3 ? "Point" : "MultiPoint"), l.push(yt(c.id, f, d, c.tags));
    }
  }
  return l.length ? l : null;
}
function Jl(n, e, t, i, r) {
  for (let s = 0; s < n.length; s += 3) {
    const o = n[s + r];
    o >= t && o <= i && Xe(e, n[s], n[s + 1], n[s + 2]);
  }
}
function xs(n, e, t, i, r, s, o) {
  let a = oi(n);
  const l = r === 0 ? Kl : Ql;
  let c = n.start, u, f;
  for (let x = 0; x < n.length - 3; x += 3) {
    const w = n[x], v = n[x + 1], g = n[x + 2], b = n[x + 3], T = n[x + 4], I = r === 0 ? w : v, _ = r === 0 ? b : T;
    let L = !1;
    o && (u = Math.sqrt(Math.pow(w - b, 2) + Math.pow(v - T, 2))), I < t ? _ > t && (f = l(a, w, v, b, T, t), o && (a.start = c + u * f)) : I > i ? _ < i && (f = l(a, w, v, b, T, i), o && (a.start = c + u * f)) : Xe(a, w, v, g), _ < t && I >= t && (f = l(a, w, v, b, T, t), L = !0), _ > i && I <= i && (f = l(a, w, v, b, T, i), L = !0), !s && L && (o && (a.end = c + u * f), e.push(a), a = oi(n)), o && (c += u);
  }
  let h = n.length - 3;
  const p = n[h], d = n[h + 1], y = n[h + 2], m = r === 0 ? p : d;
  m >= t && m <= i && Xe(a, p, d, y), h = a.length - 3, s && h >= 3 && (a[h] !== a[0] || a[h + 1] !== a[1]) && Xe(a, a[0], a[1], a[2]), a.length && e.push(a);
}
function oi(n) {
  const e = [];
  return e.size = n.size, e.start = n.start, e.end = n.end, e;
}
function Sn(n, e, t, i, r, s) {
  for (const o of n)
    xs(o, e, t, i, r, s, !1);
}
function Xe(n, e, t, i) {
  n.push(e, t, i);
}
function Kl(n, e, t, i, r, s) {
  const o = (s - e) / (i - e);
  return Xe(n, s, t + (r - t) * o, 1), o;
}
function Ql(n, e, t, i, r, s) {
  const o = (s - t) / (r - t);
  return Xe(n, e + (i - e) * o, s, 1), o;
}
function ec(n, e) {
  const t = e.buffer / e.extent;
  let i = n;
  const r = ge(n, 1, -1 - t, t, 0, -1, 2, e), s = ge(n, 1, 1 - t, 2 + t, 0, -1, 2, e);
  return (r || s) && (i = ge(n, 1, -t, 1 + t, 0, -1, 2, e) || [], r && (i = ai(r, 1).concat(i)), s && (i = i.concat(ai(s, -1)))), i;
}
function ai(n, e) {
  const t = [];
  for (let i = 0; i < n.length; i++) {
    const r = n[i], s = r.type;
    let o;
    if (s === "Point" || s === "MultiPoint" || s === "LineString")
      o = Ln(r.geometry, e);
    else if (s === "MultiLineString" || s === "Polygon") {
      o = [];
      for (const a of r.geometry)
        o.push(Ln(a, e));
    } else if (s === "MultiPolygon") {
      o = [];
      for (const a of r.geometry) {
        const l = [];
        for (const c of a)
          l.push(Ln(c, e));
        o.push(l);
      }
    }
    t.push(yt(r.id, s, o, r.tags));
  }
  return t;
}
function Ln(n, e) {
  const t = [];
  t.size = n.size, n.start !== void 0 && (t.start = n.start, t.end = n.end);
  for (let i = 0; i < n.length; i += 3)
    t.push(n[i] + e, n[i + 1], n[i + 2]);
  return t;
}
function li(n, e) {
  if (n.transformed) return n;
  const t = 1 << n.z, i = n.x, r = n.y;
  for (const s of n.features) {
    const o = s.geometry, a = s.type;
    if (s.geometry = [], a === 1)
      for (let l = 0; l < o.length; l += 2)
        s.geometry.push(ci(o[l], o[l + 1], e, t, i, r));
    else
      for (let l = 0; l < o.length; l++) {
        const c = [];
        for (let u = 0; u < o[l].length; u += 2)
          c.push(ci(o[l][u], o[l][u + 1], e, t, i, r));
        s.geometry.push(c);
      }
  }
  return n.transformed = !0, n;
}
function ci(n, e, t, i, r, s) {
  return [
    Math.round(t * (n * i - r)),
    Math.round(t * (e * i - s))
  ];
}
function tc(n, e, t, i, r) {
  const s = e === r.maxZoom ? 0 : r.tolerance / ((1 << e) * r.extent), o = {
    features: [],
    numPoints: 0,
    numSimplified: 0,
    numFeatures: n.length,
    source: null,
    x: t,
    y: i,
    z: e,
    transformed: !1,
    minX: 2,
    minY: 1,
    maxX: -1,
    maxY: 0
  };
  for (const a of n)
    nc(o, a, s, r);
  return o;
}
function nc(n, e, t, i) {
  const r = e.geometry, s = e.type, o = [];
  if (n.minX = Math.min(n.minX, e.minX), n.minY = Math.min(n.minY, e.minY), n.maxX = Math.max(n.maxX, e.maxX), n.maxY = Math.max(n.maxY, e.maxY), s === "Point" || s === "MultiPoint")
    for (let a = 0; a < r.length; a += 3)
      o.push(r[a], r[a + 1]), n.numPoints++, n.numSimplified++;
  else if (s === "LineString")
    En(o, r, n, t, !1, !1);
  else if (s === "MultiLineString" || s === "Polygon")
    for (let a = 0; a < r.length; a++)
      En(o, r[a], n, t, s === "Polygon", a === 0);
  else if (s === "MultiPolygon")
    for (let a = 0; a < r.length; a++) {
      const l = r[a];
      for (let c = 0; c < l.length; c++)
        En(o, l[c], n, t, !0, c === 0);
    }
  if (o.length) {
    let a = e.tags || null;
    if (s === "LineString" && i.lineMetrics) {
      a = {};
      for (const c in e.tags) a[c] = e.tags[c];
      a.mapbox_clip_start = r.start / r.size, a.mapbox_clip_end = r.end / r.size;
    }
    const l = {
      geometry: o,
      type: s === "Polygon" || s === "MultiPolygon" ? 3 : s === "LineString" || s === "MultiLineString" ? 2 : 1,
      tags: a
    };
    e.id !== null && (l.id = e.id), n.features.push(l);
  }
}
function En(n, e, t, i, r, s) {
  const o = i * i;
  if (i > 0 && e.size < (r ? o : i)) {
    t.numPoints += e.length / 3;
    return;
  }
  const a = [];
  for (let l = 0; l < e.length; l += 3)
    (i === 0 || e[l + 2] > o) && (t.numSimplified++, a.push(e[l], e[l + 1])), t.numPoints++;
  r && rc(a, s), n.push(a);
}
function rc(n, e) {
  let t = 0;
  for (let i = 0, r = n.length, s = r - 2; i < r; s = i, i += 2)
    t += (n[i] - n[s]) * (n[i + 1] + n[s + 1]);
  if (t > 0 === e)
    for (let i = 0, r = n.length; i < r / 2; i += 2) {
      const s = n[i], o = n[i + 1];
      n[i] = n[r - 2 - i], n[i + 1] = n[r - 1 - i], n[r - 2 - i] = s, n[r - 1 - i] = o;
    }
}
const ic = {
  maxZoom: 14,
  // max zoom to preserve detail on
  indexMaxZoom: 5,
  // max zoom in the tile index
  indexMaxPoints: 1e5,
  // max number of points per tile in the tile index
  tolerance: 3,
  // simplification tolerance (higher means simpler)
  extent: 4096,
  // tile extent
  buffer: 64,
  // tile buffer on each side
  lineMetrics: !1,
  // whether to calculate line metrics
  promoteId: null,
  // name of a feature property to be promoted to feature.id
  generateId: !1,
  // whether to generate feature ids. Cannot be used with promoteId
  debug: 0
  // logging level (0, 1 or 2)
};
class sc {
  constructor(e, t) {
    t = this.options = oc(Object.create(ic), t);
    const i = t.debug;
    if (i && console.time("preprocess data"), t.maxZoom < 0 || t.maxZoom > 24) throw new Error("maxZoom should be in the 0-24 range");
    if (t.promoteId && t.generateId) throw new Error("promoteId and generateId cannot be used together.");
    let r = Hl(e, t);
    this.tiles = {}, this.tileCoords = [], i && (console.timeEnd("preprocess data"), console.log("index: maxZoom: %d, maxPoints: %d", t.indexMaxZoom, t.indexMaxPoints), console.time("generate tiles"), this.stats = {}, this.total = 0), r = ec(r, t), r.length && this.splitTile(r, 0, 0, 0), i && (r.length && console.log("features: %d, points: %d", this.tiles[0].numFeatures, this.tiles[0].numPoints), console.timeEnd("generate tiles"), console.log("tiles generated:", this.total, JSON.stringify(this.stats)));
  }
  // splits features from a parent tile to sub-tiles.
  // z, x, and y are the coordinates of the parent tile
  // cz, cx, and cy are the coordinates of the target tile
  //
  // If no target tile is specified, splitting stops when we reach the maximum
  // zoom or the number of points is low as specified in the options.
  splitTile(e, t, i, r, s, o, a) {
    const l = [e, t, i, r], c = this.options, u = c.debug;
    for (; l.length; ) {
      r = l.pop(), i = l.pop(), t = l.pop(), e = l.pop();
      const f = 1 << t, h = kn(t, i, r);
      let p = this.tiles[h];
      if (!p && (u > 1 && console.time("creation"), p = this.tiles[h] = tc(e, t, i, r, c), this.tileCoords.push({ z: t, x: i, y: r }), u)) {
        u > 1 && (console.log(
          "tile z%d-%d-%d (features: %d, points: %d, simplified: %d)",
          t,
          i,
          r,
          p.numFeatures,
          p.numPoints,
          p.numSimplified
        ), console.timeEnd("creation"));
        const _ = `z${t}`;
        this.stats[_] = (this.stats[_] || 0) + 1, this.total++;
      }
      if (p.source = e, s == null) {
        if (t === c.indexMaxZoom || p.numPoints <= c.indexMaxPoints) continue;
      } else {
        if (t === c.maxZoom || t === s)
          continue;
        if (s != null) {
          const _ = s - t;
          if (i !== o >> _ || r !== a >> _) continue;
        }
      }
      if (p.source = null, e.length === 0) continue;
      u > 1 && console.time("clipping");
      const d = 0.5 * c.buffer / c.extent, y = 0.5 - d, m = 0.5 + d, x = 1 + d;
      let w = null, v = null, g = null, b = null, T = ge(e, f, i - d, i + m, 0, p.minX, p.maxX, c), I = ge(e, f, i + y, i + x, 0, p.minX, p.maxX, c);
      e = null, T && (w = ge(T, f, r - d, r + m, 1, p.minY, p.maxY, c), v = ge(T, f, r + y, r + x, 1, p.minY, p.maxY, c), T = null), I && (g = ge(I, f, r - d, r + m, 1, p.minY, p.maxY, c), b = ge(I, f, r + y, r + x, 1, p.minY, p.maxY, c), I = null), u > 1 && console.timeEnd("clipping"), l.push(w || [], t + 1, i * 2, r * 2), l.push(v || [], t + 1, i * 2, r * 2 + 1), l.push(g || [], t + 1, i * 2 + 1, r * 2), l.push(b || [], t + 1, i * 2 + 1, r * 2 + 1);
    }
  }
  getTile(e, t, i) {
    e = +e, t = +t, i = +i;
    const r = this.options, { extent: s, debug: o } = r;
    if (e < 0 || e > 24) return null;
    const a = 1 << e;
    t = t + a & a - 1;
    const l = kn(e, t, i);
    if (this.tiles[l]) return li(this.tiles[l], s);
    o > 1 && console.log("drilling down to z%d-%d-%d", e, t, i);
    let c = e, u = t, f = i, h;
    for (; !h && c > 0; )
      c--, u = u >> 1, f = f >> 1, h = this.tiles[kn(c, u, f)];
    return !h || !h.source ? null : (o > 1 && (console.log("found parent tile z%d-%d-%d", c, u, f), console.time("drilling down")), this.splitTile(h.source, c, u, f, e, t, i), o > 1 && console.timeEnd("drilling down"), this.tiles[l] ? li(this.tiles[l], s) : null);
  }
}
function kn(n, e, t) {
  return ((1 << n) * t + e) * 32 + n;
}
function oc(n, e) {
  for (const t in e) n[t] = e[t];
  return n;
}
function ac(n, e) {
  return new sc(n, e);
}
class lc {
  constructor(e, t) {
    this.feature = e, this.type = e.type, this.properties = e.tags ? e.tags : {}, this.extent = t, "id" in e && (typeof e.id == "string" ? this.id = parseInt(e.id, 10) : typeof e.id == "number" && !isNaN(e.id) && (this.id = e.id));
  }
  loadGeometry() {
    const e = [], t = this.feature.type === 1 ? [this.feature.geometry] : this.feature.geometry;
    for (const i of t) {
      const r = [];
      for (const s of i)
        r.push(new $(s[0], s[1]));
      e.push(r);
    }
    return e;
  }
}
const ui = "_geojsonTileLayer";
class cc {
  constructor(e, t) {
    this.layers = { [ui]: this }, this.name = ui, this.version = t ? t.version : 1, this.extent = t ? t.extent : 4096, this.length = e.length, this.features = e;
  }
  feature(e) {
    return new lc(this.features[e], this.extent);
  }
}
const re = 8192;
class uc extends Zi {
  constructor(e, t) {
    super(e, t);
  }
  async init() {
    const e = this.styleSource;
    let t = e.data;
    if (typeof t == "string") {
      const i = /^((http)|(https)|(data:)|\/)/.test(t) ? t : this.path + t;
      try {
        t = await Cesium.Resource.fetchJson(i);
      } catch (r) {
        this.errorEvent.raiseEvent(r);
      }
    }
    t && t.features?.length && (this.tileIndex = new ac(t, {
      extent: re,
      buffer: e.buffer === void 0 ? 128 : e.buffer,
      tolerance: e.tolerance === void 0 ? 0.375 : e.tolerance
    }));
  }
  async requestTile(e, t, i) {
    if (this.tileIndex)
      try {
        const r = this.tileIndex.getTile(i, e, t);
        return r ? new cc(r.features, {
          extent: re
        }) : void 0;
      } catch (r) {
        this.errorEvent.raiseEvent(r);
      }
  }
}
Xi("geojson", uc);
var fc = 8, hc = {
  version: {
    required: !0,
    type: "enum",
    values: [
      8
    ]
  },
  name: {
    type: "string"
  },
  metadata: {
    type: "*"
  },
  center: {
    type: "array",
    value: "number",
    length: 2
  },
  centerAltitude: {
    type: "number"
  },
  zoom: {
    type: "number"
  },
  bearing: {
    type: "number",
    default: 0,
    period: 360,
    units: "degrees"
  },
  pitch: {
    type: "number",
    default: 0,
    units: "degrees"
  },
  roll: {
    type: "number",
    default: 0,
    units: "degrees"
  },
  state: {
    type: "state",
    default: {}
  },
  light: {
    type: "light"
  },
  sky: {
    type: "sky"
  },
  projection: {
    type: "projection"
  },
  terrain: {
    type: "terrain"
  },
  sources: {
    required: !0,
    type: "sources"
  },
  sprite: {
    type: "sprite"
  },
  glyphs: {
    type: "string"
  },
  "font-faces": {
    type: "fontFaces"
  },
  transition: {
    type: "transition"
  },
  layers: {
    required: !0,
    type: "array",
    value: "layer"
  }
}, pc = {
  "*": {
    type: "source"
  }
}, dc = [
  "source_vector",
  "source_raster",
  "source_raster_dem",
  "source_geojson",
  "source_video",
  "source_image"
], yc = {
  type: {
    required: !0,
    type: "enum",
    values: {
      vector: {}
    }
  },
  url: {
    type: "string"
  },
  tiles: {
    type: "array",
    value: "string"
  },
  bounds: {
    type: "array",
    value: "number",
    length: 4,
    default: [
      -180,
      -85.051129,
      180,
      85.051129
    ]
  },
  scheme: {
    type: "enum",
    values: {
      xyz: {},
      tms: {}
    },
    default: "xyz"
  },
  minzoom: {
    type: "number",
    default: 0
  },
  maxzoom: {
    type: "number",
    default: 22
  },
  attribution: {
    type: "string"
  },
  promoteId: {
    type: "promoteId"
  },
  volatile: {
    type: "boolean",
    default: !1
  },
  encoding: {
    type: "enum",
    values: {
      mvt: {},
      mlt: {}
    },
    default: "mvt"
  },
  "*": {
    type: "*"
  }
}, mc = {
  type: {
    required: !0,
    type: "enum",
    values: {
      raster: {}
    }
  },
  url: {
    type: "string"
  },
  tiles: {
    type: "array",
    value: "string"
  },
  bounds: {
    type: "array",
    value: "number",
    length: 4,
    default: [
      -180,
      -85.051129,
      180,
      85.051129
    ]
  },
  minzoom: {
    type: "number",
    default: 0
  },
  maxzoom: {
    type: "number",
    default: 22
  },
  tileSize: {
    type: "number",
    default: 512,
    units: "pixels"
  },
  scheme: {
    type: "enum",
    values: {
      xyz: {},
      tms: {}
    },
    default: "xyz"
  },
  attribution: {
    type: "string"
  },
  volatile: {
    type: "boolean",
    default: !1
  },
  "*": {
    type: "*"
  }
}, gc = {
  type: {
    required: !0,
    type: "enum",
    values: {
      "raster-dem": {}
    }
  },
  url: {
    type: "string"
  },
  tiles: {
    type: "array",
    value: "string"
  },
  bounds: {
    type: "array",
    value: "number",
    length: 4,
    default: [
      -180,
      -85.051129,
      180,
      85.051129
    ]
  },
  minzoom: {
    type: "number",
    default: 0
  },
  maxzoom: {
    type: "number",
    default: 22
  },
  tileSize: {
    type: "number",
    default: 512,
    units: "pixels"
  },
  attribution: {
    type: "string"
  },
  encoding: {
    type: "enum",
    values: {
      terrarium: {},
      mapbox: {},
      custom: {}
    },
    default: "mapbox"
  },
  redFactor: {
    type: "number",
    default: 1
  },
  blueFactor: {
    type: "number",
    default: 1
  },
  greenFactor: {
    type: "number",
    default: 1
  },
  baseShift: {
    type: "number",
    default: 0
  },
  volatile: {
    type: "boolean",
    default: !1
  },
  "*": {
    type: "*"
  }
}, xc = {
  type: {
    required: !0,
    type: "enum",
    values: {
      geojson: {}
    }
  },
  data: {
    required: !0,
    type: "*"
  },
  maxzoom: {
    type: "number",
    default: 18
  },
  attribution: {
    type: "string"
  },
  buffer: {
    type: "number",
    default: 128,
    maximum: 512,
    minimum: 0
  },
  filter: {
    type: "filter"
  },
  tolerance: {
    type: "number",
    default: 0.375
  },
  cluster: {
    type: "boolean",
    default: !1
  },
  clusterRadius: {
    type: "number",
    default: 50,
    minimum: 0
  },
  clusterMaxZoom: {
    type: "number"
  },
  clusterMinPoints: {
    type: "number"
  },
  clusterProperties: {
    type: "*"
  },
  lineMetrics: {
    type: "boolean",
    default: !1
  },
  generateId: {
    type: "boolean",
    default: !1
  },
  promoteId: {
    type: "promoteId"
  }
}, vc = {
  type: {
    required: !0,
    type: "enum",
    values: {
      video: {}
    }
  },
  urls: {
    required: !0,
    type: "array",
    value: "string"
  },
  coordinates: {
    required: !0,
    type: "array",
    length: 4,
    value: {
      type: "array",
      length: 2,
      value: "number"
    }
  }
}, bc = {
  type: {
    required: !0,
    type: "enum",
    values: {
      image: {}
    }
  },
  url: {
    required: !0,
    type: "string"
  },
  coordinates: {
    required: !0,
    type: "array",
    length: 4,
    value: {
      type: "array",
      length: 2,
      value: "number"
    }
  }
}, wc = {
  id: {
    type: "string",
    required: !0
  },
  type: {
    type: "enum",
    values: {
      fill: {},
      line: {},
      symbol: {},
      circle: {},
      heatmap: {},
      "fill-extrusion": {},
      raster: {},
      hillshade: {},
      "color-relief": {},
      background: {}
    },
    required: !0
  },
  metadata: {
    type: "*"
  },
  source: {
    type: "string"
  },
  "source-layer": {
    type: "string"
  },
  minzoom: {
    type: "number",
    minimum: 0,
    maximum: 24
  },
  maxzoom: {
    type: "number",
    minimum: 0,
    maximum: 24
  },
  filter: {
    type: "filter"
  },
  layout: {
    type: "layout"
  },
  paint: {
    type: "paint"
  }
}, Cc = [
  "layout_fill",
  "layout_line",
  "layout_circle",
  "layout_heatmap",
  "layout_fill-extrusion",
  "layout_symbol",
  "layout_raster",
  "layout_hillshade",
  "layout_color-relief",
  "layout_background"
], Tc = {
  visibility: {
    type: "enum",
    values: {
      visible: {},
      none: {}
    },
    default: "visible",
    expression: {
      interpolated: !1,
      parameters: [
        "global-state"
      ]
    },
    "property-type": "data-constant"
  }
}, Ic = {
  "fill-sort-key": {
    type: "number",
    expression: {
      interpolated: !1,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "data-driven"
  },
  visibility: {
    type: "enum",
    values: {
      visible: {},
      none: {}
    },
    default: "visible",
    expression: {
      interpolated: !1,
      parameters: [
        "global-state"
      ]
    },
    "property-type": "data-constant"
  }
}, _c = {
  "circle-sort-key": {
    type: "number",
    expression: {
      interpolated: !1,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "data-driven"
  },
  visibility: {
    type: "enum",
    values: {
      visible: {},
      none: {}
    },
    default: "visible",
    expression: {
      interpolated: !1,
      parameters: [
        "global-state"
      ]
    },
    "property-type": "data-constant"
  }
}, Sc = {
  visibility: {
    type: "enum",
    values: {
      visible: {},
      none: {}
    },
    default: "visible",
    expression: {
      interpolated: !1,
      parameters: [
        "global-state"
      ]
    },
    "property-type": "data-constant"
  }
}, Lc = {
  "line-cap": {
    type: "enum",
    values: {
      butt: {},
      round: {},
      square: {}
    },
    default: "butt",
    expression: {
      interpolated: !1,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "data-driven"
  },
  "line-join": {
    type: "enum",
    values: {
      bevel: {},
      round: {},
      miter: {}
    },
    default: "miter",
    expression: {
      interpolated: !1,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "data-driven"
  },
  "line-miter-limit": {
    type: "number",
    default: 2,
    requires: [
      {
        "line-join": "miter"
      }
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "data-driven"
  },
  "line-round-limit": {
    type: "number",
    default: 1.05,
    requires: [
      {
        "line-join": "round"
      }
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "data-driven"
  },
  "line-sort-key": {
    type: "number",
    expression: {
      interpolated: !1,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "data-driven"
  },
  visibility: {
    type: "enum",
    values: {
      visible: {},
      none: {}
    },
    default: "visible",
    expression: {
      interpolated: !1,
      parameters: [
        "global-state"
      ]
    },
    "property-type": "data-constant"
  }
}, Ec = {
  "symbol-placement": {
    type: "enum",
    values: {
      point: {},
      line: {},
      "line-center": {}
    },
    default: "point",
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "symbol-spacing": {
    type: "number",
    default: 250,
    minimum: 1,
    units: "pixels",
    requires: [
      {
        "symbol-placement": "line"
      }
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "symbol-avoid-edges": {
    type: "boolean",
    default: !1,
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "symbol-sort-key": {
    type: "number",
    expression: {
      interpolated: !1,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "data-driven"
  },
  "symbol-z-order": {
    type: "enum",
    values: {
      auto: {},
      "viewport-y": {},
      source: {}
    },
    default: "auto",
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "icon-allow-overlap": {
    type: "boolean",
    default: !1,
    requires: [
      "icon-image",
      {
        "!": "icon-overlap"
      }
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "icon-overlap": {
    type: "enum",
    values: {
      never: {},
      always: {},
      cooperative: {}
    },
    requires: [
      "icon-image"
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "icon-ignore-placement": {
    type: "boolean",
    default: !1,
    requires: [
      "icon-image"
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "icon-optional": {
    type: "boolean",
    default: !1,
    requires: [
      "icon-image",
      "text-field"
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "icon-rotation-alignment": {
    type: "enum",
    values: {
      map: {},
      viewport: {},
      auto: {}
    },
    default: "auto",
    requires: [
      "icon-image"
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "icon-size": {
    type: "number",
    default: 1,
    minimum: 0,
    units: "factor of the original icon size",
    requires: [
      "icon-image"
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "data-driven"
  },
  "icon-text-fit": {
    type: "enum",
    values: {
      none: {},
      width: {},
      height: {},
      both: {}
    },
    default: "none",
    requires: [
      "icon-image",
      "text-field"
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "icon-text-fit-padding": {
    type: "array",
    value: "number",
    length: 4,
    default: [
      0,
      0,
      0,
      0
    ],
    units: "pixels",
    requires: [
      "icon-image",
      "text-field",
      {
        "icon-text-fit": [
          "both",
          "width",
          "height"
        ]
      }
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "icon-image": {
    type: "resolvedImage",
    tokens: !0,
    expression: {
      interpolated: !1,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "data-driven"
  },
  "icon-rotate": {
    type: "number",
    default: 0,
    period: 360,
    units: "degrees",
    requires: [
      "icon-image"
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "data-driven"
  },
  "icon-padding": {
    type: "padding",
    default: [
      2
    ],
    units: "pixels",
    requires: [
      "icon-image"
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "data-driven"
  },
  "icon-keep-upright": {
    type: "boolean",
    default: !1,
    requires: [
      "icon-image",
      {
        "icon-rotation-alignment": "map"
      },
      {
        "symbol-placement": [
          "line",
          "line-center"
        ]
      }
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "icon-offset": {
    type: "array",
    value: "number",
    length: 2,
    default: [
      0,
      0
    ],
    requires: [
      "icon-image"
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "data-driven"
  },
  "icon-anchor": {
    type: "enum",
    values: {
      center: {},
      left: {},
      right: {},
      top: {},
      bottom: {},
      "top-left": {},
      "top-right": {},
      "bottom-left": {},
      "bottom-right": {}
    },
    default: "center",
    requires: [
      "icon-image"
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "data-driven"
  },
  "icon-pitch-alignment": {
    type: "enum",
    values: {
      map: {},
      viewport: {},
      auto: {}
    },
    default: "auto",
    requires: [
      "icon-image"
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "text-pitch-alignment": {
    type: "enum",
    values: {
      map: {},
      viewport: {},
      auto: {}
    },
    default: "auto",
    requires: [
      "text-field"
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "text-rotation-alignment": {
    type: "enum",
    values: {
      map: {},
      viewport: {},
      "viewport-glyph": {},
      auto: {}
    },
    default: "auto",
    requires: [
      "text-field"
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "text-field": {
    type: "formatted",
    default: "",
    tokens: !0,
    expression: {
      interpolated: !1,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "data-driven"
  },
  "text-font": {
    type: "array",
    value: "string",
    default: [
      "Open Sans Regular",
      "Arial Unicode MS Regular"
    ],
    requires: [
      "text-field"
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "data-driven"
  },
  "text-size": {
    type: "number",
    default: 16,
    minimum: 0,
    units: "pixels",
    requires: [
      "text-field"
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "data-driven"
  },
  "text-max-width": {
    type: "number",
    default: 10,
    minimum: 0,
    units: "ems",
    requires: [
      "text-field"
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "data-driven"
  },
  "text-line-height": {
    type: "number",
    default: 1.2,
    units: "ems",
    requires: [
      "text-field"
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "text-letter-spacing": {
    type: "number",
    default: 0,
    units: "ems",
    requires: [
      "text-field"
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "data-driven"
  },
  "text-justify": {
    type: "enum",
    values: {
      auto: {},
      left: {},
      center: {},
      right: {}
    },
    default: "center",
    requires: [
      "text-field"
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "data-driven"
  },
  "text-radial-offset": {
    type: "number",
    units: "ems",
    default: 0,
    requires: [
      "text-field"
    ],
    "property-type": "data-driven",
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature"
      ]
    }
  },
  "text-variable-anchor": {
    type: "array",
    value: "enum",
    values: {
      center: {},
      left: {},
      right: {},
      top: {},
      bottom: {},
      "top-left": {},
      "top-right": {},
      "bottom-left": {},
      "bottom-right": {}
    },
    requires: [
      "text-field",
      {
        "symbol-placement": [
          "point"
        ]
      }
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "text-variable-anchor-offset": {
    type: "variableAnchorOffsetCollection",
    requires: [
      "text-field",
      {
        "symbol-placement": [
          "point"
        ]
      }
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "data-driven"
  },
  "text-anchor": {
    type: "enum",
    values: {
      center: {},
      left: {},
      right: {},
      top: {},
      bottom: {},
      "top-left": {},
      "top-right": {},
      "bottom-left": {},
      "bottom-right": {}
    },
    default: "center",
    requires: [
      "text-field",
      {
        "!": "text-variable-anchor"
      }
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "data-driven"
  },
  "text-max-angle": {
    type: "number",
    default: 45,
    units: "degrees",
    requires: [
      "text-field",
      {
        "symbol-placement": [
          "line",
          "line-center"
        ]
      }
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "text-writing-mode": {
    type: "array",
    value: "enum",
    values: {
      horizontal: {},
      vertical: {}
    },
    requires: [
      "text-field",
      {
        "symbol-placement": [
          "point"
        ]
      }
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "text-rotate": {
    type: "number",
    default: 0,
    period: 360,
    units: "degrees",
    requires: [
      "text-field"
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "data-driven"
  },
  "text-padding": {
    type: "number",
    default: 2,
    minimum: 0,
    units: "pixels",
    requires: [
      "text-field"
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "text-keep-upright": {
    type: "boolean",
    default: !0,
    requires: [
      "text-field",
      {
        "text-rotation-alignment": "map"
      },
      {
        "symbol-placement": [
          "line",
          "line-center"
        ]
      }
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "text-transform": {
    type: "enum",
    values: {
      none: {},
      uppercase: {},
      lowercase: {}
    },
    default: "none",
    requires: [
      "text-field"
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "data-driven"
  },
  "text-offset": {
    type: "array",
    value: "number",
    units: "ems",
    length: 2,
    default: [
      0,
      0
    ],
    requires: [
      "text-field",
      {
        "!": "text-radial-offset"
      }
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "data-driven"
  },
  "text-allow-overlap": {
    type: "boolean",
    default: !1,
    requires: [
      "text-field",
      {
        "!": "text-overlap"
      }
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "text-overlap": {
    type: "enum",
    values: {
      never: {},
      always: {},
      cooperative: {}
    },
    requires: [
      "text-field"
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "text-ignore-placement": {
    type: "boolean",
    default: !1,
    requires: [
      "text-field"
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "text-optional": {
    type: "boolean",
    default: !1,
    requires: [
      "text-field",
      "icon-image"
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  visibility: {
    type: "enum",
    values: {
      visible: {},
      none: {}
    },
    default: "visible",
    expression: {
      interpolated: !1,
      parameters: [
        "global-state"
      ]
    },
    "property-type": "data-constant"
  }
}, kc = {
  visibility: {
    type: "enum",
    values: {
      visible: {},
      none: {}
    },
    default: "visible",
    expression: {
      interpolated: !1,
      parameters: [
        "global-state"
      ]
    },
    "property-type": "data-constant"
  }
}, Fc = {
  visibility: {
    type: "enum",
    values: {
      visible: {},
      none: {}
    },
    default: "visible",
    expression: {
      interpolated: !1,
      parameters: [
        "global-state"
      ]
    },
    "property-type": "data-constant"
  }
}, Ac = {
  type: "boolean",
  expression: {
    interpolated: !1,
    parameters: [
      "zoom",
      "feature"
    ]
  },
  "property-type": "data-driven"
}, zc = {
  type: "enum",
  values: {
    "==": {},
    "!=": {},
    ">": {},
    ">=": {},
    "<": {},
    "<=": {},
    in: {},
    "!in": {},
    all: {},
    any: {},
    none: {},
    has: {},
    "!has": {}
  }
}, Oc = {
  type: "enum",
  values: {
    Point: {},
    LineString: {},
    Polygon: {}
  }
}, Mc = {
  type: "array",
  minimum: 0,
  maximum: 24,
  value: [
    "number",
    "color"
  ],
  length: 2
}, Dc = {
  type: "array",
  value: "expression_name",
  minimum: 1
}, Nc = {
  anchor: {
    type: "enum",
    default: "viewport",
    values: {
      map: {},
      viewport: {}
    },
    "property-type": "data-constant",
    transition: !1,
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    }
  },
  position: {
    type: "array",
    default: [
      1.15,
      210,
      30
    ],
    length: 3,
    value: "number",
    "property-type": "data-constant",
    transition: !0,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    }
  },
  color: {
    type: "color",
    "property-type": "data-constant",
    default: "#ffffff",
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    transition: !0
  },
  intensity: {
    type: "number",
    "property-type": "data-constant",
    default: 0.5,
    minimum: 0,
    maximum: 1,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    transition: !0
  }
}, Pc = {
  "sky-color": {
    type: "color",
    "property-type": "data-constant",
    default: "#88C6FC",
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    transition: !0
  },
  "horizon-color": {
    type: "color",
    "property-type": "data-constant",
    default: "#ffffff",
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    transition: !0
  },
  "fog-color": {
    type: "color",
    "property-type": "data-constant",
    default: "#ffffff",
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    transition: !0
  },
  "fog-ground-blend": {
    type: "number",
    "property-type": "data-constant",
    default: 0.5,
    minimum: 0,
    maximum: 1,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    transition: !0
  },
  "horizon-fog-blend": {
    type: "number",
    "property-type": "data-constant",
    default: 0.8,
    minimum: 0,
    maximum: 1,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    transition: !0
  },
  "sky-horizon-blend": {
    type: "number",
    "property-type": "data-constant",
    default: 0.8,
    minimum: 0,
    maximum: 1,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    transition: !0
  },
  "atmosphere-blend": {
    type: "number",
    "property-type": "data-constant",
    default: 0.8,
    minimum: 0,
    maximum: 1,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    transition: !0
  }
}, Bc = {
  source: {
    type: "string",
    required: !0
  },
  exaggeration: {
    type: "number",
    minimum: 0,
    default: 1
  }
}, Rc = {
  type: {
    type: "projectionDefinition",
    default: "mercator",
    "property-type": "data-constant",
    transition: !1,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    }
  }
}, $c = [
  "paint_fill",
  "paint_line",
  "paint_circle",
  "paint_heatmap",
  "paint_fill-extrusion",
  "paint_symbol",
  "paint_raster",
  "paint_hillshade",
  "paint_color-relief",
  "paint_background"
], Vc = {
  "fill-antialias": {
    type: "boolean",
    default: !0,
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "fill-opacity": {
    type: "number",
    default: 1,
    minimum: 0,
    maximum: 1,
    transition: !0,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  },
  "fill-color": {
    type: "color",
    default: "#000000",
    transition: !0,
    requires: [
      {
        "!": "fill-pattern"
      }
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  },
  "fill-outline-color": {
    type: "color",
    transition: !0,
    requires: [
      {
        "!": "fill-pattern"
      },
      {
        "fill-antialias": !0
      }
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  },
  "fill-translate": {
    type: "array",
    value: "number",
    length: 2,
    default: [
      0,
      0
    ],
    transition: !0,
    units: "pixels",
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "fill-translate-anchor": {
    type: "enum",
    values: {
      map: {},
      viewport: {}
    },
    default: "map",
    requires: [
      "fill-translate"
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "fill-pattern": {
    type: "resolvedImage",
    transition: !0,
    expression: {
      interpolated: !1,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "cross-faded-data-driven"
  }
}, Uc = {
  "line-opacity": {
    type: "number",
    default: 1,
    minimum: 0,
    maximum: 1,
    transition: !0,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  },
  "line-color": {
    type: "color",
    default: "#000000",
    transition: !0,
    requires: [
      {
        "!": "line-pattern"
      }
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  },
  "line-translate": {
    type: "array",
    value: "number",
    length: 2,
    default: [
      0,
      0
    ],
    transition: !0,
    units: "pixels",
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "line-translate-anchor": {
    type: "enum",
    values: {
      map: {},
      viewport: {}
    },
    default: "map",
    requires: [
      "line-translate"
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "line-width": {
    type: "number",
    default: 1,
    minimum: 0,
    transition: !0,
    units: "pixels",
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  },
  "line-gap-width": {
    type: "number",
    default: 0,
    minimum: 0,
    transition: !0,
    units: "pixels",
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  },
  "line-offset": {
    type: "number",
    default: 0,
    transition: !0,
    units: "pixels",
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  },
  "line-blur": {
    type: "number",
    default: 0,
    minimum: 0,
    transition: !0,
    units: "pixels",
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  },
  "line-dasharray": {
    type: "array",
    value: "number",
    minimum: 0,
    transition: !0,
    units: "line widths",
    requires: [
      {
        "!": "line-pattern"
      }
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "cross-faded-data-driven"
  },
  "line-pattern": {
    type: "resolvedImage",
    transition: !0,
    expression: {
      interpolated: !1,
      parameters: [
        "zoom",
        "feature"
      ]
    },
    "property-type": "cross-faded-data-driven"
  },
  "line-gradient": {
    type: "color",
    transition: !1,
    requires: [
      {
        "!": "line-dasharray"
      },
      {
        "!": "line-pattern"
      },
      {
        source: "geojson",
        has: {
          lineMetrics: !0
        }
      }
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "line-progress"
      ]
    },
    "property-type": "color-ramp"
  }
}, Gc = {
  "circle-radius": {
    type: "number",
    default: 5,
    minimum: 0,
    transition: !0,
    units: "pixels",
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  },
  "circle-color": {
    type: "color",
    default: "#000000",
    transition: !0,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  },
  "circle-blur": {
    type: "number",
    default: 0,
    transition: !0,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  },
  "circle-opacity": {
    type: "number",
    default: 1,
    minimum: 0,
    maximum: 1,
    transition: !0,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  },
  "circle-translate": {
    type: "array",
    value: "number",
    length: 2,
    default: [
      0,
      0
    ],
    transition: !0,
    units: "pixels",
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "circle-translate-anchor": {
    type: "enum",
    values: {
      map: {},
      viewport: {}
    },
    default: "map",
    requires: [
      "circle-translate"
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "circle-pitch-scale": {
    type: "enum",
    values: {
      map: {},
      viewport: {}
    },
    default: "map",
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "circle-pitch-alignment": {
    type: "enum",
    values: {
      map: {},
      viewport: {}
    },
    default: "viewport",
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "circle-stroke-width": {
    type: "number",
    default: 0,
    minimum: 0,
    transition: !0,
    units: "pixels",
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  },
  "circle-stroke-color": {
    type: "color",
    default: "#000000",
    transition: !0,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  },
  "circle-stroke-opacity": {
    type: "number",
    default: 1,
    minimum: 0,
    maximum: 1,
    transition: !0,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  }
}, qc = {
  "heatmap-radius": {
    type: "number",
    default: 30,
    minimum: 1,
    transition: !0,
    units: "pixels",
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  },
  "heatmap-weight": {
    type: "number",
    default: 1,
    minimum: 0,
    transition: !1,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  },
  "heatmap-intensity": {
    type: "number",
    default: 1,
    minimum: 0,
    transition: !0,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "heatmap-color": {
    type: "color",
    default: [
      "interpolate",
      [
        "linear"
      ],
      [
        "heatmap-density"
      ],
      0,
      "rgba(0, 0, 255, 0)",
      0.1,
      "royalblue",
      0.3,
      "cyan",
      0.5,
      "lime",
      0.7,
      "yellow",
      1,
      "red"
    ],
    transition: !1,
    expression: {
      interpolated: !0,
      parameters: [
        "heatmap-density"
      ]
    },
    "property-type": "color-ramp"
  },
  "heatmap-opacity": {
    type: "number",
    default: 1,
    minimum: 0,
    maximum: 1,
    transition: !0,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  }
}, jc = {
  "icon-opacity": {
    type: "number",
    default: 1,
    minimum: 0,
    maximum: 1,
    transition: !0,
    requires: [
      "icon-image"
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  },
  "icon-color": {
    type: "color",
    default: "#000000",
    transition: !0,
    requires: [
      "icon-image"
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  },
  "icon-halo-color": {
    type: "color",
    default: "rgba(0, 0, 0, 0)",
    transition: !0,
    requires: [
      "icon-image"
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  },
  "icon-halo-width": {
    type: "number",
    default: 0,
    minimum: 0,
    transition: !0,
    units: "pixels",
    requires: [
      "icon-image"
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  },
  "icon-halo-blur": {
    type: "number",
    default: 0,
    minimum: 0,
    transition: !0,
    units: "pixels",
    requires: [
      "icon-image"
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  },
  "icon-translate": {
    type: "array",
    value: "number",
    length: 2,
    default: [
      0,
      0
    ],
    transition: !0,
    units: "pixels",
    requires: [
      "icon-image"
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "icon-translate-anchor": {
    type: "enum",
    values: {
      map: {},
      viewport: {}
    },
    default: "map",
    requires: [
      "icon-image",
      "icon-translate"
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "text-opacity": {
    type: "number",
    default: 1,
    minimum: 0,
    maximum: 1,
    transition: !0,
    requires: [
      "text-field"
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  },
  "text-color": {
    type: "color",
    default: "#000000",
    transition: !0,
    overridable: !0,
    requires: [
      "text-field"
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  },
  "text-halo-color": {
    type: "color",
    default: "rgba(0, 0, 0, 0)",
    transition: !0,
    requires: [
      "text-field"
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  },
  "text-halo-width": {
    type: "number",
    default: 0,
    minimum: 0,
    transition: !0,
    units: "pixels",
    requires: [
      "text-field"
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  },
  "text-halo-blur": {
    type: "number",
    default: 0,
    minimum: 0,
    transition: !0,
    units: "pixels",
    requires: [
      "text-field"
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom",
        "feature",
        "feature-state"
      ]
    },
    "property-type": "data-driven"
  },
  "text-translate": {
    type: "array",
    value: "number",
    length: 2,
    default: [
      0,
      0
    ],
    transition: !0,
    units: "pixels",
    requires: [
      "text-field"
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "text-translate-anchor": {
    type: "enum",
    values: {
      map: {},
      viewport: {}
    },
    default: "map",
    requires: [
      "text-field",
      "text-translate"
    ],
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  }
}, Zc = {
  "raster-opacity": {
    type: "number",
    default: 1,
    minimum: 0,
    maximum: 1,
    transition: !0,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "raster-hue-rotate": {
    type: "number",
    default: 0,
    period: 360,
    transition: !0,
    units: "degrees",
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "raster-brightness-min": {
    type: "number",
    default: 0,
    minimum: 0,
    maximum: 1,
    transition: !0,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "raster-brightness-max": {
    type: "number",
    default: 1,
    minimum: 0,
    maximum: 1,
    transition: !0,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "raster-saturation": {
    type: "number",
    default: 0,
    minimum: -1,
    maximum: 1,
    transition: !0,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "raster-contrast": {
    type: "number",
    default: 0,
    minimum: -1,
    maximum: 1,
    transition: !0,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  resampling: {
    type: "enum",
    values: {
      linear: {},
      nearest: {}
    },
    default: "linear",
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "raster-resampling": {
    type: "enum",
    values: {
      linear: {},
      nearest: {}
    },
    default: "linear",
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "raster-fade-duration": {
    type: "number",
    default: 300,
    minimum: 0,
    transition: !1,
    units: "milliseconds",
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  }
}, Wc = {
  "hillshade-illumination-direction": {
    type: "numberArray",
    default: 335,
    minimum: 0,
    maximum: 359,
    transition: !1,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "hillshade-illumination-altitude": {
    type: "numberArray",
    default: 45,
    minimum: 0,
    maximum: 90,
    transition: !1,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "hillshade-illumination-anchor": {
    type: "enum",
    values: {
      map: {},
      viewport: {}
    },
    default: "viewport",
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "hillshade-exaggeration": {
    type: "number",
    default: 0.5,
    minimum: 0,
    maximum: 1,
    transition: !0,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "hillshade-shadow-color": {
    type: "colorArray",
    default: "#000000",
    transition: !0,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "hillshade-highlight-color": {
    type: "colorArray",
    default: "#FFFFFF",
    transition: !0,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "hillshade-accent-color": {
    type: "color",
    default: "#000000",
    transition: !0,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "hillshade-method": {
    type: "enum",
    values: {
      standard: {},
      basic: {},
      combined: {},
      igor: {},
      multidirectional: {}
    },
    default: "standard",
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  resampling: {
    type: "enum",
    values: {
      linear: {},
      nearest: {}
    },
    default: "linear",
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  }
}, Xc = {
  "background-color": {
    type: "color",
    default: "#000000",
    transition: !0,
    requires: [
      {
        "!": "background-pattern"
      }
    ],
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  },
  "background-pattern": {
    type: "resolvedImage",
    transition: !0,
    expression: {
      interpolated: !1,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "cross-faded"
  },
  "background-opacity": {
    type: "number",
    default: 1,
    minimum: 0,
    maximum: 1,
    transition: !0,
    expression: {
      interpolated: !0,
      parameters: [
        "zoom"
      ]
    },
    "property-type": "data-constant"
  }
}, Yc = {
  duration: {
    type: "number",
    default: 300,
    minimum: 0,
    units: "milliseconds"
  },
  delay: {
    type: "number",
    default: 0,
    minimum: 0,
    units: "milliseconds"
  }
}, Hc = {
  "*": {
    type: "string"
  }
}, Jc = {
  type: "array",
  value: "interpolation_name",
  minimum: 1
}, Kc = {
  type: "enum",
  values: {
    linear: {
      syntax: {
        overloads: [
          {
            parameters: [],
            "output-type": "interpolation"
          }
        ],
        parameters: []
      }
    },
    exponential: {
      syntax: {
        overloads: [
          {
            parameters: [
              "base"
            ],
            "output-type": "interpolation"
          }
        ],
        parameters: [
          {
            name: "base",
            type: "number literal"
          }
        ]
      }
    },
    "cubic-bezier": {
      syntax: {
        overloads: [
          {
            parameters: [
              "x1",
              "y1",
              "x2",
              "y2"
            ],
            "output-type": "interpolation"
          }
        ],
        parameters: [
          {
            name: "x1",
            type: "number literal"
          },
          {
            name: "y1",
            type: "number literal"
          },
          {
            name: "x2",
            type: "number literal"
          },
          {
            name: "y2",
            type: "number literal"
          }
        ]
      }
    }
  }
}, fi = {
  $version: fc,
  $root: hc,
  sources: pc,
  source: dc,
  source_vector: yc,
  source_raster: mc,
  source_raster_dem: gc,
  source_geojson: xc,
  source_video: vc,
  source_image: bc,
  layer: wc,
  layout: Cc,
  layout_background: Tc,
  layout_fill: Ic,
  layout_circle: _c,
  layout_heatmap: Sc,
  "layout_fill-extrusion": {
    visibility: {
      type: "enum",
      values: {
        visible: {},
        none: {}
      },
      default: "visible",
      expression: {
        interpolated: !1,
        parameters: [
          "global-state"
        ]
      },
      "property-type": "data-constant"
    }
  },
  layout_line: Lc,
  layout_symbol: Ec,
  layout_raster: kc,
  layout_hillshade: Fc,
  "layout_color-relief": {
    visibility: {
      type: "enum",
      values: {
        visible: {},
        none: {}
      },
      default: "visible",
      expression: {
        interpolated: !1,
        parameters: [
          "global-state"
        ]
      },
      "property-type": "data-constant"
    }
  },
  filter: Ac,
  filter_operator: zc,
  geometry_type: Oc,
  function: {
    expression: {
      type: "expression"
    },
    stops: {
      type: "array",
      value: "function_stop"
    },
    base: {
      type: "number",
      default: 1,
      minimum: 0
    },
    property: {
      type: "string",
      default: "$zoom"
    },
    type: {
      type: "enum",
      values: {
        identity: {},
        exponential: {},
        interval: {},
        categorical: {}
      },
      default: "exponential"
    },
    colorSpace: {
      type: "enum",
      values: {
        rgb: {},
        lab: {},
        hcl: {}
      },
      default: "rgb"
    },
    default: {
      type: "*",
      required: !1
    }
  },
  function_stop: Mc,
  expression: Dc,
  light: Nc,
  sky: Pc,
  terrain: Bc,
  projection: Rc,
  paint: $c,
  paint_fill: Vc,
  "paint_fill-extrusion": {
    "fill-extrusion-opacity": {
      type: "number",
      default: 1,
      minimum: 0,
      maximum: 1,
      transition: !0,
      expression: {
        interpolated: !0,
        parameters: [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "fill-extrusion-color": {
      type: "color",
      default: "#000000",
      transition: !0,
      requires: [
        {
          "!": "fill-extrusion-pattern"
        }
      ],
      expression: {
        interpolated: !0,
        parameters: [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "fill-extrusion-translate": {
      type: "array",
      value: "number",
      length: 2,
      default: [
        0,
        0
      ],
      transition: !0,
      units: "pixels",
      expression: {
        interpolated: !0,
        parameters: [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "fill-extrusion-translate-anchor": {
      type: "enum",
      values: {
        map: {},
        viewport: {}
      },
      default: "map",
      requires: [
        "fill-extrusion-translate"
      ],
      expression: {
        interpolated: !1,
        parameters: [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "fill-extrusion-pattern": {
      type: "resolvedImage",
      transition: !0,
      expression: {
        interpolated: !1,
        parameters: [
          "zoom",
          "feature"
        ]
      },
      "property-type": "cross-faded-data-driven"
    },
    "fill-extrusion-height": {
      type: "number",
      default: 0,
      minimum: 0,
      units: "meters",
      transition: !0,
      expression: {
        interpolated: !0,
        parameters: [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "fill-extrusion-base": {
      type: "number",
      default: 0,
      minimum: 0,
      units: "meters",
      transition: !0,
      requires: [
        "fill-extrusion-height"
      ],
      expression: {
        interpolated: !0,
        parameters: [
          "zoom",
          "feature",
          "feature-state"
        ]
      },
      "property-type": "data-driven"
    },
    "fill-extrusion-vertical-gradient": {
      type: "boolean",
      default: !0,
      transition: !1,
      expression: {
        interpolated: !1,
        parameters: [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    }
  },
  paint_line: Uc,
  paint_circle: Gc,
  paint_heatmap: qc,
  paint_symbol: jc,
  paint_raster: Zc,
  paint_hillshade: Wc,
  "paint_color-relief": {
    "color-relief-opacity": {
      type: "number",
      default: 1,
      minimum: 0,
      maximum: 1,
      transition: !0,
      expression: {
        interpolated: !0,
        parameters: [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    },
    "color-relief-color": {
      type: "color",
      transition: !1,
      expression: {
        interpolated: !0,
        parameters: [
          "elevation"
        ]
      },
      "property-type": "color-ramp"
    },
    resampling: {
      type: "enum",
      values: {
        linear: {},
        nearest: {}
      },
      default: "linear",
      expression: {
        interpolated: !1,
        parameters: [
          "zoom"
        ]
      },
      "property-type": "data-constant"
    }
  },
  paint_background: Xc,
  transition: Yc,
  "property-type": {
    "data-driven": {
      type: "property-type"
    },
    "cross-faded": {
      type: "property-type"
    },
    "cross-faded-data-driven": {
      type: "property-type"
    },
    "color-ramp": {
      type: "property-type"
    },
    "data-constant": {
      type: "property-type"
    },
    constant: {
      type: "property-type"
    }
  },
  promoteId: Hc,
  interpolation: Jc,
  interpolation_name: Kc
};
function vs(n, ...e) {
  for (const t of e)
    for (const i in t)
      n[i] = t[i];
  return n;
}
class fe extends Error {
  constructor(e, t) {
    super(t), this.message = t, this.key = e;
  }
}
class br {
  constructor(e, t = []) {
    this.parent = e, this.bindings = {};
    for (const [i, r] of t)
      this.bindings[i] = r;
  }
  concat(e) {
    return new br(this, e);
  }
  get(e) {
    if (this.bindings[e])
      return this.bindings[e];
    if (this.parent)
      return this.parent.get(e);
    throw new Error(`${e} not found in scope.`);
  }
  has(e) {
    return this.bindings[e] ? !0 : this.parent ? this.parent.has(e) : !1;
  }
}
const sn = { kind: "null" }, C = { kind: "number" }, S = { kind: "string" }, k = { kind: "boolean" }, he = { kind: "color" }, on = {
  kind: "projectionDefinition"
}, De = { kind: "object" }, E = { kind: "value" }, Qc = { kind: "error" }, an = { kind: "collator" }, ln = { kind: "formatted" }, cn = { kind: "padding" }, mt = { kind: "colorArray" }, un = { kind: "numberArray" }, St = { kind: "resolvedImage" }, fn = {
  kind: "variableAnchorOffsetCollection"
};
function H(n, e) {
  return {
    kind: "array",
    itemType: n,
    N: e
  };
}
function N(n) {
  if (n.kind === "array") {
    const e = N(n.itemType);
    return typeof n.N == "number" ? `array<${e}, ${n.N}>` : n.itemType.kind === "value" ? "array" : `array<${e}>`;
  } else
    return n.kind;
}
const eu = [
  sn,
  C,
  S,
  k,
  he,
  on,
  ln,
  De,
  H(E),
  cn,
  un,
  mt,
  St,
  fn
];
function gt(n, e) {
  if (e.kind === "error")
    return null;
  if (n.kind === "array") {
    if (e.kind === "array" && (e.N === 0 && e.itemType.kind === "value" || !gt(n.itemType, e.itemType)) && (typeof n.N != "number" || n.N === e.N))
      return null;
  } else {
    if (n.kind === e.kind)
      return null;
    if (n.kind === "value") {
      for (const t of eu)
        if (!gt(t, e))
          return null;
    }
  }
  return `Expected ${N(n)} but found ${N(e)} instead.`;
}
function wr(n, e) {
  return e.some((t) => t.kind === n.kind);
}
function Ne(n, e) {
  return e.some((t) => t === "null" ? n === null : t === "array" ? Array.isArray(n) : t === "object" ? n && !Array.isArray(n) && typeof n == "object" : t === typeof n);
}
function Ce(n, e) {
  return n.kind === "array" && e.kind === "array" ? n.itemType.kind === e.itemType.kind && typeof n.N == "number" : n.kind === e.kind;
}
const bs = 0.96422, ws = 1, Cs = 0.82521, Ts = 4 / 29, Ye = 6 / 29, Is = 3 * Ye * Ye, tu = Ye * Ye * Ye, nu = Math.PI / 180, ru = 180 / Math.PI;
function _s(n) {
  return n = n % 360, n < 0 && (n += 360), n;
}
function Ss([n, e, t, i]) {
  n = Fn(n), e = Fn(e), t = Fn(t);
  let r, s;
  const o = An((0.2225045 * n + 0.7168786 * e + 0.0606169 * t) / ws);
  n === e && e === t ? r = s = o : (r = An((0.4360747 * n + 0.3850649 * e + 0.1430804 * t) / bs), s = An((0.0139322 * n + 0.0971045 * e + 0.7141733 * t) / Cs));
  const a = 116 * o - 16;
  return [a < 0 ? 0 : a, 500 * (r - o), 200 * (o - s), i];
}
function Fn(n) {
  return n <= 0.04045 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
}
function An(n) {
  return n > tu ? Math.pow(n, 1 / 3) : n / Is + Ts;
}
function Ls([n, e, t, i]) {
  let r = (n + 16) / 116, s = isNaN(e) ? r : r + e / 500, o = isNaN(t) ? r : r - t / 200;
  return r = ws * On(r), s = bs * On(s), o = Cs * On(o), [
    zn(3.1338561 * s - 1.6168667 * r - 0.4906146 * o),
    // D50 -> sRGB
    zn(-0.9787684 * s + 1.9161415 * r + 0.033454 * o),
    zn(0.0719453 * s - 0.2289914 * r + 1.4052427 * o),
    i
  ];
}
function zn(n) {
  return n = n <= 304e-5 ? 12.92 * n : 1.055 * Math.pow(n, 1 / 2.4) - 0.055, n < 0 ? 0 : n > 1 ? 1 : n;
}
function On(n) {
  return n > Ye ? n * n * n : Is * (n - Ts);
}
function iu(n) {
  const [e, t, i, r] = Ss(n), s = Math.sqrt(t * t + i * i);
  return [Math.round(s * 1e4) ? _s(Math.atan2(i, t) * ru) : NaN, s, e, r];
}
function su([n, e, t, i]) {
  return n = isNaN(n) ? 0 : n * nu, Ls([t, Math.cos(n) * e, Math.sin(n) * e, i]);
}
function ou([n, e, t, i]) {
  n = _s(n), e /= 100, t /= 100;
  function r(s) {
    const o = (s + n / 30) % 12, a = e * Math.min(t, 1 - t);
    return t - a * Math.max(-1, Math.min(o - 3, 9 - o, 1));
  }
  return [r(0), r(8), r(4), i];
}
const au = Object.hasOwn || function(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
};
function Es(n, e) {
  return au(n, e) ? n[e] : void 0;
}
function lu(n) {
  if (n = n.toLowerCase().trim(), n === "transparent")
    return [0, 0, 0, 0];
  const e = Es(cu, n);
  if (e) {
    const [r, s, o] = e;
    return [r / 255, s / 255, o / 255, 1];
  }
  if (n.startsWith("#") && /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.test(n)) {
    const s = n.length < 6 ? 1 : 2;
    let o = 1;
    return [
      Dt(n.slice(o, o += s)),
      Dt(n.slice(o, o += s)),
      Dt(n.slice(o, o += s)),
      Dt(n.slice(o, o + s) || "ff")
    ];
  }
  if (n.startsWith("rgb")) {
    const r = /^rgba?\(\s*([\de.+-]+)(%)?(?:\s+|\s*(,)\s*)([\de.+-]+)(%)?(?:\s+|\s*(,)\s*)([\de.+-]+)(%)?(?:\s*([,\/])\s*([\de.+-]+)(%)?)?\s*\)$/, s = n.match(r);
    if (s) {
      const [
        o,
        // eslint-disable-line @typescript-eslint/no-unused-vars
        a,
        // <numeric>
        l,
        // %         (optional)
        c,
        // ,         (optional)
        u,
        // <numeric>
        f,
        // %         (optional)
        h,
        // ,         (optional)
        p,
        // <numeric>
        d,
        // %         (optional)
        y,
        // ,|/       (optional)
        m,
        // <numeric> (optional)
        x
        // %         (optional)
      ] = s, w = [c || " ", h || " ", y].join("");
      if (w === "  " || w === "  /" || w === ",," || w === ",,,") {
        const v = [l, f, d].join(""), g = v === "%%%" ? 100 : v === "" ? 255 : 0;
        if (g) {
          const b = [
            je(+a / g, 0, 1),
            je(+u / g, 0, 1),
            je(+p / g, 0, 1),
            m ? hi(+m, x) : 1
          ];
          if (pi(b))
            return b;
        }
      }
      return;
    }
  }
  const t = /^hsla?\(\s*([\de.+-]+)(?:deg)?(?:\s+|\s*(,)\s*)([\de.+-]+)%(?:\s+|\s*(,)\s*)([\de.+-]+)%(?:\s*([,\/])\s*([\de.+-]+)(%)?)?\s*\)$/, i = n.match(t);
  if (i) {
    const [
      r,
      // eslint-disable-line @typescript-eslint/no-unused-vars
      s,
      // <numeric>
      o,
      // ,         (optional)
      a,
      // <numeric>
      l,
      // ,         (optional)
      c,
      // <numeric>
      u,
      // ,|/       (optional)
      f,
      // <numeric> (optional)
      h
      // %         (optional)
    ] = i, p = [o || " ", l || " ", u].join("");
    if (p === "  " || p === "  /" || p === ",," || p === ",,,") {
      const d = [
        +s,
        je(+a, 0, 100),
        je(+c, 0, 100),
        f ? hi(+f, h) : 1
      ];
      if (pi(d))
        return ou(d);
    }
  }
}
function Dt(n) {
  return parseInt(n.padEnd(2, n), 16) / 255;
}
function hi(n, e) {
  return je(e ? n / 100 : n, 0, 1);
}
function je(n, e, t) {
  return Math.min(Math.max(e, n), t);
}
function pi(n) {
  return !n.some(Number.isNaN);
}
const cu = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 134, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 250, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  grey: [128, 128, 128],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 221],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  rebeccapurple: [102, 51, 153],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [112, 128, 144],
  slategrey: [112, 128, 144],
  snow: [255, 250, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 50]
};
function Le(n, e, t) {
  return n + t * (e - n);
}
function Je(n, e, t) {
  return n.map((i, r) => Le(i, e[r], t));
}
function uu(n) {
  return n === "rgb" || n === "hcl" || n === "lab";
}
class z {
  /**
   * @param r Red component premultiplied by `alpha` 0..1
   * @param g Green component premultiplied by `alpha` 0..1
   * @param b Blue component premultiplied by `alpha` 0..1
   * @param [alpha=1] Alpha component 0..1
   * @param [premultiplied=true] Whether the `r`, `g` and `b` values have already
   * been multiplied by alpha. If `true` nothing happens if `false` then they will
   * be multiplied automatically.
   */
  constructor(e, t, i, r = 1, s = !0) {
    this.r = e, this.g = t, this.b = i, this.a = r, s || (this.r *= r, this.g *= r, this.b *= r, r || this.overwriteGetter("rgb", [e, t, i, r]));
  }
  /**
   * Parses CSS color strings and converts colors to sRGB color space if needed.
   * Officially supported color formats:
   * - keyword, e.g. 'aquamarine' or 'steelblue'
   * - hex (with 3, 4, 6 or 8 digits), e.g. '#f0f' or '#e9bebea9'
   * - rgb and rgba, e.g. 'rgb(0,240,120)' or 'rgba(0%,94%,47%,0.1)' or 'rgb(0 240 120 / .3)'
   * - hsl and hsla, e.g. 'hsl(0,0%,83%)' or 'hsla(0,0%,83%,.5)' or 'hsl(0 0% 83% / 20%)'
   *
   * @param input CSS color string to parse.
   * @returns A `Color` instance, or `undefined` if the input is not a valid color string.
   */
  static parse(e) {
    if (e instanceof z)
      return e;
    if (typeof e != "string")
      return;
    const t = lu(e);
    if (t)
      return new z(...t, !1);
  }
  /**
   * Used in color interpolation and by 'to-rgba' expression.
   *
   * @returns Gien color, with reversed alpha blending, in sRGB color space.
   */
  get rgb() {
    const { r: e, g: t, b: i, a: r } = this, s = r || 1 / 0;
    return this.overwriteGetter("rgb", [e / s, t / s, i / s, r]);
  }
  /**
   * Used in color interpolation.
   *
   * @returns Gien color, with reversed alpha blending, in HCL color space.
   */
  get hcl() {
    return this.overwriteGetter("hcl", iu(this.rgb));
  }
  /**
   * Used in color interpolation.
   *
   * @returns Gien color, with reversed alpha blending, in LAB color space.
   */
  get lab() {
    return this.overwriteGetter("lab", Ss(this.rgb));
  }
  /**
   * Lazy getter pattern. When getter is called for the first time lazy value
   * is calculated and then overwrites getter function in given object instance.
   *
   * @example:
   * const redColor = Color.parse('red');
   * let x = redColor.hcl; // this will invoke `get hcl()`, which will calculate
   * // the value of red in HCL space and invoke this `overwriteGetter` function
   * // which in turn will set a field with a key 'hcl' in the `redColor` object.
   * // In other words it will override `get hcl()` from its `Color` prototype
   * // with its own property: hcl = [calculated red value in hcl].
   * let y = redColor.hcl; // next call will no longer invoke getter but simply
   * // return the previously calculated value
   * x === y; // true - `x` is exactly the same object as `y`
   *
   * @param getterKey Getter key
   * @param lazyValue Lazily calculated value to be memoized by current instance
   * @private
   */
  overwriteGetter(e, t) {
    return Object.defineProperty(this, e, { value: t }), t;
  }
  /**
   * Used by 'to-string' expression.
   *
   * @returns Serialized color in format `rgba(r,g,b,a)`
   * where r,g,b are numbers within 0..255 and alpha is number within 1..0
   *
   * @example
   * var purple = new Color.parse('purple');
   * purple.toString; // = "rgba(128,0,128,1)"
   * var translucentGreen = new Color.parse('rgba(26, 207, 26, .73)');
   * translucentGreen.toString(); // = "rgba(26,207,26,0.73)"
   */
  toString() {
    const [e, t, i, r] = this.rgb;
    return `rgba(${[e, t, i].map((s) => Math.round(s * 255)).join(",")},${r})`;
  }
  static interpolate(e, t, i, r = "rgb") {
    switch (r) {
      case "rgb": {
        const [s, o, a, l] = Je(e.rgb, t.rgb, i);
        return new z(s, o, a, l, !1);
      }
      case "hcl": {
        const [s, o, a, l] = e.hcl, [c, u, f, h] = t.hcl;
        let p, d;
        if (!isNaN(s) && !isNaN(c)) {
          let v = c - s;
          c > s && v > 180 ? v -= 360 : c < s && s - c > 180 && (v += 360), p = s + i * v;
        } else isNaN(s) ? isNaN(c) ? p = NaN : (p = c, (a === 1 || a === 0) && (d = u)) : (p = s, (f === 1 || f === 0) && (d = o));
        const [y, m, x, w] = su([
          p,
          d ?? Le(o, u, i),
          Le(a, f, i),
          Le(l, h, i)
        ]);
        return new z(y, m, x, w, !1);
      }
      case "lab": {
        const [s, o, a, l] = Ls(Je(e.lab, t.lab, i));
        return new z(s, o, a, l, !1);
      }
    }
  }
}
z.black = new z(0, 0, 0, 1);
z.white = new z(1, 1, 1, 1);
z.transparent = new z(0, 0, 0, 0);
z.red = new z(1, 0, 0, 1);
class Cr {
  constructor(e, t, i) {
    e ? this.sensitivity = t ? "variant" : "case" : this.sensitivity = t ? "accent" : "base", this.locale = i, this.collator = new Intl.Collator(this.locale ? this.locale : [], {
      sensitivity: this.sensitivity,
      usage: "search"
    });
  }
  compare(e, t) {
    return this.collator.compare(e, t);
  }
  resolvedLocale() {
    return new Intl.Collator(this.locale ? this.locale : []).resolvedOptions().locale;
  }
}
const fu = ["bottom", "center", "top"];
class Hn {
  constructor(e, t, i, r, s, o) {
    this.text = e, this.image = t, this.scale = i, this.fontStack = r, this.textColor = s, this.verticalAlign = o;
  }
}
class pe {
  constructor(e) {
    this.sections = e;
  }
  static fromString(e) {
    return new pe([new Hn(e, null, null, null, null, null)]);
  }
  isEmpty() {
    return this.sections.length === 0 ? !0 : !this.sections.some((e) => e.text.length !== 0 || e.image && e.image.name.length !== 0);
  }
  static factory(e) {
    return e instanceof pe ? e : pe.fromString(e);
  }
  toString() {
    return this.sections.length === 0 ? "" : this.sections.map((e) => e.text).join("");
  }
}
class J {
  constructor(e) {
    this.values = e.slice();
  }
  /**
   * Numeric padding values
   * @param input A padding value
   * @returns A `Padding` instance, or `undefined` if the input is not a valid padding value.
   */
  static parse(e) {
    if (e instanceof J)
      return e;
    if (typeof e == "number")
      return new J([e, e, e, e]);
    if (Array.isArray(e) && !(e.length < 1 || e.length > 4)) {
      for (const t of e)
        if (typeof t != "number")
          return;
      switch (e.length) {
        case 1:
          e = [e[0], e[0], e[0], e[0]];
          break;
        case 2:
          e = [e[0], e[1], e[0], e[1]];
          break;
        case 3:
          e = [e[0], e[1], e[2], e[1]];
          break;
      }
      return new J(e);
    }
  }
  toString() {
    return JSON.stringify(this.values);
  }
  static interpolate(e, t, i) {
    return new J(Je(e.values, t.values, i));
  }
}
class K {
  constructor(e) {
    this.values = e.slice();
  }
  /**
   * Numeric NumberArray values
   * @param input A NumberArray value
   * @returns A `NumberArray` instance, or `undefined` if the input is not a valid NumberArray value.
   */
  static parse(e) {
    if (e instanceof K)
      return e;
    if (typeof e == "number")
      return new K([e]);
    if (Array.isArray(e)) {
      for (const t of e)
        if (typeof t != "number")
          return;
      return new K(e);
    }
  }
  toString() {
    return JSON.stringify(this.values);
  }
  static interpolate(e, t, i) {
    return new K(Je(e.values, t.values, i));
  }
}
class W {
  constructor(e) {
    this.values = e.slice();
  }
  /**
   * ColorArray values
   * @param input A ColorArray value
   * @returns A `ColorArray` instance, or `undefined` if the input is not a valid ColorArray value.
   */
  static parse(e) {
    if (e instanceof W)
      return e;
    if (typeof e == "string") {
      const i = z.parse(e);
      return i ? new W([i]) : void 0;
    }
    if (!Array.isArray(e))
      return;
    const t = [];
    for (const i of e) {
      if (typeof i != "string")
        return;
      const r = z.parse(i);
      if (!r)
        return;
      t.push(r);
    }
    return new W(t);
  }
  toString() {
    return JSON.stringify(this.values);
  }
  static interpolate(e, t, i, r = "rgb") {
    const s = [];
    if (e.values.length != t.values.length)
      throw new Error(`colorArray: Arrays have mismatched length (${e.values.length} vs. ${t.values.length}), cannot interpolate.`);
    for (let o = 0; o < e.values.length; o++)
      s.push(z.interpolate(e.values[o], t.values[o], i, r));
    return new W(s);
  }
}
class B extends Error {
  constructor(e) {
    super(e), this.name = "RuntimeError";
  }
  toJSON() {
    return this.message;
  }
}
const hu = /* @__PURE__ */ new Set([
  "center",
  "left",
  "right",
  "top",
  "bottom",
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right"
]);
class oe {
  constructor(e) {
    this.values = e.slice();
  }
  static parse(e) {
    if (e instanceof oe)
      return e;
    if (!(!Array.isArray(e) || e.length < 1 || e.length % 2 !== 0)) {
      for (let t = 0; t < e.length; t += 2) {
        const i = e[t], r = e[t + 1];
        if (typeof i != "string" || !hu.has(i) || !Array.isArray(r) || r.length !== 2 || typeof r[0] != "number" || typeof r[1] != "number")
          return;
      }
      return new oe(e);
    }
  }
  toString() {
    return JSON.stringify(this.values);
  }
  static interpolate(e, t, i) {
    const r = e.values, s = t.values;
    if (r.length !== s.length)
      throw new B(`Cannot interpolate values of different length. from: ${e.toString()}, to: ${t.toString()}`);
    const o = [];
    for (let a = 0; a < r.length; a += 2) {
      if (r[a] !== s[a])
        throw new B(`Cannot interpolate values containing mismatched anchors. from[${a}]: ${r[a]}, to[${a}]: ${s[a]}`);
      o.push(r[a]);
      const [l, c] = r[a + 1], [u, f] = s[a + 1];
      o.push([Le(l, u, i), Le(c, f, i)]);
    }
    return new oe(o);
  }
}
class ye {
  constructor(e) {
    this.name = e.name, this.available = e.available;
  }
  toString() {
    return this.name;
  }
  static fromString(e) {
    return e ? new ye({ name: e, available: !1 }) : null;
  }
}
class ie {
  constructor(e, t, i) {
    this.from = e, this.to = t, this.transition = i;
  }
  static interpolate(e, t, i) {
    return new ie(e, t, i);
  }
  static parse(e) {
    if (e instanceof ie)
      return e;
    if (Array.isArray(e) && e.length === 3 && typeof e[0] == "string" && typeof e[1] == "string" && typeof e[2] == "number")
      return new ie(e[0], e[1], e[2]);
    if (typeof e == "object" && typeof e.from == "string" && typeof e.to == "string" && typeof e.transition == "number")
      return new ie(e.from, e.to, e.transition);
    if (typeof e == "string")
      return new ie(e, e, 1);
  }
}
function ks(n, e, t, i) {
  return typeof n == "number" && n >= 0 && n <= 255 && typeof e == "number" && e >= 0 && e <= 255 && typeof t == "number" && t >= 0 && t <= 255 ? typeof i > "u" || typeof i == "number" && i >= 0 && i <= 1 ? null : `Invalid rgba value [${[n, e, t, i].join(", ")}]: 'a' must be between 0 and 1.` : `Invalid rgba value [${(typeof i == "number" ? [n, e, t, i] : [n, e, t]).join(", ")}]: 'r', 'g', and 'b' must be between 0 and 255.`;
}
function xt(n) {
  if (n === null || typeof n == "string" || typeof n == "boolean" || typeof n == "number" || n instanceof ie || n instanceof z || n instanceof Cr || n instanceof pe || n instanceof J || n instanceof K || n instanceof W || n instanceof oe || n instanceof ye)
    return !0;
  if (Array.isArray(n)) {
    for (const e of n)
      if (!xt(e))
        return !1;
    return !0;
  } else if (typeof n == "object") {
    for (const e in n)
      if (!xt(n[e]))
        return !1;
    return !0;
  } else
    return !1;
}
function q(n) {
  if (n === null)
    return sn;
  if (typeof n == "string")
    return S;
  if (typeof n == "boolean")
    return k;
  if (typeof n == "number")
    return C;
  if (n instanceof z)
    return he;
  if (n instanceof ie)
    return on;
  if (n instanceof Cr)
    return an;
  if (n instanceof pe)
    return ln;
  if (n instanceof J)
    return cn;
  if (n instanceof K)
    return un;
  if (n instanceof W)
    return mt;
  if (n instanceof oe)
    return fn;
  if (n instanceof ye)
    return St;
  if (Array.isArray(n)) {
    const e = n.length;
    let t;
    for (const i of n) {
      const r = q(i);
      if (!t)
        t = r;
      else {
        if (t === r)
          continue;
        t = E;
        break;
      }
    }
    return H(t || E, e);
  } else
    return De;
}
function pt(n) {
  const e = typeof n;
  return n === null ? "" : e === "string" || e === "number" || e === "boolean" ? String(n) : n instanceof z || n instanceof ie || n instanceof pe || n instanceof J || n instanceof K || n instanceof W || n instanceof oe || n instanceof ye ? n.toString() : JSON.stringify(n);
}
class Ke {
  constructor(e, t) {
    this.type = e, this.value = t;
  }
  static parse(e, t) {
    if (e.length !== 2)
      return t.error(`'literal' expression requires exactly one argument, but found ${e.length - 1} instead.`);
    if (!xt(e[1]))
      return t.error("invalid value");
    const i = e[1];
    let r = q(i);
    const s = t.expectedType;
    return r.kind === "array" && r.N === 0 && s && s.kind === "array" && (typeof s.N != "number" || s.N === 0) && (r = s), new Ke(r, i);
  }
  evaluate() {
    return this.value;
  }
  eachChild() {
  }
  outputDefined() {
    return !0;
  }
}
const Nt = {
  string: S,
  number: C,
  boolean: k,
  object: De
};
class le {
  constructor(e, t) {
    this.type = e, this.args = t;
  }
  static parse(e, t) {
    if (e.length < 2)
      return t.error("Expected at least one argument.");
    let i = 1, r;
    const s = e[0];
    if (s === "array") {
      let a;
      if (e.length > 2) {
        const c = e[1];
        if (typeof c != "string" || !(c in Nt) || c === "object")
          return t.error('The item type argument of "array" must be one of string, number, boolean', 1);
        a = Nt[c], i++;
      } else
        a = E;
      let l;
      if (e.length > 3) {
        if (e[2] !== null && (typeof e[2] != "number" || e[2] < 0 || e[2] !== Math.floor(e[2])))
          return t.error('The length argument to "array" must be a positive integer literal', 2);
        l = e[2], i++;
      }
      r = H(a, l);
    } else {
      if (!Nt[s])
        throw new Error(`Types doesn't contain name = ${s}`);
      r = Nt[s];
    }
    const o = [];
    for (; i < e.length; i++) {
      const a = t.parse(e[i], i, E);
      if (!a)
        return null;
      o.push(a);
    }
    return new le(r, o);
  }
  evaluate(e) {
    for (let t = 0; t < this.args.length; t++) {
      const i = this.args[t].evaluate(e);
      if (gt(this.type, q(i))) {
        if (t === this.args.length - 1)
          throw new B(`Expected value to be of type ${N(this.type)}, but found ${N(q(i))} instead.`);
      } else return i;
    }
    throw new Error();
  }
  eachChild(e) {
    this.args.forEach(e);
  }
  outputDefined() {
    return this.args.every((e) => e.outputDefined());
  }
}
const di = {
  "to-boolean": k,
  "to-color": he,
  "to-number": C,
  "to-string": S
};
class _e {
  constructor(e, t) {
    this.type = e, this.args = t;
  }
  static parse(e, t) {
    if (e.length < 2)
      return t.error("Expected at least one argument.");
    const i = e[0];
    if (!di[i])
      throw new Error(`Can't parse ${i} as it is not part of the known types`);
    if ((i === "to-boolean" || i === "to-string") && e.length !== 2)
      return t.error("Expected one argument.");
    const r = di[i], s = [];
    for (let o = 1; o < e.length; o++) {
      const a = t.parse(e[o], o, E);
      if (!a)
        return null;
      s.push(a);
    }
    return new _e(r, s);
  }
  evaluate(e) {
    switch (this.type.kind) {
      case "boolean":
        return !!this.args[0].evaluate(e);
      case "color": {
        let t, i;
        for (const r of this.args) {
          if (t = r.evaluate(e), i = null, t instanceof z)
            return t;
          if (typeof t == "string") {
            const s = e.parseColor(t);
            if (s)
              return s;
          } else if (Array.isArray(t) && (t.length < 3 || t.length > 4 ? i = `Invalid rgba value ${JSON.stringify(t)}: expected an array containing either three or four numeric values.` : i = ks(t[0], t[1], t[2], t[3]), !i))
            return new z(t[0] / 255, t[1] / 255, t[2] / 255, t[3]);
        }
        throw new B(i || `Could not parse color from value '${typeof t == "string" ? t : JSON.stringify(t)}'`);
      }
      case "padding": {
        let t;
        for (const i of this.args) {
          t = i.evaluate(e);
          const r = J.parse(t);
          if (r)
            return r;
        }
        throw new B(`Could not parse padding from value '${typeof t == "string" ? t : JSON.stringify(t)}'`);
      }
      case "numberArray": {
        let t;
        for (const i of this.args) {
          t = i.evaluate(e);
          const r = K.parse(t);
          if (r)
            return r;
        }
        throw new B(`Could not parse numberArray from value '${typeof t == "string" ? t : JSON.stringify(t)}'`);
      }
      case "colorArray": {
        let t;
        for (const i of this.args) {
          t = i.evaluate(e);
          const r = W.parse(t);
          if (r)
            return r;
        }
        throw new B(`Could not parse colorArray from value '${typeof t == "string" ? t : JSON.stringify(t)}'`);
      }
      case "variableAnchorOffsetCollection": {
        let t;
        for (const i of this.args) {
          t = i.evaluate(e);
          const r = oe.parse(t);
          if (r)
            return r;
        }
        throw new B(`Could not parse variableAnchorOffsetCollection from value '${typeof t == "string" ? t : JSON.stringify(t)}'`);
      }
      case "number": {
        let t = null;
        for (const i of this.args) {
          if (t = i.evaluate(e), t === null)
            return 0;
          const r = Number(t);
          if (!isNaN(r))
            return r;
        }
        throw new B(`Could not convert ${JSON.stringify(t)} to number.`);
      }
      case "formatted":
        return pe.fromString(pt(this.args[0].evaluate(e)));
      case "resolvedImage":
        return ye.fromString(pt(this.args[0].evaluate(e)));
      case "projectionDefinition":
        return this.args[0].evaluate(e);
      default:
        return pt(this.args[0].evaluate(e));
    }
  }
  eachChild(e) {
    this.args.forEach(e);
  }
  outputDefined() {
    return this.args.every((e) => e.outputDefined());
  }
}
const pu = ["Unknown", "Point", "LineString", "Polygon"];
class Fs {
  constructor() {
    this.globals = null, this.feature = null, this.featureState = null, this.formattedSection = null, this._parseColorCache = /* @__PURE__ */ new Map(), this.availableImages = null, this.canonical = null;
  }
  id() {
    return this.feature && "id" in this.feature ? this.feature.id : null;
  }
  geometryType() {
    return this.feature ? typeof this.feature.type == "number" ? pu[this.feature.type] : this.feature.type : null;
  }
  geometry() {
    return this.feature && "geometry" in this.feature ? this.feature.geometry : null;
  }
  canonicalID() {
    return this.canonical;
  }
  properties() {
    return this.feature && this.feature.properties || {};
  }
  parseColor(e) {
    let t = this._parseColorCache.get(e);
    return t || (t = z.parse(e), this._parseColorCache.set(e, t)), t;
  }
}
class hn {
  constructor(e, t, i = [], r, s = new br(), o = []) {
    this.registry = e, this.path = i, this.key = i.map((a) => `[${a}]`).join(""), this.scope = s, this.errors = o, this.expectedType = r, this._isConstant = t;
  }
  /**
   * @param expr the JSON expression to parse
   * @param index the optional argument index if this expression is an argument of a parent expression that's being parsed
   * @param options
   * @param options.omitTypeAnnotations set true to omit inferred type annotations.  Caller beware: with this option set, the parsed expression's type will NOT satisfy `expectedType` if it would normally be wrapped in an inferred annotation.
   * @private
   */
  parse(e, t, i, r, s = {}) {
    return t ? this.concat(t, i, r)._parse(e, s) : this._parse(e, s);
  }
  _parse(e, t) {
    (e === null || typeof e == "string" || typeof e == "boolean" || typeof e == "number") && (e = ["literal", e]);
    function i(r, s, o) {
      return o === "assert" ? new le(s, [r]) : o === "coerce" ? new _e(s, [r]) : r;
    }
    if (Array.isArray(e)) {
      if (e.length === 0)
        return this.error('Expected an array with at least one element. If you wanted a literal array, use ["literal", []].');
      const r = e[0];
      if (typeof r != "string")
        return this.error(`Expression name must be a string, but found ${typeof r} instead. If you wanted a literal array, use ["literal", [...]].`, 0), null;
      const s = this.registry[r];
      if (s) {
        let o = s.parse(e, this);
        if (!o)
          return null;
        if (this.expectedType) {
          const a = this.expectedType, l = o.type;
          if ((a.kind === "string" || a.kind === "number" || a.kind === "boolean" || a.kind === "object" || a.kind === "array") && l.kind === "value")
            o = i(o, a, t.typeAnnotation || "assert");
          else if (a.kind === "projectionDefinition" && ["string", "array"].includes(l.kind) || ["color", "formatted", "resolvedImage"].includes(a.kind) && ["value", "string"].includes(l.kind) || ["padding", "numberArray"].includes(a.kind) && ["value", "number", "array"].includes(l.kind) || a.kind === "colorArray" && ["value", "string", "array"].includes(l.kind) || a.kind === "variableAnchorOffsetCollection" && ["value", "array"].includes(l.kind))
            o = i(o, a, t.typeAnnotation || "coerce");
          else if (this.checkSubtype(a, l))
            return null;
        }
        if (!(o instanceof Ke) && o.type.kind !== "resolvedImage" && this._isConstant(o)) {
          const a = new Fs();
          try {
            o = new Ke(o.type, o.evaluate(a));
          } catch (l) {
            return this.error(l.message), null;
          }
        }
        return o;
      }
      return this.error(`Unknown expression "${r}". If you wanted a literal array, use ["literal", [...]].`, 0);
    } else return typeof e > "u" ? this.error("'undefined' value invalid. Use null instead.") : typeof e == "object" ? this.error('Bare objects invalid. Use ["literal", {...}] instead.') : this.error(`Expected an array, but found ${typeof e} instead.`);
  }
  /**
   * Returns a copy of this context suitable for parsing the subexpression at
   * index `index`, optionally appending to 'let' binding map.
   *
   * Note that `errors` property, intended for collecting errors while
   * parsing, is copied by reference rather than cloned.
   * @private
   */
  concat(e, t, i) {
    const r = typeof e == "number" ? this.path.concat(e) : this.path, s = i ? this.scope.concat(i) : this.scope;
    return new hn(this.registry, this._isConstant, r, t || null, s, this.errors);
  }
  /**
   * Push a parsing (or type checking) error into the `this.errors`
   * @param error The message
   * @param keys Optionally specify the source of the error at a child
   * of the current expression at `this.key`.
   * @private
   */
  error(e, ...t) {
    const i = `${this.key}${t.map((r) => `[${r}]`).join("")}`;
    this.errors.push(new fe(i, e));
  }
  /**
   * Returns null if `t` is a subtype of `expected`; otherwise returns an
   * error message and also pushes it to `this.errors`.
   * @param expected The expected type
   * @param t The actual type
   * @returns null if `t` is a subtype of `expected`; otherwise returns an error message
   */
  checkSubtype(e, t) {
    const i = gt(e, t);
    return i && this.error(i), i;
  }
}
class pn {
  constructor(e, t) {
    this.type = t.type, this.bindings = [].concat(e), this.result = t;
  }
  evaluate(e) {
    return this.result.evaluate(e);
  }
  eachChild(e) {
    for (const t of this.bindings)
      e(t[1]);
    e(this.result);
  }
  static parse(e, t) {
    if (e.length < 4)
      return t.error(`Expected at least 3 arguments, but found ${e.length - 1} instead.`);
    const i = [];
    for (let s = 1; s < e.length - 1; s += 2) {
      const o = e[s];
      if (typeof o != "string")
        return t.error(`Expected string, but found ${typeof o} instead.`, s);
      if (/[^a-zA-Z0-9_]/.test(o))
        return t.error("Variable names must contain only alphanumeric characters or '_'.", s);
      const a = t.parse(e[s + 1], s + 1);
      if (!a)
        return null;
      i.push([o, a]);
    }
    const r = t.parse(e[e.length - 1], e.length - 1, t.expectedType, i);
    return r ? new pn(i, r) : null;
  }
  outputDefined() {
    return this.result.outputDefined();
  }
}
class dn {
  constructor(e, t) {
    this.type = t.type, this.name = e, this.boundExpression = t;
  }
  static parse(e, t) {
    if (e.length !== 2 || typeof e[1] != "string")
      return t.error("'var' expression requires exactly one string literal argument.");
    const i = e[1];
    return t.scope.has(i) ? new dn(i, t.scope.get(i)) : t.error(`Unknown variable "${i}". Make sure "${i}" has been bound in an enclosing "let" expression before using it.`, 1);
  }
  evaluate(e) {
    return this.boundExpression.evaluate(e);
  }
  eachChild() {
  }
  outputDefined() {
    return !1;
  }
}
class Tr {
  constructor(e, t, i) {
    this.type = e, this.index = t, this.input = i;
  }
  static parse(e, t) {
    if (e.length !== 3)
      return t.error(`Expected 2 arguments, but found ${e.length - 1} instead.`);
    const i = t.parse(e[1], 1, C), r = t.parse(e[2], 2, H(t.expectedType || E));
    if (!i || !r)
      return null;
    const s = r.type;
    return new Tr(s.itemType, i, r);
  }
  evaluate(e) {
    const t = this.index.evaluate(e), i = this.input.evaluate(e);
    if (t < 0)
      throw new B(`Array index out of bounds: ${t} < 0.`);
    if (t >= i.length)
      throw new B(`Array index out of bounds: ${t} > ${i.length - 1}.`);
    if (t !== Math.floor(t))
      throw new B(`Array index must be an integer, but found ${t} instead.`);
    return i[t];
  }
  eachChild(e) {
    e(this.index), e(this.input);
  }
  outputDefined() {
    return !1;
  }
}
class Ir {
  constructor(e, t) {
    this.type = k, this.needle = e, this.haystack = t;
  }
  static parse(e, t) {
    if (e.length !== 3)
      return t.error(`Expected 2 arguments, but found ${e.length - 1} instead.`);
    const i = t.parse(e[1], 1, E), r = t.parse(e[2], 2, E);
    return !i || !r ? null : wr(i.type, [k, S, C, sn, E]) ? new Ir(i, r) : t.error(`Expected first argument to be of type boolean, string, number or null, but found ${N(i.type)} instead`);
  }
  evaluate(e) {
    const t = this.needle.evaluate(e), i = this.haystack.evaluate(e);
    if (!i)
      return !1;
    if (!Ne(t, ["boolean", "string", "number", "null"]))
      throw new B(`Expected first argument to be of type boolean, string, number or null, but found ${N(q(t))} instead.`);
    if (!Ne(i, ["string", "array"]))
      throw new B(`Expected second argument to be of type array or string, but found ${N(q(i))} instead.`);
    return i.indexOf(t) >= 0;
  }
  eachChild(e) {
    e(this.needle), e(this.haystack);
  }
  outputDefined() {
    return !0;
  }
}
class jt {
  constructor(e, t, i) {
    this.type = C, this.needle = e, this.haystack = t, this.fromIndex = i;
  }
  static parse(e, t) {
    if (e.length <= 2 || e.length >= 5)
      return t.error(`Expected 2 or 3 arguments, but found ${e.length - 1} instead.`);
    const i = t.parse(e[1], 1, E), r = t.parse(e[2], 2, E);
    if (!i || !r)
      return null;
    if (!wr(i.type, [k, S, C, sn, E]))
      return t.error(`Expected first argument to be of type boolean, string, number or null, but found ${N(i.type)} instead`);
    if (e.length === 4) {
      const s = t.parse(e[3], 3, C);
      return s ? new jt(i, r, s) : null;
    } else
      return new jt(i, r);
  }
  evaluate(e) {
    const t = this.needle.evaluate(e), i = this.haystack.evaluate(e);
    if (!Ne(t, ["boolean", "string", "number", "null"]))
      throw new B(`Expected first argument to be of type boolean, string, number or null, but found ${N(q(t))} instead.`);
    let r;
    if (this.fromIndex && (r = this.fromIndex.evaluate(e)), Ne(i, ["string"])) {
      const s = i.indexOf(t, r);
      return s === -1 ? -1 : [...i.slice(0, s)].length;
    } else {
      if (Ne(i, ["array"]))
        return i.indexOf(t, r);
      throw new B(`Expected second argument to be of type array or string, but found ${N(q(i))} instead.`);
    }
  }
  eachChild(e) {
    e(this.needle), e(this.haystack), this.fromIndex && e(this.fromIndex);
  }
  outputDefined() {
    return !1;
  }
}
class _r {
  constructor(e, t, i, r, s, o) {
    this.inputType = e, this.type = t, this.input = i, this.cases = r, this.outputs = s, this.otherwise = o;
  }
  static parse(e, t) {
    if (e.length < 5)
      return t.error(`Expected at least 4 arguments, but found only ${e.length - 1}.`);
    if (e.length % 2 !== 1)
      return t.error("Expected an even number of arguments.");
    let i, r;
    t.expectedType && t.expectedType.kind !== "value" && (r = t.expectedType);
    const s = {}, o = [];
    for (let c = 2; c < e.length - 1; c += 2) {
      let u = e[c];
      const f = e[c + 1];
      Array.isArray(u) || (u = [u]);
      const h = t.concat(c);
      if (u.length === 0)
        return h.error("Expected at least one branch label.");
      for (const d of u) {
        if (typeof d != "number" && typeof d != "string")
          return h.error("Branch labels must be numbers or strings.");
        if (typeof d == "number" && Math.abs(d) > Number.MAX_SAFE_INTEGER)
          return h.error(`Branch labels must be integers no larger than ${Number.MAX_SAFE_INTEGER}.`);
        if (typeof d == "number" && Math.floor(d) !== d)
          return h.error("Numeric branch labels must be integer values.");
        if (!i)
          i = q(d);
        else if (h.checkSubtype(i, q(d)))
          return null;
        if (typeof s[String(d)] < "u")
          return h.error("Branch labels must be unique.");
        s[String(d)] = o.length;
      }
      const p = t.parse(f, c, r);
      if (!p)
        return null;
      r = r || p.type, o.push(p);
    }
    const a = t.parse(e[1], 1, E);
    if (!a)
      return null;
    const l = t.parse(e[e.length - 1], e.length - 1, r);
    return !l || a.type.kind !== "value" && t.concat(1).checkSubtype(i, a.type) ? null : new _r(i, r, a, s, o, l);
  }
  evaluate(e) {
    const t = this.input.evaluate(e);
    return (q(t) === this.inputType && this.outputs[this.cases[t]] || this.otherwise).evaluate(e);
  }
  eachChild(e) {
    e(this.input), this.outputs.forEach(e), e(this.otherwise);
  }
  outputDefined() {
    return this.outputs.every((e) => e.outputDefined()) && this.otherwise.outputDefined();
  }
}
class Sr {
  constructor(e, t, i) {
    this.type = e, this.branches = t, this.otherwise = i;
  }
  static parse(e, t) {
    if (e.length < 4)
      return t.error(`Expected at least 3 arguments, but found only ${e.length - 1}.`);
    if (e.length % 2 !== 0)
      return t.error("Expected an odd number of arguments.");
    let i;
    t.expectedType && t.expectedType.kind !== "value" && (i = t.expectedType);
    const r = [];
    for (let o = 1; o < e.length - 1; o += 2) {
      const a = t.parse(e[o], o, k);
      if (!a)
        return null;
      const l = t.parse(e[o + 1], o + 1, i);
      if (!l)
        return null;
      r.push([a, l]), i = i || l.type;
    }
    const s = t.parse(e[e.length - 1], e.length - 1, i);
    if (!s)
      return null;
    if (!i)
      throw new Error("Can't infer output type");
    return new Sr(i, r, s);
  }
  evaluate(e) {
    for (const [t, i] of this.branches)
      if (t.evaluate(e))
        return i.evaluate(e);
    return this.otherwise.evaluate(e);
  }
  eachChild(e) {
    for (const [t, i] of this.branches)
      e(t), e(i);
    e(this.otherwise);
  }
  outputDefined() {
    return this.branches.every(([e, t]) => t.outputDefined()) && this.otherwise.outputDefined();
  }
}
class Zt {
  constructor(e, t, i, r) {
    this.type = e, this.input = t, this.beginIndex = i, this.endIndex = r;
  }
  static parse(e, t) {
    if (e.length <= 2 || e.length >= 5)
      return t.error(`Expected 2 or 3 arguments, but found ${e.length - 1} instead.`);
    const i = t.parse(e[1], 1, E), r = t.parse(e[2], 2, C);
    if (!i || !r)
      return null;
    if (!wr(i.type, [H(E), S, E]))
      return t.error(`Expected first argument to be of type array or string, but found ${N(i.type)} instead`);
    if (e.length === 4) {
      const s = t.parse(e[3], 3, C);
      return s ? new Zt(i.type, i, r, s) : null;
    } else
      return new Zt(i.type, i, r);
  }
  evaluate(e) {
    const t = this.input.evaluate(e), i = this.beginIndex.evaluate(e);
    let r;
    if (this.endIndex && (r = this.endIndex.evaluate(e)), Ne(t, ["string"]))
      return [...t].slice(i, r).join("");
    if (Ne(t, ["array"]))
      return t.slice(i, r);
    throw new B(`Expected first argument to be of type array or string, but found ${N(q(t))} instead.`);
  }
  eachChild(e) {
    e(this.input), e(this.beginIndex), this.endIndex && e(this.endIndex);
  }
  outputDefined() {
    return !1;
  }
}
function yn(n, e) {
  const t = n.length - 1;
  let i = 0, r = t, s = 0, o, a;
  for (; i <= r; )
    if (s = Math.floor((i + r) / 2), o = n[s], a = n[s + 1], o <= e) {
      if (s === t || e < a)
        return s;
      i = s + 1;
    } else if (o > e)
      r = s - 1;
    else
      throw new B("Input is not a number.");
  return 0;
}
class mn {
  constructor(e, t, i) {
    this.type = e, this.input = t, this.labels = [], this.outputs = [];
    for (const [r, s] of i)
      this.labels.push(r), this.outputs.push(s);
  }
  static parse(e, t) {
    if (e.length - 1 < 4)
      return t.error(`Expected at least 4 arguments, but found only ${e.length - 1}.`);
    if ((e.length - 1) % 2 !== 0)
      return t.error("Expected an even number of arguments.");
    const i = t.parse(e[1], 1, C);
    if (!i)
      return null;
    const r = [];
    let s = null;
    t.expectedType && t.expectedType.kind !== "value" && (s = t.expectedType);
    for (let o = 1; o < e.length; o += 2) {
      const a = o === 1 ? -1 / 0 : e[o], l = e[o + 1], c = o, u = o + 1;
      if (typeof a != "number")
        return t.error('Input/output pairs for "step" expressions must be defined using literal numeric values (not computed expressions) for the input values.', c);
      if (r.length && r[r.length - 1][0] >= a)
        return t.error('Input/output pairs for "step" expressions must be arranged with input values in strictly ascending order.', c);
      const f = t.parse(l, u, s);
      if (!f)
        return null;
      s = s || f.type, r.push([a, f]);
    }
    return new mn(s, i, r);
  }
  evaluate(e) {
    const t = this.labels, i = this.outputs;
    if (t.length === 1)
      return i[0].evaluate(e);
    const r = this.input.evaluate(e);
    if (r <= t[0])
      return i[0].evaluate(e);
    const s = t.length;
    if (r >= t[s - 1])
      return i[s - 1].evaluate(e);
    const o = yn(t, r);
    return i[o].evaluate(e);
  }
  eachChild(e) {
    e(this.input);
    for (const t of this.outputs)
      e(t);
  }
  outputDefined() {
    return this.outputs.every((e) => e.outputDefined());
  }
}
function du(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Mn, yi;
function yu() {
  if (yi) return Mn;
  yi = 1, Mn = n;
  function n(e, t, i, r) {
    this.cx = 3 * e, this.bx = 3 * (i - e) - this.cx, this.ax = 1 - this.cx - this.bx, this.cy = 3 * t, this.by = 3 * (r - t) - this.cy, this.ay = 1 - this.cy - this.by, this.p1x = e, this.p1y = t, this.p2x = i, this.p2y = r;
  }
  return n.prototype = {
    sampleCurveX: function(e) {
      return ((this.ax * e + this.bx) * e + this.cx) * e;
    },
    sampleCurveY: function(e) {
      return ((this.ay * e + this.by) * e + this.cy) * e;
    },
    sampleCurveDerivativeX: function(e) {
      return (3 * this.ax * e + 2 * this.bx) * e + this.cx;
    },
    solveCurveX: function(e, t) {
      if (t === void 0 && (t = 1e-6), e < 0) return 0;
      if (e > 1) return 1;
      for (var i = e, r = 0; r < 8; r++) {
        var s = this.sampleCurveX(i) - e;
        if (Math.abs(s) < t) return i;
        var o = this.sampleCurveDerivativeX(i);
        if (Math.abs(o) < 1e-6) break;
        i = i - s / o;
      }
      var a = 0, l = 1;
      for (i = e, r = 0; r < 20 && (s = this.sampleCurveX(i), !(Math.abs(s - e) < t)); r++)
        e > s ? a = i : l = i, i = (l - a) * 0.5 + a;
      return i;
    },
    solve: function(e, t) {
      return this.sampleCurveY(this.solveCurveX(e, t));
    }
  }, Mn;
}
var mu = yu(), gu = /* @__PURE__ */ du(mu);
class ae {
  constructor(e, t, i, r, s) {
    this.type = e, this.operator = t, this.interpolation = i, this.input = r, this.labels = [], this.outputs = [];
    for (const [o, a] of s)
      this.labels.push(o), this.outputs.push(a);
  }
  static interpolationFactor(e, t, i, r) {
    let s = 0;
    if (e.name === "exponential")
      s = Dn(t, e.base, i, r);
    else if (e.name === "linear")
      s = Dn(t, 1, i, r);
    else if (e.name === "cubic-bezier") {
      const o = e.controlPoints;
      s = new gu(o[0], o[1], o[2], o[3]).solve(Dn(t, 1, i, r));
    }
    return s;
  }
  static parse(e, t) {
    let [i, r, s, ...o] = e;
    if (!Array.isArray(r) || r.length === 0)
      return t.error("Expected an interpolation type expression.", 1);
    if (r[0] === "linear")
      r = { name: "linear" };
    else if (r[0] === "exponential") {
      const c = r[1];
      if (typeof c != "number")
        return t.error("Exponential interpolation requires a numeric base.", 1, 1);
      r = {
        name: "exponential",
        base: c
      };
    } else if (r[0] === "cubic-bezier") {
      const c = r.slice(1);
      if (c.length !== 4 || c.some((u) => typeof u != "number" || u < 0 || u > 1))
        return t.error("Cubic bezier interpolation requires four numeric arguments with values between 0 and 1.", 1);
      r = {
        name: "cubic-bezier",
        controlPoints: c
      };
    } else
      return t.error(`Unknown interpolation type ${String(r[0])}`, 1, 0);
    if (e.length - 1 < 4)
      return t.error(`Expected at least 4 arguments, but found only ${e.length - 1}.`);
    if ((e.length - 1) % 2 !== 0)
      return t.error("Expected an even number of arguments.");
    if (s = t.parse(s, 2, C), !s)
      return null;
    const a = [];
    let l = null;
    (i === "interpolate-hcl" || i === "interpolate-lab") && t.expectedType != mt ? l = he : t.expectedType && t.expectedType.kind !== "value" && (l = t.expectedType);
    for (let c = 0; c < o.length; c += 2) {
      const u = o[c], f = o[c + 1], h = c + 3, p = c + 4;
      if (typeof u != "number")
        return t.error('Input/output pairs for "interpolate" expressions must be defined using literal numeric values (not computed expressions) for the input values.', h);
      if (a.length && a[a.length - 1][0] >= u)
        return t.error('Input/output pairs for "interpolate" expressions must be arranged with input values in strictly ascending order.', h);
      const d = t.parse(f, p, l);
      if (!d)
        return null;
      l = l || d.type, a.push([u, d]);
    }
    return !Ce(l, C) && !Ce(l, on) && !Ce(l, he) && !Ce(l, cn) && !Ce(l, un) && !Ce(l, mt) && !Ce(l, fn) && !Ce(l, H(C)) ? t.error(`Type ${N(l)} is not interpolatable.`) : new ae(l, i, r, s, a);
  }
  evaluate(e) {
    const t = this.labels, i = this.outputs;
    if (t.length === 1)
      return i[0].evaluate(e);
    const r = this.input.evaluate(e);
    if (r <= t[0])
      return i[0].evaluate(e);
    const s = t.length;
    if (r >= t[s - 1])
      return i[s - 1].evaluate(e);
    const o = yn(t, r), a = t[o], l = t[o + 1], c = ae.interpolationFactor(this.interpolation, r, a, l), u = i[o].evaluate(e), f = i[o + 1].evaluate(e);
    switch (this.operator) {
      case "interpolate":
        switch (this.type.kind) {
          case "number":
            return Le(u, f, c);
          case "color":
            return z.interpolate(u, f, c);
          case "padding":
            return J.interpolate(u, f, c);
          case "colorArray":
            return W.interpolate(u, f, c);
          case "numberArray":
            return K.interpolate(u, f, c);
          case "variableAnchorOffsetCollection":
            return oe.interpolate(u, f, c);
          case "array":
            return Je(u, f, c);
          case "projectionDefinition":
            return ie.interpolate(u, f, c);
        }
      case "interpolate-hcl":
        switch (this.type.kind) {
          case "color":
            return z.interpolate(u, f, c, "hcl");
          case "colorArray":
            return W.interpolate(u, f, c, "hcl");
        }
      case "interpolate-lab":
        switch (this.type.kind) {
          case "color":
            return z.interpolate(u, f, c, "lab");
          case "colorArray":
            return W.interpolate(u, f, c, "lab");
        }
    }
  }
  eachChild(e) {
    e(this.input);
    for (const t of this.outputs)
      e(t);
  }
  outputDefined() {
    return this.outputs.every((e) => e.outputDefined());
  }
}
function Dn(n, e, t, i) {
  const r = i - t, s = n - t;
  return r === 0 ? 0 : e === 1 ? s / r : (Math.pow(e, s) - 1) / (Math.pow(e, r) - 1);
}
const xu = {
  color: z.interpolate,
  number: Le,
  padding: J.interpolate,
  numberArray: K.interpolate,
  colorArray: W.interpolate,
  variableAnchorOffsetCollection: oe.interpolate,
  array: Je
};
class vt {
  constructor(e, t) {
    this.type = e, this.args = t;
  }
  static parse(e, t) {
    if (e.length < 2)
      return t.error("Expected at least one argument.");
    let i = null;
    const r = t.expectedType;
    r && r.kind !== "value" && (i = r);
    const s = [];
    for (const a of e.slice(1)) {
      const l = t.parse(a, 1 + s.length, i, void 0, {
        typeAnnotation: "omit"
      });
      if (!l)
        return null;
      i = i || l.type, s.push(l);
    }
    if (!i)
      throw new Error("No output type");
    return r && s.some((a) => gt(r, a.type)) ? new vt(E, s) : new vt(i, s);
  }
  evaluate(e) {
    let t = null, i = 0, r;
    for (const s of this.args)
      if (i++, t = s.evaluate(e), t && t instanceof ye && !t.available && (r || (r = t.name), t = null, i === this.args.length && (t = r)), t !== null)
        break;
    return t;
  }
  eachChild(e) {
    this.args.forEach(e);
  }
  outputDefined() {
    return this.args.every((e) => e.outputDefined());
  }
}
function mi(n, e) {
  return n === "==" || n === "!=" ? e.kind === "boolean" || e.kind === "string" || e.kind === "number" || e.kind === "null" || e.kind === "value" : e.kind === "string" || e.kind === "number" || e.kind === "value";
}
function vu(n, e, t) {
  return e === t;
}
function bu(n, e, t) {
  return e !== t;
}
function wu(n, e, t) {
  return e < t;
}
function Cu(n, e, t) {
  return e > t;
}
function Tu(n, e, t) {
  return e <= t;
}
function Iu(n, e, t) {
  return e >= t;
}
function As(n, e, t, i) {
  return i.compare(e, t) === 0;
}
function _u(n, e, t, i) {
  return !As(n, e, t, i);
}
function Su(n, e, t, i) {
  return i.compare(e, t) < 0;
}
function Lu(n, e, t, i) {
  return i.compare(e, t) > 0;
}
function Eu(n, e, t, i) {
  return i.compare(e, t) <= 0;
}
function ku(n, e, t, i) {
  return i.compare(e, t) >= 0;
}
function ot(n, e, t) {
  const i = n !== "==" && n !== "!=";
  return class zs {
    constructor(s, o, a) {
      this.type = k, this.lhs = s, this.rhs = o, this.collator = a, this.hasUntypedArgument = s.type.kind === "value" || o.type.kind === "value";
    }
    static parse(s, o) {
      if (s.length !== 3 && s.length !== 4)
        return o.error("Expected two or three arguments.");
      const a = s[0];
      let l = o.parse(s[1], 1, E);
      if (!l)
        return null;
      if (!mi(a, l.type))
        return o.concat(1).error(`"${a}" comparisons are not supported for type '${N(l.type)}'.`);
      let c = o.parse(s[2], 2, E);
      if (!c)
        return null;
      if (!mi(a, c.type))
        return o.concat(2).error(`"${a}" comparisons are not supported for type '${N(c.type)}'.`);
      if (l.type.kind !== c.type.kind && l.type.kind !== "value" && c.type.kind !== "value")
        return o.error(`Cannot compare types '${N(l.type)}' and '${N(c.type)}'.`);
      i && (l.type.kind === "value" && c.type.kind !== "value" ? l = new le(c.type, [l]) : l.type.kind !== "value" && c.type.kind === "value" && (c = new le(l.type, [c])));
      let u = null;
      if (s.length === 4) {
        if (l.type.kind !== "string" && c.type.kind !== "string" && l.type.kind !== "value" && c.type.kind !== "value")
          return o.error("Cannot use collator to compare non-string types.");
        if (u = o.parse(s[3], 3, an), !u)
          return null;
      }
      return new zs(l, c, u);
    }
    evaluate(s) {
      const o = this.lhs.evaluate(s), a = this.rhs.evaluate(s);
      if (i && this.hasUntypedArgument) {
        const l = q(o), c = q(a);
        if (l.kind !== c.kind || !(l.kind === "string" || l.kind === "number"))
          throw new B(`Expected arguments for "${n}" to be (string, string) or (number, number), but found (${l.kind}, ${c.kind}) instead.`);
      }
      if (this.collator && !i && this.hasUntypedArgument) {
        const l = q(o), c = q(a);
        if (l.kind !== "string" || c.kind !== "string")
          return e(s, o, a);
      }
      return this.collator ? t(s, o, a, this.collator.evaluate(s)) : e(s, o, a);
    }
    eachChild(s) {
      s(this.lhs), s(this.rhs), this.collator && s(this.collator);
    }
    outputDefined() {
      return !0;
    }
  };
}
const Fu = ot("==", vu, As), Au = ot("!=", bu, _u), zu = ot("<", wu, Su), Ou = ot(">", Cu, Lu), Mu = ot("<=", Tu, Eu), Du = ot(">=", Iu, ku);
class gn {
  constructor(e, t, i) {
    this.type = an, this.locale = i, this.caseSensitive = e, this.diacriticSensitive = t;
  }
  static parse(e, t) {
    if (e.length !== 2)
      return t.error("Expected one argument.");
    const i = e[1];
    if (typeof i != "object" || Array.isArray(i))
      return t.error("Collator options argument must be an object.");
    const r = t.parse(i["case-sensitive"] === void 0 ? !1 : i["case-sensitive"], 1, k);
    if (!r)
      return null;
    const s = t.parse(i["diacritic-sensitive"] === void 0 ? !1 : i["diacritic-sensitive"], 1, k);
    if (!s)
      return null;
    let o = null;
    return i.locale && (o = t.parse(i.locale, 1, S), !o) ? null : new gn(r, s, o);
  }
  evaluate(e) {
    return new Cr(this.caseSensitive.evaluate(e), this.diacriticSensitive.evaluate(e), this.locale ? this.locale.evaluate(e) : null);
  }
  eachChild(e) {
    e(this.caseSensitive), e(this.diacriticSensitive), this.locale && e(this.locale);
  }
  outputDefined() {
    return !1;
  }
}
class Lr {
  constructor(e, t, i, r, s, o) {
    this.type = S, this.number = e, this.locale = t, this.currency = i, this.unit = r, this.minFractionDigits = s, this.maxFractionDigits = o;
  }
  static parse(e, t) {
    if (e.length !== 3)
      return t.error("Expected two arguments.");
    const i = t.parse(e[1], 1, C);
    if (!i)
      return null;
    const r = e[2];
    if (typeof r != "object" || Array.isArray(r))
      return t.error("NumberFormat options argument must be an object.");
    let s = null;
    if (r.locale && (s = t.parse(r.locale, 1, S), !s))
      return null;
    let o = null;
    if (r.currency && (o = t.parse(r.currency, 1, S), !o))
      return null;
    let a = null;
    if (r.unit && (a = t.parse(r.unit, 1, S), !a))
      return null;
    if (o && a)
      return t.error("NumberFormat options `currency` and `unit` are mutually exclusive");
    let l = null;
    if (r["min-fraction-digits"] && (l = t.parse(r["min-fraction-digits"], 1, C), !l))
      return null;
    let c = null;
    return r["max-fraction-digits"] && (c = t.parse(r["max-fraction-digits"], 1, C), !c) ? null : new Lr(i, s, o, a, l, c);
  }
  evaluate(e) {
    return new Intl.NumberFormat(this.locale ? this.locale.evaluate(e) : [], {
      style: this.currency ? "currency" : this.unit ? "unit" : "decimal",
      currency: this.currency ? this.currency.evaluate(e) : void 0,
      unit: this.unit ? this.unit.evaluate(e) : void 0,
      minimumFractionDigits: this.minFractionDigits ? this.minFractionDigits.evaluate(e) : void 0,
      maximumFractionDigits: this.maxFractionDigits ? this.maxFractionDigits.evaluate(e) : void 0
    }).format(this.number.evaluate(e));
  }
  eachChild(e) {
    e(this.number), this.locale && e(this.locale), this.currency && e(this.currency), this.unit && e(this.unit), this.minFractionDigits && e(this.minFractionDigits), this.maxFractionDigits && e(this.maxFractionDigits);
  }
  outputDefined() {
    return !1;
  }
}
class Er {
  constructor(e) {
    this.type = ln, this.sections = e;
  }
  static parse(e, t) {
    if (e.length < 2)
      return t.error("Expected at least one argument.");
    const i = e[1];
    if (!Array.isArray(i) && typeof i == "object")
      return t.error("First argument must be an image or text section.");
    const r = [];
    let s = !1;
    for (let o = 1; o <= e.length - 1; ++o) {
      const a = e[o];
      if (s && typeof a == "object" && !Array.isArray(a)) {
        s = !1;
        let l = null;
        if (a["font-scale"] && (l = t.parse(a["font-scale"], 1, C), !l))
          return null;
        let c = null;
        if (a["text-font"] && (c = t.parse(a["text-font"], 1, H(S)), !c))
          return null;
        let u = null;
        if (a["text-color"] && (u = t.parse(a["text-color"], 1, he), !u))
          return null;
        let f = null;
        if (a["vertical-align"]) {
          if (typeof a["vertical-align"] == "string" && !fu.includes(a["vertical-align"]))
            return t.error(`'vertical-align' must be one of: 'bottom', 'center', 'top' but found '${a["vertical-align"]}' instead.`);
          if (f = t.parse(a["vertical-align"], 1, S), !f)
            return null;
        }
        const h = r[r.length - 1];
        h.scale = l, h.font = c, h.textColor = u, h.verticalAlign = f;
      } else {
        const l = t.parse(e[o], 1, E);
        if (!l)
          return null;
        const c = l.type.kind;
        if (c !== "string" && c !== "value" && c !== "null" && c !== "resolvedImage")
          return t.error("Formatted text type must be 'string', 'value', 'image' or 'null'.");
        s = !0, r.push({
          content: l,
          scale: null,
          font: null,
          textColor: null,
          verticalAlign: null
        });
      }
    }
    return new Er(r);
  }
  evaluate(e) {
    const t = (i) => {
      const r = i.content.evaluate(e);
      return q(r) === St ? new Hn("", r, null, null, null, i.verticalAlign ? i.verticalAlign.evaluate(e) : null) : new Hn(pt(r), null, i.scale ? i.scale.evaluate(e) : null, i.font ? i.font.evaluate(e).join(",") : null, i.textColor ? i.textColor.evaluate(e) : null, i.verticalAlign ? i.verticalAlign.evaluate(e) : null);
    };
    return new pe(this.sections.map(t));
  }
  eachChild(e) {
    for (const t of this.sections)
      e(t.content), t.scale && e(t.scale), t.font && e(t.font), t.textColor && e(t.textColor), t.verticalAlign && e(t.verticalAlign);
  }
  outputDefined() {
    return !1;
  }
}
class kr {
  constructor(e) {
    this.type = St, this.input = e;
  }
  static parse(e, t) {
    if (e.length !== 2)
      return t.error("Expected two arguments.");
    const i = t.parse(e[1], 1, S);
    return i ? new kr(i) : t.error("No image name provided.");
  }
  evaluate(e) {
    const t = this.input.evaluate(e), i = ye.fromString(t);
    return i && e.availableImages && (i.available = e.availableImages.indexOf(t) > -1), i;
  }
  eachChild(e) {
    e(this.input);
  }
  outputDefined() {
    return !1;
  }
}
class Fr {
  constructor(e) {
    this.type = C, this.input = e;
  }
  static parse(e, t) {
    if (e.length !== 2)
      return t.error(`Expected 1 argument, but found ${e.length - 1} instead.`);
    const i = t.parse(e[1], 1);
    return i ? i.type.kind !== "array" && i.type.kind !== "string" && i.type.kind !== "value" ? t.error(`Expected argument of type string or array, but found ${N(i.type)} instead.`) : new Fr(i) : null;
  }
  evaluate(e) {
    const t = this.input.evaluate(e);
    if (typeof t == "string")
      return [...t].length;
    if (Array.isArray(t))
      return t.length;
    throw new B(`Expected value to be of type string or array, but found ${N(q(t))} instead.`);
  }
  eachChild(e) {
    e(this.input);
  }
  outputDefined() {
    return !1;
  }
}
const de = 8192;
function Nu(n, e) {
  const t = Pu(n[0]), i = Ru(n[1]), r = Math.pow(2, e.z);
  return [Math.round(t * r * de), Math.round(i * r * de)];
}
function Ar(n, e) {
  const t = Math.pow(2, e.z), i = (n[0] / de + e.x) / t, r = (n[1] / de + e.y) / t;
  return [Bu(i), $u(r)];
}
function Pu(n) {
  return (180 + n) / 360;
}
function Bu(n) {
  return n * 360 - 180;
}
function Ru(n) {
  return (180 - 180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + n * Math.PI / 360))) / 360;
}
function $u(n) {
  return 360 / Math.PI * Math.atan(Math.exp((180 - n * 360) * Math.PI / 180)) - 90;
}
function Lt(n, e) {
  n[0] = Math.min(n[0], e[0]), n[1] = Math.min(n[1], e[1]), n[2] = Math.max(n[2], e[0]), n[3] = Math.max(n[3], e[1]);
}
function bt(n, e) {
  return !(n[0] <= e[0] || n[2] >= e[2] || n[1] <= e[1] || n[3] >= e[3]);
}
function Vu(n, e, t) {
  return e[1] > n[1] != t[1] > n[1] && n[0] < (t[0] - e[0]) * (n[1] - e[1]) / (t[1] - e[1]) + e[0];
}
function Uu(n, e, t) {
  const i = n[0] - e[0], r = n[1] - e[1], s = n[0] - t[0], o = n[1] - t[1];
  return i * o - s * r === 0 && i * s <= 0 && r * o <= 0;
}
function xn(n, e, t, i) {
  const r = [e[0] - n[0], e[1] - n[1]], s = [i[0] - t[0], i[1] - t[1]];
  return Zu(s, r) === 0 ? !1 : !!(gi(n, e, t, i) && gi(t, i, n, e));
}
function Gu(n, e, t) {
  for (const i of t)
    for (let r = 0; r < i.length - 1; ++r)
      if (xn(n, e, i[r], i[r + 1]))
        return !0;
  return !1;
}
function at(n, e, t = !1) {
  let i = !1;
  for (const r of e)
    for (let s = 0; s < r.length - 1; s++) {
      if (Uu(n, r[s], r[s + 1]))
        return t;
      Vu(n, r[s], r[s + 1]) && (i = !i);
    }
  return i;
}
function qu(n, e) {
  for (const t of e)
    if (at(n, t))
      return !0;
  return !1;
}
function Os(n, e) {
  for (const t of n)
    if (!at(t, e))
      return !1;
  for (let t = 0; t < n.length - 1; ++t)
    if (Gu(n[t], n[t + 1], e))
      return !1;
  return !0;
}
function ju(n, e) {
  for (const t of e)
    if (Os(n, t))
      return !0;
  return !1;
}
function Zu(n, e) {
  return n[0] * e[1] - n[1] * e[0];
}
function gi(n, e, t, i) {
  const r = n[0] - t[0], s = n[1] - t[1], o = e[0] - t[0], a = e[1] - t[1], l = i[0] - t[0], c = i[1] - t[1], u = r * c - l * s, f = o * c - l * a;
  return u > 0 && f < 0 || u < 0 && f > 0;
}
function zr(n, e, t) {
  const i = [];
  for (let r = 0; r < n.length; r++) {
    const s = [];
    for (let o = 0; o < n[r].length; o++) {
      const a = Nu(n[r][o], t);
      Lt(e, a), s.push(a);
    }
    i.push(s);
  }
  return i;
}
function Ms(n, e, t) {
  const i = [];
  for (let r = 0; r < n.length; r++) {
    const s = zr(n[r], e, t);
    i.push(s);
  }
  return i;
}
function Ds(n, e, t, i) {
  if (n[0] < t[0] || n[0] > t[2]) {
    const r = i * 0.5;
    let s = n[0] - t[0] > r ? -i : t[0] - n[0] > r ? i : 0;
    s === 0 && (s = n[0] - t[2] > r ? -i : t[2] - n[0] > r ? i : 0), n[0] += s;
  }
  Lt(e, n);
}
function Wu(n) {
  n[0] = n[1] = 1 / 0, n[2] = n[3] = -1 / 0;
}
function xi(n, e, t, i) {
  const r = Math.pow(2, i.z) * de, s = [i.x * de, i.y * de], o = [];
  for (const a of n)
    for (const l of a) {
      const c = [l.x + s[0], l.y + s[1]];
      Ds(c, e, t, r), o.push(c);
    }
  return o;
}
function vi(n, e, t, i) {
  const r = Math.pow(2, i.z) * de, s = [i.x * de, i.y * de], o = [];
  for (const a of n) {
    const l = [];
    for (const c of a) {
      const u = [c.x + s[0], c.y + s[1]];
      Lt(e, u), l.push(u);
    }
    o.push(l);
  }
  if (e[2] - e[0] <= r / 2) {
    Wu(e);
    for (const a of o)
      for (const l of a)
        Ds(l, e, t, r);
  }
  return o;
}
function Xu(n, e) {
  const t = [1 / 0, 1 / 0, -1 / 0, -1 / 0], i = [1 / 0, 1 / 0, -1 / 0, -1 / 0], r = n.canonicalID();
  if (e.type === "Polygon") {
    const s = zr(e.coordinates, i, r), o = xi(n.geometry(), t, i, r);
    if (!bt(t, i))
      return !1;
    for (const a of o)
      if (!at(a, s))
        return !1;
  }
  if (e.type === "MultiPolygon") {
    const s = Ms(e.coordinates, i, r), o = xi(n.geometry(), t, i, r);
    if (!bt(t, i))
      return !1;
    for (const a of o)
      if (!qu(a, s))
        return !1;
  }
  return !0;
}
function Yu(n, e) {
  const t = [1 / 0, 1 / 0, -1 / 0, -1 / 0], i = [1 / 0, 1 / 0, -1 / 0, -1 / 0], r = n.canonicalID();
  if (e.type === "Polygon") {
    const s = zr(e.coordinates, i, r), o = vi(n.geometry(), t, i, r);
    if (!bt(t, i))
      return !1;
    for (const a of o)
      if (!Os(a, s))
        return !1;
  }
  if (e.type === "MultiPolygon") {
    const s = Ms(e.coordinates, i, r), o = vi(n.geometry(), t, i, r);
    if (!bt(t, i))
      return !1;
    for (const a of o)
      if (!ju(a, s))
        return !1;
  }
  return !0;
}
class Pe {
  constructor(e, t) {
    this.type = k, this.geojson = e, this.geometries = t;
  }
  static parse(e, t) {
    if (e.length !== 2)
      return t.error(`'within' expression requires exactly one argument, but found ${e.length - 1} instead.`);
    if (xt(e[1])) {
      const i = e[1];
      if (i.type === "FeatureCollection") {
        const r = [];
        for (const s of i.features) {
          const { type: o, coordinates: a } = s.geometry;
          o === "Polygon" && r.push(a), o === "MultiPolygon" && r.push(...a);
        }
        if (r.length) {
          const s = {
            type: "MultiPolygon",
            coordinates: r
          };
          return new Pe(i, s);
        }
      } else if (i.type === "Feature") {
        const r = i.geometry.type;
        if (r === "Polygon" || r === "MultiPolygon")
          return new Pe(i, i.geometry);
      } else if (i.type === "Polygon" || i.type === "MultiPolygon")
        return new Pe(i, i);
    }
    return t.error("'within' expression requires valid geojson object that contains polygon geometry type.");
  }
  evaluate(e) {
    if (e.geometry() != null && e.canonicalID() != null) {
      if (e.geometryType() === "Point")
        return Xu(e, this.geometries);
      if (e.geometryType() === "LineString")
        return Yu(e, this.geometries);
    }
    return !1;
  }
  eachChild() {
  }
  outputDefined() {
    return !0;
  }
}
class Ns {
  constructor(e = [], t = (i, r) => i < r ? -1 : i > r ? 1 : 0) {
    if (this.data = e, this.length = this.data.length, this.compare = t, this.length > 0)
      for (let i = (this.length >> 1) - 1; i >= 0; i--) this._down(i);
  }
  push(e) {
    this.data.push(e), this._up(this.length++);
  }
  pop() {
    if (this.length === 0) return;
    const e = this.data[0], t = this.data.pop();
    return --this.length > 0 && (this.data[0] = t, this._down(0)), e;
  }
  peek() {
    return this.data[0];
  }
  _up(e) {
    const { data: t, compare: i } = this, r = t[e];
    for (; e > 0; ) {
      const s = e - 1 >> 1, o = t[s];
      if (i(r, o) >= 0) break;
      t[e] = o, e = s;
    }
    t[e] = r;
  }
  _down(e) {
    const { data: t, compare: i } = this, r = this.length >> 1, s = t[e];
    for (; e < r; ) {
      let o = (e << 1) + 1;
      const a = o + 1;
      if (a < this.length && i(t[a], t[o]) < 0 && (o = a), i(t[o], s) >= 0) break;
      t[e] = t[o], e = o;
    }
    t[e] = s;
  }
}
function Hu(n, e) {
  if (n.length <= 1)
    return [n];
  const i = [];
  let r, s;
  for (const o of n) {
    const a = Ju(o);
    a !== 0 && (o.area = Math.abs(a), s === void 0 && (s = a < 0), s === a < 0 ? (r && i.push(r), r = [o]) : r.push(o));
  }
  return r && i.push(r), i;
}
function Ju(n) {
  let e = 0;
  for (let t = 0, i = n.length, r = i - 1, s, o; t < i; r = t++)
    s = n[t], o = n[r], e += (o.x - s.x) * (s.y + o.y);
  return e;
}
const Ku = 6378.137, bi = 1 / 298.257223563, wi = bi * (2 - bi), Ci = Math.PI / 180;
class Or {
  constructor(e) {
    const t = Ci * Ku * 1e3, i = Math.cos(e * Ci), r = 1 / (1 - wi * (1 - i * i)), s = Math.sqrt(r);
    this.kx = t * s * i, this.ky = t * s * r * (1 - wi);
  }
  /**
   * Given two points of the form [longitude, latitude], returns the distance.
   *
   * @param a - point [longitude, latitude]
   * @param b - point [longitude, latitude]
   * @returns distance
   * @example
   * const distance = ruler.distance([30.5, 50.5], [30.51, 50.49]);
   * //=distance
   */
  distance(e, t) {
    const i = this.wrap(e[0] - t[0]) * this.kx, r = (e[1] - t[1]) * this.ky;
    return Math.sqrt(i * i + r * r);
  }
  /**
   * Returns an object of the form {point, index, t}, where point is closest point on the line
   * from the given point, index is the start index of the segment with the closest point,
   * and t is a parameter from 0 to 1 that indicates where the closest point is on that segment.
   *
   * @param line - an array of points that form the line
   * @param p - point [longitude, latitude]
   * @returns the nearest point, its index in the array and the proportion along the line
   * @example
   * const point = ruler.pointOnLine(line, [-67.04, 50.5]).point;
   * //=point
   */
  pointOnLine(e, t) {
    let i = 1 / 0, r, s, o, a;
    for (let l = 0; l < e.length - 1; l++) {
      let c = e[l][0], u = e[l][1], f = this.wrap(e[l + 1][0] - c) * this.kx, h = (e[l + 1][1] - u) * this.ky, p = 0;
      (f !== 0 || h !== 0) && (p = (this.wrap(t[0] - c) * this.kx * f + (t[1] - u) * this.ky * h) / (f * f + h * h), p > 1 ? (c = e[l + 1][0], u = e[l + 1][1]) : p > 0 && (c += f / this.kx * p, u += h / this.ky * p)), f = this.wrap(t[0] - c) * this.kx, h = (t[1] - u) * this.ky;
      const d = f * f + h * h;
      d < i && (i = d, r = c, s = u, o = l, a = p);
    }
    return {
      point: [r, s],
      index: o,
      t: Math.max(0, Math.min(1, a))
    };
  }
  wrap(e) {
    for (; e < -180; )
      e += 360;
    for (; e > 180; )
      e -= 360;
    return e;
  }
}
const Jn = 100, Kn = 50;
function Ps(n, e) {
  return e[0] - n[0];
}
function Wt(n) {
  return n[1] - n[0] + 1;
}
function be(n, e) {
  return n[1] >= n[0] && n[1] < e;
}
function Qn(n, e) {
  if (n[0] > n[1])
    return [null, null];
  const t = Wt(n);
  if (e) {
    if (t === 2)
      return [n, null];
    const r = Math.floor(t / 2);
    return [
      [n[0], n[0] + r],
      [n[0] + r, n[1]]
    ];
  }
  if (t === 1)
    return [n, null];
  const i = Math.floor(t / 2) - 1;
  return [
    [n[0], n[0] + i],
    [n[0] + i + 1, n[1]]
  ];
}
function er(n, e) {
  if (!be(e, n.length))
    return [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  const t = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  for (let i = e[0]; i <= e[1]; ++i)
    Lt(t, n[i]);
  return t;
}
function tr(n) {
  const e = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  for (const t of n)
    for (const i of t)
      Lt(e, i);
  return e;
}
function Ti(n) {
  return n[0] !== -1 / 0 && n[1] !== -1 / 0 && n[2] !== 1 / 0 && n[3] !== 1 / 0;
}
function Mr(n, e, t) {
  if (!Ti(n) || !Ti(e))
    return NaN;
  let i = 0, r = 0;
  return n[2] < e[0] && (i = e[0] - n[2]), n[0] > e[2] && (i = n[0] - e[2]), n[1] > e[3] && (r = n[1] - e[3]), n[3] < e[1] && (r = e[1] - n[3]), t.distance([0, 0], [i, r]);
}
function Oe(n, e, t) {
  const i = t.pointOnLine(e, n);
  return t.distance(n, i.point);
}
function Dr(n, e, t, i, r) {
  const s = Math.min(Oe(n, [t, i], r), Oe(e, [t, i], r)), o = Math.min(Oe(t, [n, e], r), Oe(i, [n, e], r));
  return Math.min(s, o);
}
function Qu(n, e, t, i, r) {
  if (!(be(e, n.length) && be(i, t.length)))
    return 1 / 0;
  let o = 1 / 0;
  for (let a = e[0]; a < e[1]; ++a) {
    const l = n[a], c = n[a + 1];
    for (let u = i[0]; u < i[1]; ++u) {
      const f = t[u], h = t[u + 1];
      if (xn(l, c, f, h))
        return 0;
      o = Math.min(o, Dr(l, c, f, h, r));
    }
  }
  return o;
}
function ef(n, e, t, i, r) {
  if (!(be(e, n.length) && be(i, t.length)))
    return NaN;
  let o = 1 / 0;
  for (let a = e[0]; a <= e[1]; ++a)
    for (let l = i[0]; l <= i[1]; ++l)
      if (o = Math.min(o, r.distance(n[a], t[l])), o === 0)
        return o;
  return o;
}
function tf(n, e, t) {
  if (at(n, e, !0))
    return 0;
  let i = 1 / 0;
  for (const r of e) {
    const s = r[0], o = r[r.length - 1];
    if (s !== o && (i = Math.min(i, Oe(n, [o, s], t)), i === 0))
      return i;
    const a = t.pointOnLine(r, n);
    if (i = Math.min(i, t.distance(n, a.point)), i === 0)
      return i;
  }
  return i;
}
function nf(n, e, t, i) {
  if (!be(e, n.length))
    return NaN;
  for (let s = e[0]; s <= e[1]; ++s)
    if (at(n[s], t, !0))
      return 0;
  let r = 1 / 0;
  for (let s = e[0]; s < e[1]; ++s) {
    const o = n[s], a = n[s + 1];
    for (const l of t)
      for (let c = 0, u = l.length, f = u - 1; c < u; f = c++) {
        const h = l[f], p = l[c];
        if (xn(o, a, h, p))
          return 0;
        r = Math.min(r, Dr(o, a, h, p, i));
      }
  }
  return r;
}
function Ii(n, e) {
  for (const t of n)
    for (const i of t)
      if (at(i, e, !0))
        return !0;
  return !1;
}
function rf(n, e, t, i = 1 / 0) {
  const r = tr(n), s = tr(e);
  if (i !== 1 / 0 && Mr(r, s, t) >= i)
    return i;
  if (bt(r, s)) {
    if (Ii(n, e))
      return 0;
  } else if (Ii(e, n))
    return 0;
  let o = 1 / 0;
  for (const a of n)
    for (let l = 0, c = a.length, u = c - 1; l < c; u = l++) {
      const f = a[u], h = a[l];
      for (const p of e)
        for (let d = 0, y = p.length, m = y - 1; d < y; m = d++) {
          const x = p[m], w = p[d];
          if (xn(f, h, x, w))
            return 0;
          o = Math.min(o, Dr(f, h, x, w, t));
        }
    }
  return o;
}
function _i(n, e, t, i, r, s) {
  if (!s)
    return;
  const o = Mr(er(i, s), r, t);
  o < e && n.push([o, s, [0, 0]]);
}
function Pt(n, e, t, i, r, s, o) {
  if (!s || !o)
    return;
  const a = Mr(er(i, s), er(r, o), t);
  a < e && n.push([a, s, o]);
}
function Xt(n, e, t, i, r = 1 / 0) {
  let s = Math.min(i.distance(n[0], t[0][0]), r);
  if (s === 0)
    return s;
  const o = new Ns([[0, [0, n.length - 1], [0, 0]]], Ps), a = tr(t);
  for (; o.length > 0; ) {
    const l = o.pop();
    if (l[0] >= s)
      continue;
    const c = l[1], u = e ? Kn : Jn;
    if (Wt(c) <= u) {
      if (!be(c, n.length))
        return NaN;
      if (e) {
        const f = nf(n, c, t, i);
        if (isNaN(f) || f === 0)
          return f;
        s = Math.min(s, f);
      } else
        for (let f = c[0]; f <= c[1]; ++f) {
          const h = tf(n[f], t, i);
          if (s = Math.min(s, h), s === 0)
            return 0;
        }
    } else {
      const f = Qn(c, e);
      _i(o, s, i, n, a, f[0]), _i(o, s, i, n, a, f[1]);
    }
  }
  return s;
}
function Yt(n, e, t, i, r, s = 1 / 0) {
  let o = Math.min(s, r.distance(n[0], t[0]));
  if (o === 0)
    return o;
  const a = new Ns([[0, [0, n.length - 1], [0, t.length - 1]]], Ps);
  for (; a.length > 0; ) {
    const l = a.pop();
    if (l[0] >= o)
      continue;
    const c = l[1], u = l[2], f = e ? Kn : Jn, h = i ? Kn : Jn;
    if (Wt(c) <= f && Wt(u) <= h) {
      if (!be(c, n.length) && be(u, t.length))
        return NaN;
      let p;
      if (e && i)
        p = Qu(n, c, t, u, r), o = Math.min(o, p);
      else if (e && !i) {
        const d = n.slice(c[0], c[1] + 1);
        for (let y = u[0]; y <= u[1]; ++y)
          if (p = Oe(t[y], d, r), o = Math.min(o, p), o === 0)
            return o;
      } else if (!e && i) {
        const d = t.slice(u[0], u[1] + 1);
        for (let y = c[0]; y <= c[1]; ++y)
          if (p = Oe(n[y], d, r), o = Math.min(o, p), o === 0)
            return o;
      } else
        p = ef(n, c, t, u, r), o = Math.min(o, p);
    } else {
      const p = Qn(c, e), d = Qn(u, i);
      Pt(a, o, r, n, t, p[0], d[0]), Pt(a, o, r, n, t, p[0], d[1]), Pt(a, o, r, n, t, p[1], d[0]), Pt(a, o, r, n, t, p[1], d[1]);
    }
  }
  return o;
}
function sf(n, e) {
  const t = n.geometry(), i = t.flat().map((o) => Ar([o.x, o.y], n.canonical));
  if (t.length === 0)
    return NaN;
  const r = new Or(i[0][1]);
  let s = 1 / 0;
  for (const o of e) {
    switch (o.type) {
      case "Point":
        s = Math.min(s, Yt(i, !1, [o.coordinates], !1, r, s));
        break;
      case "LineString":
        s = Math.min(s, Yt(i, !1, o.coordinates, !0, r, s));
        break;
      case "Polygon":
        s = Math.min(s, Xt(i, !1, o.coordinates, r, s));
        break;
    }
    if (s === 0)
      return s;
  }
  return s;
}
function of(n, e) {
  const t = n.geometry(), i = t.flat().map((o) => Ar([o.x, o.y], n.canonical));
  if (t.length === 0)
    return NaN;
  const r = new Or(i[0][1]);
  let s = 1 / 0;
  for (const o of e) {
    switch (o.type) {
      case "Point":
        s = Math.min(s, Yt(i, !0, [o.coordinates], !1, r, s));
        break;
      case "LineString":
        s = Math.min(s, Yt(i, !0, o.coordinates, !0, r, s));
        break;
      case "Polygon":
        s = Math.min(s, Xt(i, !0, o.coordinates, r, s));
        break;
    }
    if (s === 0)
      return s;
  }
  return s;
}
function af(n, e) {
  const t = n.geometry();
  if (t.length === 0 || t[0].length === 0)
    return NaN;
  const i = Hu(t).map((o) => o.map((a) => a.map((l) => Ar([l.x, l.y], n.canonical)))), r = new Or(i[0][0][0][1]);
  let s = 1 / 0;
  for (const o of e)
    for (const a of i) {
      switch (o.type) {
        case "Point":
          s = Math.min(s, Xt([o.coordinates], !1, a, r, s));
          break;
        case "LineString":
          s = Math.min(s, Xt(o.coordinates, !0, a, r, s));
          break;
        case "Polygon":
          s = Math.min(s, rf(a, o.coordinates, r, s));
          break;
      }
      if (s === 0)
        return s;
    }
  return s;
}
function Nn(n) {
  return n.type === "MultiPolygon" ? n.coordinates.map((e) => ({
    type: "Polygon",
    coordinates: e
  })) : n.type === "MultiLineString" ? n.coordinates.map((e) => ({
    type: "LineString",
    coordinates: e
  })) : n.type === "MultiPoint" ? n.coordinates.map((e) => ({
    type: "Point",
    coordinates: e
  })) : [n];
}
class Be {
  constructor(e, t) {
    this.type = C, this.geojson = e, this.geometries = t;
  }
  static parse(e, t) {
    if (e.length !== 2)
      return t.error(`'distance' expression requires exactly one argument, but found ${e.length - 1} instead.`);
    if (xt(e[1])) {
      const i = e[1];
      if (i.type === "FeatureCollection")
        return new Be(i, i.features.map((r) => Nn(r.geometry)).flat());
      if (i.type === "Feature")
        return new Be(i, Nn(i.geometry));
      if ("type" in i && "coordinates" in i)
        return new Be(i, Nn(i));
    }
    return t.error("'distance' expression requires valid geojson object that contains polygon geometry type.");
  }
  evaluate(e) {
    if (e.geometry() != null && e.canonicalID() != null) {
      if (e.geometryType() === "Point")
        return sf(e, this.geometries);
      if (e.geometryType() === "LineString")
        return of(e, this.geometries);
      if (e.geometryType() === "Polygon")
        return af(e, this.geometries);
    }
    return NaN;
  }
  eachChild() {
  }
  outputDefined() {
    return !0;
  }
}
class Et {
  constructor(e) {
    this.type = E, this.key = e;
  }
  static parse(e, t) {
    if (e.length !== 2)
      return t.error(`Expected 1 argument, but found ${e.length - 1} instead.`);
    const i = e[1];
    return i == null ? t.error("Global state property must be defined.") : typeof i != "string" ? t.error(`Global state property must be string, but found ${typeof e[1]} instead.`) : new Et(i);
  }
  evaluate(e) {
    var t;
    const i = (t = e.globals) === null || t === void 0 ? void 0 : t.globalState;
    return !i || Object.keys(i).length === 0 ? null : Es(i, this.key);
  }
  eachChild() {
  }
  outputDefined() {
    return !1;
  }
}
const He = {
  // special forms
  "==": Fu,
  "!=": Au,
  ">": Ou,
  "<": zu,
  ">=": Du,
  "<=": Mu,
  array: le,
  at: Tr,
  boolean: le,
  case: Sr,
  coalesce: vt,
  collator: gn,
  format: Er,
  image: kr,
  in: Ir,
  "index-of": jt,
  interpolate: ae,
  "interpolate-hcl": ae,
  "interpolate-lab": ae,
  length: Fr,
  let: pn,
  literal: Ke,
  match: _r,
  number: le,
  "number-format": Lr,
  object: le,
  slice: Zt,
  step: mn,
  string: le,
  "to-boolean": _e,
  "to-color": _e,
  "to-number": _e,
  "to-string": _e,
  var: dn,
  within: Pe,
  distance: Be,
  "global-state": Et
};
class se {
  constructor(e, t, i, r) {
    this.name = e, this.type = t, this._evaluate = i, this.args = r;
  }
  evaluate(e) {
    return this._evaluate(e, this.args);
  }
  eachChild(e) {
    this.args.forEach(e);
  }
  outputDefined() {
    return !1;
  }
  static parse(e, t) {
    const i = e[0], r = se.definitions[i];
    if (!r)
      return t.error(`Unknown expression "${i}". If you wanted a literal array, use ["literal", [...]].`, 0);
    const s = Array.isArray(r) ? r[0] : r.type, o = Array.isArray(r) ? [[r[1], r[2]]] : r.overloads, a = o.filter(
      ([c]) => !Array.isArray(c) || // varags
      c.length === e.length - 1
      // correct param count
    );
    let l = null;
    for (const [c, u] of a) {
      l = new hn(t.registry, Ht, t.path, null, t.scope);
      const f = [];
      let h = !1;
      for (let p = 1; p < e.length; p++) {
        const d = e[p], y = Array.isArray(c) ? c[p - 1] : c.type, m = l.parse(d, 1 + f.length, y);
        if (!m) {
          h = !0;
          break;
        }
        f.push(m);
      }
      if (!h) {
        if (Array.isArray(c) && c.length !== f.length) {
          l.error(`Expected ${c.length} arguments, but found ${f.length} instead.`);
          continue;
        }
        for (let p = 0; p < f.length; p++) {
          const d = Array.isArray(c) ? c[p] : c.type, y = f[p];
          l.concat(p + 1).checkSubtype(d, y.type);
        }
        if (l.errors.length === 0)
          return new se(i, s, u, f);
      }
    }
    if (a.length === 1)
      t.errors.push(...l.errors);
    else {
      const u = (a.length ? a : o).map(([h]) => cf(h)).join(" | "), f = [];
      for (let h = 1; h < e.length; h++) {
        const p = t.parse(e[h], 1 + f.length);
        if (!p)
          return null;
        f.push(N(p.type));
      }
      t.error(`Expected arguments of type ${u}, but found (${f.join(", ")}) instead.`);
    }
    return null;
  }
  static register(e, t) {
    se.definitions = t;
    for (const i in t)
      e[i] = se;
  }
}
function Si(n, [e, t, i, r]) {
  e = e.evaluate(n), t = t.evaluate(n), i = i.evaluate(n);
  const s = r ? r.evaluate(n) : 1, o = ks(e, t, i, s);
  if (o)
    throw new B(o);
  return new z(e / 255, t / 255, i / 255, s, !1);
}
function Li(n, e) {
  return n in e;
}
function Pn(n, e) {
  const t = e[n];
  return typeof t > "u" ? null : t;
}
function lf(n, e, t, i) {
  for (; t <= i; ) {
    const r = t + i >> 1;
    if (e[r] === n)
      return !0;
    e[r] > n ? i = r - 1 : t = r + 1;
  }
  return !1;
}
function Fe(n) {
  return { type: n };
}
se.register(He, {
  error: [
    Qc,
    [S],
    (n, [e]) => {
      throw new B(e.evaluate(n));
    }
  ],
  typeof: [S, [E], (n, [e]) => N(q(e.evaluate(n)))],
  "to-rgba": [
    H(C, 4),
    [he],
    (n, [e]) => {
      const [t, i, r, s] = e.evaluate(n).rgb;
      return [t * 255, i * 255, r * 255, s];
    }
  ],
  rgb: [he, [C, C, C], Si],
  rgba: [he, [C, C, C, C], Si],
  has: {
    type: k,
    overloads: [
      [[S], (n, [e]) => Li(e.evaluate(n), n.properties())],
      [
        [S, De],
        (n, [e, t]) => Li(e.evaluate(n), t.evaluate(n))
      ]
    ]
  },
  get: {
    type: E,
    overloads: [
      [[S], (n, [e]) => Pn(e.evaluate(n), n.properties())],
      [
        [S, De],
        (n, [e, t]) => Pn(e.evaluate(n), t.evaluate(n))
      ]
    ]
  },
  "feature-state": [
    E,
    [S],
    (n, [e]) => Pn(e.evaluate(n), n.featureState || {})
  ],
  properties: [De, [], (n) => n.properties()],
  "geometry-type": [S, [], (n) => n.geometryType()],
  id: [E, [], (n) => n.id()],
  zoom: [C, [], (n) => n.globals.zoom],
  "heatmap-density": [C, [], (n) => n.globals.heatmapDensity || 0],
  elevation: [C, [], (n) => n.globals.elevation || 0],
  "line-progress": [C, [], (n) => n.globals.lineProgress || 0],
  accumulated: [
    E,
    [],
    (n) => n.globals.accumulated === void 0 ? null : n.globals.accumulated
  ],
  "+": [
    C,
    Fe(C),
    (n, e) => {
      let t = 0;
      for (const i of e)
        t += i.evaluate(n);
      return t;
    }
  ],
  "*": [
    C,
    Fe(C),
    (n, e) => {
      let t = 1;
      for (const i of e)
        t *= i.evaluate(n);
      return t;
    }
  ],
  "-": {
    type: C,
    overloads: [
      [[C, C], (n, [e, t]) => e.evaluate(n) - t.evaluate(n)],
      [[C], (n, [e]) => -e.evaluate(n)]
    ]
  },
  "/": [C, [C, C], (n, [e, t]) => e.evaluate(n) / t.evaluate(n)],
  "%": [C, [C, C], (n, [e, t]) => e.evaluate(n) % t.evaluate(n)],
  ln2: [C, [], () => Math.LN2],
  pi: [C, [], () => Math.PI],
  e: [C, [], () => Math.E],
  "^": [
    C,
    [C, C],
    (n, [e, t]) => Math.pow(e.evaluate(n), t.evaluate(n))
  ],
  sqrt: [C, [C], (n, [e]) => Math.sqrt(e.evaluate(n))],
  log10: [C, [C], (n, [e]) => Math.log(e.evaluate(n)) / Math.LN10],
  ln: [C, [C], (n, [e]) => Math.log(e.evaluate(n))],
  log2: [C, [C], (n, [e]) => Math.log(e.evaluate(n)) / Math.LN2],
  sin: [C, [C], (n, [e]) => Math.sin(e.evaluate(n))],
  cos: [C, [C], (n, [e]) => Math.cos(e.evaluate(n))],
  tan: [C, [C], (n, [e]) => Math.tan(e.evaluate(n))],
  asin: [C, [C], (n, [e]) => Math.asin(e.evaluate(n))],
  acos: [C, [C], (n, [e]) => Math.acos(e.evaluate(n))],
  atan: [C, [C], (n, [e]) => Math.atan(e.evaluate(n))],
  min: [
    C,
    Fe(C),
    (n, e) => Math.min(...e.map((t) => t.evaluate(n)))
  ],
  max: [
    C,
    Fe(C),
    (n, e) => Math.max(...e.map((t) => t.evaluate(n)))
  ],
  abs: [C, [C], (n, [e]) => Math.abs(e.evaluate(n))],
  round: [
    C,
    [C],
    (n, [e]) => {
      const t = e.evaluate(n);
      return t < 0 ? -Math.round(-t) : Math.round(t);
    }
  ],
  floor: [C, [C], (n, [e]) => Math.floor(e.evaluate(n))],
  ceil: [C, [C], (n, [e]) => Math.ceil(e.evaluate(n))],
  "filter-==": [
    k,
    [S, E],
    (n, [e, t]) => n.properties()[e.value] === t.value
  ],
  "filter-id-==": [k, [E], (n, [e]) => n.id() === e.value],
  "filter-type-==": [
    k,
    [S],
    (n, [e]) => n.geometryType() === e.value
  ],
  "filter-<": [
    k,
    [S, E],
    (n, [e, t]) => {
      const i = n.properties()[e.value], r = t.value;
      return typeof i == typeof r && i < r;
    }
  ],
  "filter-id-<": [
    k,
    [E],
    (n, [e]) => {
      const t = n.id(), i = e.value;
      return typeof t == typeof i && t < i;
    }
  ],
  "filter->": [
    k,
    [S, E],
    (n, [e, t]) => {
      const i = n.properties()[e.value], r = t.value;
      return typeof i == typeof r && i > r;
    }
  ],
  "filter-id->": [
    k,
    [E],
    (n, [e]) => {
      const t = n.id(), i = e.value;
      return typeof t == typeof i && t > i;
    }
  ],
  "filter-<=": [
    k,
    [S, E],
    (n, [e, t]) => {
      const i = n.properties()[e.value], r = t.value;
      return typeof i == typeof r && i <= r;
    }
  ],
  "filter-id-<=": [
    k,
    [E],
    (n, [e]) => {
      const t = n.id(), i = e.value;
      return typeof t == typeof i && t <= i;
    }
  ],
  "filter->=": [
    k,
    [S, E],
    (n, [e, t]) => {
      const i = n.properties()[e.value], r = t.value;
      return typeof i == typeof r && i >= r;
    }
  ],
  "filter-id->=": [
    k,
    [E],
    (n, [e]) => {
      const t = n.id(), i = e.value;
      return typeof t == typeof i && t >= i;
    }
  ],
  "filter-has": [k, [E], (n, [e]) => e.value in n.properties()],
  "filter-has-id": [k, [], (n) => n.id() !== null && n.id() !== void 0],
  "filter-type-in": [
    k,
    [H(S)],
    (n, [e]) => e.value.indexOf(n.geometryType()) >= 0
  ],
  "filter-id-in": [
    k,
    [H(E)],
    (n, [e]) => e.value.indexOf(n.id()) >= 0
  ],
  "filter-in-small": [
    k,
    [S, H(E)],
    // assumes v is an array literal
    (n, [e, t]) => t.value.indexOf(n.properties()[e.value]) >= 0
  ],
  "filter-in-large": [
    k,
    [S, H(E)],
    // assumes v is a array literal with values sorted in ascending order and of a single type
    (n, [e, t]) => lf(n.properties()[e.value], t.value, 0, t.value.length - 1)
  ],
  all: {
    type: k,
    overloads: [
      [[k, k], (n, [e, t]) => e.evaluate(n) && t.evaluate(n)],
      [
        Fe(k),
        (n, e) => {
          for (const t of e)
            if (!t.evaluate(n))
              return !1;
          return !0;
        }
      ]
    ]
  },
  any: {
    type: k,
    overloads: [
      [[k, k], (n, [e, t]) => e.evaluate(n) || t.evaluate(n)],
      [
        Fe(k),
        (n, e) => {
          for (const t of e)
            if (t.evaluate(n))
              return !0;
          return !1;
        }
      ]
    ]
  },
  "!": [k, [k], (n, [e]) => !e.evaluate(n)],
  "is-supported-script": [
    k,
    [S],
    // At parse time this will always return true, so we need to exclude this expression with isGlobalPropertyConstant
    (n, [e]) => {
      const t = n.globals && n.globals.isSupportedScript;
      return t ? t(e.evaluate(n)) : !0;
    }
  ],
  upcase: [S, [S], (n, [e]) => e.evaluate(n).toUpperCase()],
  downcase: [S, [S], (n, [e]) => e.evaluate(n).toLowerCase()],
  concat: [
    S,
    Fe(E),
    (n, e) => e.map((t) => pt(t.evaluate(n))).join("")
  ],
  split: [
    H(S),
    [S, S],
    (n, [e, t]) => e.evaluate(n).split(t.evaluate(n))
  ],
  join: [
    S,
    [H(S), S],
    (n, [e, t]) => e.evaluate(n).join(t.evaluate(n))
  ],
  "resolved-locale": [
    S,
    [an],
    (n, [e]) => e.evaluate(n).resolvedLocale()
  ]
});
function cf(n) {
  return Array.isArray(n) ? `(${n.map(N).join(", ")})` : `(${N(n.type)}...)`;
}
function Ht(n) {
  if (n instanceof dn)
    return Ht(n.boundExpression);
  if (n instanceof se && n.name === "error")
    return !1;
  if (n instanceof gn)
    return !1;
  if (n instanceof Pe)
    return !1;
  if (n instanceof Be)
    return !1;
  if (n instanceof Et)
    return !1;
  const e = n instanceof _e || n instanceof le;
  let t = !0;
  return n.eachChild((i) => {
    e ? t = t && Ht(i) : t = t && i instanceof Ke;
  }), t ? Nr(n) && Br(n, [
    "zoom",
    "heatmap-density",
    "elevation",
    "line-progress",
    "accumulated",
    "is-supported-script"
  ]) : !1;
}
function Nr(n) {
  if (n instanceof se) {
    if (n.name === "get" && n.args.length === 1)
      return !1;
    if (n.name === "feature-state")
      return !1;
    if (n.name === "has" && n.args.length === 1)
      return !1;
    if (n.name === "properties" || n.name === "geometry-type" || n.name === "id")
      return !1;
    if (/^filter-/.test(n.name))
      return !1;
  }
  if (n instanceof Pe || n instanceof Be)
    return !1;
  let e = !0;
  return n.eachChild((t) => {
    e && !Nr(t) && (e = !1);
  }), e;
}
function Pr(n) {
  if (n instanceof se && n.name === "feature-state")
    return !1;
  let e = !0;
  return n.eachChild((t) => {
    e && !Pr(t) && (e = !1);
  }), e;
}
function Br(n, e) {
  if (n instanceof se && e.indexOf(n.name) >= 0)
    return !1;
  let t = !0;
  return n.eachChild((i) => {
    t && !Br(i, e) && (t = !1);
  }), t;
}
function nr(n) {
  return { result: "success", value: n };
}
function Ze(n) {
  return { result: "error", value: n };
}
function uf(n) {
  return n["property-type"] === "data-driven" || n["property-type"] === "cross-faded-data-driven";
}
function ff(n) {
  return !!n.expression && n.expression.parameters.indexOf("zoom") > -1;
}
function Bs(n) {
  return !!n.expression && n.expression.interpolated;
}
function Rr(n) {
  return n instanceof Number ? "number" : n instanceof String ? "string" : n instanceof Boolean ? "boolean" : Array.isArray(n) ? "array" : n === null ? "null" : typeof n;
}
function Rs(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n) && q(n) === De;
}
function hf(n) {
  return n;
}
function pf(n) {
  switch (n.type) {
    case "color":
      return z.parse;
    case "padding":
      return J.parse;
    case "numberArray":
      return K.parse;
    case "colorArray":
      return W.parse;
    default:
      return null;
  }
}
function df(n) {
  switch (n) {
    case "exponential":
      return Vs;
    case "interval":
      return mf;
    case "categorical":
      return yf;
    case "identity":
      return gf;
    default:
      throw new Error(`Unknown function type "${n}"`);
  }
}
function $s(n, e) {
  const t = n.stops && typeof n.stops[0][0] == "object", i = t || n.property !== void 0, r = t || !i, s = n.type || (Bs(e) ? "exponential" : "interval"), o = pf(e);
  if (o && (n = vs({}, n), n.stops && (n.stops = n.stops.map((u) => [u[0], o(u[1])])), n.default ? n.default = o(n.default) : n.default = o(e.default)), n.colorSpace && !uu(n.colorSpace))
    throw new Error(`Unknown color space: "${n.colorSpace}"`);
  const a = df(s);
  let l, c;
  if (s === "categorical") {
    l = /* @__PURE__ */ Object.create(null);
    for (const u of n.stops)
      l[u[0]] = u[1];
    c = typeof n.stops[0][0];
  }
  if (t) {
    const u = {}, f = [];
    for (let d = 0; d < n.stops.length; d++) {
      const y = n.stops[d], m = y[0].zoom;
      u[m] === void 0 && (u[m] = {
        zoom: m,
        type: n.type,
        property: n.property,
        default: n.default,
        stops: []
      }, f.push(m)), u[m].stops.push([y[0].value, y[1]]);
    }
    const h = [];
    for (const d of f)
      h.push([
        u[d].zoom,
        $s(u[d], e)
      ]);
    const p = { name: "linear" };
    return {
      kind: "composite",
      interpolationType: p,
      interpolationFactor: ae.interpolationFactor.bind(void 0, p),
      zoomStops: h.map((d) => d[0]),
      evaluate({ zoom: d }, y) {
        return Vs({
          stops: h,
          base: n.base
        }, e, d).evaluate(d, y);
      }
    };
  } else if (r) {
    const u = s === "exponential" ? { name: "exponential", base: n.base !== void 0 ? n.base : 1 } : null;
    return {
      kind: "camera",
      interpolationType: u,
      interpolationFactor: ae.interpolationFactor.bind(void 0, u),
      zoomStops: n.stops.map((f) => f[0]),
      evaluate: ({ zoom: f }) => a(n, e, f, l, c)
    };
  } else
    return {
      kind: "source",
      evaluate(u, f) {
        const h = f && f.properties ? f.properties[n.property] : void 0;
        return h === void 0 ? kt(n.default, e.default) : a(n, e, h, l, c);
      }
    };
}
function kt(n, e, t) {
  if (n !== void 0)
    return n;
  if (e !== void 0)
    return e;
  if (t !== void 0)
    return t;
}
function yf(n, e, t, i, r) {
  const s = typeof t === r ? i[t] : void 0;
  return kt(s, n.default, e.default);
}
function mf(n, e, t) {
  if (Rr(t) !== "number")
    return kt(n.default, e.default);
  const i = n.stops.length;
  if (i === 1 || t <= n.stops[0][0])
    return n.stops[0][1];
  if (t >= n.stops[i - 1][0])
    return n.stops[i - 1][1];
  const r = yn(n.stops.map((s) => s[0]), t);
  return n.stops[r][1];
}
function Vs(n, e, t) {
  const i = n.base !== void 0 ? n.base : 1;
  if (Rr(t) !== "number")
    return kt(n.default, e.default);
  const r = n.stops.length;
  if (r === 1 || t <= n.stops[0][0])
    return n.stops[0][1];
  if (t >= n.stops[r - 1][0])
    return n.stops[r - 1][1];
  const s = yn(n.stops.map((u) => u[0]), t), o = xf(t, i, n.stops[s][0], n.stops[s + 1][0]), a = n.stops[s][1], l = n.stops[s + 1][1], c = xu[e.type] || hf;
  return typeof a.evaluate == "function" ? {
    evaluate(...u) {
      const f = a.evaluate.apply(void 0, u), h = l.evaluate.apply(void 0, u);
      if (!(f === void 0 || h === void 0))
        return c(f, h, o, n.colorSpace);
    }
  } : c(a, l, o, n.colorSpace);
}
function gf(n, e, t) {
  switch (e.type) {
    case "color":
      t = z.parse(t);
      break;
    case "formatted":
      t = pe.fromString(t.toString());
      break;
    case "resolvedImage":
      t = ye.fromString(t.toString());
      break;
    case "padding":
      t = J.parse(t);
      break;
    case "colorArray":
      t = W.parse(t);
      break;
    case "numberArray":
      t = K.parse(t);
      break;
    default:
      Rr(t) !== e.type && (e.type !== "enum" || !e.values[t]) && (t = void 0);
  }
  return kt(t, n.default, e.default);
}
function xf(n, e, t, i) {
  const r = i - t, s = n - t;
  return r === 0 ? 0 : e === 1 ? s / r : (Math.pow(e, s) - 1) / (Math.pow(e, r) - 1);
}
class $r {
  constructor(e, t, i) {
    this.expression = e, this._warningHistory = {}, this._evaluator = new Fs(), this._defaultValue = t ? Cf(t) : null, this._enumValues = t && t.type === "enum" ? t.values : null, this._globalState = i;
  }
  evaluateWithoutErrorHandling(e, t, i, r, s, o) {
    return this._globalState && (e = Qe(e, this._globalState)), this._evaluator.globals = e, this._evaluator.feature = t, this._evaluator.featureState = i, this._evaluator.canonical = r, this._evaluator.availableImages = s || null, this._evaluator.formattedSection = o, this.expression.evaluate(this._evaluator);
  }
  evaluate(e, t, i, r, s, o) {
    this._globalState && (e = Qe(e, this._globalState)), this._evaluator.globals = e, this._evaluator.feature = t || null, this._evaluator.featureState = i || null, this._evaluator.canonical = r, this._evaluator.availableImages = s || null, this._evaluator.formattedSection = o || null;
    try {
      const a = this.expression.evaluate(this._evaluator);
      if (a == null || typeof a == "number" && a !== a)
        return this._defaultValue;
      if (this._enumValues && !(a in this._enumValues))
        throw new B(`Expected value to be one of ${Object.keys(this._enumValues).map((l) => JSON.stringify(l)).join(", ")}, but found ${JSON.stringify(a)} instead.`);
      return a;
    } catch (a) {
      return this._warningHistory[a.message] || (this._warningHistory[a.message] = !0, typeof console < "u" && console.warn(a.message)), this._defaultValue;
    }
  }
}
function Us(n) {
  return Array.isArray(n) && n.length > 0 && typeof n[0] == "string" && n[0] in He;
}
function Vr(n, e, t) {
  const i = new hn(He, Ht, [], e ? wf(e) : void 0), r = i.parse(n, void 0, void 0, void 0, e && e.type === "string" ? { typeAnnotation: "coerce" } : void 0);
  return r ? nr(new $r(r, e, t)) : Ze(i.errors);
}
class Jt {
  constructor(e, t, i) {
    this.kind = e, this._styleExpression = t, this.isStateDependent = e !== "constant" && !Pr(t.expression), this.globalStateRefs = vn(t.expression), this._globalState = i;
  }
  evaluateWithoutErrorHandling(e, t, i, r, s, o) {
    return this._globalState && (e = Qe(e, this._globalState)), this._styleExpression.evaluateWithoutErrorHandling(e, t, i, r, s, o);
  }
  evaluate(e, t, i, r, s, o) {
    return this._globalState && (e = Qe(e, this._globalState)), this._styleExpression.evaluate(e, t, i, r, s, o);
  }
}
class Kt {
  constructor(e, t, i, r, s) {
    this.kind = e, this.zoomStops = i, this._styleExpression = t, this.isStateDependent = e !== "camera" && !Pr(t.expression), this.globalStateRefs = vn(t.expression), this.interpolationType = r, this._globalState = s;
  }
  evaluateWithoutErrorHandling(e, t, i, r, s, o) {
    return this._globalState && (e = Qe(e, this._globalState)), this._styleExpression.evaluateWithoutErrorHandling(e, t, i, r, s, o);
  }
  evaluate(e, t, i, r, s, o) {
    return this._globalState && (e = Qe(e, this._globalState)), this._styleExpression.evaluate(e, t, i, r, s, o);
  }
  interpolationFactor(e, t, i) {
    return this.interpolationType ? ae.interpolationFactor(this.interpolationType, e, t, i) : 0;
  }
}
function vf(n) {
  return n._styleExpression !== void 0;
}
function Gs(n, e, t) {
  const i = Vr(n, e, t);
  if (i.result === "error")
    return i;
  const r = i.value.expression, s = Nr(r);
  if (!s && !uf(e))
    return Ze([new fe("", "data expressions not supported")]);
  const o = Br(r, ["zoom"]);
  if (!o && !ff(e))
    return Ze([new fe("", "zoom expressions not supported")]);
  const a = qt(r);
  if (!a && !o)
    return Ze([
      new fe("", '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.')
    ]);
  if (a instanceof fe)
    return Ze([a]);
  if (a instanceof ae && !Bs(e))
    return Ze([
      new fe("", '"interpolate" expressions cannot be used with this property')
    ]);
  if (!a)
    return nr(s ? new Jt("constant", i.value, t) : new Jt("source", i.value, t));
  const l = a instanceof ae ? a.interpolation : void 0;
  return nr(s ? new Kt("camera", i.value, a.labels, l, t) : new Kt("composite", i.value, a.labels, l, t));
}
class Ft {
  constructor(e, t) {
    this._parameters = e, this._specification = t, vs(this, $s(this._parameters, this._specification));
  }
  static deserialize(e) {
    return new Ft(e._parameters, e._specification);
  }
  static serialize(e) {
    return {
      _parameters: e._parameters,
      _specification: e._specification
    };
  }
}
function bf(n, e, t) {
  if (Rs(n))
    return new Ft(n, e);
  if (Us(n)) {
    const i = Gs(n, e, t);
    if (i.result === "error")
      throw new Error(i.value.map((r) => `${r.key}: ${r.message}`).join(", "));
    return i.value;
  } else {
    let i = n;
    return e.type === "color" && typeof n == "string" ? i = z.parse(n) : e.type === "padding" && (typeof n == "number" || Array.isArray(n)) ? i = J.parse(n) : e.type === "numberArray" && (typeof n == "number" || Array.isArray(n)) ? i = K.parse(n) : e.type === "colorArray" && (typeof n == "string" || Array.isArray(n)) ? i = W.parse(n) : e.type === "variableAnchorOffsetCollection" && Array.isArray(n) ? i = oe.parse(n) : e.type === "projectionDefinition" && typeof n == "string" && (i = ie.parse(n)), {
      globalStateRefs: /* @__PURE__ */ new Set(),
      _globalState: null,
      kind: "constant",
      evaluate: () => i
    };
  }
}
function qt(n) {
  let e = null;
  if (n instanceof pn)
    e = qt(n.result);
  else if (n instanceof vt) {
    for (const t of n.args)
      if (e = qt(t), e)
        break;
  } else (n instanceof mn || n instanceof ae) && n.input instanceof se && n.input.name === "zoom" && (e = n);
  return e instanceof fe || n.eachChild((t) => {
    const i = qt(t);
    i instanceof fe ? e = i : !e && i ? e = new fe("", '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.') : e && i && e !== i && (e = new fe("", 'Only one zoom-based "step" or "interpolate" subexpression may be used in an expression.'));
  }), e;
}
function vn(n, e = /* @__PURE__ */ new Set()) {
  return n instanceof Et && e.add(n.key), n.eachChild((t) => {
    vn(t, e);
  }), e;
}
function wf(n) {
  const e = {
    color: he,
    string: S,
    number: C,
    enum: S,
    boolean: k,
    formatted: ln,
    padding: cn,
    numberArray: un,
    colorArray: mt,
    projectionDefinition: on,
    resolvedImage: St,
    variableAnchorOffsetCollection: fn
  };
  return n.type === "array" ? H(e[n.value] || E, n.length) : e[n.type];
}
function Cf(n) {
  if (n.type === "color" && Rs(n.default))
    return new z(0, 0, 0, 0);
  switch (n.type) {
    case "color":
      return z.parse(n.default) || null;
    case "padding":
      return J.parse(n.default) || null;
    case "numberArray":
      return K.parse(n.default) || null;
    case "colorArray":
      return W.parse(n.default) || null;
    case "variableAnchorOffsetCollection":
      return oe.parse(n.default) || null;
    case "projectionDefinition":
      return ie.parse(n.default) || null;
    default:
      return n.default === void 0 ? null : n.default;
  }
}
function Qe(n, e) {
  const { zoom: t, heatmapDensity: i, elevation: r, lineProgress: s, isSupportedScript: o, accumulated: a } = n ?? {};
  return {
    zoom: t,
    heatmapDensity: i,
    elevation: r,
    lineProgress: s,
    isSupportedScript: o,
    accumulated: a,
    globalState: e
  };
}
function Ur(n) {
  if (n === !0 || n === !1)
    return !0;
  if (!Array.isArray(n) || n.length === 0)
    return !1;
  switch (n[0]) {
    case "has":
      return n.length >= 2 && n[1] !== "$id" && n[1] !== "$type";
    case "in":
      return n.length >= 3 && (typeof n[1] != "string" || Array.isArray(n[2]));
    case "!in":
    case "!has":
    case "none":
      return !1;
    case "==":
    case "!=":
    case ">":
    case ">=":
    case "<":
    case "<=":
      return n.length !== 3 || Array.isArray(n[1]) || Array.isArray(n[2]);
    case "any":
    case "all":
      for (const e of n.slice(1))
        if (!Ur(e) && typeof e != "boolean")
          return !1;
      return !0;
    default:
      return !0;
  }
}
const Tf = {
  type: "boolean",
  default: !1,
  transition: !1,
  "property-type": "data-driven",
  expression: {
    interpolated: !1,
    parameters: ["zoom", "feature"]
  }
};
function Ei(n, e) {
  if (n == null)
    return { filter: () => !0, needGeometry: !1, getGlobalStateRefs: () => /* @__PURE__ */ new Set() };
  Ur(n) || (n = Qt(n));
  const t = Vr(n, Tf, e);
  if (t.result === "error")
    throw new Error(t.value.map((i) => `${i.key}: ${i.message}`).join(", "));
  {
    const i = qs(n);
    return {
      filter: (r, s, o) => t.value.evaluate(r, s, {}, o),
      needGeometry: i,
      getGlobalStateRefs: () => vn(t.value.expression)
    };
  }
}
function If(n, e) {
  return n < e ? -1 : n > e ? 1 : 0;
}
function qs(n) {
  if (!Array.isArray(n))
    return !1;
  if (n[0] === "within" || n[0] === "distance")
    return !0;
  for (let e = 1; e < n.length; e++)
    if (qs(n[e]))
      return !0;
  return !1;
}
function Qt(n) {
  if (!n)
    return !0;
  const e = n[0];
  return n.length <= 1 ? e !== "any" : e === "==" ? Bn(n[1], n[2], "==") : e === "!=" ? Bt(Bn(n[1], n[2], "==")) : e === "<" || e === ">" || e === "<=" || e === ">=" ? Bn(n[1], n[2], e) : e === "any" ? _f(n.slice(1)) : e === "all" ? ["all"].concat(n.slice(1).map(Qt)) : e === "none" ? ["all"].concat(n.slice(1).map(Qt).map(Bt)) : e === "in" ? ki(n[1], n.slice(2)) : e === "!in" ? Bt(ki(n[1], n.slice(2))) : e === "has" ? Fi(n[1]) : e === "!has" ? Bt(Fi(n[1])) : !0;
}
function Bn(n, e, t) {
  switch (n) {
    case "$type":
      return [`filter-type-${t}`, e];
    case "$id":
      return [`filter-id-${t}`, e];
    default:
      return [`filter-${t}`, n, e];
  }
}
function _f(n) {
  return ["any"].concat(n.map(Qt));
}
function ki(n, e) {
  if (e.length === 0)
    return !1;
  switch (n) {
    case "$type":
      return ["filter-type-in", ["literal", e]];
    case "$id":
      return ["filter-id-in", ["literal", e]];
    default:
      return e.length > 200 && !e.some((t) => typeof t != typeof e[0]) ? ["filter-in-large", n, ["literal", e.sort(If)]] : ["filter-in-small", n, ["literal", e]];
  }
}
function Fi(n) {
  switch (n) {
    case "$type":
      return !0;
    case "$id":
      return ["filter-has-id"];
    default:
      return ["filter-has", n];
  }
}
function Bt(n) {
  return ["!", n];
}
const Ai = {
  StyleExpression: $r,
  StylePropertyFunction: Ft,
  ZoomConstantExpression: Jt,
  ZoomDependentExpression: Kt,
  createExpression: Vr,
  createPropertyExpression: Gs,
  isExpression: Us,
  isExpressionFilter: Ur,
  isZoomExpression: vf,
  normalizePropertyExpression: bf
};
function Sf(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var Rn, zi;
function Lf() {
  if (zi) return Rn;
  zi = 1, Rn = n;
  function n(e, t, i, r) {
    this.cx = 3 * e, this.bx = 3 * (i - e) - this.cx, this.ax = 1 - this.cx - this.bx, this.cy = 3 * t, this.by = 3 * (r - t) - this.cy, this.ay = 1 - this.cy - this.by, this.p1x = e, this.p1y = t, this.p2x = i, this.p2y = r;
  }
  return n.prototype = {
    sampleCurveX: function(e) {
      return ((this.ax * e + this.bx) * e + this.cx) * e;
    },
    sampleCurveY: function(e) {
      return ((this.ay * e + this.by) * e + this.cy) * e;
    },
    sampleCurveDerivativeX: function(e) {
      return (3 * this.ax * e + 2 * this.bx) * e + this.cx;
    },
    solveCurveX: function(e, t) {
      if (t === void 0 && (t = 1e-6), e < 0) return 0;
      if (e > 1) return 1;
      for (var i = e, r = 0; r < 8; r++) {
        var s = this.sampleCurveX(i) - e;
        if (Math.abs(s) < t) return i;
        var o = this.sampleCurveDerivativeX(i);
        if (Math.abs(o) < 1e-6) break;
        i = i - s / o;
      }
      var a = 0, l = 1;
      for (i = e, r = 0; r < 20 && (s = this.sampleCurveX(i), !(Math.abs(s - e) < t)); r++)
        e > s ? a = i : l = i, i = (l - a) * 0.5 + a;
      return i;
    },
    solve: function(e, t) {
      return this.sampleCurveY(this.solveCurveX(e, t));
    }
  }, Rn;
}
var Ef = Lf();
const kf = /* @__PURE__ */ Sf(Ef);
function Ff(n, e, t, i) {
  const r = new kf(n, e, t, i);
  return (s) => r.solve(s);
}
Ff(0.25, 0.1, 0.25, 1);
function Oi(n, e, t) {
  return Math.min(t, Math.max(e, n));
}
const Mi = {};
function U(n) {
  Mi[n] || (typeof console < "u" && console.warn(n), Mi[n] = !0);
}
class Di {
  constructor(e, t = {}) {
    this.data = t, this.props = /* @__PURE__ */ new Map(), this.groupName = e;
    const i = fi[e];
    for (const r in i)
      if (Object.hasOwnProperty.call(i, r)) {
        const s = i[r], o = t[r], a = Ai.normalizePropertyExpression(
          o === void 0 ? s.default : o,
          s
        );
        this.props.set(r, a);
      }
  }
  setProperty(e, t) {
    const i = fi[this.groupName];
    if (Object.hasOwnProperty.call(i, e)) {
      const r = i[e];
      if (this.data[e] === t)
        return !1;
      const o = Ai.normalizePropertyExpression(
        Cesium.defined(t) ? t : r.default,
        r
      );
      return this.props.set(e, o), !0;
    } else
      return U(`maplibre样式规范不支持属性：${this.groupName}.${e}`), !1;
  }
  /**
   * Replace tokens in a string template with values in an object
   *
   * @param properties - a key/value relationship between tokens and replacements
   * @param text - the template string
   * @returns the template with tokens replaced
   */
  resolveTokens(e, t) {
    return t.replace(/{([^{}]+)}/g, (i, r) => e && r in e ? String(e[r]) : "");
  }
  getDataConstValue(e, t) {
    const i = this.props.get(e);
    return i && i.evaluate({ zoom: t });
  }
  getDataValue(e, t, i) {
    const r = this.props.get(e);
    return r && r.evaluate({ zoom: t }, i);
  }
}
class Af {
  /**
   * @param {import('@maplibre/maplibre-gl-style-spec').LayerSpecification} layer
   */
  constructor(e) {
    this.data = e, this.type = e.type, this.id = e.id, this.minzoom = e.minzoom || 0, this.maxzoom = e.maxzoom || 24, this.source = e.source, this.sourceLayer = e["source-layer"], this.filter = null, this.paint = new Di("paint_" + e.type, e.paint), this.layout = new Di("layout_" + e.type, e.layout), e.filter && (this.filter = Ei(e.filter)), this.paintVersion = 0;
  }
  setLayoutProperty(e, t) {
    return this.layout.setProperty(e, t);
  }
  setPaintProperty(e, t) {
    const i = this.paint.setProperty(e, t);
    return i && this.paintVersion++, i;
  }
  setFilter(e) {
    if (e) {
      if (JSON.stringify(this.data.filter) !== JSON.stringify(e))
        return this.data.filter = e, this.filter = Ei(e), !0;
    } else {
      const t = Cesium.defined(this.filter);
      return this.filter = null, delete this.data.filter, t;
    }
    return !1;
  }
  /**
   * 转换图层样式颜色，内部进行预乘Alpha的逆处理，@maplibre/maplibre-gl-style-spec内部会自动对颜色进行premultiplyAlpha操作，直接使用会出现明显的色差
   * @param {Color} styleColor
   * @param {Cesium.Color} [result]
   * @returns
   */
  convertColor(e, t) {
    if (!e) return;
    const i = e.a > 0 ? 1 / e.a : 1;
    return t || (t = new Cesium.Color()), t.red = e.r * i, t.green = e.g * i, t.blue = e.b * i, t.alpha = e.a, t;
  }
}
class zf {
  constructor(e) {
    this.styleLayers = e, this.renderLayers = [], this.layerIndexMap = {}, this.list = [], this.tileIdCommands = [], this.tileCommands = [], this.visualizers = [];
  }
  init() {
    const { styleLayers: e, renderLayers: t, layerIndexMap: i } = this;
    for (let r = 0; r < e.length; r++) {
      const s = e[r];
      t[r] = [], i[s.id] = r;
    }
    this.tileIdCommands.length = 0, this.tileCommands.length = 0, this.visualizers.length = 0;
  }
  beginFrame() {
    const e = this.renderLayers;
    for (const t of e)
      t.length = 0;
    this.tileIdCommands.length = 0, this.tileCommands.length = 0, this.visualizers.length = 0;
  }
  push(e) {
    const t = this.layerIndexMap[e.id];
    this.renderLayers[t].push(e);
  }
  /**
   * @returns {IRenderLayer[]}
   */
  getList() {
    const e = this.list;
    e.length = 0;
    const t = this.renderLayers;
    for (const i of t)
      i && e.push(...i);
    return e;
  }
  destroy() {
    this.renderLayers.length = 0, this.layerIndexMap = null, this.list.length = 0, this.tileIdCommands.length = 0, this.tileCommands.length = 0, this.visualizers.length = 0;
  }
}
function Of(n, e, t = 2) {
  const i = e && e.length, r = i ? e[0] * t : n.length;
  let s = js(n, 0, r, t, !0);
  const o = [];
  if (!s || s.next === s.prev) return o;
  let a, l, c;
  if (i && (s = Bf(n, e, s, t)), n.length > 80 * t) {
    a = n[0], l = n[1];
    let u = a, f = l;
    for (let h = t; h < r; h += t) {
      const p = n[h], d = n[h + 1];
      p < a && (a = p), d < l && (l = d), p > u && (u = p), d > f && (f = d);
    }
    c = Math.max(u - a, f - l), c = c !== 0 ? 32767 / c : 0;
  }
  return wt(s, o, t, a, l, c, 0), o;
}
function js(n, e, t, i, r) {
  let s;
  if (r === Yf(n, e, t, i) > 0)
    for (let o = e; o < t; o += i) s = Ni(o / i | 0, n[o], n[o + 1], s);
  else
    for (let o = t - i; o >= e; o -= i) s = Ni(o / i | 0, n[o], n[o + 1], s);
  return s && et(s, s.next) && (Tt(s), s = s.next), s;
}
function Re(n, e) {
  if (!n) return n;
  e || (e = n);
  let t = n, i;
  do
    if (i = !1, !t.steiner && (et(t, t.next) || R(t.prev, t, t.next) === 0)) {
      if (Tt(t), t = e = t.prev, t === t.next) break;
      i = !0;
    } else
      t = t.next;
  while (i || t !== e);
  return e;
}
function wt(n, e, t, i, r, s, o) {
  if (!n) return;
  !o && s && Gf(n, i, r, s);
  let a = n;
  for (; n.prev !== n.next; ) {
    const l = n.prev, c = n.next;
    if (s ? Df(n, i, r, s) : Mf(n)) {
      e.push(l.i, n.i, c.i), Tt(n), n = c.next, a = c.next;
      continue;
    }
    if (n = c, n === a) {
      o ? o === 1 ? (n = Nf(Re(n), e), wt(n, e, t, i, r, s, 2)) : o === 2 && Pf(n, e, t, i, r, s) : wt(Re(n), e, t, i, r, s, 1);
      break;
    }
  }
}
function Mf(n) {
  const e = n.prev, t = n, i = n.next;
  if (R(e, t, i) >= 0) return !1;
  const r = e.x, s = t.x, o = i.x, a = e.y, l = t.y, c = i.y, u = Math.min(r, s, o), f = Math.min(a, l, c), h = Math.max(r, s, o), p = Math.max(a, l, c);
  let d = i.next;
  for (; d !== e; ) {
    if (d.x >= u && d.x <= h && d.y >= f && d.y <= p && ut(r, a, s, l, o, c, d.x, d.y) && R(d.prev, d, d.next) >= 0) return !1;
    d = d.next;
  }
  return !0;
}
function Df(n, e, t, i) {
  const r = n.prev, s = n, o = n.next;
  if (R(r, s, o) >= 0) return !1;
  const a = r.x, l = s.x, c = o.x, u = r.y, f = s.y, h = o.y, p = Math.min(a, l, c), d = Math.min(u, f, h), y = Math.max(a, l, c), m = Math.max(u, f, h), x = rr(p, d, e, t, i), w = rr(y, m, e, t, i);
  let v = n.prevZ, g = n.nextZ;
  for (; v && v.z >= x && g && g.z <= w; ) {
    if (v.x >= p && v.x <= y && v.y >= d && v.y <= m && v !== r && v !== o && ut(a, u, l, f, c, h, v.x, v.y) && R(v.prev, v, v.next) >= 0 || (v = v.prevZ, g.x >= p && g.x <= y && g.y >= d && g.y <= m && g !== r && g !== o && ut(a, u, l, f, c, h, g.x, g.y) && R(g.prev, g, g.next) >= 0)) return !1;
    g = g.nextZ;
  }
  for (; v && v.z >= x; ) {
    if (v.x >= p && v.x <= y && v.y >= d && v.y <= m && v !== r && v !== o && ut(a, u, l, f, c, h, v.x, v.y) && R(v.prev, v, v.next) >= 0) return !1;
    v = v.prevZ;
  }
  for (; g && g.z <= w; ) {
    if (g.x >= p && g.x <= y && g.y >= d && g.y <= m && g !== r && g !== o && ut(a, u, l, f, c, h, g.x, g.y) && R(g.prev, g, g.next) >= 0) return !1;
    g = g.nextZ;
  }
  return !0;
}
function Nf(n, e) {
  let t = n;
  do {
    const i = t.prev, r = t.next.next;
    !et(i, r) && Ws(i, t, t.next, r) && Ct(i, r) && Ct(r, i) && (e.push(i.i, t.i, r.i), Tt(t), Tt(t.next), t = n = r), t = t.next;
  } while (t !== n);
  return Re(t);
}
function Pf(n, e, t, i, r, s) {
  let o = n;
  do {
    let a = o.next.next;
    for (; a !== o.prev; ) {
      if (o.i !== a.i && Zf(o, a)) {
        let l = Xs(o, a);
        o = Re(o, o.next), l = Re(l, l.next), wt(o, e, t, i, r, s, 0), wt(l, e, t, i, r, s, 0);
        return;
      }
      a = a.next;
    }
    o = o.next;
  } while (o !== n);
}
function Bf(n, e, t, i) {
  const r = [];
  for (let s = 0, o = e.length; s < o; s++) {
    const a = e[s] * i, l = s < o - 1 ? e[s + 1] * i : n.length, c = js(n, a, l, i, !1);
    c === c.next && (c.steiner = !0), r.push(jf(c));
  }
  r.sort(Rf);
  for (let s = 0; s < r.length; s++)
    t = $f(r[s], t);
  return t;
}
function Rf(n, e) {
  let t = n.x - e.x;
  if (t === 0 && (t = n.y - e.y, t === 0)) {
    const i = (n.next.y - n.y) / (n.next.x - n.x), r = (e.next.y - e.y) / (e.next.x - e.x);
    t = i - r;
  }
  return t;
}
function $f(n, e) {
  const t = Vf(n, e);
  if (!t)
    return e;
  const i = Xs(t, n);
  return Re(i, i.next), Re(t, t.next);
}
function Vf(n, e) {
  let t = e;
  const i = n.x, r = n.y;
  let s = -1 / 0, o;
  if (et(n, t)) return t;
  do {
    if (et(n, t.next)) return t.next;
    if (r <= t.y && r >= t.next.y && t.next.y !== t.y) {
      const f = t.x + (r - t.y) * (t.next.x - t.x) / (t.next.y - t.y);
      if (f <= i && f > s && (s = f, o = t.x < t.next.x ? t : t.next, f === i))
        return o;
    }
    t = t.next;
  } while (t !== e);
  if (!o) return null;
  const a = o, l = o.x, c = o.y;
  let u = 1 / 0;
  t = o;
  do {
    if (i >= t.x && t.x >= l && i !== t.x && Zs(r < c ? i : s, r, l, c, r < c ? s : i, r, t.x, t.y)) {
      const f = Math.abs(r - t.y) / (i - t.x);
      Ct(t, n) && (f < u || f === u && (t.x > o.x || t.x === o.x && Uf(o, t))) && (o = t, u = f);
    }
    t = t.next;
  } while (t !== a);
  return o;
}
function Uf(n, e) {
  return R(n.prev, n, e.prev) < 0 && R(e.next, n, n.next) < 0;
}
function Gf(n, e, t, i) {
  let r = n;
  do
    r.z === 0 && (r.z = rr(r.x, r.y, e, t, i)), r.prevZ = r.prev, r.nextZ = r.next, r = r.next;
  while (r !== n);
  r.prevZ.nextZ = null, r.prevZ = null, qf(r);
}
function qf(n) {
  let e, t = 1;
  do {
    let i = n, r;
    n = null;
    let s = null;
    for (e = 0; i; ) {
      e++;
      let o = i, a = 0;
      for (let c = 0; c < t && (a++, o = o.nextZ, !!o); c++)
        ;
      let l = t;
      for (; a > 0 || l > 0 && o; )
        a !== 0 && (l === 0 || !o || i.z <= o.z) ? (r = i, i = i.nextZ, a--) : (r = o, o = o.nextZ, l--), s ? s.nextZ = r : n = r, r.prevZ = s, s = r;
      i = o;
    }
    s.nextZ = null, t *= 2;
  } while (e > 1);
  return n;
}
function rr(n, e, t, i, r) {
  return n = (n - t) * r | 0, e = (e - i) * r | 0, n = (n | n << 8) & 16711935, n = (n | n << 4) & 252645135, n = (n | n << 2) & 858993459, n = (n | n << 1) & 1431655765, e = (e | e << 8) & 16711935, e = (e | e << 4) & 252645135, e = (e | e << 2) & 858993459, e = (e | e << 1) & 1431655765, n | e << 1;
}
function jf(n) {
  let e = n, t = n;
  do
    (e.x < t.x || e.x === t.x && e.y < t.y) && (t = e), e = e.next;
  while (e !== n);
  return t;
}
function Zs(n, e, t, i, r, s, o, a) {
  return (r - o) * (e - a) >= (n - o) * (s - a) && (n - o) * (i - a) >= (t - o) * (e - a) && (t - o) * (s - a) >= (r - o) * (i - a);
}
function ut(n, e, t, i, r, s, o, a) {
  return !(n === o && e === a) && Zs(n, e, t, i, r, s, o, a);
}
function Zf(n, e) {
  return n.next.i !== e.i && n.prev.i !== e.i && !Wf(n, e) && // doesn't intersect other edges
  (Ct(n, e) && Ct(e, n) && Xf(n, e) && // locally visible
  (R(n.prev, n, e.prev) || R(n, e.prev, e)) || // does not create opposite-facing sectors
  et(n, e) && R(n.prev, n, n.next) > 0 && R(e.prev, e, e.next) > 0);
}
function R(n, e, t) {
  return (e.y - n.y) * (t.x - e.x) - (e.x - n.x) * (t.y - e.y);
}
function et(n, e) {
  return n.x === e.x && n.y === e.y;
}
function Ws(n, e, t, i) {
  const r = $t(R(n, e, t)), s = $t(R(n, e, i)), o = $t(R(t, i, n)), a = $t(R(t, i, e));
  return !!(r !== s && o !== a || r === 0 && Rt(n, t, e) || s === 0 && Rt(n, i, e) || o === 0 && Rt(t, n, i) || a === 0 && Rt(t, e, i));
}
function Rt(n, e, t) {
  return e.x <= Math.max(n.x, t.x) && e.x >= Math.min(n.x, t.x) && e.y <= Math.max(n.y, t.y) && e.y >= Math.min(n.y, t.y);
}
function $t(n) {
  return n > 0 ? 1 : n < 0 ? -1 : 0;
}
function Wf(n, e) {
  let t = n;
  do {
    if (t.i !== n.i && t.next.i !== n.i && t.i !== e.i && t.next.i !== e.i && Ws(t, t.next, n, e)) return !0;
    t = t.next;
  } while (t !== n);
  return !1;
}
function Ct(n, e) {
  return R(n.prev, n, n.next) < 0 ? R(n, e, n.next) >= 0 && R(n, n.prev, e) >= 0 : R(n, e, n.prev) < 0 || R(n, n.next, e) < 0;
}
function Xf(n, e) {
  let t = n, i = !1;
  const r = (n.x + e.x) / 2, s = (n.y + e.y) / 2;
  do
    t.y > s != t.next.y > s && t.next.y !== t.y && r < (t.next.x - t.x) * (s - t.y) / (t.next.y - t.y) + t.x && (i = !i), t = t.next;
  while (t !== n);
  return i;
}
function Xs(n, e) {
  const t = ir(n.i, n.x, n.y), i = ir(e.i, e.x, e.y), r = n.next, s = e.prev;
  return n.next = e, e.prev = n, t.next = r, r.prev = t, i.next = t, t.prev = i, s.next = i, i.prev = s, i;
}
function Ni(n, e, t, i) {
  const r = ir(n, e, t);
  return i ? (r.next = i.next, r.prev = i, i.next.prev = r, i.next = r) : (r.prev = r, r.next = r), r;
}
function Tt(n) {
  n.next.prev = n.prev, n.prev.next = n.next, n.prevZ && (n.prevZ.nextZ = n.nextZ), n.nextZ && (n.nextZ.prevZ = n.prevZ);
}
function ir(n, e, t) {
  return {
    i: n,
    // vertex index in coordinates array
    x: e,
    y: t,
    // vertex coordinates
    prev: null,
    // previous and next vertex nodes in a polygon ring
    next: null,
    z: 0,
    // z-order curve value
    prevZ: null,
    // previous and next nodes in z-order
    nextZ: null,
    steiner: !1
    // indicates whether this is a steiner point
  };
}
function Yf(n, e, t, i) {
  let r = 0;
  for (let s = e, o = t - i; s < t; s += i)
    r += (n[o] - n[s]) * (n[s + 1] + n[o + 1]), o = s;
  return r;
}
class xe {
  constructor(e, t) {
    if (t > e)
      throw new Error("Min granularity must not be greater than base granularity.");
    this._baseZoomGranularity = e, this._minGranularity = t;
  }
  getGranularityForZoomLevel(e) {
    const t = 1 << e;
    return Math.max(Math.floor(this._baseZoomGranularity / t), this._minGranularity, 1);
  }
}
const tn = class tn {
  constructor(e) {
    this.fill = e.fill, this.line = e.line, this.tile = e.tile, this.stencil = e.stencil, this.circle = e.circle;
  }
};
tn.noSubdivision = new tn({
  fill: new xe(0, 0),
  line: new xe(0, 0),
  tile: new xe(0, 0),
  stencil: new xe(0, 0),
  circle: 1
});
let en = tn;
const Te = 3;
class Gr {
  constructor(e, t, i) {
    const r = this.cells = [];
    if (e instanceof ArrayBuffer) {
      this.arrayBuffer = e;
      const o = new Int32Array(this.arrayBuffer);
      e = o[0], t = o[1], i = o[2], this.d = t + 2 * i;
      for (let c = 0; c < this.d * this.d; c++) {
        const u = o[Te + c], f = o[Te + c + 1];
        r.push(u === f ? null : o.subarray(u, f));
      }
      const a = o[Te + r.length], l = o[Te + r.length + 1];
      this.keys = o.subarray(a, l), this.bboxes = o.subarray(l), this.insert = this._insertReadonly;
    } else {
      this.d = t + 2 * i;
      for (let o = 0; o < this.d * this.d; o++)
        r.push([]);
      this.keys = [], this.bboxes = [];
    }
    this.n = t, this.extent = e, this.padding = i, this.scale = t / e, this.uid = 0;
    const s = i / t * e;
    this.min = -s, this.max = e + s;
  }
  insert(e, t, i, r, s) {
    this._forEachCell(t, i, r, s, this._insertCell, this.uid++, void 0, void 0), this.keys.push(e), this.bboxes.push(t), this.bboxes.push(i), this.bboxes.push(r), this.bboxes.push(s);
  }
  _insertReadonly() {
    throw new Error("Cannot insert into a GridIndex created from an ArrayBuffer.");
  }
  _insertCell(e, t, i, r, s, o) {
    this.cells[s].push(o);
  }
  query(e, t, i, r, s) {
    const o = this.min, a = this.max;
    if (e <= o && t <= o && a <= i && a <= r && !s)
      return [...this.keys];
    {
      const l = [], c = {};
      return this._forEachCell(e, t, i, r, this._queryCell, l, c, s), l;
    }
  }
  _queryCell(e, t, i, r, s, o, a, l) {
    const c = this.cells[s];
    if (c !== null) {
      const u = this.keys, f = this.bboxes;
      for (const h of c)
        if (a[h] === void 0) {
          const p = h * 4;
          (l ? l(f[p + 0], f[p + 1], f[p + 2], f[p + 3]) : e <= f[p + 2] && t <= f[p + 3] && i >= f[p + 0] && r >= f[p + 1]) ? (a[h] = !0, o.push(u[h])) : a[h] = !1;
        }
    }
  }
  _forEachCell(e, t, i, r, s, o, a, l) {
    const c = this._convertToCellCoord(e), u = this._convertToCellCoord(t), f = this._convertToCellCoord(i), h = this._convertToCellCoord(r);
    for (let p = c; p <= f; p++)
      for (let d = u; d <= h; d++) {
        const y = this.d * d + p;
        if (!(l && !l(
          this._convertFromCellCoord(p),
          this._convertFromCellCoord(d),
          this._convertFromCellCoord(p + 1),
          this._convertFromCellCoord(d + 1)
        )) && s.call(this, e, t, i, r, y, o, a, l))
          return;
      }
  }
  _convertFromCellCoord(e) {
    return (e - this.padding) / this.scale;
  }
  _convertToCellCoord(e) {
    return Math.max(0, Math.min(this.d - 1, Math.floor(e * this.scale) + this.padding));
  }
  toArrayBuffer() {
    if (this.arrayBuffer) return this.arrayBuffer;
    const e = this.cells, t = Te + this.cells.length + 1 + 1;
    let i = 0;
    for (const o of this.cells)
      i += o.length;
    const r = new Int32Array(t + i + this.keys.length + this.bboxes.length);
    r[0] = this.extent, r[1] = this.n, r[2] = this.padding;
    let s = t;
    for (let o = 0; o < e.length; o++) {
      const a = e[o];
      r[Te + o] = s, r.set(a, s), s += a.length;
    }
    return r[Te + e.length] = s, r.set(this.keys, s), s += this.keys.length, r[Te + e.length + 1] = s, r.set(this.bboxes, s), s += this.bboxes.length, r.buffer;
  }
  static serialize(e, t) {
    const i = e.toArrayBuffer();
    return t && t.push(i), { buffer: i };
  }
  static deserialize(e) {
    return new Gr(e.buffer);
  }
}
class Hf extends Error {
  /**
   * @param status - The response's HTTP status code.
   * @param statusText - The response's HTTP status text.
   * @param url - The request's URL.
   * @param body - The response's body.
   */
  constructor(e, t, i, r) {
    super(`AJAXError: ${t} (${e}): ${i}`), this.status = e, this.statusText = t, this.url = i, this.body = r;
  }
}
const Pi = {};
function Q(n, e, t = {}) {
  if (Pi[n]) throw new Error(`${n} is already registered.`);
  Object.defineProperty(e, "_classRegistryKey", {
    value: n,
    writeable: !1
  }), Pi[n] = {
    klass: e,
    omit: t.omit || [],
    shallow: t.shallow || []
  };
}
Q("Object", Object);
Q("Set", Set);
Q("TransferableGridIndex", Gr);
Q("Color", z);
Q("Error", Error);
Q("AJAXError", Hf);
Q("ResolvedImage", ye);
Q("StylePropertyFunction", Ft);
Q("StyleExpression", $r, { omit: ["_evaluator"] });
Q("ZoomDependentExpression", Kt);
Q("ZoomConstantExpression", Jt);
Q("CompoundExpression", se, { omit: ["_evaluate"] });
for (const n in He)
  He[n]._classRegistryKey || Q(`Expression_${n}`, He[n]);
Q("SubdivisionGranularityExpression", xe);
Q("SubdivisionGranularitySetting", en);
const qe = -32768, ct = 32767;
class Jf {
  constructor(e, t) {
    this._vertexBuffer = [], this._vertexDictionary = /* @__PURE__ */ new Map(), this._used = !1, this._granularity = e, this._granularityCellSize = re / e, this._canonical = t;
  }
  _getKey(e, t) {
    return e = e + 32768, t = t + 32768, e << 16 | t << 0;
  }
  /**
   * Returns an index into the internal vertex buffer for a vertex at the given coordinates.
   * If the internal vertex buffer contains no such vertex, then it is added.
   */
  _vertexToIndex(e, t) {
    if (e < -32768 || t < -32768 || e > 32767 || t > 32767)
      throw new Error("Vertex coordinates are out of signed 16 bit integer range.");
    const i = Math.round(e) | 0, r = Math.round(t) | 0, s = this._getKey(i, r);
    if (this._vertexDictionary.has(s))
      return this._vertexDictionary.get(s);
    const o = this._vertexBuffer.length / 2;
    return this._vertexDictionary.set(s, o), this._vertexBuffer.push(i, r), o;
  }
  /**
   * Subdivides a polygon by iterating over rows of granularity subdivision cells and splitting each row along vertical subdivision axes.
   * @param inputIndices - Indices into the internal vertex buffer of the triangulated polygon (after running `earcut`).
   * @returns Indices into the internal vertex buffer for triangles that are a subdivision of the input geometry.
   */
  _subdivideTrianglesScanline(e) {
    if (this._granularity < 2)
      return eh(this._vertexBuffer, e);
    const t = [], i = e.length;
    for (let r = 0; r < i; r += 3) {
      const s = [
        e[r + 0],
        // v0
        e[r + 1],
        // v1
        e[r + 2]
        // v2
      ], o = [
        this._vertexBuffer[e[r + 0] * 2 + 0],
        // v0.x
        this._vertexBuffer[e[r + 0] * 2 + 1],
        // v0.y
        this._vertexBuffer[e[r + 1] * 2 + 0],
        // v1.x
        this._vertexBuffer[e[r + 1] * 2 + 1],
        // v1.y
        this._vertexBuffer[e[r + 2] * 2 + 0],
        // v2.x
        this._vertexBuffer[e[r + 2] * 2 + 1]
        // v2.y
      ];
      let a = 1 / 0, l = 1 / 0, c = -1 / 0, u = -1 / 0;
      for (let y = 0; y < 3; y++) {
        const m = o[y * 2], x = o[y * 2 + 1];
        a = Math.min(a, m), c = Math.max(c, m), l = Math.min(l, x), u = Math.max(u, x);
      }
      if (a === c || l === u)
        continue;
      const f = Math.floor(a / this._granularityCellSize), h = Math.ceil(c / this._granularityCellSize), p = Math.floor(l / this._granularityCellSize), d = Math.ceil(u / this._granularityCellSize);
      if (f === h && p === d) {
        t.push(...s);
        continue;
      }
      for (let y = p; y < d; y++) {
        const m = this._scanlineGenerateVertexRingForCellRow(y, o, s);
        th(this._vertexBuffer, m, t);
      }
    }
    return t;
  }
  /**
   * Takes a triangle and a cell row index, returns a subdivided vertex ring of the intersection of the triangle and the cell row.
   * @param cellRow - Index of the cell row. A cell row of index `i` convert range from `i * granularityCellSize` to `(i + 1) * granularityCellSize`.
   * @param triangleVertices - An array of 6 elements, contains flattened positions of the triangle's vertices: `[v0x, v0y, v1x, v1y, v2x, v2y]`.
   * @param triangleIndices - An array of 3 elements, contains the original indices of the triangle's vertices: `[index0, index1, index2]`.
   * @returns The resulting ring of vertex indices and the index (to the returned ring array) of the leftmost vertex in the ring.
   */
  _scanlineGenerateVertexRingForCellRow(e, t, i) {
    const r = e * this._granularityCellSize, s = r + this._granularityCellSize, o = [];
    for (let a = 0; a < 3; a++) {
      const l = t[a * 2], c = t[a * 2 + 1], u = t[(a + 1) * 2 % 6], f = t[((a + 1) * 2 + 1) % 6], h = t[(a + 2) * 2 % 6], p = t[((a + 2) * 2 + 1) % 6], d = u - l, y = f - c, m = d === 0, x = y === 0, w = (r - c) / y, v = (s - c) / y, g = Math.min(w, v), b = Math.max(w, v);
      if (!x && (g >= 1 || b <= 0) || x && (c < r || c > s)) {
        f >= r && f <= s && o.push(i[(a + 1) % 3]);
        continue;
      }
      if (!x && g > 0) {
        const _ = l + d * g, L = c + y * g;
        o.push(this._vertexToIndex(_, L));
      }
      const T = l + d * Math.max(g, 0), I = l + d * Math.min(b, 1);
      if (m || this._generateIntraEdgeVertices(o, l, c, u, f, T, I), !x && b < 1) {
        const _ = l + d * b, L = c + y * b;
        o.push(this._vertexToIndex(_, L));
      }
      (x || f >= r && f <= s) && o.push(i[(a + 1) % 3]), !x && (f <= r || f >= s) && this._generateInterEdgeVertices(
        o,
        l,
        c,
        u,
        f,
        h,
        p,
        I,
        r,
        s
      );
    }
    return o;
  }
  /**
   * Generates ring vertices along an edge A-\>B, but only in the part that intersects a given cell row.
   * Does not handle adding edge endpoint vertices or edge cell row enter/exit vertices.
   * @param ring - Ordered array of vertex indices for the constructed ring. New indices are placed here.
   * @param enterX - The X coordinate of the point where edge A-\>B enters the current cell row.
   * @param exitX - The X coordinate of the point where edge A-\>B exits the current cell row.
   */
  _generateIntraEdgeVertices(e, t, i, r, s, o, a) {
    const l = r - t, c = s - i, u = c === 0, f = u ? Math.min(t, r) : Math.min(o, a), h = u ? Math.max(t, r) : Math.max(o, a), p = Math.floor(f / this._granularityCellSize) + 1, d = Math.ceil(h / this._granularityCellSize) - 1;
    if (u ? t < r : o < a)
      for (let m = p; m <= d; m++) {
        const x = m * this._granularityCellSize, w = i + c * (x - t) / l;
        e.push(this._vertexToIndex(x, w));
      }
    else
      for (let m = d; m >= p; m--) {
        const x = m * this._granularityCellSize, w = i + c * (x - t) / l;
        e.push(this._vertexToIndex(x, w));
      }
  }
  /**
   * Generates ring vertices along cell border.
   * Call when processing an edge A-\>B that exits the current row (B lies outside the current row).
   * Generates vertices along the cell edge between the exit point from cell row
   * of edge A-\>B and entry of edge B-\>C, or entry of C-\>A if both A and C lie outside the cell row.
   * Does not handle adding edge endpoint vertices or edge cell row enter/exit vertices.
   * @param ring - Ordered array of vertex indices for the constructed ring. New indices are placed here.
   * @param exitX - The X coordinate of the point where edge A-\>B exits the current cell row.
   * @param cellRowYTop - The current cell row top Y coordinate.
   * @param cellRowYBottom - The current cell row bottom Y coordinate.
   */
  _generateInterEdgeVertices(e, t, i, r, s, o, a, l, c, u) {
    const f = s - i, h = o - r, p = a - s, d = (c - s) / p, y = (u - s) / p, m = Math.min(d, y), x = Math.max(d, y), w = r + h * m;
    let v = Math.floor(Math.min(w, l) / this._granularityCellSize) + 1, g = Math.ceil(Math.max(w, l) / this._granularityCellSize) - 1, b = l < w;
    const T = p === 0;
    if (T && (a === c || a === u))
      return;
    if (T || m >= 1 || x <= 0) {
      const _ = t - o, L = i - a, P = (c - a) / L, V = (u - a) / L, D = Math.min(P, V), ee = o + _ * D;
      v = Math.floor(Math.min(ee, l) / this._granularityCellSize) + 1, g = Math.ceil(Math.max(ee, l) / this._granularityCellSize) - 1, b = l < ee;
    }
    const I = f > 0 ? u : c;
    if (b)
      for (let _ = v; _ <= g; _++) {
        const L = _ * this._granularityCellSize;
        e.push(this._vertexToIndex(L, I));
      }
    else
      for (let _ = g; _ >= v; _--) {
        const L = _ * this._granularityCellSize;
        e.push(this._vertexToIndex(L, I));
      }
  }
  /**
   * Generates an outline for a given polygon, returns a list of arrays of line indices.
   */
  _generateOutline(e) {
    const t = [];
    for (const i of e) {
      const r = Ys(i, this._granularity, !0), s = this._pointArrayToIndices(r), o = [];
      for (let a = 1; a < s.length; a++)
        o.push(s[a - 1]), o.push(s[a]);
      t.push(o);
    }
    return t;
  }
  /**
   * Adds pole geometry if needed.
   * @param subdividedTriangles - Array of generated triangle indices, new pole geometry is appended here.
   */
  _handlePoles(e) {
    let t = !1, i = !1;
    this._canonical && (this._canonical.y === 0 && (t = !0), this._canonical.y === (1 << this._canonical.z) - 1 && (i = !0)), (t || i) && this._fillPoles(e, t, i);
  }
  /**
   * Checks the internal vertex buffer for all vertices that might lie on the special pole coordinates and shifts them by one unit.
   * Use for removing unintended pole vertices that might have been created during subdivision. After calling this function, actual pole vertices can be safely generated.
   */
  _ensureNoPoleVertices() {
    const e = this._vertexBuffer;
    for (let t = 0; t < e.length; t += 2) {
      const i = e[t + 1];
      i === qe && (e[t + 1] = qe + 1), i === ct && (e[t + 1] = ct - 1);
    }
  }
  /**
   * Generates a quad from an edge to a pole with the correct winding order.
   * Helper function used inside {@link _fillPoles}.
   * @param indices - Index array into which the geometry is generated.
   * @param i0 - Index of the first edge vertex.
   * @param i1 - Index of the second edge vertex.
   * @param v0x - X coordinate of the first edge vertex.
   * @param v1x - X coordinate of the second edge vertex.
   * @param poleY - The Y coordinate of the desired pole (NORTH_POLE_Y or SOUTH_POLE_Y).
   */
  _generatePoleQuad(e, t, i, r, s, o) {
    r > s != (o === qe) ? (e.push(t), e.push(i), e.push(this._vertexToIndex(r, o)), e.push(i), e.push(this._vertexToIndex(s, o)), e.push(this._vertexToIndex(r, o))) : (e.push(i), e.push(t), e.push(this._vertexToIndex(r, o)), e.push(this._vertexToIndex(s, o)), e.push(i), e.push(this._vertexToIndex(r, o)));
  }
  /**
   * Detects edges that border the north or south tile edge
   * and adds triangles that extend those edges to the poles.
   * Only run this function on tiles that border the poles.
   * Assumes that supplied geometry is clipped to the inclusive range of 0..EXTENT.
   * Mutates the supplies vertex and index arrays.
   * @param indices - Triangle indices. This array is appended with new primitives.
   * @param north - Whether to generate geometry for the north pole.
   * @param south - Whether to generate geometry for the south pole.
   */
  _fillPoles(e, t, i) {
    const r = this._vertexBuffer, s = 0, o = re, a = e.length;
    for (let l = 2; l < a; l += 3) {
      const c = e[l - 2], u = e[l - 1], f = e[l], h = r[c * 2], p = r[c * 2 + 1], d = r[u * 2], y = r[u * 2 + 1], m = r[f * 2], x = r[f * 2 + 1];
      t && (p === s && y === s && this._generatePoleQuad(e, c, u, h, d, qe), y === s && x === s && this._generatePoleQuad(e, u, f, d, m, qe), x === s && p === s && this._generatePoleQuad(e, f, c, m, h, qe)), i && (p === o && y === o && this._generatePoleQuad(e, c, u, h, d, ct), y === o && x === o && this._generatePoleQuad(e, u, f, d, m, ct), x === o && p === o && this._generatePoleQuad(e, f, c, m, h, ct));
    }
  }
  /**
   * Adds all vertices in the supplied flattened vertex buffer into the internal vertex buffer.
   */
  _initializeVertices(e) {
    for (let t = 0; t < e.length; t += 2)
      this._vertexToIndex(e[t], e[t + 1]);
  }
  /**
   * Subdivides an input mesh. Imagine a regular square grid with the target granularity overlaid over the mesh - this is the subdivision's result.
   * Assumes a mesh of tile features - vertex coordinates are integers, visible range where subdivision happens is 0..8192.
   * @param polygon - The input polygon, specified as a list of vertex rings.
   * @param generateOutlineLines - When true, also generates line indices for outline of the supplied polygon.
   * @returns Vertex and index buffers with subdivision applied.
   */
  subdividePolygonInternal(e, t) {
    if (this._used)
      throw new Error("Subdivision: multiple use not allowed.");
    this._used = !0;
    const { flattened: i, holeIndices: r } = Qf(e);
    this._initializeVertices(i);
    let s;
    try {
      const a = Of(i, r), l = this._convertIndices(i, a);
      s = this._subdivideTrianglesScanline(l);
    } catch (a) {
      console.error(a);
    }
    let o = [];
    return t && (o = this._generateOutline(e)), this._ensureNoPoleVertices(), this._handlePoles(s), {
      verticesFlattened: this._vertexBuffer,
      indicesTriangles: s,
      indicesLineList: o
    };
  }
  /**
   * Sometimes the supplies vertex and index array has duplicate vertices - same coordinates that are referenced by multiple different indices.
   * That is not allowed for purposes of subdivision, duplicates are removed in `this.initializeVertices`.
   * This function converts the original index array that indexes into the original vertex array with duplicates
   * into an index array that indexes into `this._finalVertices`.
   * @param vertices - Flattened vertex array used by the old indices. This may contain duplicate vertices.
   * @param oldIndices - Indices into the old vertex array.
   * @returns Indices transformed so that they are valid indices into `this._finalVertices` (with duplicates removed).
   */
  _convertIndices(e, t) {
    const i = [];
    for (const r of t) {
      const s = e[r * 2], o = e[r * 2 + 1];
      i.push(this._vertexToIndex(s, o));
    }
    return i;
  }
  /**
   * Converts an array of points into an array of indices into the internal vertex buffer (`_finalVertices`).
   */
  _pointArrayToIndices(e) {
    const t = [];
    for (const i of e)
      t.push(this._vertexToIndex(i.x, i.y));
    return t;
  }
}
function Kf(n, e, t, i = !0) {
  return new Jf(t, e).subdividePolygonInternal(n, i);
}
function Ys(n, e, t = !1) {
  if (!n || n.length < 1)
    return [];
  if (n.length < 2)
    return [];
  const i = n[0], r = n[n.length - 1], s = t && (i.x !== r.x || i.y !== r.y);
  if (e < 2)
    return s ? [...n, n[0]] : [...n];
  const o = Math.floor(re / e), a = [];
  a.push(new $(n[0].x, n[0].y));
  const l = n.length, c = s ? l : l - 1;
  for (let u = 0; u < c; u++) {
    const f = n[u], h = u < l - 1 ? n[u + 1] : n[0], p = f.x, d = f.y, y = h.x, m = h.y, x = p !== y, w = d !== m;
    if (!x && !w)
      continue;
    const v = y - p, g = m - d, b = Math.abs(v), T = Math.abs(g);
    let I = p, _ = d;
    for (; ; ) {
      const P = v > 0 ? (Math.floor(I / o) + 1) * o : (Math.ceil(I / o) - 1) * o, V = g > 0 ? (Math.floor(_ / o) + 1) * o : (Math.ceil(_ / o) - 1) * o, D = Math.abs(I - P), ee = Math.abs(_ - V), me = Math.abs(I - y), At = Math.abs(_ - m), we = x ? D / b : Number.POSITIVE_INFINITY, $e = w ? ee / T : Number.POSITIVE_INFINITY;
      if ((me <= D || !x) && (At <= ee || !w))
        break;
      if (we < $e && x || !w) {
        I = P, _ = _ + g * we;
        const ke = new $(I, Math.round(_));
        (a[a.length - 1].x !== ke.x || a[a.length - 1].y !== ke.y) && a.push(ke);
      } else {
        I = I + v * $e, _ = V;
        const ke = new $(Math.round(I), _);
        (a[a.length - 1].x !== ke.x || a[a.length - 1].y !== ke.y) && a.push(ke);
      }
    }
    const L = new $(y, m);
    (a[a.length - 1].x !== L.x || a[a.length - 1].y !== L.y) && a.push(L);
  }
  return a;
}
function Qf(n) {
  const e = [], t = [];
  for (const i of n)
    if (i.length !== 0) {
      i !== n[0] && e.push(t.length / 2);
      for (const r of i)
        t.push(r.x), t.push(r.y);
    }
  return {
    flattened: t,
    holeIndices: e
  };
}
function eh(n, e) {
  const t = [];
  for (let i = 0; i < e.length; i += 3) {
    const r = e[i], s = e[i + 1], o = e[i + 2], a = n[r * 2], l = n[r * 2 + 1], c = n[s * 2], u = n[s * 2 + 1], f = n[o * 2], h = n[o * 2 + 1], p = c - a, d = u - l, y = f - a, m = h - l;
    p * m - d * y > 0 ? (t.push(r), t.push(o), t.push(s)) : (t.push(r), t.push(s), t.push(o));
  }
  return t;
}
function th(n, e, t) {
  if (e.length === 0)
    throw new Error("Subdivision vertex ring is empty.");
  let i = 0, r = n[e[0] * 2];
  for (let l = 1; l < e.length; l++) {
    const c = n[e[l] * 2];
    c < r && (r = c, i = l);
  }
  const s = e.length;
  let o = i, a = (o + 1) % s;
  for (; ; ) {
    const l = o - 1 >= 0 ? o - 1 : s - 1, c = (a + 1) % s, u = n[e[l] * 2], f = n[e[l] * 2 + 1], h = n[e[c] * 2], p = n[e[c] * 2 + 1], d = n[e[o] * 2], y = n[e[o] * 2 + 1], m = n[e[a] * 2], x = n[e[a] * 2 + 1];
    let w = !1;
    if (u < h)
      w = !0;
    else if (u > h)
      w = !1;
    else {
      const v = x - y, g = -(m - d), b = y < x ? 1 : -1, T = ((u - d) * v + (f - y) * g) * b, I = ((h - d) * v + (p - y) * g) * b;
      T > I && (w = !0);
    }
    if (w) {
      const v = e[l], g = e[o], b = e[a];
      v !== g && v !== b && g !== b && t.push(b, g, v), o--, o < 0 && (o = s - 1);
    } else {
      const v = e[c], g = e[o], b = e[a];
      v !== g && v !== b && g !== b && t.push(b, g, v), a++, a >= s && (a = 0);
    }
    if (l === c)
      break;
  }
}
const Hs = {
  globe: new en({
    fill: new xe(128, 2),
    line: new xe(512, 0),
    // Always keep at least some subdivision on raster tiles, etc,
    // otherwise they will be visibly warped at high zooms (before mercator transition).
    // This si not needed on fill, because fill geometry tends to already be
    // highly tessellated and granular at high zooms.
    tile: new xe(128, 32),
    // Stencil granularity must never be higher than fill granularity,
    // otherwise we would get seams in the oceans at zoom levels where
    // stencil has higher granularity than fill.
    stencil: new xe(128, 1),
    circle: 3
  })
};
let sr = null, Bi = 0, $n = null;
function nh(n, e) {
  return $n === null && ($n = Cesium.TerrainProvider.getEstimatedLevelZeroGeometricErrorForAHeightmap(
    e.ellipsoid,
    128,
    e.getNumberOfXTilesAtLevel(0)
  )), $n / (1 << n);
}
function rh(n, e) {
  const t = nh(
    e.z,
    e.tilingScheme
  ), i = e.distanceToCamera, r = n.context.drawingBufferHeight, s = n.camera.frustum.sseDenominator;
  let o = t * r / (i * s);
  return n.fog.enabled && (o -= Cesium.Math.fog(i, n.fog.density) * n.fog.sse), o /= n.pixelRatio, o;
}
function ih() {
  sr === null && (sr = Cesium.RenderState.fromCache({
    id: "vt_tile-depth",
    blending: Cesium.BlendingState.DISABLED,
    depthTest: {
      enabled: !0
    },
    depthMask: !0,
    cull: {
      enabled: !0
    },
    stencilMask: Cesium.StencilConstants.CESIUM_3D_TILE_MASK,
    stencilTest: {
      backFunction: 519,
      backOperation: { fail: 7680, zFail: 7680, zPass: 7681 },
      enabled: !0,
      frontFunction: 519,
      frontOperation: { fail: 7680, zFail: 7680, zPass: 7681 },
      mask: 128,
      reference: 128
    },
    colorMask: {
      red: !1,
      green: !1,
      blue: !1,
      alpha: !1
    }
  }));
}
class qr {
  constructor(e) {
    ih(), this.x = e.x, this.y = e.y, this.z = e.z, this.parent = e.parent, this.children = [], this.tilingScheme = e.tilingScheme, this.rectangle = this.tilingScheme.tileXYToRectangle(this.x, this.y, this.z), this.tileBoundingRegion = new Cesium.TileBoundingRegion({
      rectangle: this.rectangle,
      minimumHeight: 0,
      maximumHeight: 0,
      ellipsoid: this.tilingScheme.ellipsoid,
      computeBoundingVolumes: !0
    }), this.layers = [], this.visualizers = [], this.sources = {}, this.tileId = null, this.lastVisitTime = 0, this.state = "none", this.renderable = !1, this.tileId = {
      x: this.x,
      y: this.y,
      z: this.z,
      key: Bi++,
      color: Cesium.Color.fromRgba(Bi - 1),
      tileColor: Cesium.Color.fromRandom({
        alpha: 1
      })
    };
    const t = re * Math.pow(2, this.z), i = re * this.x, r = re * this.y;
    this.transformPoint = function(s, o, a) {
      return a[0] = (s + i) * 360 / t - 180, a[1] = 360 / Math.PI * Math.atan(Math.exp((1 - (o + r) * 2 / t) * Math.PI)) - 90, a;
    };
  }
  createChildren() {
    var e = [
      {
        x: this.x * 2,
        y: this.y * 2 + 1,
        z: this.z + 1
      },
      {
        x: this.x * 2 + 1,
        y: this.y * 2 + 1,
        z: this.z + 1
      },
      {
        x: this.x * 2,
        y: this.y * 2,
        z: this.z + 1
      },
      {
        x: this.x * 2 + 1,
        y: this.y * 2,
        z: this.z + 1
      }
    ];
    for (const { x: i, y: r, z: s } of e) {
      var t = new qr({
        x: i,
        y: r,
        z: s,
        tilingScheme: this.tilingScheme,
        parent: this
      });
      this.children.push(t);
    }
  }
  /**
   * @param {Cesium.FrameState} frameState
   * @param {{visitChildren(child:VectorTileLOD):void;accept(tile:VectorTileLOD):void}} visitor
   * @returns
   */
  visit(e, t) {
    const i = this.tileBoundingRegion;
    if (this.distanceToCamera = i.distanceToCamera(e), this.visibility = e.cullingVolume.computeVisibility(i), this.visibility == Cesium.Intersect.OUTSIDE)
      return;
    const r = e.maximumScreenSpaceError;
    rh(e, this) >= r ? t.visitChildren(this) : t.accept(this);
  }
  /**
   * @param {VectorTileset} tileset
   */
  async getSources(e) {
    const t = {}, i = e._styleJson;
    for (const s of i.layers) {
      const o = s.source, a = e.sources[o];
      a && !t[o] && (t[o] = a);
    }
    if (e._taskProcessor && Object.values(t).every((s) => s.type === "vector")) {
      for (const s in t) {
        const o = t[s];
        try {
          const a = await o.requestTileBuffer(
            this.x,
            this.y,
            this.z,
            e
          );
          a && a.buffer && (this.sources[s] = a);
        } catch {
        }
      }
      this._workerBuffers = !0;
    } else
      for (const s in t) {
        const o = t[s];
        try {
          const a = await o.requestTile(
            this.x,
            this.y,
            this.z,
            e
          );
          a && (this.sources[s] = a);
        } catch {
        }
      }
    e.isDestroyed() || (e.numLoading--, this.state = "loaded");
  }
  /**
   * @param {Cesium.FrameRateMonitor} frameState
   * @param {VectorTileset} tileset
   */
  async createRenderLayers(e, t) {
    const i = this.sources, r = t._styleLayers, s = this.layers, o = this.visualizers, a = {};
    for (const l of r) {
      const c = i[l.source], u = ft[l.type], f = ht[l.type], h = l.type === "background";
      if (u || U("不支持图层类型" + l.type), !h && !c || !u) continue;
      const p = [];
      if (!h) {
        const m = (l.source && t.sources[l.source].type) == "geojson" ? "_geojsonTileLayer" : l.sourceLayer, x = c.layers[m];
        if (!x) continue;
        const w = x.length;
        for (let v = 0; v < w; v++) {
          const g = x.feature(v);
          l.filter && !l.filter.filter({ zoom: this.z }, g) || (g.toGeoJSON || (g.toGeoJSON = tt.prototype.toGeoJSON), p.push(g));
        }
        if (!p.length) continue;
      }
      const d = new u(p, l, this);
      if (s.push(d), f) {
        let y = a[l.type];
        y || (y = new f(this), a[l.type] = y, o.push(y)), y.addLayer(p, d, e, t);
      }
    }
    this.state = "ready";
  }
  /**
   * 从 Web Worker 结果创建渲染图层与 Visualizer（仅几何数据来自 Worker）
   * @param {object} result - Worker 返回的 { fill, line, symbol }
   * @param {Cesium.FrameState} frameState
   * @param {VectorTileset} tileset
   */
  createRenderLayersFromWorkerResult(e, t, i) {
    if (e.error) {
      this.state = "error";
      return;
    }
    const r = i._styleLayers, s = i._styleLayerIndexMap, o = this.layers, a = this.visualizers, l = {}, c = (u) => {
      const f = s.get(u);
      return f === void 0 ? null : r[f];
    };
    for (const u of e.fill || []) {
      const f = c(u.layerId);
      if (!f) continue;
      const h = ft.fill, p = ht.fill, d = new h([], f, this);
      o.push(d);
      let y = l.fill;
      y || (y = new p(this), l.fill = y, a.push(y)), y.addLayerFromWorkerResult(
        u,
        d,
        t,
        i
      );
    }
    for (const u of e.line || []) {
      const f = c(u.layerId);
      if (!f) continue;
      const h = ft.line, p = ht.line, d = new h([], f, this);
      o.push(d);
      let y = l.line;
      y || (y = new p(this), l.line = y, a.push(y)), y.addLayerFromWorkerResult(
        u,
        d,
        t,
        i
      );
    }
    for (const u of e.symbol || []) {
      const f = c(u.layerId);
      if (!f) continue;
      const h = ft.symbol, p = ht.symbol, d = new h([], f, this);
      o.push(d);
      let y = l.symbol;
      y || (y = new p(this), l.symbol = y, a.push(y)), y.addLayerFromWorkerResult(
        u,
        d,
        t,
        i
      );
    }
    this.state = "ready";
  }
  /**
   * @param {Cesium.FrameState} frameState
   * @param {VectorTileRenderList} renderList
   * @param {VectorTileset} tileset
   */
  update(e, t, i) {
    this.primitive || (this.primitive = new Cesium.Primitive({
      geometryInstances: new Cesium.GeometryInstance({
        geometry: new Cesium.RectangleGeometry({
          rectangle: this.rectangle
        })
      }),
      compressVertices: !1,
      asynchronous: !1,
      appearance: new Cesium.MaterialAppearance({
        flat: !0,
        translucent: !1,
        material: Cesium.Material.fromType("Color", {
          color: Cesium.Color.fromAlpha(this.tileId.tileColor, 0.25)
        }),
        renderState: {
          blending: Cesium.BlendingState.ALPHA_BLEND,
          depthMask: !1,
          depthTest: {
            enabled: !0
          },
          cull: {
            enabled: !1
          }
        }
      })
    }), this.primitive.name = "_tile-color_");
    const r = this.commandList || [], s = this.tileIdCommands || [], o = this.tileDepthCommands || [];
    if (!r.length) {
      const u = e.commandList;
      if (e.commandList = r, this.primitive.update(e), r.length) {
        const f = this.tileId.color;
        for (const h of r) {
          h.pass = Cesium.Pass.CESIUM_3D_TILE;
          const p = Cesium.DrawCommand.shallowClone(h);
          p.renderState = Cesium.RenderState.fromCache({
            id: "tileId",
            blending: {
              enabled: !1
            },
            depthTest: {
              enabled: !1
            },
            depthMask: !0,
            cull: {
              enabled: !0
            }
          }), p.layerType = "tile-id", p.uniformMap = {
            ...h.uniformMap
          }, p.uniformMap.color_0 = function() {
            return f;
          }, s.push(p);
          const d = Cesium.DrawCommand.shallowClone(h);
          d.pass = Cesium.Pass.CESIUM_3D_TILE, d.renderState = sr, o.layerType = "tile-depth", o.push(d);
        }
        this.tileIdCommands = s, this.tileDepthCommands = o;
      }
      this.commandList = r, e.commandList = u;
    }
    i.showTileColor && r.length && t.tileCommands.push(...r), this.state == "none" && i.numLoading <= i.maxLoading && (i.numLoading++, this.state = "loading", this.getSources(i));
    const a = i._frameInitBudget, l = !!(this._workerBuffers && i._taskProcessor), c = !l && a && a.remaining <= 0;
    if (this.state === "loaded" && i.numInitializing < i.maxInitializing && !c)
      if (l) {
        const u = {
          sources: {},
          x: this.x,
          y: this.y,
          z: this.z,
          extent: re,
          styleLayers: i._styleLayers.map((p) => ({
            id: p.id,
            type: p.type,
            source: p.source,
            sourceLayer: p.sourceLayer ?? p.data["source-layer"],
            filter: p.data.filter,
            paint: p.data.paint,
            layout: p.data.layout
          }))
        }, f = [];
        for (const p in this.sources) {
          const d = this.sources[p];
          d && d.buffer && (u.sources[p] = {
            buffer: d.buffer,
            encoding: d.encoding || "mvt"
          }, f.push(d.buffer));
        }
        const h = i._taskProcessor.scheduleTask(
          u,
          f
        );
        Cesium.defined(h) && (this.state = "initializing", i.numInitializing++, h.then((p) => {
          i.isDestroyed() || this.createRenderLayersFromWorkerResult(
            p,
            e,
            i
          );
        }).catch(() => {
          this.state = "error";
        }));
      } else {
        this.state = "initializing", i.numInitializing++;
        const u = a ? a.now() : 0;
        this.createRenderLayers(e, i), a && (a.remaining -= a.now() - u);
      }
    if (this.state === "ready") {
      let u = !0, f = !0;
      for (const h of this.visualizers)
        h.update(e, i), h.state === "none" && (u = !1);
      for (const h of this.layers)
        h.update(e, i), h.visibility != "none" && h.state == "none" && (f = !1);
      this.renderable = u && f;
    }
  }
  render(e, t, i) {
    if (!this.renderable)
      return;
    this.commandList;
    const r = this.tileIdCommands, s = this.tileDepthCommands;
    for (const o of this.layers)
      t.push(o);
    for (const o of this.visualizers)
      t.visualizers.push(o);
    for (const o of r)
      t.tileIdCommands.push(o);
    s.length && t.tileCommands.push(...s);
  }
  /**
   * 卸载瓦片，当瓦片过期（不可见，且符合其他过期规则）时，释放pbf/mvt解析数据、图层渲染对象等资源，重置瓦片状态
   */
  unload() {
    this.primitive && (this.primitive.destroy(), this.primitive = null), this.tileGeometry = null, this.commandList && (this.commandList.length = 0), this.tileIdCommands && (this.tileIdCommands.length = 0), this.tileDepthCommands && (this.tileDepthCommands.length = 0);
    for (const e of this.visualizers)
      e.destroy();
    this.visualizers.length = 0;
    for (const e of this.layers)
      e.destroy();
    this.layers.length = 0, this.sources = {}, this.state = "none";
  }
  /**
   * 销毁瓦片，释放所有资源
   */
  destroy() {
    if (this.unload(), this.tileId = null, this.tilingScheme = null, this.parent = null, this.children) {
      for (const e of this.children)
        e.destroy();
      this.children.length = 0, this.children = null;
    }
  }
}
function Vt(n, e) {
  let t = !0;
  return n === "always" || (n === "never" || e === "never") && (t = !1), t;
}
class sh {
  constructor(e, t, i) {
    const r = this.boxCells = [], s = this.circleCells = [];
    this.xCellCount = Math.ceil(e / i), this.yCellCount = Math.ceil(t / i);
    for (let o = 0; o < this.xCellCount * this.yCellCount; o++)
      r.push([]), s.push([]);
    this.circleKeys = [], this.boxKeys = [], this.bboxes = [], this.circles = [], this.width = e, this.height = t, this.xScale = this.xCellCount / e, this.yScale = this.yCellCount / t, this.boxUid = 0, this.circleUid = 0;
  }
  keysLength() {
    return this.boxKeys.length + this.circleKeys.length;
  }
  insert(e, t, i, r, s) {
    this._forEachCell(t, i, r, s, this._insertBoxCell, this.boxUid++), this.boxKeys.push(e), this.bboxes.push(t), this.bboxes.push(i), this.bboxes.push(r), this.bboxes.push(s);
  }
  insertCircle(e, t, i, r) {
    this._forEachCell(t - r, i - r, t + r, i + r, this._insertCircleCell, this.circleUid++), this.circleKeys.push(e), this.circles.push(t), this.circles.push(i), this.circles.push(r);
  }
  _insertBoxCell(e, t, i, r, s, o) {
    this.boxCells[s].push(o);
  }
  _insertCircleCell(e, t, i, r, s, o) {
    this.circleCells[s].push(o);
  }
  _query(e, t, i, r, s, o, a) {
    if (i < 0 || e > this.width || r < 0 || t > this.height)
      return [];
    const l = [];
    if (e <= 0 && t <= 0 && this.width <= i && this.height <= r) {
      if (s)
        return [{
          key: null,
          x1: e,
          y1: t,
          x2: i,
          y2: r
        }];
      for (let c = 0; c < this.boxKeys.length; c++)
        l.push({
          key: this.boxKeys[c],
          x1: this.bboxes[c * 4],
          y1: this.bboxes[c * 4 + 1],
          x2: this.bboxes[c * 4 + 2],
          y2: this.bboxes[c * 4 + 3]
        });
      for (let c = 0; c < this.circleKeys.length; c++) {
        const u = this.circles[c * 3], f = this.circles[c * 3 + 1], h = this.circles[c * 3 + 2];
        l.push({
          key: this.circleKeys[c],
          x1: u - h,
          y1: f - h,
          x2: u + h,
          y2: f + h
        });
      }
    } else {
      const c = {
        hitTest: s,
        overlapMode: o,
        seenUids: { box: {}, circle: {} }
      };
      this._forEachCell(e, t, i, r, this._queryCell, l, c, a);
    }
    return l;
  }
  query(e, t, i, r) {
    return this._query(e, t, i, r, !1, null);
  }
  hitTest(e, t, i, r, s, o) {
    return this._query(e, t, i, r, !0, s, o).length > 0;
  }
  hitTestCircle(e, t, i, r, s) {
    const o = e - i, a = e + i, l = t - i, c = t + i;
    if (a < 0 || o > this.width || c < 0 || l > this.height)
      return !1;
    const u = [], f = {
      hitTest: !0,
      overlapMode: r,
      circle: { x: e, y: t, radius: i },
      seenUids: { box: {}, circle: {} }
    };
    return this._forEachCell(o, l, a, c, this._queryCellCircle, u, f, s), u.length > 0;
  }
  _queryCell(e, t, i, r, s, o, a, l) {
    const { seenUids: c, hitTest: u, overlapMode: f } = a, h = this.boxCells[s], p = 1e-6;
    if (h !== null) {
      const y = this.bboxes;
      for (const m of h)
        if (!c.box[m]) {
          c.box[m] = !0;
          const x = m * 4, w = this.boxKeys[m];
          if (e <= y[x + 2] + p && t <= y[x + 3] + p && i >= y[x + 0] - p && r >= y[x + 1] - p && (!l || l(w)) && (!u || !Vt(f, w.overlapMode)) && (o.push({
            key: w,
            x1: y[x],
            y1: y[x + 1],
            x2: y[x + 2],
            y2: y[x + 3]
          }), u))
            return !0;
        }
    }
    const d = this.circleCells[s];
    if (d !== null) {
      const y = this.circles;
      for (const m of d)
        if (!c.circle[m]) {
          c.circle[m] = !0;
          const x = m * 3, w = this.circleKeys[m];
          if (this._circleAndRectCollide(
            y[x],
            y[x + 1],
            y[x + 2],
            e,
            t,
            i,
            r
          ) && (!l || l(w)) && (!u || !Vt(f, w.overlapMode))) {
            const v = y[x], g = y[x + 1], b = y[x + 2];
            if (o.push({
              key: w,
              x1: v - b,
              y1: g - b,
              x2: v + b,
              y2: g + b
            }), u)
              return !0;
          }
        }
    }
    return !1;
  }
  _queryCellCircle(e, t, i, r, s, o, a, l) {
    const { circle: c, seenUids: u, overlapMode: f } = a, h = this.boxCells[s];
    if (h !== null) {
      const d = this.bboxes;
      for (const y of h)
        if (!u.box[y]) {
          u.box[y] = !0;
          const m = y * 4, x = this.boxKeys[y];
          if (this._circleAndRectCollide(
            c.x,
            c.y,
            c.radius,
            d[m + 0],
            d[m + 1],
            d[m + 2],
            d[m + 3]
          ) && (!l || l(x)) && !Vt(f, x.overlapMode))
            return o.push(!0), !0;
        }
    }
    const p = this.circleCells[s];
    if (p !== null) {
      const d = this.circles;
      for (const y of p)
        if (!u.circle[y]) {
          u.circle[y] = !0;
          const m = y * 3, x = this.circleKeys[y];
          if (this._circlesCollide(
            d[m],
            d[m + 1],
            d[m + 2],
            c.x,
            c.y,
            c.radius
          ) && (!l || l(x)) && !Vt(f, x.overlapMode))
            return o.push(!0), !0;
        }
    }
  }
  _forEachCell(e, t, i, r, s, o, a, l) {
    const c = this._convertToXCellCoord(e), u = this._convertToYCellCoord(t), f = this._convertToXCellCoord(i), h = this._convertToYCellCoord(r);
    for (let p = c; p <= f; p++)
      for (let d = u; d <= h; d++) {
        const y = this.xCellCount * d + p;
        if (s.call(this, e, t, i, r, y, o, a, l)) return;
      }
  }
  _convertToXCellCoord(e) {
    return Math.max(0, Math.min(this.xCellCount - 1, Math.floor(e * this.xScale)));
  }
  _convertToYCellCoord(e) {
    return Math.max(0, Math.min(this.yCellCount - 1, Math.floor(e * this.yScale)));
  }
  _circlesCollide(e, t, i, r, s, o) {
    const a = r - e, l = s - t, c = i + o;
    return c * c > a * a + l * l;
  }
  _circleAndRectCollide(e, t, i, r, s, o, a) {
    const l = (o - r) / 2, c = Math.abs(e - (r + l));
    if (c > l + i)
      return !1;
    const u = (a - s) / 2, f = Math.abs(t - (s + u));
    if (f > u + i)
      return !1;
    if (c <= l || f <= u)
      return !0;
    const h = c - l, p = f - u;
    return h * h + p * p <= i * i;
  }
}
const Ri = 100;
let $i = null, Vi = null;
class oh {
  constructor() {
    $i = new Cesium.Cartesian2(), Vi = new Cesium.BoundingRectangle();
  }
  /**
   * @param {Cesium.FrameState} frameState
   * @param {IRenderLayer[]} orderedRenderLayers
   * @param {number} zoom
   */
  update(e, t, i) {
    const r = e.context.drawingBufferWidth / e.pixelRatio, s = e.context.drawingBufferHeight / e.pixelRatio, o = e.camera._scene, a = new sh(
      r + 2 * Ri,
      s + 2 * Ri,
      25
    );
    for (const l of t) {
      const c = l.style, u = l.labels;
      if (l.type !== "symbol" || l.visibility === "none" || i < c.minzoom || i >= c.maxzoom || !Cesium.defined(u) || !u.length)
        continue;
      const f = c.layout.getDataConstValue(
        "text-allow-overlap",
        l.tile.z
      ), h = c.layout.getDataConstValue(
        "text-overlap",
        l.tile.z
      ), p = ah(h, f), d = c.layout.getDataConstValue(
        "text-padding",
        l.tile.z
      );
      for (const y of u) {
        const m = y.computeScreenSpacePosition(
          o,
          $i
        );
        if (!m) {
          y.vtPlaceable = !0;
          continue;
        }
        const x = Cesium.Label.getScreenSpaceBoundingBox(
          y,
          m,
          Vi
        ), w = x.x - d, v = x.y - d, g = w + x.width + d, b = v + x.height + d;
        if (a.hitTest(w, v, g, b, p, null))
          y.vtPlaceable = !1;
        else {
          const T = { overlapMode: p };
          a.insert(T, w, v, g, b), y.vtPlaceable = !0;
        }
      }
    }
  }
}
function ah(n, e) {
  let t = "never";
  return n ? t = n : e && (t = "always"), t;
}
class bh {
  /**
   * @param {object} options
   * @param {string|import('@maplibre/maplibre-gl-style-spec').StyleSpecification} options.style
   * @param {boolean} [options.showTileColor=false]
   * @param {string} [options.workerUrl] - Web Worker 脚本 URL，用于瓦片解析/几何计算；不传则走主线程
   * @param {number} [options.maximumActiveTasks=4] - 同时进行的 Worker 任务数，与 maxLoading 配合
   * @param {number} [options.maximumInitializingTimePerFrameMs=12] - 单帧用于瓦片初始化（解析 feature、建几何体、建 Primitive）的最大耗时（毫秒），超出后剩余瓦片延迟到后续帧，避免长帧
   */
  constructor(e) {
    this.maximumLevel = 24, this.show = !0, this.showTileColor = !!e.showTileColor, this.ready = !1, this.tilingScheme = new Cesium.WebMercatorTilingScheme(), this.maximumInitializingTimePerFrameMs = e.maximumInitializingTimePerFrameMs ?? 12, this.readyEvent = new Cesium.Event(), this.errorEvent = new Cesium.Event(), this._styleJson = null, this._style = e.style, this._rootTiles = [], this._cacheTiles = [], this._tilesToUpdate = [], this._tilesToRender = [], this._styleLayers = [], this._styleLayerIndexMap = /* @__PURE__ */ new Map(), this._renderList = new zf(this._styleLayers), this.numLoading = 0, this.maxLoading = 6, this.numInitializing = 0, this.maxInitializing = 6, this._destroyed = !1, this._taskProcessor = null, this._workerUrl = e.workerUrl || null, this._maximumActiveTasks = e.maximumActiveTasks ?? 4, this.tileIdTexture = null, this.zoom = 0, this._symbolPlacements = new oh(), requestAnimationFrame(() => {
      this.init();
    });
  }
  async init() {
    if (this._destroyed) return;
    let e = this._style;
    if (!e) {
      this.errorEvent.raiseEvent(new Error("请传入 style 参数"));
      return;
    }
    if (this.path = "", typeof e == "string" && (this.path = e.split("/").slice(0, -1).join("/"), this.path && (this.path += "/"), e = await Cesium.Resource.fetchJson(e)), this._destroyed) return;
    this.sources = {};
    for (const o in e.sources) {
      const a = e.sources[o], l = Wi[a.type];
      if (l) {
        this.sources[o] = new l(a, this.path);
        try {
          if (await this.sources[o].init(), this._destroyed) return;
          this.maximumLevel = Math.min(
            a.maxzoom || 24,
            this.maximumLevel
          );
        } catch (c) {
          this.errorEvent.raiseEvent(c);
        }
      }
    }
    for (let o = 0; o < e.layers.length; o++)
      this._styleLayers[o] = new Af(e.layers[o]), this._styleLayerIndexMap.set(e.layers[o].id, o);
    const t = this.tilingScheme.getNumberOfXTilesAtLevel(0), i = this.tilingScheme.getNumberOfYTilesAtLevel(0);
    let r = 0;
    for (let o = 0; o < i; o++)
      for (let a = 0; a < t; a++) {
        var s = new qr({
          parent: this,
          x: a,
          y: o,
          z: 0,
          tilingScheme: this.tilingScheme
        });
        s.createChildren(), this._rootTiles[r++] = s;
      }
    this._renderList.init(), this._workerUrl && typeof Cesium.TaskProcessor < "u" && (this._taskProcessor = new Cesium.TaskProcessor(
      this._workerUrl,
      Math.min(this._maximumActiveTasks, this.maxInitializing)
    )), this._styleJson = e, this.ready = !0, this.readyEvent.raiseEvent(this);
  }
  //更新瓦片id纹理，用于裁剪超出瓦片边界的像素
  executeTileIdCommands(e) {
    const t = this._renderList.tileIdCommands;
    if (t.length > 0) {
      const i = e.context;
      let r = this._tileIdFbo;
      r || (r = new Cesium.FramebufferManager({
        depthStencil: !0,
        supportsDepthTexture: !0
      }), this._tileIdFbo = r, this._idClearCommand = new Cesium.ClearCommand({
        color: new Cesium.Color(0, 0, 0, 0),
        depth: 1,
        stencil: 0
      }));
      const s = i.floatingPointTexture ? Cesium.PixelDatatype.FLOAT : Cesium.PixelDatatype.UNSIGNED_BYTE, o = i.drawingBufferWidth, a = i.drawingBufferHeight;
      r.update(i, o, a, 1, s), r.clear(i, this._idClearCommand);
      const l = r.framebuffer;
      for (const c of t)
        c.framebuffer = l, c.execute(i);
      this.tileIdTexture = r.getColorTexture(0);
    }
  }
  update(e) {
    if (!this.ready || !this.show) return;
    e.context.webgl2 && U("webgl2模式下贴地线面的支持将导致性能下降");
    const t = this._renderList;
    t.beginFrame(), this.numInitializing = 0, this._frameInitBudget = {
      remaining: this.maximumInitializingTimePerFrameMs,
      now: typeof performance < "u" && performance.now ? performance.now.bind(performance) : Date.now
    };
    const i = e.camera._scene, s = i.globe._surface._debug.suspendLodUpdate;
    this.scene = i;
    const o = lh(e, this);
    s || o.sort((u, f) => u.distanceToCamera - f.distanceToCamera);
    for (const u of o)
      u.lastVisitTime = e.frameNumber, u.expired = !1, u.update(e, t, this);
    const a = s ? this._tilesToRender : ch(o, this._tilesToRender);
    s || a.sort((u, f) => u.distanceToCamera - f.distanceToCamera);
    for (const u of a)
      u.lastVisitTime = e.frameNumber, u.expired = !1, u.render(e, t, this);
    const l = t.getList();
    this._symbolPlacements.update(e, l, this.zoom);
    for (const u of l)
      u.render(e, this);
    for (const u of t.visualizers)
      u.render(e, this);
    e.commandList.push(...t.tileCommands), this.executeTileIdCommands(e);
    const c = [];
    for (const u of this._cacheTiles)
      u.lastVisitTime < e.frameNumber && (u.expired || c.push(u));
    if (c.sort((u, f) => u.lastVisitTime - f.lastVisitTime), c.length > 100) {
      for (const u of c)
        if (u.unload(), u.expired = !0, c.length <= 50) break;
    }
  }
  //样式编辑API
  setLayoutProperty(e, t, i) {
    const r = this._styleLayerIndexMap;
    if (!r.has(e))
      return U(`不存在图层：${e}`), !1;
    const s = r.get(e), a = this._styleLayers[s].setLayoutProperty(t, i);
    return a && t !== "visibility" && this._forceUpdate(), a;
  }
  setPaintProperty(e, t, i) {
    const r = this._styleLayerIndexMap;
    if (!r.has(e))
      return U(`不存在图层：${e}`), !1;
    const s = r.get(e);
    return this._styleLayers[s].setPaintProperty(t, i);
  }
  setFilter(e, t) {
    const i = this._styleLayerIndexMap;
    if (!i.has(e))
      return U(`不存在图层：${e}`), !1;
    const r = i.get(e), o = this._styleLayers[r].setFilter(t);
    return o && this._forceUpdate(), o;
  }
  //强制更新
  _forceUpdate() {
    for (const e of this._cacheTiles)
      e.unload();
    for (const e of this._tilesToRender)
      e.unload();
    for (const e of this._tilesToUpdate)
      e.unload();
    this._tilesToRender.length = 0, this._tilesToUpdate.length = 0;
  }
  destroy() {
    if (this._destroyed) return;
    this._destroyed = !0;
    const e = this.scene, t = this._rootTiles;
    if (this.scene = null, e && !e.isDestroyed() && e.primitives.contains(this) && e.primitives.remove(this), t) {
      for (const i of t)
        i.destroy();
      t.length = 0, this._rootTiles = null;
    }
    if (this._cacheTiles && (this._cacheTiles.length = 0, this._cacheTiles = null), this.sources) {
      for (const i in this.sources)
        Object.hasOwnProperty.call(this.sources, i) && this.sources[i].destroy();
      this.sources = null;
    }
    this._styleLayers = null, this._renderList && (this._renderList.destroy(), this._renderList = null), this._taskProcessor && !this._taskProcessor.isDestroyed() && (this._taskProcessor.destroy(), this._taskProcessor = null), this._tilesToUpdate && (this._tilesToUpdate.length = 0, this._tilesToUpdate = null), this._tilesToRender && (this._tilesToRender.length = 0, this._tilesToRender = null), this._tileIdFbo && (this._tileIdFbo.destroy(), this.tileIdTexture = null, this._tileIdFbo = null, this._idClearCommand = null), this._styleJson = null;
  }
  isDestroyed() {
    return this._destroyed;
  }
}
function lh(n, e) {
  const t = [...e._rootTiles], i = e._tilesToUpdate;
  let r = 24, s = 1 / 0;
  const o = {
    //当see大于阈值，继续查找子级瓦片
    visitChildren(a) {
      if (a.z >= e.maximumLevel)
        return a.distanceToCamera < s && (s = a.distanceToCamera, r = a.z), i.push(a);
      if (a.children.length == 0) {
        a.createChildren();
        for (const l of a.children)
          e._cacheTiles.push(l);
      }
      for (const l of a.children)
        t.push(l);
    },
    //否则使用当前瓦片填充视口
    accept(a) {
      a.distanceToCamera < s && (s = a.distanceToCamera, r = a.z), i.push(a);
    }
  };
  i.length = 0;
  do
    t.shift().visit(n, o);
  while (t.length > 0);
  return e.zoom = r, i;
}
function ch(n, e) {
  const t = /* @__PURE__ */ new Map();
  for (const s of n)
    s.renderable && t.set(s, !0);
  const i = [];
  for (let s = 0; s < e.length; s++) {
    const o = e[s];
    if (o.renderable = t.has(o), o.renderable) continue;
    const a = {
      tiles: [],
      total: 0,
      renderable: 0
    };
    i[s] = a;
    for (const l of n) {
      const c = l.z - o.z;
      if (c !== 0)
        if (c > 0) {
          const u = Math.pow(2, c), f = Math.floor(l.x / u), h = Math.floor(l.y / u);
          f === o.x && h === o.y && (a.total++, a.tiles.push(l), l.renderable && a.renderable++);
        } else {
          const u = Math.pow(2, -c), f = Math.floor(o.x / u), h = Math.floor(o.y / u);
          f === l.x && h === l.y && (o.renderable = !l.renderable);
        }
    }
  }
  for (let s = 0; s < e.length; s++) {
    const o = e[s], a = i[s];
    if (a && a.total) {
      const l = a.total === a.renderable;
      o.renderable = !l;
      for (const c of a.tiles)
        c.renderable = l;
    }
  }
  t.clear();
  let r = e.length;
  for (let s = 0; s < r; s++) {
    const o = e.shift();
    o.renderable && (e.push(o), t.set(o, !0));
  }
  r = n.length;
  for (let s = 0; s < r; s++) {
    const o = n[s];
    o.renderable && !t.has(o) && (e.push(o), t.set(o, !0));
  }
  return e;
}
class bn {
  /**
   * 构造渲染图层实例。注意：该构造函数由VectorTileset调用，请勿在其他模块直接调用
   * @param {MVT.VectorTileFeature[]} sourceFeatures
   * @param {StyleLayer} styleLayer
   * @param {VectorTileLOD} tile
   */
  constructor(e, t, i) {
    this.sourceFeatures = e, this.style = t, this.tile = i, this.features = [], this.firstBatchId = -1, this.lastBatchId = -1, this.offsets = [], this.counts = [], this.commandList = [], this.visibility = "visible", this.state = "none", this.paintVersion = t.paintVersion;
  }
  get id() {
    return this.style.id;
  }
  get type() {
    return this.style.type;
  }
  get paintNeedsUpdate() {
    return this.paintVersion !== this.style.paintVersion;
  }
  set paintNeedsUpdate(e) {
    e || (this.paintVersion = this.style.paintVersion);
  }
  /**
   * 更渲染图层，可在该方法内实现绘图命令构建、动态样式更新等图层渲染准备相关功能。该方法可以被子类重写或复用
   * @param {Cesium.FrameState} frameState
   * @param {VectorTileset} tileset
   */
  update(e, t) {
    const i = this.style.layout.getDataConstValue(
      "visibility",
      this.tile.z
    );
    this.visibility = i;
  }
  /**
   * 从 commandList 属性获取绘图命令（DrawCommand）并加入 frameState.commandList，完成图层渲染对象到Cesium渲染管线的连接。该方法可以被子类重写或复用
   * @param {Cesium.FrameState} frameState
   * @param {VectorTileset} tileset
   * @returns
   */
  render(e, t) {
    const i = this.style, r = t.zoom;
    if (this.visibility === "none" || r < i.minzoom || r >= i.maxzoom)
      return;
    const s = this.commandList;
    if (s && s.length)
      for (const o of s)
        e.commandList.push(o);
  }
  /**
   * 判断对象是否已销毁。基类的 destroy 会自动将该方法改写成返回值为true的版本，子类的 destroy 应通过 super.destory 调用基类的 destroy
   * @returns
   */
  isDestroyed() {
    return !1;
  }
  /**
   * 销毁渲染图层，释放资源。基类负责释放通用属性存储的数据，子类的 destroy 应通过 super.destory 调用基类的 destroy
   */
  destroy() {
    this.commandList && (this.commandList.length = 0), this.sourceFeatures && (this.sourceFeatures.length = 0), this.style = null, this.offsets = null, this.counts = null, this.tile = null, this.isDestroyed = function() {
      return !0;
    };
  }
}
class jr {
  /**
   * 构造图层渲染器实例。图层渲染器负责瓦片内指定类型图层的合批几何体、批次表、绘图命令（DrawCommand）的构建，以及图层DrawCommand浅拷贝副本（shallow clone）的分配。
   * 注意：构造函数仅供VectorTileLOD调用，请勿在其他模块直接调用
   * @param {VectorTileLOD} tile
   * @param {IRenderLayer[]} [layers]
   * @inner
   * @see FillLayerVisualizer
   * @see LineLayerVisualizer
   * @see SymbolLayerVisualizer
   */
  constructor(e, t = []) {
    this.tile = e, this.layers = t, this.state = "none", this.commandList = [];
  }
  /**
   * 添加图层：将图层及其过滤后的要素添加到图层渲染器，子类实现该方法，完成图层存储、要素转换等合批构建需要的准备工作
   * @param {VectorTileFeature[]} features
   * @param {IRenderLayer} renderLayer
   * @param {Cesium.frameState} frameState
   * @param {VectorTileset} tileset
   */
  addLayer(e, t, i, r) {
  }
  /**
   * 设置渲染器及图层的状态
   * @param {'none'|'done'|'error'} state
   */
  setState(e) {
    for (const t of this.layers)
      t.state = e;
    this.state = e;
  }
  /**
   * 更新渲染器：子类实现该方法，完成合批几何体、批次表、绘图命令（DrawCommand）的构建，以及图层DrawCommand浅拷贝副本（shallow clone）的分配等工作
   * @param {*} frameState
   * @param {*} tileset
   */
  update(e, t) {
  }
  render(e) {
    const t = this.commandList;
    if (t && t.length)
      for (const i of t)
        e.commandList.push(i);
  }
  /**
   * 销毁图层渲染器对象，释放资源
   */
  destroy() {
    this.tile = null, this.layers.length = 0, this.isDestroyed = function() {
      return !0;
    };
  }
  isDestroyed() {
    return !1;
  }
}
const ft = {}, ht = {};
function wn(n, e, t) {
  ft[n] = e, ht[n] = t;
}
class uh extends bn {
  createPrimitive(e, t) {
    const i = this.style, r = this.tile, s = i.convertColor(
      i.paint.getDataConstValue("background-color", r.z)
    ), o = i.paint.getDataConstValue("background-opacity", r.z);
    if (i.paint.getDataConstValue("background-pattern", r.z))
      return U("background图层：不支持纹理填充");
    s.alpha *= o;
    const l = new Cesium.Primitive({
      geometryInstances: new Cesium.GeometryInstance({
        geometry: new Cesium.RectangleGeometry({
          rectangle: this.tile.rectangle
        })
      }),
      compressVertices: !1,
      asynchronous: !1,
      appearance: new Cesium.MaterialAppearance({
        translucent: !1,
        material: Cesium.Material.fromType("Color", {
          color: s
        }),
        flat: !0
      })
    });
    this.primitive = l;
  }
  /**
   * @param {Cesium.FrameState} frameState
   * @param {VectorTileset} tileset
   */
  update(e, t) {
    if (super.update(e, t), this.visibility != "none") {
      if (this.primitive || this.createPrimitive(e, t), this.primitive && !this.commandList.length) {
        const i = e.commandList, r = e.commandList = this.commandList;
        if (this.primitive.update(e), r.length > 0) {
          const s = Cesium.RenderState.fromCache({
            blending: Cesium.BlendingState.ALPHA_BLEND,
            depthMask: !1,
            depthTest: {
              enabled: !0
            },
            cull: {
              enabled: !0
            }
          });
          for (const o of r)
            o.renderState = s, o.pass = Cesium.Pass.CESIUM_3D_TILE;
          this.state = "done";
        }
        this.primitive._state === Cesium.PrimitiveState.FAILED && (this.state = "error"), e.commandList = i;
      }
      if (this.primitive && this.paintNeedsUpdate) {
        const i = this.style, r = this.tile, s = i.convertColor(
          i.paint.getDataConstValue("background-color", r.z)
        ), o = i.paint.getDataConstValue(
          "background-opacity",
          r.z
        );
        s.alpha *= o, this.primitive.appearance.material.uniforms.color = s, this.paintNeedsUpdate = !1;
      }
    }
  }
  destroy() {
    this.primitive = this.primitive && this.primitive.destroy(), super.destroy();
  }
}
wn("background", uh);
const fh = 15, or = Math.pow(2, fh - 1) - 1, Ui = -or - 1;
function Js(n) {
  const e = re / n.extent, t = n.loadGeometry();
  for (const i of t)
    for (const r of i) {
      const s = Math.round(r.x * e), o = Math.round(r.y * e);
      r.x = Oi(s, Ui, or), r.y = Oi(o, Ui, or), (s < r.x || s > r.x + 1 || o < r.y || o > r.y + 1) && U("Geometry exceeds allowed extent, reduce your vector tile buffer size");
    }
  return t;
}
class hh extends jr {
  constructor(e, t) {
    super(e, t), this.geometryInstances = [], this.outlineGeometryInstances = [], this.primitive = null, this.commandsReady = !1;
  }
  /**
   * @param {VectorTileFeature[]} features
   * @param {IRenderLayer} layer
   * @param {Cesium.frameState} frameState
   * @param {VectorTileset} tileset
   */
  addLayer(e, t, i, r) {
    const s = t.style, { tile: o, geometryInstances: a } = this, l = Hs.globe.line.getGranularityForZoomLevel(o.z) / 2, c = this;
    let u = 0;
    const f = r.sources[t.style.source].styleSource.promoteId;
    for (const h of e) {
      const p = tt.types[h.type], d = h.properties;
      if (p !== "Polygon") continue;
      if (s.paint.getDataValue(
        "fill-pattern",
        o.z,
        h
      )) {
        U("fill图层：不支持纹理填充（fill-pattern）");
        continue;
      }
      const m = h.id || d[f], x = s.convertColor(
        s.paint.getDataValue("fill-color", o.z, h)
      ), w = s.paint.getDataValue(
        "fill-opacity",
        o.z,
        h
      ), v = s.convertColor(
        s.paint.getDataValue("fill-outline-color", o.z, h)
      ) || x, g = Js(h), b = ji(g);
      for (const T of b) {
        if (T.some((L) => L.length < 3)) continue;
        const I = a.length;
        u == 0 && (t.firstBatchId = I), t.lastBatchId = I;
        const _ = {
          coordinates: T,
          featureId: u,
          fillColor: x,
          fillOpacity: w,
          fillOutlineColor: v,
          properties: d,
          //保存原始数据的要素id，后续可以用来支持 featureState 表达式，这个表达式可以实现选定要素高亮显示
          id: m,
          //保存batchId，将矢量要素与几何顶点关联，后续可以实时更新图层样式
          batchId: I
        };
        c.addFeature(_, l), t.features.push(_), u++;
      }
    }
    t.offsets = [], t.counts = [], this.layers.push(t);
  }
  /**
   * 从 Web Worker 结果构建图层几何体（positions/normals/indices 已由 Worker 算好）
   * @param {object} workerLayerData - { layerId, source, sourceLayer, styleLayer, batches, firstBatchId, lastBatchId }
   * @param {IRenderLayer} layer
   * @param {Cesium.FrameState} frameState
   * @param {VectorTileset} tileset
   */
  addLayerFromWorkerResult(e, t, i, r) {
    const { batches: s, firstBatchId: o, lastBatchId: a } = e, l = this.geometryInstances, c = new Cesium.Cartesian3();
    for (const u of s) {
      const { positions: f, normals: h, st: p, indices: d, colorBytes: y, id: m, properties: x } = u;
      f.length / 3;
      const w = new Cesium.Geometry({
        attributes: {
          position: {
            componentDatatype: Cesium.ComponentDatatype.DOUBLE,
            componentsPerAttribute: 3,
            normalize: !1,
            values: f
          },
          normal: {
            componentDatatype: Cesium.ComponentDatatype.FLOAT,
            componentsPerAttribute: 3,
            normalize: !1,
            values: h
          },
          st: {
            componentDatatype: Cesium.ComponentDatatype.FLOAT,
            componentsPerAttribute: 2,
            normalize: !1,
            values: p
          }
        },
        primitiveType: Cesium.PrimitiveType.TRIANGLES,
        indices: d,
        boundingSphere: Cesium.BoundingSphere.fromVertices(f)
      }), v = Cesium.Cartographic.fromCartesian(
        w.boundingSphere.center
      );
      v.height = 0;
      const g = Cesium.Cartographic.toCartesian(
        v,
        null,
        c
      ), b = new Cesium.GeometryInstance({
        geometry: w,
        attributes: {
          color: new Cesium.GeometryInstanceAttribute({
            componentDatatype: Cesium.ComponentDatatype.UNSIGNED_BYTE,
            componentsPerAttribute: 4,
            normalize: !0,
            value: Array.from(y)
          })
        },
        id: new Cesium.Entity({
          position: g,
          id: m,
          properties: x
        })
      });
      l.push(b);
    }
    t.firstBatchId = o, t.lastBatchId = a, t.offsets = [], t.counts = [], this.layers.push(t);
  }
  /**
   * 创建一个多边形的几何体实例
   * @param {FillFeature} feature
   * @param {number} granularity
   */
  addFeature(e, t) {
    const i = this.geometryInstances, r = this.outlineGeometryInstances, { coordinates: s, fillColor: o, fillOpacity: a, fillOutlineColor: l } = e, c = o.toBytes();
    c[3] = Math.floor(c[3] * a);
    const u = l.toBytes();
    u[3] = Math.floor(u[3] * a);
    const f = Kf(
      s,
      this.tile,
      t,
      !0
    ), h = f.verticesFlattened, p = [0, 0], d = new Cesium.Cartesian3(), y = h.length / 2, m = new Float64Array(y * 3), x = new Float32Array(y * 3), w = new Float32Array(y * 2);
    for (let V = 0, D = 0; V < h.length; V += 2, D++) {
      const ee = h[V], me = h[V + 1], At = this.tile.transformPoint(ee, me, p), we = Cesium.Cartesian3.fromDegrees(
        At[0],
        At[1],
        0,
        null,
        d
      );
      m[D * 3] = we.x, m[D * 3 + 1] = we.y, m[D * 3 + 2] = we.z;
      const $e = Cesium.Cartesian3.normalize(we, we);
      x[D * 3] = $e.x, x[D * 3 + 1] = $e.y, x[D * 3 + 2] = $e.z, w[D * 2] = ee / re, w[D * 2 + 1] = me / re;
    }
    const v = new (y > 65535 ? Uint32Array : y > 255 ? Uint16Array : Uint8Array)(f.indicesTriangles), g = new (y > 65535 ? Uint32Array : y > 255 ? Uint16Array : Uint8Array)(f.indicesLineList.flat(3)), b = new Cesium.Geometry({
      attributes: {
        position: {
          componentDatatype: Cesium.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          normalize: !1,
          values: m
        },
        normal: {
          componentDatatype: Cesium.ComponentDatatype.FLOAT,
          componentsPerAttribute: 3,
          normalize: !1,
          values: x
        },
        st: {
          componentDatatype: Cesium.ComponentDatatype.FLOAT,
          componentsPerAttribute: 2,
          normalize: !1,
          values: w
        }
      },
      primitiveType: Cesium.PrimitiveType.TRIANGLES,
      indices: v,
      boundingSphere: Cesium.BoundingSphere.fromVertices(m)
    }), T = new Cesium.Geometry({
      attributes: {
        position: {
          componentDatatype: Cesium.ComponentDatatype.DOUBLE,
          componentsPerAttribute: 3,
          normalize: !1,
          values: m
        }
      },
      primitiveType: Cesium.PrimitiveType.LINES,
      indices: g,
      boundingSphere: Cesium.BoundingSphere.fromVertices(m)
    }), I = Cesium.Cartographic.fromCartesian(
      b.boundingSphere.center
    );
    I.height = 0;
    const _ = Cesium.Cartographic.toCartesian(
      I,
      null,
      d
    ), L = new Cesium.GeometryInstance({
      geometry: b,
      attributes: {
        color: new Cesium.GeometryInstanceAttribute({
          componentDatatype: Cesium.ComponentDatatype.UNSIGNED_BYTE,
          componentsPerAttribute: 4,
          normalize: !0,
          value: c
        })
      },
      //通过entity的形式暴露给Cesium pickEntity，这样点击时系统自带的inforbox可以弹出
      id: new Cesium.Entity({
        position: _,
        id: e.id,
        properties: e.properties
      })
    });
    i.push(L);
    const P = new Cesium.GeometryInstance({
      geometry: T,
      attributes: {
        color: new Cesium.GeometryInstanceAttribute({
          componentDatatype: Cesium.ComponentDatatype.UNSIGNED_BYTE,
          componentsPerAttribute: 4,
          normalize: !0,
          value: u
        })
      },
      //通过entity的形式暴露给Cesium pickEntity，这样点击时系统自带的inforbox可以弹出
      id: new Cesium.Entity({
        position: _,
        id: e.id,
        properties: e.properties
      })
    });
    r.push(P);
  }
  createPrimitive() {
    const e = new Cesium.Primitive({
      geometryInstances: this.geometryInstances,
      asynchronous: !(this.geometryInstances[0].geometry instanceof Cesium.Geometry),
      appearance: new Cesium.PerInstanceColorAppearance({
        flat: !0,
        translucent: !1,
        renderState: {
          //这里设置是没有用的，只要 translucent 为 false，
          //Cesium 内部都会覆盖成 true，所以我们需要在 DrawCommand 创建完成后再设置
          depthMask: !1
        },
        fragmentShaderSource: (
          /*glsl*/
          ` 
in vec4 v_color;

uniform vec4 tileId;
uniform sampler2D tileIdTexture;

void main()
{
    vec2 id_st = gl_FragCoord.xy / czm_viewport.zw; 
    vec4 bgId = texture(tileIdTexture, id_st);
    if (!all(equal(bgId, tileId)))
    {
       discard;
    }
    out_FragColor = v_color;
}
                `
        )
      })
    });
    let t = this;
    Object.defineProperties(e, {
      _geometries: {
        get() {
          return this._geometries_;
        },
        set(i) {
          this._geometries_ = i, i ? t.onGeometriesLoaded(i) : t = null;
        }
      },
      _batchTable: {
        get() {
          return this._batchTable_;
        },
        set(i) {
          this._batchTable_ = i, i && t.onBatchTableCreated(i);
        }
      }
    }), this.primitive = e;
  }
  /**
   * 根据 batchId 和 featureId，计算每个图层几何体的起始索引（offset）和索引数量（count）
   * @param {Cesium.Geometry[]} geometries
   */
  onGeometriesLoaded(e) {
    for (let t = 0; t < e.length; t++) {
      const i = {}, r = e[t], s = r.attributes.batchId.values, o = r.indices;
      let a = -1, l = null;
      for (let c = 0; c < o.length; c++) {
        const u = o[c], f = s[u];
        a !== f && (a = f, l = i[a] = {
          begin: c,
          end: c
        }), l.end = c;
      }
      for (const c of this.layers) {
        const { firstBatchId: u, lastBatchId: f } = c;
        if (u === -1 || f === -1)
          continue;
        let h = -1, p = -1;
        for (let d = u; d <= f; d++) {
          const y = i[d];
          y && (h === -1 && (h = y.begin), p = y.end);
        }
        h === -1 || p === -1 || (c.offsets[t] = h, c.counts[t] = p - h + 1);
      }
    }
  }
  /**
   * 保存 Cesium Primitive 创建的批次表。图层样式变化时，通过更新批次表传递到GPU，同步更新渲染效果
   * @param {Cesium.BatchTable} batchTable
   */
  onBatchTableCreated(e) {
    this._batchTable = e;
    for (const t of this.layers)
      t._batchTable = e;
  }
  createOutlinePrimitive() {
    if (!this.outlineGeometryInstances || this.outlineGeometryInstances.length === 0)
      return;
    const e = new Cesium.Primitive({
      geometryInstances: this.outlineGeometryInstances,
      asynchronous: !(this.outlineGeometryInstances[0].geometry instanceof Cesium.Geometry),
      appearance: new Cesium.PerInstanceColorAppearance({
        flat: !0,
        translucent: !1,
        renderState: {
          //这里设置是没有用的，只要 translucent 为 false，
          //Cesium 内部都会覆盖成 true，所以我们需要在 DrawCommand 创建完成后再设置
          depthMask: !1
        },
        fragmentShaderSource: (
          /*glsl*/
          ` 
in vec4 v_color;

uniform vec4 tileId;
uniform sampler2D tileIdTexture;

void main()
{
    vec2 id_st = gl_FragCoord.xy / czm_viewport.zw; 
    vec4 bgId = texture(tileIdTexture, id_st);
    if (!all(equal(bgId, tileId)))
    {
       discard;
    }
    out_FragColor = v_color;
}
                `
        )
      })
    });
    let t = this;
    Object.defineProperties(e, {
      _geometries: {
        get() {
          return this._geometries_;
        },
        set(i) {
          this._geometries_ = i, i ? t.onOutlineGeometriesLoaded(i) : t = null;
        }
      },
      _batchTable: {
        get() {
          return this._batchTable_;
        },
        set(i) {
          this._batchTable_ = i, i && t.onOutlineBatchTableCreated(i);
        }
      }
    }), this.outlinePrimitive = e;
  }
  /**
   * 根据 batchId 和 featureId，计算每个图层几何体的起始索引（offset）和索引数量（count）
   * @param {Cesium.Geometry[]} geometries
   */
  onOutlineGeometriesLoaded(e) {
    for (let t = 0; t < e.length; t++) {
      const i = {}, r = e[t], s = r.attributes.batchId.values, o = r.indices;
      let a = -1, l = null;
      for (let c = 0; c < o.length; c++) {
        const u = o[c], f = s[u];
        a !== f && (a = f, l = i[a] = {
          begin: c,
          end: c
        }), l.end = c;
      }
      for (const c of this.layers) {
        const { firstBatchId: u, lastBatchId: f } = c;
        if (u === -1 || f === -1)
          continue;
        let h = -1, p = -1;
        for (let d = u; d <= f; d++) {
          const y = i[d];
          y && (h === -1 && (h = y.begin), p = y.end);
        }
        h === -1 || p === -1 || (c.outlineOffsets[t] = h, c.outlineCounts[t] = p - h + 1);
      }
    }
  }
  /**
   * 保存 Cesium Primitive 创建的批次表。图层样式变化时，通过更新批次表传递到GPU，同步更新渲染效果
   * @param {Cesium.BatchTable} batchTable
   */
  onOutlineBatchTableCreated(e) {
    this._outlineBatchTable = e;
    for (const t of this.layers)
      t._outlineBatchTable = e;
  }
  /**
   * 使用合批后的 drawCommand 创建副本，为渲染图层分配 drawCommand
   * @param {Cesium.DrawCommand[]} batchedCommandList
   * @param {VectorTileset} tileset
   */
  createLayerCommands(e, t) {
    const i = Cesium.RenderState.fromCache({
      id: "fill",
      blending: Cesium.BlendingState.ALPHA_BLEND,
      depthMask: !1,
      depthTest: {
        enabled: !0
      },
      cull: {
        enabled: !0
      }
    }), r = this.tile.tileId;
    this.renderState = i;
    for (let s = 0; s < this.layers.length; s++) {
      const o = this.layers[s], a = o.commandList = [], l = {
        fill: 0,
        outline: 0
      };
      for (let c = 0; c < e.length; c++) {
        const u = e[c];
        let f, h, p;
        u.primitiveType == Cesium.PrimitiveType.LINES ? (f = l.outline++, h = o.outlineOffsets, p = o.outlineCounts) : (f = l.fill++, h = o.offsets, p = o.counts);
        const d = h[f], y = p[f];
        if (typeof d != "number" || typeof y != "number")
          continue;
        u.uniformMap.tileIdTexture = function() {
          return t.tileIdTexture;
        }, u.uniformMap.tileId = function() {
          return r.color;
        }, u.pass = Cesium.Pass.CESIUM_3D_TILE;
        const m = Cesium.DrawCommand.shallowClone(u);
        m.pass = Cesium.Pass.CESIUM_3D_TILE, m.renderState = i, m.layerType = "fill", m.offset = d, m.count = y, a.push(m);
      }
      o.state = "done";
    }
    this.state = "done";
  }
  update(e, t) {
    if (this.geometryInstances) {
      if (super.update(e, t), !this.primitive && this.geometryInstances.length && (this.createPrimitive(), this.outlineGeometryInstances && this.outlineGeometryInstances.length && this.createOutlinePrimitive()), this.primitive && this.state !== "done" && this.state !== "error") {
        const i = e.commandList, r = e.commandList = [];
        try {
          this.primitive.update(e), this.outlinePrimitive && this.outlinePrimitive.update(e);
        } catch (s) {
          this.geometryInstances = [], this.outlineGeometryInstances = [], this.setState("error"), s.stack ? console.trace(s.stack) : console.error(s);
          return;
        } finally {
          e.commandList = i;
        }
        r.length > 0 && this.createLayerCommands(r, t), (this.primitive._state === Cesium.PrimitiveState.FAILED || this.outlinePrimitive && this.outlinePrimitive._state === Cesium.PrimitiveState.FAILED) && this.setState("error"), this.geometryInstances = [];
      }
      this._batchTable && this._batchTable._batchValuesDirty && this._batchTable.update(e), this._outlineBatchTable && this._outlineBatchTable._batchValuesDirty && this._outlineBatchTable.update(e);
    }
  }
  destroy() {
    this.primitive = this.primitive && this.primitive.destroy(), this._batchTable = null, this.geometryInstances = null, super.destroy();
  }
  isDestroyed() {
    return !1;
  }
}
class ph extends bn {
  constructor(e, t, i) {
    super(e, t, i), this.outlineOffsets = [], this.outlineCounts = [];
  }
  /**
   * @param {Cesium.FrameState} frameState
   * @param {VectorTileset} tileset
   */
  update(e, t) {
    if (this.paintNeedsUpdate) {
      const i = this.style, r = this.tile, s = this._batchTable;
      for (const o of this.features) {
        const a = i.convertColor(
          i.paint.getDataValue("fill-color", r.z, o)
        ), l = i.paint.getDataValue(
          "fill-opacity",
          r.z,
          o
        );
        o.fillColor = a, o.fillOpacity = l;
        const c = o.batchId, u = a.toBytes();
        u[3] = Math.floor(u[3] * l), s.setBatchedAttribute(c, 0, {
          x: u[0],
          y: u[1],
          z: u[2],
          w: u[3]
        });
      }
      this.paintNeedsUpdate = !1;
    }
    super.update(e, t);
  }
}
wn("fill", ph, hh);
const dh = tt.prototype.toGeoJSON;
class yh extends jr {
  constructor(e, t) {
    super(e, t), this.geometryInstances = [], this.primitive = null, this.commandsReady = !1;
  }
  /**
   * @param {VectorTileFeature[]} features
   * @param {LineRenderLayer} layer
   * @param {Cesium.frameState} frameState
   * @param {VectorTileset} tileset
   */
  addLayer(e, t, i, r) {
    const s = t.style, { tile: o, geometryInstances: a } = this, l = Hs.globe.line.getGranularityForZoomLevel(o.z), c = this, u = r.sources[t.style.source].styleSource.promoteId;
    let f = 0;
    const h = s.paint.getDataConstValue("line-dasharray", o.z);
    if (h && h.length) {
      h.length % 2 > 0 && h.push(0), t.dashLength = 0;
      for (let d = 0; d < h.length; d++)
        t.dashLength += h[d];
      t.dasharray = h, h.length > 8 && U("line图层：line-dasharray 超过最大长度（8）");
    }
    function p(d, y, m, x, w, v) {
      if (d.length < 2) return;
      const g = a.length;
      f == 0 && (t.firstBatchId = g), t.lastBatchId = g;
      const b = {
        coordinates: d,
        featureId: f,
        lineColor: m,
        lineOpacity: x,
        lineWidth: y,
        properties: v,
        //保存原始数据的要素id，后续可以用来支持 featureState 表达式，这个表达式可以实现选定要素高亮显示
        id: w,
        //保存batchId，将矢量要素与几何顶点关联，后续可以实时更新图层样式
        batchId: g
      };
      c.addFeature(b), t.features.push(b), f++;
    }
    for (const d of e) {
      const y = tt.types[d.type];
      if (y === "Point" || y === "Unknown") continue;
      const m = d.properties, x = Js(d);
      for (let D = 0; D < x.length; D++)
        x[D] = Ys(x[D], l);
      const w = dh.call(
        {
          extent: re,
          type: d.type,
          properties: m,
          loadGeometry() {
            return x;
          }
        },
        o.x,
        o.y,
        o.z
      );
      if (!w.geometry) continue;
      const v = d.id || m[u], g = s.paint.getDataValue(
        "line-width",
        o.z,
        d
      ), b = s.convertColor(
        s.paint.getDataValue("line-color", o.z, d)
      ), T = s.paint.getDataValue(
        "line-opacity",
        o.z,
        d
      );
      if (s.paint.getDataValue(
        "line-pattern",
        o.z,
        d
      )) {
        U("line图层：不支持纹理填充（line-pattern）");
        continue;
      }
      const _ = s.paint.getDataValue(
        "line-join",
        o.z,
        d
      ), L = s.paint.getDataValue(
        "line-cap",
        o.z,
        d
      );
      _ !== "miter" && U("line图层：line-join 仅支持 miter 模式"), L !== "butt" && U("line图层：line-cap 仅支持 butt 模式");
      const P = w.geometry.type, V = w.geometry.coordinates;
      if (P == "LineString")
        p(
          V,
          g,
          b,
          T,
          v,
          m
        );
      else if (P == "MultiLineString" || P == "Polygon")
        for (const D of V)
          p(
            D,
            g,
            b,
            T,
            v,
            m
          );
      else if (P == "MultiPolygon")
        for (const D of V)
          for (const ee of D)
            p(
              ee,
              g,
              b,
              T,
              v,
              m
            );
      else
        U("line图层：不支持几何类型：" + P);
    }
    t.offsets = [], t.counts = [], this.layers.push(t);
  }
  /**
   * 从 Web Worker 结果构建图层几何体（positions 已由 Worker 算好）
   * @param {object} workerLayerData - { layerId, source, sourceLayer, styleLayer, batches, firstBatchId, lastBatchId }
   * @param {LineRenderLayer} layer
   * @param {Cesium.FrameState} frameState
   * @param {VectorTileset} tileset
   */
  addLayerFromWorkerResult(e, t, i, r) {
    const { batches: s, firstBatchId: o, lastBatchId: a } = e, l = this.geometryInstances;
    for (const c of s) {
      const { positions: u, colorBytes: f, lineWidth: h, id: p, properties: d } = c, y = [];
      for (let g = 0; g < u.length; g += 3)
        y.push(
          new Cesium.Cartesian3(
            u[g],
            u[g + 1],
            u[g + 2]
          )
        );
      const m = Cesium.BoundingSphere.fromPoints(y), x = Cesium.Cartographic.fromCartesian(
        m.center
      );
      x.height = 0;
      const w = Cesium.Cartographic.toCartesian(
        x,
        null,
        new Cesium.Cartesian3()
      ), v = new Cesium.GeometryInstance({
        geometry: new Cesium.PolylineGeometry({
          positions: y,
          width: h
        }),
        attributes: {
          color: new Cesium.GeometryInstanceAttribute({
            componentDatatype: Cesium.ComponentDatatype.UNSIGNED_BYTE,
            componentsPerAttribute: 4,
            normalize: !0,
            value: Array.from(f)
          })
        },
        id: new Cesium.Entity({
          position: w,
          id: p,
          properties: d
        })
      });
      l.push(v);
    }
    t.firstBatchId = o, t.lastBatchId = a, t.offsets = [], t.counts = [], this.layers.push(t);
  }
  /**
   * @param {LineFeature} feature
   */
  addFeature(e) {
    const t = this.geometryInstances, { coordinates: i, lineColor: r, lineWidth: s, lineOpacity: o } = e, a = r.toBytes();
    a[3] = Math.floor(a[3] * o);
    const l = i.map(
      (p) => Cesium.Cartesian3.fromDegrees(p[0], p[1])
    ), c = Cesium.BoundingSphere.fromPoints(l), u = Cesium.Cartographic.fromCartesian(
      c.center
    );
    u.height = 0;
    const f = Cesium.Cartographic.toCartesian(
      u,
      null,
      new Cesium.Cartesian3()
    ), h = new Cesium.GeometryInstance({
      geometry: new Cesium.PolylineGeometry({
        positions: l,
        width: s
      }),
      attributes: {
        color: new Cesium.GeometryInstanceAttribute({
          componentDatatype: Cesium.ComponentDatatype.UNSIGNED_BYTE,
          componentsPerAttribute: 4,
          normalize: !0,
          value: a
        })
      },
      //通过entity的形式暴露给Cesium pickEntity，这样点击时系统自带的inforbox可以弹出
      id: new Cesium.Entity({
        position: f,
        id: e.id,
        properties: e.properties
      })
    });
    t.push(h);
  }
  createPrimitive() {
    const e = new Cesium.Primitive({
      geometryInstances: this.geometryInstances,
      asynchronous: !0,
      appearance: new Cesium.PolylineMaterialAppearance({
        flat: !0,
        translucent: !1,
        vertexShaderSource: (
          /*glsl*/
          `
${Cesium._shadersPolylineCommon}
 
in vec4 color;
out vec4 v_color;
in vec3 position3DHigh;
in vec3 position3DLow;
in vec3 prevPosition3DHigh;
in vec3 prevPosition3DLow;
in vec3 nextPosition3DHigh;
in vec3 nextPosition3DLow;
in vec2 expandAndWidth;
in vec2 st;
in float batchId;

out float v_width;
out vec2 v_st;
out float v_polylineAngle;

void main()
{
    float expandDir = expandAndWidth.x;
    float width = abs(expandAndWidth.y) + 0.5;
    bool usePrev = expandAndWidth.y < 0.0;

    vec4 p = czm_computePosition();
    vec4 prev = czm_computePrevPosition();
    vec4 next = czm_computeNextPosition();

    float angle;
    vec4 positionWC = getPolylineWindowCoordinates(p, prev, next, expandDir, width, usePrev, angle);
    gl_Position = czm_viewportOrthographic * positionWC;

    v_width = width;
    v_st.s = st.s;
    v_st.t = czm_writeNonPerspective(st.t, gl_Position.w);
    v_polylineAngle = angle;
    v_color = color;
}
                `
        ),
        fragmentShaderSource: (
          /*glsl*/
          ` 
in vec2 v_st;

uniform vec4 tileId;
uniform sampler2D tileIdTexture;

void main()
{
    vec2 id_st = gl_FragCoord.xy / czm_viewport.zw; 
    vec4 bgId = texture(tileIdTexture, id_st);
    if (all(equal(bgId, tileId)) == false)
    {
       discard;
    }

    czm_materialInput materialInput;

    vec2 st = v_st;
    st.t = czm_readNonPerspective(st.t, gl_FragCoord.w);

    materialInput.s = st.s;
    materialInput.st = st;
    materialInput.str = vec3(st, 0.0);

    czm_material material = czm_getMaterial(materialInput);
    out_FragColor = vec4(material.diffuse + material.emission, material.alpha);

    czm_writeLogDepth();
}
                `
        ),
        material: new Cesium.Material({
          fabric: {
            //cesium不支持数组类型的uniform，我们在分配图层绘图命令的时候修改uniformMap
            // uniforms: {
            //     dashLength: 16,
            //     arrayLength: 0,
            //     dasharray: []
            // },
            source: (
              /*glsl*/
              `
const int maxArrayLength = 8;

in float v_width;
in vec4 v_color;
uniform float dashLength;
uniform float arrayLength;
uniform float dasharray[maxArrayLength];
in float v_polylineAngle;

mat2 rotate(float rad) {
    float c = cos(rad);
    float s = sin(rad);
    return mat2(
        c, s,
        -s, c
    );
}

czm_material czm_getMaterial(czm_materialInput materialInput)
{
    czm_material material = czm_getDefaultMaterial(materialInput);

    vec2 pos = rotate(v_polylineAngle) * gl_FragCoord.xy;

    // Get the relative position within the dash from 0 to 1
    float dashPosition = fract(pos.x / (v_width * dashLength * czm_pixelRatio));

    float currDashPos = 0.;
    for (int i = 0; i < maxArrayLength; i += 2) {
        if(float(i) >= arrayLength) break;

        float gapStart = currDashPos + dasharray[i] / dashLength;
        float gapEnd = gapStart + dasharray[i + 1] / dashLength;

        if(dashPosition > gapStart && dashPosition < gapEnd) {
            discard;
            break;
        }

        currDashPos = gapEnd;
    }
    
    vec4 fragColor = v_color;
    fragColor = czm_gammaCorrect(fragColor);
    material.emission = fragColor.rgb;
    material.alpha = fragColor.a;
    return material;
}                        
                        `
            )
          }
        })
      })
    });
    let t = this;
    Object.defineProperties(e, {
      _geometries: {
        get() {
          return this._geometries_;
        },
        set(i) {
          this._geometries_ = i, i ? t.onGeometriesLoaded(i) : t = null;
        }
      },
      _batchTable: {
        get() {
          return this._batchTable_;
        },
        set(i) {
          this._batchTable_ = i, i && t.onBatchTableCreated(i);
        }
      }
    }), this.primitive = e;
  }
  /**
   * 根据 batchId 和 featureId，计算每个图层几何体的起始索引（offset）和索引数量（count）
   * @param {Cesium.Geometry[]} geometries
   */
  onGeometriesLoaded(e) {
    for (let t = 0; t < e.length; t++) {
      const i = {}, r = e[t], s = r.attributes.batchId.values, o = r.indices;
      let a = -1, l = null;
      for (let c = 0; c < o.length; c++) {
        const u = o[c], f = s[u];
        a !== f && (a = f, l = i[a] = {
          begin: c,
          end: c
        }), l.end = c;
      }
      for (const c of this.layers) {
        const { firstBatchId: u, lastBatchId: f } = c;
        if (u === -1 || f === -1)
          continue;
        let h = -1, p = -1;
        for (let d = u; d <= f; d++) {
          const y = i[d];
          y && (h === -1 && (h = y.begin), p = y.end);
        }
        h === -1 || p === -1 || (c.offsets[t] = h, c.counts[t] = p - h + 1);
      }
    }
  }
  /**
   * 保存 Cesium Primitive 创建的批次表。图层样式变化时，通过更新批次表传递到GPU，同步更新渲染效果
   * @param {Cesium.BatchTable} batchTable
   */
  onBatchTableCreated(e) {
    this._batchTable = e;
    for (const t of this.layers)
      t._batchTable = e;
  }
  /**
   * 使用合批后的 drawCommand 创建副本，为渲染图层分配 drawCommand
   * @param {Cesium.DrawCommand[]} batchedCommandList
   * @param {VectorTileset} tileset
   */
  createLayerCommands(e, t) {
    const i = Cesium.RenderState.fromCache({
      id: "line",
      blending: Cesium.BlendingState.ALPHA_BLEND,
      depthMask: !1,
      depthTest: {
        enabled: !0
      },
      cull: {
        enabled: !0
      },
      colorMask: {
        red: !0,
        green: !0,
        blue: !0,
        alpha: !0
      }
    }), r = this.tile.tileId;
    function s(o, a) {
      return o = {
        ...o
      }, o.tileIdTexture = function() {
        return t.tileIdTexture;
      }, o.tileId = function() {
        return r.color;
      }, o.dasharray = function() {
        return a.dasharray;
      }, o.dashLength = function() {
        return a.dashLength;
      }, o.arrayLength = function() {
        return a.dasharray.length;
      }, o;
    }
    for (let o = 0; o < this.layers.length; o++) {
      const a = this.layers[o], l = a.commandList = [];
      for (let c = 0; c < e.length; c++) {
        const u = a.offsets[c], f = a.counts[c];
        if (typeof u != "number" || typeof f != "number")
          continue;
        const h = e[c], p = Cesium.DrawCommand.shallowClone(h);
        p.pass = Cesium.Pass.CESIUM_3D_TILE, p.uniformMap = s(
          p.uniformMap,
          a
        ), p.renderState = i, p.offset = u, p.count = f, l.push(p);
      }
      a.state = "done";
    }
    this.state = "done";
  }
  update(e, t) {
    if (this.geometryInstances) {
      if (super.update(e, t), !this.primitive && this.geometryInstances.length && this.createPrimitive(), this.primitive && this.state !== "done" && this.state !== "error") {
        const i = e.commandList, r = e.commandList = [];
        try {
          this.primitive.update(e);
        } catch (s) {
          this.geometryInstances = [], this.setState("error"), s.stack ? console.trace(s.stack) : console.error(s);
          return;
        } finally {
          e.commandList = i;
        }
        r.length > 0 && this.createLayerCommands(r, t), this.primitive._state === Cesium.PrimitiveState.FAILED && this.setState("error"), this.geometryInstances = [];
      }
      this.primitive && e.camera.pitch > -1.309 && U("line图层：不支持透视，建议保持相机俯仰角（pitch）小于 -75 度"), this._batchTable && this._batchTable._batchValuesDirty && this._batchTable.update(e);
    }
  }
  destroy() {
    this.primitive = this.primitive && this.primitive.destroy(), this._batchTable = null, this.geometryInstances = null, super.destroy();
  }
  isDestroyed() {
    return !1;
  }
}
class mh extends bn {
  /**
   * @param {MVT.VectorTileFeature[]} sourceFeatures
   * @param {StyleLayer} styleLayer
   * @param {VectorTileLOD} tile
   */
  constructor(e, t, i) {
    super(e, t, i), this.primitive = null, this.dasharray = [], this.dashLength = 0;
  }
  createPrimitive(e, t) {
    const i = new Cesium.PolylineCollection(), r = this.sourceFeatures, s = this.style, o = this.tile;
    function a(l, c, u) {
      if (l.length < 2) return;
      const f = l.map(
        (h) => Cesium.Cartesian3.fromDegrees(h[0], h[1])
      );
      i.add({
        positions: f,
        width: c,
        material: Cesium.Material.fromType("Color", {
          color: s.convertColor(u)
        })
      });
    }
    for (const l of r) {
      const c = l.toGeoJSON(o.x, o.y, o.z);
      if (!c.geometry) continue;
      const u = s.paint.getDataValue(
        "line-width",
        o.z,
        l
      ), f = s.paint.getDataValue(
        "line-color",
        o.z,
        l
      ), h = c.geometry.type, p = c.geometry.coordinates;
      if (h == "LineString")
        a(p, u, f);
      else if (h == "MultiLineString" || h == "Polygon")
        for (const d of p)
          a(d, u, f);
      else if (h == "MultiPolygon")
        for (const d of p)
          for (const y of d)
            a(y, u, f);
      else
        console.log("暂不支持几何类型：" + h);
    }
    this.primitive = i;
  }
  /**
   * @param {Cesium.FrameState} frameState
   * @param {VectorTileset} tileset
   */
  update(e, t) {
    if (this.paintNeedsUpdate) {
      const i = this.style, r = this.tile, s = this._batchTable;
      for (const o of this.features) {
        const a = i.paint.getDataValue(
          "line-width",
          r.z,
          o
        ), l = i.convertColor(
          i.paint.getDataValue("line-color", r.z, o)
        ), c = i.paint.getDataValue(
          "line-opacity",
          r.z,
          o
        );
        a !== o.lineWidth && U("不支持动态修改 line 图层样式属性：line-width"), o.lineColor = l, o.lineOpacity = c, o.lineWidth = a;
        const u = o.batchId, f = l.toBytes();
        f[3] = Math.floor(f[3] * c), s.setBatchedAttribute(u, 0, {
          x: f[0],
          y: f[1],
          z: f[2],
          w: f[3]
        });
      }
      this.paintNeedsUpdate = !1;
    }
    super.update(e, t);
  }
  destroy() {
    this.primitive = this.primitive && this.primitive.destroy(), super.destroy();
  }
}
wn("line", mh, yh);
let Vn = null, Gi = null;
const gh = 0.1;
class xh extends jr {
  constructor(e, t) {
    Vn === null && (Vn = new Cesium.Cartesian3(), Gi = new Cesium.Cartesian3()), super(e, t), this.labels = [], this.primitive = null, this.dotCutOff = 35e-4;
  }
  /**
   * 对符号进行地平线剔除
   * @param {Cesium.Cartesian3} positionWC
   * @param {Cesium.Cartesian3} cameraPositionWC
   */
  isOccluded(e, t) {
    const i = Cesium.Cartesian3.subtract(
      e,
      t,
      Vn
    );
    Cesium.Cartesian3.normalize(i, i);
    const r = Cesium.Cartesian3.normalize(t, Gi);
    return Cesium.Cartesian3.dot(i, r) < this.dotCutOff;
  }
  /**
   * @param {VectorTileFeature[]} features
   * @param {SymbolRenderLayer} layer
   * @param {Cesium.frameState} frameState
   * @param {VectorTileset} tileset
   */
  addLayer(e, t, i, r) {
    const s = t.style, { tile: o, labels: a } = this, l = o.rectangle;
    function c(u, f, h, p, d, y, m, x, w, v) {
      if (!Cesium.Rectangle.contains(
        l,
        Cesium.Cartographic.fromDegrees(u[0], u[1])
      ) || !f)
        return;
      const g = new Cesium.Label({
        position: Cesium.Cartesian3.fromDegrees(u[0], u[1]),
        text: f,
        font: p + "px " + h,
        fillColor: d,
        style: y && Cesium.LabelStyle.FILL_AND_OUTLINE,
        outlineWidth: y * p,
        outlineColor: m,
        //禁用深度测试
        disableDepthTestDistance: 1 / 0,
        pixelOffset: new Cesium.Cartesian2(
          x[0] * p,
          x[1] * p
        ),
        horizontalOrigin: w.horizontal,
        verticalOrigin: w.vertical
      });
      g._baseFillColor = g.fillColor.clone(), g._baseOutlineColor = g.outlineColor.clone(), g.vtAlpha = 0, g.batchId = a.length, a.push(g), t.labels.push(g), t.features.push({
        text: f,
        font: h,
        textSize: p,
        textColor: d,
        outlineWidth: y,
        outlineColor: m,
        textOffset: x,
        textOrigin: w,
        properties: v
      });
    }
    for (const u of e) {
      const f = u.toGeoJSON(o.x, o.y, o.z);
      if (!f.geometry) continue;
      const h = u.properties, p = s.layout.getDataValue(
        "icon-image",
        o.z,
        u
      ), d = s.layout.getDataValue(
        "text-field",
        o.z,
        u
      );
      let y = d;
      if (typeof y == "string")
        y = s.layout.resolveTokens(h, d);
      else if (y && y.sections) {
        for (const me of y.sections)
          me.text = s.layout.resolveTokens(h, me.text);
        y = y.toString();
      }
      if (p) {
        U("symbol图层：不支持图标");
        continue;
      }
      if (!y)
        continue;
      const m = s.layout.getDataValue(
        "text-transform",
        o.z,
        u
      );
      m === "uppercase" ? y = String(y).toUpperCase() : m === "lowercase" && (y = String(y).toLowerCase());
      const x = s.layout.getDataValue("text-max-width", o.z, u) * 3, w = s.layout.getDataValue(
        "text-rotation-alignment",
        o.z,
        u
      ), v = s.layout.getDataValue(
        "text-pitch-alignment",
        o.z,
        u
      );
      y.length > x && U("symbol图层： 不支持 text-max-width，无自动换行效果"), w === "map" && U("symbol图层：text-rotation-alignment 仅支持 viewport"), v === "map" && U("symbol图层：text-pitch-alignment 仅支持 viewport");
      const g = s.layout.getDataValue("text-font", o.z, u), b = s.layout.getDataValue(
        "text-size",
        o.z,
        u
      ), T = s.layout.getDataValue(
        "text-anchor",
        o.z,
        u
      ), I = qi(T), _ = s.layout.getDataValue(
        "text-offset",
        o.z,
        u
      ), L = s.convertColor(
        s.paint.getDataValue("text-color", o.z, u)
      ), P = s.convertColor(
        s.paint.getDataValue("text-halo-color", o.z, u)
      ), V = s.paint.getDataValue(
        "text-halo-width",
        o.z,
        u
      );
      if (!b || !isFinite(b) || Number(b) <= 0)
        continue;
      const D = f.geometry.type, ee = f.geometry.coordinates;
      D == "Point" ? c(
        ee,
        y,
        g,
        b,
        L,
        V,
        P,
        _,
        I,
        h
      ) : D == "MultiPoint" ? ee.forEach((me) => {
        c(
          me,
          y,
          g,
          b,
          L,
          V,
          P,
          _,
          I,
          h
        );
      }) : U("symbol图层：不支持符号沿线布局");
    }
    this.layers.push(t);
  }
  /**
   * 从 Web Worker 结果构建符号图层（placements 已由 Worker 算好）
   * @param {object} workerLayerData - { layerId, source, sourceLayer, styleLayer, placements }
   * @param {SymbolRenderLayer} layer
   * @param {Cesium.FrameState} frameState
   * @param {VectorTileset} tileset
   */
  addLayerFromWorkerResult(e, t, i, r) {
    const { placements: s } = e, { labels: o } = this, a = this.tile.rectangle;
    for (const l of s || []) {
      if (!Cesium.Rectangle.contains(
        a,
        Cesium.Cartographic.fromDegrees(l.coord[0], l.coord[1])
      ))
        continue;
      const c = Cesium.Color.fromBytes(
        l.textColorBytes[0],
        l.textColorBytes[1],
        l.textColorBytes[2],
        l.textColorBytes[3]
      ), u = Cesium.Color.fromBytes(
        l.outlineColorBytes[0],
        l.outlineColorBytes[1],
        l.outlineColorBytes[2],
        l.outlineColorBytes[3]
      ), f = qi(l.textAnchor), h = new Cesium.Label({
        position: Cesium.Cartesian3.fromDegrees(l.coord[0], l.coord[1]),
        text: l.text,
        font: l.textSize + "px " + l.font,
        fillColor: c,
        style: l.outlineWidth > 0 ? Cesium.LabelStyle.FILL_AND_OUTLINE : Cesium.LabelStyle.FILL,
        outlineWidth: l.outlineWidth * l.textSize,
        outlineColor: u,
        disableDepthTestDistance: 1 / 0,
        pixelOffset: new Cesium.Cartesian2(
          (l.textOffset[0] || 0) * l.textSize,
          (l.textOffset[1] || 0) * l.textSize
        ),
        horizontalOrigin: f.horizontal,
        verticalOrigin: f.vertical
      });
      h._baseFillColor = h.fillColor.clone(), h._baseOutlineColor = h.outlineColor.clone(), h.vtAlpha = 0, h.batchId = o.length, o.push(h), t.labels.push(h);
    }
    this.layers.push(t);
  }
  createPrimitive() {
    const e = new Cesium.LabelCollection();
    for (let i = 0; i < this.labels.length; i++)
      this.labels[i] = e.add(this.labels[i]);
    const t = this.layers;
    for (const i of t)
      for (let r = 0; r < i.labels.length; r++)
        i.labels[r] = this.labels[i.labels[r].batchId];
    this.primitive = e;
  }
  update(e, t) {
    if (this.state === "none")
      if (!this.primitive && this.labels?.length && this.createPrimitive(), this.primitive) {
        this.commandList.length = 0;
        const i = e.commandList;
        e.commandList = this.commandList, this.primitive.update(e), e.commandList = i;
        for (const r of this.labels) {
          const s = r._glyphs;
          if (s) {
            let o = r.text, a = [], l = [], c = !1;
            for (let u = 0; u < s.length; u++) {
              const f = s[u], h = f.dimensions;
              h && isFinite(h.width) && isFinite(h.height) ? (l.push(o[u]), a.push(f)) : c = !0;
            }
            c && (r._glyphs = a, r.text = l.join(""));
          }
        }
        this.state === "none" && i.length > 0 && this.setState("done"), this.primitive._state === Cesium.PrimitiveState.FAILED && this.setState("error");
      } else this.state === "none" && this.labels.length === 0 && this.setState("done");
  }
  render(e, t) {
    if (this.state !== "done") return;
    const i = e.camera.positionWC, r = this.layers;
    for (const s of r)
      for (let o = 0; o < s.labels.length; o++) {
        const a = s.style, l = t.zoom;
        if (s.visibility === "none" || l < a.minzoom || l >= a.maxzoom)
          s.labels[o].show = !1;
        else {
          const c = s.labels[o];
          c._baseFillColor || (c._baseFillColor = c.fillColor.clone(), c._baseOutlineColor = c.outlineColor.clone(), c.vtAlpha == null && (c.vtAlpha = c.vtPlaceable ? 1 : 0));
          const u = c.vtPlaceable ? 1 : 0;
          c.vtAlpha = Cesium.Math.lerp(
            c.vtAlpha ?? 0,
            u,
            gh
          ), c.vtAlpha < 1e-3 ? (c.vtAlpha = 0, c.show = !1) : (c.show = !0, c.fillColor = c._baseFillColor.withAlpha(
            c._baseFillColor.alpha * c.vtAlpha
          ), c.outlineColor = c._baseOutlineColor.withAlpha(
            c._baseOutlineColor.alpha * c.vtAlpha
          ));
        }
      }
    for (const s of this.labels)
      s.show && (s.show = !this.isOccluded(i, s.position));
    if (this.primitive) {
      this.commandList.length = 0;
      const s = e.commandList;
      e.commandList = this.commandList, this.primitive.update(e), e.commandList = s;
    }
    super.render(e);
  }
  destroy() {
    this.primitive = this.primitive && this.primitive.destroy(), super.destroy();
  }
  isDestroyed() {
    return !1;
  }
}
function qi(n) {
  let e = Cesium.HorizontalOrigin.CENTER, t = Cesium.VerticalOrigin.CENTER;
  switch (n) {
    case "left":
      e = Cesium.HorizontalOrigin.LEFT;
      break;
    case "right":
      e = Cesium.HorizontalOrigin.RIGHT;
      break;
    case "top":
      t = Cesium.VerticalOrigin.TOP;
      break;
    case "bottom":
      t = Cesium.VerticalOrigin.BOTTOM;
      break;
    case "top-left":
      t = Cesium.VerticalOrigin.TOP, e = Cesium.HorizontalOrigin.LEFT;
      break;
    case "top-right":
      t = Cesium.VerticalOrigin.TOP, e = Cesium.HorizontalOrigin.RIGHT;
      break;
    case "bottom-left":
      t = Cesium.VerticalOrigin.BOTTOM, e = Cesium.HorizontalOrigin.LEFT;
      break;
    case "bottom-right":
      t = Cesium.VerticalOrigin.BOTTOM, e = Cesium.HorizontalOrigin.RIGHT;
      break;
  }
  return {
    horizontal: e,
    vertical: t
  };
}
class vh extends bn {
  /**
   * @param {MVT.VectorTileFeature[]} sourceFeatures
   * @param {StyleLayer} style
   * @param {VectorTileLOD} tile
   */
  constructor(e, t, i) {
    super(e, t, i), this.labels = [];
  }
  /**
   * @param {Cesium.FrameState} frameState
   * @param {VectorTileset} tileset
   */
  update(e, t) {
    if (this.paintNeedsUpdate) {
      const i = this.style, r = this.tile;
      for (let s = 0; s < this.features.length; s++) {
        const o = this.features[s], a = this.labels[s], l = i.convertColor(
          i.paint.getDataValue("text-color", r.z, o)
        ), c = i.convertColor(
          i.paint.getDataValue("text-halo-color", r.z, o)
        ), u = i.paint.getDataValue(
          "text-halo-width",
          r.z,
          o
        );
        o.textColor = l, o.outlineColor = c, o.outlineWidth = u, a.fillColor = l, a.style = u && Cesium.LabelStyle.FILL_AND_OUTLINE, a.outlineWidth = u * o.textSize, a.outlineColor = c, a._baseFillColor = a.fillColor.clone(), a._baseOutlineColor = a.outlineColor.clone();
      }
      this.paintNeedsUpdate = !1;
    }
    super.update(e, t);
  }
}
wn("symbol", vh, xh);
const wh = "cvt-gl-worker.js";
export {
  uh as BackgroundRenderLayer,
  wh as DEFAULT_WORKER_FILENAME,
  ph as FillRenderLayer,
  uc as GeoJSONSource,
  jr as ILayerVisualizer,
  bn as IRenderLayer,
  Zi as ISource,
  ht as LayerVisualizers,
  mh as LineRenderLayer,
  ft as RenderLayers,
  Wi as Sources,
  Af as StyleLayer,
  Di as StyleLayerProperties,
  vh as SymbolRenderLayer,
  Xl as VectorSource,
  qr as VectorTileLOD,
  zf as VectorTileRenderList,
  bh as VectorTileset,
  wn as registerRenderLayer,
  Xi as registerSource
};
//# sourceMappingURL=cvt-gl.js.map
