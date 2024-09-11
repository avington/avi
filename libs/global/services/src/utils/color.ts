export const getComputedColor = (colorVar: string): string => {
  const tempElement = document.createElement('div');
  tempElement.style.backgroundColor = colorVar;
  document.body.appendChild(tempElement);
  const computedColor = getComputedStyle(tempElement).backgroundColor;
  document.body.removeChild(tempElement);
  return computedColor;
};
