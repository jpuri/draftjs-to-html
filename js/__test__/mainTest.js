import { assert } from 'chai';
import { convertFromHTML, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from '../index';

describe('draftToHtml test suite', () => {
  it('should return correct html', () => {
    const html = '<p>testing</p>\n';
    const arrContentBlocks = convertFromHTML(html);
    const contentState = ContentState.createFromBlockArray(arrContentBlocks);
    const result = draftToHtml(convertToRaw(contentState));
    assert.equal(html, result);
  });

  it('should return empty string for undefined input', () => {
    const result = draftToHtml(undefined);
    assert.equal('', result);
  });

  it('should return correct result for list', () => {
    let html = '<ul><li>1</li>\n<li>2</li>\n<li>3</li>\n</ul>\n';
    let output = '<ul>\n<li>1</li>\n<li>2</li>\n<li>3</li>\n</ul>\n';
    let arrContentBlocks = convertFromHTML(html);
    let contentState = ContentState.createFromBlockArray(arrContentBlocks);
    let result = draftToHtml(convertToRaw(contentState));
    assert.equal(output, result);

    html = '<ol><li>1</li>\n<li>2</li>\n<li>3</li>\n</ol>\n';
    output = '<ol>\n<li>1</li>\n<li>2</li>\n<li>3</li>\n</ol>\n';
    arrContentBlocks = convertFromHTML(html);
    contentState = ContentState.createFromBlockArray(arrContentBlocks);
    result = draftToHtml(convertToRaw(contentState));
    assert.equal(output, result);

    html = '<ol><li>1</li>\n<ol><li>2</li>\n</ol>\n<li>3</li>\n</ol>\n';
    output = '<ol>\n<li>1</li>\n<ol>\n<li>2</li>\n</ol>\n<li>3</li>\n</ol>\n';
    arrContentBlocks = convertFromHTML(html);
    contentState = ContentState.createFromBlockArray(arrContentBlocks);
    result = draftToHtml(convertToRaw(contentState));
    assert.equal(output, result);

    html = '<ol><li>1</li>\n<ol><li>2</li>\n<li>3</li>\n</ol>\n<li>4</li>\n</ol>\n';
    output = '<ol>\n<li>1</li>\n<ol>\n<li>2</li>\n<li>'
      + '3</li>\n</ol>\n<li>4</li>\n</ol>\n';
    arrContentBlocks = convertFromHTML(html);
    contentState = ContentState.createFromBlockArray(arrContentBlocks);
    result = draftToHtml(convertToRaw(contentState));
    assert.equal(output, result);

    html = '<ol><li>1</li>\n<ol><li>2</li>\n<ol><li>3</li>\n</ol>'
      + '\n</ol>\n<li>3</li>\n</ol>\n';
    output = '<ol>\n<li>1</li>\n<ol>\n<li>2</li>\n<ol>\n<li>3'
      + '</li>\n</ol>\n</ol>\n<li>3</li>\n</ol>\n';
    arrContentBlocks = convertFromHTML(html);
    contentState = ContentState.createFromBlockArray(arrContentBlocks);
    result = draftToHtml(convertToRaw(contentState));
    assert.equal(output, result);
  });

  it('should return correct result for inline styles color', () => {
    let html = '<ul><li>1</li>\n<li>2</li>\n<li>3</li>\n</ul>\n';
    let output = '<ul>\n<li>1</li>\n<li>2</li>\n<li>3</li>\n</ul>\n';
    let arrContentBlocks = convertFromHTML(html);
    let contentState = ContentState.createFromBlockArray(arrContentBlocks);
    let result = draftToHtml(convertToRaw(contentState));
    assert.equal(output, result);

    html = '<ol><li>1</li>\n<li>2</li>\n<li>3</li>\n</ol>\n';
    output = '<ol>\n<li>1</li>\n<li>2</li>\n<li>3</li>\n</ol>\n';
    arrContentBlocks = convertFromHTML(html);
    contentState = ContentState.createFromBlockArray(arrContentBlocks);
    result = draftToHtml(convertToRaw(contentState));
    assert.equal(output, result);

    html = '<ol><li>1</li>\n<ol><li>2</li>\n</ol>\n<li>3</li>\n</ol>\n';
    output = '<ol>\n<li>1</li>\n<ol>\n<li>2</li>\n</ol>\n<li>3</li>\n</ol>\n';
    arrContentBlocks = convertFromHTML(html);
    contentState = ContentState.createFromBlockArray(arrContentBlocks);
    result = draftToHtml(convertToRaw(contentState));
    assert.equal(output, result);

    html = '<ol><li>1</li>\n<ol><li>2</li>\n<li>3</li>\n</ol>\n<li>4</li>\n</ol>\n';
    output = '<ol>\n<li>1</li>\n<ol>\n<li>2</li>\n<li>3'
      + '</li>\n</ol>\n<li>4</li>\n</ol>\n';
    arrContentBlocks = convertFromHTML(html);
    contentState = ContentState.createFromBlockArray(arrContentBlocks);
    result = draftToHtml(convertToRaw(contentState));
    assert.equal(output, result);

    html = '<ol><li>1</li>\n<ol><li>2</li>\n<ol><li>3</li>\n</ol>'
      + '\n</ol>\n<li>3</li>\n</ol>\n';
    output = '<ol>\n<li>1</li>\n<ol>\n<li>2</li>\n<ol>\n<li>3'
      + '</li>\n</ol>\n</ol>\n<li>3</li>\n</ol>\n';
    arrContentBlocks = convertFromHTML(html);
    contentState = ContentState.createFromBlockArray(arrContentBlocks);
    result = draftToHtml(convertToRaw(contentState));
    assert.equal(output, result);
  });

  it('should return correct result for different heading styles', () => {
    let html = '<h1>testing</h1>\n';
    let arrContentBlocks = convertFromHTML(html);
    let contentState = ContentState.createFromBlockArray(arrContentBlocks);
    let result = draftToHtml(convertToRaw(contentState));
    assert.equal(html, result);

    html = '<h2>testing</h2>\n';
    arrContentBlocks = convertFromHTML(html);
    contentState = ContentState.createFromBlockArray(arrContentBlocks);
    result = draftToHtml(convertToRaw(contentState));
    assert.equal(html, result);

    html = '<blockquote>testing</blockquote>\n';
    arrContentBlocks = convertFromHTML(html);
    contentState = ContentState.createFromBlockArray(arrContentBlocks);
    result = draftToHtml(convertToRaw(contentState));
    assert.equal(html, result);
  });

  it('should return correct result when there are emojis', () => {
    const html = '<p><strong>👈</strong>👈</p>\n';
    const arrContentBlocks = convertFromHTML(html);
    const contentState = ContentState.createFromBlockArray(arrContentBlocks);
    const result = draftToHtml(convertToRaw(contentState));
    assert.equal(html, result);
  });
});
