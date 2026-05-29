/*!
 * Cesium - https://cesium.com
 * Version 1.137.0
 * 
 * Copyright 2011-2026 Cesium Contributors
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  CoplanarPolygonGeometryLibrary_default
} from "./chunk-JEOXRBFO.js";
import "./chunk-RXCTRKU3.js";
import {
  PolygonGeometryLibrary_default
} from "./chunk-66JRJZ4H.js";
import "./chunk-KWK5AVNT.js";
import {
  GeometryInstance_default
} from "./chunk-FK5TZ45B.js";
import {
  GeometryPipeline_default
} from "./chunk-PVEFLBYY.js";
import "./chunk-SVPORG7B.js";
import "./chunk-66LAF3ZX.js";
import "./chunk-W645XC5K.js";
import "./chunk-64Q6235W.js";
import "./chunk-ZH7JBVZ7.js";
import {
  arrayRemoveDuplicates_default
} from "./chunk-5INGCBAN.js";
import "./chunk-AXK43D3B.js";
import "./chunk-M64ZKJHQ.js";
import "./chunk-HZHR5B4M.js";
import {
  IndexDatatype_default
} from "./chunk-YQ4Z43IN.js";
import {
  GeometryAttributes_default
} from "./chunk-5DDO7UL5.js";
import {
  GeometryAttribute_default,
  Geometry_default,
  PrimitiveType_default
} from "./chunk-PZZAOVA5.js";
import {
  BoundingSphere_default
} from "./chunk-GA2ZXFEP.js";
import "./chunk-SITCUP3J.js";
import "./chunk-WO3SEI5S.js";
import "./chunk-2X3NGMUO.js";
import {
  ComponentDatatype_default
} from "./chunk-PHIOGTEW.js";
import "./chunk-ILBAYOZH.js";
import "./chunk-MX7R2IBB.js";
import {
  Ellipsoid_default
} from "./chunk-FDGVJAVG.js";
import {
  Cartesian3_default,
  Frozen_default
} from "./chunk-5GFZCYQN.js";
import "./chunk-EZDL4M2Q.js";
import {
  Check_default
} from "./chunk-UCEOPUAR.js";
import {
  defined_default
} from "./chunk-AMQS2QOC.js";

// packages/engine/Source/Core/CoplanarPolygonOutlineGeometry.js
function createGeometryFromPositions(positions) {
  const length = positions.length;
  const flatPositions = new Float64Array(length * 3);
  const indices = IndexDatatype_default.createTypedArray(length, length * 2);
  let positionIndex = 0;
  let index = 0;
  for (let i = 0; i < length; i++) {
    const position = positions[i];
    flatPositions[positionIndex++] = position.x;
    flatPositions[positionIndex++] = position.y;
    flatPositions[positionIndex++] = position.z;
    indices[index++] = i;
    indices[index++] = (i + 1) % length;
  }
  const attributes = new GeometryAttributes_default({
    position: new GeometryAttribute_default({
      componentDatatype: ComponentDatatype_default.DOUBLE,
      componentsPerAttribute: 3,
      values: flatPositions
    })
  });
  return new Geometry_default({
    attributes,
    indices,
    primitiveType: PrimitiveType_default.LINES
  });
}
function CoplanarPolygonOutlineGeometry(options) {
  options = options ?? Frozen_default.EMPTY_OBJECT;
  const polygonHierarchy = options.polygonHierarchy;
  Check_default.defined("options.polygonHierarchy", polygonHierarchy);
  this._polygonHierarchy = polygonHierarchy;
  this._workerName = "createCoplanarPolygonOutlineGeometry";
  this.packedLength = PolygonGeometryLibrary_default.computeHierarchyPackedLength(
    polygonHierarchy,
    Cartesian3_default
  ) + 1;
}
CoplanarPolygonOutlineGeometry.fromPositions = function(options) {
  options = options ?? Frozen_default.EMPTY_OBJECT;
  Check_default.defined("options.positions", options.positions);
  const newOptions = {
    polygonHierarchy: {
      positions: options.positions
    }
  };
  return new CoplanarPolygonOutlineGeometry(newOptions);
};
CoplanarPolygonOutlineGeometry.pack = function(value, array, startingIndex) {
  Check_default.typeOf.object("value", value);
  Check_default.defined("array", array);
  startingIndex = startingIndex ?? 0;
  startingIndex = PolygonGeometryLibrary_default.packPolygonHierarchy(
    value._polygonHierarchy,
    array,
    startingIndex,
    Cartesian3_default
  );
  array[startingIndex] = value.packedLength;
  return array;
};
var scratchOptions = {
  polygonHierarchy: {}
};
CoplanarPolygonOutlineGeometry.unpack = function(array, startingIndex, result) {
  Check_default.defined("array", array);
  startingIndex = startingIndex ?? 0;
  const polygonHierarchy = PolygonGeometryLibrary_default.unpackPolygonHierarchy(
    array,
    startingIndex,
    Cartesian3_default
  );
  startingIndex = polygonHierarchy.startingIndex;
  delete polygonHierarchy.startingIndex;
  const packedLength = array[startingIndex];
  if (!defined_default(result)) {
    result = new CoplanarPolygonOutlineGeometry(scratchOptions);
  }
  result._polygonHierarchy = polygonHierarchy;
  result.packedLength = packedLength;
  return result;
};
CoplanarPolygonOutlineGeometry.createGeometry = function(polygonGeometry) {
  const polygonHierarchy = polygonGeometry._polygonHierarchy;
  let outerPositions = polygonHierarchy.positions;
  outerPositions = arrayRemoveDuplicates_default(
    outerPositions,
    Cartesian3_default.equalsEpsilon,
    true
  );
  if (outerPositions.length < 3) {
    return;
  }
  const isValid = CoplanarPolygonGeometryLibrary_default.validOutline(outerPositions);
  if (!isValid) {
    return void 0;
  }
  const polygons = PolygonGeometryLibrary_default.polygonOutlinesFromHierarchy(
    polygonHierarchy,
    false
  );
  if (polygons.length === 0) {
    return void 0;
  }
  const geometries = [];
  for (let i = 0; i < polygons.length; i++) {
    const geometryInstance = new GeometryInstance_default({
      geometry: createGeometryFromPositions(polygons[i])
    });
    geometries.push(geometryInstance);
  }
  const geometry = GeometryPipeline_default.combineInstances(geometries)[0];
  const boundingSphere = BoundingSphere_default.fromPoints(polygonHierarchy.positions);
  return new Geometry_default({
    attributes: geometry.attributes,
    indices: geometry.indices,
    primitiveType: geometry.primitiveType,
    boundingSphere
  });
};
var CoplanarPolygonOutlineGeometry_default = CoplanarPolygonOutlineGeometry;

// packages/engine/Source/Workers/createCoplanarPolygonOutlineGeometry.js
function createCoplanarPolygonOutlineGeometry(polygonGeometry, offset) {
  if (defined_default(offset)) {
    polygonGeometry = CoplanarPolygonOutlineGeometry_default.unpack(
      polygonGeometry,
      offset
    );
  }
  polygonGeometry._ellipsoid = Ellipsoid_default.clone(polygonGeometry._ellipsoid);
  return CoplanarPolygonOutlineGeometry_default.createGeometry(polygonGeometry);
}
var createCoplanarPolygonOutlineGeometry_default = createCoplanarPolygonOutlineGeometry;
export {
  createCoplanarPolygonOutlineGeometry_default as default
};
