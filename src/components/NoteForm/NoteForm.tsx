import css from "./NoteForm.module.css";

import { useId } from "react";

import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from "formik";

import * as Yup from "yup";

import { type NoteFormValues } from "../../types/note";

interface PropsNoteForm {
    onSubmit: (values: NoteFormValues) => void,
    onCancel: () => void
}

const initialValues: NoteFormValues = {
    title: "",
    content: "",
    tag: "Todo"
}

const NoteFormSchema = Yup.object().shape({
    title: Yup.string()
        .min(3)
        .max(50)
        .required(),
    content: Yup.string()
        .max(500),
    tag: Yup.string()
        .matches(/(Todo|Work|Personal|Meeting|Shopping)/)
        .required()
});

export default function NoteForm({ onSubmit, onCancel }: PropsNoteForm) {
    const formId = useId();
    
    const handleSubmit = (
        values: NoteFormValues,
        actions: FormikHelpers<NoteFormValues>
    ) => {
        onSubmit(values);
        actions.resetForm();
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={NoteFormSchema}
        >
            <Form className={css.form}>
            <div className={css.formGroup}>
                <label htmlFor={`${formId}-title`}>Title</label>
                <Field id={`${formId}-title`} type="text" name="title" className={css.input} />
                <ErrorMessage name="title" component="span" className={css.error} />
            </div>

            <div className={css.formGroup}>
                <label htmlFor={`${formId}-content`}>Content</label>
                <Field
                    as="textarea"
                    id={`${formId}-content`}
                    name="content"
                    rows={8}
                    className={css.textarea}
                />
                <ErrorMessage name="content" component="span" className={css.error} />
            </div>

            <div className={css.formGroup}>
                <label htmlFor={`${formId}-tag`}>Tag</label>
                <Field as="select" id={`${formId}-tag`} name="tag" className={css.select}>
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </Field>
                <ErrorMessage name="tag" component="span" className={css.error} />
            </div>

            <div className={css.actions}>
                <button
                    type="button"
                    className={css.cancelButton}
                    onClick={onCancel}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className={css.submitButton}
                >
                    Create note
                </button>
            </div>
            </Form>
        </Formik>
    );
}