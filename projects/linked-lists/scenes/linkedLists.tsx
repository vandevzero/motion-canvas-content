import { lines, makeScene2D, Node } from "@motion-canvas/2d";
import { all, beginSlide, createRef, sequence, waitFor } from "@motion-canvas/core";

import { Background } from "../../../lib/components/background";
import { LinkedList } from "../../../lib/components/linkedList";
import { Editor } from "../../../lib/components/editor";

export default makeScene2D(function*(view) {
  let container = createRef<Node>();
  let editor = createRef<Editor>();
  let list = createRef<LinkedList>();

  view.add(
    <>
      <Background />
      <Node ref={container} >
        <LinkedList ref={list} position={[0, 200]} rotation={-90} />
        <Editor
          ref={editor}
          tabs={["linkedList.ts"]}
          opacity={0}
          scale={0}
          code={`\
class LinkedList<T> {
  head?: Node<T>;
  tail?: Node<T>;
  length: number = 0;
};

type Node<T> = {
  value: T;
  next?: Node<T>;
};`}
        />
      </Node>
    </>
  );

  yield* all(
    editor().scale(1, 0.5),
    editor().opacity(1, 0.5)
  );

  yield* beginSlide("1");

  yield* editor().position([0, -300], 0.5);
  yield* editor().selection(lines(0, 5), 0.5);

  yield* all(
    editor().selection(lines(1), 0.5),
    list().addNode("0", 0.5),
  );

  yield* beginSlide("2");

  yield* all(
    editor().selection(lines(2), 0.5),
    list().addNode("1", 0.5),
  );

  yield* beginSlide("3");

  yield* all(
    list().removeNode("1", 0.5),
    editor().selection(lines(1, 2), 0.5),
  );

  yield* beginSlide("4");

  yield* editor().selection(lines(0, Infinity), 0.5);

  yield* sequence(
    0.05,
    editor().code(`\
class LinkedList<T> {
  head?: Node<T>;
  tail?: Node<T>;
  length: number = 0;

  append(value: T) { ... }
  remove(value: T) { ... }
  insert(value: T, before: T) { ... }
};

type Node<T> = {
  value: T;
  next?: Node<T>;
};`, 0.5),
    list().position([0, 300], 0.5),
  );

  yield* beginSlide("5");

  yield* sequence(
    0.15,
    list().addNode("1", 0.5),
    list().addNode("2", 0.5),
    list().addNode("3", 0.5),
  );

  yield* beginSlide("6");

  yield* sequence(
    0.15,
    list().removeNode("1", 0.5),
  );

  yield* beginSlide("7");

  yield* sequence(
    0.15,
    list().insertNode("1", "3", 0.5),
  );

  yield* beginSlide("8");

  yield* editor().selection(lines(9, 13), 0.5);

  yield* all(
    editor().selection(lines(12), 0.5),
    list().getEdge("0", "2").select(0.5),
    list().getEdge("2", "1").select(0.5),
    list().getEdge("1", "3").select(0.5),
  );

  yield* beginSlide("9");

  yield* editor().selection(lines(0, Infinity), 0.5);

  yield* beginSlide("10");

  yield* all(
    container().scale(0, 0.5),
    container().opacity(0, 0.5),
  );
});
