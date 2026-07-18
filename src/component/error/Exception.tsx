import {ExceptionTraceType} from "@crud-react/component/error/HttpException.tsx";

class Exception {


    detail: string;

    code: number;

    trace?: ExceptionTraceType[];

    name?: string;

    constructor(code: number = 0, detail: string, trace?: ExceptionTraceType[], name?: string) {
        this.code = code;
        this.detail = detail;
        this.trace = trace;
        this.name = name;
    }
}

export default Exception;
