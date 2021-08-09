import { Inject, Controller, Get, Provide, Query } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { Mssql } from "../service/mssql"
import { userInfo, devs } from "../interface"

@Provide()
@Controller('/pesiv')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  Mssql: Mssql;

  @Get('/user')
  async getUser(@Query() user: string) {
    const userInfo = await this.Mssql.QUERY<userInfo>(`SELECT  Id,user_name,user_pwd,salt,real_name,telephone,email FROM Users where user_name='${user}'`)
    if (userInfo) {
      const u = userInfo.recordset[0]
      const devs = await this.Mssql.QUERY<devs>(`SELECT DevName,DeviceCode FROM [LdsDB].[dbo].[UserDevice] where UserId='${u.Id}'`)
      return {
        code: 200,
        data: {
          u,
          devs: devs.recordset
        }
      }
    } return {
      code: 0,
      msg: "no user"
    }
  }
}
