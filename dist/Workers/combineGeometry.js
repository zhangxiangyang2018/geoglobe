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
  PrimitivePipeline_default
} from "./chunk-SU3TVGQP.js";
import {
  createTaskProcessorWorker_default
} from "./chunk-I2XP4NKU.js";
import "./chunk-FFR7IJ3A.js";
import "./chunk-PVEFLBYY.js";
import "./chunk-SVPORG7B.js";
import "./chunk-66LAF3ZX.js";
import "./chunk-M64ZKJHQ.js";
import "./chunk-HZHR5B4M.js";
import "./chunk-YQ4Z43IN.js";
import "./chunk-5DDO7UL5.js";
import "./chunk-PZZAOVA5.js";
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

// packages/engine/Source/Workers/combineGeometry.js
function combineGeometry(packedParameters, transferableObjects) {
  const parameters = PrimitivePipeline_default.unpackCombineGeometryParameters(packedParameters);
  const results = PrimitivePipeline_default.combineGeometry(parameters);
  return PrimitivePipeline_default.packCombineGeometryResults(
    results,
    transferableObjects
  );
}
var combineGeometry_default = createTaskProcessorWorker_default(combineGeometry);
export {
  combineGeometry_default as default
};
