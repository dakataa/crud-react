import React, {memo, useEffect, useRef, useState} from "react";
import {convertFormDataToObject, convertObjectToURLSearchParams, convertURLSearchParamsToObject} from 'requester';
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
import {useActions} from "@src/context/ActionContext.tsx";
import GetData, {GetDataType} from "@src/component/hooks/GetData.tsx";
import {ListType} from "@src/type/ListType.tsx";
import {ActionType} from "@src/type/ActionType.tsx";

const ListView = memo(() => {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const sort = useRef<{ [key: string]: any } | undefined>();
    const filter = useRef<{ [key: string]: any } | undefined>();
    const navigate = useNavigate();
    const filterFormRef = useRef<FormRef | null>(null);
    const [redirectTo, setRedirectTo] = useState<string>();

    const {getActionByPath, getAction} = useActions();
    const action = getActionByPath(document.location.pathname);
    const entity = action?.entity || 'unknown';
    const filterAction = getAction(entity, 'filter', action?.namespace);

    const {results, setQueryParameters}: GetDataType & {
        results: ListType | null;
    } = GetData({entityAction: action, initQueryParameters: convertURLSearchParamsToObject(searchParams)});
    const actions = Object.values(results?.action ?? []) as ActionType[];


    const handleAction = ({action, parameters}: OnClickAction, event?: React.MouseEvent) => {
        if (parameters !== undefined) {
            parameters = objectRemoveEmpty(parameters as object);
            if (!Object.keys(parameters as object).length) {
                parameters = undefined;
            }
        }

        switch (action.name) {
            case 'filter': {
                filter.current = parameters;
                event?.preventDefault();
                break;
            }
            case 'sort': {
                sort.current = parameters;
                event?.preventDefault();
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
                                                object: false
                                            }, parameters: convertFormDataToObject(formData)
                                        })}
                                        onReset={() => handleAction({
                                            action: {
                                                name: 'reset',
                                                object: false
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

            <DynamicView namespace={action?.namespace || 'unknown'} key={"modify"} prefix={"modify"} view={"content"} data={results}>
                <div className={"table-responsive"}>
                    <GridTableView onClick={handleAction} data={results}/>
                </div>
                {results && <PaginatorView meta={results.entity.data.meta}/>}
            </DynamicView>

        </div>
    );
})

export default ListView;
