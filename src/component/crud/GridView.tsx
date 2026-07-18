import {ColumnType} from "@crud-react/type/ColumnType";
import React, {HTMLAttributes, ReactElement, TableHTMLAttributes} from "react";
import Link from "@crud-react/component/Link.tsx";
import {default as T} from "@crud-react/component/Translation.tsx";
import ItemValue from "@crud-react/component/crud/ItemValue.tsx";
import BatchItemSelector from "@crud-react/component/crud/batch/BatchItemSelector.tsx";
import ItemLabel from "@crud-react/component/crud/ItemLabel.tsx";
import {ListItemProvider} from "@crud-react/context/ListItemContext.tsx";
import ItemActions from "@crud-react/component/crud/ItemActions.tsx";
import {UseList} from "@crud-react/context/ListContext.tsx";
import {UseCurrentActionRequest} from "@crud-react/component/crud/CrudLoader.tsx";
import {UseConfig} from "@crud-react/context/ConfigContext.tsx";

type GridViewHeaderColumnAttributes = {
    className?: string
};

export type GridViewType = {
    options?: {
        columns: { [key: string]: ((data?: any) => ColumnType) | ColumnType }
    },
    headerOptions?: {
        columns: {
            [key: string]: {
                view: ReactElement | ((column: ColumnType) => ReactElement);
                attr?: GridViewHeaderColumnAttributes | ((column: ColumnType) => GridViewHeaderColumnAttributes)
            }
        }
    },
    tableOptions?: TableHTMLAttributes<HTMLTableElement>,
    routeParams?: { [key: string]: any },
    namespace?: string
};

const GridView = ({
                      routeParams,
                      namespace,
                      options,
                      tableOptions,
                      ...HTMLAttributes
                  }: GridViewType & HTMLAttributes<HTMLDivElement>) => {
    const {columns, primaryColumn, objectActions, columnsTotal, items, data, onClick} = UseList();
    const {actionRequest: currentActionRequest} = UseCurrentActionRequest();
    const {options: configOptions} = UseConfig();
    const GridViewOptions = {
        className: "table-responsive",
        ...HTMLAttributes,
        ...(configOptions?.GridView || {})
    };

    tableOptions = {
        className: "table table-striped table-hover",
        ...(configOptions?.HTMLTableElement || {}),
        ...(tableOptions || {})
    };


    return (
        <div {...GridViewOptions}>
            <table {...tableOptions}>
                <thead>
                <tr>
                    {columns.map((column: ColumnType, index: number) => {
                        return (
                            <th {...column?.view?.header?.attr || {}} key={index}>
                                <ItemLabel column={column} namespace={namespace}/>
                                {column.sortable && data?.sort?.[column.field] !== undefined && (
                                    <Link
                                        onClick={(event) => onClick && onClick({
                                            ...currentActionRequest,
                                            query: {
                                                ...currentActionRequest.query,
                                                sort: {[column.field]: data?.sort[column.field] ? (data?.sort[column.field] === 'ASC' ? 'DESC' : '') : 'ASC'}
                                            }
                                        }, event)}
                                        className={"btn btn-sm"}
                                        to={"#"}
                                    >
                                        {data.sort[column.field] ? (data.sort[column.field] === 'ASC' ? '\u21D1' : '\u21D3') : '\u21C5'}
                                    </Link>
                                )}
                            </th>
                        )
                    })}
                    {primaryColumn && objectActions && objectActions.length > 0 && (
                        <th className="text-end">
                            <T>Actions</T>
                        </th>
                    )}
                </tr>
                </thead>
                <tbody>
                {items?.length ? (items.map((row, index: number) => (
                    <ListItemProvider key={index} index={index}>
                        <tr>
                            {columns?.map((column: ColumnType, columnIndex: number) => {
                                    const columnOptions = options?.columns?.[column.field];

                                    column = {
                                        ...column,
                                        ...(columnOptions instanceof Function ? columnOptions(data?.entity?.data.items[index]) : options?.columns?.[column.field])
                                    };

                                    return (
                                        <td {...column?.view?.content?.attr || {}} key={columnIndex}>
                                            {columnIndex === 0 &&
                                                (
                                                    <BatchItemSelector className={"me-2"}/>
                                                )
                                            }
                                            <ItemValue column={column} namespace={namespace}/>
                                        </td>
                                    )
                                }
                            )}
                            {primaryColumn && objectActions && objectActions.length > 0 && (
                                <td className={"text-end text-nowrap"}>
                                    <ItemActions routeParams={routeParams} namespace={namespace}/>
                                </td>
                            )}
                        </tr>
                    </ListItemProvider>
                ))) : (
                    <tr>
                        <td colSpan={columnsTotal}>
                            <T>Not results found.</T>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default GridView;
