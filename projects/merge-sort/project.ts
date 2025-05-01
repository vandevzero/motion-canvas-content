import { Code } from "@motion-canvas/2d";
import { makeProject } from "@motion-canvas/core";

import "../../lib/styles/global.css";
import { codeStyle } from "../../lib/styles/codeStyle";

import intro from "./scenes/intro?scene";
import sort from "./scenes/sort?scene";
import complexity from "./scenes/complexity?scene";

Code.defaultHighlighter = codeStyle;

export default makeProject({
  experimentalFeatures: true,
  scenes: [
    intro,
    sort,
    complexity,
  ],
});
