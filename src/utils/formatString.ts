export default function formatString(date: string): string {
  return date.replace(/[^\d]+/g, '');
}
