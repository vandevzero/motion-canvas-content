import { BLUE, CRUST, SURFACE0, SURFACE1, SURFACE2, TEXT } from "../styles/colors";
import { Circle, CircleProps, colorSignal, initial, Layout, Line, LineProps, Node, NodeProps, signal, Txt } from "@motion-canvas/2d";
import { all, Color, ColorSignal, createRef, createSignal, PossibleColor, PossibleVector2, SignalValue, SimpleSignal, ThreadGenerator } from "@motion-canvas/core";

export interface GraphProps extends NodeProps {
  nodeSize?: SignalValue<number>;
}

export class Graph extends Node {
  @initial(150)
  @signal()
  public declare readonly nodeSize: SimpleSignal<number, this>;

  protected nodeElements: GraphNode[] = [];
  protected edgeElements: GraphEdge[] = [];

  protected edges: Map<GraphNode, GraphNode[]> = new Map();

  protected nodeContainer = createRef<Layout>();
  protected edgeContainer = createRef<Layout>();

  constructor(props?: GraphProps) {
    super({ ...props });

    this.nodeSize(props.nodeSize);

    this.add(<Node ref={this.edgeContainer} />);
    this.add(<Layout ref={this.nodeContainer} direction={"column"} alignItems={"center"} />);
  }

  public getNode(node: string): GraphNode | undefined {
    return this.nodeElements.find(n => n.value() === node);
  }

  public *addNode(node: string, position: PossibleVector2 = [0, 0], duration: number = 0.3) {
    const nodeElement = this.createNode(node);

    nodeElement.position(position);
    nodeElement.scale(0).size(0).opacity(0).margin(0);

    this.edges.set(nodeElement, []);
    this.nodeElements.push(nodeElement);
    this.nodeContainer().add(nodeElement);

    yield* all(
      nodeElement.scale(1, duration),
      nodeElement.size(this.nodeSize(), duration),
      nodeElement.opacity(1, duration),
      nodeElement.margin([this.nodeElements.length == 1 ? 0 : 130, 0, 0, 0], duration),
    );
  }

  public *removeNode(node: string, duration: number = 0.3) {
    const index = this.nodeElements.findIndex(n => n.value() === node);
    if (index === -1) {
      return;
    }

    const nodeElement = this.nodeElements.splice(index, 1)[0];

    yield* all(
      this.nodeElements[0]?.margin(0, duration),

      nodeElement.scale(0, duration),
      nodeElement.size(0, duration),
      nodeElement.opacity(0, duration),
      nodeElement.margin(0, duration),

      this.updateEdges(duration),
    );

    nodeElement.remove();
  }

  public getEdge(from: string, to: string): GraphEdge | undefined {
    return this.edgeElements.find(edge => edge.from().value() == from && edge.to().value() == to);
  }

  public *connect(from: string, to: string | string[], duration: number = 0.3) {
    if (typeof to === "number") {
      to = [to];
    }

    const fromNode = this.getNode(from);
    if (!fromNode) {
      return;
    }

    for (let i = 0; i < to.length; i++) {
      const toNode = this.getNode(to[i]);

      if (!toNode || toNode == fromNode) {
        continue;
      }

      if (this.edges.get(fromNode)?.includes(toNode)) {
        continue;
      }

      this.edges.get(fromNode).push(toNode);
    }

    yield* this.updateEdges(duration);
  }

  public *disconnect(from: string, to: string, duration: number = 0.3) {
    const fromNode = this.getNode(from);
    const toNode = this.getNode(to);

    if (!fromNode || !toNode) {
      return;
    }

    this.edges.set(fromNode, this.edges.get(fromNode).filter(node => node != toNode));
    yield* this.updateEdges(duration);
  }

