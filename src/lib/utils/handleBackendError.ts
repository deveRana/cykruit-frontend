import { BackendError, BackendResponseError } from "../models/backend-error.model";

export function normalizeBackendError(error: any): BackendError[] {
    if (!error?.response?.data) return [{ message: "Something went wrong" }];

    const data: BackendResponseError = error.response.data;
    let errors: BackendError[] = [];

    if (Array.isArray(data.message)) {
        // array of messages
        errors = data.message.map((msg) => ({ message: msg }));
    } else if (typeof data.message === "string") {
        errors = [{ message: data.message }];
    } else if (typeof data.message === "object") {
        // object with fields as keys
        for (const key in data.message) {
            const value = data.message[key];
            if (Array.isArray(value)) {
                value.forEach((msg) => errors.push({ field: key, message: msg }));
            } else {
                errors.push({ field: key, message: value as string });
            }
        }
    } else {
        errors = [{ message: "Unknown error occurred" }];
    }

    return errors;
}
