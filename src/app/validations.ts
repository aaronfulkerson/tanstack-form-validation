import { formOptions } from "@tanstack/react-form";
import { createServerValidate } from "@tanstack/react-form/nextjs";

export const formOpts = formOptions({
  defaultValues: { email: "", password: "" },
});

export const validate = createServerValidate({
  ...formOpts,
  onServerValidate: async ({ value }) => {
    try {
      if (value.email !== "test@test.net") throw Error("Wrong email.");
      if (value.password !== "Test123!") throw Error("Wrong password.");
    } catch (e) {
      if (e instanceof Error) {
        return { message: e.message };
      }
    }
  },
});
