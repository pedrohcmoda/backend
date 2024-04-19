const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}

module.exports = {


    async login(req, res) {
        const {password, email, isLogged} = req.body;
        const user = await User.findOne({where: { email }})
        if(!user) {
            return res.status(200).send({
                status: 0,
                message: "E-mail ou senha incorreto"
            })
        }
        if(!bcrypt.compareSync(password, user.password)){
            return res.status(400).send({
                status: 0,
                message: "E-mail ou senha incorreto"
            })
        }

        const user_id = user.id;

        await User.update({
            isLogged
        }, {
            where: {
                id: user_id
            }
        })

        user.password = undefined;
        const token = generateToken({id: user_id})
        return res.status(200).send({
            status: 1,
            message: "Usuario logado com sucesso",
            user, token
        });
    },

    async index(req, res){
        const user = await User.findAll();
        if( user === "" || user === null){
            return res.status(200).send({message:"Nenhum usuario cadastrado."})
        }
        return res.status(200).send({user});
    },
    async store(req, res){
        const {username, password, email} = req.body
        const user = await User.create({username, password, email});

        
        const token = generateToken({id: user.user_id})

        return res.status(200).send({
            status: 1,
            message: "Usuario cadastrado com sucesso",
            user, token
        });
    },
    async update(req, res){

        const {username, password, email} = req.body
        const {user_id} = req.params

        await User.update({
            username,
            password,
            email
        }, {where: {
            id: user_id
            }
        })
        return res.status(200).send({
            status: 1,
            message: "Usuario atualizado com sucesso",
        });
    },
    async delete(req, res){
        const {user_id} = req.params
        await User.destroy({
            where: {
                id: user_id
            }
        })
        return res.status(200).send({
            status: 1,
            message: "Usuario excluido com sucesso",
        });     
    }
}