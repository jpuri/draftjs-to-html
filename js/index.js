/* @flow */

import { getBlockMarkup } from './block';
import { isList, getListMarkup } from './list';
import { ContentState } from 'draft-js';

/**
* The funciton will generate html markup for given draftjs editorContent.
*/
export default function draftToHtml(editorContent: ContentState): string {
  const html = [];
  if (editorContent) {
    const { blocks, entityMap } = editorContent;
    if (blocks && blocks.length > 0) {
      let listBlocks = [];
      editorContent.blocks.forEach((block) => {
        if (isList(block)) {
          listBlocks.push(block);
        } else {
          if (listBlocks.length > 0) {
            const listHtml = getListMarkup(listBlocks, entityMap);
            html.push(listHtml);
            listBlocks = [];
          }
          const blockHtml = getBlockMarkup(block, entityMap);
          html.push(blockHtml);
        }
      });
      if (listBlocks.length > 0) {
        const listHtml = getListMarkup(listBlocks, entityMap);
        html.push(listHtml);
        listBlocks = [];
      }
    }
  }
  return html.join('');
}
