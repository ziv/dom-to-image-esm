import type { Tag } from '@lezer/highlight';
import { EditorView } from '@codemirror/view';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { Extension } from '@codemirror/state';

export type Color = string;
export type T = Tag | Tag[];

export function themeColors(background: Color, foreground: Color, caret: Color, selection: Color, lineHighlight: Color, gutterBackground: Color, gutterForeground: Color, dark = false): Extension {
    return EditorView.theme({
        '&': {
            backgroundColor: background,
            color: foreground,
        },
        '.cm-content': {
            caretColor: caret,
        },
        '.cm-cursor, .cm-dropCursor': {
            borderLeftColor: caret,
        },
        '&.cm-focused .cm-selectionBackgroundm .cm-selectionBackground, .cm-content ::selection':
            {
                backgroundColor: selection,
            },
        '.cm-activeLine': {
            backgroundColor: lineHighlight,
        },
        '.cm-gutters': {
            backgroundColor: gutterBackground,
            color: gutterForeground,
        },
        '.cm-activeLineGutter': {
            backgroundColor: lineHighlight,
        },
    }, {dark});
}


export function themeStyles(items: [Color, T][]) {
    return syntaxHighlighting(HighlightStyle.define(items.map(i => ({tag: i[1], color: i[0]}))));
}

export function generateTheme(t: Extension, s: Extension) {
    return [t, s];
}