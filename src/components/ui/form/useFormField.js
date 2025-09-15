import {
  FieldContextKey,
  useField, // Yangi import
} from "vee-validate";
import { inject } from "vue";
import { FORM_ITEM_INJECTION_KEY } from "./injectionKeys";

export function useFormField() {
  const fieldContext = inject(FieldContextKey);
  const fieldItemContext = inject(FORM_ITEM_INJECTION_KEY);

  if (!fieldContext)
    throw new Error("useFormField should be used within <FormField>");

  const { name } = fieldContext;

  // useField() funksiyasini chaqirish
  const { meta, errorMessage } = useField(name);

  const fieldState = {
    valid: meta.valid,
    isDirty: meta.dirty,
    isTouched: meta.touched,
    error: errorMessage,
  };

  return {
    id: fieldItemContext,
    name,
    formItemId: `${fieldItemContext}-form-item`,
    formDescriptionId: `${fieldItemContext}-form-item-description`,
    formMessageId: `${fieldItemContext}-form-item-message`,
    ...fieldState,
  };
}
