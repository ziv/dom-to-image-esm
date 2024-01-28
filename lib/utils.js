export function toImage(svg) {
    const img = document.createElement('img');
    img.src = `data:image/svg+xml;charset=utf-8,${svg}`;
    return img;
}
export function toCanvas(image) {
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.offsetHeight;
    canvas.getContext('2d')?.drawImage(image, 0, 0);
    return canvas;
}
