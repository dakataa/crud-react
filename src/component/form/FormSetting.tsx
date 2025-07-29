import React, {PropsWithChildren} from "react";

type FormSettingContextType = {
    size?: 'lg' | 'sm';
    extraClassName?: string;
    className?: string;
    label?: string;
    placeholder?: string;
};

const FormSettingContext = React.createContext<FormSettingContextType | undefined>(undefined);

const UseFormSettings = () => {
    return React.useContext(FormSettingContext);
};

const FormSetting = ({children, ...props}: FormSettingContextType & PropsWithChildren) => {
    return (
        <FormSettingContext.Provider value={props}>
            {children}
        </FormSettingContext.Provider>
    )
}


export {FormSetting, UseFormSettings};
