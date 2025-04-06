import {Expose} from 'class-transformer';
import {Constructor, SerializerFields} from "./resource.dto";


export function ExposeFields<TBase extends Constructor>(
  Base: TBase,
  exposeFields: SerializerFields<TBase>[],
) {
  class ExposeFieldsMixin extends Base {
    constructor(...args: any[]) {
      super(...args);
      Object.assign(this, Base);
      exposeFields.forEach((serializerField) => {
        Expose(serializerField.options)(this, serializerField.field as string);
      });
    }
  }

  return ExposeFieldsMixin;
}
