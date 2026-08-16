import {UseList} from "@crud-react/context/ListContext.tsx";
import {UseCurrentActionRequest} from "@crud-react/component/crud/CrudLoader.tsx";
import React, {ChangeEvent} from "react";
import Translation from "@crud-react/component/Translation.tsx";
import ActionLink from "@crud-react/component/crud/ActionLink.tsx";

const PageItem = ({page, active = false, title, children, className}: {
    page: number | string,
    active?: boolean,
    title?: string,
    children?: any
    className?: string
}) => {
    const {onClick} = UseList();
    const {actionRequest} = UseCurrentActionRequest();
    const pageAction = {
        ...actionRequest,
        query: {
            ...actionRequest.query || {},
            page: page.toString()
        }
    };

    return (
        <li className={`page-item ${active ? 'active' : ''} ${className || ''}`}>
            <ActionLink
                action={pageAction}
                {...(onClick && {
                    onClick: (e) => {
                        onClick(pageAction, e);
                    }
                })}

                className="page-link"
                title={title}
            >
                {children || page}
            </ActionLink>
        </li>
    )
}

const Paginator = () => {
    const {data, onClick} = UseList();
    const {actionRequest} = UseCurrentActionRequest();

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
                                <PageItem page={page - 1} title="Previous" className={"page-previous"}>
                                    ‹
                                </PageItem>
                            )}
                            {links && links[0] > firstPage && (
                                <>
                                    <PageItem key={1} page={1} active={firstPage === page}/>
                                    {page > 3 && (
                                        <div className={"page-item"}>
                                            <span className="page-link page-more">...</span>
                                        </div>
                                    )}
                                </>
                            )}
                            {(links || []).map((p: number) => (
                                <PageItem key={p} page={p} active={p === page}/>
                            ))}
                            {[...(links || [])].reverse()[0] !== totalPages && (
                                <>
                                    <div className={"page-item page-more"}>
                                        <span className="page-link">...</span>
                                    </div>
                                    <PageItem
                                        key={totalPages}
                                        page={totalPages}
                                        active={totalPages === page}
                                    />
                                </>
                            )}
                            {page < totalPages && (
                                <PageItem key={"last"} page={page + 1} title="Go to Next Page" className={"page-next"}>
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
                        ...actionRequest,
                        query: {
                            ...actionRequest.query || {},
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
