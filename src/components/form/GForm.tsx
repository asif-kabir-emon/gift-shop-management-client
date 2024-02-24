import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
} from "react-hook-form";

type GFormProps = {
    onSubmit: SubmitHandler<FieldValues>;
    children: React.ReactNode;
};

const GForm = ({ onSubmit, children }: GFormProps) => {
    const methods = useForm();

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
        </FormProvider>
    );
};

export default GForm;
