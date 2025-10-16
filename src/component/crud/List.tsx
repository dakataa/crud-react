import React, {ReactElement, useEffect, useRef} from "react";
import {
    convertFormDataToObject,
    convertObjectToURLSearchParams,
    convertURLSearchParamsToObject,
    Method
} from "@dakataa/requester";
import GridView, {OnClickAction} from "@src/component/crud/GridView.tsx";
import Paginator from "@src/component/crud/Paginator.tsx";
import {Form, FormRef, nameToId} from "@src/component/form/Form.tsx";
import Dropdown, {DropdownButton, DropdownContent} from "@src/component/Dropdown.tsx";
import Button from "@src/component/Button.tsx";
import FormFieldViewLoader from "@src/component/crud/form/FormFieldViewLoader.tsx";
import {objectRemoveEmpty} from "@src/helper/ObjectUtils.tsx";
import DynamicView from "@src/component/crud/DynamicView.tsx";
import {UseDataProvider, WithDataProvider} from "@src/context/GetData.tsx";
import {ActionType, ActionVisibility} from "@src/type/ActionType.tsx";
import {UseModal} from "@src/context/ModalContext.tsx";
import {Icon, Result, UseAlert} from "@src/context/AlertContext.tsx";
import {default as T} from "@src/component/Translation.tsx";
import {CrudRequester} from "@src/Crud.tsx";
import {UseActions} from "@src/context/ActionContext.tsx";
import FiltersView from "@src/component/crud/FiltersView.tsx";
import {BatchActionsProvider} from "@src/component/crud/batch/BatchActionsContext.tsx";
import BatchActionSelector from "@src/component/crud/batch/BatchActionSelector.tsx";
import {ListProvider} from "@src/context/ListContext.tsx";
// import CustomUserItem from "../../../crud/test/product/default/list/CustomItem.tsx";
import Action from "@src/component/crud/Action.tsx";
import {UseCurrentAction} from "@src/component/crud/CrudLoader.tsx";
import {FormViewProvider} from "@src/component/crud/form/Form.tsx";
import {AsTemplate, Block} from "@src/component/templating/Template.tsx";


const List = AsTemplate(WithDataProvider(({embedded = false, title, className}: {
    action?: OnClickAction,
    embedded?: boolean
    title?: string | ReactElement | false,
    className?: string,
}) => {
    const action = UseCurrentAction();
    const {generateRoute, generateActionLink, location, navigate} = UseActions()
    let searchParams = new URLSearchParams(location.search);
    const sort = useRef<{ [key: string]: any } | undefined>(undefined);
    const filter = useRef<{ [key: string]: any } | undefined>(convertURLSearchParamsToObject(searchParams));
    const filterFormRef = useRef<FormRef | null>(null);
    const {openModal} = UseModal()
    const {open: openAlert} = UseAlert();

    const entity = action.action.entity;

    if (!entity) {
        throw new Error('Invalid Entity');
    }

    const {results, refresh, setQueryParameters} = UseDataProvider() || {};

    const actions = (Object.values(results?.action ?? []) as ActionType[]).filter(a => a.visibility === ActionVisibility.List && a.name !== action.action.name);

    const filterData = (excludeFilterParameters?: [string]): void => {
        excludeFilterParameters?.forEach((key) => {
            delete filter.current?.filter?.[key];
        })

        const query = {
            ...(filter.current && filter.current),
            ...(sort.current && {sort: sort.current}),
        };

        searchParams = convertObjectToURLSearchParams(objectRemoveEmpty(query));
        if (embedded) {
            setQueryParameters?.(searchParams)
        } else {
            const url = new URL(document.location.href);
            url.search = searchParams.toString();
            navigate(url.toString())
        }
    }

    const handleBatchAction = (method: string, ids: any, data: FormData): Promise<void> => {
        return new Promise((resolve, reject) => {
            openAlert({
                title: 'Are you sure?',
                icon: Icon.confirm,
                onResult: (result: Result) => {
                    if (result.isConfirmed) {
                        CrudRequester().post({
                            url: generateActionLink(action),
                            body: data
                        }).catch((e: any) => {
                            reject();
                        }).finally(() => {
                            refresh?.();
                            resolve();
                        });
                    } else {
                        reject();
                    }
                }
            });
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
                            CrudRequester().fetch({
                                url: generateRoute(onClickAction.action.route, {...action.parameters, ...onClickAction.parameters}),
                                method: Method.DELETE
                            }).catch((e: any) => {
                                console.log('error', e);
                            }).finally(() => {
                                refresh?.();
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
                        action: onClickAction,
                        props: {
                            size: 'lg',
                            onClose: () => {
                                refresh?.();
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
        setQueryParameters?.(searchParams);
    }, [location.search]);

    return (
        <ListProvider data={results} onClick={handleAction}>
            <section className={className || "list"}>
                <Block name={"header"}>
                    <header className="content-header d-md-flex mb-3 justify-content-between align-items-center">
                        <Block name={"title"}>
                            {title !== false && (
                                React.isValidElement(title) ? (
                                    title
                                ) : (
                                    <h2>{title ?? results?.title}</h2>
                                )
                            )}
                        </Block>
                        <div className={"d-flex align-items-center"}>
                            {!!actions.length && (
                                <div className="btn-group btn-group-sm me-2">
                                    {actions.map((item, index) => (
                                        <Action
                                            key={index}
                                            action={{...action, action: item}}
                                            className="btn btn-outline-secondary"
                                        />
                                    ))}
                                </div>
                            )}
                            {results?.form?.filter?.view && (
                                <div className={"btn-group btn-group-sm"}>
                                    <Dropdown className={"btn-group btn-group-sm"}>
                                        <DropdownButton className={"btn-outline-dark"}>
                                            <T>Filter</T>
                                        </DropdownButton>
                                        <DropdownContent>
                                            <div className="filter">
                                                <Form
                                                    id={"filter_" + nameToId(entity)}
                                                    ref={filterFormRef}
                                                    onSubmit={(formData: FormData) => handleAction({
                                                        action: {
                                                            name: 'filter',
                                                            namespace: action.action.namespace,
                                                            entity: entity
                                                        }, parameters: convertFormDataToObject(formData)
                                                    })}
                                                    onReset={() => handleAction({
                                                        action: {
                                                            name: 'filter',
                                                            namespace: action.action.namespace,
                                                            entity: entity
                                                        }
                                                    })}
                                                >
                                                    {
                                                        results?.form?.filter && (
                                                            <FormViewProvider view={results.form.filter.view}>
                                                                <FormFieldViewLoader/>
                                                            </FormViewProvider>
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
                            )}
                        </div>
                    </header>
                </Block>
                <BatchActionsProvider onClick={handleBatchAction}>
                    {results?.form?.filter?.view && (
                        <FiltersView formView={results.form.filter.view} onClick={(key) => filterData([key])}/>
                    )}
                    <BatchActionSelector/>
                    <Block name={"content"}>
                        <DynamicView key={"list"} prefix={"list"} view={"content"} data={results}>

                            <GridView
                                routeParams={action.parameters}
                            />
                            {/*<ListView*/}
                            {/*    // item={<CustomUserItem/>}*/}
                            {/*    routeParams={action.parameters}/>*/}

                        </DynamicView>
                        <Paginator/>
                    </Block>
                </BatchActionsProvider>
            </section>
        </ListProvider>
    );
}), {name: 'list'});


export default List;
