import { CreateElement, RenderContext, VNode } from 'vue';
interface KeepAliveProps {
    include?: string | string[] | RegExp;
    exclude?: string | string[] | RegExp;
    max?: number;
}
declare const _default: {
    name: string;
    functional: boolean;
    props: {
        name: {
            default: string;
            type: StringConstructor;
        };
        animated: {
            default: boolean;
            type: BooleanConstructor;
        };
        keepAlive: {
            type: (StringConstructor | (() => KeepAliveProps))[];
        };
    };
    render(h: CreateElement, { parent, props, data, children }: RenderContext<Record<string, any>>): VNode;
};
export default _default;
//# sourceMappingURL=ion-vue-router.d.ts.map