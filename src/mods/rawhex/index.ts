import { Nullable } from "libs/nullable/index.js"
import { Radixable } from "libs/radixable/index.js"
import { ZeroHexString } from "mods/zerohex/index.js"

declare global {
  interface SymbolConstructor {
    readonly isRawHex: symbol
  }
}

export class RawHexStringError extends Error {
  readonly #class = RawHexStringError
  readonly name = this.#class.name

  constructor(
    readonly value: unknown
  ) {
    super()
  }

}

export type RawHexString<N extends number = number> = number extends N
  ? string & { readonly [Symbol.isRawHex]: true }
  : string & { readonly [Symbol.isRawHex]: true } & { readonly byteLength: N }

export namespace RawHexString {

  export type Unsafe<N extends number = number> = number extends N
    ? string
    : string & { readonly byteLength: N }

  export namespace String {

    export function as(value: string) {
      return value as RawHexString
    }

    export function asOrThrow(value: string): RawHexString {
      if (!is(value))
        throw new RawHexStringError(value)
      return value
    }

    export function asOrNull(value: string): Nullable<RawHexString> {
      if (!is(value))
        return
      return value
    }

    export function is(value: string): value is RawHexString {
      return /^[0-9a-fA-F]*$/.test(value)
    }

    export namespace Length {

      export function as<N extends number>(value: string): RawHexString<N> {
        return value as RawHexString<N>
      }

      export function asOrThrow<N extends number>(value: string, byteLength: N): RawHexString<N> {
        if (!is(value, byteLength))
          throw new RawHexStringError(value)
        return value as RawHexString<N>
      }

      export function asOrNull<N extends number>(value: string, byteLength: N): Nullable<RawHexString<N>> {
        if (!is(value, byteLength))
          return
        return value as RawHexString<N>
      }

      export function is<N extends number>(value: string, byteLength: N): value is RawHexString<N> {
        return value.length === (byteLength * 2) && /^[0-9a-fA-F]*$/.test(value)
      }

    }

  }

  export namespace Unknown {

    export function as(value: unknown) {
      return value as RawHexString
    }

    export function asOrThrow(value: unknown): RawHexString {
      if (!is(value))
        throw new RawHexStringError(value)
      return value
    }

    export function asOrNull(value: unknown): Nullable<RawHexString> {
      if (!is(value))
        return
      return value
    }

    export function is(value: unknown): value is RawHexString {
      return typeof value === "string" && /^[0-9a-fA-F]*$/.test(value)
    }

    export namespace Length {

      export function as<N extends number>(value: unknown): RawHexString<N> {
        return value as RawHexString<N>
      }

      export function asOrThrow<N extends number>(value: unknown, byteLength: N): RawHexString<N> {
        if (!is(value, byteLength))
          throw new RawHexStringError(value)
        return value as RawHexString<N>
      }

      export function asOrNull<N extends number>(value: unknown, byteLength: N): Nullable<RawHexString<N>> {
        if (!is(value, byteLength))
          return
        return value as RawHexString<N>
      }

      export function is<N extends number>(value: unknown, byteLength: N): value is RawHexString<N> {
        return typeof value === "string" && value.length === (byteLength * 2) && /^[0-9a-fA-F]*$/.test(value)
      }

    }

  }

  export function fromZeroHex<N extends number>(value: ZeroHexString<N>): RawHexString<N> {
    return value.slice(2) as RawHexString<N>
  }

  export function fromBigInt(value: bigint): RawHexString {
    return value.toString(16) as RawHexString
  }

  export function fromNumber(value: number): RawHexString {
    return value.toString(16) as RawHexString
  }

  export function fromRadix(value: Radixable<16>) {
    return value.toString(16) as RawHexString
  }

  export function padStart<N extends number>(text: RawHexString<N>): RawHexString<N> {
    return text.padStart(text.length + (text.length % 2), "0") as RawHexString<N>
  }

  export function padEnd<N extends number>(text: RawHexString<N>): RawHexString<N> {
    return text.padEnd(text.length + (text.length % 2), "0") as RawHexString<N>
  }

  export function toZeroHex<N extends number>(value: RawHexString<N>): ZeroHexString<N> {
    return `0x${value}` as ZeroHexString<N>
  }

  export function toBigInt(value: RawHexString): bigint {
    return value.length === 0 ? 0n : BigInt(toZeroHex(value))
  }

  export function toNumber(value: RawHexString): number {
    return value.length === 0 ? 0 : Number(toZeroHex(value))
  }

}

