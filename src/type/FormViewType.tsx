export type FormViewType = {
    id: string;
    name: string;
    full_name: string
    label: string | undefined;
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
    type: 'form' | string;
    valid?: boolean;
    errors?: string[];
    children?: { [key: string]: FormViewType };
    choices?: ChoiceType[];
    choice_attr?: {[key: string]: {[key: string]: string}} | Function
    preferred_choices?: { [key: string]: any };
    attr?: { [key: string]: string } | Function;
    data?: any;
}

export type ChoiceType = {
    value: string | number | null | Function;
    label: string | Function;
    attr?: {[key: string]: {[key: string]: string}} | Function;
}
