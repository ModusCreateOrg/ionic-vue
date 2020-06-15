import { defineInput } from '../src/utils/defineInput';
import { createVNode } from 'vue';
import { ShapeFlags } from '@vue/shared';
import { shallowMount } from '@vue/test-utils'
import sinon from 'sinon';

describe('test defineInput function', () => {
    const testInput = defineInput('test', 'test2')
    it('should return a functional component with display name equal to name passed in', () => {
        expect(typeof testInput).toBe('function');
        expect(createVNode(testInput).shapeFlag).toBe(ShapeFlags.FUNCTIONAL_COMPONENT)
        expect(testInput.displayName).toBe('test');
    })
    it('should check if h function is running correctly', () => {
        const props = { props: 'updateEvent' }
        const ctx = { slots: { default: jest.fn() } }; // defining props/slots for test
        testInput(props as any, ctx as any);
        expect(ctx.slots.default).toHaveBeenCalled();
    })
    it('should trigger input', async () => {
        const spy = sinon.stub()
        const wrapper = shallowMount(testInput, {
            props: {
                updateEvent: { spy }
            }
        });
        await(wrapper.trigger('click'))
        expect(spy.called).toBe(true);
    })
})