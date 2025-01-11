import React, {memo, useEffect, useRef} from "react";
import {
    convertFormDataToObject,
    convertObjectToURLSearchParams,
    convertURLSearchParamsToObject,
    default as Requester,
    Method
} from "@dakataa/requester";
import GridTableView, {OnClickAction} from "@src/component/crud/GridTableView.tsx";
import PaginatorView from "@src/component/crud/PaginatorView.tsx";
import {Link, useLocation, useParams, useSearchParams} from "react-router-dom";
import {Form, FormRef, nameToId} from "@src/component/form/Form.tsx";
import Dropdown, {DropdownButton, DropdownContent} from "@src/component/Dropdown.tsx";
import Button from "@src/component/Button.tsx";
import {generateRoute} from "@src/helper/RouterUtils.tsx";
import FormView from "@src/component/crud/FormView.tsx";
import {objectRemoveEmpty} from "@src/helper/ObjectUtils.tsx";
import DynamicView from "@src/component/crud/DynamicView.tsx";
import {UseActions} from "@src/context/ActionContext.tsx";
import GetData, {GetDataType} from "@src/component/hooks/GetData.tsx";
import {ListType} from "@src/type/ListType.tsx";
import {ActionType} from "@src/type/ActionType.tsx";
import {UseModal} from "@src/context/ModalContext.tsx";
import {Icon, Result, UseAlert} from "@src/context/AlertContext.tsx";
import {default as T} from "@src/component/Translation.tsx";
import {FormViewType} from "@src/type/FormViewType.tsx";

