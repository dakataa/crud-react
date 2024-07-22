import {FormType} from "@src/type/FormType";
import {RedirectType} from "@src/type/RedirectType";

export type ModifyType = {
    title: string | null;
    object: { [key: string]: any } | null,
    form: { [key: string]: FormType },
    messages: { [key: string]: string[] },
    redirect?: RedirectType
}
