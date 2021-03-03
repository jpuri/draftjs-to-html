/* @flow */

import { getBlockMarkup } from './block';
import { isList, getListMarkup } from './list';

/**
* The function will generate html markup for given draftjs editorContent.
*/
export default function draftToHtml(
  editorContent,
  hashtagConfig,
  directional,
  customEntityTransform,
) {
  const html = [];
  if (editorContent) {
    const { blocks, entityMap } = editorContent;
    if (blocks && blocks.length > 0) {
      let listBlocks = [];
      blocks.forEach((block) => {
        if (isList(block.type)) {
          listBlocks.push(block);
        } else {
          if (listBlocks.length > 0) {
            const listHtml = getListMarkup(listBlocks, entityMap, hashtagConfig, customEntityTransform); // eslint-disable-line max-len
            html.push(listHtml);
            listBlocks = [];
          }
          const blockHtml = getBlockMarkup(
            block,
            entityMap,
            hashtagConfig,
            directional,
            customEntityTransform,
          );
          html.push(blockHtml);
        }
      });
      if (listBlocks.length > 0) {
        const listHtml = getListMarkup(listBlocks, entityMap, hashtagConfig, directional, customEntityTransform); // eslint-disable-line max-len
        html.push(listHtml);
        listBlocks = [];
      }
    }
  }

  const cleanedHtml = html.map((htmlBlock) => {
    if (htmlBlock === '<h1></h1>\n') return '<h1><br></h1>';
    if (htmlBlock === '<h2></h2>\n') return '<h2><br></h2>';
    if (htmlBlock === '<h3></h3>\n') return '<h3><br></h3>';
    if (htmlBlock === '<h4></h4>\n') return '<h4><br></h4>';
    if (htmlBlock === '<h5></h5>\n') return '<h5><br></h5>';
    if (htmlBlock === '<p></p>\n') return '<p><br></p>';

    return htmlBlock;
  });

  return cleanedHtml.join('');
}
