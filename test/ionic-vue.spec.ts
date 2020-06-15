import { IonicVue } from '../src/ionic-vue';
import Ionic from '@ionic/core/loader';


describe('test that install function in ionic-vue.ts works', () => {
    const app = jest.fn();
    it('should test that applyPolyfills & defineCustomElements is called', async () => {
        expect(typeof IonicVue.install).toBe('function'); // tests if function exists
        const polyfillSpy = jest.spyOn(Ionic, 'applyPolyfills');
        const customElementsSpy = jest.spyOn(Ionic, 'defineCustomElements');
        await IonicVue.install!(app as any);
        expect(customElementsSpy).toHaveBeenCalled();
        expect(polyfillSpy).toHaveBeenCalled();
    })
})



