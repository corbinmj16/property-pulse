export function convertServerToClientObject(value) {
    return JSON.parse(JSON.stringify(value))
}