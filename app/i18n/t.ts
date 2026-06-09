import { fa } from "./fa"

type FaDict = Record<string, string>

const dict: FaDict = fa

export function t(key: string) {
 return dict[key] || key
}