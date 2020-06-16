import { defineContainer } from '../src/utils/defineContainer';
import { ShapeFlags } from '@vue/shared';
import { createVNode } from 'vue';

describe('test defineContainer function', () => {
    const testContainer = defineContainer('test');
    it('should be a FunctionalComponent', () => {
        expect(typeof test).toBe('function');
        expect(createVNode(testContainer).shapeFlag).toBe(ShapeFlags.FUNCTIONAL_COMPONENT);
    });
    it('should have a display name equal to string passed in', () => {
        expect(testContainer.displayName).toEqual('test');
    });
    it('should call slots default', () => {
        const prop = { props: 'testProp' };
        const ctx = { slots: { default: jest.fn() } }; // defining props/slots for test
        testContainer(prop, ctx as any);
        expect(ctx.slots.default).toHaveBeenCalled();
    });
});