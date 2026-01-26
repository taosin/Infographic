import { describe, expect, it } from 'vitest';

import { replaceTemplateLine } from '../../../../site/src/components/LiveEditor/templateManager';

describe('LiveEditor templateManager', () => {
  describe('replaceTemplateLine', () => {
    it('returns empty string when syntax and template are empty', () => {
      expect(replaceTemplateLine('', '')).toBe('');
      expect(replaceTemplateLine('   \n', '  ')).toBe('');
    });

    it('inserts infographic line when syntax is empty and template provided', () => {
      expect(replaceTemplateLine('', 'list-row')).toBe('infographic list-row');
      expect(replaceTemplateLine('   ', '  list-row  ')).toBe(
        'infographic list-row',
      );
    });

    it('updates existing infographic line when template provided', () => {
      expect(replaceTemplateLine('infographic a\nfoo', 'b')).toBe(
        'infographic b\nfoo',
      );
    });

    it('updates existing template line when template provided', () => {
      expect(replaceTemplateLine('template a\nfoo', 'b')).toBe('template b\nfoo');
    });

    it('preserves indentation when updating an indented template/infographic line', () => {
      expect(replaceTemplateLine('  template a\nfoo', 'b')).toBe(
        '  template b\nfoo',
      );
      expect(replaceTemplateLine('\tinfographic a\nfoo', 'b')).toBe(
        '\tinfographic b\nfoo',
      );
    });

    it('keeps keyword-only line when template is cleared (prevents invalid "infographic " line)', () => {
      const out1 = replaceTemplateLine('infographic a\ntheme dark', '');
      expect(out1).toBe('infographic\ntheme dark');
      expect(out1).not.toContain('infographic ');

      const out2 = replaceTemplateLine('template a\ntheme dark', '');
      expect(out2).toBe('template\ntheme dark');
      expect(out2).not.toContain('template ');
    });

    it('keeps existing keyword-only line when template is cleared', () => {
      expect(replaceTemplateLine('infographic\ntheme dark', '')).toBe(
        'infographic\ntheme dark',
      );
      expect(replaceTemplateLine('template\ntheme dark', '')).toBe(
        'template\ntheme dark',
      );
    });

    it('inserts infographic line if no template line exists and template provided', () => {
      expect(replaceTemplateLine('theme dark\nfoo', 'bar')).toBe(
        'infographic bar\ntheme dark\nfoo',
      );
    });

    it('does not modify syntax if template is cleared and no template line exists', () => {
      expect(replaceTemplateLine('theme dark\nfoo', '')).toBe('theme dark\nfoo');
    });
  });
});

