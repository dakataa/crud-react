import React, {memo, useEffect, useRef, useState} from "react";
import Navigation, {NavigationItem, NavigationItemContextType} from "@crud-react/component/crud/Navigation.tsx";
import Base from "@crud-react/layout/default/Base.tsx";
import {CrudRequester} from "@crud-react/Crud.tsx";
import Link from "@crud-react/component/Link.tsx";
import Dropdown from "@crud-react/component/Dropdown.tsx";

const Main = ({children, ...props}: {
    children?: any
}) => {
    const mainMenuRef = useRef<NavigationItemContextType | null>(null);
    const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);

    useEffect(() => {
        CrudRequester().get({
            url: '/_crud/navigation'
        }).then(({status, data}) => {
            if (status !== 200) {
                return;
            }

            setNavigationItems(data);
        })
    }, []);

    return (
        <Base>
            <header>
                <div className={"wrap"}>
                    <button onClick={(e) => mainMenuRef.current?.toggle()} className={"btn btn-mobile"}>
                        <i></i>
                    </button>
                    <nav className="first-nav">
                        <Link className="logo" to="/">Admin</Link>
                    </nav>
                    <nav className="second-nav">
                        <Dropdown className={"user"}>
                            <span className="initials">YL</span>
                            <Link to={"#"}>
                                Yordan Lazarov
                            </Link>
                            <Link to={"#"}>
                               Logout
                            </Link>
                        </Dropdown>
                    </nav>
                </div>
            </header>
            <main>
                {!!navigationItems.length && (
                    <div className={"navigation d-print-none"}>
                        <Navigation ref={mainMenuRef} items={navigationItems}/>
                    </div>
                )}
                <div className={"content"}>
                    {children}
                </div>
            </main>
        </Base>
    );
}

export default Main;
