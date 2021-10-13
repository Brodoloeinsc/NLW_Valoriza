import { Request, Response } from "express";
import { ListUserReceiverCompliments } from "../service/ListUserReceiverComplimentsService";

class ListUserReceiveComplimentsController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;

    const listUserReceiveComplimentsService = new ListUserReceiverCompliments();

    const compliments = await listUserReceiveComplimentsService.execute(user_id);

    return res.json(compliments);
  }
}

export { ListUserReceiveComplimentsController };