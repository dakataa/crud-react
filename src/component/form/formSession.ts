import type { ActionRequestType } from '@crud-react/type/ActionRequestType.tsx';

const sortedEntries = (value: Record<string, unknown> = {}) => {
    return Object.entries(value).sort(([a], [b]) => a.localeCompare(b));
};
/** Request method/body and refresh timestamps do not identify an editing session. */
export function formSessionKey(request: ActionRequestType, filters = false): string {
    const identity = [
        request.action.namespace,
        request.action.entity,
        request.action.name,
        sortedEntries(request.parameters)
    ];

    if (filters) {
        const query = sortedEntries(request.query).filter(([key]) => key !== '_ts');

        identity.push(query);
    }

    return JSON.stringify(identity);
}
