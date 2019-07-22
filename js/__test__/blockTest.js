/* @flow */

import { assert } from 'chai';
import {
  getBlockTag,
  trimLeadingZeros,
  trimTrailingZeros,
  getStylesAtOffset,
  sameStyleAsPrevious,
  addInlineStyleMarkup,
  addStylePropertyMarkup,
} from '../block';

describe('getBlockTag test suite', () => {
  it('should return correct block tag when getBlockTag is called', () => {
    assert.equal(getBlockTag('header-one'), 'h1');
    assert.equal(getBlockTag('unordered-list-item'), 'ul');
    assert.equal(getBlockTag('unstyled'), 'p');
  });
});

describe('trimLeadingZeros test suite', () => {
  it('should correctly replace leading blank spaces', () => {
    assert.equal(trimLeadingZeros('  testing'), '&nbsp;&nbsp;testing');
    assert.equal(trimLeadingZeros('tes ting'), 'tes ting');
    assert.equal(trimLeadingZeros('testing   '), 'testing   ');
    assert.equal(trimLeadingZeros(''), '');
  });
});

describe('trimTrailingZeros test suite', () => {
  it('should correctly replace trailing blank spaces', () => {
    assert.equal(trimTrailingZeros('  testing'), '  testing');
    assert.equal(trimTrailingZeros('tes ting'), 'tes ting');
    assert.equal(trimTrailingZeros('testing  '), 'testing&nbsp;&nbsp;');
    assert.equal(trimTrailingZeros(''), '');
  });
});

describe('getStylesAtOffset test suite', () => {
  it('should return correct styles at some offset', () => {
    const inlineStyles = {
      BOLD: [true, true],
      ITALIC: [false, false],
      UNDERLINE: [true, false],
      STRIKETHROUGH: [false, false],
      CODE: [true, false],
      SUBSCRIPT: [true, false],
      SUPERSCRIPT: [true, false],
      COLOR: ['rgb(97,189,109)', 'rgb(26,188,156)'],
      BGCOLOR: ['rgb(99,199,199)', 'rgb(28,189,176)'],
      FONTSIZE: [10, 20],
      FONTFAMILY: ['Arial', 'Georgia'],
    };
    let styles = getStylesAtOffset(inlineStyles, 0);
    assert.equal(styles.COLOR, 'rgb(97,189,109)');
    assert.equal(styles.BGCOLOR, 'rgb(99,199,199)');
    assert.equal(styles.FONTSIZE, 10);
    assert.equal(styles.FONTFAMILY, 'Arial');
    assert.equal(styles.ITALIC, undefined);
    assert.equal(styles.UNDERLINE, true);
    assert.equal(styles.SUBSCRIPT, true);
    assert.equal(styles.SUPERSCRIPT, true);
    assert.equal(styles.BOLD, true);
    styles = getStylesAtOffset(inlineStyles, 1);
    assert.equal(styles.COLOR, 'rgb(26,188,156)');
    assert.equal(styles.BGCOLOR, 'rgb(28,189,176)');
    assert.equal(styles.FONTSIZE, 20);
    assert.equal(styles.FONTFAMILY, 'Georgia');
    assert.equal(styles.ITALIC, undefined);
    assert.equal(styles.UNDERLINE, undefined);
    assert.equal(styles.SUBSCRIPT, undefined);
    assert.equal(styles.SUPERSCRIPT, undefined);
    assert.equal(styles.BOLD, true);
  });
});

