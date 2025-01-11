import React, {
    createRef,
    ForwardedRef,
    forwardRef,
    UIEvent,
    useEffect,
    useImperativeHandle,
    useRef,
    useState
} from "react";
import {Link, useLocation} from "react-router-dom";
import {generateRoute} from "@src/helper/RouterUtils.tsx";
import {RouteType} from "@src/type/RouteType";

export type MenuItem = {
    title: string;
    route?: RouteType;
    icon?: any;
    items?: MenuItem[];
    target?: '_blank' | '_self',
}

type FlatMenuItem = {
    id: string;
    url: string;
    parent?: string | null;
}

const getFlatMenuItems = (items: MenuItem[], current: FlatMenuItem[] = [], parent?: MenuItem): FlatMenuItem[] => {
    return items?.reduce((result: any, item: MenuItem) => {
        const items = [
            ...current,
            {
                id: btoa(encodeURIComponent(JSON.stringify(item))),
                url: generateRoute(item.route),
                parent: parent ? btoa(encodeURIComponent(JSON.stringify(parent))) : null,
            }
        ];

        return [
            ...result,
            ...(item.items ? getFlatMenuItems(item.items, items, item) : items)
        ]
    }, []);
};

export type MainNavigationRef = {
    toggle: (e: UIEvent) => void;
};

const MainNavigation = forwardRef(({items, className, ...props}: {
    items: MenuItem[];
    className?: string;
    props?: any;
}, ref: ForwardedRef<MainNavigationRef>) => {
    const flatList = getFlatMenuItems(items);
    const containerRef = useRef<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    const initiatorElement = useRef<any>();
    const location = useLocation();

    ref = ref || createRef<MainNavigationRef>();

    useImperativeHandle(ref, () => ({
        toggle: (e: UIEvent) => {
            setIsOpen(!isOpen);
            initiatorElement.current = e.currentTarget;
        }
    }));

    const currentPath = location.pathname.replace(/(.*?)\/?$/i, '$1');
    const currentActiveItem = flatList.filter(v => v.url === currentPath).pop();
    const getActiveItems = (item: FlatMenuItem): string[] => {
        const parent = flatList.filter(v => v.id === item.parent).pop();
        return [...(parent ? [parent.id] : []), ...(parent?.parent ? getActiveItems(parent) : [])];
    };

    const activeItems = [currentActiveItem?.id, ...(currentActiveItem ? getActiveItems(currentActiveItem) : [])];

    const isActiveMenuItem = (item: MenuItem): boolean => {
        const itemId = btoa(encodeURIComponent(JSON.stringify(item)));
        return activeItems.includes(itemId);
    }

    useEffect(() => {
        initiatorElement.current?.classList.toggle('active', isOpen);
        document.body.classList.toggle('toggle-nav', isOpen);

        if (!isOpen)
            return;

        const handleClickOutside = (event: Event)  => {
            if (containerRef.current && !containerRef.current.contains(event.target) && (!initiatorElement.current || !initiatorElement.current.contains(event.target))) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <nav ref={containerRef} {...props}
             className={[...(className?.split(' ') || []), ...(isOpen ? ['active'] : [])].join(' ')}>
            {items
                .map((item, index) => {
                        const active = isActiveMenuItem(item)
                        return (
                            <nav
                                key={index}
                                className={["item", ...(active ? ['active'] : [])].join(' ')}
                            >
                                <Link
                                    to={generateRoute(item.route)}
                                    {...(item.icon && {icon: item.icon})}
                                    {...(item.items?.length) && {
                                        onClick: () => {
                                            alert('Collapsing')
                                        }
                                    }}
                                >
                                    <span className={"icon"}></span>
                                    <span className={"title"}>{item.title}</span>
                                </Link>
                                {item.items?.length && <MainNavigation items={item.items} className={"item"}/>}
                            </nav>
                        );
                    }
                )}
        </nav>
    );
});

export default MainNavigation;
