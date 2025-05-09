import { makeProject } from "@motion-canvas/core";

import "../../lib/styles/global.css";

import intro from "./scenes/intro?scene";
import linkedLists from "./scenes/linkedLists?scene";
import useful from "./scenes/useful?scene";
import listMemory from "./scenes/listMemory?scene";
import arrayMemory from "./scenes/arrayMemory?scene";
import prosCons from "./scenes/prosCons?scene";
import history from "./scenes/history?scene";
import playlist from "./scenes/playlist?scene";

export default makeProject({
  experimentalFeatures: true,
  scenes: [
    intro,
    linkedLists,
    useful,
    listMemory,
    arrayMemory,
    prosCons,
    history,
    playlist,
  ],
});
