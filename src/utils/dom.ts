export const createElement = <T extends keyof HTMLElementTagNameMap>(
  type: T,
  attributes?: Record<string, string> | null,
  children?: string | (HTMLElement | string)[]
): HTMLElementTagNameMap[T] => {
  attributes = attributes ?? {};

  const $element = document.createElement<T>(type);

  for (const [k, v] of Object.entries(attributes)) {
    $element.setAttribute(k, v);
  }

  if (!children) return $element;

  if (typeof children === 'string') {
    $element.textContent = children;
    return $element;
  }

  $element.append(...children);
  return $element;
};
