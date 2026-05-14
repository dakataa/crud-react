import Link from "@src/component/Link.tsx";
import {UseList} from "@src/context/ListContext.tsx";
import {UseCurrentAction} from "@src/component/crud/CrudLoader.tsx";
import {UseActions} from "@src/context/ActionContext.tsx";
import React from "react";
import Translation from "@src/component/Translation.tsx";

const PageItem = ({page, active = false, title, children}: {
    page: number | string,
    active?: boolean,
    title?: string,
    children?: any
}) => {
    const {generateActionLink} = UseActions();
    const {onClick} = UseList();
    const {action} = UseCurrentAction();
    const pageAction = {
        ...action,
        query: {
            ...action.query || {},
            page: page.toString()
        }
    };

    const url = generateActionLink(pageAction);

    return (
        <li className={`page-item ${active ? 'active' : ''}`}>
            <Link
                to={url.toString()}
                {...(onClick && {
                    onClick: (e) => {
                        onClick(pageAction, e);
                    }
                })}

                className="page-link"
                title={title}
            >
                {children || page}
            </Link>
        </li>
    )
}

const Paginator = () => {
    const {data} = UseList();
    const meta = data?.entity?.data.meta;
    const firstPage = 1;
    const totalPages = meta?.totalPages || 0;
    const totalResults = meta?.totalResults || 0;
    const page = meta?.page || firstPage;
    const link = meta?.links;
    const hasPagination = totalPages > 1;

    return (
        <div className="d-flex flex-row flex-wrap flex-md-row justify-content-center align-items-center gap-3 py-2">
            <small>
                <Translation translationKey={"PaginationResults"} properties={{count: totalResults}}>
                    {totalResults} Results
                </Translation>
            </small>
            {hasPagination &&
				<>
                    <nav aria-label="Page navigation">
                        <ul className="pagination mb-0">
                            {page > firstPage && (
                                <PageItem page={page - 1} title="Previous">
                                    ‹
                                </PageItem>
                            )}
                            {link && link[0] > firstPage && (
                                <>
                                    <PageItem key={1} page={1} active={firstPage === page}/>
                                    {page > 3 && (
                                        <div className={"page-item"}>
                                            <span className="page-link">...</span>
                                        </div>
                                    )}
                                </>
                            )}
                            {(link || []).map((p, i) => (
                                <PageItem key={p} page={p} active={p === page}/>
                            ))}
                            {[...meta.links].reverse()[0] !== totalPages && (
                                <>
                                    <div className={"page-item"}>
                                        <span className="page-link">...</span>
                                    </div>
                                    <PageItem key={totalPages} page={totalPages}
                                              active={totalPages === page}/>
                                </>
                            )}
                            {page < totalPages && (
                                <PageItem key={"last"} page={page + 1} title="Go to Next Page">
                                    ›
                                </PageItem>
                            )}
						</ul>
					</nav>
				</>
            }
            <select className="form-select form-select-sm w-auto">
                <option>10 / стр.</option>
                <option>25 / стр.</option>
                <option>50 / стр.</option>
            </select>
        </div>
    )
}

export default Paginator;
