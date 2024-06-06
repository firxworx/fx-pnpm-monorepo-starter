/**
 * Type guard that evaluates if the input is of type `Record<string, unknown>`.
 * This is a strict implementation that confirms there are no property symbols in the object.
 *
 * Note that JS converts numerical object keys to strings in runtime.
 * Returns `true` for empty objects.
 */
export function isRecord(input: unknown): input is Record<string, unknown> {
  return (
    !!input && typeof input === 'object' && !Array.isArray(input) && Object.getOwnPropertySymbols(input).length === 0
  )
}

/**
 * Type guard that evaluates if the input is a record with both string keys and values.
 * Reminder: JavaScript will convert numerical object keys to strings in runtime.
 *
 * Returns `true` for empty objects.
 */
export function isStringKVRecord(input: unknown): input is Record<string, string> {
  return (
    isRecord(input) &&
    !Object.entries(input).some(([key, value]) => !(typeof key === 'string' && typeof value === 'string'))
  )
}
