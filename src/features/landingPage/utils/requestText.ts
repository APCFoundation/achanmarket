export default function requestText(textScroll: string) {
  let alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(97 + i)
  );
  let textSplit = textScroll.split("");
  let count = 0;

  return { alphabet, textSplit, count };
}
