import {ExceptionTraceType} from "@src/component/error/HttpException.tsx";

export type ExceptionType = {
    status: number;
    detail: string;
    trace?: ExceptionTraceType[]
}
