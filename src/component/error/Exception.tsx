import {ExceptionTraceType} from "@src/component/error/HttpException.tsx";

class Exception {
    code: number;

    detail: string;

    trace?: ExceptionTraceType[];

    constructor(code: number = 0, detail: string, trace?: ExceptionTraceType[]) {
        this.code = code;
        this.detail = detail;
        this.trace = trace;
    }
}

export default Exception;
