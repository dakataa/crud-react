import {FormViewType} from "@src/type/FormViewType.tsx";
import React from "react";
import {UseFormView} from "@src/component/crud/form/Form.tsx";

const FiltersView = ({formView, onClick}: {formView: FormViewType, onClick: (key: string) => void }) => {
    const getValue = (view: FormViewType) => {
        if (view.choices !== undefined) {
            return (view.choices ? Object.values(view.data instanceof Object ? view.data : [view.data]).map((k: any) => view.choices?.[k]?.label ?? k).join(', ') : view.data);
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
                    <small className="mb-2">{item.label}</small>
                    <div className="btn btn-sm btn-primary me-1 mb-1">
                        {getValue(item)}
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
