function B(n, t) {
  this.x = n, this.y = t;
}
B.prototype = {
  /**
   * Clone this point, returning a new point that can be modified
   * without affecting the old one.
   * @return {Point} the clone
   */
  clone() {
    return new B(this.x, this.y);
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
  rotateAround(n, t) {
    return this.clone()._rotateAround(n, t);
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
    const t = n.x - this.x, e = n.y - this.y;
    return t * t + e * e;
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
  angleWithSep(n, t) {
    return Math.atan2(
      this.x * t - this.y * n,
      this.x * n + this.y * t
    );
  },
  /** @param {[number, number, number, number]} m */
  _matMult(n) {
    const t = n[0] * this.x + n[1] * this.y, e = n[2] * this.x + n[3] * this.y;
    return this.x = t, this.y = e, this;
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
    const t = Math.cos(n), e = Math.sin(n), i = t * this.x - e * this.y, r = e * this.x + t * this.y;
    return this.x = i, this.y = r, this;
  },
  /**
   * @param {number} angle
   * @param {Point} p
   */
  _rotateAround(n, t) {
    const e = Math.cos(n), i = Math.sin(n), r = t.x + e * (this.x - t.x) - i * (this.y - t.y), s = t.y + i * (this.x - t.x) + e * (this.y - t.y);
    return this.x = r, this.y = s, this;
  },
  _round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  },
  constructor: B
};
B.convert = function(n) {
  if (n instanceof B)
    return (
      /** @type {Point} */
      n
    );
  if (Array.isArray(n))
    return new B(+n[0], +n[1]);
  if (n.x !== void 0 && n.y !== void 0)
    return new B(+n.x, +n.y);
  throw new Error("Expected [x, y] or {x, y} point format");
};
class gt {
  /**
   * @param {Pbf} pbf
   * @param {number} end
   * @param {number} extent
   * @param {string[]} keys
   * @param {(number | string | boolean)[]} values
   */
  constructor(t, e, i, r, s) {
    this.properties = {}, this.extent = i, this.type = 0, this.id = void 0, this._pbf = t, this._geometry = -1, this._keys = r, this._values = s, t.readFields(gs, this, e);
  }
  loadGeometry() {
    const t = this._pbf;
    t.pos = this._geometry;
    const e = t.readVarint() + t.pos, i = [];
    let r, s = 1, o = 0, a = 0, l = 0;
    for (; t.pos < e; ) {
      if (o <= 0) {
        const c = t.readVarint();
        s = c & 7, o = c >> 3;
      }
      if (o--, s === 1 || s === 2)
        a += t.readSVarint(), l += t.readSVarint(), s === 1 && (r && i.push(r), r = []), r && r.push(new B(a, l));
      else if (s === 7)
        r && r.push(r[0].clone());
      else
        throw new Error(`unknown command ${s}`);
    }
    return r && i.push(r), i;
  }
  bbox() {
    const t = this._pbf;
    t.pos = this._geometry;
    const e = t.readVarint() + t.pos;
    let i = 1, r = 0, s = 0, o = 0, a = 1 / 0, l = -1 / 0, c = 1 / 0, f = -1 / 0;
    for (; t.pos < e; ) {
      if (r <= 0) {
        const u = t.readVarint();
        i = u & 7, r = u >> 3;
      }
      if (r--, i === 1 || i === 2)
        s += t.readSVarint(), o += t.readSVarint(), s < a && (a = s), s > l && (l = s), o < c && (c = o), o > f && (f = o);
      else if (i !== 7)
        throw new Error(`unknown command ${i}`);
    }
    return [a, c, l, f];
  }
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @return {Feature}
   */
  toGeoJSON(t, e, i) {
    const r = this.extent * Math.pow(2, i), s = this.extent * t, o = this.extent * e, a = this.loadGeometry();
    function l(h) {
      return [
        (h.x + s) * 360 / r - 180,
        360 / Math.PI * Math.atan(Math.exp((1 - (h.y + o) * 2 / r) * Math.PI)) - 90
      ];
    }
    function c(h) {
      return h.map(l);
    }
    let f;
    if (this.type === 1) {
      const h = [];
      for (const d of a)
        h.push(d[0]);
      const p = c(h);
      f = h.length === 1 ? { type: "Point", coordinates: p[0] } : { type: "MultiPoint", coordinates: p };
    } else if (this.type === 2) {
      const h = a.map(c);
      f = h.length === 1 ? { type: "LineString", coordinates: h[0] } : { type: "MultiLineString", coordinates: h };
    } else if (this.type === 3) {
      const h = pi(a), p = [];
      for (const d of h)
        p.push(d.map(c));
      f = p.length === 1 ? { type: "Polygon", coordinates: p[0] } : { type: "MultiPolygon", coordinates: p };
    } else
      throw new Error("unknown feature type");
    const u = {
      type: "Feature",
      geometry: f,
      properties: this.properties
    };
    return this.id != null && (u.id = this.id), u;
  }
}
gt.types = ["Unknown", "Point", "LineString", "Polygon"];
function gs(n, t, e) {
  n === 1 ? t.id = e.readVarint() : n === 2 ? ms(e, t) : n === 3 ? t.type = /** @type {0 | 1 | 2 | 3} */
  e.readVarint() : n === 4 && (t._geometry = e.pos);
}
function ms(n, t) {
  const e = n.readVarint() + n.pos;
  for (; n.pos < e; ) {
    const i = t._keys[n.readVarint()], r = t._values[n.readVarint()];
    t.properties[i] = r;
  }
}
function pi(n) {
  const t = n.length;
  if (t <= 1) return [n];
  const e = [];
  let i, r;
  for (let s = 0; s < t; s++) {
    const o = vs(n[s]);
    o !== 0 && (r === void 0 && (r = o < 0), r === o < 0 ? (i && e.push(i), i = [n[s]]) : i && i.push(n[s]));
  }
  return i && e.push(i), e;
}
function vs(n) {
  let t = 0;
  for (let e = 0, i = n.length, r = i - 1, s, o; e < i; r = e++)
    s = n[e], o = n[r], t += (o.x - s.x) * (s.y + o.y);
  return t;
}
class ws {
  /**
   * @param {Pbf} pbf
   * @param {number} [end]
   */
  constructor(t, e) {
    this.version = 1, this.name = "", this.extent = 4096, this.length = 0, this._pbf = t, this._keys = [], this._values = [], this._features = [], t.readFields(bs, this, e), this.length = this._features.length;
  }
  /** return feature `i` from this layer as a `VectorTileFeature`
   * @param {number} i
   */
  feature(t) {
    if (t < 0 || t >= this._features.length) throw new Error("feature index out of bounds");
    this._pbf.pos = this._features[t];
    const e = this._pbf.readVarint() + this._pbf.pos;
    return new gt(this._pbf, e, this.extent, this._keys, this._values);
  }
}
function bs(n, t, e) {
  n === 15 ? t.version = e.readVarint() : n === 1 ? t.name = e.readString() : n === 5 ? t.extent = e.readVarint() : n === 2 ? t._features.push(e.pos) : n === 3 ? t._keys.push(e.readString()) : n === 4 && t._values.push(Ts(e));
}
function Ts(n) {
  let t = null;
  const e = n.readVarint() + n.pos;
  for (; n.pos < e; ) {
    const i = n.readVarint() >> 3;
    t = i === 1 ? n.readString() : i === 2 ? n.readFloat() : i === 3 ? n.readDouble() : i === 4 ? n.readVarint64() : i === 5 ? n.readVarint() : i === 6 ? n.readSVarint() : i === 7 ? n.readBoolean() : null;
  }
  if (t == null)
    throw new Error("unknown feature value");
  return t;
}
class Is {
  /**
   * @param {Pbf} pbf
   * @param {number} [end]
   */
  constructor(t, e) {
    this.layers = t.readFields(Ss, {}, e);
  }
}
function Ss(n, t, e) {
  if (n === 3) {
    const i = new ws(e, e.readVarint() + e.pos);
    i.length && (t[i.name] = i);
  }
}
const kn = 65536 * 65536, Ar = 1 / kn, Es = 12, _r = typeof TextDecoder > "u" ? null : new TextDecoder("utf-8"), pn = 0, kt = 1, rt = 2, Ft = 5;
class ks {
  /**
   * @param {Uint8Array | ArrayBuffer} [buf]
   */
  constructor(t = new Uint8Array(16)) {
    this.buf = ArrayBuffer.isView(t) ? t : new Uint8Array(t), this.dataView = new DataView(this.buf.buffer), this.pos = 0, this.type = 0, this.length = this.buf.length;
  }
  // === READING =================================================================
  /**
   * @template T
   * @param {(tag: number, result: T, pbf: Pbf) => void} readField
   * @param {T} result
   * @param {number} [end]
   */
  readFields(t, e, i = this.length) {
    for (; this.pos < i; ) {
      const r = this.readVarint(), s = r >> 3, o = this.pos;
      this.type = r & 7, t(s, e, this), this.pos === o && this.skip(r);
    }
    return e;
  }
  /**
   * @template T
   * @param {(tag: number, result: T, pbf: Pbf) => void} readField
   * @param {T} result
   */
  readMessage(t, e) {
    return this.readFields(t, e, this.readVarint() + this.pos);
  }
  readFixed32() {
    const t = this.dataView.getUint32(this.pos, !0);
    return this.pos += 4, t;
  }
  readSFixed32() {
    const t = this.dataView.getInt32(this.pos, !0);
    return this.pos += 4, t;
  }
  // 64-bit int handling is based on github.com/dpw/node-buffer-more-ints (MIT-licensed)
  readFixed64() {
    const t = this.dataView.getUint32(this.pos, !0) + this.dataView.getUint32(this.pos + 4, !0) * kn;
    return this.pos += 8, t;
  }
  readSFixed64() {
    const t = this.dataView.getUint32(this.pos, !0) + this.dataView.getInt32(this.pos + 4, !0) * kn;
    return this.pos += 8, t;
  }
  readFloat() {
    const t = this.dataView.getFloat32(this.pos, !0);
    return this.pos += 4, t;
  }
  readDouble() {
    const t = this.dataView.getFloat64(this.pos, !0);
    return this.pos += 8, t;
  }
  /**
   * @param {boolean} [isSigned]
   */
  readVarint(t) {
    const e = this.buf;
    let i, r;
    return r = e[this.pos++], i = r & 127, r < 128 || (r = e[this.pos++], i |= (r & 127) << 7, r < 128) || (r = e[this.pos++], i |= (r & 127) << 14, r < 128) || (r = e[this.pos++], i |= (r & 127) << 21, r < 128) ? i : (r = e[this.pos], i |= (r & 15) << 28, Fs(i, t, this));
  }
  readVarint64() {
    return this.readVarint(!0);
  }
  readSVarint() {
    const t = this.readVarint();
    return t % 2 === 1 ? (t + 1) / -2 : t / 2;
  }
  readBoolean() {
    return !!this.readVarint();
  }
  readString() {
    const t = this.readVarint() + this.pos, e = this.pos;
    return this.pos = t, t - e >= Es && _r ? _r.decode(this.buf.subarray(e, t)) : Us(this.buf, e, t);
  }
  readBytes() {
    const t = this.readVarint() + this.pos, e = this.buf.subarray(this.pos, t);
    return this.pos = t, e;
  }
  // verbose for performance reasons; doesn't affect gzipped size
  /**
   * @param {number[]} [arr]
   * @param {boolean} [isSigned]
   */
  readPackedVarint(t = [], e) {
    const i = this.readPackedEnd();
    for (; this.pos < i; ) t.push(this.readVarint(e));
    return t;
  }
  /** @param {number[]} [arr] */
  readPackedSVarint(t = []) {
    const e = this.readPackedEnd();
    for (; this.pos < e; ) t.push(this.readSVarint());
    return t;
  }
  /** @param {boolean[]} [arr] */
  readPackedBoolean(t = []) {
    const e = this.readPackedEnd();
    for (; this.pos < e; ) t.push(this.readBoolean());
    return t;
  }
  /** @param {number[]} [arr] */
  readPackedFloat(t = []) {
    const e = this.readPackedEnd();
    for (; this.pos < e; ) t.push(this.readFloat());
    return t;
  }
  /** @param {number[]} [arr] */
  readPackedDouble(t = []) {
    const e = this.readPackedEnd();
    for (; this.pos < e; ) t.push(this.readDouble());
    return t;
  }
  /** @param {number[]} [arr] */
  readPackedFixed32(t = []) {
    const e = this.readPackedEnd();
    for (; this.pos < e; ) t.push(this.readFixed32());
    return t;
  }
  /** @param {number[]} [arr] */
  readPackedSFixed32(t = []) {
    const e = this.readPackedEnd();
    for (; this.pos < e; ) t.push(this.readSFixed32());
    return t;
  }
  /** @param {number[]} [arr] */
  readPackedFixed64(t = []) {
    const e = this.readPackedEnd();
    for (; this.pos < e; ) t.push(this.readFixed64());
    return t;
  }
  /** @param {number[]} [arr] */
  readPackedSFixed64(t = []) {
    const e = this.readPackedEnd();
    for (; this.pos < e; ) t.push(this.readSFixed64());
    return t;
  }
  readPackedEnd() {
    return this.type === rt ? this.readVarint() + this.pos : this.pos + 1;
  }
  /** @param {number} val */
  skip(t) {
    const e = t & 7;
    if (e === pn) for (; this.buf[this.pos++] > 127; )
      ;
    else if (e === rt) this.pos = this.readVarint() + this.pos;
    else if (e === Ft) this.pos += 4;
    else if (e === kt) this.pos += 8;
    else throw new Error(`Unimplemented type: ${e}`);
  }
  // === WRITING =================================================================
  /**
   * @param {number} tag
   * @param {number} type
   */
  writeTag(t, e) {
    this.writeVarint(t << 3 | e);
  }
  /** @param {number} min */
  realloc(t) {
    let e = this.length || 16;
    for (; e < this.pos + t; ) e *= 2;
    if (e !== this.length) {
      const i = new Uint8Array(e);
      i.set(this.buf), this.buf = i, this.dataView = new DataView(i.buffer), this.length = e;
    }
  }
  finish() {
    return this.length = this.pos, this.pos = 0, this.buf.subarray(0, this.length);
  }
  /** @param {number} val */
  writeFixed32(t) {
    this.realloc(4), this.dataView.setInt32(this.pos, t, !0), this.pos += 4;
  }
  /** @param {number} val */
  writeSFixed32(t) {
    this.realloc(4), this.dataView.setInt32(this.pos, t, !0), this.pos += 4;
  }
  /** @param {number} val */
  writeFixed64(t) {
    this.realloc(8), this.dataView.setInt32(this.pos, t & -1, !0), this.dataView.setInt32(this.pos + 4, Math.floor(t * Ar), !0), this.pos += 8;
  }
  /** @param {number} val */
  writeSFixed64(t) {
    this.realloc(8), this.dataView.setInt32(this.pos, t & -1, !0), this.dataView.setInt32(this.pos + 4, Math.floor(t * Ar), !0), this.pos += 8;
  }
  /** @param {number} val */
  writeVarint(t) {
    if (t = +t || 0, t > 268435455 || t < 0) {
      As(t, this);
      return;
    }
    this.realloc(4), this.buf[this.pos++] = t & 127 | (t > 127 ? 128 : 0), !(t <= 127) && (this.buf[this.pos++] = (t >>>= 7) & 127 | (t > 127 ? 128 : 0), !(t <= 127) && (this.buf[this.pos++] = (t >>>= 7) & 127 | (t > 127 ? 128 : 0), !(t <= 127) && (this.buf[this.pos++] = t >>> 7 & 127)));
  }
  /** @param {number} val */
  writeSVarint(t) {
    this.writeVarint(t < 0 ? -t * 2 - 1 : t * 2);
  }
  /** @param {boolean} val */
  writeBoolean(t) {
    this.writeVarint(+t);
  }
  /** @param {string} str */
  writeString(t) {
    t = String(t), this.realloc(t.length * 4), this.pos++;
    const e = this.pos;
    this.pos = Vs(this.buf, t, this.pos);
    const i = this.pos - e;
    i >= 128 && Cr(e, i, this), this.pos = e - 1, this.writeVarint(i), this.pos += i;
  }
  /** @param {number} val */
  writeFloat(t) {
    this.realloc(4), this.dataView.setFloat32(this.pos, t, !0), this.pos += 4;
  }
  /** @param {number} val */
  writeDouble(t) {
    this.realloc(8), this.dataView.setFloat64(this.pos, t, !0), this.pos += 8;
  }
  /** @param {Uint8Array} buffer */
  writeBytes(t) {
    const e = t.length;
    this.writeVarint(e), this.realloc(e);
    for (let i = 0; i < e; i++) this.buf[this.pos++] = t[i];
  }
  /**
   * @template T
   * @param {(obj: T, pbf: Pbf) => void} fn
   * @param {T} obj
   */
  writeRawMessage(t, e) {
    this.pos++;
    const i = this.pos;
    t(e, this);
    const r = this.pos - i;
    r >= 128 && Cr(i, r, this), this.pos = i - 1, this.writeVarint(r), this.pos += r;
  }
  /**
   * @template T
   * @param {number} tag
   * @param {(obj: T, pbf: Pbf) => void} fn
   * @param {T} obj
   */
  writeMessage(t, e, i) {
    this.writeTag(t, rt), this.writeRawMessage(e, i);
  }
  /**
   * @param {number} tag
   * @param {number[]} arr
   */
  writePackedVarint(t, e) {
    e.length && this.writeMessage(t, Os, e);
  }
  /**
   * @param {number} tag
   * @param {number[]} arr
   */
  writePackedSVarint(t, e) {
    e.length && this.writeMessage(t, Ls, e);
  }
  /**
   * @param {number} tag
   * @param {boolean[]} arr
   */
  writePackedBoolean(t, e) {
    e.length && this.writeMessage(t, $s, e);
  }
  /**
   * @param {number} tag
   * @param {number[]} arr
   */
  writePackedFloat(t, e) {
    e.length && this.writeMessage(t, Ns, e);
  }
  /**
   * @param {number} tag
   * @param {number[]} arr
   */
  writePackedDouble(t, e) {
    e.length && this.writeMessage(t, Ms, e);
  }
  /**
   * @param {number} tag
   * @param {number[]} arr
   */
  writePackedFixed32(t, e) {
    e.length && this.writeMessage(t, Ds, e);
  }
  /**
   * @param {number} tag
   * @param {number[]} arr
   */
  writePackedSFixed32(t, e) {
    e.length && this.writeMessage(t, Rs, e);
  }
  /**
   * @param {number} tag
   * @param {number[]} arr
   */
  writePackedFixed64(t, e) {
    e.length && this.writeMessage(t, Bs, e);
  }
  /**
   * @param {number} tag
   * @param {number[]} arr
   */
  writePackedSFixed64(t, e) {
    e.length && this.writeMessage(t, zs, e);
  }
  /**
   * @param {number} tag
   * @param {Uint8Array} buffer
   */
  writeBytesField(t, e) {
    this.writeTag(t, rt), this.writeBytes(e);
  }
  /**
   * @param {number} tag
   * @param {number} val
   */
  writeFixed32Field(t, e) {
    this.writeTag(t, Ft), this.writeFixed32(e);
  }
  /**
   * @param {number} tag
   * @param {number} val
   */
  writeSFixed32Field(t, e) {
    this.writeTag(t, Ft), this.writeSFixed32(e);
  }
  /**
   * @param {number} tag
   * @param {number} val
   */
  writeFixed64Field(t, e) {
    this.writeTag(t, kt), this.writeFixed64(e);
  }
  /**
   * @param {number} tag
   * @param {number} val
   */
  writeSFixed64Field(t, e) {
    this.writeTag(t, kt), this.writeSFixed64(e);
  }
  /**
   * @param {number} tag
   * @param {number} val
   */
  writeVarintField(t, e) {
    this.writeTag(t, pn), this.writeVarint(e);
  }
  /**
   * @param {number} tag
   * @param {number} val
   */
  writeSVarintField(t, e) {
    this.writeTag(t, pn), this.writeSVarint(e);
  }
  /**
   * @param {number} tag
   * @param {string} str
   */
  writeStringField(t, e) {
    this.writeTag(t, rt), this.writeString(e);
  }
  /**
   * @param {number} tag
   * @param {number} val
   */
  writeFloatField(t, e) {
    this.writeTag(t, Ft), this.writeFloat(e);
  }
  /**
   * @param {number} tag
   * @param {number} val
   */
  writeDoubleField(t, e) {
    this.writeTag(t, kt), this.writeDouble(e);
  }
  /**
   * @param {number} tag
   * @param {boolean} val
   */
  writeBooleanField(t, e) {
    this.writeVarintField(t, +e);
  }
}
function Fs(n, t, e) {
  const i = e.buf;
  let r, s;
  if (s = i[e.pos++], r = (s & 112) >> 4, s < 128 || (s = i[e.pos++], r |= (s & 127) << 3, s < 128) || (s = i[e.pos++], r |= (s & 127) << 10, s < 128) || (s = i[e.pos++], r |= (s & 127) << 17, s < 128) || (s = i[e.pos++], r |= (s & 127) << 24, s < 128) || (s = i[e.pos++], r |= (s & 1) << 31, s < 128)) return Re(n, r, t);
  throw new Error("Expected varint not more than 10 bytes");
}
function Re(n, t, e) {
  return e ? t * 4294967296 + (n >>> 0) : (t >>> 0) * 4294967296 + (n >>> 0);
}
function As(n, t) {
  let e, i;
  if (n >= 0 ? (e = n % 4294967296 | 0, i = n / 4294967296 | 0) : (e = ~(-n % 4294967296), i = ~(-n / 4294967296), e ^ 4294967295 ? e = e + 1 | 0 : (e = 0, i = i + 1 | 0)), n >= 18446744073709552e3 || n < -18446744073709552e3)
    throw new Error("Given varint doesn't fit into 10 bytes");
  t.realloc(10), _s(e, i, t), Cs(i, t);
}
function _s(n, t, e) {
  e.buf[e.pos++] = n & 127 | 128, n >>>= 7, e.buf[e.pos++] = n & 127 | 128, n >>>= 7, e.buf[e.pos++] = n & 127 | 128, n >>>= 7, e.buf[e.pos++] = n & 127 | 128, n >>>= 7, e.buf[e.pos] = n & 127;
}
function Cs(n, t) {
  const e = (n & 7) << 4;
  t.buf[t.pos++] |= e | ((n >>>= 3) ? 128 : 0), n && (t.buf[t.pos++] = n & 127 | ((n >>>= 7) ? 128 : 0), n && (t.buf[t.pos++] = n & 127 | ((n >>>= 7) ? 128 : 0), n && (t.buf[t.pos++] = n & 127 | ((n >>>= 7) ? 128 : 0), n && (t.buf[t.pos++] = n & 127 | ((n >>>= 7) ? 128 : 0), n && (t.buf[t.pos++] = n & 127)))));
}
function Cr(n, t, e) {
  const i = t <= 16383 ? 1 : t <= 2097151 ? 2 : t <= 268435455 ? 3 : Math.floor(Math.log(t) / (Math.LN2 * 7));
  e.realloc(i);
  for (let r = e.pos - 1; r >= n; r--) e.buf[r + i] = e.buf[r];
}
function Os(n, t) {
  for (let e = 0; e < n.length; e++) t.writeVarint(n[e]);
}
function Ls(n, t) {
  for (let e = 0; e < n.length; e++) t.writeSVarint(n[e]);
}
function Ns(n, t) {
  for (let e = 0; e < n.length; e++) t.writeFloat(n[e]);
}
function Ms(n, t) {
  for (let e = 0; e < n.length; e++) t.writeDouble(n[e]);
}
function $s(n, t) {
  for (let e = 0; e < n.length; e++) t.writeBoolean(n[e]);
}
function Ds(n, t) {
  for (let e = 0; e < n.length; e++) t.writeFixed32(n[e]);
}
function Rs(n, t) {
  for (let e = 0; e < n.length; e++) t.writeSFixed32(n[e]);
}
function Bs(n, t) {
  for (let e = 0; e < n.length; e++) t.writeFixed64(n[e]);
}
function zs(n, t) {
  for (let e = 0; e < n.length; e++) t.writeSFixed64(n[e]);
}
function Us(n, t, e) {
  let i = "", r = t;
  for (; r < e; ) {
    const s = n[r];
    let o = null, a = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1;
    if (r + a > e) break;
    let l, c, f;
    a === 1 ? s < 128 && (o = s) : a === 2 ? (l = n[r + 1], (l & 192) === 128 && (o = (s & 31) << 6 | l & 63, o <= 127 && (o = null))) : a === 3 ? (l = n[r + 1], c = n[r + 2], (l & 192) === 128 && (c & 192) === 128 && (o = (s & 15) << 12 | (l & 63) << 6 | c & 63, (o <= 2047 || o >= 55296 && o <= 57343) && (o = null))) : a === 4 && (l = n[r + 1], c = n[r + 2], f = n[r + 3], (l & 192) === 128 && (c & 192) === 128 && (f & 192) === 128 && (o = (s & 15) << 18 | (l & 63) << 12 | (c & 63) << 6 | f & 63, (o <= 65535 || o >= 1114112) && (o = null))), o === null ? (o = 65533, a = 1) : o > 65535 && (o -= 65536, i += String.fromCharCode(o >>> 10 & 1023 | 55296), o = 56320 | o & 1023), i += String.fromCharCode(o), r += a;
  }
  return i;
}
function Vs(n, t, e) {
  for (let i = 0, r, s; i < t.length; i++) {
    if (r = t.charCodeAt(i), r > 55295 && r < 57344)
      if (s)
        if (r < 56320) {
          n[e++] = 239, n[e++] = 191, n[e++] = 189, s = r;
          continue;
        } else
          r = s - 55296 << 10 | r - 56320 | 65536, s = null;
      else {
        r > 56319 || i + 1 === t.length ? (n[e++] = 239, n[e++] = 191, n[e++] = 189) : s = r;
        continue;
      }
    else s && (n[e++] = 239, n[e++] = 191, n[e++] = 189, s = null);
    r < 128 ? n[e++] = r : (r < 2048 ? n[e++] = r >> 6 | 192 : (r < 65536 ? n[e++] = r >> 12 | 224 : (n[e++] = r >> 18 | 240, n[e++] = r >> 12 & 63 | 128), n[e++] = r >> 6 & 63 | 128), n[e++] = r & 63 | 128);
  }
  return e;
}
class Ye {
  constructor(t, e, i) {
    this._name = t, this.dataBuffer = e, typeof i == "number" ? this._size = i : (this.nullabilityBuffer = i, this._size = i.size());
  }
  getValue(t) {
    return this.nullabilityBuffer && !this.nullabilityBuffer.get(t) ? null : this.getValueFromBuffer(t);
  }
  has(t) {
    return this.nullabilityBuffer?.get(t) || !this.nullabilityBuffer;
  }
  get name() {
    return this._name;
  }
  get size() {
    return this._size;
  }
}
class Xt extends Ye {
}
class qn extends Xt {
  getValueFromBuffer(t) {
    return this.dataBuffer[t];
  }
}
class Pn extends Xt {
  getValueFromBuffer(t) {
    return this.dataBuffer[t];
  }
}
class di extends Ye {
  constructor(t, e, i, r) {
    super(t, e, r), this.delta = i;
  }
}
class Gn extends di {
  constructor(t, e, i, r) {
    super(t, Int32Array.of(e), i, r);
  }
  getValueFromBuffer(t) {
    return this.dataBuffer[0] + t * this.delta;
  }
}
class jn extends Ye {
  constructor(t, e, i, r) {
    super(t, r ? Int32Array.of(e) : Uint32Array.of(e), i);
  }
  getValueFromBuffer(t) {
    return this.dataBuffer[0];
  }
}
class qs {
  constructor(t, e, i, r, s = 4096) {
    this._name = t, this._geometryVector = e, this._idVector = i, this._propertyVectors = r, this._extent = s;
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
  getPropertyVector(t) {
    return this.propertyVectorsMap || (this.propertyVectorsMap = new Map(this._propertyVectors.map((e) => [e.name, e]))), this.propertyVectorsMap.get(t);
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
    const t = [], e = this.geometryVector.getGeometries();
    for (let i = 0; i < this.numFeatures; i++) {
      let r;
      if (this.idVector) {
        const a = this.idVector.getValue(i);
        r = this.containsMaxSafeIntegerValues(this.idVector) && a !== null ? Number(a) : a;
      }
      const s = {
        coordinates: e[i],
        type: this.geometryVector.geometryType(i)
      }, o = {};
      for (const a of this.propertyVectors) {
        if (!a)
          continue;
        const l = a.name, c = a.getValue(i);
        c !== null && (o[l] = c);
      }
      t.push({ id: r, geometry: s, properties: o });
    }
    return t;
  }
  containsMaxSafeIntegerValues(t) {
    return t instanceof qn || t instanceof jn || t instanceof Gn || t instanceof Pn;
  }
}
const Mt = {
  FEATURE: 0
}, O = {
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
}, at = {
  GEOMETRY: 0,
  STRUCT: 1
}, Zn = {
  ID: 0
};
class yi {
  constructor(t) {
    this.value = t;
  }
  get() {
    return this.value;
  }
  set(t) {
    this.value = t;
  }
  increment() {
    return this.value++;
  }
  add(t) {
    this.value += t;
  }
}
var A;
(function(n) {
  n.NONE = "NONE", n.DELTA = "DELTA", n.COMPONENTWISE_DELTA = "COMPONENTWISE_DELTA", n.RLE = "RLE", n.MORTON = "MORTON", n.PDE = "PDE";
})(A || (A = {}));
var be;
(function(n) {
  n.NONE = "NONE", n.FAST_PFOR = "FAST_PFOR", n.VARINT = "VARINT";
})(be || (be = {}));
const Wn = new Uint32Array(33);
Wn[0] = 0;
for (let n = 1; n <= 32; n++)
  Wn[n] = n === 32 ? 4294967295 : 4294967295 >>> 32 - n;
const Fn = Wn, xi = 65536, ae = 256;
function Xn(n, t) {
  return n - n % t;
}
function Ps(n) {
  return Xn(n + 31, 32);
}
function Gs(n) {
  if (!Number.isFinite(n) || n <= 0)
    return xi;
  const t = Xn(Math.floor(n), ae);
  return t === 0 ? ae : t;
}
function js(n) {
  const t = n >>> 0;
  return ((t & 255) << 24 | (t & 65280) << 8 | t >>> 8 & 65280 | t >>> 24 & 255) >>> 0;
}
function Zs(n, t, e, i) {
  let r = i;
  const s = n[t] >>> 0, o = n[t + 1] >>> 0;
  e[r++] = s >>> 0 & 3, e[r++] = s >>> 2 & 3, e[r++] = s >>> 4 & 3, e[r++] = s >>> 6 & 3, e[r++] = s >>> 8 & 3, e[r++] = s >>> 10 & 3, e[r++] = s >>> 12 & 3, e[r++] = s >>> 14 & 3, e[r++] = s >>> 16 & 3, e[r++] = s >>> 18 & 3, e[r++] = s >>> 20 & 3, e[r++] = s >>> 22 & 3, e[r++] = s >>> 24 & 3, e[r++] = s >>> 26 & 3, e[r++] = s >>> 28 & 3, e[r++] = s >>> 30 & 3, e[r++] = o >>> 0 & 3, e[r++] = o >>> 2 & 3, e[r++] = o >>> 4 & 3, e[r++] = o >>> 6 & 3, e[r++] = o >>> 8 & 3, e[r++] = o >>> 10 & 3, e[r++] = o >>> 12 & 3, e[r++] = o >>> 14 & 3, e[r++] = o >>> 16 & 3, e[r++] = o >>> 18 & 3, e[r++] = o >>> 20 & 3, e[r++] = o >>> 22 & 3, e[r++] = o >>> 24 & 3, e[r++] = o >>> 26 & 3, e[r++] = o >>> 28 & 3, e[r] = o >>> 30 & 3;
}
function Ws(n, t, e, i) {
  let r = i;
  const s = n[t] >>> 0, o = n[t + 1] >>> 0, a = n[t + 2] >>> 0;
  e[r++] = s >>> 0 & 7, e[r++] = s >>> 3 & 7, e[r++] = s >>> 6 & 7, e[r++] = s >>> 9 & 7, e[r++] = s >>> 12 & 7, e[r++] = s >>> 15 & 7, e[r++] = s >>> 18 & 7, e[r++] = s >>> 21 & 7, e[r++] = s >>> 24 & 7, e[r++] = s >>> 27 & 7, e[r++] = (s >>> 30 | (o & 1) << 2) & 7, e[r++] = o >>> 1 & 7, e[r++] = o >>> 4 & 7, e[r++] = o >>> 7 & 7, e[r++] = o >>> 10 & 7, e[r++] = o >>> 13 & 7, e[r++] = o >>> 16 & 7, e[r++] = o >>> 19 & 7, e[r++] = o >>> 22 & 7, e[r++] = o >>> 25 & 7, e[r++] = o >>> 28 & 7, e[r++] = (o >>> 31 | (a & 3) << 1) & 7, e[r++] = a >>> 2 & 7, e[r++] = a >>> 5 & 7, e[r++] = a >>> 8 & 7, e[r++] = a >>> 11 & 7, e[r++] = a >>> 14 & 7, e[r++] = a >>> 17 & 7, e[r++] = a >>> 20 & 7, e[r++] = a >>> 23 & 7, e[r++] = a >>> 26 & 7, e[r] = a >>> 29 & 7;
}
function Xs(n, t, e, i) {
  let r = i;
  const s = n[t] >>> 0, o = n[t + 1] >>> 0, a = n[t + 2] >>> 0, l = n[t + 3] >>> 0;
  e[r++] = s >>> 0 & 15, e[r++] = s >>> 4 & 15, e[r++] = s >>> 8 & 15, e[r++] = s >>> 12 & 15, e[r++] = s >>> 16 & 15, e[r++] = s >>> 20 & 15, e[r++] = s >>> 24 & 15, e[r++] = s >>> 28 & 15, e[r++] = o >>> 0 & 15, e[r++] = o >>> 4 & 15, e[r++] = o >>> 8 & 15, e[r++] = o >>> 12 & 15, e[r++] = o >>> 16 & 15, e[r++] = o >>> 20 & 15, e[r++] = o >>> 24 & 15, e[r++] = o >>> 28 & 15, e[r++] = a >>> 0 & 15, e[r++] = a >>> 4 & 15, e[r++] = a >>> 8 & 15, e[r++] = a >>> 12 & 15, e[r++] = a >>> 16 & 15, e[r++] = a >>> 20 & 15, e[r++] = a >>> 24 & 15, e[r++] = a >>> 28 & 15, e[r++] = l >>> 0 & 15, e[r++] = l >>> 4 & 15, e[r++] = l >>> 8 & 15, e[r++] = l >>> 12 & 15, e[r++] = l >>> 16 & 15, e[r++] = l >>> 20 & 15, e[r++] = l >>> 24 & 15, e[r] = l >>> 28 & 15;
}
function Hs(n, t, e, i) {
  let r = i;
  const s = n[t] >>> 0, o = n[t + 1] >>> 0, a = n[t + 2] >>> 0, l = n[t + 3] >>> 0, c = n[t + 4] >>> 0;
  e[r++] = s >>> 0 & 31, e[r++] = s >>> 5 & 31, e[r++] = s >>> 10 & 31, e[r++] = s >>> 15 & 31, e[r++] = s >>> 20 & 31, e[r++] = s >>> 25 & 31, e[r++] = (s >>> 30 | (o & 7) << 2) & 31, e[r++] = o >>> 3 & 31, e[r++] = o >>> 8 & 31, e[r++] = o >>> 13 & 31, e[r++] = o >>> 18 & 31, e[r++] = o >>> 23 & 31, e[r++] = (o >>> 28 | (a & 1) << 4) & 31, e[r++] = a >>> 1 & 31, e[r++] = a >>> 6 & 31, e[r++] = a >>> 11 & 31, e[r++] = a >>> 16 & 31, e[r++] = a >>> 21 & 31, e[r++] = a >>> 26 & 31, e[r++] = (a >>> 31 | (l & 15) << 1) & 31, e[r++] = l >>> 4 & 31, e[r++] = l >>> 9 & 31, e[r++] = l >>> 14 & 31, e[r++] = l >>> 19 & 31, e[r++] = l >>> 24 & 31, e[r++] = (l >>> 29 | (c & 3) << 3) & 31, e[r++] = c >>> 2 & 31, e[r++] = c >>> 7 & 31, e[r++] = c >>> 12 & 31, e[r++] = c >>> 17 & 31, e[r++] = c >>> 22 & 31, e[r] = c >>> 27 & 31;
}
function Ys(n, t, e, i) {
  let r = i;
  const s = n[t] >>> 0, o = n[t + 1] >>> 0, a = n[t + 2] >>> 0, l = n[t + 3] >>> 0, c = n[t + 4] >>> 0, f = n[t + 5] >>> 0;
  e[r++] = s >>> 0 & 63, e[r++] = s >>> 6 & 63, e[r++] = s >>> 12 & 63, e[r++] = s >>> 18 & 63, e[r++] = s >>> 24 & 63, e[r++] = (s >>> 30 | (o & 15) << 2) & 63, e[r++] = o >>> 4 & 63, e[r++] = o >>> 10 & 63, e[r++] = o >>> 16 & 63, e[r++] = o >>> 22 & 63, e[r++] = (o >>> 28 | (a & 3) << 4) & 63, e[r++] = a >>> 2 & 63, e[r++] = a >>> 8 & 63, e[r++] = a >>> 14 & 63, e[r++] = a >>> 20 & 63, e[r++] = a >>> 26 & 63, e[r++] = l >>> 0 & 63, e[r++] = l >>> 6 & 63, e[r++] = l >>> 12 & 63, e[r++] = l >>> 18 & 63, e[r++] = l >>> 24 & 63, e[r++] = (l >>> 30 | (c & 15) << 2) & 63, e[r++] = c >>> 4 & 63, e[r++] = c >>> 10 & 63, e[r++] = c >>> 16 & 63, e[r++] = c >>> 22 & 63, e[r++] = (c >>> 28 | (f & 3) << 4) & 63, e[r++] = f >>> 2 & 63, e[r++] = f >>> 8 & 63, e[r++] = f >>> 14 & 63, e[r++] = f >>> 20 & 63, e[r] = f >>> 26 & 63;
}
function Qs(n, t, e, i) {
  let r = i;
  const s = n[t] >>> 0, o = n[t + 1] >>> 0, a = n[t + 2] >>> 0, l = n[t + 3] >>> 0, c = n[t + 4] >>> 0, f = n[t + 5] >>> 0, u = n[t + 6] >>> 0;
  e[r++] = s >>> 0 & 127, e[r++] = s >>> 7 & 127, e[r++] = s >>> 14 & 127, e[r++] = s >>> 21 & 127, e[r++] = (s >>> 28 | (o & 7) << 4) & 127, e[r++] = o >>> 3 & 127, e[r++] = o >>> 10 & 127, e[r++] = o >>> 17 & 127, e[r++] = o >>> 24 & 127, e[r++] = (o >>> 31 | (a & 63) << 1) & 127, e[r++] = a >>> 6 & 127, e[r++] = a >>> 13 & 127, e[r++] = a >>> 20 & 127, e[r++] = (a >>> 27 | (l & 3) << 5) & 127, e[r++] = l >>> 2 & 127, e[r++] = l >>> 9 & 127, e[r++] = l >>> 16 & 127, e[r++] = l >>> 23 & 127, e[r++] = (l >>> 30 | (c & 31) << 2) & 127, e[r++] = c >>> 5 & 127, e[r++] = c >>> 12 & 127, e[r++] = c >>> 19 & 127, e[r++] = (c >>> 26 | (f & 1) << 6) & 127, e[r++] = f >>> 1 & 127, e[r++] = f >>> 8 & 127, e[r++] = f >>> 15 & 127, e[r++] = f >>> 22 & 127, e[r++] = (f >>> 29 | (u & 15) << 3) & 127, e[r++] = u >>> 4 & 127, e[r++] = u >>> 11 & 127, e[r++] = u >>> 18 & 127, e[r] = u >>> 25 & 127;
}
function Js(n, t, e, i) {
  let r = i;
  const s = n[t] >>> 0, o = n[t + 1] >>> 0, a = n[t + 2] >>> 0, l = n[t + 3] >>> 0, c = n[t + 4] >>> 0, f = n[t + 5] >>> 0, u = n[t + 6] >>> 0, h = n[t + 7] >>> 0;
  e[r++] = s >>> 0 & 255, e[r++] = s >>> 8 & 255, e[r++] = s >>> 16 & 255, e[r++] = s >>> 24 & 255, e[r++] = o >>> 0 & 255, e[r++] = o >>> 8 & 255, e[r++] = o >>> 16 & 255, e[r++] = o >>> 24 & 255, e[r++] = a >>> 0 & 255, e[r++] = a >>> 8 & 255, e[r++] = a >>> 16 & 255, e[r++] = a >>> 24 & 255, e[r++] = l >>> 0 & 255, e[r++] = l >>> 8 & 255, e[r++] = l >>> 16 & 255, e[r++] = l >>> 24 & 255, e[r++] = c >>> 0 & 255, e[r++] = c >>> 8 & 255, e[r++] = c >>> 16 & 255, e[r++] = c >>> 24 & 255, e[r++] = f >>> 0 & 255, e[r++] = f >>> 8 & 255, e[r++] = f >>> 16 & 255, e[r++] = f >>> 24 & 255, e[r++] = u >>> 0 & 255, e[r++] = u >>> 8 & 255, e[r++] = u >>> 16 & 255, e[r++] = u >>> 24 & 255, e[r++] = h >>> 0 & 255, e[r++] = h >>> 8 & 255, e[r++] = h >>> 16 & 255, e[r] = h >>> 24 & 255;
}
function Ks(n, t, e, i) {
  let r = i;
  const s = n[t] >>> 0, o = n[t + 1] >>> 0, a = n[t + 2] >>> 0, l = n[t + 3] >>> 0, c = n[t + 4] >>> 0, f = n[t + 5] >>> 0, u = n[t + 6] >>> 0, h = n[t + 7] >>> 0, p = n[t + 8] >>> 0;
  e[r++] = s >>> 0 & 511, e[r++] = s >>> 9 & 511, e[r++] = s >>> 18 & 511, e[r++] = (s >>> 27 | (o & 15) << 5) & 511, e[r++] = o >>> 4 & 511, e[r++] = o >>> 13 & 511, e[r++] = o >>> 22 & 511, e[r++] = (o >>> 31 | (a & 255) << 1) & 511, e[r++] = a >>> 8 & 511, e[r++] = a >>> 17 & 511, e[r++] = (a >>> 26 | (l & 7) << 6) & 511, e[r++] = l >>> 3 & 511, e[r++] = l >>> 12 & 511, e[r++] = l >>> 21 & 511, e[r++] = (l >>> 30 | (c & 127) << 2) & 511, e[r++] = c >>> 7 & 511, e[r++] = c >>> 16 & 511, e[r++] = (c >>> 25 | (f & 3) << 7) & 511, e[r++] = f >>> 2 & 511, e[r++] = f >>> 11 & 511, e[r++] = f >>> 20 & 511, e[r++] = (f >>> 29 | (u & 63) << 3) & 511, e[r++] = u >>> 6 & 511, e[r++] = u >>> 15 & 511, e[r++] = (u >>> 24 | (h & 1) << 8) & 511, e[r++] = h >>> 1 & 511, e[r++] = h >>> 10 & 511, e[r++] = h >>> 19 & 511, e[r++] = (h >>> 28 | (p & 31) << 4) & 511, e[r++] = p >>> 5 & 511, e[r++] = p >>> 14 & 511, e[r] = p >>> 23 & 511;
}
function eo(n, t, e, i) {
  let r = i;
  const s = n[t] >>> 0, o = n[t + 1] >>> 0, a = n[t + 2] >>> 0, l = n[t + 3] >>> 0, c = n[t + 4] >>> 0, f = n[t + 5] >>> 0, u = n[t + 6] >>> 0, h = n[t + 7] >>> 0, p = n[t + 8] >>> 0, d = n[t + 9] >>> 0;
  e[r++] = s >>> 0 & 1023, e[r++] = s >>> 10 & 1023, e[r++] = s >>> 20 & 1023, e[r++] = (s >>> 30 | (o & 255) << 2) & 1023, e[r++] = o >>> 8 & 1023, e[r++] = o >>> 18 & 1023, e[r++] = (o >>> 28 | (a & 63) << 4) & 1023, e[r++] = a >>> 6 & 1023, e[r++] = a >>> 16 & 1023, e[r++] = (a >>> 26 | (l & 15) << 6) & 1023, e[r++] = l >>> 4 & 1023, e[r++] = l >>> 14 & 1023, e[r++] = (l >>> 24 | (c & 3) << 8) & 1023, e[r++] = c >>> 2 & 1023, e[r++] = c >>> 12 & 1023, e[r++] = c >>> 22 & 1023, e[r++] = f >>> 0 & 1023, e[r++] = f >>> 10 & 1023, e[r++] = f >>> 20 & 1023, e[r++] = (f >>> 30 | (u & 255) << 2) & 1023, e[r++] = u >>> 8 & 1023, e[r++] = u >>> 18 & 1023, e[r++] = (u >>> 28 | (h & 63) << 4) & 1023, e[r++] = h >>> 6 & 1023, e[r++] = h >>> 16 & 1023, e[r++] = (h >>> 26 | (p & 15) << 6) & 1023, e[r++] = p >>> 4 & 1023, e[r++] = p >>> 14 & 1023, e[r++] = (p >>> 24 | (d & 3) << 8) & 1023, e[r++] = d >>> 2 & 1023, e[r++] = d >>> 12 & 1023, e[r] = d >>> 22 & 1023;
}
function to(n, t, e, i) {
  let r = i;
  const s = n[t] >>> 0, o = n[t + 1] >>> 0, a = n[t + 2] >>> 0, l = n[t + 3] >>> 0, c = n[t + 4] >>> 0, f = n[t + 5] >>> 0, u = n[t + 6] >>> 0, h = n[t + 7] >>> 0, p = n[t + 8] >>> 0, d = n[t + 9] >>> 0, x = n[t + 10] >>> 0;
  e[r++] = s >>> 0 & 2047, e[r++] = s >>> 11 & 2047, e[r++] = (s >>> 22 | (o & 1) << 10) & 2047, e[r++] = o >>> 1 & 2047, e[r++] = o >>> 12 & 2047, e[r++] = (o >>> 23 | (a & 3) << 9) & 2047, e[r++] = a >>> 2 & 2047, e[r++] = a >>> 13 & 2047, e[r++] = (a >>> 24 | (l & 7) << 8) & 2047, e[r++] = l >>> 3 & 2047, e[r++] = l >>> 14 & 2047, e[r++] = (l >>> 25 | (c & 15) << 7) & 2047, e[r++] = c >>> 4 & 2047, e[r++] = c >>> 15 & 2047, e[r++] = (c >>> 26 | (f & 31) << 6) & 2047, e[r++] = f >>> 5 & 2047, e[r++] = f >>> 16 & 2047, e[r++] = (f >>> 27 | (u & 63) << 5) & 2047, e[r++] = u >>> 6 & 2047, e[r++] = u >>> 17 & 2047, e[r++] = (u >>> 28 | (h & 127) << 4) & 2047, e[r++] = h >>> 7 & 2047, e[r++] = h >>> 18 & 2047, e[r++] = (h >>> 29 | (p & 255) << 3) & 2047, e[r++] = p >>> 8 & 2047, e[r++] = p >>> 19 & 2047, e[r++] = (p >>> 30 | (d & 511) << 2) & 2047, e[r++] = d >>> 9 & 2047, e[r++] = d >>> 20 & 2047, e[r++] = (d >>> 31 | (x & 1023) << 1) & 2047, e[r++] = x >>> 10 & 2047, e[r] = x >>> 21 & 2047;
}
function no(n, t, e, i) {
  let r = i;
  const s = n[t] >>> 0, o = n[t + 1] >>> 0, a = n[t + 2] >>> 0, l = n[t + 3] >>> 0, c = n[t + 4] >>> 0, f = n[t + 5] >>> 0, u = n[t + 6] >>> 0, h = n[t + 7] >>> 0, p = n[t + 8] >>> 0, d = n[t + 9] >>> 0, x = n[t + 10] >>> 0, y = n[t + 11] >>> 0;
  e[r++] = s >>> 0 & 4095, e[r++] = s >>> 12 & 4095, e[r++] = (s >>> 24 | (o & 15) << 8) & 4095, e[r++] = o >>> 4 & 4095, e[r++] = o >>> 16 & 4095, e[r++] = (o >>> 28 | (a & 255) << 4) & 4095, e[r++] = a >>> 8 & 4095, e[r++] = a >>> 20 & 4095, e[r++] = l >>> 0 & 4095, e[r++] = l >>> 12 & 4095, e[r++] = (l >>> 24 | (c & 15) << 8) & 4095, e[r++] = c >>> 4 & 4095, e[r++] = c >>> 16 & 4095, e[r++] = (c >>> 28 | (f & 255) << 4) & 4095, e[r++] = f >>> 8 & 4095, e[r++] = f >>> 20 & 4095, e[r++] = u >>> 0 & 4095, e[r++] = u >>> 12 & 4095, e[r++] = (u >>> 24 | (h & 15) << 8) & 4095, e[r++] = h >>> 4 & 4095, e[r++] = h >>> 16 & 4095, e[r++] = (h >>> 28 | (p & 255) << 4) & 4095, e[r++] = p >>> 8 & 4095, e[r++] = p >>> 20 & 4095, e[r++] = d >>> 0 & 4095, e[r++] = d >>> 12 & 4095, e[r++] = (d >>> 24 | (x & 15) << 8) & 4095, e[r++] = x >>> 4 & 4095, e[r++] = x >>> 16 & 4095, e[r++] = (x >>> 28 | (y & 255) << 4) & 4095, e[r++] = y >>> 8 & 4095, e[r] = y >>> 20 & 4095;
}
function ro(n, t, e, i) {
  let r = i;
  const s = n[t] >>> 0, o = n[t + 1] >>> 0, a = n[t + 2] >>> 0, l = n[t + 3] >>> 0, c = n[t + 4] >>> 0, f = n[t + 5] >>> 0, u = n[t + 6] >>> 0, h = n[t + 7] >>> 0, p = n[t + 8] >>> 0, d = n[t + 9] >>> 0, x = n[t + 10] >>> 0, y = n[t + 11] >>> 0, v = n[t + 12] >>> 0, T = n[t + 13] >>> 0, m = n[t + 14] >>> 0, g = n[t + 15] >>> 0;
  e[r++] = s >>> 0 & 65535, e[r++] = s >>> 16 & 65535, e[r++] = o >>> 0 & 65535, e[r++] = o >>> 16 & 65535, e[r++] = a >>> 0 & 65535, e[r++] = a >>> 16 & 65535, e[r++] = l >>> 0 & 65535, e[r++] = l >>> 16 & 65535, e[r++] = c >>> 0 & 65535, e[r++] = c >>> 16 & 65535, e[r++] = f >>> 0 & 65535, e[r++] = f >>> 16 & 65535, e[r++] = u >>> 0 & 65535, e[r++] = u >>> 16 & 65535, e[r++] = h >>> 0 & 65535, e[r++] = h >>> 16 & 65535, e[r++] = p >>> 0 & 65535, e[r++] = p >>> 16 & 65535, e[r++] = d >>> 0 & 65535, e[r++] = d >>> 16 & 65535, e[r++] = x >>> 0 & 65535, e[r++] = x >>> 16 & 65535, e[r++] = y >>> 0 & 65535, e[r++] = y >>> 16 & 65535, e[r++] = v >>> 0 & 65535, e[r++] = v >>> 16 & 65535, e[r++] = T >>> 0 & 65535, e[r++] = T >>> 16 & 65535, e[r++] = m >>> 0 & 65535, e[r++] = m >>> 16 & 65535, e[r++] = g >>> 0 & 65535, e[r] = g >>> 16 & 65535;
}
function io(n, t, e, i) {
  let r = i, s = t;
  for (let o = 0; o < 8; o++) {
    const a = n[s++] >>> 0;
    e[r++] = a >>> 0 & 1, e[r++] = a >>> 1 & 1, e[r++] = a >>> 2 & 1, e[r++] = a >>> 3 & 1, e[r++] = a >>> 4 & 1, e[r++] = a >>> 5 & 1, e[r++] = a >>> 6 & 1, e[r++] = a >>> 7 & 1, e[r++] = a >>> 8 & 1, e[r++] = a >>> 9 & 1, e[r++] = a >>> 10 & 1, e[r++] = a >>> 11 & 1, e[r++] = a >>> 12 & 1, e[r++] = a >>> 13 & 1, e[r++] = a >>> 14 & 1, e[r++] = a >>> 15 & 1, e[r++] = a >>> 16 & 1, e[r++] = a >>> 17 & 1, e[r++] = a >>> 18 & 1, e[r++] = a >>> 19 & 1, e[r++] = a >>> 20 & 1, e[r++] = a >>> 21 & 1, e[r++] = a >>> 22 & 1, e[r++] = a >>> 23 & 1, e[r++] = a >>> 24 & 1, e[r++] = a >>> 25 & 1, e[r++] = a >>> 26 & 1, e[r++] = a >>> 27 & 1, e[r++] = a >>> 28 & 1, e[r++] = a >>> 29 & 1, e[r++] = a >>> 30 & 1, e[r++] = a >>> 31 & 1;
  }
}
function so(n, t, e, i) {
  let r = i, s = t;
  for (let o = 0; o < 8; o++) {
    const a = n[s++] >>> 0, l = n[s++] >>> 0;
    e[r++] = a >>> 0 & 3, e[r++] = a >>> 2 & 3, e[r++] = a >>> 4 & 3, e[r++] = a >>> 6 & 3, e[r++] = a >>> 8 & 3, e[r++] = a >>> 10 & 3, e[r++] = a >>> 12 & 3, e[r++] = a >>> 14 & 3, e[r++] = a >>> 16 & 3, e[r++] = a >>> 18 & 3, e[r++] = a >>> 20 & 3, e[r++] = a >>> 22 & 3, e[r++] = a >>> 24 & 3, e[r++] = a >>> 26 & 3, e[r++] = a >>> 28 & 3, e[r++] = a >>> 30 & 3, e[r++] = l >>> 0 & 3, e[r++] = l >>> 2 & 3, e[r++] = l >>> 4 & 3, e[r++] = l >>> 6 & 3, e[r++] = l >>> 8 & 3, e[r++] = l >>> 10 & 3, e[r++] = l >>> 12 & 3, e[r++] = l >>> 14 & 3, e[r++] = l >>> 16 & 3, e[r++] = l >>> 18 & 3, e[r++] = l >>> 20 & 3, e[r++] = l >>> 22 & 3, e[r++] = l >>> 24 & 3, e[r++] = l >>> 26 & 3, e[r++] = l >>> 28 & 3, e[r++] = l >>> 30 & 3;
  }
}
function oo(n, t, e, i) {
  let r = i, s = t;
  for (let o = 0; o < 8; o++) {
    const a = n[s++] >>> 0, l = n[s++] >>> 0, c = n[s++] >>> 0;
    e[r++] = a >>> 0 & 7, e[r++] = a >>> 3 & 7, e[r++] = a >>> 6 & 7, e[r++] = a >>> 9 & 7, e[r++] = a >>> 12 & 7, e[r++] = a >>> 15 & 7, e[r++] = a >>> 18 & 7, e[r++] = a >>> 21 & 7, e[r++] = a >>> 24 & 7, e[r++] = a >>> 27 & 7, e[r++] = (a >>> 30 | (l & 1) << 2) & 7, e[r++] = l >>> 1 & 7, e[r++] = l >>> 4 & 7, e[r++] = l >>> 7 & 7, e[r++] = l >>> 10 & 7, e[r++] = l >>> 13 & 7, e[r++] = l >>> 16 & 7, e[r++] = l >>> 19 & 7, e[r++] = l >>> 22 & 7, e[r++] = l >>> 25 & 7, e[r++] = l >>> 28 & 7, e[r++] = (l >>> 31 | (c & 3) << 1) & 7, e[r++] = c >>> 2 & 7, e[r++] = c >>> 5 & 7, e[r++] = c >>> 8 & 7, e[r++] = c >>> 11 & 7, e[r++] = c >>> 14 & 7, e[r++] = c >>> 17 & 7, e[r++] = c >>> 20 & 7, e[r++] = c >>> 23 & 7, e[r++] = c >>> 26 & 7, e[r++] = c >>> 29 & 7;
  }
}
function ao(n, t, e, i) {
  let r = i, s = t;
  for (let o = 0; o < 8; o++) {
    const a = n[s++] >>> 0, l = n[s++] >>> 0, c = n[s++] >>> 0, f = n[s++] >>> 0;
    e[r++] = a >>> 0 & 15, e[r++] = a >>> 4 & 15, e[r++] = a >>> 8 & 15, e[r++] = a >>> 12 & 15, e[r++] = a >>> 16 & 15, e[r++] = a >>> 20 & 15, e[r++] = a >>> 24 & 15, e[r++] = a >>> 28 & 15, e[r++] = l >>> 0 & 15, e[r++] = l >>> 4 & 15, e[r++] = l >>> 8 & 15, e[r++] = l >>> 12 & 15, e[r++] = l >>> 16 & 15, e[r++] = l >>> 20 & 15, e[r++] = l >>> 24 & 15, e[r++] = l >>> 28 & 15, e[r++] = c >>> 0 & 15, e[r++] = c >>> 4 & 15, e[r++] = c >>> 8 & 15, e[r++] = c >>> 12 & 15, e[r++] = c >>> 16 & 15, e[r++] = c >>> 20 & 15, e[r++] = c >>> 24 & 15, e[r++] = c >>> 28 & 15, e[r++] = f >>> 0 & 15, e[r++] = f >>> 4 & 15, e[r++] = f >>> 8 & 15, e[r++] = f >>> 12 & 15, e[r++] = f >>> 16 & 15, e[r++] = f >>> 20 & 15, e[r++] = f >>> 24 & 15, e[r++] = f >>> 28 & 15;
  }
}
function lo(n, t, e, i) {
  let r = i, s = t;
  for (let o = 0; o < 8; o++) {
    const a = n[s++] >>> 0, l = n[s++] >>> 0, c = n[s++] >>> 0, f = n[s++] >>> 0, u = n[s++] >>> 0;
    e[r++] = a >>> 0 & 31, e[r++] = a >>> 5 & 31, e[r++] = a >>> 10 & 31, e[r++] = a >>> 15 & 31, e[r++] = a >>> 20 & 31, e[r++] = a >>> 25 & 31, e[r++] = (a >>> 30 | (l & 7) << 2) & 31, e[r++] = l >>> 3 & 31, e[r++] = l >>> 8 & 31, e[r++] = l >>> 13 & 31, e[r++] = l >>> 18 & 31, e[r++] = l >>> 23 & 31, e[r++] = (l >>> 28 | (c & 1) << 4) & 31, e[r++] = c >>> 1 & 31, e[r++] = c >>> 6 & 31, e[r++] = c >>> 11 & 31, e[r++] = c >>> 16 & 31, e[r++] = c >>> 21 & 31, e[r++] = c >>> 26 & 31, e[r++] = (c >>> 31 | (f & 15) << 1) & 31, e[r++] = f >>> 4 & 31, e[r++] = f >>> 9 & 31, e[r++] = f >>> 14 & 31, e[r++] = f >>> 19 & 31, e[r++] = f >>> 24 & 31, e[r++] = (f >>> 29 | (u & 3) << 3) & 31, e[r++] = u >>> 2 & 31, e[r++] = u >>> 7 & 31, e[r++] = u >>> 12 & 31, e[r++] = u >>> 17 & 31, e[r++] = u >>> 22 & 31, e[r++] = u >>> 27 & 31;
  }
}
function co(n, t, e, i) {
  let r = i, s = t;
  for (let o = 0; o < 8; o++) {
    const a = n[s++] >>> 0, l = n[s++] >>> 0, c = n[s++] >>> 0, f = n[s++] >>> 0, u = n[s++] >>> 0, h = n[s++] >>> 0;
    e[r++] = a >>> 0 & 63, e[r++] = a >>> 6 & 63, e[r++] = a >>> 12 & 63, e[r++] = a >>> 18 & 63, e[r++] = a >>> 24 & 63, e[r++] = (a >>> 30 | (l & 15) << 2) & 63, e[r++] = l >>> 4 & 63, e[r++] = l >>> 10 & 63, e[r++] = l >>> 16 & 63, e[r++] = l >>> 22 & 63, e[r++] = (l >>> 28 | (c & 3) << 4) & 63, e[r++] = c >>> 2 & 63, e[r++] = c >>> 8 & 63, e[r++] = c >>> 14 & 63, e[r++] = c >>> 20 & 63, e[r++] = c >>> 26 & 63, e[r++] = f >>> 0 & 63, e[r++] = f >>> 6 & 63, e[r++] = f >>> 12 & 63, e[r++] = f >>> 18 & 63, e[r++] = f >>> 24 & 63, e[r++] = (f >>> 30 | (u & 15) << 2) & 63, e[r++] = u >>> 4 & 63, e[r++] = u >>> 10 & 63, e[r++] = u >>> 16 & 63, e[r++] = u >>> 22 & 63, e[r++] = (u >>> 28 | (h & 3) << 4) & 63, e[r++] = h >>> 2 & 63, e[r++] = h >>> 8 & 63, e[r++] = h >>> 14 & 63, e[r++] = h >>> 20 & 63, e[r++] = h >>> 26 & 63;
  }
}
function fo(n, t, e, i) {
  let r = i, s = t;
  for (let o = 0; o < 8; o++) {
    const a = n[s++] >>> 0, l = n[s++] >>> 0, c = n[s++] >>> 0, f = n[s++] >>> 0, u = n[s++] >>> 0, h = n[s++] >>> 0, p = n[s++] >>> 0;
    e[r++] = a >>> 0 & 127, e[r++] = a >>> 7 & 127, e[r++] = a >>> 14 & 127, e[r++] = a >>> 21 & 127, e[r++] = (a >>> 28 | (l & 7) << 4) & 127, e[r++] = l >>> 3 & 127, e[r++] = l >>> 10 & 127, e[r++] = l >>> 17 & 127, e[r++] = l >>> 24 & 127, e[r++] = (l >>> 31 | (c & 63) << 1) & 127, e[r++] = c >>> 6 & 127, e[r++] = c >>> 13 & 127, e[r++] = c >>> 20 & 127, e[r++] = (c >>> 27 | (f & 3) << 5) & 127, e[r++] = f >>> 2 & 127, e[r++] = f >>> 9 & 127, e[r++] = f >>> 16 & 127, e[r++] = f >>> 23 & 127, e[r++] = (f >>> 30 | (u & 31) << 2) & 127, e[r++] = u >>> 5 & 127, e[r++] = u >>> 12 & 127, e[r++] = u >>> 19 & 127, e[r++] = (u >>> 26 | (h & 1) << 6) & 127, e[r++] = h >>> 1 & 127, e[r++] = h >>> 8 & 127, e[r++] = h >>> 15 & 127, e[r++] = h >>> 22 & 127, e[r++] = (h >>> 29 | (p & 15) << 3) & 127, e[r++] = p >>> 4 & 127, e[r++] = p >>> 11 & 127, e[r++] = p >>> 18 & 127, e[r++] = p >>> 25 & 127;
  }
}
function uo(n, t, e, i) {
  let r = i, s = t;
  for (let o = 0; o < 8; o++) {
    const a = n[s++] >>> 0, l = n[s++] >>> 0, c = n[s++] >>> 0, f = n[s++] >>> 0, u = n[s++] >>> 0, h = n[s++] >>> 0, p = n[s++] >>> 0, d = n[s++] >>> 0;
    e[r++] = a >>> 0 & 255, e[r++] = a >>> 8 & 255, e[r++] = a >>> 16 & 255, e[r++] = a >>> 24 & 255, e[r++] = l >>> 0 & 255, e[r++] = l >>> 8 & 255, e[r++] = l >>> 16 & 255, e[r++] = l >>> 24 & 255, e[r++] = c >>> 0 & 255, e[r++] = c >>> 8 & 255, e[r++] = c >>> 16 & 255, e[r++] = c >>> 24 & 255, e[r++] = f >>> 0 & 255, e[r++] = f >>> 8 & 255, e[r++] = f >>> 16 & 255, e[r++] = f >>> 24 & 255, e[r++] = u >>> 0 & 255, e[r++] = u >>> 8 & 255, e[r++] = u >>> 16 & 255, e[r++] = u >>> 24 & 255, e[r++] = h >>> 0 & 255, e[r++] = h >>> 8 & 255, e[r++] = h >>> 16 & 255, e[r++] = h >>> 24 & 255, e[r++] = p >>> 0 & 255, e[r++] = p >>> 8 & 255, e[r++] = p >>> 16 & 255, e[r++] = p >>> 24 & 255, e[r++] = d >>> 0 & 255, e[r++] = d >>> 8 & 255, e[r++] = d >>> 16 & 255, e[r++] = d >>> 24 & 255;
  }
}
function ho(n, t, e, i) {
  let r = i, s = t;
  for (let o = 0; o < 128; o++) {
    const a = n[s++] >>> 0;
    e[r++] = a & 65535, e[r++] = a >>> 16 & 65535;
  }
}
function po(n, t, e, i, r) {
  const s = Fn[r] >>> 0;
  let o = t, a = 0, l = n[o] >>> 0, c = i;
  for (let f = 0; f < 8; f++) {
    for (let u = 0; u < 32; u++)
      if (a + r <= 32) {
        const h = l >>> a & s;
        e[c + u] = h | 0, a += r, a === 32 && (a = 0, o++, u !== 31 && (l = n[o] >>> 0));
      } else {
        const h = 32 - a, p = l >>> a;
        o++, l = n[o] >>> 0;
        const d = r - h, x = -1 >>> 32 - d >>> 0, y = l & x, v = (p | y << h) & s;
        e[c + u] = v | 0, a = d;
      }
    c += 32, a = 0, f < 7 && (l = n[o] >>> 0);
  }
}
const _e = 32, dn = _e + 1, An = Gs(xi), yo = 3 * An / ae + An | 0;
function gi() {
  const n = new Uint8Array(yo);
  return {
    dataToBePacked: new Array(dn),
    dataPointers: new Int32Array(dn),
    byteContainer: n,
    byteContainerI32: new Int32Array(n.buffer, n.byteOffset, n.byteLength >>> 2),
    exceptionSizes: new Int32Array(dn)
  };
}
function xo(n = 16) {
  if (n < 0)
    throw new RangeError(`initialEncodedWordCapacity must be >= 0, got ${n}`);
  const t = Math.max(16, n | 0);
  return {
    encodedWords: new Uint32Array(t),
    decoderWorkspace: gi()
  };
}
function go(n, t) {
  if (t <= n.encodedWords.length)
    return n.encodedWords;
  const e = new Uint32Array(Math.max(16, t * 2));
  return n.encodedWords = e, e;
}
function mo(n, t, e, i) {
  i.byteContainer.length < e && (i.byteContainer = new Uint8Array(e * 2), i.byteContainerI32 = void 0);
  const r = i.byteContainer, s = e >>> 2;
  if ((r.byteOffset & 3) === 0) {
    let a = i.byteContainerI32;
    (!a || a.buffer !== r.buffer || a.byteOffset !== r.byteOffset || a.length < s) && (a = i.byteContainerI32 = new Int32Array(r.buffer, r.byteOffset, r.byteLength >>> 2)), a.set(n.subarray(t, t + s));
  } else
    for (let a = 0; a < s; a = a + 1 | 0) {
      const l = n[t + a | 0] | 0, c = a << 2;
      r[c] = l & 255, r[c + 1 | 0] = l >>> 8 & 255, r[c + 2 | 0] = l >>> 16 & 255, r[c + 3 | 0] = l >>> 24 & 255;
    }
  const o = e & 3;
  if (o > 0) {
    const a = t + s | 0, l = n[a] | 0, c = s << 2;
    for (let f = 0; f < o; f = f + 1 | 0)
      r[c + f | 0] = l >>> (f << 3) & 255;
  }
  return r;
}
function vo(n, t, e) {
  const i = n[t++] | 0, r = e.dataToBePacked;
  for (let s = 2; s <= _e; s = s + 1 | 0) {
    if ((i >>> s - 1 & 1) === 0)
      continue;
    if (t >= n.length)
      throw new Error(`FastPFOR decode: truncated exception stream header (bitWidth=${s}, streamWordIndex=${t}, needWords=1, availableWords=${n.length - t}, encodedWords=${n.length})`);
    const o = n[t++] >>> 0, a = Ps(o), l = o * s + 31 >>> 5;
    if (t + l > n.length)
      throw new Error(`FastPFOR decode: truncated exception stream (bitWidth=${s}, size=${o}, streamWordIndex=${t}, needWords=${l}, availableWords=${n.length - t}, encodedWords=${n.length})`);
    let c = r[s];
    (!c || c.length < a) && (c = r[s] = new Uint32Array(a));
    let f = 0;
    for (; f < o; f = f + 32 | 0)
      _o(n, t, c, f, s), t = t + s | 0;
    const u = f - o | 0;
    t = t - (u * s >>> 5) | 0, e.exceptionSizes[s] = o;
  }
  return t;
}
function wo(n, t, e, i, r) {
  switch (r) {
    case 1:
      io(n, t, e, i);
      break;
    case 2:
      so(n, t, e, i);
      break;
    case 3:
      oo(n, t, e, i);
      break;
    case 4:
      ao(n, t, e, i);
      break;
    case 5:
      lo(n, t, e, i);
      break;
    case 6:
      co(n, t, e, i);
      break;
    case 7:
      fo(n, t, e, i);
      break;
    case 8:
      uo(n, t, e, i);
      break;
    case 16:
      ho(n, t, e, i);
      break;
    default:
      po(n, t, e, i, r);
      break;
  }
  return t + (r << 3) | 0;
}
function bo(n, t, e, i) {
  if (e + 2 > t)
    throw new Error(`FastPFOR decode: byteContainer underflow at block=${i} (need 2 bytes for [bitWidth, exceptionCount], bytePos=${e}, byteSize=${t})`);
  const r = n[e++], s = n[e++];
  if (r > _e)
    throw new Error(`FastPFOR decode: invalid bitWidth=${r} at block=${i} (expected 0..${_e}). This likely indicates corrupted or truncated input.`);
  return { bitWidth: r, exceptionCount: s, bytePosIn: e };
}
function To(n, t, e, i, r, s) {
  if (e + 1 > t)
    throw new Error(`FastPFOR decode: exception header underflow at block=${s} (need 1 byte for maxBits, bytePos=${e}, byteSize=${t})`);
  const o = n[e++];
  if (o < i || o > _e)
    throw new Error(`FastPFOR decode: invalid maxBits=${o} at block=${s} (bitWidth=${i}, expected ${i}..${_e})`);
  const a = o - i | 0;
  if (a < 1 || a > _e)
    throw new Error(`FastPFOR decode: invalid exceptionBitWidth=${a} at block=${s} (bitWidth=${i}, maxBits=${o})`);
  if (e + r > t)
    throw new Error(`FastPFOR decode: exception positions underflow at block=${s} (need=${r}, have=${t - e})`);
  return { maxBits: o, exceptionBitWidth: a, bytePosIn: e };
}
function Io(n, t, e, i, r, s, o, a, l) {
  const { maxBits: c, exceptionBitWidth: f, bytePosIn: u } = To(r, s, o, e, i, l);
  if (o = u, f === 1) {
    const y = 1 << e;
    for (let v = 0; v < i; v = v + 1 | 0) {
      const T = r[o++];
      n[T + t | 0] |= y;
    }
    return o;
  }
  const h = a.dataToBePacked[f];
  if (!h)
    throw new Error(`FastPFOR decode: missing exception stream for exceptionBitWidth=${f} (bitWidth=${e}, maxBits=${c}) at block ${l}`);
  const p = a.dataPointers;
  let d = p[f] | 0;
  const x = a.exceptionSizes[f] | 0;
  if (d + i > x)
    throw new Error(`FastPFOR decode: exception stream overflow for exceptionBitWidth=${f} (ptr=${d}, need ${i}, size=${x}) at block ${l}`);
  for (let y = 0; y < i; y = y + 1 | 0) {
    const v = r[o++], T = h[d++] | 0;
    n[v + t | 0] |= T << e;
  }
  return p[f] = d, o;
}
function So(n, t, e, i, r, s, o, a, l, c) {
  let f = e | 0, u = 0;
  for (let h = 0; h < o; h = h + 1 | 0) {
    const p = bo(a, l, u, h);
    u = p.bytePosIn;
    const d = p.bitWidth, x = p.exceptionCount, y = s + h * ae | 0;
    switch (d) {
      case 0:
        r.fill(0, y, y + ae);
        break;
      case 32:
        for (let v = 0; v < ae; v = v + 1 | 0)
          r[y + v | 0] = n[f + v | 0] | 0;
        f = f + ae | 0;
        break;
      default:
        f = wo(n, f, r, y, d);
        break;
    }
    x > 0 && (u = Io(r, y, d, x, a, l, u, c, h));
  }
  if (f !== i)
    throw new Error(`FastPFOR decode: packed region mismatch (pageStart=${t}, packedStart=${e}, consumedPackedEnd=${f}, expectedPackedEnd=${i}, packedWords=${i - e}, encoded.length=${n.length})`);
}
function Eo(n, t, e, i, r, s) {
  const o = e | 0, a = n[o] | 0;
  if (a <= 0 || o + a > n.length - 1)
    throw new Error(`FastPFOR decode: invalid whereMeta=${a} at pageStart=${o} (expected > 0 and pageStart+whereMeta < encoded.length=${n.length})`);
  const l = o + 1 | 0, c = o + a | 0, f = n[c] >>> 0, u = f + 3 >>> 2, h = c + 1, p = h + u;
  if (p >= n.length)
    throw new Error(`FastPFOR decode: invalid byteSize=${f} (metaInts=${u}, pageStart=${o}, packedEnd=${c}, byteContainerStart=${h}) causes bitmapPos=${p} out of bounds (encoded.length=${n.length})`);
  const d = mo(n, h, f, s), x = f, y = vo(n, p, s);
  s.dataPointers.fill(0);
  const T = i | 0, m = r / ae | 0;
  return So(n, o, l, c, t, T, m, d, x, s), y;
}
function ko(n, t, e, i, r, s) {
  const o = Xn(r, ae), a = i + o;
  let l = i, c = e;
  for (; l !== a; ) {
    const f = Math.min(An, a - l);
    c = Eo(n, t, c, l, f, s), l = l + f | 0;
  }
  return c;
}
function Fo(n, t, e, i, r, s) {
  if (s === 0)
    return t;
  let o = 0, a = t;
  const l = t + e, c = r;
  let f = r;
  const u = r + s;
  let h = 0, p = 0;
  for (; a < l && f < u; ) {
    const x = n[a] >>> o & 255;
    if (o += 8, a += o >>> 5, o &= 31, h |= (x & 127) << p, (x & 128) !== 0)
      i[f++] = h | 0, h = 0, p = 0;
    else if (p += 7, p > 28)
      throw new Error(`FastPFOR VByte: unterminated value (expected MSB=1 terminator within 5 bytes; shift=${p}, partial=${h}, decoded=${f - c}/${s}, inPos=${a}, inEnd=${l})`);
  }
  if (f !== u)
    throw new Error(`FastPFOR VByte: truncated stream (decoded=${f - c}, expected=${s}, consumedWords=${a - t}/${e}, vbyteStart=${t}, vbyteEnd=${l})`);
  return a;
}
function Ao(n, t, e) {
  let i = 0, r = 0;
  const s = new Uint32Array(t), o = e ?? gi();
  if (n.length > 0) {
    const c = n[i] | 0;
    if (i = i + 1 | 0, (c & ae - 1) !== 0)
      throw new Error(`FastPFOR decode: invalid alignedLength=${c} (expected multiple of ${ae})`);
    if (r + c > s.length)
      throw new Error(`FastPFOR decode: output buffer too small (outPos=${r}, alignedLength=${c}, out.length=${s.length})`);
    i = ko(n, s, i, r, c, o), r = r + c | 0;
  }
  const a = n.length - i | 0, l = t - r | 0;
  return Fo(n, i, a, s, r, l), s;
}
function _o(n, t, e, i, r) {
  switch (r) {
    case 2:
      Zs(n, t, e, i);
      return;
    case 3:
      Ws(n, t, e, i);
      return;
    case 4:
      Xs(n, t, e, i);
      return;
    case 5:
      Hs(n, t, e, i);
      return;
    case 6:
      Ys(n, t, e, i);
      return;
    case 7:
      Qs(n, t, e, i);
      return;
    case 8:
      Js(n, t, e, i);
      return;
    case 9:
      Ks(n, t, e, i);
      return;
    case 10:
      eo(n, t, e, i);
      return;
    case 11:
      to(n, t, e, i);
      return;
    case 12:
      no(n, t, e, i);
      return;
    case 16:
      ro(n, t, e, i);
      return;
    case 32:
      for (let c = 0; c < 32; c = c + 1 | 0)
        e[i + c | 0] = n[t + c | 0] | 0;
      return;
  }
  const s = Fn[r] >>> 0;
  let o = t, a = 0, l = n[o] >>> 0;
  for (let c = 0; c < 32; c++)
    if (a + r <= 32) {
      const f = l >>> a & s;
      e[i + c] = f | 0, a += r, a === 32 && (a = 0, o++, c !== 31 && (l = n[o] >>> 0));
    } else {
      const f = 32 - a, u = l >>> a;
      o++, l = n[o] >>> 0;
      const h = Fn[r - f] >>> 0, p = l & h, d = (u | p << f) & s;
      e[i + c] = d | 0, a = r - f;
    }
}
function Co(n, t, e, i) {
  if (t < 0 || e < 0 || t + e > n.length)
    throw new RangeError(`decodeBigEndianInt32sInto: out of bounds (offset=${t}, byteLength=${e}, bytes.length=${n.length})`);
  const r = Math.floor(e / 4), s = e % 4 !== 0, o = s ? r + 1 : r;
  if (i.length < o)
    throw new RangeError(`decodeBigEndianInt32sInto: out.length=${i.length} < ${o}`);
  if (r > 0) {
    const a = n.byteOffset + t;
    if ((a & 3) === 0) {
      const l = new Uint32Array(n.buffer, a, r);
      for (let c = 0; c < r; c++)
        i[c] = js(l[c]) | 0;
    } else
      for (let l = 0; l < r; l++) {
        const c = t + l * 4;
        i[l] = n[c] << 24 | n[c + 1] << 16 | n[c + 2] << 8 | n[c + 3] | 0;
      }
  }
  if (s) {
    const a = t + r * 4, l = e - r * 4;
    let c = 0;
    for (let f = 0; f < l; f++)
      c |= n[a + f] << 24 - f * 8;
    i[r] = c | 0;
  }
  return o;
}
function P(n, t, e) {
  const i = new Uint32Array(e);
  let r = 0, s = t.get();
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
  return t.set(s), i;
}
function Qe(n, t, e) {
  const i = new BigUint64Array(e);
  for (let r = 0; r < i.length; r++)
    i[r] = Oo(n, t);
  return i;
}
function Oo(n, t) {
  let e = 0n, i = 0, r = t.get();
  for (; r < n.length; ) {
    const s = n[r++];
    if (e |= BigInt(s & 127) << BigInt(i), (s & 128) === 0)
      break;
    if (i += 7, i >= 64)
      throw new Error("Varint too long");
  }
  return t.set(r), e;
}
function Lo(n, t, e) {
  const i = new Float64Array(e);
  for (let r = 0; r < e; r++)
    i[r] = No(n, t);
  return i;
}
function No(n, t) {
  let e, i;
  return i = n[t.get()], t.increment(), e = i & 127, i < 128 || (i = n[t.get()], t.increment(), e |= (i & 127) << 7, i < 128) || (i = n[t.get()], t.increment(), e |= (i & 127) << 14, i < 128) || (i = n[t.get()], t.increment(), e |= (i & 127) << 21, i < 128) ? e : (i = n[t.get()], e |= (i & 15) << 28, Mo(e, n, t));
}
function Mo(n, t, e) {
  let i, r;
  if (r = t[e.get()], e.increment(), i = (r & 112) >> 4, r < 128 || (r = t[e.get()], e.increment(), i |= (r & 127) << 3, r < 128) || (r = t[e.get()], e.increment(), i |= (r & 127) << 10, r < 128) || (r = t[e.get()], e.increment(), i |= (r & 127) << 17, r < 128) || (r = t[e.get()], e.increment(), i |= (r & 127) << 24, r < 128) || (r = t[e.get()], e.increment(), i |= (r & 1) << 31, r < 128))
    return i * 4294967296 + (n >>> 0);
  throw new Error("Expected varint not more than 10 bytes");
}
function $o(n, t, e, i) {
  const r = xo(e >>> 2);
  return Do(n, t, e, i, r);
}
function Do(n, t, e, i, r) {
  const s = i.get();
  if ((e & 3) !== 0)
    throw new Error(`FastPFOR: invalid encodedByteLength=${e} at offset=${s} (encodedBytes.length=${n.length}; expected a multiple of 4 bytes for an int32 big-endian word stream)`);
  const o = e >>> 2, a = go(r, o);
  Co(n, s, e, a);
  const l = Ao(a.subarray(0, o), t, r.decoderWorkspace);
  return i.add(e), l;
}
function N(n) {
  return n >>> 1 ^ -(n & 1);
}
function j(n) {
  return n >> 1n ^ -(n & 1n);
}
function ke(n) {
  return n % 2 === 1 ? (n + 1) / -2 : n / 2;
}
function Ro(n) {
  const t = new Int32Array(n.length);
  for (let e = 0; e < n.length; e++)
    t[e] = N(n[e]);
  return t;
}
function Bo(n) {
  const t = new BigInt64Array(n.length);
  for (let e = 0; e < n.length; e++)
    t[e] = j(n[e]);
  return t;
}
function _n(n, t, e) {
  if (e === void 0) {
    e = 0;
    for (let s = 0; s < t; s++)
      e += n[s];
  }
  const i = new Uint32Array(e);
  let r = 0;
  for (let s = 0; s < t; s++) {
    const o = n[s], a = n[s + t];
    i.fill(a, r, r + o), r += o;
  }
  return i;
}
function Cn(n, t, e) {
  if (e === void 0) {
    e = 0;
    for (let s = 0; s < t; s++)
      e += Number(n[s]);
  }
  const i = new BigUint64Array(e);
  let r = 0;
  for (let s = 0; s < t; s++) {
    const o = Number(n[s]), a = n[s + t];
    i.fill(a, r, r + o), r += o;
  }
  return i;
}
function mi(n, t, e) {
  const i = new Float64Array(e);
  let r = 0;
  for (let s = 0; s < t; s++) {
    const o = n[s], a = n[s + t];
    i.fill(a, r, r + o), r += o;
  }
  return i;
}
function Or(n) {
  const t = new Int32Array(n.length);
  t[0] = N(n[0]);
  const e = n.length / 4 * 4;
  let i = 1;
  if (e >= 4)
    for (; i < e - 4; i += 4) {
      const r = n[i], s = n[i + 1], o = n[i + 2], a = n[i + 3];
      t[i] = N(r) + t[i - 1], t[i + 1] = N(s) + t[i], t[i + 2] = N(o) + t[i + 1], t[i + 3] = N(a) + t[i + 2];
    }
  for (; i !== n.length; ++i)
    t[i] = N(n[i]) + t[i - 1];
  return t;
}
function Lr(n) {
  const t = new BigInt64Array(n.length);
  t[0] = j(n[0]);
  const e = n.length / 4 * 4;
  let i = 1;
  if (e >= 4)
    for (; i < e - 4; i += 4) {
      const r = n[i], s = n[i + 1], o = n[i + 2], a = n[i + 3];
      t[i] = j(r) + t[i - 1], t[i + 1] = j(s) + t[i], t[i + 2] = j(o) + t[i + 1], t[i + 3] = j(a) + t[i + 2];
    }
  for (; i !== t.length; ++i)
    t[i] = j(n[i]) + t[i - 1];
  return t;
}
function zo(n) {
  n[0] = ke(n[0]);
  const t = n.length / 4 * 4;
  let e = 1;
  if (t >= 4)
    for (; e < t - 4; e += 4) {
      const i = n[e], r = n[e + 1], s = n[e + 2], o = n[e + 3];
      n[e] = ke(i) + n[e - 1], n[e + 1] = ke(r) + n[e], n[e + 2] = ke(s) + n[e + 1], n[e + 3] = ke(o) + n[e + 2];
    }
  for (; e !== n.length; ++e)
    n[e] = ke(n[e]) + n[e - 1];
}
function Uo(n, t, e) {
  if (e === void 0) {
    e = 0;
    for (let s = 0; s < t; s++)
      e += n[s];
  }
  const i = new Int32Array(e);
  let r = 0;
  for (let s = 0; s < t; s++) {
    const o = n[s];
    let a = n[s + t];
    a = N(a), i.fill(a, r, r + o), r += o;
  }
  return i;
}
function Vo(n, t, e) {
  if (e === void 0) {
    e = 0;
    for (let s = 0; s < t; s++)
      e += Number(n[s]);
  }
  const i = new BigInt64Array(e);
  let r = 0;
  for (let s = 0; s < t; s++) {
    const o = Number(n[s]);
    let a = n[s + t];
    a = j(a), i.fill(a, r, r + o), r += o;
  }
  return i;
}
function qo(n, t, e) {
  const i = new Float64Array(e);
  let r = 0;
  for (let s = 0; s < t; s++) {
    const o = n[s];
    let a = n[s + t];
    a = ke(a), i.fill(a, r, r + o), r += o;
  }
  return i;
}
function Hn(n) {
  const t = n.length / 4 * 4;
  let e = 1;
  if (t >= 4)
    for (let i = n[0]; e < t - 4; e += 4)
      i = n[e] += i, i = n[e + 1] += i, i = n[e + 2] += i, i = n[e + 3] += i;
  for (; e !== n.length; )
    n[e] += n[e - 1], ++e;
}
function Po(n) {
  let t = 0;
  for (let e = 0; e < n.length; e++)
    n[e] += t, t = n[e];
}
function Go(n) {
  if (n.length < 2)
    return new Int32Array(n);
  const t = new Int32Array(n.length);
  t[0] = N(n[0]), t[1] = N(n[1]);
  const e = n.length / 4 * 4;
  let i = 2;
  if (e >= 4)
    for (; i < e - 4; i += 4) {
      const r = n[i], s = n[i + 1], o = n[i + 2], a = n[i + 3];
      t[i] = N(r) + t[i - 2], t[i + 1] = N(s) + t[i - 1], t[i + 2] = N(o) + t[i], t[i + 3] = N(a) + t[i + 1];
    }
  for (; i !== n.length; i += 2)
    t[i] = N(n[i]) + t[i - 2], t[i + 1] = N(n[i + 1]) + t[i - 1];
  return t;
}
function jo(n) {
  const t = new Int32Array(n.length + 1);
  t[0] = 0, t[1] = N(n[0]);
  let e = t[1];
  for (let i = 2; i !== t.length; ++i) {
    const r = n[i - 1], s = N(r);
    e += s, t[i] = t[i - 1] + e;
  }
  return new Uint32Array(t);
}
function Zo(n, t, e) {
  const i = new Int32Array(e + 1);
  i[0] = 0;
  let r = 1, s = i[0];
  for (let o = 0; o < t; o++) {
    const a = n[o];
    let l = n[o + t];
    l = N(l);
    for (let c = r; c < r + a; c++)
      i[c] = l + s, s = i[c];
    r += a;
  }
  return i;
}
function Wo(n, t, e) {
  const i = new Uint32Array(e + 1);
  i[0] = 0;
  let r = 1, s = i[0];
  for (let o = 0; o < t; o++) {
    const a = n[o], l = n[o + t];
    for (let c = r; c < r + a; c++)
      i[c] = l + s, s = i[c];
    r += a;
  }
  return i;
}
function Xo(n, t, e) {
  const i = new Int32Array(e);
  let r = 0, s = 0;
  for (let o = 0; o < t; o++) {
    const a = n[o], l = n[o + t], c = N(l);
    for (let f = 0; f < a; f++)
      s += c, i[r++] = s;
  }
  return i;
}
function Ho(n, t, e) {
  const i = new BigInt64Array(e);
  let r = 0, s = 0n;
  for (let o = 0; o < t; o++) {
    const a = Number(n[o]), l = n[o + t], c = j(l);
    for (let f = 0; f < a; f++)
      s += c, i[r++] = s;
  }
  return i;
}
function Nr(n) {
  const t = new Uint32Array(n.length);
  t[0] = N(n[0]) >>> 0;
  for (let e = 1; e < n.length; e++)
    t[e] = t[e - 1] + N(n[e]) >>> 0;
  return t;
}
function Mr(n) {
  const t = new BigUint64Array(n.length);
  t[0] = BigInt.asUintN(64, j(n[0]));
  for (let e = 1; e < n.length; e++)
    t[e] = BigInt.asUintN(64, t[e - 1] + j(n[e]));
  return t;
}
function Yo(n) {
  if (n.length < 2)
    return new Uint32Array(n);
  const t = new Uint32Array(n.length);
  t[0] = N(n[0]) >>> 0, t[1] = N(n[1]) >>> 0;
  for (let e = 2; e < n.length; e += 2)
    t[e] = t[e - 2] + N(n[e]) >>> 0, t[e + 1] = t[e - 1] + N(n[e + 1]) >>> 0;
  return t;
}
function Qo(n) {
  return n[1];
}
function Jo(n) {
  return N(n[1]);
}
function Ko(n) {
  if (n.length === 2) {
    const i = N(n[1]);
    return [i, i];
  }
  const t = N(n[2]), e = N(n[3]);
  return [t, e];
}
function ea(n) {
  return n[1];
}
function ta(n) {
  return j(n[1]);
}
function na(n) {
  if (n.length === 2) {
    const i = j(n[1]);
    return [i, i];
  }
  const t = j(n[2]), e = j(n[3]);
  return [t, e];
}
var V;
(function(n) {
  n.PRESENT = "PRESENT", n.DATA = "DATA", n.OFFSET = "OFFSET", n.LENGTH = "LENGTH";
})(V || (V = {}));
var le;
(function(n) {
  n.NONE = "NONE", n.SINGLE = "SINGLE", n.SHARED = "SHARED", n.VERTEX = "VERTEX", n.MORTON = "MORTON", n.FSST = "FSST";
})(le || (le = {}));
var Fe;
(function(n) {
  n.VERTEX = "VERTEX", n.INDEX = "INDEX", n.STRING = "STRING", n.KEY = "KEY";
})(Fe || (Fe = {}));
var J;
(function(n) {
  n.VAR_BINARY = "VAR_BINARY", n.GEOMETRIES = "GEOMETRIES", n.PARTS = "PARTS", n.RINGS = "RINGS", n.TRIANGLES = "TRIANGLES", n.SYMBOL = "SYMBOL", n.DICTIONARY = "DICTIONARY";
})(J || (J = {}));
function Z(n, t) {
  const e = sa(n, t);
  return e.logicalLevelTechnique1 === A.MORTON ? ra(e, n, t) : (A.RLE === e.logicalLevelTechnique1 || A.RLE === e.logicalLevelTechnique2) && be.NONE !== e.physicalLevelTechnique ? ia(e, n, t) : e;
}
function ra(n, t, e) {
  const i = P(t, e, 2);
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
function ia(n, t, e) {
  const i = P(t, e, 2);
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
function sa(n, t) {
  const e = n[t.get()], i = Object.values(V)[e >> 4];
  let r = null;
  switch (i) {
    case V.DATA:
      r = {
        dictionaryType: Object.values(le)[e & 15]
      };
      break;
    case V.OFFSET:
      r = {
        offsetType: Object.values(Fe)[e & 15]
      };
      break;
    case V.LENGTH:
      r = {
        lengthType: Object.values(J)[e & 15]
      };
      break;
  }
  t.increment();
  const s = n[t.get()], o = Object.values(A)[s >> 5], a = Object.values(A)[s >> 2 & 7], l = Object.values(be)[s & 3];
  t.increment();
  const c = P(n, t, 2), f = c[0], u = c[1];
  return {
    physicalStreamType: i,
    logicalStreamType: r,
    logicalLevelTechnique1: o,
    logicalLevelTechnique2: a,
    physicalLevelTechnique: l,
    numValues: f,
    byteLength: u,
    decompressedCount: f
  };
}
var M;
(function(n) {
  n[n.FLAT = 0] = "FLAT", n[n.CONST = 1] = "CONST", n[n.SEQUENCE = 2] = "SEQUENCE", n[n.DICTIONARY = 3] = "DICTIONARY", n[n.FSST_DICTIONARY = 4] = "FSST_DICTIONARY";
})(M || (M = {}));
class ye {
  /**
   * @param values The byte buffer containing the bit values in least-significant bit (LSB)
   *     numbering
   */
  constructor(t, e) {
    this.values = t, this._size = e;
  }
  get(t) {
    const e = Math.floor(t / 8), i = t % 8;
    return (this.values[e] >> i & 1) === 1;
  }
  set(t, e) {
    const i = Math.floor(t / 8), r = t % 8;
    this.values[i] = this.values[i] | (e ? 1 : 0) << r;
  }
  getInt(t) {
    const e = Math.floor(t / 8), i = t % 8;
    return this.values[e] >> i & 1;
  }
  size() {
    return this._size;
  }
  getBuffer() {
    return this.values;
  }
}
function Je(n, t, e) {
  if (!t)
    return n;
  const i = t.size(), r = n.constructor, s = new r(i);
  let o = 0;
  for (let a = 0; a < i; a++)
    s[a] = t.get(a) ? n[o++] : e;
  return s;
}
function oa(n, t, e) {
  if (!e)
    return n;
  const i = e.size(), r = new ye(n, t), s = new ye(new Uint8Array(Math.ceil(i / 8)), i);
  let o = 0;
  for (let a = 0; a < i; a++) {
    const l = e.get(a) ? r.get(o++) : !1;
    s.set(a, l);
  }
  return s.getBuffer();
}
function On(n, t, e, i, r) {
  const s = Ke(n, t, e);
  return ua(s, e, i, r);
}
function Q(n, t, e, i, r) {
  const s = Ke(n, t, e);
  return ha(s, e, i, r);
}
function ve(n, t, e) {
  const i = Ke(n, t, e);
  return xa(i, e);
}
function Ke(n, t, e) {
  const i = e.physicalLevelTechnique;
  switch (i) {
    case be.FAST_PFOR:
      return $o(n, e.numValues, e.byteLength, t);
    case be.VARINT:
      return P(n, t, e.numValues);
    case be.NONE: {
      const r = t.get(), s = e.byteLength;
      t.add(s);
      const o = n.subarray(r, t.get());
      return new Uint32Array(o);
    }
    default:
      throw new Error(`Specified physicalLevelTechnique ${i} is not supported (yet).`);
  }
}
function aa(n, t, e) {
  const i = Ke(n, t, e);
  return i.length === 1 ? N(i[0]) : Jo(i);
}
function Yn(n, t, e) {
  const i = Ke(n, t, e);
  return i.length === 1 ? i[0] : Qo(i);
}
function vi(n, t, e) {
  const i = Ke(n, t, e);
  return Ko(i);
}
function wi(n, t, e) {
  const i = Qe(n, t, e.numValues);
  return na(i);
}
function la(n, t, e, i) {
  const r = Qe(n, t, e.numValues);
  return pa(r, e, i);
}
function bi(n, t, e, i) {
  const r = Qe(n, t, e.numValues);
  return da(r, e, i);
}
function ca(n, t, e) {
  const i = Lo(n, t, e.numValues);
  return ya(i, e, !1);
}
function fa(n, t, e) {
  const i = Qe(n, t, e.numValues);
  return i.length === 1 ? j(i[0]) : ta(i);
}
function Ti(n, t, e) {
  const i = Qe(n, t, e.numValues);
  return i.length === 1 ? i[0] : ea(i);
}
function ua(n, t, e, i) {
  let r;
  switch (t.logicalLevelTechnique1) {
    case A.DELTA:
      if (t.logicalLevelTechnique2 === A.RLE) {
        const s = t;
        if (!i)
          return Xo(n, s.runs, s.numRleValues);
        n = _n(n, s.runs, s.numRleValues), r = Or(n);
      } else
        r = Or(n);
      break;
    case A.RLE:
      r = Uo(n, t.runs, t.numRleValues);
      break;
    case A.MORTON:
      Hn(n), r = new Int32Array(n);
      break;
    case A.COMPONENTWISE_DELTA:
      r = Go(n);
      break;
    case A.NONE:
      r = Ro(n);
      break;
    default:
      throw new Error(`The specified Logical level technique is not supported: ${t.logicalLevelTechnique1}`);
  }
  return i ? Je(r, i, 0) : r;
}
function ha(n, t, e, i) {
  let r;
  switch (t.logicalLevelTechnique1) {
    case A.DELTA:
      if (t.logicalLevelTechnique2 === A.RLE) {
        const s = t, o = _n(n, s.runs, s.numRleValues);
        r = Nr(o);
      } else
        r = Nr(n);
      break;
    case A.RLE:
      r = _n(n, t.runs, t.numRleValues);
      break;
    case A.MORTON:
      Hn(n), r = n;
      break;
    case A.COMPONENTWISE_DELTA:
      r = Yo(n);
      break;
    case A.NONE:
      r = n;
      break;
    default:
      throw new Error(`The specified Logical level technique is not supported: ${t.logicalLevelTechnique1}`);
  }
  return i ? Je(r, i, 0) : r;
}
function pa(n, t, e) {
  let i;
  switch (t.logicalLevelTechnique1) {
    case A.DELTA:
      if (t.logicalLevelTechnique2 === A.RLE) {
        const r = t;
        if (!e)
          return Ho(n, r.runs, r.numRleValues);
        n = Cn(n, r.runs, r.numRleValues), i = Lr(n);
      } else
        i = Lr(n);
      break;
    case A.RLE:
      i = Vo(n, t.runs, t.numRleValues);
      break;
    case A.NONE:
      i = Bo(n);
      break;
    default:
      throw new Error(`The specified Logical level technique is not supported: ${t.logicalLevelTechnique1}`);
  }
  return e ? Je(i, e, 0n) : i;
}
function da(n, t, e) {
  let i;
  switch (t.logicalLevelTechnique1) {
    case A.DELTA:
      if (t.logicalLevelTechnique2 === A.RLE) {
        const r = t, s = Cn(n, r.runs, r.numRleValues);
        i = Mr(s);
      } else
        i = Mr(n);
      break;
    case A.RLE:
      i = Cn(n, t.runs, t.numRleValues);
      break;
    case A.NONE:
      i = n;
      break;
    default:
      throw new Error(`The specified Logical level technique is not supported: ${t.logicalLevelTechnique1}`);
  }
  return e ? Je(i, e, 0n) : i;
}
function ya(n, t, e) {
  switch (t.logicalLevelTechnique1) {
    case A.DELTA:
      if (t.logicalLevelTechnique2 === A.RLE) {
        const i = t;
        n = mi(n, i.runs, i.numRleValues);
      }
      return zo(n), n;
    case A.RLE:
      return ma(n, t, e);
    case A.NONE:
      return n;
    default:
      throw new Error(`The specified Logical level technique is not supported: ${t.logicalLevelTechnique1}`);
  }
}
function xa(n, t) {
  if (t.logicalLevelTechnique1 === A.DELTA && t.logicalLevelTechnique2 === A.NONE)
    return jo(n);
  if (t.logicalLevelTechnique1 === A.RLE && t.logicalLevelTechnique2 === A.NONE) {
    const e = t;
    return Wo(n, e.runs, e.numRleValues);
  }
  if (t.logicalLevelTechnique1 === A.NONE && t.logicalLevelTechnique2 === A.NONE) {
    Po(n);
    const e = new Uint32Array(t.numValues + 1);
    return e[0] = 0, e.set(n, 1), e;
  }
  if (t.logicalLevelTechnique1 === A.DELTA && t.logicalLevelTechnique2 === A.RLE) {
    const e = t, i = Zo(n, e.runs, e.numRleValues);
    return Hn(i), new Uint32Array(i);
  }
  throw new Error("Only delta encoding is supported for transforming length to offset streams yet.");
}
function Ht(n, t, e, i, r = "int32") {
  const s = n.logicalLevelTechnique1;
  if (s === A.RLE)
    return n.runs === 1 ? M.CONST : M.FLAT;
  if (s !== A.DELTA || n.logicalLevelTechnique2 !== A.RLE)
    return n.numValues === 1 ? M.CONST : M.FLAT;
  const o = t instanceof ye ? t.size() : t, a = n;
  if (a.numRleValues !== o)
    return M.FLAT;
  if (a.runs === 1)
    return M.SEQUENCE;
  if (a.runs !== 2)
    return n.numValues === 1 ? M.CONST : M.FLAT;
  const l = i.get();
  if (n.physicalLevelTechnique === be.VARINT)
    return ga(e, i, r) ? M.SEQUENCE : n.numValues === 1 ? M.CONST : M.FLAT;
  const c = i.get(), f = new Int32Array(e.buffer, e.byteOffset + c, 4);
  i.set(l);
  const u = 2;
  return f[2] === u && f[3] === u ? M.SEQUENCE : n.numValues === 1 ? M.CONST : M.FLAT;
}
function ga(n, t, e) {
  const i = new yi(t.get());
  if (e === "int64") {
    const s = Qe(n, i, 4);
    return s[2] === 2n && s[3] === 2n;
  }
  const r = P(n, i, 4);
  return r[2] === 2 && r[3] === 2;
}
function ma(n, t, e) {
  return e ? qo(n, t.runs, t.numRleValues) : mi(n, t.runs, t.numRleValues);
}
class Ii extends Xt {
  getValueFromBuffer(t) {
    return this.dataBuffer[t];
  }
}
class Si extends di {
  constructor(t, e, i, r) {
    super(t, BigInt64Array.of(e), i, r);
  }
  getValueFromBuffer(t) {
    return this.dataBuffer[0] + BigInt(t) * this.delta;
  }
}
function Qn(n, t, e) {
  const i = $r(n, t) - e, r = $r(n >> 1, t) - e;
  return { x: i, y: r };
}
function $r(n, t) {
  let e = 0;
  for (let i = 0; i < t; i++)
    e |= (n & 1 << 2 * i) >> i;
  return e;
}
var z;
(function(n) {
  n[n.POINT = 0] = "POINT", n[n.LINESTRING = 1] = "LINESTRING", n[n.POLYGON = 2] = "POLYGON", n[n.MULTIPOINT = 3] = "MULTIPOINT", n[n.MULTILINESTRING = 4] = "MULTILINESTRING", n[n.MULTIPOLYGON = 5] = "MULTIPOLYGON";
})(z || (z = {}));
var Dr;
(function(n) {
  n[n.POINT = 0] = "POINT", n[n.LINESTRING = 1] = "LINESTRING", n[n.POLYGON = 2] = "POLYGON";
})(Dr || (Dr = {}));
var Ie;
(function(n) {
  n[n.MORTON = 0] = "MORTON", n[n.VEC_2 = 1] = "VEC_2", n[n.VEC_3 = 2] = "VEC_3";
})(Ie || (Ie = {}));
function va(n) {
  const t = new Array(n.numGeometries);
  let e = 1, i = 1, r = 1, s = 0, o = 0, a = 0;
  const l = n.mortonSettings, c = n.topologyVector, f = c.geometryOffsets, u = c.partOffsets, h = c.ringOffsets, p = n.vertexOffsets, d = !p || p.length === 0, x = n.containsPolygonGeometry(), y = n.vertexBuffer;
  for (let v = 0; v < n.numGeometries; v++)
    switch (n.geometryType(v)) {
      case z.POINT:
        {
          let m, g;
          if (d)
            m = y[o++], g = y[o++];
          else if (n.vertexBufferType === Ie.MORTON) {
            const b = p[a++], I = y[b], S = Qn(I, l.numBits, l.coordinateShift);
            m = S.x, g = S.y;
          } else {
            const b = p[a++] * 2;
            m = y[b], g = y[b + 1];
          }
          t[s++] = [[new B(m, g)]], f && r++, u && e++, h && i++;
        }
        break;
      case z.MULTIPOINT:
        {
          const m = f[r] - f[r - 1];
          r++;
          const g = new Array(m);
          if (d)
            for (let b = 0; b < m; b++) {
              const I = y[o++], S = y[o++];
              g[b] = new B(I, S);
            }
          else
            for (let b = 0; b < m; b++) {
              const I = p[a++] * 2, S = y[I], _ = y[I + 1];
              g[b] = new B(S, _);
            }
          t[s++] = g.map((b) => [b]), e += m, i += m;
        }
        break;
      case z.LINESTRING:
        {
          let m;
          x ? (m = h[i] - h[i - 1], i++) : m = u[e] - u[e - 1], e++;
          let g;
          d ? (g = ze(y, o, m, !1), o += m * 2) : (g = Be(n.vertexBufferType, y, p, a, m, !1, l), a += m), t[s++] = [g], f && r++;
        }
        break;
      case z.POLYGON:
        {
          const m = u[e] - u[e - 1];
          e++;
          const g = new Array(m - 1);
          let b, I = h[i] - h[i - 1];
          if (i++, d) {
            b = ze(y, o, I, !0), o += I * 2;
            for (let S = 0; S < g.length; S++)
              I = h[i] - h[i - 1], i++, g[S] = ze(y, o, I, !0), o += I * 2;
          } else {
            b = Be(n.vertexBufferType, y, p, a, I, !0, l), a += I;
            for (let S = 0; S < g.length; S++)
              I = h[i] - h[i - 1], i++, g[S] = Be(n.vertexBufferType, y, p, a, I, !0, l), a += I;
          }
          t[s++] = [b].concat(g), f && r++;
        }
        break;
      case z.MULTILINESTRING:
        {
          const m = f[r] - f[r - 1];
          r++;
          const g = new Array(m);
          for (let b = 0; b < m; b++) {
            let I;
            if (x ? (I = h[i] - h[i - 1], i++) : I = u[e] - u[e - 1], e++, d)
              g[b] = ze(y, o, I, !1), o += I * 2;
            else {
              const S = Be(n.vertexBufferType, y, p, a, I, !1, l);
              g[b] = S, a += I;
            }
          }
          t[s++] = g;
        }
        break;
      case z.MULTIPOLYGON:
        {
          const m = f[r] - f[r - 1];
          r++;
          const g = new Array(m);
          for (let b = 0; b < m; b++) {
            const I = u[e] - u[e - 1];
            e++;
            let S;
            const _ = new Array(I - 1), C = h[i] - h[i - 1];
            i++, d ? (S = ze(y, o, C, !0), o += C * 2) : (S = Be(n.vertexBufferType, y, p, a, C, !0, l), a += C);
            for (let q = 0; q < _.length; q++) {
              const K = h[i] - h[i - 1];
              i++, d ? (_[q] = ze(y, o, K, !0), o += K * 2) : (_[q] = Be(n.vertexBufferType, y, p, a, K, !0, l), a += K);
            }
            g[b] = [S].concat(_);
          }
          t[s++] = g.flat();
        }
        break;
      default:
        throw new Error("The specified geometry type is currently not supported.");
    }
  return t;
}
function Be(n, t, e, i, r, s, o) {
  return n === Ie.MORTON ? ba(t, e, i, r, s, o) : wa(t, e, i, r, s);
}
function ze(n, t, e, i) {
  const r = new Array(i ? e + 1 : e);
  for (let s = 0; s < e * 2; s += 2) {
    const o = n[t + s], a = n[t + s + 1];
    r[s / 2] = new B(o, a);
  }
  return i && (r[r.length - 1] = r[0]), r;
}
function wa(n, t, e, i, r) {
  const s = new Array(r ? i + 1 : i);
  for (let o = 0; o < i * 2; o += 2) {
    const a = t[e + o / 2] * 2, l = n[a], c = n[a + 1];
    s[o / 2] = new B(l, c);
  }
  return r && (s[s.length - 1] = s[0]), s;
}
function ba(n, t, e, i, r, s) {
  const o = new Array(r ? i + 1 : i);
  for (let a = 0; a < i; a++) {
    const l = t[e + a], c = n[l], f = Qn(c, s.numBits, s.coordinateShift);
    o[a] = new B(f.x, f.y);
  }
  return r && (o[o.length - 1] = o[0]), o;
}
class Ei {
  constructor(t, e, i, r, s) {
    this._vertexBufferType = t, this._topologyVector = e, this._vertexOffsets = i, this._vertexBuffer = r, this._mortonSettings = s;
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
  getSimpleEncodedVertex(t) {
    const e = this.vertexOffsets ? this.vertexOffsets[t] * 2 : t * 2, i = this.vertexBuffer[e], r = this.vertexBuffer[e + 1];
    return [i, r];
  }
  //TODO: add scaling information to the constructor
  getVertex(t) {
    if (this.vertexOffsets && this.mortonSettings) {
      const s = this.vertexOffsets[t], o = this.vertexBuffer[s], a = Qn(o, this.mortonSettings.numBits, this.mortonSettings.coordinateShift);
      return [a.x, a.y];
    }
    const e = this.vertexOffsets ? this.vertexOffsets[t] * 2 : t * 2, i = this.vertexBuffer[e], r = this.vertexBuffer[e + 1];
    return [i, r];
  }
  getGeometries() {
    return va(this);
  }
  get mortonSettings() {
    return this._mortonSettings;
  }
}
function Ta(n, t, e, i, r) {
  return new ki(n, t, Ie.VEC_2, e, i, r);
}
function Ia(n, t, e, i, r, s) {
  return new ki(n, t, Ie.MORTON, e, i, r, s);
}
class ki extends Ei {
  constructor(t, e, i, r, s, o, a) {
    super(i, r, s, o, a), this._numGeometries = t, this._geometryType = e;
  }
  geometryType(t) {
    return this._geometryType;
  }
  get numGeometries() {
    return this._numGeometries;
  }
  containsPolygonGeometry() {
    return this._geometryType === z.POLYGON || this._geometryType === z.MULTIPOLYGON;
  }
  containsSingleGeometryType() {
    return !0;
  }
}
function Sa(n, t, e, i) {
  return new Fi(Ie.VEC_2, n, t, e, i);
}
function Ea(n, t, e, i, r) {
  return new Fi(Ie.MORTON, n, t, e, i, r);
}
class Fi extends Ei {
  constructor(t, e, i, r, s, o) {
    super(t, i, r, s, o), this._geometryTypes = e;
  }
  geometryType(t) {
    return this._geometryTypes[t];
  }
  get numGeometries() {
    return this._geometryTypes.length;
  }
  containsPolygonGeometry() {
    for (let t = 0; t < this.numGeometries; t++)
      if (this.geometryType(t) === z.POLYGON || this.geometryType(t) === z.MULTIPOLYGON)
        return !0;
    return !1;
  }
  containsSingleGeometryType() {
    return !1;
  }
}
class Ai {
  constructor(t, e, i, r) {
    this._triangleOffsets = t, this._indexBuffer = e, this._vertexBuffer = i, this._topologyVector = r;
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
    const t = new Array(this.numGeometries), e = this._topologyVector, i = e.partOffsets, r = e.ringOffsets, s = e.geometryOffsets;
    let o = 0, a = 1, l = 1, c = 1;
    for (let f = 0; f < this.numGeometries; f++)
      switch (this.geometryType(f)) {
        case z.POLYGON:
          {
            const h = i[a] - i[a - 1];
            a++;
            const p = [];
            for (let d = 0; d < h; d++) {
              const x = r[l] - r[l - 1];
              l++;
              const y = [];
              for (let v = 0; v < x; v++) {
                const T = this._vertexBuffer[o++], m = this._vertexBuffer[o++];
                y.push(new B(T, m));
              }
              y.length > 0 && y.push(y[0]), p.push(y);
            }
            t[f] = p, s && c++;
          }
          break;
        case z.MULTIPOLYGON:
          {
            const h = s[c] - s[c - 1];
            c++;
            const p = [];
            for (let d = 0; d < h; d++) {
              const x = i[a] - i[a - 1];
              a++;
              for (let y = 0; y < x; y++) {
                const v = r[l] - r[l - 1];
                l++;
                const T = [];
                for (let m = 0; m < v; m++) {
                  const g = this._vertexBuffer[o++], b = this._vertexBuffer[o++];
                  T.push(new B(g, b));
                }
                T.length > 0 && T.push(T[0]), p.push(T);
              }
            }
            t[f] = p;
          }
          break;
      }
    return t;
  }
  [Symbol.iterator]() {
    return null;
  }
}
function Rr(n, t, e, i, r, s) {
  return new ka(n, t, e, i, r, s);
}
class ka extends Ai {
  constructor(t, e, i, r, s, o) {
    super(i, r, s, o), this._numGeometries = t, this._geometryType = e;
  }
  geometryType(t) {
    return this._geometryType;
  }
  get numGeometries() {
    return this._numGeometries;
  }
  containsSingleGeometryType() {
    return !0;
  }
}
function Br(n, t, e, i, r) {
  return new Fa(n, t, e, i, r);
}
class Fa extends Ai {
  constructor(t, e, i, r, s) {
    super(e, i, r, s), this._geometryTypes = t;
  }
  geometryType(t) {
    return this._geometryTypes[t];
  }
  get numGeometries() {
    return this._geometryTypes.length;
  }
  containsSingleGeometryType() {
    return !1;
  }
}
function Aa(n, t, e, i, r) {
  const s = Z(n, e), o = Ht(s, i, n, e);
  let a, l, c, f;
  if (o === M.CONST) {
    const m = Yn(n, e, s);
    let g, b, I, S;
    for (let _ = 0; _ < t - 1; _++) {
      const C = Z(n, e);
      switch (C.physicalStreamType) {
        case V.LENGTH:
          switch (C.logicalStreamType.lengthType) {
            case J.GEOMETRIES:
              g = ve(n, e, C);
              break;
            case J.PARTS:
              b = ve(n, e, C);
              break;
            case J.RINGS:
              I = ve(n, e, C);
              break;
            case J.TRIANGLES:
              S = ve(n, e, C);
          }
          break;
        case V.OFFSET: {
          switch (C.logicalStreamType.offsetType) {
            case Fe.VERTEX:
              a = Q(n, e, C);
              break;
            case Fe.INDEX:
              f = Q(n, e, C);
              break;
          }
          break;
        }
        case V.DATA: {
          if (le.VERTEX === C.logicalStreamType.dictionaryType)
            l = On(n, e, C, r);
          else {
            const q = C;
            c = {
              numBits: q.numBits,
              coordinateShift: q.coordinateShift
            }, l = Q(n, e, C, r);
          }
          break;
        }
      }
    }
    return f ? g !== void 0 || b !== void 0 ? Rr(i, m, S, f, l, { geometryOffsets: g, partOffsets: b, ringOffsets: I }) : Rr(i, m, S, f, l) : c === void 0 ? (
      /* Currently only 2D coordinates (Vec2) are implemented in the encoder  */
      Ta(i, m, { geometryOffsets: g, partOffsets: b, ringOffsets: I }, a, l)
    ) : Ia(i, m, { geometryOffsets: g, partOffsets: b, ringOffsets: I }, a, l, c);
  }
  const u = Q(n, e, s);
  let h, p, d, x;
  for (let m = 0; m < t - 1; m++) {
    const g = Z(n, e);
    switch (g.physicalStreamType) {
      case V.LENGTH:
        switch (g.logicalStreamType.lengthType) {
          case J.GEOMETRIES:
            h = Q(n, e, g);
            break;
          case J.PARTS:
            p = Q(n, e, g);
            break;
          case J.RINGS:
            d = Q(n, e, g);
            break;
          case J.TRIANGLES:
            x = ve(n, e, g);
        }
        break;
      case V.OFFSET:
        switch (g.logicalStreamType.offsetType) {
          case Fe.VERTEX:
            a = Q(n, e, g);
            break;
          case Fe.INDEX:
            f = Q(n, e, g);
            break;
        }
        break;
      case V.DATA:
        if (le.VERTEX === g.logicalStreamType.dictionaryType)
          l = On(n, e, g, r);
        else {
          const b = g;
          c = {
            numBits: b.numBits,
            coordinateShift: b.coordinateShift
          }, l = Q(n, e, g, r);
        }
        break;
    }
  }
  let y, v, T;
  return h ? (y = yn(u, h, 2), p && d ? (v = zr(u, y, p, !1), T = Ca(u, y, v, d)) : p && (v = _a(u, y, p))) : p && d ? (v = yn(u, p, 1), T = zr(u, v, d, !0)) : p && (v = yn(u, p, 0)), f && !v ? Br(u, x, f, l) : f ? Br(u, x, f, l, {
    geometryOffsets: y,
    partOffsets: v,
    ringOffsets: T
  }) : c === void 0 ? Sa(u, { geometryOffsets: y, partOffsets: v, ringOffsets: T }, a, l) : Ea(u, { geometryOffsets: y, partOffsets: v, ringOffsets: T }, a, l, c);
}
function yn(n, t, e) {
  const i = new Uint32Array(n.length + 1);
  let r = 0;
  i[0] = r;
  let s = 0;
  for (let o = 0; o < n.length; o++)
    r = i[o + 1] = r + (n[o] > e ? t[s++] : 1);
  return i;
}
function zr(n, t, e, i) {
  const r = new Uint32Array(t[t.length - 1] + 1);
  let s = 0;
  r[0] = s;
  let o = 1, a = 0;
  for (let l = 0; l < n.length; l++) {
    const c = n[l], f = t[l + 1] - t[l];
    if (c === 5 || c === 2 || i && (c === 4 || c === 1))
      for (let u = 0; u < f; u++)
        s = r[o++] = s + e[a++];
    else
      for (let u = 0; u < f; u++)
        r[o++] = ++s;
  }
  return r;
}
function _a(n, t, e) {
  const i = new Uint32Array(t[t.length - 1] + 1);
  let r = 0;
  i[0] = r;
  let s = 1, o = 0;
  for (let a = 0; a < n.length; a++) {
    const l = n[a], c = t[a + 1] - t[a];
    if (l === 4 || l === 1)
      for (let f = 0; f < c; f++)
        r = i[s++] = r + e[o++];
    else
      for (let f = 0; f < c; f++)
        i[s++] = ++r;
  }
  return i;
}
function Ca(n, t, e, i) {
  const r = new Uint32Array(e[e.length - 1] + 1);
  let s = 0;
  r[0] = s;
  let o = 1, a = 1, l = 0;
  for (let c = 0; c < n.length; c++) {
    const f = n[c], u = t[c + 1] - t[c];
    if (f !== 0 && f !== 3)
      for (let h = 0; h < u; h++) {
        const p = e[o] - e[o - 1];
        o++;
        for (let d = 0; d < p; d++)
          s = r[a++] = s + i[l++];
      }
    else
      for (let h = 0; h < u; h++)
        r[a++] = ++s, o++;
  }
  return r;
}
class Oa extends Ye {
  constructor(t, e, i) {
    super(t, e.getBuffer(), i), this.dataVector = e;
  }
  getValueFromBuffer(t) {
    return this.dataVector.get(t);
  }
}
class La extends Xt {
  getValueFromBuffer(t) {
    return this.dataBuffer[t];
  }
}
class _i extends Ye {
  constructor(t, e, i, r) {
    super(t, r ? BigInt64Array.of(e) : BigUint64Array.of(e), i);
  }
  getValueFromBuffer(t) {
    return this.dataBuffer[0];
  }
}
function mt(n, t, e, i, r) {
  const s = Math.ceil(t / 8), o = Na(n, s, e, i);
  return r ? oa(o, t, r) : o;
}
function Na(n, t, e, i) {
  const r = new Uint8Array(t);
  let s = 0;
  const o = i.get() + e;
  for (; s < t && !(i.get() >= o); ) {
    const a = n[i.increment()];
    if (a <= 127) {
      const l = a + 3, c = n[i.increment()], f = Math.min(s + l, t);
      r.fill(c, s, f), s = f;
    } else {
      const l = 256 - a;
      for (let c = 0; c < l && s < t; c++)
        r[s++] = n[i.increment()];
    }
  }
  return i.set(o), r;
}
function Ma(n, t, e, i) {
  const r = t.get(), s = r + e * Float32Array.BYTES_PER_ELEMENT, o = new Uint8Array(n.subarray(r, s)).buffer, a = new Float32Array(o);
  return t.set(s), i ? Je(a, i, 0) : a;
}
function $a(n, t, e, i) {
  const r = t.get(), s = r + e * Float64Array.BYTES_PER_ELEMENT, o = new Uint8Array(n.subarray(r, s)).buffer, a = new Float64Array(o);
  return t.set(s), i ? Je(a, i, 0) : a;
}
const Da = 12, Ra = new TextDecoder();
function Jn(n, t, e) {
  return e - t >= Da ? Ra.decode(n.subarray(t, e)) : Ba(n, t, e);
}
function Ba(n, t, e) {
  let i = "", r = t;
  for (; r < e; ) {
    const s = n[r];
    let o = null, a = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1;
    if (r + a > e)
      break;
    let l, c, f;
    a === 1 ? s < 128 && (o = s) : a === 2 ? (l = n[r + 1], (l & 192) === 128 && (o = (s & 31) << 6 | l & 63, o <= 127 && (o = null))) : a === 3 ? (l = n[r + 1], c = n[r + 2], (l & 192) === 128 && (c & 192) === 128 && (o = (s & 15) << 12 | (l & 63) << 6 | c & 63, (o <= 2047 || o >= 55296 && o <= 57343) && (o = null))) : a === 4 && (l = n[r + 1], c = n[r + 2], f = n[r + 3], (l & 192) === 128 && (c & 192) === 128 && (f & 192) === 128 && (o = (s & 15) << 18 | (l & 63) << 12 | (c & 63) << 6 | f & 63, (o <= 65535 || o >= 1114112) && (o = null))), o === null ? (o = 65533, a = 1) : o > 65535 && (o -= 65536, i += String.fromCharCode(o >>> 10 & 1023 | 55296), o = 56320 | o & 1023), i += String.fromCharCode(o), r += a;
  }
  return i;
}
class Kn extends Ye {
  constructor(t, e, i, r) {
    super(t, i, r), this.offsetBuffer = e;
  }
}
class Ur extends Kn {
  constructor(t, e, i, r) {
    super(t, e, i, r ?? e.length - 1);
  }
  getValueFromBuffer(t) {
    const e = this.offsetBuffer[t], i = this.offsetBuffer[t + 1];
    return Jn(this.dataBuffer, e, i);
  }
}
class Pe extends Kn {
  constructor(t, e, i, r, s) {
    super(t, i, r, s ?? e.length), this.indexBuffer = e, this.indexBuffer = e;
  }
  getValueFromBuffer(t) {
    const e = this.indexBuffer[t], i = this.offsetBuffer[e], r = this.offsetBuffer[e + 1];
    return Jn(this.dataBuffer, i, r);
  }
}
function za(n, t, e) {
  const i = [], r = new Array(t.length).fill(0);
  for (let s = 1; s < t.length; s++)
    r[s] = r[s - 1] + t[s - 1];
  for (let s = 0; s < e.length; s++)
    if (e[s] === 255)
      i.push(e[++s]);
    else {
      const o = t[e[s]], a = r[e[s]];
      for (let l = 0; l < o; l++)
        i.push(n[a + l]);
    }
  return new Uint8Array(i);
}
class Ci extends Kn {
  constructor(t, e, i, r, s, o, a) {
    super(t, i, r, a ?? e.length), this.indexBuffer = e, this.symbolOffsetBuffer = s, this.symbolTableBuffer = o;
  }
  getValueFromBuffer(t) {
    this.decodedDictionary == null && (this.symbolLengthBuffer == null && (this.symbolLengthBuffer = this.offsetToLengthBuffer(this.symbolOffsetBuffer)), this.decodedDictionary = za(this.symbolTableBuffer, this.symbolLengthBuffer, this.dataBuffer));
    const e = this.indexBuffer[t], i = this.offsetBuffer[e], r = this.offsetBuffer[e + 1];
    return Jn(this.decodedDictionary, i, r);
  }
  // TODO: get rid of that conversion
  offsetToLengthBuffer(t) {
    const e = new Uint32Array(t.length - 1);
    let i = t[0];
    for (let r = 1; r < t.length; r++) {
      const s = t[r];
      e[r - 1] = s - i, i = s;
    }
    return e;
  }
}
function Ua(n, t, e, i, r) {
  let s = null, o = null, a = null, l = null, c = null, f = r ?? null, u = null, h = null;
  for (let p = 0; p < i; p++) {
    const d = Z(t, e);
    switch (d.physicalStreamType) {
      case V.PRESENT: {
        const x = mt(t, d.numValues, d.byteLength, e), y = new ye(x, d.numValues);
        f = r ?? y;
        break;
      }
      case V.OFFSET: {
        o = Q(t, e, d, void 0, f);
        break;
      }
      case V.LENGTH: {
        const x = ve(t, e, d);
        J.DICTIONARY === d.logicalStreamType.lengthType ? s = x : J.SYMBOL === d.logicalStreamType.lengthType ? l = x : u = x;
        break;
      }
      case V.DATA: {
        const x = t.subarray(e.get(), e.get() + d.byteLength);
        e.add(d.byteLength);
        const y = d.logicalStreamType.dictionaryType;
        le.FSST === y ? c = x : le.SINGLE === y || le.SHARED === y ? a = x : le.NONE === y && (h = x);
        break;
      }
    }
  }
  return Va(n, c, o, s, a, l, f) ?? qa(n, a, o, s, f) ?? Pa(n, u, h, o, f);
}
function Va(n, t, e, i, r, s, o) {
  return t ? new Ci(n, e, i, r, s, t, o) : null;
}
function qa(n, t, e, i, r) {
  return t ? r ? new Pe(n, e, i, t, r) : new Pe(n, e, i, t) : null;
}
function Pa(n, t, e, i, r) {
  if (!t || !e)
    return null;
  if (i)
    return r ? new Pe(n, i, t, e, r) : new Pe(n, i, t, e);
  if (r && r.size() !== t.length - 1) {
    const s = new Uint32Array(r.size());
    let o = 0;
    for (let a = 0; a < r.size(); a++)
      r.get(a) ? s[a] = o++ : s[a] = 0;
    return new Pe(n, s, t, e, r);
  }
  return r ? new Ur(n, t, e, r) : new Ur(n, t, e);
}
function Ga(n, t, e, i) {
  let r = null, s = null, o = null, a = null, l = !1;
  for (; !l; ) {
    const h = Z(n, t);
    switch (h.physicalStreamType) {
      case V.LENGTH:
        J.DICTIONARY === h.logicalStreamType.lengthType ? r = ve(n, t, h) : o = ve(n, t, h);
        break;
      case V.DATA:
        le.SINGLE === h.logicalStreamType.dictionaryType || le.SHARED === h.logicalStreamType.dictionaryType ? (s = n.subarray(t.get(), t.get() + h.byteLength), l = !0) : a = n.subarray(t.get(), t.get() + h.byteLength), t.add(h.byteLength);
        break;
    }
  }
  const c = e.complexType.children, f = [];
  let u = 0;
  for (const h of c) {
    const p = P(n, t, 1)[0];
    if (p === 0)
      continue;
    const d = h.name ? `${e.name}${h.name}` : e.name;
    if (h.type !== "scalarField" || h.scalarField.physicalType !== O.STRING)
      throw new Error("Currently only scalar string fields are implemented for a struct.");
    if (p > 1 && !h.nullable || p === 1 && h.nullable)
      throw new Error(`The number of streams for the child field ${h.name} does not match its nullability. nullibilty: ${h.nullable}, numStreams: ${p}`);
    let x;
    if (h.nullable) {
      const T = Z(n, t), m = mt(n, T.numValues, T.byteLength, t);
      x = new ye(m, T.numValues);
    }
    const y = Z(n, t), v = Q(n, t, y, void 0, x);
    f[u++] = a ? new Ci(d, v, r, s, o, a, x) : new Pe(d, v, r, s, x);
  }
  return f;
}
function ja(n, t, e, i, r, s) {
  return e.type === "scalarType" ? Za(i, n, t, r, e.scalarType, e) : i === 0 ? null : Ga(n, t, e);
}
function Za(n, t, e, i, r, s) {
  let o = null;
  if (n === 0)
    return null;
  if (s.nullable) {
    const c = Z(t, e), f = c.numValues, u = e.get(), h = mt(t, f, c.byteLength, e);
    e.set(u + c.byteLength), o = new ye(h, c.numValues);
  }
  const a = o ?? i;
  switch (r.physicalType) {
    case O.UINT_32:
    case O.INT_32:
      return Qa(t, e, s, r, a);
    case O.STRING: {
      const c = s.nullable ? n - 1 : n;
      return Ua(s.name, t, e, c, o);
    }
    case O.BOOLEAN:
      return Wa(t, e, s, i, a);
    case O.UINT_64:
    case O.INT_64:
      return Ya(t, e, s, a, r);
    case O.FLOAT:
      return Xa(t, e, s, a);
    case O.DOUBLE:
      return Ha(t, e, s, a);
    default:
      throw new Error(`The specified data type for the field is currently not supported: ${r}`);
  }
}
function Wa(n, t, e, i, r) {
  const s = Z(n, t), o = s.numValues, a = t.get(), l = vt(r) ? r : void 0, c = mt(n, o, s.byteLength, t, l);
  t.set(a + s.byteLength);
  const f = new ye(c, o);
  return new Oa(e.name, f, r);
}
function Xa(n, t, e, i) {
  const r = Z(n, t), s = vt(i) ? i : void 0, o = Ma(n, t, r.numValues, s);
  return new La(e.name, o, i);
}
function Ha(n, t, e, i) {
  const r = Z(n, t), s = vt(i) ? i : void 0, o = $a(n, t, r.numValues, s);
  return new Pn(e.name, o, i);
}
function Ya(n, t, e, i, r) {
  const s = Z(n, t), o = Ht(s, i, n, t, "int64"), a = r.physicalType === O.INT_64;
  if (o === M.FLAT) {
    const c = vt(i) ? i : void 0, f = a ? la(n, t, s, c) : bi(n, t, s, c);
    return new Ii(e.name, f, i);
  }
  if (o === M.SEQUENCE) {
    const c = wi(n, t, s);
    return new Si(e.name, c[0], c[1], s.numRleValues);
  }
  const l = a ? fa(n, t, s) : Ti(n, t, s);
  return new _i(e.name, l, i, a);
}
function Qa(n, t, e, i, r) {
  const s = Z(n, t), o = Ht(s, r, n, t), a = i.physicalType === O.INT_32;
  if (o === M.FLAT) {
    const c = vt(r) ? r : void 0, f = a ? On(n, t, s, void 0, c) : Q(n, t, s, void 0, c);
    return new qn(e.name, f, r);
  }
  if (o === M.SEQUENCE) {
    const c = vi(n, t, s);
    return new Gn(e.name, c[0], c[1], s.numRleValues);
  }
  const l = a ? aa(n, t, s) : Yn(n, t, s);
  return new jn(e.name, l, r, a);
}
function vt(n) {
  return n instanceof ye;
}
function Oi(n) {
  switch (n) {
    case 0:
    case 1:
    case 2:
    case 3: {
      const t = {};
      t.nullable = (n & 1) !== 0, t.columnScope = Mt.FEATURE;
      const e = {};
      return e.type = "logicalType", e.logicalType = Zn.ID, e.longID = (n & 2) !== 0, t.scalarType = e, t.type = "scalarType", t;
    }
    case 4: {
      const t = {};
      t.nullable = !1, t.columnScope = Mt.FEATURE;
      const e = {};
      return e.type = "physicalType", e.physicalType = at.GEOMETRY, t.type = "complexType", t.complexType = e, t;
    }
    case 30: {
      const t = {};
      t.nullable = !1, t.columnScope = Mt.FEATURE;
      const e = {};
      return e.type = "physicalType", e.physicalType = at.STRUCT, t.type = "complexType", t.complexType = e, t;
    }
    default:
      return tl(n);
  }
}
function Li(n) {
  return n >= 10;
}
function Ni(n) {
  return n === 30;
}
function Ja(n) {
  if (n.type === "scalarType") {
    const t = n.scalarType;
    if (t.type === "physicalType")
      switch (t.physicalType) {
        case O.BOOLEAN:
        case O.INT_8:
        case O.UINT_8:
        case O.INT_32:
        case O.UINT_32:
        case O.INT_64:
        case O.UINT_64:
        case O.FLOAT:
        case O.DOUBLE:
          return !1;
        case O.STRING:
          return !0;
        default:
          return !1;
      }
    if (t.type === "logicalType")
      return !1;
  } else if (n.type === "complexType") {
    const t = n.complexType;
    if (t.type === "physicalType")
      switch (t.physicalType) {
        case at.GEOMETRY:
        case at.STRUCT:
          return !0;
        default:
          return !1;
      }
  }
  return console.warn("Unexpected column type in hasStreamCount", n), !1;
}
function Ka(n) {
  return n.type === "scalarType" && n.scalarType?.type === "logicalType" && n.scalarType.logicalType === Zn.ID;
}
function el(n) {
  return n.type === "complexType" && n.complexType?.type === "physicalType" && n.complexType.physicalType === at.GEOMETRY;
}
function tl(n) {
  let t;
  switch (n) {
    case 10:
    case 11:
      t = O.BOOLEAN;
      break;
    case 12:
    case 13:
      t = O.INT_8;
      break;
    case 14:
    case 15:
      t = O.UINT_8;
      break;
    case 16:
    case 17:
      t = O.INT_32;
      break;
    case 18:
    case 19:
      t = O.UINT_32;
      break;
    case 20:
    case 21:
      t = O.INT_64;
      break;
    case 22:
    case 23:
      t = O.UINT_64;
      break;
    case 24:
    case 25:
      t = O.FLOAT;
      break;
    case 26:
    case 27:
      t = O.DOUBLE;
      break;
    case 28:
    case 29:
      t = O.STRING;
      break;
    default:
      return null;
  }
  const e = {};
  e.nullable = (n & 1) !== 0, e.columnScope = Mt.FEATURE;
  const i = {};
  return i.type = "physicalType", i.physicalType = t, e.type = "scalarType", e.scalarType = i, e;
}
const nl = new TextDecoder(), rl = "0-3(ID), 4(GEOMETRY), 10-29(scalars), 30(STRUCT)", il = "10-29(scalars), 30(STRUCT)";
function er(n, t) {
  const e = P(n, t, 1)[0];
  if (e === 0)
    return "";
  const i = t.get(), r = i + e, s = n.subarray(i, r);
  return t.add(e), nl.decode(s);
}
function sl(n) {
  return {
    name: n.name,
    nullable: n.nullable,
    scalarField: n.scalarType,
    complexField: n.complexType,
    type: n.type === "scalarType" ? "scalarField" : "complexField"
  };
}
function Mi(n, t) {
  const e = P(n, t, 1)[0] >>> 0;
  if (e < 10 || e > 30)
    throw new Error(`Unsupported field type code ${e}. Supported: ${il}`);
  const i = Oi(e);
  if (Li(e) && (i.name = er(n, t)), Ni(e)) {
    const r = P(n, t, 1)[0] >>> 0;
    i.complexType.children = new Array(r);
    for (let s = 0; s < r; s++)
      i.complexType.children[s] = Mi(n, t);
  }
  return sl(i);
}
function ol(n, t) {
  const e = P(n, t, 1)[0] >>> 0, i = Oi(e);
  if (!i)
    throw new Error(`Unsupported column type code ${e}. Supported: ${rl}`);
  if (Li(e) ? i.name = er(n, t) : e >= 0 && e <= 3 ? i.name = "id" : e === 4 && (i.name = "geometry"), Ni(e)) {
    const r = P(n, t, 1)[0] >>> 0, s = i.complexType;
    s.children = new Array(r);
    for (let o = 0; o < r; o++)
      s.children[o] = Mi(n, t);
  }
  return i;
}
function al(n, t) {
  const e = {};
  e.featureTables = [];
  const i = {};
  i.name = er(n, t);
  const r = P(n, t, 1)[0] >>> 0, s = P(n, t, 1)[0] >>> 0;
  i.columns = new Array(s);
  for (let o = 0; o < s; o++)
    i.columns[o] = ol(n, t);
  return e.featureTables.push(i), [e, r];
}
function ll(n, t, e = !0) {
  const i = new yi(0), r = [];
  for (; i.get() < n.length; ) {
    const s = P(n, i, 1)[0] >>> 0, a = i.get() + s;
    if (a > n.length)
      throw new Error(`Block overruns tile: ${a} > ${n.length}`);
    if (P(n, i, 1)[0] >>> 0 !== 1) {
      i.set(a);
      continue;
    }
    const [c, f] = al(n, i), u = c.featureTables[0];
    let h = null, p = null;
    const d = [];
    let x = 0;
    for (const v of u.columns) {
      const T = v.name;
      if (Ka(v)) {
        let m = null;
        if (v.nullable) {
          const b = Z(n, i), I = i.get(), S = mt(n, b.numValues, b.byteLength, i);
          i.set(I + b.byteLength), m = new ye(S, b.numValues);
        }
        const g = Z(n, i);
        x = m ? m.size() : g.decompressedCount, h = cl(n, v, i, T, g, m ?? x, e);
      } else if (el(v)) {
        const m = P(n, i, 1)[0];
        if (x === 0) {
          const g = i.get();
          x = Z(n, i).decompressedCount, i.set(g);
        }
        p = Aa(n, m, i, x, t);
      } else {
        const g = Ja(v) ? P(n, i, 1)[0] : 1;
        if (g === 0)
          continue;
        const b = ja(n, i, v, g, x);
        if (b)
          if (Array.isArray(b))
            for (const I of b)
              d.push(I);
          else
            d.push(b);
      }
    }
    const y = new qs(u.name, p, h, d, f);
    r.push(y), i.set(a);
  }
  return r;
}
function cl(n, t, e, i, r, s, o = !1) {
  const a = t.scalarType;
  if (!a || a.type !== "logicalType" || a.logicalType !== Zn.ID)
    throw new Error(`ID column must be a logical ID scalar type: ${i}`);
  const l = a.longID ? O.UINT_64 : O.UINT_32, c = typeof s == "number" ? void 0 : s, f = Ht(r, s, n, e, l === O.UINT_64 ? "int64" : "int32");
  if (l === O.UINT_32)
    switch (f) {
      case M.FLAT: {
        const u = Q(n, e, r, void 0, c);
        return new qn(i, u, s);
      }
      case M.SEQUENCE: {
        const u = vi(n, e, r);
        return new Gn(i, u[0], u[1], r.numRleValues);
      }
      case M.CONST: {
        const u = Yn(n, e, r);
        return new jn(i, u, s, !1);
      }
    }
  switch (f) {
    case M.FLAT: {
      if (o) {
        const h = ca(n, e, r);
        return new Pn(i, h, s);
      }
      const u = bi(n, e, r, c);
      return new Ii(i, u, s);
    }
    case M.SEQUENCE: {
      const u = wi(n, e, r);
      return new Si(i, u[0], u[1], r.numRleValues);
    }
    case M.CONST: {
      const u = Ti(n, e, r);
      return new _i(i, u, s, !1);
    }
  }
  throw new Error("Vector type not supported for id column.");
}
class fl {
  constructor(t, e) {
    switch (this._featureData = t, this.properties = this._featureData.properties || {}, this._featureData.geometry?.type) {
      case z.POINT:
      case z.MULTIPOINT:
        this.type = 1;
        break;
      case z.LINESTRING:
      case z.MULTILINESTRING:
        this.type = 2;
        break;
      case z.POLYGON:
      case z.MULTIPOLYGON:
        this.type = 3;
        break;
      default:
        this.type = 0;
    }
    this.extent = e, this.id = Number(this._featureData.id);
  }
  loadGeometry() {
    const t = [];
    for (const e of this._featureData.geometry.coordinates) {
      const i = [];
      for (const r of e)
        i.push(new B(r.x, r.y));
      t.push(i);
    }
    return t;
  }
}
class ul {
  constructor(t) {
    this.features = [], this.featureTable = t, this.name = t.name, this.extent = t.extent, this.version = 2, this.features = t.getFeatures(), this.length = this.features.length;
  }
  feature(t) {
    return new fl(this.features[t], this.extent);
  }
}
class hl {
  constructor(t) {
    this.layers = {};
    const e = ll(new Uint8Array(t));
    this.layers = e.reduce((i, r) => ({ ...i, [r.name]: new ul(r) }), {});
  }
}
var pl = {
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
}, dl = {
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
}, yl = {
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
}, xl = {
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
}, Yt = {
  layout_symbol: pl,
  paint_fill: dl,
  paint_line: yl,
  paint_symbol: xl
};
function $i(n, ...t) {
  for (const e of t)
    for (const i in e)
      n[i] = e[i];
  return n;
}
class ce extends Error {
  constructor(t, e) {
    super(e), this.message = e, this.key = t;
  }
}
class tr {
  constructor(t, e = []) {
    this.parent = t, this.bindings = {};
    for (const [i, r] of e)
      this.bindings[i] = r;
  }
  concat(t) {
    return new tr(this, t);
  }
  get(t) {
    if (this.bindings[t])
      return this.bindings[t];
    if (this.parent)
      return this.parent.get(t);
    throw new Error(`${t} not found in scope.`);
  }
  has(t) {
    return this.bindings[t] ? !0 : this.parent ? this.parent.has(t) : !1;
  }
}
const Qt = { kind: "null" }, w = { kind: "number" }, E = { kind: "string" }, F = { kind: "boolean" }, fe = { kind: "color" }, Jt = {
  kind: "projectionDefinition"
}, Ce = { kind: "object" }, k = { kind: "value" }, gl = { kind: "error" }, Kt = { kind: "collator" }, en = { kind: "formatted" }, tn = { kind: "padding" }, lt = { kind: "colorArray" }, nn = { kind: "numberArray" }, wt = { kind: "resolvedImage" }, rn = {
  kind: "variableAnchorOffsetCollection"
};
function W(n, t) {
  return {
    kind: "array",
    itemType: n,
    N: t
  };
}
function $(n) {
  if (n.kind === "array") {
    const t = $(n.itemType);
    return typeof n.N == "number" ? `array<${t}, ${n.N}>` : n.itemType.kind === "value" ? "array" : `array<${t}>`;
  } else
    return n.kind;
}
const ml = [
  Qt,
  w,
  E,
  F,
  fe,
  Jt,
  en,
  Ce,
  W(k),
  tn,
  nn,
  lt,
  wt,
  rn
];
function ct(n, t) {
  if (t.kind === "error")
    return null;
  if (n.kind === "array") {
    if (t.kind === "array" && (t.N === 0 && t.itemType.kind === "value" || !ct(n.itemType, t.itemType)) && (typeof n.N != "number" || n.N === t.N))
      return null;
  } else {
    if (n.kind === t.kind)
      return null;
    if (n.kind === "value") {
      for (const e of ml)
        if (!ct(e, t))
          return null;
    }
  }
  return `Expected ${$(n)} but found ${$(t)} instead.`;
}
function nr(n, t) {
  return t.some((e) => e.kind === n.kind);
}
function Oe(n, t) {
  return t.some((e) => e === "null" ? n === null : e === "array" ? Array.isArray(n) : e === "object" ? n && !Array.isArray(n) && typeof n == "object" : e === typeof n);
}
function ge(n, t) {
  return n.kind === "array" && t.kind === "array" ? n.itemType.kind === t.itemType.kind && typeof n.N == "number" : n.kind === t.kind;
}
const Di = 0.96422, Ri = 1, Bi = 0.82521, zi = 4 / 29, Ge = 6 / 29, Ui = 3 * Ge * Ge, vl = Ge * Ge * Ge, wl = Math.PI / 180, bl = 180 / Math.PI;
function Vi(n) {
  return n = n % 360, n < 0 && (n += 360), n;
}
function qi([n, t, e, i]) {
  n = xn(n), t = xn(t), e = xn(e);
  let r, s;
  const o = gn((0.2225045 * n + 0.7168786 * t + 0.0606169 * e) / Ri);
  n === t && t === e ? r = s = o : (r = gn((0.4360747 * n + 0.3850649 * t + 0.1430804 * e) / Di), s = gn((0.0139322 * n + 0.0971045 * t + 0.7141733 * e) / Bi));
  const a = 116 * o - 16;
  return [a < 0 ? 0 : a, 500 * (r - o), 200 * (o - s), i];
}
function xn(n) {
  return n <= 0.04045 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);
}
function gn(n) {
  return n > vl ? Math.pow(n, 1 / 3) : n / Ui + zi;
}
function Pi([n, t, e, i]) {
  let r = (n + 16) / 116, s = isNaN(t) ? r : r + t / 500, o = isNaN(e) ? r : r - e / 200;
  return r = Ri * vn(r), s = Di * vn(s), o = Bi * vn(o), [
    mn(3.1338561 * s - 1.6168667 * r - 0.4906146 * o),
    // D50 -> sRGB
    mn(-0.9787684 * s + 1.9161415 * r + 0.033454 * o),
    mn(0.0719453 * s - 0.2289914 * r + 1.4052427 * o),
    i
  ];
}
function mn(n) {
  return n = n <= 304e-5 ? 12.92 * n : 1.055 * Math.pow(n, 1 / 2.4) - 0.055, n < 0 ? 0 : n > 1 ? 1 : n;
}
function vn(n) {
  return n > Ge ? n * n * n : Ui * (n - zi);
}
function Tl(n) {
  const [t, e, i, r] = qi(n), s = Math.sqrt(e * e + i * i);
  return [Math.round(s * 1e4) ? Vi(Math.atan2(i, e) * bl) : NaN, s, t, r];
}
function Il([n, t, e, i]) {
  return n = isNaN(n) ? 0 : n * wl, Pi([e, Math.cos(n) * t, Math.sin(n) * t, i]);
}
function Sl([n, t, e, i]) {
  n = Vi(n), t /= 100, e /= 100;
  function r(s) {
    const o = (s + n / 30) % 12, a = t * Math.min(e, 1 - e);
    return e - a * Math.max(-1, Math.min(o - 3, 9 - o, 1));
  }
  return [r(0), r(8), r(4), i];
}
const El = Object.hasOwn || function(t, e) {
  return Object.prototype.hasOwnProperty.call(t, e);
};
function Gi(n, t) {
  return El(n, t) ? n[t] : void 0;
}
function kl(n) {
  if (n = n.toLowerCase().trim(), n === "transparent")
    return [0, 0, 0, 0];
  const t = Gi(Fl, n);
  if (t) {
    const [r, s, o] = t;
    return [r / 255, s / 255, o / 255, 1];
  }
  if (n.startsWith("#") && /^#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/.test(n)) {
    const s = n.length < 6 ? 1 : 2;
    let o = 1;
    return [
      At(n.slice(o, o += s)),
      At(n.slice(o, o += s)),
      At(n.slice(o, o += s)),
      At(n.slice(o, o + s) || "ff")
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
        f,
        // <numeric>
        u,
        // %         (optional)
        h,
        // ,         (optional)
        p,
        // <numeric>
        d,
        // %         (optional)
        x,
        // ,|/       (optional)
        y,
        // <numeric> (optional)
        v
        // %         (optional)
      ] = s, T = [c || " ", h || " ", x].join("");
      if (T === "  " || T === "  /" || T === ",," || T === ",,,") {
        const m = [l, u, d].join(""), g = m === "%%%" ? 100 : m === "" ? 255 : 0;
        if (g) {
          const b = [
            Ve(+a / g, 0, 1),
            Ve(+f / g, 0, 1),
            Ve(+p / g, 0, 1),
            y ? Vr(+y, v) : 1
          ];
          if (qr(b))
            return b;
        }
      }
      return;
    }
  }
  const e = /^hsla?\(\s*([\de.+-]+)(?:deg)?(?:\s+|\s*(,)\s*)([\de.+-]+)%(?:\s+|\s*(,)\s*)([\de.+-]+)%(?:\s*([,\/])\s*([\de.+-]+)(%)?)?\s*\)$/, i = n.match(e);
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
      f,
      // ,|/       (optional)
      u,
      // <numeric> (optional)
      h
      // %         (optional)
    ] = i, p = [o || " ", l || " ", f].join("");
    if (p === "  " || p === "  /" || p === ",," || p === ",,,") {
      const d = [
        +s,
        Ve(+a, 0, 100),
        Ve(+c, 0, 100),
        u ? Vr(+u, h) : 1
      ];
      if (qr(d))
        return Sl(d);
    }
  }
}
function At(n) {
  return parseInt(n.padEnd(2, n), 16) / 255;
}
function Vr(n, t) {
  return Ve(t ? n / 100 : n, 0, 1);
}
function Ve(n, t, e) {
  return Math.min(Math.max(t, n), e);
}
function qr(n) {
  return !n.some(Number.isNaN);
}
const Fl = {
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
function Te(n, t, e) {
  return n + e * (t - n);
}
function Ze(n, t, e) {
  return n.map((i, r) => Te(i, t[r], e));
}
function Al(n) {
  return n === "rgb" || n === "hcl" || n === "lab";
}
class L {
  /**
   * @param r Red component premultiplied by `alpha` 0..1
   * @param g Green component premultiplied by `alpha` 0..1
   * @param b Blue component premultiplied by `alpha` 0..1
   * @param [alpha=1] Alpha component 0..1
   * @param [premultiplied=true] Whether the `r`, `g` and `b` values have already
   * been multiplied by alpha. If `true` nothing happens if `false` then they will
   * be multiplied automatically.
   */
  constructor(t, e, i, r = 1, s = !0) {
    this.r = t, this.g = e, this.b = i, this.a = r, s || (this.r *= r, this.g *= r, this.b *= r, r || this.overwriteGetter("rgb", [t, e, i, r]));
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
  static parse(t) {
    if (t instanceof L)
      return t;
    if (typeof t != "string")
      return;
    const e = kl(t);
    if (e)
      return new L(...e, !1);
  }
  /**
   * Used in color interpolation and by 'to-rgba' expression.
   *
   * @returns Gien color, with reversed alpha blending, in sRGB color space.
   */
  get rgb() {
    const { r: t, g: e, b: i, a: r } = this, s = r || 1 / 0;
    return this.overwriteGetter("rgb", [t / s, e / s, i / s, r]);
  }
  /**
   * Used in color interpolation.
   *
   * @returns Gien color, with reversed alpha blending, in HCL color space.
   */
  get hcl() {
    return this.overwriteGetter("hcl", Tl(this.rgb));
  }
  /**
   * Used in color interpolation.
   *
   * @returns Gien color, with reversed alpha blending, in LAB color space.
   */
  get lab() {
    return this.overwriteGetter("lab", qi(this.rgb));
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
  overwriteGetter(t, e) {
    return Object.defineProperty(this, t, { value: e }), e;
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
    const [t, e, i, r] = this.rgb;
    return `rgba(${[t, e, i].map((s) => Math.round(s * 255)).join(",")},${r})`;
  }
  static interpolate(t, e, i, r = "rgb") {
    switch (r) {
      case "rgb": {
        const [s, o, a, l] = Ze(t.rgb, e.rgb, i);
        return new L(s, o, a, l, !1);
      }
      case "hcl": {
        const [s, o, a, l] = t.hcl, [c, f, u, h] = e.hcl;
        let p, d;
        if (!isNaN(s) && !isNaN(c)) {
          let m = c - s;
          c > s && m > 180 ? m -= 360 : c < s && s - c > 180 && (m += 360), p = s + i * m;
        } else isNaN(s) ? isNaN(c) ? p = NaN : (p = c, (a === 1 || a === 0) && (d = f)) : (p = s, (u === 1 || u === 0) && (d = o));
        const [x, y, v, T] = Il([
          p,
          d ?? Te(o, f, i),
          Te(a, u, i),
          Te(l, h, i)
        ]);
        return new L(x, y, v, T, !1);
      }
      case "lab": {
        const [s, o, a, l] = Pi(Ze(t.lab, e.lab, i));
        return new L(s, o, a, l, !1);
      }
    }
  }
}
L.black = new L(0, 0, 0, 1);
L.white = new L(1, 1, 1, 1);
L.transparent = new L(0, 0, 0, 0);
L.red = new L(1, 0, 0, 1);
class rr {
  constructor(t, e, i) {
    t ? this.sensitivity = e ? "variant" : "case" : this.sensitivity = e ? "accent" : "base", this.locale = i, this.collator = new Intl.Collator(this.locale ? this.locale : [], {
      sensitivity: this.sensitivity,
      usage: "search"
    });
  }
  compare(t, e) {
    return this.collator.compare(t, e);
  }
  resolvedLocale() {
    return new Intl.Collator(this.locale ? this.locale : []).resolvedOptions().locale;
  }
}
const _l = ["bottom", "center", "top"];
class Ln {
  constructor(t, e, i, r, s, o) {
    this.text = t, this.image = e, this.scale = i, this.fontStack = r, this.textColor = s, this.verticalAlign = o;
  }
}
class ue {
  constructor(t) {
    this.sections = t;
  }
  static fromString(t) {
    return new ue([new Ln(t, null, null, null, null, null)]);
  }
  isEmpty() {
    return this.sections.length === 0 ? !0 : !this.sections.some((t) => t.text.length !== 0 || t.image && t.image.name.length !== 0);
  }
  static factory(t) {
    return t instanceof ue ? t : ue.fromString(t);
  }
  toString() {
    return this.sections.length === 0 ? "" : this.sections.map((t) => t.text).join("");
  }
}
class X {
  constructor(t) {
    this.values = t.slice();
  }
  /**
   * Numeric padding values
   * @param input A padding value
   * @returns A `Padding` instance, or `undefined` if the input is not a valid padding value.
   */
  static parse(t) {
    if (t instanceof X)
      return t;
    if (typeof t == "number")
      return new X([t, t, t, t]);
    if (Array.isArray(t) && !(t.length < 1 || t.length > 4)) {
      for (const e of t)
        if (typeof e != "number")
          return;
      switch (t.length) {
        case 1:
          t = [t[0], t[0], t[0], t[0]];
          break;
        case 2:
          t = [t[0], t[1], t[0], t[1]];
          break;
        case 3:
          t = [t[0], t[1], t[2], t[1]];
          break;
      }
      return new X(t);
    }
  }
  toString() {
    return JSON.stringify(this.values);
  }
  static interpolate(t, e, i) {
    return new X(Ze(t.values, e.values, i));
  }
}
class H {
  constructor(t) {
    this.values = t.slice();
  }
  /**
   * Numeric NumberArray values
   * @param input A NumberArray value
   * @returns A `NumberArray` instance, or `undefined` if the input is not a valid NumberArray value.
   */
  static parse(t) {
    if (t instanceof H)
      return t;
    if (typeof t == "number")
      return new H([t]);
    if (Array.isArray(t)) {
      for (const e of t)
        if (typeof e != "number")
          return;
      return new H(t);
    }
  }
  toString() {
    return JSON.stringify(this.values);
  }
  static interpolate(t, e, i) {
    return new H(Ze(t.values, e.values, i));
  }
}
class G {
  constructor(t) {
    this.values = t.slice();
  }
  /**
   * ColorArray values
   * @param input A ColorArray value
   * @returns A `ColorArray` instance, or `undefined` if the input is not a valid ColorArray value.
   */
  static parse(t) {
    if (t instanceof G)
      return t;
    if (typeof t == "string") {
      const i = L.parse(t);
      return i ? new G([i]) : void 0;
    }
    if (!Array.isArray(t))
      return;
    const e = [];
    for (const i of t) {
      if (typeof i != "string")
        return;
      const r = L.parse(i);
      if (!r)
        return;
      e.push(r);
    }
    return new G(e);
  }
  toString() {
    return JSON.stringify(this.values);
  }
  static interpolate(t, e, i, r = "rgb") {
    const s = [];
    if (t.values.length != e.values.length)
      throw new Error(`colorArray: Arrays have mismatched length (${t.values.length} vs. ${e.values.length}), cannot interpolate.`);
    for (let o = 0; o < t.values.length; o++)
      s.push(L.interpolate(t.values[o], e.values[o], i, r));
    return new G(s);
  }
}
class D extends Error {
  constructor(t) {
    super(t), this.name = "RuntimeError";
  }
  toJSON() {
    return this.message;
  }
}
const Cl = /* @__PURE__ */ new Set([
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
class re {
  constructor(t) {
    this.values = t.slice();
  }
  static parse(t) {
    if (t instanceof re)
      return t;
    if (!(!Array.isArray(t) || t.length < 1 || t.length % 2 !== 0)) {
      for (let e = 0; e < t.length; e += 2) {
        const i = t[e], r = t[e + 1];
        if (typeof i != "string" || !Cl.has(i) || !Array.isArray(r) || r.length !== 2 || typeof r[0] != "number" || typeof r[1] != "number")
          return;
      }
      return new re(t);
    }
  }
  toString() {
    return JSON.stringify(this.values);
  }
  static interpolate(t, e, i) {
    const r = t.values, s = e.values;
    if (r.length !== s.length)
      throw new D(`Cannot interpolate values of different length. from: ${t.toString()}, to: ${e.toString()}`);
    const o = [];
    for (let a = 0; a < r.length; a += 2) {
      if (r[a] !== s[a])
        throw new D(`Cannot interpolate values containing mismatched anchors. from[${a}]: ${r[a]}, to[${a}]: ${s[a]}`);
      o.push(r[a]);
      const [l, c] = r[a + 1], [f, u] = s[a + 1];
      o.push([Te(l, f, i), Te(c, u, i)]);
    }
    return new re(o);
  }
}
class pe {
  constructor(t) {
    this.name = t.name, this.available = t.available;
  }
  toString() {
    return this.name;
  }
  static fromString(t) {
    return t ? new pe({ name: t, available: !1 }) : null;
  }
}
class te {
  constructor(t, e, i) {
    this.from = t, this.to = e, this.transition = i;
  }
  static interpolate(t, e, i) {
    return new te(t, e, i);
  }
  static parse(t) {
    if (t instanceof te)
      return t;
    if (Array.isArray(t) && t.length === 3 && typeof t[0] == "string" && typeof t[1] == "string" && typeof t[2] == "number")
      return new te(t[0], t[1], t[2]);
    if (typeof t == "object" && typeof t.from == "string" && typeof t.to == "string" && typeof t.transition == "number")
      return new te(t.from, t.to, t.transition);
    if (typeof t == "string")
      return new te(t, t, 1);
  }
}
function ji(n, t, e, i) {
  return typeof n == "number" && n >= 0 && n <= 255 && typeof t == "number" && t >= 0 && t <= 255 && typeof e == "number" && e >= 0 && e <= 255 ? typeof i > "u" || typeof i == "number" && i >= 0 && i <= 1 ? null : `Invalid rgba value [${[n, t, e, i].join(", ")}]: 'a' must be between 0 and 1.` : `Invalid rgba value [${(typeof i == "number" ? [n, t, e, i] : [n, t, e]).join(", ")}]: 'r', 'g', and 'b' must be between 0 and 255.`;
}
function ft(n) {
  if (n === null || typeof n == "string" || typeof n == "boolean" || typeof n == "number" || n instanceof te || n instanceof L || n instanceof rr || n instanceof ue || n instanceof X || n instanceof H || n instanceof G || n instanceof re || n instanceof pe)
    return !0;
  if (Array.isArray(n)) {
    for (const t of n)
      if (!ft(t))
        return !1;
    return !0;
  } else if (typeof n == "object") {
    for (const t in n)
      if (!ft(n[t]))
        return !1;
    return !0;
  } else
    return !1;
}
function U(n) {
  if (n === null)
    return Qt;
  if (typeof n == "string")
    return E;
  if (typeof n == "boolean")
    return F;
  if (typeof n == "number")
    return w;
  if (n instanceof L)
    return fe;
  if (n instanceof te)
    return Jt;
  if (n instanceof rr)
    return Kt;
  if (n instanceof ue)
    return en;
  if (n instanceof X)
    return tn;
  if (n instanceof H)
    return nn;
  if (n instanceof G)
    return lt;
  if (n instanceof re)
    return rn;
  if (n instanceof pe)
    return wt;
  if (Array.isArray(n)) {
    const t = n.length;
    let e;
    for (const i of n) {
      const r = U(i);
      if (!e)
        e = r;
      else {
        if (e === r)
          continue;
        e = k;
        break;
      }
    }
    return W(e || k, t);
  } else
    return Ce;
}
function ot(n) {
  const t = typeof n;
  return n === null ? "" : t === "string" || t === "number" || t === "boolean" ? String(n) : n instanceof L || n instanceof te || n instanceof ue || n instanceof X || n instanceof H || n instanceof G || n instanceof re || n instanceof pe ? n.toString() : JSON.stringify(n);
}
class We {
  constructor(t, e) {
    this.type = t, this.value = e;
  }
  static parse(t, e) {
    if (t.length !== 2)
      return e.error(`'literal' expression requires exactly one argument, but found ${t.length - 1} instead.`);
    if (!ft(t[1]))
      return e.error("invalid value");
    const i = t[1];
    let r = U(i);
    const s = e.expectedType;
    return r.kind === "array" && r.N === 0 && s && s.kind === "array" && (typeof s.N != "number" || s.N === 0) && (r = s), new We(r, i);
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
const _t = {
  string: E,
  number: w,
  boolean: F,
  object: Ce
};
class oe {
  constructor(t, e) {
    this.type = t, this.args = e;
  }
  static parse(t, e) {
    if (t.length < 2)
      return e.error("Expected at least one argument.");
    let i = 1, r;
    const s = t[0];
    if (s === "array") {
      let a;
      if (t.length > 2) {
        const c = t[1];
        if (typeof c != "string" || !(c in _t) || c === "object")
          return e.error('The item type argument of "array" must be one of string, number, boolean', 1);
        a = _t[c], i++;
      } else
        a = k;
      let l;
      if (t.length > 3) {
        if (t[2] !== null && (typeof t[2] != "number" || t[2] < 0 || t[2] !== Math.floor(t[2])))
          return e.error('The length argument to "array" must be a positive integer literal', 2);
        l = t[2], i++;
      }
      r = W(a, l);
    } else {
      if (!_t[s])
        throw new Error(`Types doesn't contain name = ${s}`);
      r = _t[s];
    }
    const o = [];
    for (; i < t.length; i++) {
      const a = e.parse(t[i], i, k);
      if (!a)
        return null;
      o.push(a);
    }
    return new oe(r, o);
  }
  evaluate(t) {
    for (let e = 0; e < this.args.length; e++) {
      const i = this.args[e].evaluate(t);
      if (ct(this.type, U(i))) {
        if (e === this.args.length - 1)
          throw new D(`Expected value to be of type ${$(this.type)}, but found ${$(U(i))} instead.`);
      } else return i;
    }
    throw new Error();
  }
  eachChild(t) {
    this.args.forEach(t);
  }
  outputDefined() {
    return this.args.every((t) => t.outputDefined());
  }
}
const Pr = {
  "to-boolean": F,
  "to-color": fe,
  "to-number": w,
  "to-string": E
};
class we {
  constructor(t, e) {
    this.type = t, this.args = e;
  }
  static parse(t, e) {
    if (t.length < 2)
      return e.error("Expected at least one argument.");
    const i = t[0];
    if (!Pr[i])
      throw new Error(`Can't parse ${i} as it is not part of the known types`);
    if ((i === "to-boolean" || i === "to-string") && t.length !== 2)
      return e.error("Expected one argument.");
    const r = Pr[i], s = [];
    for (let o = 1; o < t.length; o++) {
      const a = e.parse(t[o], o, k);
      if (!a)
        return null;
      s.push(a);
    }
    return new we(r, s);
  }
  evaluate(t) {
    switch (this.type.kind) {
      case "boolean":
        return !!this.args[0].evaluate(t);
      case "color": {
        let e, i;
        for (const r of this.args) {
          if (e = r.evaluate(t), i = null, e instanceof L)
            return e;
          if (typeof e == "string") {
            const s = t.parseColor(e);
            if (s)
              return s;
          } else if (Array.isArray(e) && (e.length < 3 || e.length > 4 ? i = `Invalid rgba value ${JSON.stringify(e)}: expected an array containing either three or four numeric values.` : i = ji(e[0], e[1], e[2], e[3]), !i))
            return new L(e[0] / 255, e[1] / 255, e[2] / 255, e[3]);
        }
        throw new D(i || `Could not parse color from value '${typeof e == "string" ? e : JSON.stringify(e)}'`);
      }
      case "padding": {
        let e;
        for (const i of this.args) {
          e = i.evaluate(t);
          const r = X.parse(e);
          if (r)
            return r;
        }
        throw new D(`Could not parse padding from value '${typeof e == "string" ? e : JSON.stringify(e)}'`);
      }
      case "numberArray": {
        let e;
        for (const i of this.args) {
          e = i.evaluate(t);
          const r = H.parse(e);
          if (r)
            return r;
        }
        throw new D(`Could not parse numberArray from value '${typeof e == "string" ? e : JSON.stringify(e)}'`);
      }
      case "colorArray": {
        let e;
        for (const i of this.args) {
          e = i.evaluate(t);
          const r = G.parse(e);
          if (r)
            return r;
        }
        throw new D(`Could not parse colorArray from value '${typeof e == "string" ? e : JSON.stringify(e)}'`);
      }
      case "variableAnchorOffsetCollection": {
        let e;
        for (const i of this.args) {
          e = i.evaluate(t);
          const r = re.parse(e);
          if (r)
            return r;
        }
        throw new D(`Could not parse variableAnchorOffsetCollection from value '${typeof e == "string" ? e : JSON.stringify(e)}'`);
      }
      case "number": {
        let e = null;
        for (const i of this.args) {
          if (e = i.evaluate(t), e === null)
            return 0;
          const r = Number(e);
          if (!isNaN(r))
            return r;
        }
        throw new D(`Could not convert ${JSON.stringify(e)} to number.`);
      }
      case "formatted":
        return ue.fromString(ot(this.args[0].evaluate(t)));
      case "resolvedImage":
        return pe.fromString(ot(this.args[0].evaluate(t)));
      case "projectionDefinition":
        return this.args[0].evaluate(t);
      default:
        return ot(this.args[0].evaluate(t));
    }
  }
  eachChild(t) {
    this.args.forEach(t);
  }
  outputDefined() {
    return this.args.every((t) => t.outputDefined());
  }
}
const Ol = ["Unknown", "Point", "LineString", "Polygon"];
class Zi {
  constructor() {
    this.globals = null, this.feature = null, this.featureState = null, this.formattedSection = null, this._parseColorCache = /* @__PURE__ */ new Map(), this.availableImages = null, this.canonical = null;
  }
  id() {
    return this.feature && "id" in this.feature ? this.feature.id : null;
  }
  geometryType() {
    return this.feature ? typeof this.feature.type == "number" ? Ol[this.feature.type] : this.feature.type : null;
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
  parseColor(t) {
    let e = this._parseColorCache.get(t);
    return e || (e = L.parse(t), this._parseColorCache.set(t, e)), e;
  }
}
class sn {
  constructor(t, e, i = [], r, s = new tr(), o = []) {
    this.registry = t, this.path = i, this.key = i.map((a) => `[${a}]`).join(""), this.scope = s, this.errors = o, this.expectedType = r, this._isConstant = e;
  }
  /**
   * @param expr the JSON expression to parse
   * @param index the optional argument index if this expression is an argument of a parent expression that's being parsed
   * @param options
   * @param options.omitTypeAnnotations set true to omit inferred type annotations.  Caller beware: with this option set, the parsed expression's type will NOT satisfy `expectedType` if it would normally be wrapped in an inferred annotation.
   * @private
   */
  parse(t, e, i, r, s = {}) {
    return e ? this.concat(e, i, r)._parse(t, s) : this._parse(t, s);
  }
  _parse(t, e) {
    (t === null || typeof t == "string" || typeof t == "boolean" || typeof t == "number") && (t = ["literal", t]);
    function i(r, s, o) {
      return o === "assert" ? new oe(s, [r]) : o === "coerce" ? new we(s, [r]) : r;
    }
    if (Array.isArray(t)) {
      if (t.length === 0)
        return this.error('Expected an array with at least one element. If you wanted a literal array, use ["literal", []].');
      const r = t[0];
      if (typeof r != "string")
        return this.error(`Expression name must be a string, but found ${typeof r} instead. If you wanted a literal array, use ["literal", [...]].`, 0), null;
      const s = this.registry[r];
      if (s) {
        let o = s.parse(t, this);
        if (!o)
          return null;
        if (this.expectedType) {
          const a = this.expectedType, l = o.type;
          if ((a.kind === "string" || a.kind === "number" || a.kind === "boolean" || a.kind === "object" || a.kind === "array") && l.kind === "value")
            o = i(o, a, e.typeAnnotation || "assert");
          else if (a.kind === "projectionDefinition" && ["string", "array"].includes(l.kind) || ["color", "formatted", "resolvedImage"].includes(a.kind) && ["value", "string"].includes(l.kind) || ["padding", "numberArray"].includes(a.kind) && ["value", "number", "array"].includes(l.kind) || a.kind === "colorArray" && ["value", "string", "array"].includes(l.kind) || a.kind === "variableAnchorOffsetCollection" && ["value", "array"].includes(l.kind))
            o = i(o, a, e.typeAnnotation || "coerce");
          else if (this.checkSubtype(a, l))
            return null;
        }
        if (!(o instanceof We) && o.type.kind !== "resolvedImage" && this._isConstant(o)) {
          const a = new Zi();
          try {
            o = new We(o.type, o.evaluate(a));
          } catch (l) {
            return this.error(l.message), null;
          }
        }
        return o;
      }
      return this.error(`Unknown expression "${r}". If you wanted a literal array, use ["literal", [...]].`, 0);
    } else return typeof t > "u" ? this.error("'undefined' value invalid. Use null instead.") : typeof t == "object" ? this.error('Bare objects invalid. Use ["literal", {...}] instead.') : this.error(`Expected an array, but found ${typeof t} instead.`);
  }
  /**
   * Returns a copy of this context suitable for parsing the subexpression at
   * index `index`, optionally appending to 'let' binding map.
   *
   * Note that `errors` property, intended for collecting errors while
   * parsing, is copied by reference rather than cloned.
   * @private
   */
  concat(t, e, i) {
    const r = typeof t == "number" ? this.path.concat(t) : this.path, s = i ? this.scope.concat(i) : this.scope;
    return new sn(this.registry, this._isConstant, r, e || null, s, this.errors);
  }
  /**
   * Push a parsing (or type checking) error into the `this.errors`
   * @param error The message
   * @param keys Optionally specify the source of the error at a child
   * of the current expression at `this.key`.
   * @private
   */
  error(t, ...e) {
    const i = `${this.key}${e.map((r) => `[${r}]`).join("")}`;
    this.errors.push(new ce(i, t));
  }
  /**
   * Returns null if `t` is a subtype of `expected`; otherwise returns an
   * error message and also pushes it to `this.errors`.
   * @param expected The expected type
   * @param t The actual type
   * @returns null if `t` is a subtype of `expected`; otherwise returns an error message
   */
  checkSubtype(t, e) {
    const i = ct(t, e);
    return i && this.error(i), i;
  }
}
class on {
  constructor(t, e) {
    this.type = e.type, this.bindings = [].concat(t), this.result = e;
  }
  evaluate(t) {
    return this.result.evaluate(t);
  }
  eachChild(t) {
    for (const e of this.bindings)
      t(e[1]);
    t(this.result);
  }
  static parse(t, e) {
    if (t.length < 4)
      return e.error(`Expected at least 3 arguments, but found ${t.length - 1} instead.`);
    const i = [];
    for (let s = 1; s < t.length - 1; s += 2) {
      const o = t[s];
      if (typeof o != "string")
        return e.error(`Expected string, but found ${typeof o} instead.`, s);
      if (/[^a-zA-Z0-9_]/.test(o))
        return e.error("Variable names must contain only alphanumeric characters or '_'.", s);
      const a = e.parse(t[s + 1], s + 1);
      if (!a)
        return null;
      i.push([o, a]);
    }
    const r = e.parse(t[t.length - 1], t.length - 1, e.expectedType, i);
    return r ? new on(i, r) : null;
  }
  outputDefined() {
    return this.result.outputDefined();
  }
}
class an {
  constructor(t, e) {
    this.type = e.type, this.name = t, this.boundExpression = e;
  }
  static parse(t, e) {
    if (t.length !== 2 || typeof t[1] != "string")
      return e.error("'var' expression requires exactly one string literal argument.");
    const i = t[1];
    return e.scope.has(i) ? new an(i, e.scope.get(i)) : e.error(`Unknown variable "${i}". Make sure "${i}" has been bound in an enclosing "let" expression before using it.`, 1);
  }
  evaluate(t) {
    return this.boundExpression.evaluate(t);
  }
  eachChild() {
  }
  outputDefined() {
    return !1;
  }
}
class ir {
  constructor(t, e, i) {
    this.type = t, this.index = e, this.input = i;
  }
  static parse(t, e) {
    if (t.length !== 3)
      return e.error(`Expected 2 arguments, but found ${t.length - 1} instead.`);
    const i = e.parse(t[1], 1, w), r = e.parse(t[2], 2, W(e.expectedType || k));
    if (!i || !r)
      return null;
    const s = r.type;
    return new ir(s.itemType, i, r);
  }
  evaluate(t) {
    const e = this.index.evaluate(t), i = this.input.evaluate(t);
    if (e < 0)
      throw new D(`Array index out of bounds: ${e} < 0.`);
    if (e >= i.length)
      throw new D(`Array index out of bounds: ${e} > ${i.length - 1}.`);
    if (e !== Math.floor(e))
      throw new D(`Array index must be an integer, but found ${e} instead.`);
    return i[e];
  }
  eachChild(t) {
    t(this.index), t(this.input);
  }
  outputDefined() {
    return !1;
  }
}
class sr {
  constructor(t, e) {
    this.type = F, this.needle = t, this.haystack = e;
  }
  static parse(t, e) {
    if (t.length !== 3)
      return e.error(`Expected 2 arguments, but found ${t.length - 1} instead.`);
    const i = e.parse(t[1], 1, k), r = e.parse(t[2], 2, k);
    return !i || !r ? null : nr(i.type, [F, E, w, Qt, k]) ? new sr(i, r) : e.error(`Expected first argument to be of type boolean, string, number or null, but found ${$(i.type)} instead`);
  }
  evaluate(t) {
    const e = this.needle.evaluate(t), i = this.haystack.evaluate(t);
    if (!i)
      return !1;
    if (!Oe(e, ["boolean", "string", "number", "null"]))
      throw new D(`Expected first argument to be of type boolean, string, number or null, but found ${$(U(e))} instead.`);
    if (!Oe(i, ["string", "array"]))
      throw new D(`Expected second argument to be of type array or string, but found ${$(U(i))} instead.`);
    return i.indexOf(e) >= 0;
  }
  eachChild(t) {
    t(this.needle), t(this.haystack);
  }
  outputDefined() {
    return !0;
  }
}
class Dt {
  constructor(t, e, i) {
    this.type = w, this.needle = t, this.haystack = e, this.fromIndex = i;
  }
  static parse(t, e) {
    if (t.length <= 2 || t.length >= 5)
      return e.error(`Expected 2 or 3 arguments, but found ${t.length - 1} instead.`);
    const i = e.parse(t[1], 1, k), r = e.parse(t[2], 2, k);
    if (!i || !r)
      return null;
    if (!nr(i.type, [F, E, w, Qt, k]))
      return e.error(`Expected first argument to be of type boolean, string, number or null, but found ${$(i.type)} instead`);
    if (t.length === 4) {
      const s = e.parse(t[3], 3, w);
      return s ? new Dt(i, r, s) : null;
    } else
      return new Dt(i, r);
  }
  evaluate(t) {
    const e = this.needle.evaluate(t), i = this.haystack.evaluate(t);
    if (!Oe(e, ["boolean", "string", "number", "null"]))
      throw new D(`Expected first argument to be of type boolean, string, number or null, but found ${$(U(e))} instead.`);
    let r;
    if (this.fromIndex && (r = this.fromIndex.evaluate(t)), Oe(i, ["string"])) {
      const s = i.indexOf(e, r);
      return s === -1 ? -1 : [...i.slice(0, s)].length;
    } else {
      if (Oe(i, ["array"]))
        return i.indexOf(e, r);
      throw new D(`Expected second argument to be of type array or string, but found ${$(U(i))} instead.`);
    }
  }
  eachChild(t) {
    t(this.needle), t(this.haystack), this.fromIndex && t(this.fromIndex);
  }
  outputDefined() {
    return !1;
  }
}
class or {
  constructor(t, e, i, r, s, o) {
    this.inputType = t, this.type = e, this.input = i, this.cases = r, this.outputs = s, this.otherwise = o;
  }
  static parse(t, e) {
    if (t.length < 5)
      return e.error(`Expected at least 4 arguments, but found only ${t.length - 1}.`);
    if (t.length % 2 !== 1)
      return e.error("Expected an even number of arguments.");
    let i, r;
    e.expectedType && e.expectedType.kind !== "value" && (r = e.expectedType);
    const s = {}, o = [];
    for (let c = 2; c < t.length - 1; c += 2) {
      let f = t[c];
      const u = t[c + 1];
      Array.isArray(f) || (f = [f]);
      const h = e.concat(c);
      if (f.length === 0)
        return h.error("Expected at least one branch label.");
      for (const d of f) {
        if (typeof d != "number" && typeof d != "string")
          return h.error("Branch labels must be numbers or strings.");
        if (typeof d == "number" && Math.abs(d) > Number.MAX_SAFE_INTEGER)
          return h.error(`Branch labels must be integers no larger than ${Number.MAX_SAFE_INTEGER}.`);
        if (typeof d == "number" && Math.floor(d) !== d)
          return h.error("Numeric branch labels must be integer values.");
        if (!i)
          i = U(d);
        else if (h.checkSubtype(i, U(d)))
          return null;
        if (typeof s[String(d)] < "u")
          return h.error("Branch labels must be unique.");
        s[String(d)] = o.length;
      }
      const p = e.parse(u, c, r);
      if (!p)
        return null;
      r = r || p.type, o.push(p);
    }
    const a = e.parse(t[1], 1, k);
    if (!a)
      return null;
    const l = e.parse(t[t.length - 1], t.length - 1, r);
    return !l || a.type.kind !== "value" && e.concat(1).checkSubtype(i, a.type) ? null : new or(i, r, a, s, o, l);
  }
  evaluate(t) {
    const e = this.input.evaluate(t);
    return (U(e) === this.inputType && this.outputs[this.cases[e]] || this.otherwise).evaluate(t);
  }
  eachChild(t) {
    t(this.input), this.outputs.forEach(t), t(this.otherwise);
  }
  outputDefined() {
    return this.outputs.every((t) => t.outputDefined()) && this.otherwise.outputDefined();
  }
}
class ar {
  constructor(t, e, i) {
    this.type = t, this.branches = e, this.otherwise = i;
  }
  static parse(t, e) {
    if (t.length < 4)
      return e.error(`Expected at least 3 arguments, but found only ${t.length - 1}.`);
    if (t.length % 2 !== 0)
      return e.error("Expected an odd number of arguments.");
    let i;
    e.expectedType && e.expectedType.kind !== "value" && (i = e.expectedType);
    const r = [];
    for (let o = 1; o < t.length - 1; o += 2) {
      const a = e.parse(t[o], o, F);
      if (!a)
        return null;
      const l = e.parse(t[o + 1], o + 1, i);
      if (!l)
        return null;
      r.push([a, l]), i = i || l.type;
    }
    const s = e.parse(t[t.length - 1], t.length - 1, i);
    if (!s)
      return null;
    if (!i)
      throw new Error("Can't infer output type");
    return new ar(i, r, s);
  }
  evaluate(t) {
    for (const [e, i] of this.branches)
      if (e.evaluate(t))
        return i.evaluate(t);
    return this.otherwise.evaluate(t);
  }
  eachChild(t) {
    for (const [e, i] of this.branches)
      t(e), t(i);
    t(this.otherwise);
  }
  outputDefined() {
    return this.branches.every(([t, e]) => e.outputDefined()) && this.otherwise.outputDefined();
  }
}
class Rt {
  constructor(t, e, i, r) {
    this.type = t, this.input = e, this.beginIndex = i, this.endIndex = r;
  }
  static parse(t, e) {
    if (t.length <= 2 || t.length >= 5)
      return e.error(`Expected 2 or 3 arguments, but found ${t.length - 1} instead.`);
    const i = e.parse(t[1], 1, k), r = e.parse(t[2], 2, w);
    if (!i || !r)
      return null;
    if (!nr(i.type, [W(k), E, k]))
      return e.error(`Expected first argument to be of type array or string, but found ${$(i.type)} instead`);
    if (t.length === 4) {
      const s = e.parse(t[3], 3, w);
      return s ? new Rt(i.type, i, r, s) : null;
    } else
      return new Rt(i.type, i, r);
  }
  evaluate(t) {
    const e = this.input.evaluate(t), i = this.beginIndex.evaluate(t);
    let r;
    if (this.endIndex && (r = this.endIndex.evaluate(t)), Oe(e, ["string"]))
      return [...e].slice(i, r).join("");
    if (Oe(e, ["array"]))
      return e.slice(i, r);
    throw new D(`Expected first argument to be of type array or string, but found ${$(U(e))} instead.`);
  }
  eachChild(t) {
    t(this.input), t(this.beginIndex), this.endIndex && t(this.endIndex);
  }
  outputDefined() {
    return !1;
  }
}
function ln(n, t) {
  const e = n.length - 1;
  let i = 0, r = e, s = 0, o, a;
  for (; i <= r; )
    if (s = Math.floor((i + r) / 2), o = n[s], a = n[s + 1], o <= t) {
      if (s === e || t < a)
        return s;
      i = s + 1;
    } else if (o > t)
      r = s - 1;
    else
      throw new D("Input is not a number.");
  return 0;
}
class cn {
  constructor(t, e, i) {
    this.type = t, this.input = e, this.labels = [], this.outputs = [];
    for (const [r, s] of i)
      this.labels.push(r), this.outputs.push(s);
  }
  static parse(t, e) {
    if (t.length - 1 < 4)
      return e.error(`Expected at least 4 arguments, but found only ${t.length - 1}.`);
    if ((t.length - 1) % 2 !== 0)
      return e.error("Expected an even number of arguments.");
    const i = e.parse(t[1], 1, w);
    if (!i)
      return null;
    const r = [];
    let s = null;
    e.expectedType && e.expectedType.kind !== "value" && (s = e.expectedType);
    for (let o = 1; o < t.length; o += 2) {
      const a = o === 1 ? -1 / 0 : t[o], l = t[o + 1], c = o, f = o + 1;
      if (typeof a != "number")
        return e.error('Input/output pairs for "step" expressions must be defined using literal numeric values (not computed expressions) for the input values.', c);
      if (r.length && r[r.length - 1][0] >= a)
        return e.error('Input/output pairs for "step" expressions must be arranged with input values in strictly ascending order.', c);
      const u = e.parse(l, f, s);
      if (!u)
        return null;
      s = s || u.type, r.push([a, u]);
    }
    return new cn(s, i, r);
  }
  evaluate(t) {
    const e = this.labels, i = this.outputs;
    if (e.length === 1)
      return i[0].evaluate(t);
    const r = this.input.evaluate(t);
    if (r <= e[0])
      return i[0].evaluate(t);
    const s = e.length;
    if (r >= e[s - 1])
      return i[s - 1].evaluate(t);
    const o = ln(e, r);
    return i[o].evaluate(t);
  }
  eachChild(t) {
    t(this.input);
    for (const e of this.outputs)
      t(e);
  }
  outputDefined() {
    return this.outputs.every((t) => t.outputDefined());
  }
}
function Ll(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var wn, Gr;
function Nl() {
  if (Gr) return wn;
  Gr = 1, wn = n;
  function n(t, e, i, r) {
    this.cx = 3 * t, this.bx = 3 * (i - t) - this.cx, this.ax = 1 - this.cx - this.bx, this.cy = 3 * e, this.by = 3 * (r - e) - this.cy, this.ay = 1 - this.cy - this.by, this.p1x = t, this.p1y = e, this.p2x = i, this.p2y = r;
  }
  return n.prototype = {
    sampleCurveX: function(t) {
      return ((this.ax * t + this.bx) * t + this.cx) * t;
    },
    sampleCurveY: function(t) {
      return ((this.ay * t + this.by) * t + this.cy) * t;
    },
    sampleCurveDerivativeX: function(t) {
      return (3 * this.ax * t + 2 * this.bx) * t + this.cx;
    },
    solveCurveX: function(t, e) {
      if (e === void 0 && (e = 1e-6), t < 0) return 0;
      if (t > 1) return 1;
      for (var i = t, r = 0; r < 8; r++) {
        var s = this.sampleCurveX(i) - t;
        if (Math.abs(s) < e) return i;
        var o = this.sampleCurveDerivativeX(i);
        if (Math.abs(o) < 1e-6) break;
        i = i - s / o;
      }
      var a = 0, l = 1;
      for (i = t, r = 0; r < 20 && (s = this.sampleCurveX(i), !(Math.abs(s - t) < e)); r++)
        t > s ? a = i : l = i, i = (l - a) * 0.5 + a;
      return i;
    },
    solve: function(t, e) {
      return this.sampleCurveY(this.solveCurveX(t, e));
    }
  }, wn;
}
var Ml = Nl(), $l = /* @__PURE__ */ Ll(Ml);
class ie {
  constructor(t, e, i, r, s) {
    this.type = t, this.operator = e, this.interpolation = i, this.input = r, this.labels = [], this.outputs = [];
    for (const [o, a] of s)
      this.labels.push(o), this.outputs.push(a);
  }
  static interpolationFactor(t, e, i, r) {
    let s = 0;
    if (t.name === "exponential")
      s = bn(e, t.base, i, r);
    else if (t.name === "linear")
      s = bn(e, 1, i, r);
    else if (t.name === "cubic-bezier") {
      const o = t.controlPoints;
      s = new $l(o[0], o[1], o[2], o[3]).solve(bn(e, 1, i, r));
    }
    return s;
  }
  static parse(t, e) {
    let [i, r, s, ...o] = t;
    if (!Array.isArray(r) || r.length === 0)
      return e.error("Expected an interpolation type expression.", 1);
    if (r[0] === "linear")
      r = { name: "linear" };
    else if (r[0] === "exponential") {
      const c = r[1];
      if (typeof c != "number")
        return e.error("Exponential interpolation requires a numeric base.", 1, 1);
      r = {
        name: "exponential",
        base: c
      };
    } else if (r[0] === "cubic-bezier") {
      const c = r.slice(1);
      if (c.length !== 4 || c.some((f) => typeof f != "number" || f < 0 || f > 1))
        return e.error("Cubic bezier interpolation requires four numeric arguments with values between 0 and 1.", 1);
      r = {
        name: "cubic-bezier",
        controlPoints: c
      };
    } else
      return e.error(`Unknown interpolation type ${String(r[0])}`, 1, 0);
    if (t.length - 1 < 4)
      return e.error(`Expected at least 4 arguments, but found only ${t.length - 1}.`);
    if ((t.length - 1) % 2 !== 0)
      return e.error("Expected an even number of arguments.");
    if (s = e.parse(s, 2, w), !s)
      return null;
    const a = [];
    let l = null;
    (i === "interpolate-hcl" || i === "interpolate-lab") && e.expectedType != lt ? l = fe : e.expectedType && e.expectedType.kind !== "value" && (l = e.expectedType);
    for (let c = 0; c < o.length; c += 2) {
      const f = o[c], u = o[c + 1], h = c + 3, p = c + 4;
      if (typeof f != "number")
        return e.error('Input/output pairs for "interpolate" expressions must be defined using literal numeric values (not computed expressions) for the input values.', h);
      if (a.length && a[a.length - 1][0] >= f)
        return e.error('Input/output pairs for "interpolate" expressions must be arranged with input values in strictly ascending order.', h);
      const d = e.parse(u, p, l);
      if (!d)
        return null;
      l = l || d.type, a.push([f, d]);
    }
    return !ge(l, w) && !ge(l, Jt) && !ge(l, fe) && !ge(l, tn) && !ge(l, nn) && !ge(l, lt) && !ge(l, rn) && !ge(l, W(w)) ? e.error(`Type ${$(l)} is not interpolatable.`) : new ie(l, i, r, s, a);
  }
  evaluate(t) {
    const e = this.labels, i = this.outputs;
    if (e.length === 1)
      return i[0].evaluate(t);
    const r = this.input.evaluate(t);
    if (r <= e[0])
      return i[0].evaluate(t);
    const s = e.length;
    if (r >= e[s - 1])
      return i[s - 1].evaluate(t);
    const o = ln(e, r), a = e[o], l = e[o + 1], c = ie.interpolationFactor(this.interpolation, r, a, l), f = i[o].evaluate(t), u = i[o + 1].evaluate(t);
    switch (this.operator) {
      case "interpolate":
        switch (this.type.kind) {
          case "number":
            return Te(f, u, c);
          case "color":
            return L.interpolate(f, u, c);
          case "padding":
            return X.interpolate(f, u, c);
          case "colorArray":
            return G.interpolate(f, u, c);
          case "numberArray":
            return H.interpolate(f, u, c);
          case "variableAnchorOffsetCollection":
            return re.interpolate(f, u, c);
          case "array":
            return Ze(f, u, c);
          case "projectionDefinition":
            return te.interpolate(f, u, c);
        }
      case "interpolate-hcl":
        switch (this.type.kind) {
          case "color":
            return L.interpolate(f, u, c, "hcl");
          case "colorArray":
            return G.interpolate(f, u, c, "hcl");
        }
      case "interpolate-lab":
        switch (this.type.kind) {
          case "color":
            return L.interpolate(f, u, c, "lab");
          case "colorArray":
            return G.interpolate(f, u, c, "lab");
        }
    }
  }
  eachChild(t) {
    t(this.input);
    for (const e of this.outputs)
      t(e);
  }
  outputDefined() {
    return this.outputs.every((t) => t.outputDefined());
  }
}
function bn(n, t, e, i) {
  const r = i - e, s = n - e;
  return r === 0 ? 0 : t === 1 ? s / r : (Math.pow(t, s) - 1) / (Math.pow(t, r) - 1);
}
const Dl = {
  color: L.interpolate,
  number: Te,
  padding: X.interpolate,
  numberArray: H.interpolate,
  colorArray: G.interpolate,
  variableAnchorOffsetCollection: re.interpolate,
  array: Ze
};
class ut {
  constructor(t, e) {
    this.type = t, this.args = e;
  }
  static parse(t, e) {
    if (t.length < 2)
      return e.error("Expected at least one argument.");
    let i = null;
    const r = e.expectedType;
    r && r.kind !== "value" && (i = r);
    const s = [];
    for (const a of t.slice(1)) {
      const l = e.parse(a, 1 + s.length, i, void 0, {
        typeAnnotation: "omit"
      });
      if (!l)
        return null;
      i = i || l.type, s.push(l);
    }
    if (!i)
      throw new Error("No output type");
    return r && s.some((a) => ct(r, a.type)) ? new ut(k, s) : new ut(i, s);
  }
  evaluate(t) {
    let e = null, i = 0, r;
    for (const s of this.args)
      if (i++, e = s.evaluate(t), e && e instanceof pe && !e.available && (r || (r = e.name), e = null, i === this.args.length && (e = r)), e !== null)
        break;
    return e;
  }
  eachChild(t) {
    this.args.forEach(t);
  }
  outputDefined() {
    return this.args.every((t) => t.outputDefined());
  }
}
function jr(n, t) {
  return n === "==" || n === "!=" ? t.kind === "boolean" || t.kind === "string" || t.kind === "number" || t.kind === "null" || t.kind === "value" : t.kind === "string" || t.kind === "number" || t.kind === "value";
}
function Rl(n, t, e) {
  return t === e;
}
function Bl(n, t, e) {
  return t !== e;
}
function zl(n, t, e) {
  return t < e;
}
function Ul(n, t, e) {
  return t > e;
}
function Vl(n, t, e) {
  return t <= e;
}
function ql(n, t, e) {
  return t >= e;
}
function Wi(n, t, e, i) {
  return i.compare(t, e) === 0;
}
function Pl(n, t, e, i) {
  return !Wi(n, t, e, i);
}
function Gl(n, t, e, i) {
  return i.compare(t, e) < 0;
}
function jl(n, t, e, i) {
  return i.compare(t, e) > 0;
}
function Zl(n, t, e, i) {
  return i.compare(t, e) <= 0;
}
function Wl(n, t, e, i) {
  return i.compare(t, e) >= 0;
}
function et(n, t, e) {
  const i = n !== "==" && n !== "!=";
  return class Xi {
    constructor(s, o, a) {
      this.type = F, this.lhs = s, this.rhs = o, this.collator = a, this.hasUntypedArgument = s.type.kind === "value" || o.type.kind === "value";
    }
    static parse(s, o) {
      if (s.length !== 3 && s.length !== 4)
        return o.error("Expected two or three arguments.");
      const a = s[0];
      let l = o.parse(s[1], 1, k);
      if (!l)
        return null;
      if (!jr(a, l.type))
        return o.concat(1).error(`"${a}" comparisons are not supported for type '${$(l.type)}'.`);
      let c = o.parse(s[2], 2, k);
      if (!c)
        return null;
      if (!jr(a, c.type))
        return o.concat(2).error(`"${a}" comparisons are not supported for type '${$(c.type)}'.`);
      if (l.type.kind !== c.type.kind && l.type.kind !== "value" && c.type.kind !== "value")
        return o.error(`Cannot compare types '${$(l.type)}' and '${$(c.type)}'.`);
      i && (l.type.kind === "value" && c.type.kind !== "value" ? l = new oe(c.type, [l]) : l.type.kind !== "value" && c.type.kind === "value" && (c = new oe(l.type, [c])));
      let f = null;
      if (s.length === 4) {
        if (l.type.kind !== "string" && c.type.kind !== "string" && l.type.kind !== "value" && c.type.kind !== "value")
          return o.error("Cannot use collator to compare non-string types.");
        if (f = o.parse(s[3], 3, Kt), !f)
          return null;
      }
      return new Xi(l, c, f);
    }
    evaluate(s) {
      const o = this.lhs.evaluate(s), a = this.rhs.evaluate(s);
      if (i && this.hasUntypedArgument) {
        const l = U(o), c = U(a);
        if (l.kind !== c.kind || !(l.kind === "string" || l.kind === "number"))
          throw new D(`Expected arguments for "${n}" to be (string, string) or (number, number), but found (${l.kind}, ${c.kind}) instead.`);
      }
      if (this.collator && !i && this.hasUntypedArgument) {
        const l = U(o), c = U(a);
        if (l.kind !== "string" || c.kind !== "string")
          return t(s, o, a);
      }
      return this.collator ? e(s, o, a, this.collator.evaluate(s)) : t(s, o, a);
    }
    eachChild(s) {
      s(this.lhs), s(this.rhs), this.collator && s(this.collator);
    }
    outputDefined() {
      return !0;
    }
  };
}
const Xl = et("==", Rl, Wi), Hl = et("!=", Bl, Pl), Yl = et("<", zl, Gl), Ql = et(">", Ul, jl), Jl = et("<=", Vl, Zl), Kl = et(">=", ql, Wl);
class fn {
  constructor(t, e, i) {
    this.type = Kt, this.locale = i, this.caseSensitive = t, this.diacriticSensitive = e;
  }
  static parse(t, e) {
    if (t.length !== 2)
      return e.error("Expected one argument.");
    const i = t[1];
    if (typeof i != "object" || Array.isArray(i))
      return e.error("Collator options argument must be an object.");
    const r = e.parse(i["case-sensitive"] === void 0 ? !1 : i["case-sensitive"], 1, F);
    if (!r)
      return null;
    const s = e.parse(i["diacritic-sensitive"] === void 0 ? !1 : i["diacritic-sensitive"], 1, F);
    if (!s)
      return null;
    let o = null;
    return i.locale && (o = e.parse(i.locale, 1, E), !o) ? null : new fn(r, s, o);
  }
  evaluate(t) {
    return new rr(this.caseSensitive.evaluate(t), this.diacriticSensitive.evaluate(t), this.locale ? this.locale.evaluate(t) : null);
  }
  eachChild(t) {
    t(this.caseSensitive), t(this.diacriticSensitive), this.locale && t(this.locale);
  }
  outputDefined() {
    return !1;
  }
}
class lr {
  constructor(t, e, i, r, s, o) {
    this.type = E, this.number = t, this.locale = e, this.currency = i, this.unit = r, this.minFractionDigits = s, this.maxFractionDigits = o;
  }
  static parse(t, e) {
    if (t.length !== 3)
      return e.error("Expected two arguments.");
    const i = e.parse(t[1], 1, w);
    if (!i)
      return null;
    const r = t[2];
    if (typeof r != "object" || Array.isArray(r))
      return e.error("NumberFormat options argument must be an object.");
    let s = null;
    if (r.locale && (s = e.parse(r.locale, 1, E), !s))
      return null;
    let o = null;
    if (r.currency && (o = e.parse(r.currency, 1, E), !o))
      return null;
    let a = null;
    if (r.unit && (a = e.parse(r.unit, 1, E), !a))
      return null;
    if (o && a)
      return e.error("NumberFormat options `currency` and `unit` are mutually exclusive");
    let l = null;
    if (r["min-fraction-digits"] && (l = e.parse(r["min-fraction-digits"], 1, w), !l))
      return null;
    let c = null;
    return r["max-fraction-digits"] && (c = e.parse(r["max-fraction-digits"], 1, w), !c) ? null : new lr(i, s, o, a, l, c);
  }
  evaluate(t) {
    return new Intl.NumberFormat(this.locale ? this.locale.evaluate(t) : [], {
      style: this.currency ? "currency" : this.unit ? "unit" : "decimal",
      currency: this.currency ? this.currency.evaluate(t) : void 0,
      unit: this.unit ? this.unit.evaluate(t) : void 0,
      minimumFractionDigits: this.minFractionDigits ? this.minFractionDigits.evaluate(t) : void 0,
      maximumFractionDigits: this.maxFractionDigits ? this.maxFractionDigits.evaluate(t) : void 0
    }).format(this.number.evaluate(t));
  }
  eachChild(t) {
    t(this.number), this.locale && t(this.locale), this.currency && t(this.currency), this.unit && t(this.unit), this.minFractionDigits && t(this.minFractionDigits), this.maxFractionDigits && t(this.maxFractionDigits);
  }
  outputDefined() {
    return !1;
  }
}
class cr {
  constructor(t) {
    this.type = en, this.sections = t;
  }
  static parse(t, e) {
    if (t.length < 2)
      return e.error("Expected at least one argument.");
    const i = t[1];
    if (!Array.isArray(i) && typeof i == "object")
      return e.error("First argument must be an image or text section.");
    const r = [];
    let s = !1;
    for (let o = 1; o <= t.length - 1; ++o) {
      const a = t[o];
      if (s && typeof a == "object" && !Array.isArray(a)) {
        s = !1;
        let l = null;
        if (a["font-scale"] && (l = e.parse(a["font-scale"], 1, w), !l))
          return null;
        let c = null;
        if (a["text-font"] && (c = e.parse(a["text-font"], 1, W(E)), !c))
          return null;
        let f = null;
        if (a["text-color"] && (f = e.parse(a["text-color"], 1, fe), !f))
          return null;
        let u = null;
        if (a["vertical-align"]) {
          if (typeof a["vertical-align"] == "string" && !_l.includes(a["vertical-align"]))
            return e.error(`'vertical-align' must be one of: 'bottom', 'center', 'top' but found '${a["vertical-align"]}' instead.`);
          if (u = e.parse(a["vertical-align"], 1, E), !u)
            return null;
        }
        const h = r[r.length - 1];
        h.scale = l, h.font = c, h.textColor = f, h.verticalAlign = u;
      } else {
        const l = e.parse(t[o], 1, k);
        if (!l)
          return null;
        const c = l.type.kind;
        if (c !== "string" && c !== "value" && c !== "null" && c !== "resolvedImage")
          return e.error("Formatted text type must be 'string', 'value', 'image' or 'null'.");
        s = !0, r.push({
          content: l,
          scale: null,
          font: null,
          textColor: null,
          verticalAlign: null
        });
      }
    }
    return new cr(r);
  }
  evaluate(t) {
    const e = (i) => {
      const r = i.content.evaluate(t);
      return U(r) === wt ? new Ln("", r, null, null, null, i.verticalAlign ? i.verticalAlign.evaluate(t) : null) : new Ln(ot(r), null, i.scale ? i.scale.evaluate(t) : null, i.font ? i.font.evaluate(t).join(",") : null, i.textColor ? i.textColor.evaluate(t) : null, i.verticalAlign ? i.verticalAlign.evaluate(t) : null);
    };
    return new ue(this.sections.map(e));
  }
  eachChild(t) {
    for (const e of this.sections)
      t(e.content), e.scale && t(e.scale), e.font && t(e.font), e.textColor && t(e.textColor), e.verticalAlign && t(e.verticalAlign);
  }
  outputDefined() {
    return !1;
  }
}
class fr {
  constructor(t) {
    this.type = wt, this.input = t;
  }
  static parse(t, e) {
    if (t.length !== 2)
      return e.error("Expected two arguments.");
    const i = e.parse(t[1], 1, E);
    return i ? new fr(i) : e.error("No image name provided.");
  }
  evaluate(t) {
    const e = this.input.evaluate(t), i = pe.fromString(e);
    return i && t.availableImages && (i.available = t.availableImages.indexOf(e) > -1), i;
  }
  eachChild(t) {
    t(this.input);
  }
  outputDefined() {
    return !1;
  }
}
class ur {
  constructor(t) {
    this.type = w, this.input = t;
  }
  static parse(t, e) {
    if (t.length !== 2)
      return e.error(`Expected 1 argument, but found ${t.length - 1} instead.`);
    const i = e.parse(t[1], 1);
    return i ? i.type.kind !== "array" && i.type.kind !== "string" && i.type.kind !== "value" ? e.error(`Expected argument of type string or array, but found ${$(i.type)} instead.`) : new ur(i) : null;
  }
  evaluate(t) {
    const e = this.input.evaluate(t);
    if (typeof e == "string")
      return [...e].length;
    if (Array.isArray(e))
      return e.length;
    throw new D(`Expected value to be of type string or array, but found ${$(U(e))} instead.`);
  }
  eachChild(t) {
    t(this.input);
  }
  outputDefined() {
    return !1;
  }
}
const he = 8192;
function ec(n, t) {
  const e = tc(n[0]), i = rc(n[1]), r = Math.pow(2, t.z);
  return [Math.round(e * r * he), Math.round(i * r * he)];
}
function hr(n, t) {
  const e = Math.pow(2, t.z), i = (n[0] / he + t.x) / e, r = (n[1] / he + t.y) / e;
  return [nc(i), ic(r)];
}
function tc(n) {
  return (180 + n) / 360;
}
function nc(n) {
  return n * 360 - 180;
}
function rc(n) {
  return (180 - 180 / Math.PI * Math.log(Math.tan(Math.PI / 4 + n * Math.PI / 360))) / 360;
}
function ic(n) {
  return 360 / Math.PI * Math.atan(Math.exp((180 - n * 360) * Math.PI / 180)) - 90;
}
function bt(n, t) {
  n[0] = Math.min(n[0], t[0]), n[1] = Math.min(n[1], t[1]), n[2] = Math.max(n[2], t[0]), n[3] = Math.max(n[3], t[1]);
}
function ht(n, t) {
  return !(n[0] <= t[0] || n[2] >= t[2] || n[1] <= t[1] || n[3] >= t[3]);
}
function sc(n, t, e) {
  return t[1] > n[1] != e[1] > n[1] && n[0] < (e[0] - t[0]) * (n[1] - t[1]) / (e[1] - t[1]) + t[0];
}
function oc(n, t, e) {
  const i = n[0] - t[0], r = n[1] - t[1], s = n[0] - e[0], o = n[1] - e[1];
  return i * o - s * r === 0 && i * s <= 0 && r * o <= 0;
}
function un(n, t, e, i) {
  const r = [t[0] - n[0], t[1] - n[1]], s = [i[0] - e[0], i[1] - e[1]];
  return fc(s, r) === 0 ? !1 : !!(Zr(n, t, e, i) && Zr(e, i, n, t));
}
function ac(n, t, e) {
  for (const i of e)
    for (let r = 0; r < i.length - 1; ++r)
      if (un(n, t, i[r], i[r + 1]))
        return !0;
  return !1;
}
function tt(n, t, e = !1) {
  let i = !1;
  for (const r of t)
    for (let s = 0; s < r.length - 1; s++) {
      if (oc(n, r[s], r[s + 1]))
        return e;
      sc(n, r[s], r[s + 1]) && (i = !i);
    }
  return i;
}
function lc(n, t) {
  for (const e of t)
    if (tt(n, e))
      return !0;
  return !1;
}
function Hi(n, t) {
  for (const e of n)
    if (!tt(e, t))
      return !1;
  for (let e = 0; e < n.length - 1; ++e)
    if (ac(n[e], n[e + 1], t))
      return !1;
  return !0;
}
function cc(n, t) {
  for (const e of t)
    if (Hi(n, e))
      return !0;
  return !1;
}
function fc(n, t) {
  return n[0] * t[1] - n[1] * t[0];
}
function Zr(n, t, e, i) {
  const r = n[0] - e[0], s = n[1] - e[1], o = t[0] - e[0], a = t[1] - e[1], l = i[0] - e[0], c = i[1] - e[1], f = r * c - l * s, u = o * c - l * a;
  return f > 0 && u < 0 || f < 0 && u > 0;
}
function pr(n, t, e) {
  const i = [];
  for (let r = 0; r < n.length; r++) {
    const s = [];
    for (let o = 0; o < n[r].length; o++) {
      const a = ec(n[r][o], e);
      bt(t, a), s.push(a);
    }
    i.push(s);
  }
  return i;
}
function Yi(n, t, e) {
  const i = [];
  for (let r = 0; r < n.length; r++) {
    const s = pr(n[r], t, e);
    i.push(s);
  }
  return i;
}
function Qi(n, t, e, i) {
  if (n[0] < e[0] || n[0] > e[2]) {
    const r = i * 0.5;
    let s = n[0] - e[0] > r ? -i : e[0] - n[0] > r ? i : 0;
    s === 0 && (s = n[0] - e[2] > r ? -i : e[2] - n[0] > r ? i : 0), n[0] += s;
  }
  bt(t, n);
}
function uc(n) {
  n[0] = n[1] = 1 / 0, n[2] = n[3] = -1 / 0;
}
function Wr(n, t, e, i) {
  const r = Math.pow(2, i.z) * he, s = [i.x * he, i.y * he], o = [];
  for (const a of n)
    for (const l of a) {
      const c = [l.x + s[0], l.y + s[1]];
      Qi(c, t, e, r), o.push(c);
    }
  return o;
}
function Xr(n, t, e, i) {
  const r = Math.pow(2, i.z) * he, s = [i.x * he, i.y * he], o = [];
  for (const a of n) {
    const l = [];
    for (const c of a) {
      const f = [c.x + s[0], c.y + s[1]];
      bt(t, f), l.push(f);
    }
    o.push(l);
  }
  if (t[2] - t[0] <= r / 2) {
    uc(t);
    for (const a of o)
      for (const l of a)
        Qi(l, t, e, r);
  }
  return o;
}
function hc(n, t) {
  const e = [1 / 0, 1 / 0, -1 / 0, -1 / 0], i = [1 / 0, 1 / 0, -1 / 0, -1 / 0], r = n.canonicalID();
  if (t.type === "Polygon") {
    const s = pr(t.coordinates, i, r), o = Wr(n.geometry(), e, i, r);
    if (!ht(e, i))
      return !1;
    for (const a of o)
      if (!tt(a, s))
        return !1;
  }
  if (t.type === "MultiPolygon") {
    const s = Yi(t.coordinates, i, r), o = Wr(n.geometry(), e, i, r);
    if (!ht(e, i))
      return !1;
    for (const a of o)
      if (!lc(a, s))
        return !1;
  }
  return !0;
}
function pc(n, t) {
  const e = [1 / 0, 1 / 0, -1 / 0, -1 / 0], i = [1 / 0, 1 / 0, -1 / 0, -1 / 0], r = n.canonicalID();
  if (t.type === "Polygon") {
    const s = pr(t.coordinates, i, r), o = Xr(n.geometry(), e, i, r);
    if (!ht(e, i))
      return !1;
    for (const a of o)
      if (!Hi(a, s))
        return !1;
  }
  if (t.type === "MultiPolygon") {
    const s = Yi(t.coordinates, i, r), o = Xr(n.geometry(), e, i, r);
    if (!ht(e, i))
      return !1;
    for (const a of o)
      if (!cc(a, s))
        return !1;
  }
  return !0;
}
class Le {
  constructor(t, e) {
    this.type = F, this.geojson = t, this.geometries = e;
  }
  static parse(t, e) {
    if (t.length !== 2)
      return e.error(`'within' expression requires exactly one argument, but found ${t.length - 1} instead.`);
    if (ft(t[1])) {
      const i = t[1];
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
          return new Le(i, s);
        }
      } else if (i.type === "Feature") {
        const r = i.geometry.type;
        if (r === "Polygon" || r === "MultiPolygon")
          return new Le(i, i.geometry);
      } else if (i.type === "Polygon" || i.type === "MultiPolygon")
        return new Le(i, i);
    }
    return e.error("'within' expression requires valid geojson object that contains polygon geometry type.");
  }
  evaluate(t) {
    if (t.geometry() != null && t.canonicalID() != null) {
      if (t.geometryType() === "Point")
        return hc(t, this.geometries);
      if (t.geometryType() === "LineString")
        return pc(t, this.geometries);
    }
    return !1;
  }
  eachChild() {
  }
  outputDefined() {
    return !0;
  }
}
class Ji {
  constructor(t = [], e = (i, r) => i < r ? -1 : i > r ? 1 : 0) {
    if (this.data = t, this.length = this.data.length, this.compare = e, this.length > 0)
      for (let i = (this.length >> 1) - 1; i >= 0; i--) this._down(i);
  }
  push(t) {
    this.data.push(t), this._up(this.length++);
  }
  pop() {
    if (this.length === 0) return;
    const t = this.data[0], e = this.data.pop();
    return --this.length > 0 && (this.data[0] = e, this._down(0)), t;
  }
  peek() {
    return this.data[0];
  }
  _up(t) {
    const { data: e, compare: i } = this, r = e[t];
    for (; t > 0; ) {
      const s = t - 1 >> 1, o = e[s];
      if (i(r, o) >= 0) break;
      e[t] = o, t = s;
    }
    e[t] = r;
  }
  _down(t) {
    const { data: e, compare: i } = this, r = this.length >> 1, s = e[t];
    for (; t < r; ) {
      let o = (t << 1) + 1;
      const a = o + 1;
      if (a < this.length && i(e[a], e[o]) < 0 && (o = a), i(e[o], s) >= 0) break;
      e[t] = e[o], t = o;
    }
    e[t] = s;
  }
}
function dc(n, t) {
  if (n.length <= 1)
    return [n];
  const i = [];
  let r, s;
  for (const o of n) {
    const a = yc(o);
    a !== 0 && (o.area = Math.abs(a), s === void 0 && (s = a < 0), s === a < 0 ? (r && i.push(r), r = [o]) : r.push(o));
  }
  return r && i.push(r), i;
}
function yc(n) {
  let t = 0;
  for (let e = 0, i = n.length, r = i - 1, s, o; e < i; r = e++)
    s = n[e], o = n[r], t += (o.x - s.x) * (s.y + o.y);
  return t;
}
const xc = 6378.137, Hr = 1 / 298.257223563, Yr = Hr * (2 - Hr), Qr = Math.PI / 180;
class dr {
  constructor(t) {
    const e = Qr * xc * 1e3, i = Math.cos(t * Qr), r = 1 / (1 - Yr * (1 - i * i)), s = Math.sqrt(r);
    this.kx = e * s * i, this.ky = e * s * r * (1 - Yr);
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
  distance(t, e) {
    const i = this.wrap(t[0] - e[0]) * this.kx, r = (t[1] - e[1]) * this.ky;
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
  pointOnLine(t, e) {
    let i = 1 / 0, r, s, o, a;
    for (let l = 0; l < t.length - 1; l++) {
      let c = t[l][0], f = t[l][1], u = this.wrap(t[l + 1][0] - c) * this.kx, h = (t[l + 1][1] - f) * this.ky, p = 0;
      (u !== 0 || h !== 0) && (p = (this.wrap(e[0] - c) * this.kx * u + (e[1] - f) * this.ky * h) / (u * u + h * h), p > 1 ? (c = t[l + 1][0], f = t[l + 1][1]) : p > 0 && (c += u / this.kx * p, f += h / this.ky * p)), u = this.wrap(e[0] - c) * this.kx, h = (e[1] - f) * this.ky;
      const d = u * u + h * h;
      d < i && (i = d, r = c, s = f, o = l, a = p);
    }
    return {
      point: [r, s],
      index: o,
      t: Math.max(0, Math.min(1, a))
    };
  }
  wrap(t) {
    for (; t < -180; )
      t += 360;
    for (; t > 180; )
      t -= 360;
    return t;
  }
}
const Nn = 100, Mn = 50;
function Ki(n, t) {
  return t[0] - n[0];
}
function Bt(n) {
  return n[1] - n[0] + 1;
}
function xe(n, t) {
  return n[1] >= n[0] && n[1] < t;
}
function $n(n, t) {
  if (n[0] > n[1])
    return [null, null];
  const e = Bt(n);
  if (t) {
    if (e === 2)
      return [n, null];
    const r = Math.floor(e / 2);
    return [
      [n[0], n[0] + r],
      [n[0] + r, n[1]]
    ];
  }
  if (e === 1)
    return [n, null];
  const i = Math.floor(e / 2) - 1;
  return [
    [n[0], n[0] + i],
    [n[0] + i + 1, n[1]]
  ];
}
function Dn(n, t) {
  if (!xe(t, n.length))
    return [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  const e = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  for (let i = t[0]; i <= t[1]; ++i)
    bt(e, n[i]);
  return e;
}
function Rn(n) {
  const t = [1 / 0, 1 / 0, -1 / 0, -1 / 0];
  for (const e of n)
    for (const i of e)
      bt(t, i);
  return t;
}
function Jr(n) {
  return n[0] !== -1 / 0 && n[1] !== -1 / 0 && n[2] !== 1 / 0 && n[3] !== 1 / 0;
}
function yr(n, t, e) {
  if (!Jr(n) || !Jr(t))
    return NaN;
  let i = 0, r = 0;
  return n[2] < t[0] && (i = t[0] - n[2]), n[0] > t[2] && (i = n[0] - t[2]), n[1] > t[3] && (r = n[1] - t[3]), n[3] < t[1] && (r = t[1] - n[3]), e.distance([0, 0], [i, r]);
}
function Ae(n, t, e) {
  const i = e.pointOnLine(t, n);
  return e.distance(n, i.point);
}
function xr(n, t, e, i, r) {
  const s = Math.min(Ae(n, [e, i], r), Ae(t, [e, i], r)), o = Math.min(Ae(e, [n, t], r), Ae(i, [n, t], r));
  return Math.min(s, o);
}
function gc(n, t, e, i, r) {
  if (!(xe(t, n.length) && xe(i, e.length)))
    return 1 / 0;
  let o = 1 / 0;
  for (let a = t[0]; a < t[1]; ++a) {
    const l = n[a], c = n[a + 1];
    for (let f = i[0]; f < i[1]; ++f) {
      const u = e[f], h = e[f + 1];
      if (un(l, c, u, h))
        return 0;
      o = Math.min(o, xr(l, c, u, h, r));
    }
  }
  return o;
}
function mc(n, t, e, i, r) {
  if (!(xe(t, n.length) && xe(i, e.length)))
    return NaN;
  let o = 1 / 0;
  for (let a = t[0]; a <= t[1]; ++a)
    for (let l = i[0]; l <= i[1]; ++l)
      if (o = Math.min(o, r.distance(n[a], e[l])), o === 0)
        return o;
  return o;
}
function vc(n, t, e) {
  if (tt(n, t, !0))
    return 0;
  let i = 1 / 0;
  for (const r of t) {
    const s = r[0], o = r[r.length - 1];
    if (s !== o && (i = Math.min(i, Ae(n, [o, s], e)), i === 0))
      return i;
    const a = e.pointOnLine(r, n);
    if (i = Math.min(i, e.distance(n, a.point)), i === 0)
      return i;
  }
  return i;
}
function wc(n, t, e, i) {
  if (!xe(t, n.length))
    return NaN;
  for (let s = t[0]; s <= t[1]; ++s)
    if (tt(n[s], e, !0))
      return 0;
  let r = 1 / 0;
  for (let s = t[0]; s < t[1]; ++s) {
    const o = n[s], a = n[s + 1];
    for (const l of e)
      for (let c = 0, f = l.length, u = f - 1; c < f; u = c++) {
        const h = l[u], p = l[c];
        if (un(o, a, h, p))
          return 0;
        r = Math.min(r, xr(o, a, h, p, i));
      }
  }
  return r;
}
function Kr(n, t) {
  for (const e of n)
    for (const i of e)
      if (tt(i, t, !0))
        return !0;
  return !1;
}
function bc(n, t, e, i = 1 / 0) {
  const r = Rn(n), s = Rn(t);
  if (i !== 1 / 0 && yr(r, s, e) >= i)
    return i;
  if (ht(r, s)) {
    if (Kr(n, t))
      return 0;
  } else if (Kr(t, n))
    return 0;
  let o = 1 / 0;
  for (const a of n)
    for (let l = 0, c = a.length, f = c - 1; l < c; f = l++) {
      const u = a[f], h = a[l];
      for (const p of t)
        for (let d = 0, x = p.length, y = x - 1; d < x; y = d++) {
          const v = p[y], T = p[d];
          if (un(u, h, v, T))
            return 0;
          o = Math.min(o, xr(u, h, v, T, e));
        }
    }
  return o;
}
function ei(n, t, e, i, r, s) {
  if (!s)
    return;
  const o = yr(Dn(i, s), r, e);
  o < t && n.push([o, s, [0, 0]]);
}
function Ct(n, t, e, i, r, s, o) {
  if (!s || !o)
    return;
  const a = yr(Dn(i, s), Dn(r, o), e);
  a < t && n.push([a, s, o]);
}
function zt(n, t, e, i, r = 1 / 0) {
  let s = Math.min(i.distance(n[0], e[0][0]), r);
  if (s === 0)
    return s;
  const o = new Ji([[0, [0, n.length - 1], [0, 0]]], Ki), a = Rn(e);
  for (; o.length > 0; ) {
    const l = o.pop();
    if (l[0] >= s)
      continue;
    const c = l[1], f = t ? Mn : Nn;
    if (Bt(c) <= f) {
      if (!xe(c, n.length))
        return NaN;
      if (t) {
        const u = wc(n, c, e, i);
        if (isNaN(u) || u === 0)
          return u;
        s = Math.min(s, u);
      } else
        for (let u = c[0]; u <= c[1]; ++u) {
          const h = vc(n[u], e, i);
          if (s = Math.min(s, h), s === 0)
            return 0;
        }
    } else {
      const u = $n(c, t);
      ei(o, s, i, n, a, u[0]), ei(o, s, i, n, a, u[1]);
    }
  }
  return s;
}
function Ut(n, t, e, i, r, s = 1 / 0) {
  let o = Math.min(s, r.distance(n[0], e[0]));
  if (o === 0)
    return o;
  const a = new Ji([[0, [0, n.length - 1], [0, e.length - 1]]], Ki);
  for (; a.length > 0; ) {
    const l = a.pop();
    if (l[0] >= o)
      continue;
    const c = l[1], f = l[2], u = t ? Mn : Nn, h = i ? Mn : Nn;
    if (Bt(c) <= u && Bt(f) <= h) {
      if (!xe(c, n.length) && xe(f, e.length))
        return NaN;
      let p;
      if (t && i)
        p = gc(n, c, e, f, r), o = Math.min(o, p);
      else if (t && !i) {
        const d = n.slice(c[0], c[1] + 1);
        for (let x = f[0]; x <= f[1]; ++x)
          if (p = Ae(e[x], d, r), o = Math.min(o, p), o === 0)
            return o;
      } else if (!t && i) {
        const d = e.slice(f[0], f[1] + 1);
        for (let x = c[0]; x <= c[1]; ++x)
          if (p = Ae(n[x], d, r), o = Math.min(o, p), o === 0)
            return o;
      } else
        p = mc(n, c, e, f, r), o = Math.min(o, p);
    } else {
      const p = $n(c, t), d = $n(f, i);
      Ct(a, o, r, n, e, p[0], d[0]), Ct(a, o, r, n, e, p[0], d[1]), Ct(a, o, r, n, e, p[1], d[0]), Ct(a, o, r, n, e, p[1], d[1]);
    }
  }
  return o;
}
function Tc(n, t) {
  const e = n.geometry(), i = e.flat().map((o) => hr([o.x, o.y], n.canonical));
  if (e.length === 0)
    return NaN;
  const r = new dr(i[0][1]);
  let s = 1 / 0;
  for (const o of t) {
    switch (o.type) {
      case "Point":
        s = Math.min(s, Ut(i, !1, [o.coordinates], !1, r, s));
        break;
      case "LineString":
        s = Math.min(s, Ut(i, !1, o.coordinates, !0, r, s));
        break;
      case "Polygon":
        s = Math.min(s, zt(i, !1, o.coordinates, r, s));
        break;
    }
    if (s === 0)
      return s;
  }
  return s;
}
function Ic(n, t) {
  const e = n.geometry(), i = e.flat().map((o) => hr([o.x, o.y], n.canonical));
  if (e.length === 0)
    return NaN;
  const r = new dr(i[0][1]);
  let s = 1 / 0;
  for (const o of t) {
    switch (o.type) {
      case "Point":
        s = Math.min(s, Ut(i, !0, [o.coordinates], !1, r, s));
        break;
      case "LineString":
        s = Math.min(s, Ut(i, !0, o.coordinates, !0, r, s));
        break;
      case "Polygon":
        s = Math.min(s, zt(i, !0, o.coordinates, r, s));
        break;
    }
    if (s === 0)
      return s;
  }
  return s;
}
function Sc(n, t) {
  const e = n.geometry();
  if (e.length === 0 || e[0].length === 0)
    return NaN;
  const i = dc(e).map((o) => o.map((a) => a.map((l) => hr([l.x, l.y], n.canonical)))), r = new dr(i[0][0][0][1]);
  let s = 1 / 0;
  for (const o of t)
    for (const a of i) {
      switch (o.type) {
        case "Point":
          s = Math.min(s, zt([o.coordinates], !1, a, r, s));
          break;
        case "LineString":
          s = Math.min(s, zt(o.coordinates, !0, a, r, s));
          break;
        case "Polygon":
          s = Math.min(s, bc(a, o.coordinates, r, s));
          break;
      }
      if (s === 0)
        return s;
    }
  return s;
}
function Tn(n) {
  return n.type === "MultiPolygon" ? n.coordinates.map((t) => ({
    type: "Polygon",
    coordinates: t
  })) : n.type === "MultiLineString" ? n.coordinates.map((t) => ({
    type: "LineString",
    coordinates: t
  })) : n.type === "MultiPoint" ? n.coordinates.map((t) => ({
    type: "Point",
    coordinates: t
  })) : [n];
}
class Ne {
  constructor(t, e) {
    this.type = w, this.geojson = t, this.geometries = e;
  }
  static parse(t, e) {
    if (t.length !== 2)
      return e.error(`'distance' expression requires exactly one argument, but found ${t.length - 1} instead.`);
    if (ft(t[1])) {
      const i = t[1];
      if (i.type === "FeatureCollection")
        return new Ne(i, i.features.map((r) => Tn(r.geometry)).flat());
      if (i.type === "Feature")
        return new Ne(i, Tn(i.geometry));
      if ("type" in i && "coordinates" in i)
        return new Ne(i, Tn(i));
    }
    return e.error("'distance' expression requires valid geojson object that contains polygon geometry type.");
  }
  evaluate(t) {
    if (t.geometry() != null && t.canonicalID() != null) {
      if (t.geometryType() === "Point")
        return Tc(t, this.geometries);
      if (t.geometryType() === "LineString")
        return Ic(t, this.geometries);
      if (t.geometryType() === "Polygon")
        return Sc(t, this.geometries);
    }
    return NaN;
  }
  eachChild() {
  }
  outputDefined() {
    return !0;
  }
}
class Tt {
  constructor(t) {
    this.type = k, this.key = t;
  }
  static parse(t, e) {
    if (t.length !== 2)
      return e.error(`Expected 1 argument, but found ${t.length - 1} instead.`);
    const i = t[1];
    return i == null ? e.error("Global state property must be defined.") : typeof i != "string" ? e.error(`Global state property must be string, but found ${typeof t[1]} instead.`) : new Tt(i);
  }
  evaluate(t) {
    var e;
    const i = (e = t.globals) === null || e === void 0 ? void 0 : e.globalState;
    return !i || Object.keys(i).length === 0 ? null : Gi(i, this.key);
  }
  eachChild() {
  }
  outputDefined() {
    return !1;
  }
}
const je = {
  // special forms
  "==": Xl,
  "!=": Hl,
  ">": Ql,
  "<": Yl,
  ">=": Kl,
  "<=": Jl,
  array: oe,
  at: ir,
  boolean: oe,
  case: ar,
  coalesce: ut,
  collator: fn,
  format: cr,
  image: fr,
  in: sr,
  "index-of": Dt,
  interpolate: ie,
  "interpolate-hcl": ie,
  "interpolate-lab": ie,
  length: ur,
  let: on,
  literal: We,
  match: or,
  number: oe,
  "number-format": lr,
  object: oe,
  slice: Rt,
  step: cn,
  string: oe,
  "to-boolean": we,
  "to-color": we,
  "to-number": we,
  "to-string": we,
  var: an,
  within: Le,
  distance: Ne,
  "global-state": Tt
};
class ne {
  constructor(t, e, i, r) {
    this.name = t, this.type = e, this._evaluate = i, this.args = r;
  }
  evaluate(t) {
    return this._evaluate(t, this.args);
  }
  eachChild(t) {
    this.args.forEach(t);
  }
  outputDefined() {
    return !1;
  }
  static parse(t, e) {
    const i = t[0], r = ne.definitions[i];
    if (!r)
      return e.error(`Unknown expression "${i}". If you wanted a literal array, use ["literal", [...]].`, 0);
    const s = Array.isArray(r) ? r[0] : r.type, o = Array.isArray(r) ? [[r[1], r[2]]] : r.overloads, a = o.filter(
      ([c]) => !Array.isArray(c) || // varags
      c.length === t.length - 1
      // correct param count
    );
    let l = null;
    for (const [c, f] of a) {
      l = new sn(e.registry, Vt, e.path, null, e.scope);
      const u = [];
      let h = !1;
      for (let p = 1; p < t.length; p++) {
        const d = t[p], x = Array.isArray(c) ? c[p - 1] : c.type, y = l.parse(d, 1 + u.length, x);
        if (!y) {
          h = !0;
          break;
        }
        u.push(y);
      }
      if (!h) {
        if (Array.isArray(c) && c.length !== u.length) {
          l.error(`Expected ${c.length} arguments, but found ${u.length} instead.`);
          continue;
        }
        for (let p = 0; p < u.length; p++) {
          const d = Array.isArray(c) ? c[p] : c.type, x = u[p];
          l.concat(p + 1).checkSubtype(d, x.type);
        }
        if (l.errors.length === 0)
          return new ne(i, s, f, u);
      }
    }
    if (a.length === 1)
      e.errors.push(...l.errors);
    else {
      const f = (a.length ? a : o).map(([h]) => kc(h)).join(" | "), u = [];
      for (let h = 1; h < t.length; h++) {
        const p = e.parse(t[h], 1 + u.length);
        if (!p)
          return null;
        u.push($(p.type));
      }
      e.error(`Expected arguments of type ${f}, but found (${u.join(", ")}) instead.`);
    }
    return null;
  }
  static register(t, e) {
    ne.definitions = e;
    for (const i in e)
      t[i] = ne;
  }
}
function ti(n, [t, e, i, r]) {
  t = t.evaluate(n), e = e.evaluate(n), i = i.evaluate(n);
  const s = r ? r.evaluate(n) : 1, o = ji(t, e, i, s);
  if (o)
    throw new D(o);
  return new L(t / 255, e / 255, i / 255, s, !1);
}
function ni(n, t) {
  return n in t;
}
function In(n, t) {
  const e = t[n];
  return typeof e > "u" ? null : e;
}
function Ec(n, t, e, i) {
  for (; e <= i; ) {
    const r = e + i >> 1;
    if (t[r] === n)
      return !0;
    t[r] > n ? i = r - 1 : e = r + 1;
  }
  return !1;
}
function Ee(n) {
  return { type: n };
}
ne.register(je, {
  error: [
    gl,
    [E],
    (n, [t]) => {
      throw new D(t.evaluate(n));
    }
  ],
  typeof: [E, [k], (n, [t]) => $(U(t.evaluate(n)))],
  "to-rgba": [
    W(w, 4),
    [fe],
    (n, [t]) => {
      const [e, i, r, s] = t.evaluate(n).rgb;
      return [e * 255, i * 255, r * 255, s];
    }
  ],
  rgb: [fe, [w, w, w], ti],
  rgba: [fe, [w, w, w, w], ti],
  has: {
    type: F,
    overloads: [
      [[E], (n, [t]) => ni(t.evaluate(n), n.properties())],
      [
        [E, Ce],
        (n, [t, e]) => ni(t.evaluate(n), e.evaluate(n))
      ]
    ]
  },
  get: {
    type: k,
    overloads: [
      [[E], (n, [t]) => In(t.evaluate(n), n.properties())],
      [
        [E, Ce],
        (n, [t, e]) => In(t.evaluate(n), e.evaluate(n))
      ]
    ]
  },
  "feature-state": [
    k,
    [E],
    (n, [t]) => In(t.evaluate(n), n.featureState || {})
  ],
  properties: [Ce, [], (n) => n.properties()],
  "geometry-type": [E, [], (n) => n.geometryType()],
  id: [k, [], (n) => n.id()],
  zoom: [w, [], (n) => n.globals.zoom],
  "heatmap-density": [w, [], (n) => n.globals.heatmapDensity || 0],
  elevation: [w, [], (n) => n.globals.elevation || 0],
  "line-progress": [w, [], (n) => n.globals.lineProgress || 0],
  accumulated: [
    k,
    [],
    (n) => n.globals.accumulated === void 0 ? null : n.globals.accumulated
  ],
  "+": [
    w,
    Ee(w),
    (n, t) => {
      let e = 0;
      for (const i of t)
        e += i.evaluate(n);
      return e;
    }
  ],
  "*": [
    w,
    Ee(w),
    (n, t) => {
      let e = 1;
      for (const i of t)
        e *= i.evaluate(n);
      return e;
    }
  ],
  "-": {
    type: w,
    overloads: [
      [[w, w], (n, [t, e]) => t.evaluate(n) - e.evaluate(n)],
      [[w], (n, [t]) => -t.evaluate(n)]
    ]
  },
  "/": [w, [w, w], (n, [t, e]) => t.evaluate(n) / e.evaluate(n)],
  "%": [w, [w, w], (n, [t, e]) => t.evaluate(n) % e.evaluate(n)],
  ln2: [w, [], () => Math.LN2],
  pi: [w, [], () => Math.PI],
  e: [w, [], () => Math.E],
  "^": [
    w,
    [w, w],
    (n, [t, e]) => Math.pow(t.evaluate(n), e.evaluate(n))
  ],
  sqrt: [w, [w], (n, [t]) => Math.sqrt(t.evaluate(n))],
  log10: [w, [w], (n, [t]) => Math.log(t.evaluate(n)) / Math.LN10],
  ln: [w, [w], (n, [t]) => Math.log(t.evaluate(n))],
  log2: [w, [w], (n, [t]) => Math.log(t.evaluate(n)) / Math.LN2],
  sin: [w, [w], (n, [t]) => Math.sin(t.evaluate(n))],
  cos: [w, [w], (n, [t]) => Math.cos(t.evaluate(n))],
  tan: [w, [w], (n, [t]) => Math.tan(t.evaluate(n))],
  asin: [w, [w], (n, [t]) => Math.asin(t.evaluate(n))],
  acos: [w, [w], (n, [t]) => Math.acos(t.evaluate(n))],
  atan: [w, [w], (n, [t]) => Math.atan(t.evaluate(n))],
  min: [
    w,
    Ee(w),
    (n, t) => Math.min(...t.map((e) => e.evaluate(n)))
  ],
  max: [
    w,
    Ee(w),
    (n, t) => Math.max(...t.map((e) => e.evaluate(n)))
  ],
  abs: [w, [w], (n, [t]) => Math.abs(t.evaluate(n))],
  round: [
    w,
    [w],
    (n, [t]) => {
      const e = t.evaluate(n);
      return e < 0 ? -Math.round(-e) : Math.round(e);
    }
  ],
  floor: [w, [w], (n, [t]) => Math.floor(t.evaluate(n))],
  ceil: [w, [w], (n, [t]) => Math.ceil(t.evaluate(n))],
  "filter-==": [
    F,
    [E, k],
    (n, [t, e]) => n.properties()[t.value] === e.value
  ],
  "filter-id-==": [F, [k], (n, [t]) => n.id() === t.value],
  "filter-type-==": [
    F,
    [E],
    (n, [t]) => n.geometryType() === t.value
  ],
  "filter-<": [
    F,
    [E, k],
    (n, [t, e]) => {
      const i = n.properties()[t.value], r = e.value;
      return typeof i == typeof r && i < r;
    }
  ],
  "filter-id-<": [
    F,
    [k],
    (n, [t]) => {
      const e = n.id(), i = t.value;
      return typeof e == typeof i && e < i;
    }
  ],
  "filter->": [
    F,
    [E, k],
    (n, [t, e]) => {
      const i = n.properties()[t.value], r = e.value;
      return typeof i == typeof r && i > r;
    }
  ],
  "filter-id->": [
    F,
    [k],
    (n, [t]) => {
      const e = n.id(), i = t.value;
      return typeof e == typeof i && e > i;
    }
  ],
  "filter-<=": [
    F,
    [E, k],
    (n, [t, e]) => {
      const i = n.properties()[t.value], r = e.value;
      return typeof i == typeof r && i <= r;
    }
  ],
  "filter-id-<=": [
    F,
    [k],
    (n, [t]) => {
      const e = n.id(), i = t.value;
      return typeof e == typeof i && e <= i;
    }
  ],
  "filter->=": [
    F,
    [E, k],
    (n, [t, e]) => {
      const i = n.properties()[t.value], r = e.value;
      return typeof i == typeof r && i >= r;
    }
  ],
  "filter-id->=": [
    F,
    [k],
    (n, [t]) => {
      const e = n.id(), i = t.value;
      return typeof e == typeof i && e >= i;
    }
  ],
  "filter-has": [F, [k], (n, [t]) => t.value in n.properties()],
  "filter-has-id": [F, [], (n) => n.id() !== null && n.id() !== void 0],
  "filter-type-in": [
    F,
    [W(E)],
    (n, [t]) => t.value.indexOf(n.geometryType()) >= 0
  ],
  "filter-id-in": [
    F,
    [W(k)],
    (n, [t]) => t.value.indexOf(n.id()) >= 0
  ],
  "filter-in-small": [
    F,
    [E, W(k)],
    // assumes v is an array literal
    (n, [t, e]) => e.value.indexOf(n.properties()[t.value]) >= 0
  ],
  "filter-in-large": [
    F,
    [E, W(k)],
    // assumes v is a array literal with values sorted in ascending order and of a single type
    (n, [t, e]) => Ec(n.properties()[t.value], e.value, 0, e.value.length - 1)
  ],
  all: {
    type: F,
    overloads: [
      [[F, F], (n, [t, e]) => t.evaluate(n) && e.evaluate(n)],
      [
        Ee(F),
        (n, t) => {
          for (const e of t)
            if (!e.evaluate(n))
              return !1;
          return !0;
        }
      ]
    ]
  },
  any: {
    type: F,
    overloads: [
      [[F, F], (n, [t, e]) => t.evaluate(n) || e.evaluate(n)],
      [
        Ee(F),
        (n, t) => {
          for (const e of t)
            if (e.evaluate(n))
              return !0;
          return !1;
        }
      ]
    ]
  },
  "!": [F, [F], (n, [t]) => !t.evaluate(n)],
  "is-supported-script": [
    F,
    [E],
    // At parse time this will always return true, so we need to exclude this expression with isGlobalPropertyConstant
    (n, [t]) => {
      const e = n.globals && n.globals.isSupportedScript;
      return e ? e(t.evaluate(n)) : !0;
    }
  ],
  upcase: [E, [E], (n, [t]) => t.evaluate(n).toUpperCase()],
  downcase: [E, [E], (n, [t]) => t.evaluate(n).toLowerCase()],
  concat: [
    E,
    Ee(k),
    (n, t) => t.map((e) => ot(e.evaluate(n))).join("")
  ],
  split: [
    W(E),
    [E, E],
    (n, [t, e]) => t.evaluate(n).split(e.evaluate(n))
  ],
  join: [
    E,
    [W(E), E],
    (n, [t, e]) => t.evaluate(n).join(e.evaluate(n))
  ],
  "resolved-locale": [
    E,
    [Kt],
    (n, [t]) => t.evaluate(n).resolvedLocale()
  ]
});
function kc(n) {
  return Array.isArray(n) ? `(${n.map($).join(", ")})` : `(${$(n.type)}...)`;
}
function Vt(n) {
  if (n instanceof an)
    return Vt(n.boundExpression);
  if (n instanceof ne && n.name === "error")
    return !1;
  if (n instanceof fn)
    return !1;
  if (n instanceof Le)
    return !1;
  if (n instanceof Ne)
    return !1;
  if (n instanceof Tt)
    return !1;
  const t = n instanceof we || n instanceof oe;
  let e = !0;
  return n.eachChild((i) => {
    t ? e = e && Vt(i) : e = e && i instanceof We;
  }), e ? gr(n) && vr(n, [
    "zoom",
    "heatmap-density",
    "elevation",
    "line-progress",
    "accumulated",
    "is-supported-script"
  ]) : !1;
}
function gr(n) {
  if (n instanceof ne) {
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
  if (n instanceof Le || n instanceof Ne)
    return !1;
  let t = !0;
  return n.eachChild((e) => {
    t && !gr(e) && (t = !1);
  }), t;
}
function mr(n) {
  if (n instanceof ne && n.name === "feature-state")
    return !1;
  let t = !0;
  return n.eachChild((e) => {
    t && !mr(e) && (t = !1);
  }), t;
}
function vr(n, t) {
  if (n instanceof ne && t.indexOf(n.name) >= 0)
    return !1;
  let e = !0;
  return n.eachChild((i) => {
    e && !vr(i, t) && (e = !1);
  }), e;
}
function Bn(n) {
  return { result: "success", value: n };
}
function qe(n) {
  return { result: "error", value: n };
}
function Fc(n) {
  return n["property-type"] === "data-driven" || n["property-type"] === "cross-faded-data-driven";
}
function Ac(n) {
  return !!n.expression && n.expression.parameters.indexOf("zoom") > -1;
}
function es(n) {
  return !!n.expression && n.expression.interpolated;
}
function wr(n) {
  return n instanceof Number ? "number" : n instanceof String ? "string" : n instanceof Boolean ? "boolean" : Array.isArray(n) ? "array" : n === null ? "null" : typeof n;
}
function ts(n) {
  return typeof n == "object" && n !== null && !Array.isArray(n) && U(n) === Ce;
}
function _c(n) {
  return n;
}
function Cc(n) {
  switch (n.type) {
    case "color":
      return L.parse;
    case "padding":
      return X.parse;
    case "numberArray":
      return H.parse;
    case "colorArray":
      return G.parse;
    default:
      return null;
  }
}
function Oc(n) {
  switch (n) {
    case "exponential":
      return rs;
    case "interval":
      return Nc;
    case "categorical":
      return Lc;
    case "identity":
      return Mc;
    default:
      throw new Error(`Unknown function type "${n}"`);
  }
}
function ns(n, t) {
  const e = n.stops && typeof n.stops[0][0] == "object", i = e || n.property !== void 0, r = e || !i, s = n.type || (es(t) ? "exponential" : "interval"), o = Cc(t);
  if (o && (n = $i({}, n), n.stops && (n.stops = n.stops.map((f) => [f[0], o(f[1])])), n.default ? n.default = o(n.default) : n.default = o(t.default)), n.colorSpace && !Al(n.colorSpace))
    throw new Error(`Unknown color space: "${n.colorSpace}"`);
  const a = Oc(s);
  let l, c;
  if (s === "categorical") {
    l = /* @__PURE__ */ Object.create(null);
    for (const f of n.stops)
      l[f[0]] = f[1];
    c = typeof n.stops[0][0];
  }
  if (e) {
    const f = {}, u = [];
    for (let d = 0; d < n.stops.length; d++) {
      const x = n.stops[d], y = x[0].zoom;
      f[y] === void 0 && (f[y] = {
        zoom: y,
        type: n.type,
        property: n.property,
        default: n.default,
        stops: []
      }, u.push(y)), f[y].stops.push([x[0].value, x[1]]);
    }
    const h = [];
    for (const d of u)
      h.push([
        f[d].zoom,
        ns(f[d], t)
      ]);
    const p = { name: "linear" };
    return {
      kind: "composite",
      interpolationType: p,
      interpolationFactor: ie.interpolationFactor.bind(void 0, p),
      zoomStops: h.map((d) => d[0]),
      evaluate({ zoom: d }, x) {
        return rs({
          stops: h,
          base: n.base
        }, t, d).evaluate(d, x);
      }
    };
  } else if (r) {
    const f = s === "exponential" ? { name: "exponential", base: n.base !== void 0 ? n.base : 1 } : null;
    return {
      kind: "camera",
      interpolationType: f,
      interpolationFactor: ie.interpolationFactor.bind(void 0, f),
      zoomStops: n.stops.map((u) => u[0]),
      evaluate: ({ zoom: u }) => a(n, t, u, l, c)
    };
  } else
    return {
      kind: "source",
      evaluate(f, u) {
        const h = u && u.properties ? u.properties[n.property] : void 0;
        return h === void 0 ? It(n.default, t.default) : a(n, t, h, l, c);
      }
    };
}
function It(n, t, e) {
  if (n !== void 0)
    return n;
  if (t !== void 0)
    return t;
  if (e !== void 0)
    return e;
}
function Lc(n, t, e, i, r) {
  const s = typeof e === r ? i[e] : void 0;
  return It(s, n.default, t.default);
}
function Nc(n, t, e) {
  if (wr(e) !== "number")
    return It(n.default, t.default);
  const i = n.stops.length;
  if (i === 1 || e <= n.stops[0][0])
    return n.stops[0][1];
  if (e >= n.stops[i - 1][0])
    return n.stops[i - 1][1];
  const r = ln(n.stops.map((s) => s[0]), e);
  return n.stops[r][1];
}
function rs(n, t, e) {
  const i = n.base !== void 0 ? n.base : 1;
  if (wr(e) !== "number")
    return It(n.default, t.default);
  const r = n.stops.length;
  if (r === 1 || e <= n.stops[0][0])
    return n.stops[0][1];
  if (e >= n.stops[r - 1][0])
    return n.stops[r - 1][1];
  const s = ln(n.stops.map((f) => f[0]), e), o = $c(e, i, n.stops[s][0], n.stops[s + 1][0]), a = n.stops[s][1], l = n.stops[s + 1][1], c = Dl[t.type] || _c;
  return typeof a.evaluate == "function" ? {
    evaluate(...f) {
      const u = a.evaluate.apply(void 0, f), h = l.evaluate.apply(void 0, f);
      if (!(u === void 0 || h === void 0))
        return c(u, h, o, n.colorSpace);
    }
  } : c(a, l, o, n.colorSpace);
}
function Mc(n, t, e) {
  switch (t.type) {
    case "color":
      e = L.parse(e);
      break;
    case "formatted":
      e = ue.fromString(e.toString());
      break;
    case "resolvedImage":
      e = pe.fromString(e.toString());
      break;
    case "padding":
      e = X.parse(e);
      break;
    case "colorArray":
      e = G.parse(e);
      break;
    case "numberArray":
      e = H.parse(e);
      break;
    default:
      wr(e) !== t.type && (t.type !== "enum" || !t.values[e]) && (e = void 0);
  }
  return It(e, n.default, t.default);
}
function $c(n, t, e, i) {
  const r = i - e, s = n - e;
  return r === 0 ? 0 : t === 1 ? s / r : (Math.pow(t, s) - 1) / (Math.pow(t, r) - 1);
}
class br {
  constructor(t, e, i) {
    this.expression = t, this._warningHistory = {}, this._evaluator = new Zi(), this._defaultValue = e ? zc(e) : null, this._enumValues = e && e.type === "enum" ? e.values : null, this._globalState = i;
  }
  evaluateWithoutErrorHandling(t, e, i, r, s, o) {
    return this._globalState && (t = Xe(t, this._globalState)), this._evaluator.globals = t, this._evaluator.feature = e, this._evaluator.featureState = i, this._evaluator.canonical = r, this._evaluator.availableImages = s || null, this._evaluator.formattedSection = o, this.expression.evaluate(this._evaluator);
  }
  evaluate(t, e, i, r, s, o) {
    this._globalState && (t = Xe(t, this._globalState)), this._evaluator.globals = t, this._evaluator.feature = e || null, this._evaluator.featureState = i || null, this._evaluator.canonical = r, this._evaluator.availableImages = s || null, this._evaluator.formattedSection = o || null;
    try {
      const a = this.expression.evaluate(this._evaluator);
      if (a == null || typeof a == "number" && a !== a)
        return this._defaultValue;
      if (this._enumValues && !(a in this._enumValues))
        throw new D(`Expected value to be one of ${Object.keys(this._enumValues).map((l) => JSON.stringify(l)).join(", ")}, but found ${JSON.stringify(a)} instead.`);
      return a;
    } catch (a) {
      return this._warningHistory[a.message] || (this._warningHistory[a.message] = !0, typeof console < "u" && console.warn(a.message)), this._defaultValue;
    }
  }
}
function is(n) {
  return Array.isArray(n) && n.length > 0 && typeof n[0] == "string" && n[0] in je;
}
function Tr(n, t, e) {
  const i = new sn(je, Vt, [], t ? Bc(t) : void 0), r = i.parse(n, void 0, void 0, void 0, t && t.type === "string" ? { typeAnnotation: "coerce" } : void 0);
  return r ? Bn(new br(r, t, e)) : qe(i.errors);
}
class qt {
  constructor(t, e, i) {
    this.kind = t, this._styleExpression = e, this.isStateDependent = t !== "constant" && !mr(e.expression), this.globalStateRefs = hn(e.expression), this._globalState = i;
  }
  evaluateWithoutErrorHandling(t, e, i, r, s, o) {
    return this._globalState && (t = Xe(t, this._globalState)), this._styleExpression.evaluateWithoutErrorHandling(t, e, i, r, s, o);
  }
  evaluate(t, e, i, r, s, o) {
    return this._globalState && (t = Xe(t, this._globalState)), this._styleExpression.evaluate(t, e, i, r, s, o);
  }
}
class Pt {
  constructor(t, e, i, r, s) {
    this.kind = t, this.zoomStops = i, this._styleExpression = e, this.isStateDependent = t !== "camera" && !mr(e.expression), this.globalStateRefs = hn(e.expression), this.interpolationType = r, this._globalState = s;
  }
  evaluateWithoutErrorHandling(t, e, i, r, s, o) {
    return this._globalState && (t = Xe(t, this._globalState)), this._styleExpression.evaluateWithoutErrorHandling(t, e, i, r, s, o);
  }
  evaluate(t, e, i, r, s, o) {
    return this._globalState && (t = Xe(t, this._globalState)), this._styleExpression.evaluate(t, e, i, r, s, o);
  }
  interpolationFactor(t, e, i) {
    return this.interpolationType ? ie.interpolationFactor(this.interpolationType, t, e, i) : 0;
  }
}
function Dc(n) {
  return n._styleExpression !== void 0;
}
function ss(n, t, e) {
  const i = Tr(n, t, e);
  if (i.result === "error")
    return i;
  const r = i.value.expression, s = gr(r);
  if (!s && !Fc(t))
    return qe([new ce("", "data expressions not supported")]);
  const o = vr(r, ["zoom"]);
  if (!o && !Ac(t))
    return qe([new ce("", "zoom expressions not supported")]);
  const a = $t(r);
  if (!a && !o)
    return qe([
      new ce("", '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.')
    ]);
  if (a instanceof ce)
    return qe([a]);
  if (a instanceof ie && !es(t))
    return qe([
      new ce("", '"interpolate" expressions cannot be used with this property')
    ]);
  if (!a)
    return Bn(s ? new qt("constant", i.value, e) : new qt("source", i.value, e));
  const l = a instanceof ie ? a.interpolation : void 0;
  return Bn(s ? new Pt("camera", i.value, a.labels, l, e) : new Pt("composite", i.value, a.labels, l, e));
}
class St {
  constructor(t, e) {
    this._parameters = t, this._specification = e, $i(this, ns(this._parameters, this._specification));
  }
  static deserialize(t) {
    return new St(t._parameters, t._specification);
  }
  static serialize(t) {
    return {
      _parameters: t._parameters,
      _specification: t._specification
    };
  }
}
function Rc(n, t, e) {
  if (ts(n))
    return new St(n, t);
  if (is(n)) {
    const i = ss(n, t, e);
    if (i.result === "error")
      throw new Error(i.value.map((r) => `${r.key}: ${r.message}`).join(", "));
    return i.value;
  } else {
    let i = n;
    return t.type === "color" && typeof n == "string" ? i = L.parse(n) : t.type === "padding" && (typeof n == "number" || Array.isArray(n)) ? i = X.parse(n) : t.type === "numberArray" && (typeof n == "number" || Array.isArray(n)) ? i = H.parse(n) : t.type === "colorArray" && (typeof n == "string" || Array.isArray(n)) ? i = G.parse(n) : t.type === "variableAnchorOffsetCollection" && Array.isArray(n) ? i = re.parse(n) : t.type === "projectionDefinition" && typeof n == "string" && (i = te.parse(n)), {
      globalStateRefs: /* @__PURE__ */ new Set(),
      _globalState: null,
      kind: "constant",
      evaluate: () => i
    };
  }
}
function $t(n) {
  let t = null;
  if (n instanceof on)
    t = $t(n.result);
  else if (n instanceof ut) {
    for (const e of n.args)
      if (t = $t(e), t)
        break;
  } else (n instanceof cn || n instanceof ie) && n.input instanceof ne && n.input.name === "zoom" && (t = n);
  return t instanceof ce || n.eachChild((e) => {
    const i = $t(e);
    i instanceof ce ? t = i : !t && i ? t = new ce("", '"zoom" expression may only be used as input to a top-level "step" or "interpolate" expression.') : t && i && t !== i && (t = new ce("", 'Only one zoom-based "step" or "interpolate" subexpression may be used in an expression.'));
  }), t;
}
function hn(n, t = /* @__PURE__ */ new Set()) {
  return n instanceof Tt && t.add(n.key), n.eachChild((e) => {
    hn(e, t);
  }), t;
}
function Bc(n) {
  const t = {
    color: fe,
    string: E,
    number: w,
    enum: E,
    boolean: F,
    formatted: en,
    padding: tn,
    numberArray: nn,
    colorArray: lt,
    projectionDefinition: Jt,
    resolvedImage: wt,
    variableAnchorOffsetCollection: rn
  };
  return n.type === "array" ? W(t[n.value] || k, n.length) : t[n.type];
}
function zc(n) {
  if (n.type === "color" && ts(n.default))
    return new L(0, 0, 0, 0);
  switch (n.type) {
    case "color":
      return L.parse(n.default) || null;
    case "padding":
      return X.parse(n.default) || null;
    case "numberArray":
      return H.parse(n.default) || null;
    case "colorArray":
      return G.parse(n.default) || null;
    case "variableAnchorOffsetCollection":
      return re.parse(n.default) || null;
    case "projectionDefinition":
      return te.parse(n.default) || null;
    default:
      return n.default === void 0 ? null : n.default;
  }
}
function Xe(n, t) {
  const { zoom: e, heatmapDensity: i, elevation: r, lineProgress: s, isSupportedScript: o, accumulated: a } = n ?? {};
  return {
    zoom: e,
    heatmapDensity: i,
    elevation: r,
    lineProgress: s,
    isSupportedScript: o,
    accumulated: a,
    globalState: t
  };
}
function Ir(n) {
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
      for (const t of n.slice(1))
        if (!Ir(t) && typeof t != "boolean")
          return !1;
      return !0;
    default:
      return !0;
  }
}
const Uc = {
  type: "boolean",
  default: !1,
  transition: !1,
  "property-type": "data-driven",
  expression: {
    interpolated: !1,
    parameters: ["zoom", "feature"]
  }
};
function Vc(n, t) {
  if (n == null)
    return { filter: () => !0, needGeometry: !1, getGlobalStateRefs: () => /* @__PURE__ */ new Set() };
  Ir(n) || (n = Gt(n));
  const e = Tr(n, Uc, t);
  if (e.result === "error")
    throw new Error(e.value.map((i) => `${i.key}: ${i.message}`).join(", "));
  {
    const i = os(n);
    return {
      filter: (r, s, o) => e.value.evaluate(r, s, {}, o),
      needGeometry: i,
      getGlobalStateRefs: () => hn(e.value.expression)
    };
  }
}
function qc(n, t) {
  return n < t ? -1 : n > t ? 1 : 0;
}
function os(n) {
  if (!Array.isArray(n))
    return !1;
  if (n[0] === "within" || n[0] === "distance")
    return !0;
  for (let t = 1; t < n.length; t++)
    if (os(n[t]))
      return !0;
  return !1;
}
function Gt(n) {
  if (!n)
    return !0;
  const t = n[0];
  return n.length <= 1 ? t !== "any" : t === "==" ? Sn(n[1], n[2], "==") : t === "!=" ? Ot(Sn(n[1], n[2], "==")) : t === "<" || t === ">" || t === "<=" || t === ">=" ? Sn(n[1], n[2], t) : t === "any" ? Pc(n.slice(1)) : t === "all" ? ["all"].concat(n.slice(1).map(Gt)) : t === "none" ? ["all"].concat(n.slice(1).map(Gt).map(Ot)) : t === "in" ? ri(n[1], n.slice(2)) : t === "!in" ? Ot(ri(n[1], n.slice(2))) : t === "has" ? ii(n[1]) : t === "!has" ? Ot(ii(n[1])) : !0;
}
function Sn(n, t, e) {
  switch (n) {
    case "$type":
      return [`filter-type-${e}`, t];
    case "$id":
      return [`filter-id-${e}`, t];
    default:
      return [`filter-${e}`, n, t];
  }
}
function Pc(n) {
  return ["any"].concat(n.map(Gt));
}
function ri(n, t) {
  if (t.length === 0)
    return !1;
  switch (n) {
    case "$type":
      return ["filter-type-in", ["literal", t]];
    case "$id":
      return ["filter-id-in", ["literal", t]];
    default:
      return t.length > 200 && !t.some((e) => typeof e != typeof t[0]) ? ["filter-in-large", n, ["literal", t.sort(qc)]] : ["filter-in-small", n, ["literal", t]];
  }
}
function ii(n) {
  switch (n) {
    case "$type":
      return !0;
    case "$id":
      return ["filter-has-id"];
    default:
      return ["filter-has", n];
  }
}
function Ot(n) {
  return ["!", n];
}
const as = {
  StyleExpression: br,
  StylePropertyFunction: St,
  ZoomConstantExpression: qt,
  ZoomDependentExpression: Pt,
  createExpression: Tr,
  createPropertyExpression: ss,
  isExpression: is,
  isExpressionFilter: Ir,
  isZoomExpression: Dc,
  normalizePropertyExpression: Rc
}, pt = 8192;
function Gc(n) {
  return n && n.__esModule && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n;
}
var En, si;
function jc() {
  if (si) return En;
  si = 1, En = n;
  function n(t, e, i, r) {
    this.cx = 3 * t, this.bx = 3 * (i - t) - this.cx, this.ax = 1 - this.cx - this.bx, this.cy = 3 * e, this.by = 3 * (r - e) - this.cy, this.ay = 1 - this.cy - this.by, this.p1x = t, this.p1y = e, this.p2x = i, this.p2y = r;
  }
  return n.prototype = {
    sampleCurveX: function(t) {
      return ((this.ax * t + this.bx) * t + this.cx) * t;
    },
    sampleCurveY: function(t) {
      return ((this.ay * t + this.by) * t + this.cy) * t;
    },
    sampleCurveDerivativeX: function(t) {
      return (3 * this.ax * t + 2 * this.bx) * t + this.cx;
    },
    solveCurveX: function(t, e) {
      if (e === void 0 && (e = 1e-6), t < 0) return 0;
      if (t > 1) return 1;
      for (var i = t, r = 0; r < 8; r++) {
        var s = this.sampleCurveX(i) - t;
        if (Math.abs(s) < e) return i;
        var o = this.sampleCurveDerivativeX(i);
        if (Math.abs(o) < 1e-6) break;
        i = i - s / o;
      }
      var a = 0, l = 1;
      for (i = t, r = 0; r < 20 && (s = this.sampleCurveX(i), !(Math.abs(s - t) < e)); r++)
        t > s ? a = i : l = i, i = (l - a) * 0.5 + a;
      return i;
    },
    solve: function(t, e) {
      return this.sampleCurveY(this.solveCurveX(t, e));
    }
  }, En;
}
var Zc = jc();
const Wc = /* @__PURE__ */ Gc(Zc);
function Xc(n, t, e, i) {
  const r = new Wc(n, t, e, i);
  return (s) => r.solve(s);
}
Xc(0.25, 0.1, 0.25, 1);
function oi(n, t, e) {
  return Math.min(e, Math.max(t, n));
}
const ai = {};
function Hc(n) {
  ai[n] || (typeof console < "u" && console.warn(n), ai[n] = !0);
}
const Yc = 15, zn = Math.pow(2, Yc - 1) - 1, li = -zn - 1;
function Sr(n) {
  const t = pt / n.extent, e = n.loadGeometry();
  for (const i of e)
    for (const r of i) {
      const s = Math.round(r.x * t), o = Math.round(r.y * t);
      r.x = oi(s, li, zn), r.y = oi(o, li, zn), (s < r.x || s > r.x + 1 || o < r.y || o > r.y + 1) && Hc("Geometry exceeds allowed extent, reduce your vector tile buffer size");
    }
  return e;
}
function Qc(n, t, e = 2) {
  const i = t && t.length, r = i ? t[0] * e : n.length;
  let s = ls(n, 0, r, e, !0);
  const o = [];
  if (!s || s.next === s.prev) return o;
  let a, l, c;
  if (i && (s = nf(n, t, s, e)), n.length > 80 * e) {
    a = n[0], l = n[1];
    let f = a, u = l;
    for (let h = e; h < r; h += e) {
      const p = n[h], d = n[h + 1];
      p < a && (a = p), d < l && (l = d), p > f && (f = p), d > u && (u = d);
    }
    c = Math.max(f - a, u - l), c = c !== 0 ? 32767 / c : 0;
  }
  return dt(s, o, e, a, l, c, 0), o;
}
function ls(n, t, e, i, r) {
  let s;
  if (r === df(n, t, e, i) > 0)
    for (let o = t; o < e; o += i) s = ci(o / i | 0, n[o], n[o + 1], s);
  else
    for (let o = e - i; o >= t; o -= i) s = ci(o / i | 0, n[o], n[o + 1], s);
  return s && He(s, s.next) && (xt(s), s = s.next), s;
}
function $e(n, t) {
  if (!n) return n;
  t || (t = n);
  let e = n, i;
  do
    if (i = !1, !e.steiner && (He(e, e.next) || R(e.prev, e, e.next) === 0)) {
      if (xt(e), e = t = e.prev, e === e.next) break;
      i = !0;
    } else
      e = e.next;
  while (i || e !== t);
  return t;
}
function dt(n, t, e, i, r, s, o) {
  if (!n) return;
  !o && s && lf(n, i, r, s);
  let a = n;
  for (; n.prev !== n.next; ) {
    const l = n.prev, c = n.next;
    if (s ? Kc(n, i, r, s) : Jc(n)) {
      t.push(l.i, n.i, c.i), xt(n), n = c.next, a = c.next;
      continue;
    }
    if (n = c, n === a) {
      o ? o === 1 ? (n = ef($e(n), t), dt(n, t, e, i, r, s, 2)) : o === 2 && tf(n, t, e, i, r, s) : dt($e(n), t, e, i, r, s, 1);
      break;
    }
  }
}
function Jc(n) {
  const t = n.prev, e = n, i = n.next;
  if (R(t, e, i) >= 0) return !1;
  const r = t.x, s = e.x, o = i.x, a = t.y, l = e.y, c = i.y, f = Math.min(r, s, o), u = Math.min(a, l, c), h = Math.max(r, s, o), p = Math.max(a, l, c);
  let d = i.next;
  for (; d !== t; ) {
    if (d.x >= f && d.x <= h && d.y >= u && d.y <= p && st(r, a, s, l, o, c, d.x, d.y) && R(d.prev, d, d.next) >= 0) return !1;
    d = d.next;
  }
  return !0;
}
function Kc(n, t, e, i) {
  const r = n.prev, s = n, o = n.next;
  if (R(r, s, o) >= 0) return !1;
  const a = r.x, l = s.x, c = o.x, f = r.y, u = s.y, h = o.y, p = Math.min(a, l, c), d = Math.min(f, u, h), x = Math.max(a, l, c), y = Math.max(f, u, h), v = Un(p, d, t, e, i), T = Un(x, y, t, e, i);
  let m = n.prevZ, g = n.nextZ;
  for (; m && m.z >= v && g && g.z <= T; ) {
    if (m.x >= p && m.x <= x && m.y >= d && m.y <= y && m !== r && m !== o && st(a, f, l, u, c, h, m.x, m.y) && R(m.prev, m, m.next) >= 0 || (m = m.prevZ, g.x >= p && g.x <= x && g.y >= d && g.y <= y && g !== r && g !== o && st(a, f, l, u, c, h, g.x, g.y) && R(g.prev, g, g.next) >= 0)) return !1;
    g = g.nextZ;
  }
  for (; m && m.z >= v; ) {
    if (m.x >= p && m.x <= x && m.y >= d && m.y <= y && m !== r && m !== o && st(a, f, l, u, c, h, m.x, m.y) && R(m.prev, m, m.next) >= 0) return !1;
    m = m.prevZ;
  }
  for (; g && g.z <= T; ) {
    if (g.x >= p && g.x <= x && g.y >= d && g.y <= y && g !== r && g !== o && st(a, f, l, u, c, h, g.x, g.y) && R(g.prev, g, g.next) >= 0) return !1;
    g = g.nextZ;
  }
  return !0;
}
function ef(n, t) {
  let e = n;
  do {
    const i = e.prev, r = e.next.next;
    !He(i, r) && fs(i, e, e.next, r) && yt(i, r) && yt(r, i) && (t.push(i.i, e.i, r.i), xt(e), xt(e.next), e = n = r), e = e.next;
  } while (e !== n);
  return $e(e);
}
function tf(n, t, e, i, r, s) {
  let o = n;
  do {
    let a = o.next.next;
    for (; a !== o.prev; ) {
      if (o.i !== a.i && uf(o, a)) {
        let l = us(o, a);
        o = $e(o, o.next), l = $e(l, l.next), dt(o, t, e, i, r, s, 0), dt(l, t, e, i, r, s, 0);
        return;
      }
      a = a.next;
    }
    o = o.next;
  } while (o !== n);
}
function nf(n, t, e, i) {
  const r = [];
  for (let s = 0, o = t.length; s < o; s++) {
    const a = t[s] * i, l = s < o - 1 ? t[s + 1] * i : n.length, c = ls(n, a, l, i, !1);
    c === c.next && (c.steiner = !0), r.push(ff(c));
  }
  r.sort(rf);
  for (let s = 0; s < r.length; s++)
    e = sf(r[s], e);
  return e;
}
function rf(n, t) {
  let e = n.x - t.x;
  if (e === 0 && (e = n.y - t.y, e === 0)) {
    const i = (n.next.y - n.y) / (n.next.x - n.x), r = (t.next.y - t.y) / (t.next.x - t.x);
    e = i - r;
  }
  return e;
}
function sf(n, t) {
  const e = of(n, t);
  if (!e)
    return t;
  const i = us(e, n);
  return $e(i, i.next), $e(e, e.next);
}
function of(n, t) {
  let e = t;
  const i = n.x, r = n.y;
  let s = -1 / 0, o;
  if (He(n, e)) return e;
  do {
    if (He(n, e.next)) return e.next;
    if (r <= e.y && r >= e.next.y && e.next.y !== e.y) {
      const u = e.x + (r - e.y) * (e.next.x - e.x) / (e.next.y - e.y);
      if (u <= i && u > s && (s = u, o = e.x < e.next.x ? e : e.next, u === i))
        return o;
    }
    e = e.next;
  } while (e !== t);
  if (!o) return null;
  const a = o, l = o.x, c = o.y;
  let f = 1 / 0;
  e = o;
  do {
    if (i >= e.x && e.x >= l && i !== e.x && cs(r < c ? i : s, r, l, c, r < c ? s : i, r, e.x, e.y)) {
      const u = Math.abs(r - e.y) / (i - e.x);
      yt(e, n) && (u < f || u === f && (e.x > o.x || e.x === o.x && af(o, e))) && (o = e, f = u);
    }
    e = e.next;
  } while (e !== a);
  return o;
}
function af(n, t) {
  return R(n.prev, n, t.prev) < 0 && R(t.next, n, n.next) < 0;
}
function lf(n, t, e, i) {
  let r = n;
  do
    r.z === 0 && (r.z = Un(r.x, r.y, t, e, i)), r.prevZ = r.prev, r.nextZ = r.next, r = r.next;
  while (r !== n);
  r.prevZ.nextZ = null, r.prevZ = null, cf(r);
}
function cf(n) {
  let t, e = 1;
  do {
    let i = n, r;
    n = null;
    let s = null;
    for (t = 0; i; ) {
      t++;
      let o = i, a = 0;
      for (let c = 0; c < e && (a++, o = o.nextZ, !!o); c++)
        ;
      let l = e;
      for (; a > 0 || l > 0 && o; )
        a !== 0 && (l === 0 || !o || i.z <= o.z) ? (r = i, i = i.nextZ, a--) : (r = o, o = o.nextZ, l--), s ? s.nextZ = r : n = r, r.prevZ = s, s = r;
      i = o;
    }
    s.nextZ = null, e *= 2;
  } while (t > 1);
  return n;
}
function Un(n, t, e, i, r) {
  return n = (n - e) * r | 0, t = (t - i) * r | 0, n = (n | n << 8) & 16711935, n = (n | n << 4) & 252645135, n = (n | n << 2) & 858993459, n = (n | n << 1) & 1431655765, t = (t | t << 8) & 16711935, t = (t | t << 4) & 252645135, t = (t | t << 2) & 858993459, t = (t | t << 1) & 1431655765, n | t << 1;
}
function ff(n) {
  let t = n, e = n;
  do
    (t.x < e.x || t.x === e.x && t.y < e.y) && (e = t), t = t.next;
  while (t !== n);
  return e;
}
function cs(n, t, e, i, r, s, o, a) {
  return (r - o) * (t - a) >= (n - o) * (s - a) && (n - o) * (i - a) >= (e - o) * (t - a) && (e - o) * (s - a) >= (r - o) * (i - a);
}
function st(n, t, e, i, r, s, o, a) {
  return !(n === o && t === a) && cs(n, t, e, i, r, s, o, a);
}
function uf(n, t) {
  return n.next.i !== t.i && n.prev.i !== t.i && !hf(n, t) && // doesn't intersect other edges
  (yt(n, t) && yt(t, n) && pf(n, t) && // locally visible
  (R(n.prev, n, t.prev) || R(n, t.prev, t)) || // does not create opposite-facing sectors
  He(n, t) && R(n.prev, n, n.next) > 0 && R(t.prev, t, t.next) > 0);
}
function R(n, t, e) {
  return (t.y - n.y) * (e.x - t.x) - (t.x - n.x) * (e.y - t.y);
}
function He(n, t) {
  return n.x === t.x && n.y === t.y;
}
function fs(n, t, e, i) {
  const r = Nt(R(n, t, e)), s = Nt(R(n, t, i)), o = Nt(R(e, i, n)), a = Nt(R(e, i, t));
  return !!(r !== s && o !== a || r === 0 && Lt(n, e, t) || s === 0 && Lt(n, i, t) || o === 0 && Lt(e, n, i) || a === 0 && Lt(e, t, i));
}
function Lt(n, t, e) {
  return t.x <= Math.max(n.x, e.x) && t.x >= Math.min(n.x, e.x) && t.y <= Math.max(n.y, e.y) && t.y >= Math.min(n.y, e.y);
}
function Nt(n) {
  return n > 0 ? 1 : n < 0 ? -1 : 0;
}
function hf(n, t) {
  let e = n;
  do {
    if (e.i !== n.i && e.next.i !== n.i && e.i !== t.i && e.next.i !== t.i && fs(e, e.next, n, t)) return !0;
    e = e.next;
  } while (e !== n);
  return !1;
}
function yt(n, t) {
  return R(n.prev, n, n.next) < 0 ? R(n, t, n.next) >= 0 && R(n, n.prev, t) >= 0 : R(n, t, n.prev) < 0 || R(n, n.next, t) < 0;
}
function pf(n, t) {
  let e = n, i = !1;
  const r = (n.x + t.x) / 2, s = (n.y + t.y) / 2;
  do
    e.y > s != e.next.y > s && e.next.y !== e.y && r < (e.next.x - e.x) * (s - e.y) / (e.next.y - e.y) + e.x && (i = !i), e = e.next;
  while (e !== n);
  return i;
}
function us(n, t) {
  const e = Vn(n.i, n.x, n.y), i = Vn(t.i, t.x, t.y), r = n.next, s = t.prev;
  return n.next = t, t.prev = n, e.next = r, r.prev = e, i.next = e, e.prev = i, s.next = i, i.prev = s, i;
}
function ci(n, t, e, i) {
  const r = Vn(n, t, e);
  return i ? (r.next = i.next, r.prev = i, i.next.prev = r, i.next = r) : (r.prev = r, r.next = r), r;
}
function xt(n) {
  n.next.prev = n.prev, n.prev.next = n.next, n.prevZ && (n.prevZ.nextZ = n.nextZ), n.nextZ && (n.nextZ.prevZ = n.prevZ);
}
function Vn(n, t, e) {
  return {
    i: n,
    // vertex index in coordinates array
    x: t,
    y: e,
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
function df(n, t, e, i) {
  let r = 0;
  for (let s = t, o = e - i; s < e; s += i)
    r += (n[o] - n[s]) * (n[s + 1] + n[o + 1]), o = s;
  return r;
}
class de {
  constructor(t, e) {
    if (e > t)
      throw new Error("Min granularity must not be greater than base granularity.");
    this._baseZoomGranularity = t, this._minGranularity = e;
  }
  getGranularityForZoomLevel(t) {
    const e = 1 << t;
    return Math.max(Math.floor(this._baseZoomGranularity / e), this._minGranularity, 1);
  }
}
const Wt = class Wt {
  constructor(t) {
    this.fill = t.fill, this.line = t.line, this.tile = t.tile, this.stencil = t.stencil, this.circle = t.circle;
  }
};
Wt.noSubdivision = new Wt({
  fill: new de(0, 0),
  line: new de(0, 0),
  tile: new de(0, 0),
  stencil: new de(0, 0),
  circle: 1
});
let jt = Wt;
const me = 3;
class Er {
  constructor(t, e, i) {
    const r = this.cells = [];
    if (t instanceof ArrayBuffer) {
      this.arrayBuffer = t;
      const o = new Int32Array(this.arrayBuffer);
      t = o[0], e = o[1], i = o[2], this.d = e + 2 * i;
      for (let c = 0; c < this.d * this.d; c++) {
        const f = o[me + c], u = o[me + c + 1];
        r.push(f === u ? null : o.subarray(f, u));
      }
      const a = o[me + r.length], l = o[me + r.length + 1];
      this.keys = o.subarray(a, l), this.bboxes = o.subarray(l), this.insert = this._insertReadonly;
    } else {
      this.d = e + 2 * i;
      for (let o = 0; o < this.d * this.d; o++)
        r.push([]);
      this.keys = [], this.bboxes = [];
    }
    this.n = e, this.extent = t, this.padding = i, this.scale = e / t, this.uid = 0;
    const s = i / e * t;
    this.min = -s, this.max = t + s;
  }
  insert(t, e, i, r, s) {
    this._forEachCell(e, i, r, s, this._insertCell, this.uid++, void 0, void 0), this.keys.push(t), this.bboxes.push(e), this.bboxes.push(i), this.bboxes.push(r), this.bboxes.push(s);
  }
  _insertReadonly() {
    throw new Error("Cannot insert into a GridIndex created from an ArrayBuffer.");
  }
  _insertCell(t, e, i, r, s, o) {
    this.cells[s].push(o);
  }
  query(t, e, i, r, s) {
    const o = this.min, a = this.max;
    if (t <= o && e <= o && a <= i && a <= r && !s)
      return [...this.keys];
    {
      const l = [], c = {};
      return this._forEachCell(t, e, i, r, this._queryCell, l, c, s), l;
    }
  }
  _queryCell(t, e, i, r, s, o, a, l) {
    const c = this.cells[s];
    if (c !== null) {
      const f = this.keys, u = this.bboxes;
      for (const h of c)
        if (a[h] === void 0) {
          const p = h * 4;
          (l ? l(u[p + 0], u[p + 1], u[p + 2], u[p + 3]) : t <= u[p + 2] && e <= u[p + 3] && i >= u[p + 0] && r >= u[p + 1]) ? (a[h] = !0, o.push(f[h])) : a[h] = !1;
        }
    }
  }
  _forEachCell(t, e, i, r, s, o, a, l) {
    const c = this._convertToCellCoord(t), f = this._convertToCellCoord(e), u = this._convertToCellCoord(i), h = this._convertToCellCoord(r);
    for (let p = c; p <= u; p++)
      for (let d = f; d <= h; d++) {
        const x = this.d * d + p;
        if (!(l && !l(
          this._convertFromCellCoord(p),
          this._convertFromCellCoord(d),
          this._convertFromCellCoord(p + 1),
          this._convertFromCellCoord(d + 1)
        )) && s.call(this, t, e, i, r, x, o, a, l))
          return;
      }
  }
  _convertFromCellCoord(t) {
    return (t - this.padding) / this.scale;
  }
  _convertToCellCoord(t) {
    return Math.max(0, Math.min(this.d - 1, Math.floor(t * this.scale) + this.padding));
  }
  toArrayBuffer() {
    if (this.arrayBuffer) return this.arrayBuffer;
    const t = this.cells, e = me + this.cells.length + 1 + 1;
    let i = 0;
    for (const o of this.cells)
      i += o.length;
    const r = new Int32Array(e + i + this.keys.length + this.bboxes.length);
    r[0] = this.extent, r[1] = this.n, r[2] = this.padding;
    let s = e;
    for (let o = 0; o < t.length; o++) {
      const a = t[o];
      r[me + o] = s, r.set(a, s), s += a.length;
    }
    return r[me + t.length] = s, r.set(this.keys, s), s += this.keys.length, r[me + t.length + 1] = s, r.set(this.bboxes, s), s += this.bboxes.length, r.buffer;
  }
  static serialize(t, e) {
    const i = t.toArrayBuffer();
    return e && e.push(i), { buffer: i };
  }
  static deserialize(t) {
    return new Er(t.buffer);
  }
}
class yf extends Error {
  /**
   * @param status - The response's HTTP status code.
   * @param statusText - The response's HTTP status text.
   * @param url - The request's URL.
   * @param body - The response's body.
   */
  constructor(t, e, i, r) {
    super(`AJAXError: ${e} (${t}): ${i}`), this.status = t, this.statusText = e, this.url = i, this.body = r;
  }
}
const fi = {};
function Y(n, t, e = {}) {
  if (fi[n]) throw new Error(`${n} is already registered.`);
  Object.defineProperty(t, "_classRegistryKey", {
    value: n,
    writeable: !1
  }), fi[n] = {
    klass: t,
    omit: e.omit || [],
    shallow: e.shallow || []
  };
}
Y("Object", Object);
Y("Set", Set);
Y("TransferableGridIndex", Er);
Y("Color", L);
Y("Error", Error);
Y("AJAXError", yf);
Y("ResolvedImage", pe);
Y("StylePropertyFunction", St);
Y("StyleExpression", br, { omit: ["_evaluator"] });
Y("ZoomDependentExpression", Pt);
Y("ZoomConstantExpression", qt);
Y("CompoundExpression", ne, { omit: ["_evaluate"] });
for (const n in je)
  je[n]._classRegistryKey || Y(`Expression_${n}`, je[n]);
Y("SubdivisionGranularityExpression", de);
Y("SubdivisionGranularitySetting", jt);
const Ue = -32768, it = 32767;
class xf {
  constructor(t, e) {
    this._vertexBuffer = [], this._vertexDictionary = /* @__PURE__ */ new Map(), this._used = !1, this._granularity = t, this._granularityCellSize = pt / t, this._canonical = e;
  }
  _getKey(t, e) {
    return t = t + 32768, e = e + 32768, t << 16 | e << 0;
  }
  /**
   * Returns an index into the internal vertex buffer for a vertex at the given coordinates.
   * If the internal vertex buffer contains no such vertex, then it is added.
   */
  _vertexToIndex(t, e) {
    if (t < -32768 || e < -32768 || t > 32767 || e > 32767)
      throw new Error("Vertex coordinates are out of signed 16 bit integer range.");
    const i = Math.round(t) | 0, r = Math.round(e) | 0, s = this._getKey(i, r);
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
  _subdivideTrianglesScanline(t) {
    if (this._granularity < 2)
      return vf(this._vertexBuffer, t);
    const e = [], i = t.length;
    for (let r = 0; r < i; r += 3) {
      const s = [
        t[r + 0],
        // v0
        t[r + 1],
        // v1
        t[r + 2]
        // v2
      ], o = [
        this._vertexBuffer[t[r + 0] * 2 + 0],
        // v0.x
        this._vertexBuffer[t[r + 0] * 2 + 1],
        // v0.y
        this._vertexBuffer[t[r + 1] * 2 + 0],
        // v1.x
        this._vertexBuffer[t[r + 1] * 2 + 1],
        // v1.y
        this._vertexBuffer[t[r + 2] * 2 + 0],
        // v2.x
        this._vertexBuffer[t[r + 2] * 2 + 1]
        // v2.y
      ];
      let a = 1 / 0, l = 1 / 0, c = -1 / 0, f = -1 / 0;
      for (let x = 0; x < 3; x++) {
        const y = o[x * 2], v = o[x * 2 + 1];
        a = Math.min(a, y), c = Math.max(c, y), l = Math.min(l, v), f = Math.max(f, v);
      }
      if (a === c || l === f)
        continue;
      const u = Math.floor(a / this._granularityCellSize), h = Math.ceil(c / this._granularityCellSize), p = Math.floor(l / this._granularityCellSize), d = Math.ceil(f / this._granularityCellSize);
      if (u === h && p === d) {
        e.push(...s);
        continue;
      }
      for (let x = p; x < d; x++) {
        const y = this._scanlineGenerateVertexRingForCellRow(x, o, s);
        wf(this._vertexBuffer, y, e);
      }
    }
    return e;
  }
  /**
   * Takes a triangle and a cell row index, returns a subdivided vertex ring of the intersection of the triangle and the cell row.
   * @param cellRow - Index of the cell row. A cell row of index `i` convert range from `i * granularityCellSize` to `(i + 1) * granularityCellSize`.
   * @param triangleVertices - An array of 6 elements, contains flattened positions of the triangle's vertices: `[v0x, v0y, v1x, v1y, v2x, v2y]`.
   * @param triangleIndices - An array of 3 elements, contains the original indices of the triangle's vertices: `[index0, index1, index2]`.
   * @returns The resulting ring of vertex indices and the index (to the returned ring array) of the leftmost vertex in the ring.
   */
  _scanlineGenerateVertexRingForCellRow(t, e, i) {
    const r = t * this._granularityCellSize, s = r + this._granularityCellSize, o = [];
    for (let a = 0; a < 3; a++) {
      const l = e[a * 2], c = e[a * 2 + 1], f = e[(a + 1) * 2 % 6], u = e[((a + 1) * 2 + 1) % 6], h = e[(a + 2) * 2 % 6], p = e[((a + 2) * 2 + 1) % 6], d = f - l, x = u - c, y = d === 0, v = x === 0, T = (r - c) / x, m = (s - c) / x, g = Math.min(T, m), b = Math.max(T, m);
      if (!v && (g >= 1 || b <= 0) || v && (c < r || c > s)) {
        u >= r && u <= s && o.push(i[(a + 1) % 3]);
        continue;
      }
      if (!v && g > 0) {
        const _ = l + d * g, C = c + x * g;
        o.push(this._vertexToIndex(_, C));
      }
      const I = l + d * Math.max(g, 0), S = l + d * Math.min(b, 1);
      if (y || this._generateIntraEdgeVertices(o, l, c, f, u, I, S), !v && b < 1) {
        const _ = l + d * b, C = c + x * b;
        o.push(this._vertexToIndex(_, C));
      }
      (v || u >= r && u <= s) && o.push(i[(a + 1) % 3]), !v && (u <= r || u >= s) && this._generateInterEdgeVertices(
        o,
        l,
        c,
        f,
        u,
        h,
        p,
        S,
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
  _generateIntraEdgeVertices(t, e, i, r, s, o, a) {
    const l = r - e, c = s - i, f = c === 0, u = f ? Math.min(e, r) : Math.min(o, a), h = f ? Math.max(e, r) : Math.max(o, a), p = Math.floor(u / this._granularityCellSize) + 1, d = Math.ceil(h / this._granularityCellSize) - 1;
    if (f ? e < r : o < a)
      for (let y = p; y <= d; y++) {
        const v = y * this._granularityCellSize, T = i + c * (v - e) / l;
        t.push(this._vertexToIndex(v, T));
      }
    else
      for (let y = d; y >= p; y--) {
        const v = y * this._granularityCellSize, T = i + c * (v - e) / l;
        t.push(this._vertexToIndex(v, T));
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
  _generateInterEdgeVertices(t, e, i, r, s, o, a, l, c, f) {
    const u = s - i, h = o - r, p = a - s, d = (c - s) / p, x = (f - s) / p, y = Math.min(d, x), v = Math.max(d, x), T = r + h * y;
    let m = Math.floor(Math.min(T, l) / this._granularityCellSize) + 1, g = Math.ceil(Math.max(T, l) / this._granularityCellSize) - 1, b = l < T;
    const I = p === 0;
    if (I && (a === c || a === f))
      return;
    if (I || y >= 1 || v <= 0) {
      const _ = e - o, C = i - a, q = (c - a) / C, K = (f - a) / C, De = Math.min(q, K), ee = o + _ * De;
      m = Math.floor(Math.min(ee, l) / this._granularityCellSize) + 1, g = Math.ceil(Math.max(ee, l) / this._granularityCellSize) - 1, b = l < ee;
    }
    const S = u > 0 ? f : c;
    if (b)
      for (let _ = m; _ <= g; _++) {
        const C = _ * this._granularityCellSize;
        t.push(this._vertexToIndex(C, S));
      }
    else
      for (let _ = g; _ >= m; _--) {
        const C = _ * this._granularityCellSize;
        t.push(this._vertexToIndex(C, S));
      }
  }
  /**
   * Generates an outline for a given polygon, returns a list of arrays of line indices.
   */
  _generateOutline(t) {
    const e = [];
    for (const i of t) {
      const r = hs(i, this._granularity, !0), s = this._pointArrayToIndices(r), o = [];
      for (let a = 1; a < s.length; a++)
        o.push(s[a - 1]), o.push(s[a]);
      e.push(o);
    }
    return e;
  }
  /**
   * Adds pole geometry if needed.
   * @param subdividedTriangles - Array of generated triangle indices, new pole geometry is appended here.
   */
  _handlePoles(t) {
    let e = !1, i = !1;
    this._canonical && (this._canonical.y === 0 && (e = !0), this._canonical.y === (1 << this._canonical.z) - 1 && (i = !0)), (e || i) && this._fillPoles(t, e, i);
  }
  /**
   * Checks the internal vertex buffer for all vertices that might lie on the special pole coordinates and shifts them by one unit.
   * Use for removing unintended pole vertices that might have been created during subdivision. After calling this function, actual pole vertices can be safely generated.
   */
  _ensureNoPoleVertices() {
    const t = this._vertexBuffer;
    for (let e = 0; e < t.length; e += 2) {
      const i = t[e + 1];
      i === Ue && (t[e + 1] = Ue + 1), i === it && (t[e + 1] = it - 1);
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
  _generatePoleQuad(t, e, i, r, s, o) {
    r > s != (o === Ue) ? (t.push(e), t.push(i), t.push(this._vertexToIndex(r, o)), t.push(i), t.push(this._vertexToIndex(s, o)), t.push(this._vertexToIndex(r, o))) : (t.push(i), t.push(e), t.push(this._vertexToIndex(r, o)), t.push(this._vertexToIndex(s, o)), t.push(i), t.push(this._vertexToIndex(r, o)));
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
  _fillPoles(t, e, i) {
    const r = this._vertexBuffer, s = 0, o = pt, a = t.length;
    for (let l = 2; l < a; l += 3) {
      const c = t[l - 2], f = t[l - 1], u = t[l], h = r[c * 2], p = r[c * 2 + 1], d = r[f * 2], x = r[f * 2 + 1], y = r[u * 2], v = r[u * 2 + 1];
      e && (p === s && x === s && this._generatePoleQuad(t, c, f, h, d, Ue), x === s && v === s && this._generatePoleQuad(t, f, u, d, y, Ue), v === s && p === s && this._generatePoleQuad(t, u, c, y, h, Ue)), i && (p === o && x === o && this._generatePoleQuad(t, c, f, h, d, it), x === o && v === o && this._generatePoleQuad(t, f, u, d, y, it), v === o && p === o && this._generatePoleQuad(t, u, c, y, h, it));
    }
  }
  /**
   * Adds all vertices in the supplied flattened vertex buffer into the internal vertex buffer.
   */
  _initializeVertices(t) {
    for (let e = 0; e < t.length; e += 2)
      this._vertexToIndex(t[e], t[e + 1]);
  }
  /**
   * Subdivides an input mesh. Imagine a regular square grid with the target granularity overlaid over the mesh - this is the subdivision's result.
   * Assumes a mesh of tile features - vertex coordinates are integers, visible range where subdivision happens is 0..8192.
   * @param polygon - The input polygon, specified as a list of vertex rings.
   * @param generateOutlineLines - When true, also generates line indices for outline of the supplied polygon.
   * @returns Vertex and index buffers with subdivision applied.
   */
  subdividePolygonInternal(t, e) {
    if (this._used)
      throw new Error("Subdivision: multiple use not allowed.");
    this._used = !0;
    const { flattened: i, holeIndices: r } = mf(t);
    this._initializeVertices(i);
    let s;
    try {
      const a = Qc(i, r), l = this._convertIndices(i, a);
      s = this._subdivideTrianglesScanline(l);
    } catch (a) {
      console.error(a);
    }
    let o = [];
    return e && (o = this._generateOutline(t)), this._ensureNoPoleVertices(), this._handlePoles(s), {
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
  _convertIndices(t, e) {
    const i = [];
    for (const r of e) {
      const s = t[r * 2], o = t[r * 2 + 1];
      i.push(this._vertexToIndex(s, o));
    }
    return i;
  }
  /**
   * Converts an array of points into an array of indices into the internal vertex buffer (`_finalVertices`).
   */
  _pointArrayToIndices(t) {
    const e = [];
    for (const i of t)
      e.push(this._vertexToIndex(i.x, i.y));
    return e;
  }
}
function gf(n, t, e, i = !0) {
  return new xf(e, t).subdividePolygonInternal(n, i);
}
function hs(n, t, e = !1) {
  if (!n || n.length < 1)
    return [];
  if (n.length < 2)
    return [];
  const i = n[0], r = n[n.length - 1], s = e && (i.x !== r.x || i.y !== r.y);
  if (t < 2)
    return s ? [...n, n[0]] : [...n];
  const o = Math.floor(pt / t), a = [];
  a.push(new B(n[0].x, n[0].y));
  const l = n.length, c = s ? l : l - 1;
  for (let f = 0; f < c; f++) {
    const u = n[f], h = f < l - 1 ? n[f + 1] : n[0], p = u.x, d = u.y, x = h.x, y = h.y, v = p !== x, T = d !== y;
    if (!v && !T)
      continue;
    const m = x - p, g = y - d, b = Math.abs(m), I = Math.abs(g);
    let S = p, _ = d;
    for (; ; ) {
      const q = m > 0 ? (Math.floor(S / o) + 1) * o : (Math.ceil(S / o) - 1) * o, K = g > 0 ? (Math.floor(_ / o) + 1) * o : (Math.ceil(_ / o) - 1) * o, De = Math.abs(S - q), ee = Math.abs(_ - K), se = Math.abs(S - x), Et = Math.abs(_ - y), nt = v ? De / b : Number.POSITIVE_INFINITY, Fr = T ? ee / I : Number.POSITIVE_INFINITY;
      if ((se <= De || !v) && (Et <= ee || !T))
        break;
      if (nt < Fr && v || !T) {
        S = q, _ = _ + g * nt;
        const Se = new B(S, Math.round(_));
        (a[a.length - 1].x !== Se.x || a[a.length - 1].y !== Se.y) && a.push(Se);
      } else {
        S = S + m * Fr, _ = K;
        const Se = new B(Math.round(S), _);
        (a[a.length - 1].x !== Se.x || a[a.length - 1].y !== Se.y) && a.push(Se);
      }
    }
    const C = new B(x, y);
    (a[a.length - 1].x !== C.x || a[a.length - 1].y !== C.y) && a.push(C);
  }
  return a;
}
function mf(n) {
  const t = [], e = [];
  for (const i of n)
    if (i.length !== 0) {
      i !== n[0] && t.push(e.length / 2);
      for (const r of i)
        e.push(r.x), e.push(r.y);
    }
  return {
    flattened: e,
    holeIndices: t
  };
}
function vf(n, t) {
  const e = [];
  for (let i = 0; i < t.length; i += 3) {
    const r = t[i], s = t[i + 1], o = t[i + 2], a = n[r * 2], l = n[r * 2 + 1], c = n[s * 2], f = n[s * 2 + 1], u = n[o * 2], h = n[o * 2 + 1], p = c - a, d = f - l, x = u - a, y = h - l;
    p * y - d * x > 0 ? (e.push(r), e.push(o), e.push(s)) : (e.push(r), e.push(s), e.push(o));
  }
  return e;
}
function wf(n, t, e) {
  if (t.length === 0)
    throw new Error("Subdivision vertex ring is empty.");
  let i = 0, r = n[t[0] * 2];
  for (let l = 1; l < t.length; l++) {
    const c = n[t[l] * 2];
    c < r && (r = c, i = l);
  }
  const s = t.length;
  let o = i, a = (o + 1) % s;
  for (; ; ) {
    const l = o - 1 >= 0 ? o - 1 : s - 1, c = (a + 1) % s, f = n[t[l] * 2], u = n[t[l] * 2 + 1], h = n[t[c] * 2], p = n[t[c] * 2 + 1], d = n[t[o] * 2], x = n[t[o] * 2 + 1], y = n[t[a] * 2], v = n[t[a] * 2 + 1];
    let T = !1;
    if (f < h)
      T = !0;
    else if (f > h)
      T = !1;
    else {
      const m = v - x, g = -(y - d), b = x < v ? 1 : -1, I = ((f - d) * m + (u - x) * g) * b, S = ((h - d) * m + (p - x) * g) * b;
      I > S && (T = !0);
    }
    if (T) {
      const m = t[l], g = t[o], b = t[a];
      m !== g && m !== b && g !== b && e.push(b, g, m), o--, o < 0 && (o = s - 1);
    } else {
      const m = t[c], g = t[o], b = t[a];
      m !== g && m !== b && g !== b && e.push(b, g, m), a++, a >= s && (a = 0);
    }
    if (l === c)
      break;
  }
}
const ps = {
  globe: new jt({
    fill: new de(128, 2),
    line: new de(512, 0),
    // Always keep at least some subdivision on raster tiles, etc,
    // otherwise they will be visibly warped at high zooms (before mercator transition).
    // This si not needed on fill, because fill geometry tends to already be
    // highly tessellated and granular at high zooms.
    tile: new de(128, 32),
    // Stencil granularity must never be higher than fill granularity,
    // otherwise we would get seams in the oceans at zoom levels where
    // stencil has higher granularity than fill.
    stencil: new de(128, 1),
    circle: 3
  })
}, bf = 6378137, ui = 0.06694379990141316;
function ds(n, t, e, i) {
  const r = n * Math.PI / 180, s = t * Math.PI / 180, o = Math.sin(s), a = Math.cos(s), l = bf / Math.sqrt(1 - ui * o * o), c = (l + e) * a * Math.cos(r), f = (l + e) * a * Math.sin(r), u = (l * (1 - ui) + e) * o, h = i || new Float64Array(3);
  return h[0] = c, h[1] = f, h[2] = u, h;
}
function Tf(n) {
  const t = n[0], e = n[1], i = n[2], r = Math.sqrt(t * t + e * e + i * i);
  return r > 0 && (n[0] = t / r, n[1] = e / r, n[2] = i / r), n;
}
const If = Yt.paint_fill, Sf = Yt.paint_line, Ef = Yt.layout_symbol, kf = Yt.paint_symbol;
function ys(n, t) {
  const e = /* @__PURE__ */ new Map();
  if (!n || !t) return e;
  for (const i of Object.keys(t)) {
    const r = t[i], s = n[i], o = as.normalizePropertyExpression(
      s === void 0 ? r.default : s,
      r
    );
    e.set(i, o);
  }
  return e;
}
function Me(n, t, e, i) {
  const r = n.get(t);
  return r ? r.evaluate({ zoom: e }, i) : void 0;
}
function Ff(n, t, e) {
  const i = ys(n.paint, If), r = Me(i, "fill-color", t, e), s = Me(i, "fill-opacity", t, e) ?? 1;
  return {
    fillColor: r || { r: 0, g: 0, b: 0, a: 1 },
    fillOpacity: s
  };
}
function Af(n, t, e) {
  const i = ys(n.paint, Sf), r = Me(i, "line-width", t, e) ?? 1, s = Me(i, "line-color", t, e) || {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  }, o = Me(i, "line-opacity", t, e) ?? 1;
  return { lineWidth: r, lineColor: s, lineOpacity: o };
}
function Zt(n, t = 1) {
  const e = n.a != null ? n.a : 1, i = e > 0 ? 1 / e : 1, r = new Uint8Array(4);
  return r[0] = Math.round((n.r != null ? n.r : 0) * i * 255), r[1] = Math.round((n.g != null ? n.g : 0) * i * 255), r[2] = Math.round((n.b != null ? n.b : 0) * i * 255), r[3] = Math.floor(e * t * 255), r;
}
function xs(n, t) {
  const e = /* @__PURE__ */ new Map();
  if (!n || !t) return e;
  for (const i of Object.keys(t)) {
    const r = t[i], s = n[i], o = as.normalizePropertyExpression(
      s === void 0 ? r.default : s,
      r
    );
    e.set(i, o);
  }
  return e;
}
function _f(n, t, e) {
  const i = n.layout || {}, r = xs(i, Ef), s = (c) => Me(r, c, t, e);
  let a = s("text-field");
  if (typeof a == "string")
    a = hi(e.properties || {}, a);
  else if (a && a.sections) {
    for (const c of a.sections)
      c.text = hi(e.properties || {}, c.text);
    a = a.toString();
  }
  const l = s("text-transform");
  return l === "uppercase" ? a = String(a).toUpperCase() : l === "lowercase" && (a = String(a).toLowerCase()), {
    text: a || "",
    font: s("text-font") || "Open Sans Regular, Arial Unicode MS Regular",
    textSize: s("text-size") ?? 16,
    textAnchor: s("text-anchor") || "center",
    textOffset: s("text-offset") || [0, 0]
  };
}
function Cf(n, t, e) {
  const i = n.paint || {}, r = xs(i, kf), s = (c) => Me(r, c, t, e), o = s("text-color") || { r: 0, g: 0, b: 0, a: 1 }, a = s("text-halo-color") || { r: 0, g: 0, b: 0, a: 1 }, l = s("text-halo-width") ?? 0;
  return {
    textColor: o,
    outlineColor: a,
    outlineWidth: l
  };
}
function hi(n, t) {
  return String(t).replace(
    /\{([^{}]+)\}/g,
    (e, i) => n && i in n ? String(n[i]) : ""
  );
}
function Of(n, t) {
  return t === "mlt" ? new hl(n) : new Is(new ks(n));
}
function Lf(n) {
  const {
    sources: t = {},
    x: e,
    y: i,
    z: r,
    extent: s = pt,
    styleLayers: o = []
  } = n, a = {};
  for (const c in t) {
    const { buffer: f, encoding: u } = t[c];
    f && (a[c] = Of(f, u || "mvt"));
  }
  const l = { fill: [], line: [], symbol: [] };
  for (const c of o) {
    if (c.type === "background") continue;
    const f = a[c.source];
    if (!f) continue;
    const u = c.sourceLayer ?? c["source-layer"], h = f.layers[u];
    if (!h) continue;
    const p = c.filter ? Vc(c.filter) : null, d = [], x = h.length;
    for (let v = 0; v < x; v++) {
      const T = h.feature(v);
      p && !p.filter({ zoom: r }, T) || d.push({ index: v, feature: T, layerSpec: c });
    }
    const y = c.type;
    (y === "fill" || y === "line" || y === "symbol") && l[y].push({
      layerId: c.id,
      source: c.source,
      sourceLayer: u,
      styleLayer: c,
      extent: s,
      x: e,
      y: i,
      z: r,
      features: d
    });
  }
  return Nf(l, s, e, i, r);
}
function kr(n, t, e, i, r, s) {
  return s[0] = (n + i) * 360 / e - 180, s[1] = 360 / Math.PI * Math.atan(Math.exp((1 - (t + r) * 2 / e) * Math.PI)) - 90, s;
}
function Nf(n, t, e, i, r) {
  const s = { fill: [], line: [], symbol: [] }, o = t * Math.pow(2, r), a = t * e, l = t * i, c = { x: e, y: i, z: r };
  for (const f of n.fill || []) {
    const u = $f(f, t, o, a, l, c);
    s.fill.push({
      layerId: f.layerId,
      source: f.source,
      sourceLayer: f.sourceLayer,
      styleLayer: f.styleLayer,
      batches: u,
      firstBatchId: 0,
      lastBatchId: u.length - 1
    });
  }
  for (const f of n.line || []) {
    const u = Df(f, t, o, a, l);
    s.line.push({
      layerId: f.layerId,
      source: f.source,
      sourceLayer: f.sourceLayer,
      styleLayer: f.styleLayer,
      batches: u,
      firstBatchId: 0,
      lastBatchId: u.length - 1
    });
  }
  for (const f of n.symbol || []) {
    const u = Mf(f, t, o, a, l);
    s.symbol.push({
      layerId: f.layerId,
      source: f.source,
      sourceLayer: f.sourceLayer,
      styleLayer: f.styleLayer,
      placements: u,
      firstBatchId: 0,
      lastBatchId: 0
    });
  }
  return s;
}
function Mf(n, t, e, i, r) {
  const { features: s, styleLayer: o, z: a } = n, l = [0, 0], c = [];
  for (const { feature: f } of s) {
    const u = gt.types[f.type];
    if (u !== "Point" && u !== "Unknown") continue;
    const h = Sr(f);
    if (!h.length || !h[0].length) continue;
    const p = _f(o, a, f);
    if (!p.text) continue;
    const d = Cf(o, a, f), x = Zt(d.textColor), y = Zt(d.outlineColor), v = h[0];
    for (let T = 0; T < v.length; T++) {
      const m = v[T];
      kr(m.x, m.y, e, i, r, l), c.push({
        coord: [l[0], l[1]],
        text: p.text,
        font: p.font,
        textSize: p.textSize,
        textColorBytes: Array.from(x),
        outlineWidth: d.outlineWidth,
        outlineColorBytes: Array.from(y),
        textOffset: p.textOffset,
        textAnchor: p.textAnchor,
        id: f.id ?? f.properties?.id ?? null,
        properties: f.properties || {}
      });
    }
  }
  return c;
}
function $f(n, t, e, i, r, s) {
  const { features: o, styleLayer: a, z: l } = n, c = ps.globe.line.getGranularityForZoomLevel(l) / 2, f = [0, 0], u = new Float64Array(3), h = [];
  let p = 0;
  for (const { feature: d } of o) {
    if (gt.types[d.type] !== "Polygon") continue;
    const x = Ff(a, l, d), y = x.fillColor, v = x.fillOpacity, T = Zt(y, v), m = Sr(d), g = pi(m);
    for (const b of g) {
      if (b.some((ee) => ee.length < 3)) continue;
      const I = gf(
        b,
        s,
        c,
        !1
      ), S = I.verticesFlattened, _ = S.length / 2, C = new Float64Array(_ * 3), q = new Float32Array(_ * 3), K = new Float32Array(_ * 2);
      for (let ee = 0, se = 0; ee < S.length; ee += 2, se++) {
        const Et = S[ee], nt = S[ee + 1];
        kr(Et, nt, e, i, r, f), ds(f[0], f[1], 0, u), C[se * 3] = u[0], C[se * 3 + 1] = u[1], C[se * 3 + 2] = u[2], Tf(u), q[se * 3] = u[0], q[se * 3 + 1] = u[1], q[se * 3 + 2] = u[2], K[se * 2] = Et / t, K[se * 2 + 1] = nt / t;
      }
      const De = new (_ > 65535 ? Uint32Array : _ > 255 ? Uint16Array : Uint8Array)(I.indicesTriangles);
      h.push({
        batchId: p++,
        positions: C,
        normals: q,
        st: K,
        indices: De,
        colorBytes: T,
        id: d.id ?? d.properties?.id ?? null,
        properties: d.properties || {}
      });
    }
  }
  return h;
}
function Df(n, t, e, i, r) {
  const { features: s, styleLayer: o, z: a } = n, l = ps.globe.line.getGranularityForZoomLevel(a), c = [0, 0], f = new Float64Array(3), u = [];
  let h = 0;
  for (const { feature: p } of s) {
    const d = gt.types[p.type];
    if (d === "Point" || d === "Unknown") continue;
    const x = Af(o, a, p), y = Zt(x.lineColor, x.lineOpacity), v = Sr(p);
    for (let T = 0; T < v.length; T++) {
      const m = hs(v[T], l, !1);
      if (m.length < 2) continue;
      const g = new Float64Array(m.length * 3);
      for (let b = 0; b < m.length; b++) {
        const I = m[b];
        kr(I.x, I.y, e, i, r, c), ds(c[0], c[1], 0, f), g[b * 3] = f[0], g[b * 3 + 1] = f[1], g[b * 3 + 2] = f[2];
      }
      u.push({
        batchId: h++,
        positions: g,
        colorBytes: y,
        lineWidth: x.lineWidth,
        id: p.id ?? p.properties?.id ?? null,
        properties: p.properties || {}
      });
    }
  }
  return u;
}
self.onmessage = function(n) {
  const { id: t, parameters: e } = n.data, i = [];
  try {
    const r = Lf(e);
    Rf(r, i), self.postMessage({ id: t, result: r }, i);
  } catch (r) {
    self.postMessage({ id: t, result: { error: String(r.message || r) } }, []);
  }
};
function Rf(n, t) {
  if (n)
    for (const e of ["fill", "line"]) {
      const i = n[e];
      if (Array.isArray(i))
        for (const r of i) {
          const s = r.batches;
          if (Array.isArray(s))
            for (const o of s)
              o.positions?.buffer && t.push(o.positions.buffer), o.normals?.buffer && t.push(o.normals.buffer), o.st?.buffer && t.push(o.st.buffer), o.indices?.buffer && t.push(o.indices.buffer);
        }
    }
}
//# sourceMappingURL=cvt-gl-worker.js.map
