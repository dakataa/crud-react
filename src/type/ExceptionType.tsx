import {ExceptionTraceType} from "@crud-react/component/error/HttpException.tsx";

export type ExceptionType = {
    status: number;
    detail: string;
    trace?: ExceptionTraceType[]
}
