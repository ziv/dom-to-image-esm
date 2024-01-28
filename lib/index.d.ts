export interface ImagifyOptions {
    height?: number;
    width?: number;
    size?: number;
}
/**
 * Convert HTMLElement to SVG string
 * @todo add support for remote resources
 * @todo add support for frames
 * @todo add support for shadow
 *
 * @param node HTMLElement
 * @param options ImagifyOptions
 */
export declare function toSvg(node: HTMLElement, options?: ImagifyOptions): Promise<string>;
