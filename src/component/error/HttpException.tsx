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

const httpErrorStatuses: { [key: number]: { group: number, name: string, description: string } } = {
    400: {group: 400, name: 'Bad Request', description: 'The request is invalid or malformed.'},
    401: {group: 400, name: 'Unauthorized', description: 'Authentication is required or has failed.'},
    402: {group: 400, name: 'Payment Required', description: 'Reserved for future payment-related use.'},
    403: {group: 400, name: 'Forbidden', description: 'The server understood the request but refuses to authorize it.'},
    404: {group: 400, name: 'Not Found', description: 'The requested resource was not found.'},
    405: {group: 400, name: 'Method Not Allowed', description: 'The HTTP method is not allowed for this resource.'},
    406: {
        group: 400,
        name: 'Not Acceptable',
        description: 'The resource cannot produce a response matching the client requirements.'
    },
    407: {group: 400, name: 'Proxy Authentication Required', description: 'Authentication with a proxy is required.'},
    408: {group: 400, name: 'Request Timeout', description: 'The server timed out waiting for the request.'},
    409: {group: 400, name: 'Conflict', description: 'The request conflicts with the current state of the resource.'},
    410: {group: 400, name: 'Gone', description: 'The resource is no longer available.'},
    411: {group: 400, name: 'Length Required', description: 'The request must include a valid Content-Length header.'},
    412: {group: 400, name: 'Precondition Failed', description: 'A request precondition failed.'},
    413: {
        group: 400,
        name: 'Content Too Large',
        description: 'The request body is larger than the server is willing to process.'
    },
    414: {
        group: 400,
        name: 'URI Too Long',
        description: 'The request URI is longer than the server is willing to interpret.'
    },
    415: {group: 400, name: 'Unsupported Media Type', description: 'The request media type is not supported.'},
    416: {group: 400, name: 'Range Not Satisfiable', description: 'The requested range cannot be satisfied.'},
    417: {group: 400, name: 'Expectation Failed', description: 'The expectation in the Expect header cannot be met.'},
    418: {group: 400, name: 'Unused', description: 'Unused status code.'},
    421: {
        group: 400,
        name: 'Misdirected Request',
        description: 'The request was directed at a server that cannot produce a response.'
    },
    422: {
        group: 400,
        name: 'Unprocessable Content',
        description: 'The request content is syntactically valid but semantically invalid.'
    },
    423: {group: 400, name: 'Locked', description: 'The resource is locked.'},
    424: {
        group: 400,
        name: 'Failed Dependency',
        description: 'The request failed because it depended on another failed request.'
    },
    425: {
        group: 400,
        name: 'Too Early',
        description: 'The server is unwilling to risk processing a request that might be replayed.'
    },
    426: {group: 400, name: 'Upgrade Required', description: 'The client must switch to a different protocol.'},
    428: {group: 400, name: 'Precondition Required', description: 'The server requires the request to be conditional.'},
    429: {
        group: 400,
        name: 'Too Many Requests',
        description: 'The client has sent too many requests in a given time period.'
    },
    431: {group: 400, name: 'Request Header Fields Too Large', description: 'The request headers are too large.'},
    451: {
        group: 400,
        name: 'Unavailable For Legal Reasons',
        description: 'The resource is unavailable for legal reasons.'
    },

    500: {group: 500, name: 'Internal Server Error', description: 'The server encountered an unexpected condition.'},
    501: {
        group: 500,
        name: 'Not Implemented',
        description: 'The server does not support the functionality required to fulfill the request.'
    },
    502: {
        group: 500,
        name: 'Bad Gateway',
        description: 'The server received an invalid response from an upstream server.'
    },
    503: {
        group: 500,
        name: 'Service Unavailable',
        description: 'The server is temporarily unable to handle the request.'
    },
    504: {
        group: 500,
        name: 'Gateway Timeout',
        description: 'The server did not receive a timely response from an upstream server.'
    },
    505: {
        group: 500,
        name: 'HTTP Version Not Supported',
        description: 'The server does not support the HTTP version used in the request.'
    },
    506: {
        group: 500,
        name: 'Variant Also Negotiates',
        description: 'The server has an internal content negotiation configuration error.'
    },
    507: {
        group: 500,
        name: 'Insufficient Storage',
        description: 'The server cannot store the representation needed to complete the request.'
    },
    508: {
        group: 500,
        name: 'Loop Detected',
        description: 'The server detected an infinite loop while processing the request.'
    },
    510: {
        group: 500,
        name: 'Not Extended',
        description: 'Obsoleted status code; further extensions to the request are required.'
    },
    511: {
        group: 500,
        name: 'Network Authentication Required',
        description: 'The client needs to authenticate to gain network access.'
    },
};

class HttpException extends Exception {
    status: number = 400;

    constructor(status: number, detail?: string, trace?: ExceptionTraceType[], name?: string) {

        super(0, (detail || httpErrorStatuses[status].description || 'Unknown error'),  trace, (name || httpErrorStatuses[status].name || undefined));
        this.status = status;
    }
}

export default HttpException;
