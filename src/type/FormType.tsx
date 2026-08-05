import {FormViewType} from "@crud-react/type/FormViewType";

export type FormType = {
    view: FormViewType;
    message?: string;
    context?: Record<string, unknown>
}
