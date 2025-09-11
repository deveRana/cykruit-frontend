import { BackendError, BackendResponseError } from "../models/backend-error.model";

interface ErrorWithResponse {
    response?: {
        data?: BackendResponseError;
    };
}

export function normalizeBackendError(error: unknown): BackendError[] {
    const err = error as ErrorWithResponse;

    if (!err.response?.data) {
        return [{ message: "Something went wrong" }];
    }

    const data = err.response.data;
    let errors: BackendError[] = [];

    if (Array.isArray(data.message)) {
        errors = data.message.map((msg) => ({ message: msg }));
    } else if (typeof data.message === "string") {
        errors = [{ message: data.message }];
    } else if (typeof data.message === "object" && data.message !== null) {
        for (const key in data.message) {
            const value = (data.message as Record<string, unknown>)[key];
            if (Array.isArray(value)) {
                value.forEach((msg) =>
                    errors.push({ field: key, message: String(msg) })
                );
            } else {
                errors.push({ field: key, message: String(value) });
            }
        }
    } else {
        errors = [{ message: "Unknown error occurred" }];
    }

    return errors;
}
