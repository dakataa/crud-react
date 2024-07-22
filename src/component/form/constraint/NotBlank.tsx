import {Constraint} from "./Contraint";

export class NotBlank implements Constraint {
    defaultMessage = 'Value cannot be blank.'

    message: string | null = null;
    options: { message?: string };

    constructor(options: Object) {
        this.options = options;
    }

    isValid(value: any) {
        return value;
    }

    getMessage() {
        return this.options.message || this.defaultMessage;
    }
}
