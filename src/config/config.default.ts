import { config } from "mssql"

export const mssqlConfig: config = {
    user: 'sa',
    password: '1qaz@WSX',
    server: `121.43.193.235\\SQL2012`,
    database: 'LdsDB',

    port: 1433,
    options: {
        enableArithAbort: true,
        encrypt: false
    }
}