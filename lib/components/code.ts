import { flavors } from "@catppuccin/palette";
import { buildParser } from "@lezer/generator";
import { styleTags, tags as t } from "@lezer/highlight";
import { Code, LezerHighlighter, withDefaults } from "@motion-canvas/2d";
import { continuedIndent, delimitedIndent, HighlightStyle, indentNodeProp } from "@codemirror/language";

import { parser as juliaParser } from "@plutojl/lezer-julia";
import { parser as jsParser } from "@lezer/javascript";
import { parser as rustParser } from "@lezer/rust";
import { parser as cssParser } from "@lezer/css";

import wgslGrammar from "./grammars/wgsl?raw";
import { parser as goParser } from "@lezer/go";

const colors = flavors.mocha.colors;
const highlight = HighlightStyle.define([
  { tag: t.keyword, color: colors.mauve.hex },
  {
    tag: [
      t.name,
      t.definition(t.name),
      t.deleted,
      t.character,
      t.propertyName,
      t.macroName,
    ],
    color: colors.text.hex,
  },
  {
    tag: [
      t.function(t.variableName),
      t.function(t.propertyName),
      t.labelName,
    ],
    color: colors.blue.hex,
  },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: colors.peach.hex,
  },
  { tag: [t.self, t.atom], color: colors.red.hex },
  {
    tag: [t.typeName, t.className, t.changed, t.annotation, t.namespace],
    color: colors.yellow.hex,
  },
  { tag: [t.operator], color: colors.sky.hex },
  { tag: [t.url, t.link], color: colors.teal.hex },
  { tag: [t.escape, t.regexp], color: colors.pink.hex },
  {
    tag: [t.meta, t.punctuation, t.separator, t.comment],
    color: colors.overlay2.hex,
  },
  { tag: t.strong, fontWeight: "bold" },
  { tag: t.emphasis, fontStyle: "italic" },
  { tag: t.strikethrough, textDecoration: "line-through" },
  { tag: t.link, color: colors.blue.hex, textDecoration: "underline" },
  { tag: t.heading, fontWeight: "bold", color: colors.blue.hex },
  {
    tag: [t.special(t.variableName)],
    color: colors.lavender.hex,
  },
  { tag: [t.bool, t.number], color: colors.peach.hex },
  {
    tag: [t.processingInstruction, t.string, t.inserted],
    color: colors.green.hex,
  },
  { tag: t.invalid, color: colors.red.hex },
  { tag: t.macroName, color: colors.lavender.hex },
  { tag: t.propertyName, color: colors.lavender.hex },
]);

const wgslParser = buildParser(wgslGrammar).configure({
  props: [
    styleTags({
      Assign: t.operator,
      AddAssign: t.operator,
      SubAssign: t.operator,
      MulAssign: t.operator,
      DivAssign: t.operator,
      ModAssign: t.operator,
      LeftAssign: t.operator,
      RightAssign: t.operator,
      AndAssign: t.operator,
      XorAssign: t.operator,
      OrAssign: t.operator,
      Add: t.operator,
      Sub: t.operator,
      Mul: t.operator,
      Div: t.operator,
      Mod: t.operator,
      Left: t.operator,
      Right: t.operator,
      And: t.operator,
      Xor: t.operator,
      Or: t.operator,
      AndAnd: t.operator,
      OrOr: t.operator,
      Inc: t.operator,
      Dec: t.operator,
      Bang: t.operator,
      Tilde: t.operator,
      Eq: t.operator,
      Neq: t.operator,
      Lt: t.operator,
      Lte: t.operator,
      Gt: t.operator,
      Gte: t.operator,
      "<": t.operator,
      ">": t.operator,
      ReturnType: t.operator,

      Comment: t.comment,
      LineComment: t.comment,
      BlockComment: t.comment,
      "FunctionHeader/Identifier": t.macroName,
      "FunctionCall/Identifier": t.macroName,

      Keyword: t.keyword,
      Type: t.typeName,
      TypeDeclaration: t.typeName,
      Attribute: t.attributeName,
      "Attribute/Identifier": t.attributeName,
      "Attribute/IntLiteral": t.number,
      IntLiteral: t.number,
      UintLiteral: t.number,
      FloatLiteral: t.number,
      String: t.string,
      true: t.number,
      false: t.number,
      Directive: t.keyword,
      Identifier: t.macroName,
    }),
    // https://gitlab.com/unconed/use.gpu/-/blob/master/packages/shader/src/wgsl/highlight/wgsl.grammar
    indentNodeProp.add({
      ifStatement: continuedIndent({ except: /^\s*({|else\b)/ }),
      CompoundStatement: delimitedIndent({ closing: "}" }),
      StructBodyDeclaration: delimitedIndent({ closing: "}" }),
    }),
  ],
});
// fontStyle={"regular"} fontWeight={700} fontFamily={"Maple Mono NF"} fontSize={30} fill={SURFACE2}

const BaseCode = withDefaults(Code, {
  fontWeight: 700,
  fontFamily: "Maple Mono NF",
  fontSize: 50,
  fill: colors.overlay1.hex,
});

export const TS = withDefaults(BaseCode, {
  highlighter: new LezerHighlighter(jsParser.configure({ dialect: "ts" }), highlight)
});

export const Go = withDefaults(BaseCode, {
  highlighter: new LezerHighlighter(goParser, highlight)
});

export const CSS = withDefaults(BaseCode, {
  highlighter: new LezerHighlighter(cssParser, highlight)
});

export const Rust = withDefaults(BaseCode, {
  highlighter: new LezerHighlighter(rustParser, highlight)
});

export const WGSL = withDefaults(BaseCode, {
  highlighter: new LezerHighlighter(wgslParser, highlight)
});

export const Julia = withDefaults(BaseCode, {
  highlighter: new LezerHighlighter(juliaParser.configure({
    props: [
      styleTags({
      })
    ]
  }), highlight)
});
