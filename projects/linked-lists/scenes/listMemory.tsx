import { is, Layout, makeScene2D, Node, Rect, Spline, Txt, withDefaults } from "@motion-canvas/2d";
import { Background } from "../../../lib/components/background";
import { all, beginSlide, createRef, sequence, waitFor } from "@motion-canvas/core";
import { BLUE, CRUST, GREEN, LAVENDER, ROSEWATER, SURFACE0, SURFACE1 } from "../../../lib/styles/colors";
import { Text } from "../../../lib/components/text";
import { LinkedList } from "../../../lib/components/linkedList";

export default makeScene2D(function*(view) {
  let linkedListContainer = createRef<Node>();

  let linkedListBuffer = createRef<Rect>();
  let node0Chunk = createRef<Rect>();
  let node1Chunk = createRef<Rect>();
  let node2Chunk = createRef<Rect>();
  let node3Chunk = createRef<Rect>();
  let linkedList = createRef<LinkedList>();

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

      <Node ref={linkedListContainer} position={[0, -100]}>
        <Layout layout direction={"column"} gap={20} opacity={0}>
          <Text text={"MEMORY"} fontSize={38} fontFamily={"Maple Mono NF"} />
          <Rect
            ref={linkedListBuffer}
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

        <MemoryChunk ref={node0Chunk} fill={BLUE} position={[-365, 32]}>
          <ChunkText text={"0"} />
        </MemoryChunk>

        <MemoryChunk ref={node2Chunk} fill={LAVENDER} position={[-123, 32]}>
          <ChunkText text={"2"} />
        </MemoryChunk>

        <MemoryChunk ref={node3Chunk} fill={ROSEWATER} position={[123, 32]}>
          <ChunkText text={"3"} />
        </MemoryChunk>

        <MemoryChunk ref={node1Chunk} fill={GREEN} position={[365, 32]}>
          <ChunkText text={"1"} />
        </MemoryChunk>

        <LinkedList ref={linkedList} rotation={-90} position={[0, 200]} nodeSize={130} />
      </Node >
    </>
  );

  yield* all(
    linkedListBuffer().findAncestor(is(Layout)).opacity(1, 0.75),
    linkedListBuffer().width(900, 0.75),
    sequence(
      0.1,
      linkedList().addNode("0", 0.5),
      linkedList().addNode("1", 0.5),
      linkedList().addNode("2", 0.5),
      linkedList().addNode("3", 0.5),
    )
  );

  linkedList().getNode("1").selectColor(GREEN);
  linkedList().getNode("2").selectColor(LAVENDER);
  linkedList().getNode("3").selectColor(ROSEWATER);

  yield* beginSlide("12");

  yield* all(
    linkedList().getNode("0").select(0.5),
    node0Chunk().opacity(1, 0.5),
    node0Chunk().width(150, 0),
  );

  yield* beginSlide("13");

  yield* all(
    linkedList().getNode("1").select(0.5),
    node1Chunk().opacity(1, 0.5),
    node1Chunk().width(150, 0),
  );

  yield* beginSlide("14");

  yield* all(
    linkedList().getNode("2").select(0.5),
    node2Chunk().opacity(1, 0.5),
    node2Chunk().width(150, 0),
  );

  yield* beginSlide("15");

  yield* all(
    linkedList().getNode("3").select(0.5),
    node3Chunk().opacity(1, 0.5),
    node3Chunk().width(150, 0),
  );

  yield* beginSlide("16");

  yield* linkedList().position([0, 350], 0.5);

  let link01 = createRef<Spline>();
  let link12 = createRef<Spline>();
  let link23 = createRef<Spline>();

  linkedListContainer().add(
    <>
      <Spline
        ref={link01}
        points={[
          node0Chunk().position().add([0, 100]),
          node0Chunk().position().add([0, 190]),
          node1Chunk().position().add([0, 190]),
          node1Chunk().position().add([0, 100]),
        ]}
        smoothness={0}
        lineWidth={10}
        lineJoin={"round"}
        startArrow
        endArrow
        end={0}
        stroke={BLUE}
      />

      <Spline
        ref={link12}
        points={[
          node1Chunk().position().add([0, -100]),
          node1Chunk().position().add([0, -150]),
          node2Chunk().position().add([0, -150]),
          node2Chunk().position().add([0, -100]),
        ]}
        smoothness={0}
        lineWidth={10}
        lineJoin={"round"}
        startArrow
        endArrow
        end={0}
        stroke={GREEN}
      />

      <Spline
        ref={link23}
        points={[
          node2Chunk().position().add([0, 100]),
          node2Chunk().position().add([0, 150]),
          node3Chunk().position().add([0, 150]),
          node3Chunk().position().add([0, 100]),
        ]}
        smoothness={0}
        lineWidth={10}
        lineJoin={"round"}
        startArrow
        endArrow
        end={0}
        stroke={LAVENDER}
      />
    </>
  );

  yield* link01().end(1, 0.5);
  yield* link12().end(1, 0.5);
  yield* link23().end(1, 0.5);

  yield* beginSlide("17");

  yield* all(
    linkedList().getNode("0").deselect(0.5),
    linkedList().getNode("1").deselect(0.5),
    linkedList().getNode("3").deselect(0.5),
    node0Chunk().opacity(0.25, 0.5),
    node1Chunk().opacity(0.25, 0.5),
    node3Chunk().opacity(0.25, 0.5),
    link01().opacity(0.25, 0.5),
    link12().opacity(0.25, 0.5),
  );

  yield* beginSlide("18");

  yield* all(
    node2Chunk().opacity(0, 0.5),
    link23().opacity(0, 0.5),
  );

  yield* beginSlide("19");

  yield* all(
    node1Chunk().opacity(1, 0.5),
    link12().opacity(1, 0.5),
    link12().points(
      [
        node1Chunk().position().add([0, -100]),
        node1Chunk().position().add([0, -150]),
        node3Chunk().position().add([0, -150]),
        node3Chunk().position().add([0, -100]),
      ],
      0.5
    ),
    node3Chunk().opacity(1, 0.5),
  );

  yield* beginSlide("20");

  yield* all(
    node0Chunk().opacity(1, 0.5),
    link01().opacity(1, 0.5),
    linkedList().removeNode("2", 0.5),
  );

  yield* beginSlide("21");

  yield* all(
    node0Chunk().opacity(0.25, 0.5),
    node1Chunk().opacity(0.25, 0.5),
    node3Chunk().opacity(0.25, 0.5),
    link01().opacity(0.25, 0.5),
    link12().opacity(0.25, 0.5),
  );

  link23().end(0);

  yield* beginSlide("22");

  yield* all(
    node2Chunk().opacity(1, 0.5),
  );

  yield* beginSlide("23");

  yield* all(
    node3Chunk().opacity(1, 0.5),
    link23().opacity(1, 0.5),
    link23().end(1, 0.5),
  );

  yield* beginSlide("24");

  yield* all(
    node1Chunk().opacity(1, 0.5),
    link12().opacity(1, 0.5),
  );

  yield* link12().points(
    [
      node1Chunk().position().add([0, -100]),
      node1Chunk().position().add([0, -150]),
      node2Chunk().position().add([0, -150]),
      node2Chunk().position().add([0, -100]),
    ],
    0.5
  );

  yield* beginSlide("25");

  yield* all(
    linkedList().insertNode("2", "3", 0.5),
    node0Chunk().opacity(1, 0.5),
    link01().opacity(1, 0.5),
  );

  yield* beginSlide("26");

  linkedList().getEdge("1", "2").selectColor(GREEN);
  linkedList().getNode("2").selectColor(LAVENDER);

  yield* all(
    link01().opacity(0, 0.5),
    link12().opacity(0, 0.5),
    link23().opacity(0, 0.5),
  );

  yield* beginSlide("27");

  link01().end(0);
  link12().end(0);
  link23().end(0);

  yield* all(
    link01().opacity(1, 0.5),
    link01().end(1, 0.5),
    linkedList().getNode("0").select(0.5),
    linkedList().getEdge("0", "1").select(0.5),
    node1Chunk().opacity(0.25, 0.5),
    node2Chunk().opacity(0.25, 0.5),
    node3Chunk().opacity(0.25, 0.5),
  );

  yield* beginSlide("28");

  yield* all(
    link01().opacity(0.25, 0.5),
    link12().opacity(1, 0.5),
    link12().end(1, 0.5),
    node0Chunk().opacity(0.25, 0.5),
    node1Chunk().opacity(1, 0.5),
    linkedList().getNode("1").select(0.5),
    linkedList().getEdge("1", "2").select(0.5),
    linkedList().getNode("0").deselect(0.5),
    linkedList().getEdge("0", "1").deselect(0.5),
  );

  yield* beginSlide("29");

  yield* all(
    linkedList().getNode("1").deselect(0.5),
    linkedList().getEdge("1", "2").deselect(0.5),
    linkedList().getNode("2").select(0.5),
    link12().opacity(0.25, 0.5),
    node1Chunk().opacity(0.25, 0.5),
    node2Chunk().opacity(1, 0.5),
  );

  yield* beginSlide("30");

  yield* all(
    linkedListContainer().scale(0, 0.5),
    linkedListContainer().opacity(0, 0.5),
  );
});
