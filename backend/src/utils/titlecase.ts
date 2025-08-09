export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function toUpperCase(str: string): string {
  return str.toUpperCase();
}

export function formatPrimaryKey(input: string): string {
  return input.replace(/\./g, '').toLowerCase();
}
