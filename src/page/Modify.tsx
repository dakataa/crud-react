import React, {useEffect, useRef, useState} from "react";
import {Link, matchRoutes, useLocation, useNavigate, useParams} from "react-router-dom";
import Requester from "requester";
import {ModifyType} from "@src/type/ModifyType";
import {Form, FormRef} from "@src/component/form/Form";
import FormView from "@src/component/crud/FormView";
import {FormViewType} from "@src/type/FormViewType";
import Button from "@src/component/Button";
import {generateRoute} from "@src/component/Router";

const Modify = () => {
    const location = useLocation();
    const [data, setData] = useState<ModifyType>();
    const [preload, setPreloader] = useState(false);
    const navigate = useNavigate();
    const formRef = useRef<FormRef>(null);

    useEffect(() => {
        (new Requester()).get(location.pathname, {}).then((response) => {
            if (response.status === 200) {
                response.getData().then(v => setData(v));
            }

        }).catch((e) => {
            console.log('error', e);
        }).finally(() => {

        });
    }, [location]);


    const onSubmit = (formData: FormData) => {
        setPreloader(true);
        (new Requester()).post(location.pathname, formData).then((response) => response.getData()).then(data => {

            if(data.redirect) {
                navigate(generateRoute(data.redirect.route, data.redirect.parameters));
            }

            const getFormErrors = (view: FormViewType): { [key: string]: any } => {
                let result: { [key: string]: any } = {};
                for (let [, value] of Object.entries(view?.children || [])) {
                    if (Object.values(value?.children || []).length) {
                        result = {...result, ...getFormErrors(value)};
                    } else if (value.errors?.length) {
                        result[value.full_name] = value.errors;
                    }
                }

                return result;
            };

            formRef.current?.setErrors(getFormErrors(data.form.modify.view));

            setData(data);

        }).catch((e: any) => {
            console.log('error', e);
        }).finally(() => {
            setPreloader(false);
        });
    }

    return (
        <section className="edit-items">
            <header>
                <div className="wrap">
                    <h2 className="title">
                        <Link to={"#"}>&larr;</Link>
                        {data?.title || 'Title'}
                    </h2>
                    <nav className="nav">
                    </nav>
                </div>
            </header>

            <main className="tabs">
                <div className="wrap">
                    {Object.keys(data?.messages || {}).map((messageType) => (
                        <div className={['alert', 'alert-' + messageType].join(' ')}>{(data?.messages[messageType] || ['Item was saved successful.']).join(' ')}</div>
                    ))}
                    <Form ref={formRef} action={location.pathname} method={"POST"} onSubmit={onSubmit}>
                        <div className="tab-content">
                            <div id="edit" className="tab tab-pane active in">
                                {
                                    data?.form?.modify && (
                                        <FormView view={data.form.modify.view}/>
                                    )
                                }
                            </div>
                        </div>
                        <div className="actions">
                            <Button className="btn btn-primary btn-save" preload={preload} type="submit">Save</Button>
                        </div>
                    </Form>
                </div>
            </main>
        </section>
    );
}

export default Modify;
