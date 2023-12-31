import prismaClient from "../../prisma";

interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class UserService{
    async execute( { name, email, password }: UserRequest ){

        // verificar se ele enviou um email
        if(!email){
            throw new Error("Email incorrect")
        }

        // verificar se já existe um email cadastrado
        const userAlreadyExists = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })
        if(userAlreadyExists){
            throw new Error("User already exists")
        }

        const user = await prismaClient.user.create({
            data: {
                name: name,
                email: email,
                password: password,
            },
            select: {
                id: true,
                email: true,
                name: true
            }
        })

        return user;
    }
}

export { UserService }