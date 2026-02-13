export function IMapper<T>(
  config: { [K in keyof T]: (source: any) => T[K] }
) {
  return (source: any): T => {
    const result = {} as T
    for (const key in config) {
      result[key] = config[key](source)
    }
    return result
  }
}