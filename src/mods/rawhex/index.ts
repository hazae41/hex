import { ZeroHexString } from "mods/zerohex/index.js"

declare global {
  interface SymbolConstructor {
    readonly isRawHex: symbol
  }
}

export type RawHexString<N extends number = number> = number extends N
  ? string & { readonly [Symbol.isRawHex]: true }
  : string & { readonly [Symbol.isRawHex]: true } & { readonly length: N }

export namespace RawHexString {

  export namespace String {

    export function as(value: string) {
      return value as RawHexString
    }

    export function is(value: string): value is RawHexString {
      return /^[0-9a-fA-F]*$/.test(value)
    }

  }

  export namespace Unknown {

    export function as(value: unknown) {
      return value as RawHexString
    }

    export function is(value: unknown): value is RawHexString {
      return typeof value === "string" && /^[0-9a-fA-F]*$/.test(value)
    }

  }

  export function fromZeroHex(value: ZeroHexString): RawHexString {
    return value.slice(2) as RawHexString
  }

  export function padStart(text: RawHexString) {
    return text.padStart(text.length + (text.length % 2), "0") as RawHexString
  }

  export function padEnd(text: RawHexString) {
    return text.padEnd(text.length + (text.length % 2), "0") as RawHexString
  }

}

