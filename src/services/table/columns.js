export const getColumns = (entries) => {
    return sortColumns(Object.keys(entries[0].attributes))
} 

export const sortColumns= (columns) => {
    // Put "name" first
    console.log(columns)
    return [columns.splice(columns.indexOf("name"), 1)[0], ...columns]
}