import { Code, CodeSelection, codeSignal, CodeSignal, Icon, initial, Layout, LayoutProps, PossibleCodeScope, PossibleCodeSelection, Rect, signal } from "@motion-canvas/2d";
import { CRUST, MANTLE, SURFACE0 } from "../styles/colors";
import { createRef, Signal, SignalValue, SimpleSignal } from "@motion-canvas/core";
import { TS } from "./code";
import { Text } from "./text";

export interface EditorProps extends LayoutProps {
  tabs?: SignalValue<string[]>;
  code?: SignalValue<PossibleCodeScope>;
}

export class Editor extends Layout {
  @initial("")
  @codeSignal()
  public readonly code: CodeSignal<this>;

  @initial([])
  @signal()
  private readonly tabs: SimpleSignal<string[]>;

  private readonly tabbar = createRef<Layout>();
  private readonly content = createRef<Rect>();
  private readonly codeElement = createRef<Code>();

  public get selection(): Signal<PossibleCodeSelection, CodeSelection, Code> {
    return this.codeElement()?.selection;
  }

  constructor(props?: EditorProps) {
    super({ ...props });

    this.tabs(props.tabs);
    this.layout(true);
    this.direction("column");
    this.gap(15);

    this.add(
      <>
        <Layout ref={this.tabbar} layout>
          {
            this.tabs().map((fileName, _) => this.createTab(fileName))
          }
        </Layout>

        <Rect
          ref={this.content}
          padding={[30, 40]}
          minWidth={700}
          fill={MANTLE}
          stroke={SURFACE0}
          shadowBlur={30}
          shadowColor={CRUST}
          radius={10}
          lineWidth={4}
        >
          <TS ref={this.codeElement} code={this.code} fontSize={40} />
        </Rect>
      </>
    );
  }

  private createTab(fileName: string): Rect {
    return (
      <Rect
        layout
        gap={15}
        alignItems={"center"}
        padding={[18, 30]}
        fill={MANTLE}
        radius={10}
        shadowBlur={20}
        shadowColor={CRUST}
        lineWidth={4}
        stroke={SURFACE0}
      >
        <Icon icon={"logos:typescript-icon"} size={30} />
        <Text
          text={fileName}
          fontSize={30}
          fontWeight={900}
          fontFamily={"Maple Mono NF"}
        />
      </Rect > as Rect
    );
  }
}
