function shortenAddress(address: `0x${string}` | undefined) {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 4)}....${address.slice(-3)}`;
}

export { shortenAddress };
