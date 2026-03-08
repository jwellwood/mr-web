import { type Control, type FieldValues, type Path, useController } from 'react-hook-form';
import FileInput from './FileInput';

const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

type Props<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  onFileChange?: (previewUrl: string) => void;
  accept?: string;
};

export default function ControlledFileInput<T extends FieldValues>({
  control,
  name,
  onFileChange,
  accept,
}: Props<T>) {
  const { field, fieldState } = useController({ name, control });
  const { error, isTouched } = fieldState;

  const allowedTypes = accept?.split(',').map(t => t.trim()) ?? [];

  return (
    <FileInput
      inputName={field.name}
      fileName={(field.value as File)?.name}
      onChange={event => {
        const file = event.target?.files?.[0];
        if (!file) return;

        if (allowedTypes.length && !allowedTypes.includes(file.type)) {
          event.target.value = '';
          field.onChange(null);
          // Trigger a react-hook-form validation error via setError
          field.onBlur();
          return;
        }

        if (file.size > MAX_SIZE_BYTES) {
          event.target.value = '';
          field.onChange(null);
          field.onBlur();
          return;
        }

        field.onChange(file);
        onFileChange?.(URL.createObjectURL(file));
      }}
      errors={isTouched && error ? [error] : []}
      accept={accept}
    />
  );
}
