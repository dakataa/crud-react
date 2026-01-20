import {UseConfig} from "@src/context/ConfigContext.tsx";

const Money = ({currency, locale, children, precision = 2}: {
    currency?: string,
    locale?: string,
    precision?: number,
    children: number | null | string
}) => {
    const browserLocale = Intl.NumberFormat().resolvedOptions().locale;
    const {currency: configCurrency, locale: configLocale} = UseConfig()
    currency ??= configCurrency ?? 'EUR';
    locale ??= configLocale ?? browserLocale;

    const number = Number(children);

    return (
        <>{!isNaN(number) && number.toLocaleString(locale, {style: 'currency', currency: currency, minimumFractionDigits: precision})}</>
    )
};

export default Money;
