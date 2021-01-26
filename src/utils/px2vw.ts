export default function px2vw(size: number): string {
  return `${(size / 1440) * 100}vw`;
}
