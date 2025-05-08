import {ColumnType} from "@src/type/ColumnType";
import React, {forwardRef, ReactElement} from "react";
import {ActionType} from "@src/type/ActionType";
import Link from "@src/component/Link.tsx";
import {default as T} from "@src/component/Translation.tsx";
import ColumnValue from "@src/component/crud/ColumnValue.tsx";
import BatchItemSelector from "@src/component/crud/batch/BatchItemSelector.tsx";
import ColumnLabel from "@src/component/crud/ColumnLabel.tsx";
import {ListItemProvider} from "@src/context/ListItemContext.tsx";
import ColumnActions from "@src/component/crud/ColumnActions.tsx";
import {UseList} from "@src/context/ListContext.tsx";

type GridViewHeaderColumnAttributes = {
    className?: string
};

export type OnClickAction = {
    action: ActionType,
    parameters?: { [key: string]: any }
};

export type GridViewType = {
    options?: {
        columns: ColumnType[]
    },
    headerOptions?: {
        columns: {
            [key: string]: {
                view: ReactElement | ((column: ColumnType) => ReactElement);
                attr?: GridViewHeaderColumnAttributes | ((column: ColumnType) => GridViewHeaderColumnAttributes)
            }
        }
    },
    routeParams?: { [key: string]: any },
    namespace?: string
};

const GridView = forwardRef(({options, routeParams, namespace}: GridViewType, ref) => {

    const {columns, primaryColumn, actions, objectActions, columnsTotal, items, data, onClick} = UseList();

    return (
        <div className={"table-responsive"}>
            <table className="table table-striped table-hover table-bordered">
                <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>
                            <ColumnLabel column={column} namespace={namespace}/>
                            {column.sortable && data?.sort[column.field] !== undefined && (
                                <Link
                                    onClick={(event) => onClick && onClick({
                                        action: {
                                            name: 'sort',
                                            object: false,
                                            namespace: namespace,
                                            entity: data?.entity.name
                                        },
                                        parameters: {[column.field]: data?.sort[column.field] ? (data?.sort[column.field] === 'ASC' ? 'DESC' : '') : 'ASC'}
                                    }, event)}
                                    className={"btn"}
                                    to={"#"}
                                >
                                    {data.sort[column.field] ? (data.sort[column.field] === 'ASC' ? '\u21D1' : '\u21D3') : '\u21C5'}
                                </Link>
                            )}
                        </th>
                    ))}
                    {primaryColumn && objectActions.length > 0 && (
                        <th className="text-end">
                            <T>Actions</T>
                        </th>
                    )}
                </tr>
                </thead>
                <tbody>
                {items.length ? (items.map((row, index) => (
                    <ListItemProvider key={index} index={index}>
                        <tr>
                            {columns?.map((column, columnIndex) => (
                                    <td key={columnIndex}>
                                        {columnIndex === 0 &&
                                            (
                                                <BatchItemSelector/>
                                            )
                                        }
                                        <ColumnValue column={column} namespace={namespace}/>
                                    </td>
                                )
                            )}
                            {primaryColumn && objectActions.length > 0 && (
                                <td className={"text-end text-nowrap"}>
                                    <ColumnActions namespace={namespace}/>
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
});

export default GridView;
