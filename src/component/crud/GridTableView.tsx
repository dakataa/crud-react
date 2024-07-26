import {ListType} from "@src/type/ListType";
import {Link, useLocation, useMatch} from "react-router-dom";
import {ColumnType} from "@src/type/ColumnType";
import React, {ReactElement, useRef, useState} from "react";
import {ActionType} from "@src/type/ActionType";
import {generateRoute} from "@src/component/Router";
import {useActions} from "@src/context/ActionContext.tsx";

type GridViewHeaderColumnAttributes = {
    className?: string
};

export type OnClickAction = {
    action: ActionType,
    parameters?: { [key: string]: any }
};

const GridTableView = ({data, columns, options, onClick, ...props}: {
    data?: ListType,
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
    onClick?: (props: OnClickAction, event: React.MouseEvent) => void
}) => {
    columns = (columns || data?.entity?.columns || []).filter(c => c.group !== false);

    const [, updateState] = useState<any>();
    const primaryColumn = data?.entity?.primaryColumn;
    const actions = Object.values(data?.action || []);
    const objectActions = actions.filter(a => a.object);
    const columnsTotal = columns.length + (actions.length ? 1 : 0);
    const hasBatchActions = data?.form?.batch !== undefined && primaryColumn;
    const currentIds: number[] = (data?.entity.data.items || []).map(row => row[primaryColumn?.field] || 0);
    const batchSelectedIds = useRef<number[]>([]);
    const batchIsSelectedAll = currentIds.reduce((v: boolean, id) => v && batchSelectedIds.current.includes(id), true);

    const [, controller] = useActions();

    console.log('controller', controller);

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

    return (
        <>
            {data?.form?.batch !== undefined && (
                <label>
                    <input
                        checked={batchIsSelectedAll}
                        onChange={(e) => batchToggleAll(e.target.checked)}
                        type={"checkbox"}/> Select all
                </label>
            )}

            <table className="table table-striped table-hover table-bordered">
                <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>
                            {column.label}
                            {column.sortable && data?.sort[column.field] !== undefined && (
                                <Link
                                    onClick={(event) => onClick && onClick({
                                        action: {
                                            name: 'sort',
                                            object: false
                                        },
                                        parameters: {[column.field]: data.sort[column.field] ? (data.sort[column.field] === 'ASC' ? 'DESC' : '') : 'ASC'}
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
                {data !== undefined && (!!data.entity.data.items.length ? data.entity.data.items.map((row, rowIndex) => (
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
                                            {row[column.field]}
                                        </td>
                                    )
                                )}
                                {primaryColumn && objectActions.length > 0 && (
                                    <td>
                                        {objectActions.map((action, index) => (
                                            <Link
                                                key={index}
                                                onClick={(event) => onClick && onClick({
                                                    action: action,
                                                    parameters: {id: row[primaryColumn?.field]}
                                                }, event)}
                                                className={"btn"}
                                                to={generateRoute(action.route, {
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
}

export default GridTableView;
