# DraftJS Utils

A library for converting DraftJS [ContentBlock](https://facebook.github.io/draft-js/docs/api-reference-content-block.html#content) to plain HTML.

This is draft to HTML library I wrote for one of my projects. I am open-sourcing it so that others can also be benefitted from my work.

## Installing

`npm install draftjs-to-html`

## Using

```
import draftToHtml from 'draftjs-to-html';

const contentState = editorState.getCurrentContent();
const markup = draftToHtml(contentState);
```

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
| 10 | unstyled | p |
It performs these additional changes to text of blocks:
- replace blank space in beginning and end of block with '&nbsp;'
- replace '\n' with '<br>\n'
- replace '<' with '&lt;'
- replace '>' with '&gt;'

2. Converts ordered and unordered list blocks with depths to nested structure of <ul>, <ol> and <li>.

3. Converts inline styles BOLD, ITALIC, UNDERLINE to corresponding HTML tags: <strong>, <em>, <ins>.

4. Converts inline styles color, fontsize to a span tag with inline style details:
<span style="color:xyz;font-size:xx">. The inline styles should start with strings 'color' or 'font-size' like 'color-red', 'color-green' or 'font-size-12', 'fontsize-20'.

5. Converts entity range on link to anchor tag using entity data url for href: <a href="url" />.

6. Converts entity image to image tag using entity data src for image source: <img src="src" />.


## License
MIT.
