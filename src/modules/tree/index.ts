interface TreeNode {
  [key: string]: any
  children?: TreeNode[]
}

/**
 * @description: 根据字段的值，获取对应的树节点
 * @return {*}
 */
export function findTreeNodeByFieldValue<T extends TreeNode>(
  field: string,
  value: any,
  tree: T[]
): T | null {
  if (typeof field !== 'string' || !Array.isArray(tree)) {
    throw new Error(
      'Invalid arguments: field must be a string and tree must be an array'
    )
  }

  for (const node of tree) {
    if (node[field] === value) {
      return node
    } else if (node.children && Array.isArray(node.children)) {
      const result = findTreeNodeByFieldValue(
        field,
        value,
        node.children as T[]
      )
      if (result !== null) {
        return result
      }
    }
  }

  return null
}
