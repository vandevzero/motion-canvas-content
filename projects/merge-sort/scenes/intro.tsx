import { createRef, waitFor } from "@motion-canvas/core";
import { Layout, makeScene2D, Rect, Txt } from "@motion-canvas/2d";

import { Text } from "../../../lib/components/text";
import { GREEN } from "../../../lib/styles/colors";

import contour from "./contour.glsl";

export default makeScene2D(function*(view) {
  let container = createRef<Layout>();
  let merge = createRef<Txt>();
  let sort = createRef<Txt>();
  let thirty = createRef<Txt>();
  let seconds = createRef<Txt>();

  view.add(
    <>
      <Rect
        size={[1080, 1920]}
        shaders={{
          fragment: contour
        }}
      ></Rect>

      <Layout ref={container} layout direction={"column"} gap={20} alignItems="center">
        <Layout layout gap={20}>
          <Text ref={merge} opacity={0} fontSize={110}>MERGE</Text>
          <Text ref={sort} opacity={0} fontSize={110}>SORT</Text>
        </Layout>

        <Text ref={thirty} opacity={0} fontSize={580} fill={GREEN} lineHeight={400}>30</Text>

        <Text ref={seconds} opacity={0} fontSize={150} >SECONDS</Text>
      </Layout>
    </>
  );

  yield* waitFor(0.25);
  yield* merge().opacity(1, 0);
  yield* waitFor(0.35);
  yield* sort().opacity(1, 0);
  yield* waitFor(0.5);
  yield* thirty().opacity(1, 0);
  yield* waitFor(0.3);
  yield* seconds().opacity(1, 0);
  yield* waitFor(0.5);
  yield* container().position.y(-1500, 0.4);
});
