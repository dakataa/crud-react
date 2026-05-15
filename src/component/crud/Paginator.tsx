import Link from "@src/component/Link.tsx";
import {UseList} from "@src/context/ListContext.tsx";
import {UseCurrentAction} from "@src/component/crud/CrudLoader.tsx";
import {UseActions} from "@src/context/ActionContext.tsx";
import React, {ChangeEvent} from "react";
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
    const {data, onClick} = UseList();
    const {action} = UseCurrentAction();

    const meta = data?.entity?.data.meta;
    const firstPage = 1;
    const totalPages = meta?.totalPages || 0;
    const totalResults = meta?.totalResults || 0;
    const page = meta?.page || firstPage;
    const links = meta?.links;
    const hasResults = totalResults > 0;
    const hasPagination = totalPages > 1;
    const maxResults = meta?.maxResults || 10;

    const maxResultChoices = [10, 25, 50];
    if (!maxResultChoices.includes(maxResults)) {
        maxResultChoices.push(maxResults)
    }

    const displayPaginator = totalResults > Math.min(...maxResultChoices);

    return displayPaginator && (
        <div className="d-flex flex-row flex-wrap flex-md-row justify-content-center align-items-center gap-3 py-2">
            <small>
                <Translation translationKey={"PaginationResults"} properties={{count: totalResults}}>
                    {totalResults.toString()} Results
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
                            {links && links[0] > firstPage && (
                                <>
                                    <PageItem key={1} page={1} active={firstPage === page}/>
                                    {page > 3 && (
                                        <div className={"page-item"}>
                                            <span className="page-link">...</span>
                                        </div>
                                    )}
                                </>
                            )}
                            {(links || []).map((p, i) => (
                                <PageItem key={p} page={p} active={p === page}/>
                            ))}
                            {[...(links || [])].reverse()[0] !== totalPages && (
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
            {totalResults > Math.min(...maxResultChoices) && (
                <select onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    onClick?.({
                        ...action,
                        query: {
                            ...action.query || {},
                            limit: e.currentTarget.value
                        }
                    }, e);
                }} className="form-select form-select-sm w-auto">
                    {maxResultChoices.map((choiceMaxResults, index) => (
                        <option key={index} value={choiceMaxResults} defaultChecked={choiceMaxResults === maxResults}>
                            {choiceMaxResults} / стр.
                        </option>
                    ))}
                </select>
            )}
        </div>
    )
}

export default Paginator;
