# DraftJS TO HTML

A library for converting DraftJS Editor content to plain HTML.

This is draft to HTML library I wrote for one of my projects. I am open-sourcing it so that others can also be benefitted from my work.

## Installation

`npm install draftjs-to-html`

## Usage

```js
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const rawContentState = convertToRaw(editorState.getCurrentContent());

const markup = draftToHtml(
  rawContentState, 
  hashtagConfig, 
  directional, 
  customEntityTransform
);
```
The function parameters are:

1. **contentState**: Its instance of  [RawDraftContentState](https://facebook.github.io/draft-js/docs/api-reference-data-conversion.html#content)

2. **hashConfig**: Its configuration object for hashtag, its required only if hashtags are used. If the object is not defined hashtags will be output as simple text in the markdown.
    ```js
    hashConfig = {
      trigger: '#',
      separator: ' ',
    }
    ```
    Here trigger is character that marks starting of hashtag (default '#') and separator is character that separates characters (default ' '). These fields in hastag object are optional.

3. **directional**: Boolean, if directional is true text is aligned according to bidi algorithm. This is also optional.

4. **customEntityTransform**: Its function to render custom defined entities by user, its also optional.

   **editorState** is instance of DraftJS               [EditorState](https://draftjs.org/docs/api-reference-editor-state.html#content).

## Supported conversions
Following is the list of conversions it supports:

1. Convert block types to corresponding HTML tags:

    || Block Type | HTML Tag |
    | -------- | -------- | -------- |
    | 1 | header-one | h1 |
    | 2 | header-two | h2 |
    | 3 | header-three | h3 |
    | 4 | header-four | h4 |
    | 5 | header-five | h5 |
    | 6 | header-six | h6 |
    | 7 | unordered-list-item | ul |
    | 8 | ordered-list-item | ol |
    | 9 | blockquote | blockquote |
    | 10 | code | pre |
    | 11 | unstyled | p |

    It performs these additional changes to text of blocks:
    - replace blank space in beginning and end of block with `&nbsp;`
    - replace `\n` with `<br>`
    - replace `<` with `&lt;`
    - replace `>` with `&gt;`


2. Converts ordered and unordered list blocks with depths to nested structure of `<ul>, <ol>` and `<li>`.

3. Converts inline styles BOLD, ITALIC, UNDERLINE, STRIKETHROUGH, CODE, SUPERSCRIPT, SUBSCRIPT to corresponding HTML tags: `<strong>, <em>, <ins>, <code>, <sup>, <sub>`.

4. Converts inline styles color, background-color, font-size, font-family to a span tag with inline style details:
`<span style="color:xyz;font-size:xx">`. (The inline styles in JSON object should start with strings `color` or `font-size` like `color-red`, `color-green` or `fontsize-12`, `fontsize-20`).

5. Converts entity range of type link to anchor tag using entity data url for href, targetOption for target: `<a href="url" target="_self">text</a>`. Default target is `_self`.

6. Converts entity range of type mention to anchor tag using entity data url for href and value for data-value, it also adds class to it: `<a href="url" class="wysiwyg-mention" data-mention data-value="value">text</a>`.

7. Converts atomic entity image to image tag using entity data src for image source, and if present alt, alignment, height, width also: `<img src="src" alt="alt_text" style="float: left, height: 50px; width: 50px"/>`.

8. Converts embedded links to iFrames, using width, height and src from entity data. `<iframe width="width" height="height" src="src" frameBorder="0"></iframe>`

9. Converts hashtags to anchor tag: `<a href="#tag" class="wysiwyg-hashtag">#tag</a>`.

9. `customEntityTransform` can be used for transformation of a custom entity block to html. If present its call to generate html for entity. It can take 2 parameter:
   1. `entity` ( object with { type, mutalibity, data})
   2. `text` text present in the block.

10. Adding style property to block tag for block level styles like text-align: `<p style="text-align: right">text</p>`.

11. RTL, if directional function parameter is true, generated blocks have property `dir = "auto"` thus they get aligned according to bidi algorithm.

## License
MIT.
