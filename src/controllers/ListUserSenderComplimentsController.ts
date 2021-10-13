import { Request, Response } from 'express'
import { ListUserSendCompliments } from '../service/ListUserSendComplimentsService'

class ListUserSenderComplimentsController {
  async handle(req: Request, res: Response){

    const { user_id } = req

    const listUserSendComplimentsService = new ListUserSendCompliments();

    const compliments = await listUserSendComplimentsService.execute(user_id)
  
    return res.json(compliments)
  }
}

export { ListUserSenderComplimentsController }