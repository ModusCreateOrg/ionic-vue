import { FunctionalComponent } from 'vue';
export interface InputProps {
    modelValue: string | boolean;
    [key: string]: unknown;
}
export declare enum InputEvents {
    onUpdate = "update:modelValue"
}
export declare function defineInput(name: string, ionTag: string, updateEvent?: string, modelProp?: string): FunctionalComponent<InputProps, InputEvents[]>;
//# sourceMappingURL=defineInput.d.ts.map