/**
 * Helpers for manipulating the template/infographic line in syntax text.
 *
 * Motivation: avoid generating invalid lines like `infographic ` (empty template),
 * which can break downstream parsing and UI controls (theme/palette etc).
 */

export function replaceTemplateLine(syntax: string, template: string): string {
  const trimmedSyntax = syntax.trim();
  const trimmedTemplate = template.trim();

  // If template is empty, keep a keyword-only line (infographic/template) if present,
  // and avoid inserting an invalid "infographic " line.
  if (!trimmedTemplate) {
    if (!trimmedSyntax) return '';
    const lines = syntax.split('\n');
    const templateLineIndex = lines.findIndex((line) => {
      const trimmedLine = line.trim();
      return (
        trimmedLine === 'infographic' ||
        trimmedLine.startsWith('infographic ') ||
        trimmedLine === 'template' ||
        trimmedLine.startsWith('template ')
      );
    });
    if (templateLineIndex >= 0) {
      const indent = lines[templateLineIndex].match(/^\s*/)?.[0] || '';
      const trimmedLine = lines[templateLineIndex].trim();
      const keyword = trimmedLine.startsWith('template') ? 'template' : 'infographic';
      lines[templateLineIndex] = `${indent}${keyword}`;
      return lines.join('\n');
    }
    return syntax;
  }

  if (!trimmedSyntax) return `infographic ${trimmedTemplate}`;

  const lines = syntax.split('\n');
  const templateLineIndex = lines.findIndex((line) => {
    const trimmedLine = line.trim();
    return (
      trimmedLine === 'infographic' ||
      trimmedLine.startsWith('infographic ') ||
      trimmedLine === 'template' ||
      trimmedLine.startsWith('template ')
    );
  });

  if (templateLineIndex >= 0) {
    const indent = lines[templateLineIndex].match(/^\s*/)?.[0] || '';
    const keyword = lines[templateLineIndex].trim().startsWith('template')
      ? 'template'
      : 'infographic';
    lines[templateLineIndex] = `${indent}${keyword} ${trimmedTemplate}`;
    return lines.join('\n');
  }

  return `infographic ${trimmedTemplate}\n${syntax}`;
}

