import { Nullable } from "libs/nullable/index.js"
import { Radixable } from "libs/radixable/index.js"
import { RawHexString } from "mods/rawhex/index.js"

declare global {

  interface SymbolConstructor {
    readonly isZeroHex: symbol
  }

}

export class ZeroHexStringError extends Error {
  readonly #class = ZeroHexStringError
  readonly name = this.#class.name

  constructor(
    readonly value: unknown
  ) {
    super()
  }

}

export type ZeroHexString<N extends number = number> = number extends N
  ? `0x${string}` & { readonly [Symbol.isZeroHex]: true }
  : `0x${string}` & { readonly [Symbol.isZeroHex]: true } & { readonly byteLength: N }

export namespace ZeroHexString {

  export type Unsafe = `0x${string}`

  export namespace String {

    export function as(value: string) {
      return value as ZeroHexString
    }

    export function fromOrThrow(value: string): ZeroHexString {
      if (!is(value))
        throw new ZeroHexStringError(value)
      return value
    }

    export function fromOrNull(value: string): Nullable<ZeroHexString> {
      if (!is(value))
        return
      return value
    }

    export function is(value: string): value is ZeroHexString {
      return /^0x[0-9a-fA-F]*$/.test(value)
    }

    export namespace Length {

      export function as<N extends number>(value: string) {
        return value as ZeroHexString<N>
      }

      export function fromOrThrow<N extends number>(value: string, byteLength: N): ZeroHexString<N> {
        if (!is(value, byteLength))
          throw new ZeroHexStringError(value)
        return value
      }

      export function fromOrNull<N extends number>(value: string, byteLength: N): Nullable<ZeroHexString<N>> {
        if (!is(value, byteLength))
          return
        return value
      }

      export function is<N extends number>(value: string, byteLength: N): value is ZeroHexString<N> {
        return value.length === (2 + (byteLength * 2)) && /^0x[0-9a-fA-F]*$/.test(value)
      }
    }

  }

  export namespace Unknown {

    export function as(value: unknown) {
      return value as ZeroHexString
    }

    export function fromOrThrow(value: unknown): ZeroHexString {
      if (!is(value))
        throw new ZeroHexStringError(value)
      return value
    }

    export function fromOrNull(value: unknown): Nullable<ZeroHexString> {
      if (!is(value))
        return
      return value
    }

    export function is(value: unknown): value is ZeroHexString {
      return typeof value === "string" && /^0x[0-9a-fA-F]*$/.test(value)
    }

    export namespace Length {

      export function as<N extends number>(value: unknown) {
        return value as ZeroHexString<N>
      }

      export function fromOrThrow<N extends number>(value: unknown, byteLength: N): ZeroHexString<N> {
        if (!is(value, byteLength))
          throw new ZeroHexStringError(value)
        return value as ZeroHexString<N>
      }

      export function fromOrNull<N extends number>(value: unknown, byteLength: N): Nullable<ZeroHexString<N>> {
        if (!is(value, byteLength))
          return
        return value as ZeroHexString<N>
      }

      export function is<N extends number>(value: unknown, byteLength: N): value is ZeroHexString<N> {
        return typeof value === "string" && value.length === (2 + (byteLength * 2)) && /^0x[0-9a-fA-F]*$/.test(value)
      }

    }

  }

  export function fromRawHex<N extends number>(value: RawHexString<N>): ZeroHexString<N> {
    return `0x${value}` as ZeroHexString<N>
  }

  export function fromBigInt(value: bigint): ZeroHexString {
    return `0x${value.toString(16)}` as ZeroHexString
  }

  export function fromNumber(value: number): ZeroHexString {
    return `0x${value.toString(16)}` as ZeroHexString
  }

  export function fromRadix(value: Radixable<16>): ZeroHexString {
    return `0x${value.toString(16)}` as ZeroHexString
  }

  export function padStart<N extends number>(text: ZeroHexString<N>): ZeroHexString<N> {
    return fromRawHex(RawHexString.padStart(toRawHex(text)))
  }

  export function padEnd<N extends number>(text: ZeroHexString<N>): ZeroHexString<N> {
    return fromRawHex(RawHexString.padEnd(toRawHex(text)))
  }

  export function toRawHex<N extends number>(value: ZeroHexString<N>): RawHexString<N> {
    return value.slice(2) as RawHexString<N>
  }

  export function toBigInt(value: ZeroHexString): bigint {
    return value.length === 2 ? 0n : BigInt(value)
  }

  export function toNumber(value: ZeroHexString): number {
    return value.length === 2 ? 0 : Number(value)
  }

}
