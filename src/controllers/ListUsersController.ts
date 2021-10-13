import { Request, Response } from "express"
import { ListUserService } from "../service/ListUserService"

class ListUsersController {
  async handle(req: Request, res: Response){
    const listUserService = new ListUserService()
    const user = await listUserService.execute()

    return res.json(user)
  }
}

export { ListUsersController }