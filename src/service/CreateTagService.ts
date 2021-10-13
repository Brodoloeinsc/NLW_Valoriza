import { getCustomRepository } from "typeorm"
import { TagsRepository } from "../repositories/TagsRepository"

class CreateTagService {

  async execute(name: string){
    // Getting the repository
    const tagsRepositories = getCustomRepository(TagsRepository)

    // Validating if the name is write
    if(!name){
      throw new Error("Incorrect Name");
    }
    // Select * from `tags` where name = $name
    const tagAlreadyExists = await tagsRepositories.findOne({ name })
  
    //Validating if the tag already exists
    if(tagAlreadyExists){
      throw new Error("Tag Already Exists")
    }

    //Creating the name to insert
    const tag = tagsRepositories.create({ name });

    // Saving and Returning Tha tag
    await tagsRepositories.save(tag);
    return tag;
  }
}

export { CreateTagService }