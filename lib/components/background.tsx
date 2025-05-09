import { Gradient, Rect } from "@motion-canvas/2d";

import contour from "../shaders/contour.glsl";
import { BASE, CRUST, SURFACE0, SURFACE1, SURFACE2 } from "../styles/colors";

export const Background = () => <Rect
  size={[1080, 1920]}
  fill={new Gradient({
    fromY: -1000,
    toY: 1000,
    stops: [
      { offset: 0, color: CRUST },
      { offset: 1, color: BASE },
    ],
  })}
/>;
