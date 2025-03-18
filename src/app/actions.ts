"use server";

import { ServerValidateError } from "@tanstack/react-form/nextjs";
import { validate } from "./validations";

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function login(prev: unknown, formData: FormData) {
  try {
    await sleep(3000);
    await validate(formData);
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState;
    }
  }
}
