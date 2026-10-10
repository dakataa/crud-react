import { useFormErrors } from "@crud-react/component/form/Form";
import type { FormViewErrorType } from "@crud-react/type/FormViewType.tsx";
import Translation from "@crud-react/component/Translation.tsx";

const FormFieldError = ({ name, className }: { name: string | string[]; className?: string }) => {
    name = name instanceof Array ? name : [name];

    const errorMessages: FormViewErrorType[] = useFormErrors(name);

    if (!errorMessages.length) {
        return null;
    }

    return (
        <div className={className}>
            <ul className={"mb-0"}>
                {errorMessages.map((error: FormViewErrorType, i: number) => {
                    return (
                        <li key={i}>
                            <Translation>{error.message}</Translation>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default FormFieldError;
