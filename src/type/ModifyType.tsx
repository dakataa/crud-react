import {FormType} from "@crud-react/type/FormType";
import {RedirectType} from "@crud-react/type/RedirectType";

export type ModifyType = {
    title: string | null;
    object: { [key: string]: any } | null,
    form: { [key: string]: FormType },
    messages: { [key: string]: string[] },
    redirect?: RedirectType
}
