export declare class OverlayBaseController<Opts, Overlay> {
    private ctrl;
    constructor(ctrl: string);
    create(opts?: Opts): Promise<Overlay>;
    dismiss(data?: any, role?: string, id?: string): Promise<void>;
    getTop(): Promise<Overlay>;
}
export declare function proxyMethod(ctrlName: string, methodName: string, ...args: any[]): Promise<any>;
export declare function ensureElementInBody(elementName: string): HTMLStencilElement;
//# sourceMappingURL=util.d.ts.map