describe('sameStyleAsPrevious test suite', () => {
  it('should return true ifstyles at offset is same as style at previous offset', () => {
    const inlineStyles = {
      BOLD: [true, true, false],
      ITALIC: [false, false, true],
      UNDERLINE: [true, true, false],
      COLOR: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(26,188,156)'],
      BGCOLOR: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(26,188,156)'],
      FONTSIZE: [10, 10, 20],
      FONTFAMILY: ['Arial', 'Arial', 'Georgia'],
      length: 3,
    };
    let sameStyled = sameStyleAsPrevious(inlineStyles, ['BOLD', 'ITALIC', 'UNDERLINE'], 1);
    assert.isTrue(sameStyled);
    sameStyled = sameStyleAsPrevious(inlineStyles, ['BOLD', 'ITALIC', 'COLOR', 'BGCOLOR'], 1);
    assert.isNotTrue(sameStyled);
  });
  it('should return false if offset is 0', () => {
    const inlineStyles = {
      BOLD: [true, true, false],
      ITALIC: [false, false, true],
      UNDERLINE: [true, true, false],
      COLOR: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(26,188,156)'],
      BGCOLOR: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(26,188,156)'],
      FONTSIZE: [10, 10, 20],
      FONTFAMILY: ['Arial', 'Arial', 'Georgia'],
    };
    const sameStyled = sameStyleAsPrevious(inlineStyles, ['BOLD', 'ITALIC', 'UNDERLINE'], 0);
    assert.isNotTrue(sameStyled);
  });
  it('should return false if offset exceeds length', () => {
    const inlineStyles = {
      BOLD: [true, true, false],
      ITALIC: [false, false, true],
      UNDERLINE: [true, true, false],
      STRIKETHROUGH: [true, true, false],
      CODE: [true, true, false],
      COLOR: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(26,188,156)'],
      FONTSIZE: [10, 10, 20],
      FONTFAMILY: ['Arial', 'Arial', 'Georgia'],
    };
    const sameStyled = sameStyleAsPrevious(
      inlineStyles,
      ['BOLD', 'ITALIC', 'UNDERLINE', 'STRIKETHROUGH', 'CODE'], 3,
    );
    assert.isNotTrue(sameStyled);
  });
});

describe('addInlineStyleMarkup test suite', () => {
  let markup = addInlineStyleMarkup('BOLD', 'test');
  assert.equal(markup, '<strong>test</strong>');
  markup = addInlineStyleMarkup('ITALIC', 'test');
  assert.equal(markup, '<em>test</em>');
  markup = addInlineStyleMarkup('UNDERLINE', 'test');
  assert.equal(markup, '<ins>test</ins>');
  markup = addInlineStyleMarkup('STRIKETHROUGH', 'test');
  assert.equal(markup, '<del>test</del>');
  markup = addInlineStyleMarkup('CODE', 'test');
  assert.equal(markup, '<code>test</code>');
});

describe('addStylePropertyMarkup test suite', () => {
  it('should correctly add styles based on styles object', () => {
    let markup = addStylePropertyMarkup(
      {
        COLOR: 'red',
        BGCOLOR: 'pink',
        FONTSIZE: 10,
        FONTFAMILY: 'Arial',
      },
      'test',
    );
    assert.equal(
      markup,
      '<span style="color: red;background-color: pink;font-size: 10px;font-family: Arial;">test</span>',
    );
    markup = addStylePropertyMarkup({ COLOR: 'red' }, 'test');
    assert.equal(markup, '<span style="color: red;">test</span>');
    markup = addStylePropertyMarkup({ BGCOLOR: 'pink' }, 'test');
    assert.equal(markup, '<span style="background-color: pink;">test</span>');
    markup = addStylePropertyMarkup({ FONTFAMILY: 'Arial' }, 'test');
    assert.equal(markup, '<span style="font-family: Arial;">test</span>');
    markup = addStylePropertyMarkup({ FONTSIZE: 'medium' }, 'test');
    assert.equal(markup, '<span style="font-size: medium;">test</span>');
    markup = addStylePropertyMarkup({ FONTSIZE: '24' }, 'test');
    assert.equal(markup, '<span style="font-size: 24px;">test</span>');
    markup = addStylePropertyMarkup({ BOLD: true }, 'test');
    assert.equal(markup, 'test');
    markup = addStylePropertyMarkup(undefined, 'test');
    assert.equal(markup, 'test');
  });
});
