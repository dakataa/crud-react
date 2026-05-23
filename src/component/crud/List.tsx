import React, {ComponentType, FC, PropsWithChildren, ReactElement, SyntheticEvent, useRef} from "react";
import {convertFormDataToObject} from "@dakataa/requester";
import GridView from "@src/component/crud/GridView.tsx";
import Paginator from "@src/component/crud/Paginator.tsx";
import {Form, FormRef, nameToId} from "@src/component/form/Form.tsx";
import Dropdown, {DropdownButton, DropdownContent} from "@src/component/Dropdown.tsx";
import Button from "@src/component/Button.tsx";
import FormGroupViewLoader from "@src/component/crud/form/FormGroupViewLoader.tsx";
import {objectRemoveEmpty} from "@src/helper/ObjectUtils.tsx";
import DynamicView from "@src/component/crud/DynamicView.tsx";
import {ActionVisibility} from "@src/type/ActionType.tsx";
import {default as T} from "@src/component/Translation.tsx";
import {UseActions} from "@src/context/ActionContext.tsx";
import FiltersView from "@src/component/crud/FiltersView.tsx";
import {BatchActionsProvider} from "@src/component/crud/batch/BatchActionsContext.tsx";
import BatchActionSelector from "@src/component/crud/batch/BatchActionSelector.tsx";
import {ListProvider, UseList} from "@src/context/ListContext.tsx";
// import CustomUserItem from "../../../crud/test/product/default/list/CustomItem.tsx";
import ActionLink from "./ActionLink.tsx";
import {UseCurrentActionRequest} from "@src/component/crud/CrudLoader.tsx";
import {FormViewProvider} from "@src/component/crud/form/Form.tsx";
import {AsTemplate, Block} from "@src/component/templating/Template.tsx";
import {ActionRequestType} from "../../type/ActionRequestType.tsx";
import {WithDataProvider} from "@src/context/GetData.tsx";

type ListPropsType = {
    embedded?: boolean
    title?: string | ReactElement | false,
    className?: string,
    onAction?: (action: ActionRequestType, event?: SyntheticEvent) => boolean | null | void,
};

const List = WithDataProvider(({children, embedded = false, title, className, onAction}: ListPropsType & PropsWithChildren) => {
    return (
        <ListProvider embedded={embedded} onClick={onAction}>
            <ListInner title={title} className={className}>
                {children}
            </ListInner>
        </ListProvider>
    )
});

function WithListProvider<P extends object>(Component: ComponentType<P>, options?: ListPropsType): FC<P> {

    return (props: P) => {
        return (
            <ListProvider {...(options || {})}>
                <Component {...props}/>
            </ListProvider>
        )
    };
}

const ListInner = AsTemplate(({title, className}: {
    title?: string | ReactElement | false,
    className?: string
} & PropsWithChildren) => {
    const {
        data: results,
        handleAction,
        filterData,
        getActions,
        handleBatchAction
    } = UseList();

    const {actionRequest, setActionRequest} = UseCurrentActionRequest();
    const {location} = UseActions()
    const filterFormRef = useRef<FormRef | null>(null);
    const listActions = getActions(ActionVisibility.List);


    const entity = actionRequest.action.entity;
    if (!entity) {
        throw new Error('Invalid Entity');
    }

    return (
        <section className={className || "list"}>
            <Block name={"header"}>
                <header
                    className="content-header d-flex flex-column flex-md-row gap-3 mb-3 justify-content-between align-items-md-center flex-wrap">
                    <Block name={"title"}>
                        {title !== false && (
                            React.isValidElement(title) ? (
                                title
                            ) : (
                                <h2><T>{title ?? results?.title}</T></h2>
                            )
                        )}
                    </Block>
                    <div className={"d-flex align-items-center flex-wrap gap-2"}>
                        <Block name={"actions"}>
                            {listActions.length > 0 && (
                                <div className="btn-group">
                                    {listActions.map((item, index) => (
                                        <ActionLink
                                            key={index}
                                            action={{...actionRequest, action: item}}
                                            className="btn btn-outline-secondary"
                                        />
                                    ))}
                                </div>
                            )}
                        </Block>
                        {results?.form?.filter?.view && (
                            <Block name={"filter"}>
                                <div className={"btn-group"}>
                                    <Dropdown autoClose={"outside"}>
                                        <DropdownButton className={"btn dropdown-toggle btn-outline-dark"}>
                                            <T>Filter</T>
                                        </DropdownButton>
                                        <DropdownContent position={"end"}>
                                            <div className="filter">
                                                <Form
                                                    id={"filter_" + nameToId(entity)}
                                                    ref={filterFormRef}
                                                    onSubmit={(formData: FormData) => handleAction({
                                                        ...actionRequest,
                                                        query: objectRemoveEmpty(convertFormDataToObject(formData))
                                                    })}
                                                    onReset={() => handleAction({
                                                        ...actionRequest,
                                                        query: undefined
                                                    })}
                                                >
                                                    {
                                                        results?.form?.filter && (
                                                            <FormViewProvider view={results.form.filter.view}>
                                                                <FormGroupViewLoader/>
                                                            </FormViewProvider>
                                                        )
                                                    }
                                                    <div className={"d-flex gap-2"}>
                                                        <button className={"btn btn-primary"} type={"submit"}>
                                                            <T>Apply Filters</T>
                                                        </button>
                                                        <button className={"btn"} type={"reset"}>
                                                            <T>Clear</T>
                                                        </button>
                                                    </div>
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
                            </Block>
                        )}
                    </div>
                </header>
            </Block>
            <Block name={"filters"}>
                <FiltersView
                    formView={results.form.filter.view}
                    onClick={(key) => filterData({excludeFilterParameters: [key]})}
                />
            </Block>
            <BatchActionsProvider onClick={handleBatchAction}>
                <BatchActionSelector/>
                <Block name={"content"}>
                    <DynamicView key={"list"} prefix={"list"} view={"content"}>
                        <GridView
                            routeParams={actionRequest.parameters}
                        />
                        {/*<ListView*/}
                        {/*    // item={<CustomUserItem/>}*/}
                        {/*    routeParams={action.parameters}/>*/}

                    </DynamicView>
                    <DynamicView key={"paginator"} prefix={"list"} view={"paginator"}>
                        <Paginator/>
                    </DynamicView>
                </Block>
            </BatchActionsProvider>
        </section>
    );
}, {name: 'list'});


export {List as default, ListInner, WithListProvider};
