import { isValidElement, type ReactNode } from 'react';

export function reactNodeToString(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string') return node;
  if (typeof node === 'number' || typeof node === 'bigint') return String(node);
  if (Array.isArray(node)) return node.map(reactNodeToString).join('');
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return reactNodeToString(node.props.children);
  }
  return '';
}
