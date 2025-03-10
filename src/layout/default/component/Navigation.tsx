import React, {
    createRef,
    ForwardedRef,
    forwardRef,
    useDeferredValue,
    useEffect,
    useImperativeHandle,
    useRef
} from "react";
import {Link, useLocation} from "react-router";
import {generateRoute} from "@src/helper/RouterUtils.tsx";
import {RouteType} from "@src/type/RouteType";

export type MenuItem = {
    title: string;
    route?: RouteType;
    icon?: any;
    items?: MenuItem[];
    target?: '_blank' | '_self',
}

export type NavigationItemContextType = {
    toggle: (value?: boolean) => void;
}

const NavigationItemContext = React.createContext<NavigationItemContextType | null>(null);

const UseParentNavigationItem = () => {
    return React.useContext<NavigationItemContextType | null>(NavigationItemContext);
}

const MainNavigationItem = ({item, open = false}: {
    item: MenuItem;
    open?: boolean;
}) => {

    const isGroup = !!item.items?.length;
    const location = useLocation();
    const currentLocationPath = location.pathname.replace(/(.*?)\/?$/i, '$1');
    const itemPath = generateRoute(item.route);
    const isActive = currentLocationPath.includes(itemPath, 0);
    const [active, setActive] = React.useState(isActive);
    const parentNavigationMenu = UseParentNavigationItem();
    const containerRef = useRef<HTMLElement | null>(null);
    const startAnimationTimeout = useRef<number | null>(null);

    const collapseClass = 'collapse';
    const animatingClass = 'collapsing';

    const context = {
        toggle: (value?: boolean) => {
            setActive(value !== undefined ? value : !active);
        }
    };

    const onAnimationEnd = () => {
        containerRef.current?.classList.remove(animatingClass);
        containerRef.current?.classList.add(collapseClass);
        containerRef.current?.classList.toggle('show', active);
        containerRef.current?.style.removeProperty('height');
    };

    const onAnimationStart = () => {
        if (startAnimationTimeout.current) {
            clearTimeout(startAnimationTimeout.current);
            startAnimationTimeout.current = null;
        }
    };

    useEffect(() => {
        if (active && parentNavigationMenu) {
            parentNavigationMenu.toggle(true);
        }

        // Add animation events
        containerRef.current?.addEventListener('animationstart', onAnimationStart);
        containerRef.current?.addEventListener('transitionstart', onAnimationStart);
        containerRef.current?.addEventListener('animationend', onAnimationEnd);
        containerRef.current?.addEventListener('transitionend', onAnimationEnd);

        containerRef.current?.style.setProperty('height', (!active ? containerRef.current?.scrollHeight : 0) + 'px');

        // Add animating class
        containerRef.current?.classList.remove('show');
        containerRef.current?.classList.remove(collapseClass);
        containerRef.current?.classList.add(animatingClass);

        // Set height depend on activity
        setTimeout(() => {
            containerRef.current?.style.setProperty('height', (active ? containerRef.current?.scrollHeight : 0) + 'px');
        }, 10)

        // End animation if not started in first 50 ms (in case no animation)
        startAnimationTimeout.current = setTimeout(onAnimationEnd, 50);

        return () => {
            onAnimationStart();

            containerRef.current?.removeEventListener('animationstart', onAnimationStart);
            containerRef.current?.removeEventListener('transitionstart', onAnimationStart);
            containerRef.current?.removeEventListener('animationend', onAnimationEnd);
            containerRef.current?.removeEventListener('transitionend', onAnimationEnd);
        };
    }, [active]);

    useEffect(() => {
        if (open !== active) {
            setActive(open);
        }
    }, [open]);

    return (
        <NavigationItemContext.Provider value={context}>
            <nav className={["item", ...(active || isActive ? ['active'] : [])].join(' ')}>
                <Link
                    to={isGroup ? '#' : generateRoute(item.route)}
                    {...(item.icon && {icon: item.icon})}
                    {...(isGroup && {
                        onClick: (e) => {
                            setActive(!active);
                        }
                    })}
                >
                    <span className={"icon"}></span>
                    <span className={"title"}>{item.title}</span>
                </Link>

                {isGroup && !!item.items?.length && (
                    <nav ref={containerRef} className={collapseClass}>
                        <NavigationGroup items={item.items}/>
                    </nav>
                )}
            </nav>
        </NavigationItemContext.Provider>
    )
};

const NavigationGroup = ({items}: {
    items: MenuItem[];
}) => {
    return (
        items.map((item) => {
                const key = [parent, item.title].filter(v => v).join('-').toLowerCase();
                return (
                    <MainNavigationItem key={key} item={item}/>
                )
            }
        )
    );
};

const Navigation = forwardRef(({items, className, open = false}: {
    items: MenuItem[];
    className?: string;
    open?: boolean;
    props?: any;
}, ref: ForwardedRef<NavigationItemContextType>) => {
    const containerRef = useRef<HTMLElement | null>(null);

    const [active, setActive] = React.useState(open);
    ref = ref || createRef<NavigationItemContextType>();

    const context = {
        toggle: (value?: boolean) => {
            setActive(value !== undefined ? value : !active)
        }
    };

    useImperativeHandle(ref, () => context);

    useEffect(() => {
        document.body.classList.toggle('toggle-nav', active);

        const onClickOutside = (e: Event) => {
            if (!containerRef.current?.contains(e.target as Node)) {
                setActive(false);
                document.body.removeEventListener('click', onClickOutside);
            }
        };

        if (active) {
            document.body.addEventListener('click', onClickOutside);
            return () => {
                document.body.removeEventListener('click', onClickOutside);
            }
        }
    }, [active]);

    return (
        <nav ref={containerRef}>
            <NavigationGroup items={items}/>
        </nav>
    )

});

export default Navigation;
