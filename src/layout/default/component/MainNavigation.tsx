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
import {IconDefinitionType} from "@src/component/Icon";
import {Link} from "react-router-dom";
import {generateRoute} from "@src/component/Router";
import {RouteType} from "@src/type/RouteType";

export type MenuItem = {
    title: string;
    route?: RouteType;
    icon?: IconDefinitionType;
    items?: MenuItem[];
    target?: '_blank' | '_self',
}

const getFlat = (items: MenuItem[], current: MenuItem[] = []): any => {
    return items.reduce((result: any, item: MenuItem) => {
        const items = [
            ...current,
            item
        ];

        return [
            ...result,
            ...(item.items ? getFlat(item.items, items) : [items])
        ]
    }, []);
};

export type MainNavigationRef = {
    toggle: (e: UIEvent) => void;
};

const MainNavigation = forwardRef(({items, ...props}: {
    items: MenuItem[];
    className?: string;
    props?: any;
}, ref: ForwardedRef<MainNavigationRef>) => {
    const flatList = getFlat(items);
    const containerRef = useRef<any>(null);
    const [isOpen, setIsOpen] = useState(false);
    const initiatorElement = useRef<any>();

    ref = ref || createRef<MainNavigationRef>();

    useImperativeHandle(ref, () => ({
        toggle: (e: UIEvent) => {
            setIsOpen(!isOpen);
            initiatorElement.current = e.currentTarget;
        }
    }));

    const isActiveMenuItem = (item: MenuItem): boolean => {
        const path = document.location.pathname.replace(/(.*?)\/?$/i, '$1');
        const itemId = btoa(JSON.stringify(item));
        const link = generateRoute(item.route);

        return flatList.filter((v: MenuItem[]) => {
            const urls = v.map(v => generateRoute(v.route).replace(/(.*?)\/?$/i, '$1'));
            const ids = v.map(v => btoa(JSON.stringify(v)));

            return urls.includes(path) && ids.includes(itemId) && urls.indexOf(path) >= urls.indexOf(link);
        }).length > 0;
    }

    useEffect(() => {
        initiatorElement.current?.classList.toggle('active', isOpen)

        if (!isOpen)
            return;

        function handleClickOutside(event: Event) {
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
             className={"item " + (isOpen ? ['active', props.className] : [props.className]).join(' ')}>
            {items
                .map((item, index) => {
                        const active = isActiveMenuItem(item)
                        return (
                            <nav
                                key={index}
                                {...(active && {className: 'active'})}
                            >
                                <Link
                                    to={generateRoute(item.route) || ''}
                                    {...(item.icon && {icon: item.icon})}
                                >
                                    {item.title}
                                </Link>
                                {item.items?.length && <MainNavigation items={item.items}/>}
                            </nav>
                        );
                    }
                )}
        </nav>
    );
});

export default MainNavigation;
