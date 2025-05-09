import { makeProject } from "@motion-canvas/core";

import "../../lib/styles/global.css";

import intro from "./scenes/intro?scene";
import sort from "./scenes/sort?scene";
import complexity from "./scenes/complexity?scene";

export default makeProject({
  experimentalFeatures: true,
  scenes: [
    intro,
    sort,
    complexity,
  ],
});
