import { initial, Layout, makeScene2D, Node, NodeProps, Rect, signal, Txt } from "@motion-canvas/2d";
import { all, createRef, createRefArray, PossibleColor, sequence, SignalValue, SimpleSignal, waitFor } from "@motion-canvas/core";

import { Text } from "../../../lib/components/text";
import { Background } from "../../../lib/components/background";
import { GREEN, MANTLE, SURFACE0, SURFACE1 } from "../../../lib/styles/colors";


export default makeScene2D(function*(view) {
  let background = createRef<Rect>();
  let container = createRef<Layout>();

  let group_1 = createRef<Group>();

  let group_2_1 = createRef<Group>();
  let group_2_2 = createRef<Group>();
  let group_2_3 = createRef<Group>();
  let group_2_4 = createRef<Group>();

  let group_3_1 = createRef<Group>();
  let group_3_2 = createRef<Group>();

  let group_4_1 = createRef<Group>();

  view.add(
    <>
      <Background />

      <Rect
        ref={background}
        size={[1026, 250]}
        fill={MANTLE}
        radius={20}
        shadowBlur={40}
        shadowColor={"black"}
        stroke={SURFACE0}
        lineWidth={2}
        opacity={0}
      >
      </Rect>
      <Layout
        layout
        ref={container}
        direction="column"
        gap={20}
        alignItems={"center"}>

        <Group ref={group_1} merged values={[4, 2, 0, 6, 9, 8, 5, 1]}></Group>

        <Layout layout direction="row" gap={15} alignItems={"center"}>
          <Group ref={group_2_1} values={[2, 4]}></Group>
          <Group ref={group_2_2} values={[0, 6]}></Group>
          <Group ref={group_2_3} values={[8, 9]}></Group>
          <Group ref={group_2_4} values={[1, 5]}></Group>
        </Layout>

        <Layout layout direction="row" gap={15} alignItems={"center"}>
          <Group ref={group_3_1} values={[0, 2, 4, 6]}></Group>
          <Group ref={group_3_2} values={[1, 5, 8, 9]}></Group>
        </Layout>

        <Group ref={group_4_1} values={[0, 1, 2, 4, 5, 6, 8, 9]}></Group>
      </Layout>
    </>
  )

  yield* background().opacity(1, 0.35);
  yield* container().position.y(290 - 65, 0.0);
  yield* group_1().show(0, 8, 0.25);
  yield* all(
    background().height(700, 0.5),
    container().position.y(0, 0.5),
  );

  yield* group_1().toggle(0.5);
  yield* waitFor(1.5);
  yield* group_1().dim(2, 8, 0.5);

  yield* group_2_1().show(0, 1, 0.5);
  yield* group_2_1().show(1, 2, 0.5);
  yield* group_2_1().toggle(0.25);

  yield* all(
    group_1().dim(0, 2, 0.5),
    group_1().brighten(2, 4, 0.5),
    group_2_1().dim(0, 2, 0.5),
  )

  yield* group_2_2().show(0, 1, 0.5);
  yield* group_2_2().show(1, 2, 0.5);
  yield* group_2_2().toggle(0.25);

  yield* all(
    group_1().dim(2, 4, 0.5),
    group_1().brighten(4, 6, 0.5),
    group_2_2().dim(0, 2, 0.5),
  )

  yield* group_2_3().show(0, 1, 0.5);
  yield* group_2_3().show(1, 2, 0.5);
  yield* group_2_3().toggle(0.25);

  yield* all(
    group_1().dim(4, 6, 0.5),
    group_1().brighten(6, 8, 0.5),
    group_2_3().dim(0, 2, 0.5),
  )

  yield* group_2_4().show(0, 1, 0.5);
  yield* group_2_4().show(1, 2, 0.5);
  yield* group_2_4().toggle(0.25);

  yield* waitFor(0.5);

  yield* all(
    group_1().dim(6, 8, 0.5),
    group_2_4().dim(0, 2, 0.5),
    group_2_1().brighten(0, 2, 0.5),
    group_2_2().brighten(0, 2, 0.5),
  )

  yield* all(
    group_2_1().dim(1, 2, 0.5),
    group_2_2().dim(1, 2, 0.5),
  )

  yield* group_3_1().show(0, 1, 0.5);
  yield* all(
    group_2_2().dim(0, 1, 0.5),
    group_2_2().brighten(1, 2, 0.5),
  )
  yield* group_3_1().show(1, 2, 0.5);
  yield* all(
    group_2_1().dim(0, 1, 0.5),
    group_2_1().brighten(1, 2, 0.5),
  )
  yield* group_3_1().show(2, 3, 0.5);
  yield* group_3_1().show(3, 4, 0.5);

  yield* group_3_1().toggle(0.25);

  yield* all(
    group_2_1().dim(0, 2, 0.5),
    group_2_2().dim(0, 2, 0.5),
    group_3_1().dim(0, 4, 0.5),
    group_2_3().brighten(0, 2, 0.5),
    group_2_4().brighten(0, 2, 0.5),
  );

  yield* all(
    group_2_3().dim(1, 2, 0.5),
    group_2_4().dim(1, 2, 0.5),
  );

  yield* group_3_2().show(0, 1, 0.5);
  yield* all(
    group_2_4().dim(0, 1, 0.5),
    group_2_4().brighten(1, 2, 0.5),
  );
  yield* group_3_2().show(1, 2, 0.5);
  yield* all(
    group_2_3().brighten(1, 2, 0.5),
    group_2_4().dim(1, 2, 0.5),
  );
  yield* group_3_2().show(2, 4, 0.5);
  yield* group_3_2().toggle(0.25);

  yield* waitFor(0.5);

  yield* all(
    group_2_3().dim(0, 2, 0.5),
    group_2_4().dim(0, 2, 0.5),
    group_3_1().brighten(0, 4, 0.5),
  )

  yield* all(
    group_3_1().dim(1, 4, 0.25),
    group_3_2().dim(1, 4, 0.25),
  )
  yield* group_4_1().show(0, 1, 0.25);
  yield* all(
    group_3_1().dim(0, 1, 0.25),
    group_3_1().brighten(1, 2, 0.25),
  )
  yield* group_4_1().show(1, 2, 0.25);
  yield* all(
    group_3_2().dim(0, 1, 0.25),
    group_3_2().brighten(1, 2, 0.25),
  )
  yield* group_4_1().show(2, 3, 0.25);
  yield* all(
    group_3_1().dim(1, 2, 0.25),
    group_3_1().brighten(2, 3, 0.25),
  )
  yield* group_4_1().show(3, 4, 0.25);
  yield* all(
    group_3_1().dim(2, 3, 0.25),
    group_3_1().brighten(3, 4, 0.25),
  )
  yield* group_4_1().show(4, 5, 0.25);
  yield* all(
    group_3_2().dim(1, 2, 0.25),
    group_3_2().brighten(2, 3, 0.25),
  )
  yield* group_4_1().show(5, 6, 0.25);
  yield* all(
    group_3_1().dim(3, 4, 0.25),
    group_3_2().brighten(3, 4, 0.25),
  )
  yield* group_4_1().show(6, 8, 0.25);

  yield* all(
    group_3_2().dim(2, 4, 0.25),
    group_4_1().toggle(0.25),
  )

  yield* all(
    group_1().opacity(0, 0.25),
    group_2_1().opacity(0, 0.25),
    group_2_2().opacity(0, 0.25),
    group_2_3().opacity(0, 0.25),
    group_2_4().opacity(0, 0.25),
    group_3_1().opacity(0, 0.25),
    group_3_2().opacity(0, 0.25),
  )

  yield* all(
    background().height(250, 0.5),
    container().position.y(-(290 - 65), 0.5),
  );

  yield* group_4_1().color(0, 8, GREEN, 0.25);

  yield* waitFor(0.25);

  yield* group_4_1().hide(0, 8, 0.25);
});

