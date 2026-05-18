import {ChoiceType, FormViewType} from "@src/type/FormViewType.tsx";
import React from "react";
import T from "@src/component/Translation.tsx";
import {UseList} from "@src/context/ListContext.tsx";

const FiltersView = ({onClick}: {formView: FormViewType, onClick: (key: string) => void }) => {
    const {appliedFilters} = UseList();

    return !!appliedFilters.length && (
        <div className={"filters d-flex mb-sm overflow-auto"}>
            {appliedFilters.map((item, index) => (
                <div key={index} className="filters-item d-flex text-nowrap flex-column me-2 mb-2">
                    <small className="mb-2">
                        <T>{item.label}</T>
                    </small>
                    <div className="btn btn-sm btn-primary me-1 mb-1">
                        <T>{item.value}</T>
                        {onClick && (
                            <span onClick={() => onClick(item.formView.name as string)} className={"ms-2"}>
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
