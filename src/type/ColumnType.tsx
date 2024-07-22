export type ColumnType = {
    field: string;
    label: string;
    options: string[];
    searchable: boolean | null;
    sortable: boolean;
    identifier: boolean;
    value?: CallableFunction;
    group?: string | false | null;
    view?: {
        header?: {
            attr?: {[key: string]: string}
        },
        content?: {
            attr?: {[key: string]: string}
        }
    }
}
