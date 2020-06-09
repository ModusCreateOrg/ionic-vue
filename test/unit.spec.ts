
// import { IonicVue  } from '../src/ionic-vue';
// import Ionic from '@ionic/core/loader';
// import {App} from 'vue';
import { defineContainer} from '../src/utils/defineContainer'
//import { ShapeFlags } from '@vue/shared';

// let app = jest.fn();
// describe('test that install functions works', () => {
//     test('test that applyPolyfills & defineCustomElements is called', () => {
//         expect(typeof IonicVue.install).toBe('function'); //tests if function exists
//         let spy = jest.spyOn(Ionic, 'applyPolyfills');
//         IonicVue.install(app as any);
//         expect(spy).toHaveBeenCalled(); 
//         const spy2 = jest.spyOn(Ionic, 'defineCustomElements');
//         //IonicVue.install(jest.fn());
//         expect(spy2).toHaveBeenCalled(); 
//     })
// })

it('should test defineContainer', () => {
    const testContainer = defineContainer('test');
    expect(typeof test).toBe('function'); //testing type of returned container to be functional component
    const prop = {props: 'testProp'}
    const ctx = { slots: { default: jest.fn() } }; //defining props/slots for test
    testContainer(prop, ctx as any); 
    expect(ctx.slots.default).toHaveBeenCalled();       
})


