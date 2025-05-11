import { $error } from "@hazae41/gardien"
import { Radixable } from "libs/radixable/index.js"
import { ZeroHexString } from "mods/zerohex/index.js"

export type RawHexSymbol = symbol & { readonly name: "RawHexSymbol" }

export type RawHexString<N extends number = number> = number extends N
  ? string & { readonly [k: RawHexSymbol]: true }
  : string & { readonly [k: RawHexSymbol]: true } & { readonly byteLength: N }

export namespace RawHexString {

  export type Unsafe = string

  export function is(value: string): value is RawHexString {
    return /^[0-9a-fA-F]*$/.test(value)
  }

  export function asOrThrow(value: string): RawHexString

  export function asOrThrow(value: string): RawHexString

  export function asOrThrow(value: string): RawHexString {
    if (!is(value))
      throw new Error()
    return value
  }

  export class Length<N extends number> {

    constructor(
      readonly byteLength: N
    ) { }

    static is<N extends number>(value: string, byteLength: N): value is RawHexString<N> {
      return value.length === (byteLength * 2) && /^[0-9a-fA-F]*$/.test(value)
    }

    static asOrThrow<N extends number>(value: string, byteLength: N): RawHexString<N>

    static asOrThrow<N extends number>(value: string, byteLength: N): RawHexString<N>

    static asOrThrow<N extends number>(value: string, byteLength: N): RawHexString<N> {
      if (!Length.is(value, byteLength))
        throw new Error()
      return value
    }

    asOrThrow(value: string): RawHexString<N>

    asOrThrow(value: string): RawHexString<N>

    asOrThrow(value: string): RawHexString<N> {
      if (!Length.is<N>(value, this.byteLength))
        throw new Error()
      return value
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

export function $rawx(message?: string) {
  return $error(RawHexString, message)
}

export function $rawxn<N extends number>(byteLength: N, message?: string) {
  return $error(new RawHexString.Length(byteLength), message)
}