import Router from 'koa-router';

import { 
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    updateUser
} from '../controllers/users.controllers.js';


const userRouter = Router({
    prefix: '/api'
});


userRouter.get('/user',getUsers);
userRouter.get('/user/:userId',getUserById);
userRouter.post('/user',createUser);
userRouter.put('/user/:userId',updateUser);
userRouter.delete('/user/:userId',deleteUser);




export default userRouter;