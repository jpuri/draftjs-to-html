/* @flow */

import emojiRegex from 'emoji-regex';

import { getBlockMarkup } from './block';
import { isList, getListMarkup } from './list';

// This code is `num lock`, and this code is not used in `string` normally.
const mockEmoji = String.fromCharCode(144);
const regex = emojiRegex();

/**
* This function will replace mockEmoji with real emoji.
*/
function replaceEmoji(emojiList, mockEmoji, html) {
  var newHtml = html;

  emojiList.forEach((emoji) => {
    newHtml = newHtml.replace(mockEmoji, emoji);
  });

  return newHtml;
}


/**
* The function will generate html markup for given draftjs editorContent.
*/
export default function draftToHtml(
  editorContent: Object,
  hashtagConfig: Object,
  directional: boolean,
  customEntityTransform: Function,
): string {
  const html = [];
  if (editorContent) {
    const { blocks, entityMap } = editorContent;
    if (blocks && blocks.length > 0) {
      let listBlocks = [];
      let listEmoji = [];
      blocks.forEach((block) => {
        const emojiList = [];
        let emojiMatch;

        while (emojiMatch = regex.exec(block.text)) {
          const emoji = emojiMatch[0];

          block.text = block.text.replace(emoji, mockEmoji);
          emojiList.push(emoji);
        }

        if (isList(block.type)) {
          listBlocks.push(block);
          listEmoji.push(...emojiList);
        } else {
          if (listBlocks.length > 0) {
            const listHtml = getListMarkup(listBlocks, entityMap, hashtagConfig, customEntityTransform); // eslint-disable-line max-len
            html.push(replaceEmoji(listEmoji, mockEmoji, listHtml));
            listBlocks = [];
            listEmoji = [];
          }
          const blockHtml = getBlockMarkup(
            block,
            entityMap,
            hashtagConfig,
            directional,
            customEntityTransform,
          );
          html.push(replaceEmoji(emojiList, mockEmoji, blockHtml));
        }
      });
      if (listBlocks.length > 0) {
        const listHtml = getListMarkup(listBlocks, entityMap, hashtagConfig, directional, customEntityTransform); // eslint-disable-line max-len
        html.push(replaceEmoji(listEmoji, mockEmoji, listHtml));
        listBlocks = [];
        listEmoji = [];
      }
    }
  }
  return html.join('');
}
