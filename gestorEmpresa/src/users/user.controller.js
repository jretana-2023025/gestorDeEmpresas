import User from '../users/user.model.js'
import { encrypt } from '../../utils/encrypt.js'
import { checkPassword } from '../../utils/encrypt.js'
import {generateJwt} from '../../utils/jwt.js'
import userModel from '../users/user.model.js'

export const adminDefect= async () => {
    try {
        let defectAdmin = await User.findOne({role:'ADMIN'})
        if(!defectAdmin){
           
            const password = await encrypt('123Qa@',10)
            let adminD = new User( 
                {
                    name:'David',
                    surname:'Retana',
                    username:'DRETANA',
                    email:'dretana123@gmail.com',
                    password:password,
                    role:'ADMIN'
                }
            )
            await adminD.save()
         console.log(`Admin is already connected`)
        }else{
            console.log(`Admin is already connected`)
        }
        
    } catch (error) {
        console.error('general error with adminDefect',error)
    }
}

export const login = async (req, res) => {
    try{
        //Capturar los datos(body)
        let { userLoggin, password } = req.body
        //Validar que el usuario exista
        let user = await User.findOne(
            {
                $or: [ //Subfunción OR | espera un [] de busquedas
                    {email: userLoggin},
                    {username: userLoggin}
                ]
            }
        ) //{username} = {username: username}
        console.log(user)
        //Verificar que la contraseña coincida
        if(user && await checkPassword(user.password, password)){
            //Generar el token
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        //Responder al usuario
        return res.status(400).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with login function', err})
    }
}

const initDataBase = async () => {
    await adminDefect()
}

export default initDataBase