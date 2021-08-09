import { config } from "mssql"

export const mssqlConfig: config = {
    user: 'sa',
    password: '1qaz@WSX',
    server: `127.0.0.1\\SQL2012`,
    database: 'LdsDB',
    // connectionTimeout: 1000000,
    port: 1433,
    options: {
        enableArithAbort: true,
        encrypt: true
    }
}