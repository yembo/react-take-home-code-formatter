import {RESERVED_KEYWORDS} from './constants'

export const isReserved = (value: string) => RESERVED_KEYWORDS.includes(value)
export const isNumber = (value: string) => /^\d+\.?\d*$/.test(value)
export const isStringLiteral = (value: string) => /"((\\")|[^"(\\")])+"/.test(value)
export const isInBacktick = (value: string) => /`((\\`)|[^`(\\`)])+`/.test(value)
