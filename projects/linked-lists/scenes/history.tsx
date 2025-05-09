import { Icon, makeScene2D, Node, Rect, withDefaults } from "@motion-canvas/2d";
import { Background } from "../../../lib/components/background";
import { BASE, CRUST, SURFACE0, SURFACE1, TEXT } from "../../../lib/styles/colors";
import { Text } from "../../../lib/components/text";
import { all, beginSlide, createRef } from "@motion-canvas/core";

export default makeScene2D(function*(view) {
  let container = createRef<Node>();

  let Button = withDefaults(Icon, {
    icon: "",
    color: TEXT,
    height: 70,
  });

  view.add(
    <>
      <Background />

      <Node ref={container} opacity={0}>
        <Rect
          fill={SURFACE0}
          size={[1000, 120]}
          radius={60}
          stroke={SURFACE1}
          lineWidth={4}
          layout
          alignItems={"center"}
          padding={[20, 20, 20, 30]}
          gap={20}
          shadowColor={CRUST}
          shadowBlur={20}
        >
          <Button
            icon={"material-symbols:arrow-back-rounded"}
          />

          <Button
            icon={"material-symbols:arrow-forward-rounded"}
          />

          <Button
            icon={"material-symbols:refresh-rounded"}
          />

          <Rect
            width={"100%"}
            height={80}
            radius={40}
            fill={BASE}
            alignItems={"center"}
            padding={[0, 30]}
          >
            <Text
              text={"vandev0.io"}
              fontFamily={"Maple Mono NF"}
              fontSize={35}
            />
          </Rect>
        </Rect>
      </Node>
    </>
  );

  yield* all(
    container().opacity(1, 0.5),
    container().scale(1.8, 0.75),
    container().position([400, -100], 0.75),
  );

  yield* beginSlide("47");

  yield* all(
    container().opacity(0, 0.5),
    container().position([1800, -100], 0.5),
  )
});
