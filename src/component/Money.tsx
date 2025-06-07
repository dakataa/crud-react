const Money = ({currency, locale, children}: { currency: string, locale?: string, children: number }) => {
    const userLocale = Intl.NumberFormat().resolvedOptions().locale;

    return (
        <>{Number(children).toLocaleString(locale ?? userLocale, {style: 'currency', currency: currency})}</>
    )
};

export default Money;
