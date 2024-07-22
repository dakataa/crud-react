export const objectKeyIntersect = (entry:object, ...objects: object[]): object => {
    objects.forEach((object) => {
        Object.keys(entry).filter((key) => object.hasOwnProperty(key)).forEach((key) => {
            delete entry[key as keyof object];
        })
    })

    return entry;
}

export const objectKeyDiff = (entry:object, ...objects: object[]): object => {
    objects.forEach((object) => {
        Object.keys(entry).filter((key) => !object.hasOwnProperty(key)).forEach((key) => {
            delete entry[key as keyof object];
        })
    })

    return entry;
}

export const objectRemoveEmpty = (obj: object, nested: boolean = true): object => {
    Object.entries(obj)
        .map(([key, value]) => {
            if (nested && value instanceof Object) {
                value = objectRemoveEmpty(value);
            }

            return [key, value];
        })
        .filter(([, value]) => !(value instanceof Object ? Object.keys(value).length : value))
        .forEach(([key]) => {
            delete obj[key as keyof object];
        });

    return obj;
}
