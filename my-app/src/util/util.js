
export const NUM_OF_RENDERING_PAGES = 3;
export const PAGE_SIZE = 50;

export function prettifyHeader(key){
    const addSpace = key.replace( /([A-Z])/g, " $1" );
    return addSpace.charAt(0).toUpperCase() + addSpace.slice(1);
}

export function getShowableKeys(json){
    return  Object.keys(json)
        .filter((key) => !key.startsWith("_"));
}

export function getValueByType(value, metaData) {
    if (metaData.type === "Date")  {
        return new Date(value).toDateString()
    }

    return value;
};