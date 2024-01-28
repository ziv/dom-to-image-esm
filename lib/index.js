function* pair(org, cloned) {
    function* next(node) {
        yield node;
        for (let i = 0, l = node.childNodes.length; i < l; ++i) {
            yield* next(node.childNodes[i]);
        }
    }
    const itr = next(cloned);
    for (const orig of next(org)) {
        const cloned = itr.next().value;
        yield [orig, cloned];
    }
}
const fetchImage = (url) => new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', () => resolve(new Image()));
    img.src = url;
});
const imageFromUrl = (url) => new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.addEventListener('load', () => resolve(img));
    img.src = url;
});
const canvasToUrl = (canvas) => canvas.toDataURL('image/png', 1);
const imageToCanvas = (img) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.offsetHeight;
    canvas.getContext('2d')?.drawImage(img, 0, 0);
    return canvas;
};
const placeholder = () => document.createElement('img');
/**
 * Take an image element, create an anonymous one and try to fetch.
 * On error, return placeholder image
 * @param el
 */
const image = (el) => fetchImage(el.src).catch(placeholder);
// todo fix images
// todo image type and quality should be optional?
// todo copy image - research with impl is better (canvas, or fetch)
// todo copy svg or dataUrl not supported yet
// todo add background to exported image
// todo fix stretch on sizing
/**
 * Convert HTMLElement to SVG string
 * @todo add support for remote resources
 * @todo add support for frames
 * @todo add support for shadow
 *
 * @param node HTMLElement
 * @param options ImagifyOptions
 */
export async function toSvg(node, options) {
    let { width = node.offsetWidth, height = node.offsetHeight, size = 1 } = options ?? {};
    if (size !== 1) {
        width = width * size;
        height = height * size;
    }
    const copy = node.cloneNode(true);
    for (const [org, cloned] of pair(node, copy)) {
        // content
        if (org instanceof HTMLCanvasElement) {
            // cloned.replaceWith(await imageFromUrl(canvasToUrl(org)));
        }
        else if (org instanceof HTMLImageElement) {
            // cloned.replaceWith(await imageFromUrl(canvasToUrl(imageToCanvas(org))));
        }
        else if (org instanceof HTMLInputElement) {
            cloned.setAttribute('value', org.value);
        }
        else if (org instanceof HTMLTextAreaElement) {
            cloned.innerHTML = org.value;
        }
        // style
        if (org instanceof Element) {
            const computed = getComputedStyle(org);
            for (const name of computed) {
                cloned.style.setProperty(name, computed.getPropertyValue(name), computed.getPropertyPriority(name));
            }
        }
    }
    copy.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
    const raw = new XMLSerializer()
        .serializeToString(copy)
        .replace(/%/g, '%25')
        .replace(/#/g, '%23')
        .replace(/\n/g, '%0A');
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><foreignObject x="0" y="0" width="100%" height="100%">${raw}</foreignObject></svg>`;
}
