import type { NamePath } from 'antd/es/form/interface'

export function compositeNamePath(parentName: NamePath, name: NamePath) {
  if (!parentName)
    return normalizeNamePathAsArray(name)

  return [...normalizeNamePathAsArray(parentName), ...normalizeNamePathAsArray(name)]
}

function normalizeNamePathAsArray(value: NamePath) {
  if (!value)
    return []

  return Array.isArray(value) ? value : [value]
}
