import { Request, Response } from 'express'
import { UserService } from '../../services/user/UserService';

class UserController{
    async handle(req: Request, res: Response){
        const { name, email, password } = (req.body);

        const createUserService = new UserService();
        
        const user = await createUserService.execute({ name, email, password });

        return res.json(user);
    }
}

export { UserController }