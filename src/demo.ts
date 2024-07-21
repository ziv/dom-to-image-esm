const click = async () => {
    const { domNodeToSvg } = await import('./imagify.js');
    const svg = domNodeToSvg(document.getElementById('example') as HTMLElement);
    const { toImage } = await import('./utils.js');
    document.body.appendChild(toImage(svg));
}

document.querySelector('button')?.addEventListener('click', click);