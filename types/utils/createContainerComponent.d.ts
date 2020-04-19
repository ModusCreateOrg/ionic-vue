import { SetupContext } from 'vue';
declare type Data = {
    [key: string]: unknown;
};
export declare const createContainerComponent: (name: string) => (props: Data, { slots }: SetupContext<Record<string, ((...args: any[]) => any) | null>>) => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement>;
export {};
//# sourceMappingURL=createContainerComponent.d.ts.map