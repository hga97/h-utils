interface TreeNode {
  [key: string]: any
  children?: TreeNode[]
}

/**
 * @description: 根据字段的值，获取对应的树节点
 * @return {*}
 */
export function treeFindNode<T extends TreeNode>(
  predicate: (node: T) => boolean,
  tree: T[]
): T | null {
  if (!Array.isArray(tree)) {
    throw new Error(
      'Invalid arguments: field must be a string and tree must be an array'
    )
  }

  for (const node of tree) {
    if (predicate(node)) {
      return node
    } else if (node.children && Array.isArray(node.children)) {
      const result = treeFindNode(predicate, node.children as T[])
      if (result !== null) {
        return result
      }
    }
  }

  return null
}
