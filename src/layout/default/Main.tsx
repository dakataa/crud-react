import React, {memo, useEffect, useRef, useState} from "react";
import Navigation, {MenuItem, NavigationItemContextType} from "@src/layout/default/component/Navigation.tsx";
import Dropdown from "@src/component/Dropdown";
import Link from "@src/component/Link";
import {Outlet} from "react-router";
import Base from "@src/layout/default/Base.tsx";
import {CrudRequester} from "@src/Crud.tsx";

const Main = memo(({children}: {
    children?: any
}) => {
    const mainMenuRef = useRef<NavigationItemContextType | null>(null);
    const [navigationItems, setNavigationItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        CrudRequester().get('/_crud/navigation', {}).then((response) => {
            if (response.status !== 200) {
                return;
            }

            response.getData().then((data) => {
                setNavigationItems(data);
            });
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
                    <Outlet/>
                </div>
            </main>
        </Base>
    );
});

export default Main;
