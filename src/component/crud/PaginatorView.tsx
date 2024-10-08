import {Link, useSearchParams} from "react-router-dom";
import {ListMetaType} from "@src/type/ListMetaType";
import {RouteType} from "@src/type/RouteType";

const PageItem = ({route, page, active = false, title, children}: {
    route?: RouteType,
    page: number | string,
    active?: boolean,
    title?: string,
    children?: any
}) => {
    const url = new URL(document.location.href);
    url.searchParams.set('page', page.toString());

    return (
        <li className={`page-item ${active ? 'active' : ''}`}>
            <Link
                to={url.toString()}
                className="page-link"
                title={title}>
                {children || page}
            </Link>
        </li>
    )
}

const Paginator = ({meta}: {meta: ListMetaType, route?: RouteType}) => {
    const page = meta.page || 1;
    return (
        <div className="d-flex flex-column justiry-content-center">
            <small className="mb-2">{meta.totalResults} - Page {page} of {meta.totalPages}</small>
            {meta.totalPages > 1 &&
                <nav aria-label="Page navigation" className="m-auto text-center d-inline">
                    <ul className="pagination pagination-sm">
                        <PageItem page={1} title="Go to First Page">
                            {'\u00ab'}
                        </PageItem>
                        {(meta.links || []).map((p, i) => (
                            <PageItem key={i} page={p} active={p === page}/>
                        ))}
                        <PageItem page={meta.totalPages} title="Go to Last Page">
                            {'\u00bb'}
                        </PageItem>
                    </ul>
                </nav>
            }
        </div>
    )
}

export default Paginator;
