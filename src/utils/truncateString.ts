export function truncateString(str: string, num: number) {
  return str.length > num ? str.slice(0, num) + "..." : str;
}