interface GroupProps extends NodeProps {
  hidden?: SignalValue<boolean>;
  merged?: SignalValue<boolean>;
  values?: SignalValue<number[]>;
}

class Group extends Node {
  @initial(true)
  @signal()
  public declare readonly hidden: SimpleSignal<boolean, this>;

  @initial(false)
  @signal()
  public declare readonly merged: SimpleSignal<boolean, this>;

  @initial([])
  @signal()
  public declare readonly values: SimpleSignal<number[], this>;

  private readonly container = createRef<Layout>();
  private readonly items = createRefArray<Rect>();
  private readonly texts = createRefArray<Txt>();

  public constructor(props?: GroupProps) {
    super({ ...props });

    const last = this.values().length - 1;

    this.add(
      <Layout
        layout
        ref={this.container}
        gap={this.merged() ? 0 : 15}
      >
        {this.values().map((value, i) =>
          <Rect
            ref={this.items}
            size={[105, 130]}
            fill={SURFACE1}
            radius={!this.merged() ? 10 : i == 0 ? [10, 0, 0, 10] : i == last ? [0, 10, 10, 0] : 0}
            opacity={this.hidden() ? 0 : 1}
            layout alignItems="center" justifyContent="center"
          >
            <Text ref={this.texts} fontSize={60}>{value.toString()}</Text>
          </Rect>
        )}
      </Layout>
    );
  }

  public *show(start: number, end: number, duration: number) {
    yield* sequence(
      0.05,
      ...this.items.slice(start, end).map((item) => item.opacity(1, duration)),
    );
  }

  public *hide(start: number, end: number, duration: number) {
    yield* sequence(
      0.05,
      ...this.items.slice(start, end).map((item) => item.opacity(0, duration)),
    );
  }

  public *dim(start: number, end: number, duration: number) {
    yield* all(
      ...this.items.slice(start, end).map((item) => item.opacity(0.2, duration)),
    );
  }

  public *brighten(start: number, end: number, duration: number) {
    yield* all(
      ...this.items.slice(start, end).map((item) => item.opacity(1.0, duration)),
    );
  }

  public *color(start: number, end: number, color: PossibleColor, duration: number) {
    yield* sequence(
      0.05,
      ...this.texts.slice(start, end).map((text) => text.fill(color, duration)),
    );
  }

  public *toggle(duration: number) {
    this.merged(!this.merged());

    yield* all(
      this.container().gap(this.merged() ? 0 : 15, duration),

      ...this.items.map((item, i) => {
        if (!this.merged()) {
          return item.radius(10, duration);
        }

        const last = this.items.length - 1;
        return item.radius(i == 0 ? [10, 0, 0, 10] : i == last ? [0, 10, 10, 0] : 0, duration);
      }),
    );
  }
}
