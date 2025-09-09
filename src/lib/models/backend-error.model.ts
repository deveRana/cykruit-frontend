export interface BackendError {
    field?: string;         // input field name (optional)
    message: string;        // error message to show
    code?: string | number; // optional backend error code
}

export interface BackendResponseError {
    message: string | string[] | Record<string, any>;
    statusCode: number;
    error?: string;
}
