import { Gradient, Layout, makeScene2D, Txt } from "@motion-canvas/2d";
import { Background } from "../../../lib/components/background";
import { Text } from "../../../lib/components/text";
import { BLUE, LAVENDER } from "../../../lib/styles/colors";
import { all, beginSlide, createRef, waitFor } from "@motion-canvas/core";

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
  let what = createRef<Txt>();
  let are = createRef<Txt>();
  let linked = createRef<Txt>();
  let lists = createRef<Txt>();

  view.add(
    <>
      <Background />

      <Layout ref={container} layout direction={"column"} alignItems={"center"}>
        <Layout layout gap={40}>
          <Text ref={what} text={"WHAT"} fontSize={150} opacity={0} />
          <Text ref={are} text={"ARE"} fontSize={150} opacity={0} />
        </Layout>
        <Text ref={linked} text={"LINKED"} fontSize={221} fill={gradient} opacity={0} />
        <Text ref={lists} text={"LISTS"} fontSize={284} opacity={0} />
      </Layout>
    </>
  );

  yield* waitFor(0.25);
  yield* what().opacity(1, 0.0);
  yield* waitFor(0.25);
  yield* are().opacity(1, 0.0);
  yield* waitFor(0.25);
  yield* linked().opacity(1, 0.0);
  yield* waitFor(0.25);
  yield* lists().opacity(1, 0.0);
  yield* waitFor(0.25);

  yield* beginSlide("intro");

  yield* all(
    container().position.x(-1500, 0.5),
    container().opacity(0, 0.5)
  );
});
