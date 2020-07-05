export function createElement(tag, props) {
  const el = document.createElement(tag);
  const { attr, styles, children } = props;
  if (attr) {
    Object.entries(attr).forEach(([key, val]) => el.setAttribute(key, val));
  }
  if (styles) {
    Object.entries(styles).forEach(([property, val]) => {
      el.style[property] = val;
    });
  }
  if (children) {
    children.forEach((child) => el.append(child));
  }
  return el;
}
