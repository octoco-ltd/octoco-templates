export const getEllipsisTxt = (str: string, n = 6) => {
    if (str) {
        return `${str.substr(0, n)}...${str.substr(str.length - n, str.length)}`;
    }
    return '';
};

export const addSeparator = (num: string) => num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const currencyFormat = (num: any, symbol: string) =>
    `${symbol} ${addSeparator(Number(num).toFixed(2))}`;

export const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const deCamel = (str: string) => {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
};
