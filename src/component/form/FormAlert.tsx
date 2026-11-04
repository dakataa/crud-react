import { useFormErrors } from "@crud-react/component/form/Form";
import Translation from "@crud-react/component/Translation.tsx";

export const FormAlert = ({ name = "global" }: { name?: string }) => {
    const errors = useFormErrors([name]);

    if (!errors.length) {
        return null;
    }

    return (
        <div className="alert alert-danger">
            {errors.map((error, index) => {
                return <Translation key={index}>{error.message}</Translation>;
            })}
        </div>
    );
};
