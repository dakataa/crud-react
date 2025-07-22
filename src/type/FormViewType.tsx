export type FormViewType = {
    id?: string;
    name?: string;
    full_name?: string
    label?: string | undefined;
    label_attr?: { [key: string]: string } | Function;
    label_html?: boolean;
    placeholder?: string | undefined;
    placeholder_attr?: { [key: string]: string } | Function;
    placeholder_in_choices?: boolean;
    help?: string | null | undefined;
    help_attr?: { [key: string]: string } | Function;
    help_html?: boolean;
    disabled?: boolean;
    required?: boolean;
    submitted?: boolean;
    expanded?: boolean;
    multiple?: boolean;
    checked?: boolean;
    priority?: number;
    type: FormViewTypeEnum | string;
    block_prefixes?: [FormViewTypeEnum | string];
    valid?: boolean;
    errors?: FormViewErrorType[];
    children?: { [key: string]: FormViewType };
    choices?: ChoiceUnionType;
    choice_attr?: {[key: string]: {[key: string]: string}} | Function
    preferred_choices?: { [key: string]: any };
    attr?: { [key: string]: string } | Function;
    data?: any;
    rendered?: boolean;
    prototype?: FormViewType;
    prototype_name?: string;
}

export enum FormViewTypeEnum {
    Form = 'form',
    Input = 'input',
    Money = 'money',
    Hidden = 'hidden',
    Number = 'number',
    Text = 'text',
    Checkbox = 'checkbox',
    Radio = 'radio',
    Integer = 'integer',
    Password = 'password',
    Email = 'email',
    Choice = 'choice',
    Enum = 'enum',
    Entity = 'entity',
    Collection = 'collection',
    Repeated = 'repeated',
    Datetime = 'datetime',
    Date = 'date',
    Time = 'time',
}

export type FormViewErrorType = {
    message: string;
    origin?: string | null;
    messageParameters?: {[key: string]: string};
    messageTemplate?: string;
}

export type ChoiceType = {
    value: string | number | null | Function;
    label: string | ((v: ChoiceType) => string);
    attr?: {[key: string]: {[key: string]: string}} | Function;
}

export type ChoiceGroupType = {
    label: string;
    choices: ChoiceType[];
}

export type ChoiceUnionType = ChoiceType[] | ChoiceGroupType[];
