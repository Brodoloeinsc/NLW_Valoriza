import { getCustomRepository } from "typeorm"
import { ComplimentsRepository } from "../repositories/ComplimentsRepository"


class ListUserReceiverCompliments {
  async execute(user_id: string){
    const complimentsRepository = getCustomRepository(ComplimentsRepository)
  
    const compliments = await complimentsRepository.find({
      where: {
        user_receiver: user_id
      },
      relations: ["userSender", "userReceiver", "Tag"]
    })

    return compliments
  }
}

export { ListUserReceiverCompliments }