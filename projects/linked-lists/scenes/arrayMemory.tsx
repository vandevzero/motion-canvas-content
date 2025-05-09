import { is, Layout, Line, makeScene2D, Node, Rect, Spline, Txt, withDefaults } from "@motion-canvas/2d";
import { Background } from "../../../lib/components/background";
import { all, beginSlide, createRef, createRefArray, range, sequence, waitFor } from "@motion-canvas/core";
import { BLUE, CRUST, GREEN, LAVENDER, ROSEWATER, SURFACE0, SURFACE1, TEXT } from "../../../lib/styles/colors";
import { Text } from "../../../lib/components/text";
import { LinkedList } from "../../../lib/components/linkedList";

export default makeScene2D(function*(view) {
  let container = createRef<Node>();

  let buffer = createRef<Rect>();
  let chunks = createRefArray<Rect>();
  let offsets = createRefArray<Txt>();

  let MemoryChunk = withDefaults(Rect, {
    opacity: 0,
    radius: 10,
    height: 100,
  });

  let ChunkText = withDefaults(Txt, {
    fontSize: 40,
    fontFamily: "Maple Mono NF",
    fill: SURFACE1,
    fontWeight: 700,
  });

  view.add(
    <>
      <Background />

      <Node ref={container} position={[0, -100]}>
        <Layout layout direction={"column"} gap={20} opacity={0}>
          <Text text={"MEMORY"} fontSize={38} fontFamily={"Maple Mono NF"} />
          <Rect
            ref={buffer}
            fill={SURFACE0}
            stroke={SURFACE1}
            lineWidth={4}
            height={120}
            radius={10}
            shadowColor={CRUST}
            shadowBlur={20}
          >
          </Rect>
        </Layout>

        {range(7).map((i) => {
          return <Rect
            ref={chunks}
            fill={BLUE}
            width={100}
            height={100}
            radius={10}
            y={32}
            position={[-360 + i * 120, 0]}
            opacity={0}
          >
            <Text text={i.toString()} fontSize={40} fontFamily={"Maple Mono NF"} fill={SURFACE1} />
          </Rect>;
        })}

        {range(7).map((i) => {
          return <Text
            ref={offsets}
            text={(i * 4).toString()}
            fill={TEXT}
            fontFamily={"Maple Mono NF"}
            position={() => chunks[i].position().add([0, 120])}
            fontSize={40}
            opacity={0}
          />;
        })}
      </Node >
    </>
  );

  yield* all(
    buffer().findAncestor(is(Layout)).opacity(1, 0.75),
    buffer().width(840, 0.75),
  );

  yield* sequence(
    0.05,
    ...chunks.map((chunk, _) => chunk.opacity(1, 0.35)),
  )

  yield* beginSlide("31");

  yield* sequence(
    0.05,
    ...offsets.map((offset, _) => offset.opacity(1, 0.35)),
  )

  yield* beginSlide("32");

  yield* all(
    ...chunks.map((chunk, i) => chunk.opacity(i == 2 ? 1 : 0.25, 0.5)),
    ...offsets.map((chunk, i) => chunk.opacity(i == 2 ? 1 : 0.25, 0.5)),
  );

  yield* all(
    offsets[2].scale(1.5, 0.5).back(0.5),
    offsets[2].fill(BLUE, 0.5).back(0.5),
  );

  yield* beginSlide("33");

  yield* all(
    ...chunks.map((chunk, _) => chunk.opacity(1, 0.5)),
    ...offsets.map((chunk, _) => chunk.opacity(0, 0.5)),
  );

  yield* beginSlide("34");

  yield* chunks[1].opacity(0, 0.5);

  yield* beginSlide("35");

  let shift = createRef<Line>();

  container().add(
    <Line
      ref={shift}
      points={[
        chunks[6].position().add([0, 120]),
        chunks[2].position().add([0, 120]),
      ]}
      endArrow
      arrowSize={25}
      lineCap={"round"}
      stroke={TEXT}
      lineWidth={13}
      end={0}
      opacity={0}
    />
  );

  yield* all(
    shift().opacity(1, 0.5),
    shift().end(1, 0.5),
  );

  yield* beginSlide("36");

  yield* all(
    ...chunks.slice(2).map((chunk, _) => chunk.position(chunk.position().add([-120, 0]), 0.5)),
    shift().opacity(0, 0.5),
  );

  yield* beginSlide("37");

  shift().points([
    chunks[2].position().add([0, 120]),
    chunks[6].position().add([0, 120]),
  ]);
  shift().end(0);

  yield* all(
    shift().opacity(1, 0.5),
    shift().end(1, 0.5),
  );

  yield* beginSlide("38");

  yield* all(
    ...chunks.slice(2).map((chunk, _) => chunk.position(chunk.position().add([120, 0]), 0.5)),
    shift().opacity(0, 0.5),
  );

  yield* chunks[1].opacity(1, 0.5);

  yield* beginSlide("39");

  yield* all(
    container().position([0, -1500], 0.4),
    container().opacity(0, 0.4),
  );
});
