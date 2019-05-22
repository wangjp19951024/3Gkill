/**
 * 响应api的Response接口
 */

 interface Response {
     event: string | symbol,
     args: any[]
 }

 export default Response;