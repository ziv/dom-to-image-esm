function cloneStyle(org: HTMLElement): HTMLElement {
    const cloned = org.cloneNode(false) as HTMLElement;
    // content
    if (org instanceof HTMLCanvasElement) {
        // todo cloned.replaceWith(...)
    } else if (org instanceof HTMLImageElement) {
        // todo cloned.replaceWith(...)
    } else if (org instanceof HTMLInputElement) {
        cloned.setAttribute('value', org.value);
    } else if (org instanceof HTMLTextAreaElement) {
        cloned.innerHTML = org.value;
    }
    // style
    if (org instanceof Element) {
        const computed = getComputedStyle(org) as CSSStyleDeclaration & Iterable<unknown>;
        for (const name of computed) {
            cloned.style.setProperty(name, computed.getPropertyValue(name), computed.getPropertyPriority(name));
        }
    }
    return cloned;
}

function cloneNode(node: HTMLElement): HTMLElement {
    const cloned = cloneStyle(node);
    for (let i = 0, l = node.childNodes.length; i < l; ++i) {
        cloned.appendChild(cloneNode(node.childNodes[i] as HTMLElement));
    }
    return cloned;
}

export interface ImagifyOptions {
    height: number;
    width: number;
    size: number;
}

/**
 * Cloning HTML elements trees into an SVG string
 *
 * @todo fix images
 * @todo image type and quality should be optional?
 * @todo copy image - research with impl is better (canvas, or fetch)
 * @todo copy svg or dataUrl not supported yet
 * @todo add background to exported image
 * @todo fix stretch on sizing
 * @todo add support for remote resources
 * @todo add support for frames
 * @todo add support for shadow
 * @todo add pseudo elements to styles
 *
 * @param node HTMLElement
 * @param options ImagifyOptions
 */
export function domNodeToSvg(node: HTMLElement, options: Partial<ImagifyOptions> = {}) {
    const size = options.size ?? 1;
    const width = (options.width ?? node.offsetWidth) * size;
    const height = (options.height ?? node.offsetHeight) * size;
    const copy = cloneNode(node);
    copy.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
    const raw = new XMLSerializer()
        .serializeToString(copy)
        .replace(/%/g, '%25')
        .replace(/#/g, '%23')
        .replace(/\n/g, '%0A');
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><foreignObject x="0" y="0" width="100%" height="100%">${raw}</foreignObject></svg>`
}