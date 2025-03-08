import Exception from "@src/component/error/Exception.tsx";

export type ExceptionTraceType = {
    type: string;
    file: string;
    class: string;
    args: string[];
    function: string;
    line: number;
    namespace: string;
    short_class: string;
};

class HttpException extends Exception {

    status: number = 400;

    constructor(status: number, detail: string, trace?: ExceptionTraceType[]) {
        super(0, detail, trace);
        this.status = status;
    }
}

export default HttpException;
