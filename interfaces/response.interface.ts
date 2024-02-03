export interface Response<T> {
    detail: {
        status: string;
        message: string;
    },
    result: {
        data: T
    }
}