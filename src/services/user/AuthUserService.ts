import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute( { email, password } : AuthRequest ){

        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })
        // valida se o email existes
        if(!user){
            throw new Error("1. User or password incorrect!")
        }

        // verificar a senha está correta
        const passowrdMatch = await compare(password, user.password)

        if(! passowrdMatch){
            throw new Error("2. User or password incorrect!")
        }

        // se chegou ate aqui esta tudo certo
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET!,
            {
                subject: user.id,
                expiresIn: '3d'
            }
        )
        
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        }

    }
}

export { AuthUserService }