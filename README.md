# Hex

Hexadecimal string types

```bash
npm i @hazae41/hex
```

[**Node Package 📦**](https://www.npmjs.com/package/@hazae41/hex)

## Features

### Current features
- 100% TypeScript and ESM
- No external dependencies

## Usage

```tsx
function recover(signature: ZeroHexString<32>) {
  // just use signature like a normal string
}

const raw = prompt("Enter your signature as zero-hex")
const hex = ZeroHexString.String.Length.asOrThrow(raw, 32)

recover(hex)
```