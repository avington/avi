/**
 * Computes the actual color value of a given CSS color variable.
 *
 * This function creates a temporary HTML element, applies the provided color variable
 * as its background color, appends the element to the document body, and then retrieves
 * the computed background color value. Finally, it removes the temporary element from
 * the document body and returns the computed color value.
 *
 * @param colorVar - The CSS color variable to compute.
 * @returns The computed color value as a string.
 */
export const getComputedColor = (colorVar: string): string => {
  const tempElement = document.createElement('div');
  tempElement.style.backgroundColor = colorVar;
  document.body.appendChild(tempElement);
  const computedColor = getComputedStyle(tempElement).backgroundColor;
  document.body.removeChild(tempElement);
  return computedColor;
};
