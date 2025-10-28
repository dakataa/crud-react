import React, {ReactElement, useEffect, useRef} from "react";
import {convertFormDataToObject, Method} from "@dakataa/requester";
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


const List = WithDataProvider(AsTemplate(({embedded = false, title, className}: {
    action?: OnClickAction,
    embedded?: boolean
    title?: string | ReactElement | false,
    className?: string,
}) => {
    const {action, setAction} = UseCurrentAction();
    const {generateActionLink, location, navigate} = UseActions()
    const filterFormRef = useRef<FormRef | null>(null);
    const {openModal} = UseModal()
    const {open: openAlert} = UseAlert();

    const entity = action.action.entity;
    if (!entity) {
        throw new Error('Invalid Entity');
    }

    const {results, refresh} = UseDataProvider() || {};
    const actions = (Object.values(results?.action ?? []) as ActionType[]).filter(a => a.visibility === ActionVisibility.List && a.name !== action.action.name);

    const filterData = ({newAction, excludeFilterParameters}: {
        newAction?: OnClickAction,
        excludeFilterParameters?: [string]
    }): void => {
        const filterAction = {...(newAction ?? action)};
        excludeFilterParameters?.forEach((key) => {
            delete filterAction.query?.filter?.[key];
        })

        if (embedded) {
            setAction(filterAction);
        } else {
            const url = generateActionLink(filterAction);
            navigate(url);
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
        event?.preventDefault();

        onClickAction.parameters = {...(onClickAction.parameters || {}), ...(action.parameters || {})}
        onClickAction.parameters = objectRemoveEmpty(onClickAction.parameters as object);
        if (!Object.keys(onClickAction.parameters as object).length) {
            onClickAction.parameters = undefined;
        }

        if (onClickAction.query !== undefined) {
            onClickAction.query = objectRemoveEmpty(onClickAction.query as object);
            if (!Object.keys(onClickAction.query as object).length) {
                onClickAction.query = undefined;
            }
        }

        switch (onClickAction.action.name) {
            case 'list': {
                return filterData({newAction: onClickAction});
            }
            case 'delete': {
                openAlert({
                    title: 'Are you sure?',
                    icon: Icon.confirm,
                    onResult: (result: Result) => {
                        if (result.isConfirmed) {
                            CrudRequester().fetch({
                                url: generateActionLink(onClickAction),
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
        }

        console.log('onClickAction', onClickAction.action.name, embedded);

        if (embedded) {
            openModal({
                action: onClickAction,
                props: {
                    size: 'lg',
                    onClose: () => {
                        refresh?.();
                    }
                }
            });

            return;
        }

        filterData({newAction: onClickAction});
    }

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
                                                        ...action,
                                                        query: objectRemoveEmpty(convertFormDataToObject(formData))
                                                    })}
                                                    onReset={() => handleAction({
                                                        ...action,
                                                        query: undefined
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
                                    {location.searchParams.has('filter') && (
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
                        <FiltersView formView={results.form.filter.view} onClick={(key) => filterData({excludeFilterParameters: [key]})}/>
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
}, {name: 'list'}));


export default List;
