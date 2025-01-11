import {ListType} from "@src/type/ListType";
import {Link} from "react-router-dom";
import {ColumnType} from "@src/type/ColumnType";
import React, {forwardRef, ReactElement, useRef, useState} from "react";
import {ActionType} from "@src/type/ActionType";
import {generateRoute} from "@src/helper/RouterUtils.tsx";
import DynamicView from "@src/component/crud/DynamicView.tsx";
import Dropdown, {DropdownButton, DropdownContent} from "@src/component/Dropdown.tsx";

type GridViewHeaderColumnAttributes = {
    className?: string
};

export type OnClickAction = {
    action: ActionType,
    parameters?: { [key: string]: any }
};

type GridTableViewType = {
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
    onBatchClick?: (method: string, ids: any, data: FormData) => void,
    routeParams?: {[key: string]: any},
    namespace?: string
};

const GridTableView = forwardRef(({data, columns, options, onClick, onBatchClick, routeParams, namespace}: GridTableViewType, ref) => {
    columns = (columns || data?.entity?.columns || []).filter(c => c.group !== false);

    const [, updateState] = useState<any>();
    const primaryColumn = data?.entity?.primaryColumn;
    const actions = Object.values(data?.action || []);
    const objectActions = actions.filter(a => a.object);
    const columnsTotal = columns.length + (actions.length ? 1 : 0);
    const currentIds: number[] = (data?.entity.data.items || []).map(row => (row[primaryColumn?.field || ''] || 0));
    const batchSelectedIds = useRef<number[]>([]);
    const batchIsSelectedAll = !!currentIds.length && currentIds.reduce<boolean>((result: boolean, id) => result && batchSelectedIds.current.includes(id), true);
    const batchActions = data?.form?.batch.view.children?.method?.choices;
    const hasBatchActions = !!batchActions?.length && primaryColumn;

    const batchToggleItem = (id: number, add: boolean = false) => {
        if (add) {
            batchSelectedIds.current.push(id);
        } else {
            batchSelectedIds.current = batchSelectedIds.current.filter(v => v !== id);
        }
        updateState({});
    };

    const batchToggleAll = (selectAll: boolean = false) => {
        batchSelectedIds.current = (selectAll ? batchSelectedIds.current.concat(currentIds) : batchSelectedIds.current.filter((id) => !currentIds.includes(id))).filter((v, i, self) => self.indexOf(v) === i)
        updateState({});
    };

    const batchHandle = (method: string) => {
        if(!onBatchClick) {
            return;
        }

        const batchFormView = data?.form.batch.view;
        if(!hasBatchActions) {
            return;
        }

        const formData = new FormData()
        batchSelectedIds.current.forEach((value) => {
            formData.append(`${batchFormView?.children?.ids.full_name}[]`, value.toString());
        })
        formData.append(batchFormView?.children?.method.full_name || 'method', method)

        onBatchClick(method, batchSelectedIds.current, formData);
    }

    return (
        <>
            {hasBatchActions && (
                <div className={"btn-group btn-group-sm mb-2"}>
                    <label className={"btn btn-outline-light"}>
                        <input
                            checked={batchIsSelectedAll}
                            onChange={(e) => batchToggleAll(e.target.checked)}
                            type={"checkbox"}/>
                    </label>
                    <Dropdown className={"btn-group btn-group-sm"}>
                        <DropdownButton></DropdownButton>
                        <DropdownContent>
                            {(data.form.batch.view.children?.method.choices?.map((choice) => (
                                <div onClick={() => batchHandle(choice.value instanceof Function ? choice.value() : choice.value)} className={"dropdown-item"}>{(choice.label instanceof Function ? choice.label() : choice.label)}</div>
                            )))}
                        </DropdownContent>
                    </Dropdown>
                </div>
            )}

            <table className="table table-striped table-hover table-bordered">
                <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>
                            <DynamicView namespace={data?.entity.name || 'unknown'} data={column} prefix={"list"} view={column.field + '.label'}>{column.label}</DynamicView>
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
                {data && (!!data.entity.data.items.length ? data.entity.data.items.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns?.map((column, columnIndex) => (
                                        <td key={columnIndex}>
                                            {columnIndex === 0 && hasBatchActions &&
                                                (
                                                    <input
                                                        checked={batchSelectedIds.current.includes(row[primaryColumn?.field])}
                                                        className={"me-2"} type="checkbox"
                                                        name={data.form.batch.view.full_name}
                                                        value={row[primaryColumn?.field]}
                                                        onChange={(e) => batchToggleItem(row[primaryColumn?.field], e.target.checked)}
                                                    />
                                                )
                                            }
                                            <DynamicView namespace={namespace || 'unknown'} data={row} prefix={"list"} view={column.field}>
                                                {row[column.field] !== undefined && (
                                                    row[column.field] instanceof Object ? (row[column.field] instanceof Array ? row[column.field].join(', ') : JSON.stringify(row[column.field])): row[column.field]?.toString()
                                                )}
                                            </DynamicView>
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
                                                to={generateRoute(action.route, {
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
                                Not results found.
                            </td>
                        </tr>
                    )
                )}
                </tbody>
            </table>
        </>
    );
});

export default GridTableView;
