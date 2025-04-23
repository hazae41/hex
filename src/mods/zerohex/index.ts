import { RawHexString } from "mods/rawhex/index.js"

declare global {

  interface SymbolConstructor {
    readonly isZeroHex: symbol
  }

}

export type ZeroHexString<N extends number = number> = number extends N
  ? `0x${string}` & { readonly [Symbol.isZeroHex]: true }
  : `0x${string}` & { readonly [Symbol.isZeroHex]: true } & { readonly length: N }

export namespace ZeroHexString {

  export type Unsafe<N extends number = number> = number extends N
    ? `0x${string}`
    : `0x${string}` & { readonly length: N }

  export namespace Unsafe {

    export function as(value: Unsafe) {
      return value as ZeroHexString
    }

    export function is(value: Unsafe): value is ZeroHexString {
      return /^0x[0-9a-fA-F]*$/.test(value)
    }

  }

  export namespace String {

    export function as(value: string) {
      return value as ZeroHexString
    }

    export function is(value: string): value is ZeroHexString {
      return /^0x[0-9a-fA-F]*$/.test(value)
    }

  }

  export namespace Unknown {

    export function as(value: unknown) {
      return value as ZeroHexString
    }

    export function is(value: unknown): value is ZeroHexString {
      return typeof value === "string" && /^0x[0-9a-fA-F]*$/.test(value)
    }
  }

  export function fromRawHex(value: RawHexString): ZeroHexString {
    return `0x${value}` as ZeroHexString
  }

}
