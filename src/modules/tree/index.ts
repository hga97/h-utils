interface TreeNode {
  [key: string]: any
  children?: TreeNode[]
}

/**
 * @description: 根据字段的值，获取对应的树节点
 * @return {*}
 */
export function treeFindNode<T extends TreeNode>(
  tree: T[],
  predicate: (node: T) => boolean
): T | null {
  if (!Array.isArray(tree)) {
    throw new Error('Invalid arguments: tree must be an array')
  }

  for (const node of tree) {
    if (predicate(node)) {
      return node
    } else if (node.children && Array.isArray(node.children)) {
      const result = treeFindNode(node.children as T[], predicate)
      if (result !== null) {
        return result
      }
    }
  }

  return null
}

/**
 * @description: 根据字段，获取对应的树路径
 * @param {*} tree
 * @param {*} predicate
 * @param {*} field
 * @param {*} path
 * @return {*}
 */
export function treeFindPath<T extends TreeNode>(
  tree: T[],
  predicate: (node: T) => boolean,
  field = '',
  path: T[] = []
): T[] {
  if (!Array.isArray(tree)) {
    return []
  }

  for (const data of tree) {
    field === '' ? path.push(data) : path.push(data[field])
    if (predicate(data)) return path
    if (data.children) {
      const findChildren = treeFindPath(
        data.children as T[],
        predicate,
        field,
        path
      )
      if (findChildren.length) return findChildren
    }
    path.pop()
  }
  return []
}
