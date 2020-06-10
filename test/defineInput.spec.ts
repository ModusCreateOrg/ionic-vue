import {defineInput} from '../src/utils/defineInput'
import { createVNode} from 'vue';
import { ShapeFlags } from '@vue/shared';
import { shallowMount } from '@vue/test-utils'
//import sinon from 'sinon';

describe('test defineInput function', () =>{
    const testInput = defineInput('test', 'test2, onIonChange, checked')
    it('should return a functional component with display name equal to name passed in', ()=>{
        expect(typeof testInput).toBe('function');
        expect(createVNode(testInput).shapeFlag).toBe(ShapeFlags.FUNCTIONAL_COMPONENT)
        expect(testInput.displayName).toBe('test');
    })
    it('should check if h function is running correctly', () => {
        const props = {props: true}
        const ctx = { slots: { default: jest.fn() } }; //defining props/slots for test
        testInput(props as any, ctx as any); 
        expect(ctx.slots.default).toHaveBeenCalled();  
    })
    test('trigger demo', async () => {
        const wrapper = shallowMount(testInput);

        await wrapper.trigger('onIonChange')  
       
      })
    

})