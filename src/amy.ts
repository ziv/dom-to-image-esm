import { tags as t } from '@lezer/highlight';
import { generateTheme, themeColors, themeStyles } from './utils.ts';

export default generateTheme(
    themeColors(
        '#200020',
        '#D0D0FF',
        '#7070FF',
        '#80000080',
        '#80000040',
        '#282a36',
        '#C080C0',
        true
    ),
    themeStyles([
        ['#404080', t.comment],
        ['#999999', [t.string, t.regexp]],
        ['#7090B0', t.number],
        ['#8080A0', [t.bool, t.null]],
        ['#805080', [t.punctuation, t.derefOperator]],
        ['#60B0FF', t.keyword],
        ['#B0FFF0', t.definitionKeyword],
    ]),
);