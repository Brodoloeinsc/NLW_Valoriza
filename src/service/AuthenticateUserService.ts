import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UserRepositories } from "../repositories/UserRepositories";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const userRepository = getCustomRepository(UserRepositories);

    // Verify if the email exists
    const user = await userRepository.findOne({ email });

    if (!user) {
      throw new Error("Email or password are incorrect");
    }

    // Verify if the password is correct
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email or password are incorrect");
    }

    // Generate the Token
    const token = sign(
      {
        email: user.email,
      },
      "c1a65e4cefaffc46e881e736fbdf7579",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );
      return token;
  }
}

export { AuthenticateUserService };
