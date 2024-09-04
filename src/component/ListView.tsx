import React, {memo, useEffect, useRef, useState} from "react";
import {convertFormDataToObject, convertObjectToURLSearchParams, default as Requester, Method} from 'requester';
import GridTableView, {OnClickAction} from "@src/component/crud/GridTableView";
import PaginatorView from "@src/component/crud/PaginatorView";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {Form, FormRef} from "@src/component/form/Form";
import Dropdown, {DropdownButton, DropdownContent} from "@src/component/Dropdown";
import Button from "@src/component/Button";
import {generateRoute} from "@src/helper/RouterUtils.tsx";
import FormView from "@src/component/crud/FormView";
import {objectRemoveEmpty} from "@src/helper/ObjectUtils";
import DynamicView from "@src/component/crud/DynamicView.tsx";
import {UseActions} from "@src/context/ActionContext.tsx";
import GetData, {GetDataType} from "@src/component/hooks/GetData.tsx";
import {ListType} from "@src/type/ListType.tsx";
import {ActionType} from "@src/type/ActionType.tsx";
import TemplateExtend from "@src/component/TemplateExtend.tsx";
import Modal from "@src/component/Modal.tsx";
import {default as T} from "@src/component/Translation.tsx";

const ListView = memo(() => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const sort = useRef<{ [key: string]: any } | undefined>();
    const filter = useRef<{ [key: string]: any } | undefined>();
    const navigate = useNavigate();
    const filterFormRef = useRef<FormRef | null>(null);
    const [redirectTo, setRedirectTo] = useState<string>();
    const [onClickAction, setOnClickAction] = useState<OnClickAction | null>(null)

    const {getActionByPath} = UseActions();
    const action = getActionByPath(document.location.pathname);
    const entity = action?.entity;

    if(!action) {
        throw new Error('Invalid Action');
    }

    if(!entity) {
        throw new Error('Invalid Entity');
    }

    const {results, refresh, setQueryParameters}: GetDataType & {
        results: ListType | null;
    } = GetData({entityAction: action, initQueryParameters: searchParams});
    const actions = Object.values(results?.action ?? []) as ActionType[];

    const closeModal = () => {
        setOnClickAction(null);
        refresh();
    };

    const deleteAction = () => {
        if (onClickAction?.action.name !== 'delete') {
            return;
        }

        (new Requester).fetch({
            url: generateRoute(onClickAction.action.route, onClickAction.parameters),
            method: Method.DELETE
        }).then(() => {
            closeModal();
        }).catch((e) => {
            console.log('error', e);
        }).finally(() => {
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
                return setOnClickAction(onClickAction);
            }
            default: {
                return;
            }
        }

        const query = {
            ...(filter.current && filter.current),
            ...(sort.current && {sort: sort.current}),
        };

        const searchQuery = convertObjectToURLSearchParams(objectRemoveEmpty(query));
        setSearchParams(searchQuery);

    }

    useEffect(() => {
        setQueryParameters(searchParams);
    }, [location]);

    useEffect(() => {
        if (redirectTo) {
            navigate(redirectTo)
        }
    }, [redirectTo]);

    return (
        <>
            <div className={"list"}>
                <div className="content-header d-md-flex mb-3 justify-content-between align-items-center">
                    <h2>
                        {results?.title}
                    </h2>
                    <div>
                        {actions && (
                            <div className="btn-group btn-group-sm me-2">
                                {actions.filter(a => !a.object).map((action, index) => (
                                    <Link key={index} to={generateRoute(action.route)}
                                          className="btn btn-outline-secondary">
                                        {action.title || action.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                        <div className={"btn-group btn-group-sm"}>
                            <Dropdown className={"btn-group btn-group-sm"}>
                                <DropdownButton className={"btn-outline-dark"}>Filter</DropdownButton>
                                <DropdownContent>
                                    <div className="filter">
                                        <Form
                                            ref={filterFormRef}
                                            onSubmit={(formData: FormData) => handleAction({
                                                action: {
                                                    name: 'filter',
                                                    object: false,
                                                    namespace: action?.namespace,
                                                    entity: entity
                                                }, parameters: convertFormDataToObject(formData)
                                            })}
                                            onReset={() => handleAction({
                                                action: {
                                                    name: 'filter',
                                                    object: false,
                                                    namespace: action?.namespace,
                                                    entity: entity
                                                }
                                            })}
                                        >
                                            {
                                                results?.form?.filter && (
                                                    <FormView view={results.form.filter.view}/>
                                                )
                                            }
                                            <button className={"btn btn-primary me-2"} type={"submit"}>Submit</button>
                                        </Form>
                                    </div>
                                </DropdownContent>
                            </Dropdown>
                            {filter.current && (
                                <Button onClick={() => {
                                    filterFormRef.current?.reset();
                                }} className="btn btn-outline-dark">x</Button>
                            )}
                        </div>
                    </div>
                </div>

                <DynamicView namespace={action?.namespace || 'unknown'} key={"modify"} prefix={"modify"}
                             view={"content"} data={results}>
                    <div className={"table-responsive"}>
                        <GridTableView data={results} onClick={handleAction} namespace={action?.namespace}/>
                    </div>
                    {results && <PaginatorView meta={results.entity.data.meta}/>}
                </DynamicView>
            </div>
            <Modal open={onClickAction?.action.name === "delete"} onClose={() => setOnClickAction(null)}
                   fade={true} backdrop={true}>
                <TemplateExtend name={"title"}>
                    <T>{onClickAction?.action.title}</T>
                </TemplateExtend>
                <T>Are you sure?</T>

                <TemplateExtend name={"footer"}>
                    <div className={"d-flex justify-content-between w-100"}>
                        <button className={"btn btn-secondary"} type="button" onClick={closeModal}><T>Cancel</T>
                        </button>
                        <button type="button" onClick={deleteAction} className="btn btn-primary">
                            <T>Confirm</T>
                        </button>
                    </div>
                </TemplateExtend>
            </Modal>
        </>


    );
})

export default ListView;
