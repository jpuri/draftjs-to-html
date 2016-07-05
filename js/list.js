import {
  getBlockTag,
  getBlockInnerMarkup,
} from './block';

/**
* Function to check if a block is of type list.
*/
export function isList(block: Object): any {
  if (block) {
    const blockType = block.type;
    return (
      blockType === 'unordered-list-item' ||
      blockType === 'ordered-list-item'
    );
  }
  return undefined;
}

/**
* Function will return html markup for a list block.
*/
export function getListMarkup(listBlocks: Array<Object>, entityMap: Object): string {
  const listHtml = [];
  let nestedListBlock = [];
  let previousBlock;
  listBlocks.forEach((block) => {
    let nestedBlock = false;
    if (!previousBlock) {
      listHtml.push(`<${getBlockTag(block.type)}>\n`);
    } else {
      if (previousBlock.type !== block.type) {
        listHtml.push(`</${getBlockTag(previousBlock.type)}>\n`);
        listHtml.push(`<${getBlockTag(block.type)}>\n`);
      } else if (previousBlock.depth === block.depth) {
        if (nestedListBlock && nestedListBlock.length > 0) {
          listHtml.push('<li>\n');
          listHtml.push(getListMarkup(nestedListBlock));
          listHtml.push('</li>\n');
          nestedListBlock = [];
        }
      } else {
        nestedBlock = true;
        nestedListBlock.push(block);
      }
    }
    if (!nestedBlock) {
      listHtml.push('<li>');
      listHtml.push(getBlockInnerMarkup(block, entityMap));
      listHtml.push('</li>\n');
      previousBlock = block;
    }
  });
  if (nestedListBlock && nestedListBlock.length > 0) {
    listHtml.push('<li>');
    listHtml.push(getListMarkup(nestedListBlock));
    listHtml.push('</li>\n');
  }
  listHtml.push(`</${getBlockTag(previousBlock.type)}>\n`);
  return listHtml.join('');
}
