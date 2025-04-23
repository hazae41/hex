export interface Radixable<N extends number> {
  toString(radix: N): string
}