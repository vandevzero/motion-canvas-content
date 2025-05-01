import { Rect } from "@motion-canvas/2d";

import contour from "../shaders/contour.glsl";

export const Background = () => <Rect size={[1080, 1920]} shaders={{ fragment: contour }} />;
