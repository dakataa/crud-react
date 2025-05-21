import {ListMetaType} from "@src/type/ListMetaType";
import {RouteType} from "@src/type/RouteType";
import Link from "@src/component/Link.tsx";
import {UseList} from "@src/context/ListContext.tsx";

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

const Paginator = () => {
    const {data} = UseList();
    const meta = data?.entity?.data.meta;
    const firstPage = 1;
    const totalPages = meta?.totalPages;
    const page = meta?.page || firstPage;
    const link = meta?.links;
    const hasPagination = !!meta?.totalPages;

    return hasPagination && (
        <div className="d-flex flex-column justiry-content-center">
            <small className="mb-2">
                {meta.totalResults} Results
                {hasPagination && (<> - Page {page} of {meta.totalPages}</>)}
            </small>
            {hasPagination &&
				<nav aria-label="Page navigation" className="m-auto text-center d-inline">
					<ul className="pagination pagination-sm">
                        {page > firstPage && (
                            <PageItem page={page - 1} title="Go to First Page">
                                {'\u00ab'}
                            </PageItem>
                        )}
                        {meta.links[0] !== firstPage && (
                            <>
                                <PageItem key={1} page={1} active={firstPage === page}/>
                                <div className={"page-item"}>
                                    <a className="page-link">...</a>
                                </div>
                            </>
                        )}
                        {(link || []).map((p, i) => (
                            <PageItem key={i} page={p} active={p === page}/>
                        ))}
                        {[...meta.links].reverse()[0] !== totalPages && (
                            <>
                                <div className={"page-item"}>
                                    <a className="page-link">...</a>
                                </div>
                                <PageItem key={totalPages} page={totalPages}
                                          active={totalPages === page}/>
                            </>
                        )}
                        {page < totalPages && (
                            <PageItem page={meta.totalPages} title="Go to Last Page">
                                {'\u00bb'}
                            </PageItem>
                        )}
					</ul>
				</nav>
            }
        </div>
    )
}

export default Paginator;
