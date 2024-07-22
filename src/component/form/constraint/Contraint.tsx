export interface Constraint {
    message: string | null;
    options: any;

    isValid(value: any): boolean;

    getMessage(): string;
}
