"use client";

import { useActionState } from "react";
import {
  mergeForm,
  useForm,
  useStore,
  useTransform,
} from "@tanstack/react-form";
import { initialFormState } from "@tanstack/react-form/nextjs";

import { login } from "./actions";
import { loginSchema } from "./schema";
import { formOpts } from "./validations";

export function LoginForm() {
  const [state, action] = useActionState(login, initialFormState);

  console.log("actionState: ", state);

  const form = useForm({
    ...formOpts,
    transform: useTransform((baseForm) => mergeForm(baseForm, state!), [state]),
    validators: {
      onSubmit: loginSchema,
    },
  });

  const formErrors = useStore(form.store, (formState) => formState.errors);

  console.log("formErrors: ", formErrors);

  return (
    <div className="p-5">
      <form
        action={action}
        className="flex flex-col gap-3"
        onSubmit={form.handleSubmit}
      >
        <form.Field name="email">
          {(field) => {
            const hasError =
              field.state.meta.errors && !!field.state.meta.errors.length;

            console.log(field.name, hasError, field.state.meta.errors);

            return (
              <>
                <input
                  className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-10 pl-3 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6"
                  onChange={(e) => field.handleChange(e.target.value)}
                  name="email"
                  placeholder="email"
                  type="email"
                  value={field.state.value}
                />
                {hasError && <span>{field.state.meta.errors[0]?.message}</span>}
              </>
            );
          }}
        </form.Field>
        <form.Field name="password">
          {(field) => {
            const hasError =
              field.state.meta.errors && !!field.state.meta.errors.length;

            console.log(field.name, hasError, field.state.meta.errors);

            return (
              <>
                <input
                  className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-10 pl-3 text-base outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 sm:pr-9 sm:text-sm/6"
                  onChange={(e) => field.handleChange(e.target.value)}
                  name="password"
                  placeholder="password"
                  type="password"
                  value={field.state.value}
                />
                {hasError && <span>{field.state.meta.errors[0]?.message}</span>}
              </>
            );
          }}
        </form.Field>
        <form.Subscribe
          selector={(formState) => [
            formState.canSubmit,
            formState.isSubmitting,
            formState.isTouched,
          ]}
        >
          {([canSubmit, isSubmitting, isTouched]) => {
            console.log("canSubmit: ", canSubmit);
            console.log("isSubmitting: ", isSubmitting);
            console.log("isTouched: ", isTouched);
            return (
              <button disabled={!canSubmit || isSubmitting} type="submit">
                submit
              </button>
            );
          }}
        </form.Subscribe>
      </form>
    </div>
  );
}
