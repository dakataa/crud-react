import React, {memo, startTransition, useEffect, useRef, useState} from "react";
import './assets/style/theme.scss';
import MainNavigation, {MainNavigationRef, MenuItem} from "@src/layout/default/component/MainNavigation";
import Dropdown from "@src/component/Dropdown";
import Icon from "@src/component/Icon";
import Link from "@src/component/Link";
import Requester from 'requester';

const Index = memo(({children}: {
    children: any
}) => {

    const mainMenuRef = useRef<MainNavigationRef | null>(null);
    const [navigationItems, setNavigationItems] = useState<MenuItem[]>([]);

    useEffect(() => {
        (new Requester()).get('/_crud/navigation', {}).then((response) => {
            if (response.status !== 200) {
                return;
            }

            response.getData().then((data) => {
                startTransition(() => {
                    setNavigationItems(data);
                })
            });
        }).catch((e) => {
            console.log('error', e);
        }).finally(() => {

        });
    }, []);

    return (
        <>
            <header>
                <div className={"wrap"}>
                    <button onClick={(e) => mainMenuRef.current?.toggle(e)} className={"btn btn-hamburger btn-mobile"}>
                        <i></i>
                    </button>

                    <div className="first-nav">
                        <nav>
                            <Link className="logo" to="/">Admin</Link>
                        </nav>
                    </div>
                    <nav className="second-nav">
                        <Dropdown className={"user"}>
                            <span className="initials">YL</span>
                            <Link to={"#"}>
                                Yordan Lazarov
                            </Link>
                            <Link to={"#"}>
                                <Icon icon={['fas', 'power-off']}/> Logout
                            </Link>
                        </Dropdown>
                    </nav>
                </div>
            </header>
            <main>
                {!!navigationItems.length && (
                    <div className={"navigation d-print-none"}>
                        <nav>
                            <MainNavigation ref={mainMenuRef} items={navigationItems} className={"item"}/>
                        </nav>
                    </div>
                )}
                <div className={"content"}>
                    <div className="workspace">
                        {children}
                    </div>
                </div>
            </main>
        </>
    );
});

export default Index;
