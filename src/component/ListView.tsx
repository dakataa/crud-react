import React, {useEffect, useRef, useState} from "react";
import Requester, {
    convertFormDataToObject,
    convertObjectToURLSearchParams,
    convertURLSearchParamsToObject
} from 'requester';
import {ListType} from "@src/type/ListType";
import GridTableView, {OnClickAction} from "@src/component/crud/GridTableView";
import PaginatorView from "@src/component/crud/PaginatorView";
import {Link, useLocation, useMatch, useNavigate, useSearchParams} from "react-router-dom";
import {Form, FormRef} from "@src/component/form/Form";
import Dropdown, {DropdownButton, DropdownContent} from "@src/component/Dropdown";
import Button from "@src/component/Button";
import {generateRoute} from "@src/component/Router";
import FormView from "@src/component/crud/FormView";
import {objectRemoveEmpty} from "@src/helper/ObjectUtils";
import DynamicView from "@src/component/crud/DynamicView.tsx";

const ListView = () => {
    const location = useLocation();
    const [data, setData] = useState<ListType>();
    const sort = useRef<{ [key: string]: any } | undefined>();
    const filter = useRef<{ [key: string]: any } | undefined>();
    const actions = Object.values(data?.action || []);
    const navigate = useNavigate();
    const filterFormRef = useRef<FormRef>(null);
    const [redirectTo, setRedirectTo] = useState<string>();
    const [searchParams, setSearchParams] = useSearchParams();

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
        if (redirectTo) {
            navigate(redirectTo)
        }
    }, [redirectTo]);

    useEffect(() => {
        console.log('search1', Object.fromEntries(searchParams.entries()), convertURLSearchParamsToObject(searchParams));

        (new Requester()).get(location.pathname, searchParams).then((response) => {
            if (response.status === 200) {
                response.getData().then(v => setData(v));
            }
        }).catch((e) => {
            console.log('error', e);
        }).finally(() => {

        });
    }, [location]);

    return (
        <div className={"list"}>
            <div className="content-header d-md-flex mb-3 justify-content-between align-items-center">
                <h2>
                    {data?.title}
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
                                        onReset={() => handleAction({action: {name: 'filter', object: false}})}
                                    >
                                        {
                                            data?.form?.filter && (
                                                <FormView view={data.form.filter.view}/>
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

            <DynamicView prefix={"modify"} view={"content"}>
                <>
                    <div className={"table-responsive"}>
                        <GridTableView onClick={handleAction} data={data}/>
                    </div>
                    {data && <PaginatorView meta={data?.entity?.data.meta}/>}
                </>
            </DynamicView>

        </div>
    );
}

export default ListView;
