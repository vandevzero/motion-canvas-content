import { Layout, makeScene2D, Txt, withDefaults } from "@motion-canvas/2d";
import { Background } from "../../../lib/components/background";
import { Text } from "../../../lib/components/text";
import { GREEN, RED } from "../../../lib/styles/colors";
import { all, beginSlide, createRef } from "@motion-canvas/core";

export default makeScene2D(function*(view) {
  const Item = withDefaults(Text, {
    fontSize: 40,
    fontFamily: "Maple Mono NF",
    fontStyle: "italic",
    opacity: 0,
    height: 40,
  });

  const container = createRef<Layout>();
  const pros = createRef<Layout>();
  const cons = createRef<Layout>();

  view.add(
    <>
      <Background />
      <Layout ref={container} layout direction={"column"} position={[0, -100]} gap={80}>
        <Layout ref={pros} layout direction={"column"} gap={40}>
          <Text text="PROS" fill={GREEN} fontSize={114} opacity={0} />
          <Item />
          <Item />
          <Item />
        </Layout>
        <Layout ref={cons} layout direction={"column"} gap={40}>
          <Text text="CONS" fill={RED} fontSize={114} opacity={0} />
          <Item />
          <Item />
        </Layout>
      </Layout>
    </>
  );

  yield* pros().children()[0].opacity(1, 0.25);

  yield* beginSlide("40");

  yield* all(
    (pros().children()[1] as Txt).text("-> EFFICIENT INSERTIONS", 0.5),
    pros().children()[1].opacity(1, 0.25)
  );

  yield* beginSlide("41");

  yield* all(
    (pros().children()[2] as Txt).text("-> EFFICIENT DELETIONS", 0.5),
    pros().children()[2].opacity(1, 0.25)
  );

  yield* beginSlide("42");

  yield* all(
    (pros().children()[3] as Txt).text("-> NO MEMORY WASTE", 0.5),
    pros().children()[3].opacity(1, 0.25)
  );

  yield* beginSlide("43");

  yield* cons().children()[0].opacity(1, 0.25);

  yield* beginSlide("44");

  yield* all(
    (cons().children()[1] as Txt).text("-> INEFFICIENT ITERATION", 0.5),
    cons().children()[1].opacity(1, 0.25)
  );

  yield* beginSlide("45");

  yield* all(
    (cons().children()[2] as Txt).text("-> NO RANDOM ACCESS", 0.5),
    cons().children()[2].opacity(1, 0.25)
  );

  yield* beginSlide("46");

  yield* all(
    container().opacity(0, 0.5),
    container().position([-1500, -100], 0.5)
  );
});
