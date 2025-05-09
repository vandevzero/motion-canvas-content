import { Gradient, Layout, makeScene2D, Txt } from "@motion-canvas/2d";
import { Background } from "../../../lib/components/background";
import { all, beginSlide, createRef, sequence } from "@motion-canvas/core";
import { Text } from "../../../lib/components/text";
import { BLUE, LAVENDER } from "../../../lib/styles/colors";

export default makeScene2D(function*(view) {
  const gradient = new Gradient({
    fromX: -800,
    toX: 400,
    stops: [
      { offset: 0, color: BLUE },
      { offset: 1, color: LAVENDER },
    ],
  });

  let container = createRef<Layout>();
  let why = createRef<Txt>();
  let is = createRef<Txt>();
  let it = createRef<Txt>();
  let useful = createRef<Txt>();

  view.add(
    <>
      <Background />
      <Layout ref={container} layout direction={"column"} alignItems={"center"}>
        <Layout layout gap={40}>
          <Text ref={why} text="WHY" opacity={0} />
          <Text ref={is} text="IS" opacity={0} />
          <Text ref={it} text="IT" opacity={0} />
        </Layout>
        <Text ref={useful} text="USEFUL" fill={gradient} fontSize={190} opacity={0} />
      </Layout>
    </>
  );

  yield* sequence(
    0.15,
    why().opacity(1, 0.0),
    is().opacity(1, 0.0),
    it().opacity(1, 0.0),
    useful().opacity(1, 0.0),
  );

  yield* beginSlide("11");

  yield* all(
    container().position.y(1800, 0.5),
    container().opacity(0, 0.5),
  );
});
