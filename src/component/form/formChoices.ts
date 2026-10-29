import type { ChoiceType } from "@crud-react/type/FormViewType.tsx";
import type { FormValue } from "./Form.tsx";

/** Resolves a choice's value to the string token used by form controls. */
export function choiceToken(choice: ChoiceType): string {
    const value = typeof choice.value === "function" ? choice.value(choice) : choice.value;

    return String(value ?? "");
}

/** Normalizes single and multiple selections without changing the choices. */
export function choiceList(value: ChoiceType | ChoiceType[] | null | undefined): ChoiceType[] {
    if (value == null) {
        return [];
    }

    return Array.isArray(value) ? value : [value];
}

/** Treats a scalar empty string as no selection; array tokens are preserved. */
export function selectionTokens(value: FormValue | undefined): string[] {
    if (value == null || value === "") {
        return [];
    }

    return Array.isArray(value) ? value : [value];
}
