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
  Cesium3DTilesTerrainGeometryProcessor_default
} from "./chunk-325UASON.js";
import "./chunk-MWINWIZU.js";
import "./chunk-6HGL3Y55.js";
import {
  createTaskProcessorWorker_default
} from "./chunk-I2XP4NKU.js";
import "./chunk-FFR7IJ3A.js";
import "./chunk-RXCTRKU3.js";
import "./chunk-SVPORG7B.js";
import "./chunk-W645XC5K.js";
import "./chunk-64Q6235W.js";
import "./chunk-M64ZKJHQ.js";
import "./chunk-HZHR5B4M.js";
import "./chunk-YQ4Z43IN.js";
import "./chunk-GA2ZXFEP.js";
import "./chunk-SITCUP3J.js";
import "./chunk-WO3SEI5S.js";
import "./chunk-2X3NGMUO.js";
import "./chunk-PHIOGTEW.js";
import "./chunk-ILBAYOZH.js";
import "./chunk-MX7R2IBB.js";
import "./chunk-FDGVJAVG.js";
import "./chunk-5GFZCYQN.js";
import "./chunk-EZDL4M2Q.js";
import "./chunk-UCEOPUAR.js";
import "./chunk-AMQS2QOC.js";

// packages/engine/Source/Workers/upsampleVerticesFromCesium3DTilesTerrain.js
function upsampleVerticesFromCesium3DTilesTerrain(options, transferableObjects) {
  const mesh = Cesium3DTilesTerrainGeometryProcessor_default.upsampleMesh(options);
  const verticesBuffer = mesh.vertices.buffer;
  const indicesBuffer = mesh.indices.buffer;
  const westIndicesBuffer = mesh.westIndicesSouthToNorth.buffer;
  const southIndicesBuffer = mesh.southIndicesEastToWest.buffer;
  const eastIndicesBuffer = mesh.eastIndicesNorthToSouth.buffer;
  const northIndicesBuffer = mesh.northIndicesWestToEast.buffer;
  transferableObjects.push(
    verticesBuffer,
    indicesBuffer,
    westIndicesBuffer,
    southIndicesBuffer,
    eastIndicesBuffer,
    northIndicesBuffer
  );
  const result = {
    verticesBuffer,
    indicesBuffer,
    vertexCountWithoutSkirts: mesh.vertexCountWithoutSkirts,
    indexCountWithoutSkirts: mesh.indexCountWithoutSkirts,
    encoding: mesh.encoding,
    westIndicesBuffer,
    southIndicesBuffer,
    eastIndicesBuffer,
    northIndicesBuffer,
    minimumHeight: mesh.minimumHeight,
    maximumHeight: mesh.maximumHeight,
    boundingSphere: mesh.boundingSphere3D,
    orientedBoundingBox: mesh.orientedBoundingBox,
    horizonOcclusionPoint: mesh.horizonOcclusionPoint
  };
  return result;
}
var upsampleVerticesFromCesium3DTilesTerrain_default = createTaskProcessorWorker_default(
  upsampleVerticesFromCesium3DTilesTerrain
);
export {
  upsampleVerticesFromCesium3DTilesTerrain_default as default
};
