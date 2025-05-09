import { all, createRef, range, sequence, waitFor } from "@motion-canvas/core";
import { Circle, Code, Layout, Line, makeScene2D, Node, Rect, Spline, Txt } from "@motion-canvas/2d";

import { Text } from "../../../lib/components/text";
import { Background } from "../../../lib/components/background";
import { BLUE, GREEN, MANTLE, RED, SURFACE0, TEXT } from "../../../lib/styles/colors";
import { TS } from "../../../lib/components/code";


export default makeScene2D(function*(view) {
  let container = createRef<Node>();
  let background = createRef<Rect>();
  let code = createRef<Code>();
  let origin = createRef<Circle>();
  let yAxis = createRef<Line>();
  let xAxis = createRef<Line>();

  let nSquaredPoints = range(16).map((i) => [
    -400 + i * 20,
    300 - i * i * 2.2,
  ] as [number, number]);

  let nLogNPoints = range(41).map((i) => [
    -400 + i * 20,
    300 - i * Math.log(i) * 2.2,
  ] as [number, number]);

  let nPoints = range(41).map((i) => [
    -400 + i * 20,
    300 - i * 2.2,
  ] as [number, number]);

  let nSquaredPlot = createRef<Spline>();
  let nLogNPlot = createRef<Spline>();
  let nPlot = createRef<Spline>();
  let label = createRef<Txt>();
  let timeComplexity = createRef<Node>();
  let spaceComplexity = createRef<Layout>();
  let mergeSort = createRef<Txt>();
  let quickSort = createRef<Txt>();

  view.add(
    <>
      <Background />

      <Node ref={container}>
        <Rect ref={background}
          size={[1026, 250]}
          fill={MANTLE}
          radius={20}
          shadowBlur={40}
          shadowColor={"black"}
          stroke={SURFACE0}
          lineWidth={2}
        ></Rect>

        <Node ref={timeComplexity}>
          <TS
            ref={code}
            code={"O(n log n)"}
            fontStyle={"italic"}
            fontSize={70}
            opacity={0}
          />

          <Spline ref={nSquaredPlot} end={0} points={nSquaredPoints} lineWidth={10} stroke={RED} endArrow arrowSize={14}></Spline>
          <Spline ref={nLogNPlot} end={0} points={nLogNPoints} lineWidth={10} stroke={BLUE} endArrow arrowSize={14}></Spline>
          <Spline ref={nPlot} end={0} points={nPoints} lineWidth={10} stroke={GREEN} endArrow arrowSize={14}></Spline>
          <Circle ref={origin} size={[0, 0]} fill={TEXT} position={[-400, 300]}></Circle>
          <Line ref={yAxis} end={0} points={[[-400, 300], [-400, -200]]} lineWidth={18} stroke={TEXT} endArrow arrowSize={20}></Line>
          <Line ref={xAxis} end={0} points={[[-400, 300], [400, 300]]} lineWidth={18} stroke={TEXT} endArrow arrowSize={20}></Line>

          <Text ref={label} text={"(lower is better)"} fontSize={30} position={[0, 350]} opacity={0}></Text>
        </Node>

        <Layout ref={spaceComplexity} opacity={0} layout direction={"column"} gap={30} alignItems={"center"}>
          <Text text={"Space Complexity:"} fontSize={65} fill={TEXT} position={[0, -100]}></Text>
          <Layout ref={quickSort} opacity={0} layout gap={30}>
            <Text text={"Quicksort:"} fontSize={50} fill={TEXT}></Text>
            <TS code={"O(log n)"} fontStyle={"italic"} />
          </Layout>
          <Layout ref={mergeSort} opacity={0} layout gap={30}>
            <Text text={"Merge Sort:"} fontSize={50} fill={TEXT}></Text>
            <TS code={"O(n)"} fontStyle={"italic"} />
          </Layout>
        </Layout>
      </Node>
    </>
  );

  yield* code().opacity(1, 0.5);
  yield* all(
    code().position.y(-310, 0.5),
    background().height(800, 0.5),
  );

  yield* origin().size([50, 50], 0.25);

  yield* all(
    yAxis().end(1, 0.5),
    xAxis().end(1, 0.5),
    label().opacity(1, 0.5),
  );

  yield* sequence(
    0.5,
    nPlot().end(1, 0.5),
    nLogNPlot().end(1, 0.5),
    nSquaredPlot().end(1, 0.5),
  );

  yield* all(
    nPlot().opacity(0.2, 0.75),
    nSquaredPlot().opacity(0.2, 0.75),
    nLogNPlot().lineWidth(14, 0.75),
    nLogNPlot().arrowSize(20, 0.75),
  );

  yield* waitFor(1);

  yield* sequence(
    0.1,
    timeComplexity().opacity(0, 0.5),
    background().size([800, 400], 0.5),
    spaceComplexity().opacity(1, 0.5),
  )

  yield* quickSort().opacity(1, 0.35);
  yield* mergeSort().opacity(1, 0.35);

  yield* waitFor(0.6);

  yield* all(
    quickSort().scale(1.1, 0.25),
    mergeSort().opacity(0.25, 0.25),
  );

  yield* waitFor(2);

  yield* all(
    container().opacity(0, 0.35),
    container().scale(0, 0.35),
  );
  yield* waitFor(0.25);
});
