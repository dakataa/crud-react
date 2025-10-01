import {ChoiceType, FormViewType} from "@src/type/FormViewType.tsx";
import React from "react";
import T from "@src/component/Translation.tsx";

const FiltersView = ({formView, onClick}: {formView: FormViewType, onClick: (key: string) => void }) => {
    const getValue = (view: FormViewType) => {
        if (view.choices !== undefined) {
            const choices = view.choices?.reduce<ChoiceType[]>((result, c) => ([...result, ...(c.choices || [c])]), []).reduce<{[key: string]: string}>((result, choice) => {
                const choiceValue = choice.value instanceof Function ? choice.value(choice) : choice.value;
                const choiceLabel = choice.label instanceof Function ? choice.label(choice) : choice.label
                return ({...result, [choiceValue]: choiceLabel})
            }, {});

            return (view.choices ? Object.values(view.data instanceof Object ? view.data : [view.data]).map((k: any) => choices[k] ?? k).join(', ') : view.data);
        } else if (view.checked !== undefined) {
            return view.checked ? 'Yes' : 'No';
        }

        return view.data;
    }

    const appliedFilters = Object.values<FormViewType>(formView.children || []).filter(item => item.data !== null);

    return !!appliedFilters.length && (
        <div className={"filters d-flex mb-sm overflow-auto"}>
            {appliedFilters.filter(item => item.data !== null).map((item, index) => (
                <div key={index} className="filters-item d-flex text-nowrap flex-column me-2 mb-2">
                    <small className="mb-2">
                        <T>{item.label}</T>
                    </small>
                    <div className="btn btn-sm btn-primary me-1 mb-1">
                        <T>{getValue(item)}</T>
                        {onClick && (
                            <span onClick={() => onClick(item.name as string)} className={"ms-2"}>
                                &times;
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default FiltersView;
