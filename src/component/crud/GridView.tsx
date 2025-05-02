import {ListType} from "@src/type/ListType";
import {ColumnType} from "@src/type/ColumnType";
import React, {forwardRef, ReactElement} from "react";
import {ActionType} from "@src/type/ActionType";
import Link from "@src/component/Link.tsx";
import {UseActions} from "@src/context/ActionContext.tsx";
import {default as T} from "@src/component/Translation.tsx";
import ColumnValue from "@src/component/crud/ColumnValue.tsx";
import BatchItemSelector from "@src/component/crud/batch/BatchItemSelector.tsx";
import ColumnLabel from "@src/component/crud/ColumnLabel.tsx";

type GridViewHeaderColumnAttributes = {
    className?: string
};

export type OnClickAction = {
    action: ActionType,
    parameters?: { [key: string]: any }
};

export type GridViewType = {
    data?: ListType | null,
    columns?: ColumnType[],
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
    onClick?: (props: OnClickAction, event: React.MouseEvent) => void,
    routeParams?: {[key: string]: any},
    namespace?: string
};

const GridView = forwardRef(({data, columns, options, onClick, routeParams, namespace}: GridViewType, ref) => {
    columns = (columns || data?.entity?.columns || []).filter(c => c.visible).filter(c => c.group !== false);

    const {generateLink} = UseActions();

    const primaryColumn = data?.entity?.primaryColumn;
    const actions = Object.values(data?.action || []);
    const objectActions = actions.filter(a => a.object);
    const columnsTotal = columns.length + (actions.length ? 1 : 0);
    const items = data?.entity.data.items ?? [];

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
                        <th className="text-end">Actions</th>
                    )}
                </tr>
                </thead>
                <tbody>
                {items.length ? items.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns?.map((column, columnIndex) => (
                                        <td key={columnIndex}>
                                            {columnIndex === 0 &&
                                                (
                                                    <BatchItemSelector row={rowIndex}/>
                                                )
                                            }
                                            <ColumnValue column={column} row={rowIndex} data={data as ListType} namespace={namespace || 'unknown'}/>
                                        </td>
                                    )
                                )}
                                {primaryColumn && objectActions.length > 0 && (
                                    <td className={"text-end text-nowrap"}>
                                        {objectActions.map((action, index) => (
                                            <Link
                                                key={index}
                                                onClick={(event) => onClick && onClick({
                                                    action: action,
                                                    parameters: {
                                                        ...(routeParams || {}),
                                                        id: row[primaryColumn?.field]
                                                    }
                                                }, event)}
                                                className={['btn', 'btn-sm', 'mb-1', 'ms-1', (action.route?.methods ?? []).includes('DELETE') ? 'btn-outline-danger' : 'btn-outline-secondary'].join(' ')}
                                                to={generateLink(action.route, {
                                                    ...(routeParams || {}),
                                                    id: row[primaryColumn.field]
                                                })}
                                            >
                                                {action.title}
                                            </Link>
                                        ))}
                                    </td>
                                )}
                            </tr>
                        )
                    ) : (
                        <tr>
                            <td colSpan={columnsTotal}>
                                <T>Not results found.</T>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    );
});

export default GridView;
