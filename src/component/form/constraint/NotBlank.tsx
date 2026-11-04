import { Constraint } from './Contraint';

export class NotBlank implements Constraint {
    defaultMessage = 'Value cannot be blank.';

    message: string | null = null;
    options: { message?: string };

    constructor(options: Object) {
        this.options = options;
    }

    isValid(value: any) {
        if (typeof File !== 'undefined' && value instanceof File) {
            return value.name.length > 0;
        }

        return Array.isArray(value)
            ? value.length > 0
            : value != null && String(value).trim() !== '';
    }

    getMessage() {
        return this.options.message || this.defaultMessage;
    }
}
