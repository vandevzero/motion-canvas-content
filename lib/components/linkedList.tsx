import { all, ThreadGenerator } from "@motion-canvas/core";
import { Graph, GraphProps } from "./graph";

export class LinkedList extends Graph {
  constructor(props?: GraphProps) {
    super({ ...props });

    this.nodeContainer().layout(true);
  }

  public override *addNode(node: string, duration: number = 0.3) {
    yield* all(
      super.addNode(node, [0, 0], duration),
      this.nodeElements.length > 0 ?
        this.connect(
          this.nodeElements[this.nodeElements.length - 1].value(),
          node,
          duration
        ) :
        undefined,
    );
  }

  public *insertNode(node: string, before: string, duration: number = 0.3) {
    const index = this.nodeElements.findIndex(n => n.value() === before);
    if (index === -1) {
      yield* this.addNode(node, duration);
      return;
    }

    const animations: ThreadGenerator[] = [];

    const newNode = this.createNode(node);

    newNode.scale(0).size(0).opacity(0).margin(0);

    this.edges.set(newNode, []);
    this.nodeElements.splice(index, 0, newNode);
    this.nodeContainer().insert(newNode, index);

    animations.push(
      newNode.scale(1, duration),
      newNode.size(this.nodeSize(), duration),
      newNode.opacity(1, duration),
      newNode.margin([index == 0 ? 0 : 130, 0, 0, 0], duration),
    );

    if (index > 0) {
      const previous = this.nodeElements[index - 1].value();
      animations.push(
        this.disconnect(previous, before, duration),
        this.connect(previous, node, duration),
      );
    }

    animations.push(this.connect(node, before, duration));

    yield* all(...animations);
  }

  public override *removeNode(node: string, duration: number = 0.3) {
    const index = this.nodeElements.findIndex(n => n.value() === node);
    if (index === -1) {
      return;
    }

    yield* all(
      super.removeNode(node, duration),
      index > 0 && index < this.nodeElements.length - 1 ?
        this.connect(
          this.nodeElements[index - 1].value(),
          this.nodeElements[index + 1].value(),
          duration
        ) :
        undefined,
    );
  }
}
