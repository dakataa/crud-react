import {UseConfig} from "@src/context/ConfigContext.tsx";

const Money = ({currency, locale, children}: {
    currency?: string,
    locale?: string,
    children: number | null | string
}) => {
    const browserLocale = Intl.NumberFormat().resolvedOptions().locale;
    const {currency: configCurrency, locale: configLocale} = UseConfig()
    currency ??= configCurrency ?? 'EUR';
    locale ??= configLocale ?? browserLocale;

    const number = Number(children);

    return (
        <>{!isNaN(number) && number.toLocaleString(locale, {style: 'currency', currency: currency})}</>
    )
};

export default Money;
