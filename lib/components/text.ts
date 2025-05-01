import { Txt, withDefaults } from "@motion-canvas/2d";

import { TEXT } from "../styles/colors";

export const Text = withDefaults(Txt, {
  fontFamily: "Inter",
  fontSize: 150,
  fill: TEXT,
  fontWeight: 900,
});
