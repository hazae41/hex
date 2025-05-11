import { $error, $inter, $string } from "@hazae41/gardien"
import { Radixable } from "libs/radixable/index.js"
import { RawHexString } from "mods/rawhex/index.js"

declare const ZeroHexSymbol: unique symbol

export type ZeroHexString<N extends number = number> = number extends N
  ? `0x${string}` & { readonly [ZeroHexSymbol]: true }
  : `0x${string}` & { readonly [ZeroHexSymbol]: true } & { readonly byteLength: N }

export namespace ZeroHexString {

  export type Unsafe = `0x${string}`

  export function is(value: string): value is ZeroHexString {
    return /^0x[0-9a-fA-F]*$/.test(value)
  }

  export function asOrThrow(value: string): ZeroHexString

  export function asOrThrow(value: Unsafe): ZeroHexString

  export function asOrThrow(value: string): ZeroHexString {
    if (!is(value))
      throw new Error()
    return value
  }

  export class Length<N extends number> {

    constructor(
      readonly byteLength: N
    ) { }

    static is<N extends number>(value: string, byteLength: N): value is ZeroHexString<N> {
      return value.length === (2 + (byteLength * 2)) && /^0x[0-9a-fA-F]*$/.test(value)
    }

    static asOrThrow<N extends number>(value: string, byteLength: N): ZeroHexString<N>

    static asOrThrow<N extends number>(value: Unsafe, byteLength: N): ZeroHexString<N>

    static asOrThrow<N extends number>(value: string, byteLength: N): ZeroHexString<N> {
      if (!Length.is(value, byteLength))
        throw new Error()
      return value
    }

    asOrThrow(value: string): ZeroHexString<N>

    asOrThrow(value: Unsafe): ZeroHexString<N>

    asOrThrow(value: string): ZeroHexString<N> {
      if (!Length.is(value, this.byteLength))
        throw new Error()
      return value
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

export function $zerox(message?: string) {
  return $error(ZeroHexString, message)
}

export function $zeroxs(message?: string) {
  return $inter([$string(), $zerox()], message)
}

export function $zeroxn<N extends number>(byteLength: N, message?: string) {
  return $error(new ZeroHexString.Length(byteLength), message)
}

export function $zeroxns<N extends number>(byteLength: N, message?: string) {
  return $inter([$string(), $zeroxn(byteLength)], message)
}