const List = memo(({action, embedded = false}: {
    action?: OnClickAction,
    embedded?: boolean
}) => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const sort = useRef<{ [key: string]: any } | undefined>();
    const filter = useRef<{ [key: string]: any } | undefined>(convertURLSearchParamsToObject(searchParams));
    const filterFormRef = useRef<FormRef | null>(null);

    const {getActionByPath, getAction} = UseActions();
    const {openModal} = UseModal()
    const {open: openAlert} = UseAlert();

    const entityAction = (action?.action && getAction(action.action.entity, action.action.name, action.action.namespace)) || getActionByPath(document.location.pathname);
    if (!entityAction) {
        throw new Error('Invalid Action');
    }

    action = {
        action: entityAction,
        parameters: {...(action?.parameters ?? {}), ...useParams()}
    }

    const entity = action?.action.entity;

    if (!entity) {
        throw new Error('Invalid Entity');
    }

    const {results, refresh, setQueryParameters}: GetDataType & {
        results: ListType | null;
    } = GetData({entityAction: action.action, initParameters: action.parameters, initQueryParameters: filter.current});
    const actions = (Object.values(results?.action ?? []) as ActionType[]).filter(a => !a.object && a.name !== action.action.name);

    const filterData = (excludeFilterParameters?: [string]): void => {
        excludeFilterParameters?.forEach((key) => {
            delete filter.current?.filter?.[key];
        })

        const query = {
            ...(filter.current && filter.current),
            ...(sort.current && {sort: sort.current}),
        };

        const searchQuery = convertObjectToURLSearchParams(objectRemoveEmpty(query));
        if (embedded) {
            setQueryParameters(searchQuery)
        } else {
            setSearchParams(searchQuery);
        }
    }

    const handleBatchAction = (method: string, ids: any, data: FormData) => {
        console.log('method', ids, data);

        openAlert({
            title: 'Are you sure?',
            icon: Icon.confirm,
            onResult: (result: Result) => {
                if (result.isConfirmed) {
                    (new Requester).post(generateRoute(entityAction.route, action.parameters), data).catch((e:any) => {
                        console.log('error', e);
                    }).finally(() => {
                        console.log('done');
                        refresh();
                    });
                }
            }
        });
    }

    const handleAction = (onClickAction: OnClickAction, event?: React.MouseEvent) => {
        if (onClickAction.parameters !== undefined) {
            onClickAction.parameters = objectRemoveEmpty(onClickAction.parameters as object);
            if (!Object.keys(onClickAction.parameters as object).length) {
                onClickAction.parameters = undefined;
            }
        }

        switch (onClickAction.action.name) {
            case 'filter': {
                event?.preventDefault();
                filter.current = onClickAction.parameters;
                break;
            }
            case 'sort': {
                event?.preventDefault();
                sort.current = onClickAction.parameters;
                break;
            }
            case 'delete': {
                event?.preventDefault();
                openAlert({
                    title: 'Are you sure?',
                    icon: Icon.confirm,
                    onResult: (result: Result) => {
                        if (result.isConfirmed) {
                            (new Requester).fetch({
                                url: generateRoute(onClickAction.action.route, {...action.parameters, ...onClickAction.parameters}),
                                method: Method.DELETE
                            }).catch((e:any) => {
                                console.log('error', e);
                            }).finally(() => {
                                refresh();
                            });
                        }
                    }
                });
                return;
            }
            default: {
                if (embedded) {
                    event?.preventDefault();
                    openModal({
                        action: onClickAction, props: {
                            onClose: () => {
                                refresh();
                            }
                        }
                    });
                }
                return;
            }
        }

        filterData();
    }

    useEffect(() => {
        setQueryParameters(searchParams);
    }, [location]);

    return (
        <>
            <section className={"list"}>
                <header className="content-header d-md-flex mb-3 justify-content-between align-items-center">
                    <h2>
                        {results?.title}
                    </h2>
                    <div className={"d-flex align-items-center"}>
                        {!!actions.length && (
                            <div className="btn-group btn-group-sm me-2">
                                {actions.map((item, index) => (
                                    <Link
                                        key={index}
                                        to={generateRoute(item.route, action.parameters)}
                                        onClick={(event) => handleAction({
                                            action: item,
                                            parameters: action.parameters
                                        }, event)}
                                        className="btn btn-outline-secondary">
                                        {item.title || item.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                        <div className={"btn-group btn-group-sm"}>
                            <Dropdown className={"btn-group btn-group-sm"}>
                                <DropdownButton className={"btn-outline-dark"}><T>Filter</T></DropdownButton>
                                <DropdownContent>
                                    <div className="filter">
                                        <Form
                                            id={"filter_" + nameToId(entity)}
                                            ref={filterFormRef}
                                            onSubmit={(formData: FormData) => handleAction({
                                                action: {
                                                    name: 'filter',
                                                    object: false,
                                                    namespace: action.action.namespace,
                                                    entity: entity
                                                }, parameters: convertFormDataToObject(formData)
                                            })}
                                            onReset={() => handleAction({
                                                action: {
                                                    name: 'filter',
                                                    object: false,
                                                    namespace: action.action.namespace,
                                                    entity: entity
                                                }
                                            })}
                                        >
                                            {
                                                results?.form?.filter && (
                                                    <FormView view={results.form.filter.view}/>
                                                )
                                            }
                                            <button className={"btn btn-primary me-2"} type={"submit"}>
                                                <T>Submit</T>
                                            </button>
                                        </Form>
                                    </div>
                                </DropdownContent>
                            </Dropdown>
                            {!!Object.values(filter.current?.filter || []).length && (
                                <Button onClick={() => {
                                    filterFormRef.current?.reset();
                                }} className="btn btn-outline-dark">x</Button>
                            )}
                        </div>
                    </div>
                </header>
                {results?.form?.filter && (
                    <FiltersView formView={results.form.filter.view} onClick={(key) => filterData([key])}/>
                )}
                <DynamicView namespace={action.action.namespace} key={"modify"} prefix={"modify"} view={"content"} data={results}>
                    <div className={"table-responsive"}>
                        <GridTableView
                            data={results}
                            onClick={handleAction}
                            onBatchClick={handleBatchAction}
                            namespace={action.action.namespace}
                            routeParams={action.parameters}/>
                    </div>
                    {results && <PaginatorView meta={results.entity.data.meta}/>}
                </DynamicView>
            </section>
        </>
    );
})

const FiltersView = ({formView, onClick}: { formView: FormViewType, onClick: (key: string) => void }) => {

    const getValue = (view: FormViewType) => {
        if (view.choices !== undefined) {
            return (view.choices ? Object.values(view.data instanceof Object ? view.data : [view.data]).map((k: any) => view.choices?.[k]?.label ?? k).join(', ') : view.data);
        } else if (view.checked !== undefined) {
            return view.checked ? 'Yes' : 'No';
        }

        return view.data;
    }

    return (
        <div className={"filters d-flex mb-sm overflow-auto"}>
            {Object.values<FormViewType>(formView.children || []).filter(item => item.data !== null).map((item, index) => (
                <div key={index} className="filters-item d-flex text-nowrap flex-column me-2 mb-2">
                    <small className="mb-2">{item.label}</small>
                    <div className="btn btn-sm btn-primary me-1 mb-1">
                        {getValue(item)}
                        {onClick && (
                            <span onClick={() => onClick(item.name)} className={"ms-2"}>
                                &times;
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default List;
