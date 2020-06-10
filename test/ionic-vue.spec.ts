import { IonicVue  } from '../src/ionic-vue';
import Ionic from '@ionic/core/loader';


//does not work yet. 
describe('test that install functions works', () => {
    let app = jest.fn();
    it('should test that applyPolyfills & defineCustomElements is called', () => {
        expect(typeof IonicVue.install).toBe('function'); //tests if function exists
        let spy = jest.spyOn(Ionic, 'applyPolyfills');
        IonicVue.install(app as any);
        expect(spy).toHaveBeenCalled(); 
        const spy2 = jest.spyOn(Ionic, 'defineCustomElements');
        IonicVue.install(app as any);
        expect(spy2).toHaveBeenCalled(); 
    })
})



