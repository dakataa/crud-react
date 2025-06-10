const Money = ({currency, locale, children}: { currency: string, locale?: string, children: number|null|string }) => {
    const userLocale = Intl.NumberFormat().resolvedOptions().locale;
    const number = Number(children);

    return (
        <>{!isNaN(number) && number.toLocaleString(locale ?? userLocale, {style: 'currency', currency: currency})}</>
    )
};

export default Money;
