export type RouteType = {
    path: string;
    defaults?: {[key:string]: string};
    methods?: string[];
}
