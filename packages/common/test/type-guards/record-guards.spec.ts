import { describe, it, expect } from 'vitest'
import { isRecord, isStringKVRecord } from '../../src/lib/type-guards/records'

// pnpm --filter @workspace/common test test/type-guards/record-guards.spec.ts

describe('isRecord', () => {
  it('accepts valid objects', () => {
    expect(isRecord({})).toEqual(true)
    expect(isRecord({ hello: 'world' })).toEqual(true)
    expect(isRecord({ hello: 'world', asdf: 'fdsa', aaa: { bbb: 'ccc', ddd: 2 }, 23: [2, 4, 'yep'] })).toEqual(true)
    expect(isRecord({ 1: 'hello', 2: 'world' })).toEqual(true)
  })

  it('rejects objects with symbol keys', () => {
    const symbol = Symbol()
    expect(isRecord({ [symbol]: 'world' })).toEqual(false)
  })

  it('rejects invalid objects', () => {
    expect(isRecord(undefined)).toEqual(false)
    expect(isRecord(null)).toEqual(false)
    expect(isRecord(true)).toEqual(false)
    expect(isRecord(false)).toEqual(false)
    expect(isRecord(1234)).toEqual(false)
    expect(isRecord(Infinity)).toEqual(false)
    expect(isRecord('1234')).toEqual(false)
    expect(isRecord(['1234'])).toEqual(false)
    expect(isRecord([])).toEqual(false)
    expect(isRecord([{}])).toEqual(false)
  })
})

describe('isStringKVRecord', () => {
  it('accepts an empty record', () => {
    expect(isStringKVRecord({})).toEqual(true)
  })

  it('accepts objects with strict string key-value pairs', () => {
    expect(isStringKVRecord({ single: 'single' })).toEqual(true)
    expect(isStringKVRecord({ hello: 'world', world: 'hello' })).toEqual(true)
    expect(isStringKVRecord({ stringy: 'hello', '2': 'world', asdf: 'fdsa' })).toEqual(true)
  })

  it('accepts objects with number keys as runtime js interally converts them to strings', () => {
    // regarding numerical object keys the zod README has some details
    // @see https://github.com/colinhacks/zod#record-key-type

    expect(isStringKVRecord({ 1: 'hello', 2: 'world' })).toEqual(true)
  })

  it('rejects objects with non-string keys but string values', () => {
    const symbol = Symbol()
    expect(isStringKVRecord({ [symbol]: 'world' })).toEqual(false)
  })

  it('rejects objects with string keys but non-string values', () => {
    const symbol = Symbol()
    expect(isStringKVRecord({ hello: symbol })).toEqual(false)
    expect(isStringKVRecord({ hello: [] })).toEqual(false)
    expect(isStringKVRecord({ hello: {} })).toEqual(false)
    expect(isStringKVRecord({ hello: 10 })).toEqual(false)
    expect(isStringKVRecord({ hello: 42, world: true })).toEqual(false)
    expect(isStringKVRecord({ hello: false, world: 'string' })).toEqual(false)
  })

  it('rejects invalid objects', () => {
    expect(isStringKVRecord(undefined)).toEqual(false)
    expect(isStringKVRecord(null)).toEqual(false)
    expect(isStringKVRecord(true)).toEqual(false)
    expect(isStringKVRecord(false)).toEqual(false)
    expect(isStringKVRecord(1234)).toEqual(false)
    expect(isStringKVRecord(Infinity)).toEqual(false)
    expect(isStringKVRecord('1234')).toEqual(false)
    expect(isStringKVRecord(['1234'])).toEqual(false)
    expect(isStringKVRecord([{}])).toEqual(false)
  })
})