  private *updateEdges(duration: number = 0.3) {
    const animations: ThreadGenerator[] = [];
    const removedEdges: GraphEdge[] = [];

    const keys = this.edges.keys();

    for (const from of keys) {
      if (!this.nodeElements.includes(from)) {
        this.edges.delete(from);
        continue;
      }

      this.edges.set(
        from,
        this.edges.get(from).filter(to => this.nodeElements.includes(to))
      );

      const toNodes = this.edges.get(from);

      for (const to of toNodes) {
        if (!this.edgeElements.some(edge => edge.from() == from && edge.to() == to)) {
          const edge = this.createEdge(from, to).end(0);
          this.edgeElements.push(edge);
          this.edgeContainer().add(edge);
          animations.push(edge.end(1, duration));
          animations.push(edge.opacity(1, duration));
        }
      }
    }

    for (const edge of this.edgeElements) {
      if (!this.edges.has(edge.from()) || !this.edges.get(edge.from()).includes(edge.to())) {
        removedEdges.push(edge);
        animations.push(edge.opacity(0, duration));
        continue;
      }
    }

    yield* all(...animations);

    for (const edge of removedEdges) {
      edge.remove();
      this.edgeElements = this.edgeElements.filter(e => e !== edge);
    }
  }

  protected createNode(node: string): GraphNode {
    return <GraphNode
      value={node}
      marginTop={130}
      size={this.nodeSize}
      rotation={() => -this.rotation()}
    /> as GraphNode;
  }

  protected createEdge(from: GraphNode, to: GraphNode): GraphEdge {
    return <GraphEdge
      from={from}
      to={to}
      opacity={0}
    /> as GraphEdge;
  }
}

export interface GraphNodeProps extends CircleProps {
  value?: SignalValue<string>;
  selectColor?: SignalValue<PossibleColor>;
}

export class GraphNode extends Circle {
  @initial("")
  @signal()
  public declare readonly value: SimpleSignal<string, this>;

  @initial(BLUE)
  @colorSignal()
  public declare readonly selectColor: ColorSignal<this>;

  private readonly txt = createRef<Txt>();

  constructor(props?: GraphNodeProps) {
    super({ ...props });

    this.value(props.value);
    this.selectColor(props.selectColor);

    this.fill(SURFACE0);
    this.stroke(SURFACE2);
    this.lineWidth(4);
    this.shadowColor(CRUST);
    this.shadowBlur(20);

    this.add(
      <Layout layout alignItems="center" justifyContent="center" size={"100%"} >
        <Txt
          ref={this.txt}
          text={this.value}
          fill={TEXT}
          fontFamily={"Maple Mono NF"}
          fontWeight={700}
          fontSize={40}
        />
      </Layout>
    );
  }

  public *select(duration: number = 0.3) {
    yield* all(
      this.stroke(this.selectColor, duration),
      this.lineWidth(6, duration),
      this.scale(1.1, duration),
    );
  }

  public *deselect(duration: number = 0.3) {
    yield* all(
      this.stroke(SURFACE2, duration),
      this.lineWidth(3, duration),
      this.scale(1, duration),
    );
  }
}

export interface GraphEdgeProps extends LineProps {
  from?: SignalValue<GraphNode>;
  to?: SignalValue<GraphNode>;
  selectColor?: SignalValue<PossibleColor>;
}

export class GraphEdge extends Line {
  @signal()
  public declare readonly from: SimpleSignal<GraphNode, this>;

  @signal()
  public declare readonly to: SimpleSignal<GraphNode, this>;

  @initial(BLUE)
  @colorSignal()
  public declare readonly selectColor: ColorSignal<this>;

  constructor(props?: GraphEdgeProps) {
    super({ ...props });

    this.from(props.from);
    this.to(props.to);
    this.selectColor(props.selectColor);

    this.stroke(SURFACE1);
    this.lineWidth(15);
    this.endArrow(true);
    this.arrowSize(30);
    this.lineCap("round");

    const points = createSignal(() => {
      const fromPosition = this.from().position();
      const toPosition = this.to().position();
      const normal = toPosition.sub(fromPosition).normalized;
      const start = fromPosition.add(normal.scale((this.from().size().x + 50) / 2));
      const end = toPosition.sub(normal.scale((this.to().size().x + 50) / 2));
      return [start, end];
    });

    this.points(points);
  }

  public *select(duration: number = 0.3) {
    yield* this.stroke(this.selectColor, duration);
  }

  public *deselect(duration: number = 0.3) {
    yield* this.stroke(SURFACE1, duration);
  }
}
