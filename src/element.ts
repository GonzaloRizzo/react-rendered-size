// external dependencies
import { findDOMNode, render } from 'react-dom';

// constants
import { RENDER_CONTAINER_ID } from './constants';
import { ReactElement, ReactInstance } from 'react';

/**
 * @function getMainContainer
 *
 * @description
 * get the main container that future containers will be rendered into
 *
 * @param doc document to render into
 * @returns the main container that all future containers will render into
 */
export const getMainContainer = (doc: HTMLDocument): HTMLDivElement => {
  const container = doc.createElement('div');

  container.id = RENDER_CONTAINER_ID;

  container.style.left = '-9999px';
  container.style.position = 'absolute';
  container.style.top = '-9999px';
  container.style.visibility = 'hidden';

  return container;
};

/**
 * @function getNewContainer
 *
 * @description
 * get a new container that has the necessary styles for rendering
 *
 * @param doc document to create element with
 * @param type the type of element to use for the container
 * @param passedContainer the passed container to used, instead of creating one
 * @param width the width to assign to the container
 * @returns the new container element
 */
export const getNewContainer = (
  doc: HTMLDocument,
  type: string,
  passedContainer: Element,
  width: number | string,
): Element => {
  if (passedContainer) {
    return passedContainer;
  }

  const container = doc.createElement(type);

  container.style.width = typeof width === 'number' ? `${width}px` : width;

  return container;
};

/**
 * @function isElement
 *
 * @description
 * is the object passed an element
 *
 * @param object the object to test
 * @returns is the object an element
 */
export const isHtmlElement = (object: any): object is HTMLElement =>
  object instanceof HTMLElement || object instanceof HTMLDocument;

/**
 * @function getRenderedElement
 *
 * @description
 * get the element rendered into the container
 *
 * @param container the container to render into
 * @param element the element to render into the container
 * @returns the ReactElement rendered as a DOM element
 */
export const getRenderedElement = (
  container: Element,
  element: ReactElement<any>,
): Promise<HTMLElement> =>
  // @ts-ignore
  new Promise((resolve) => render(element, container, resolve)).then(() =>
    isHtmlElement(container.firstChild)
      ? findDOMNode(container.firstChild)
      : null,
  );