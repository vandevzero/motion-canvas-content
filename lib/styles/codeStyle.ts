import { parser } from "@lezer/javascript";
import { flavors } from "@catppuccin/palette";
import { tags as t } from "@lezer/highlight";
import { HighlightStyle } from "@codemirror/language";
import { LezerHighlighter } from "@motion-canvas/2d";

const colors = flavors.mocha.colors;

export const codeStyle = new LezerHighlighter(parser, HighlightStyle.define([
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
]));
