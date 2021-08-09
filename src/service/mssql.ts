import { Provide, Scope, ScopeEnum, Init, Config } from "@midwayjs/decorator"
import { ConnectionPool, config, IResult } from "mssql"

@Provide()
@Scope(ScopeEnum.Singleton)
export class Mssql {

    @Config("mssqlConfig")
    config: config


    server: ConnectionPool;

    @Init()
    async init() {
        this.server = new ConnectionPool(this.config, err => {
            console.log(err ? err : 'Pesiv connect success');
        })
    }

    // PLM查询对象
    async QUERY<T>(sql: string) {
        return new Promise<IResult<T>>((resolve, reject) => {
            this.server.connect()
                .then(pool => {
                    pool.query(sql)
                        .then(res => {
                            resolve(res)
                        })
                })
                .catch(e => reject(e))
        })
    }


}