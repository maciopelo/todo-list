export const parseDate = (date) => {
    const result = date.substr(0,10).split("-")
    return `${result[2]}-${result[1]}-${result[0]}`
}