import { tags as t } from '@lezer/highlight';
import { generateTheme, themeColors, themeStyles } from './utils.ts';

export default generateTheme(
    themeColors(
        '#2d2f3f',
        '#f8f8f2',
        '#f8f8f0',
        '#44475a',
        '#44475a',
        '#282a36',
        'rgb(144, 145, 148)',
        true
    ),
    themeStyles([
        ['#6272a4', t.comment],
        ['#f1fa8c', [t.string, t.special(t.brace)]],
        ['#bd93f9', [t.number, t.self, t.bool, t.null]],
        ['#ff79c6', [t.keyword, t.operator]],
        ['#8be9fd', [t.definitionKeyword, t.typeName]],
        ['#f8f8f2', t.definition(t.typeName)],
        ['#50fa7b', [t.className, t.definition(t.propertyName), t.function(t.variableName), t.attributeName ]],
    ]),
);