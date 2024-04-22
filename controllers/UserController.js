const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');
const Post = require('../models/Post.js');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}

module.exports = {


    async login(req, res) {
        const {password, email} = req.body;
        const user = await User.findOne({where: { email }})
        if(!user) {
            return res.status(200).send({
                status: 2
            })
        }
        if(!bcrypt.compareSync(password, user.password)){
            return res.status(400).send({
                status: 2
            })
        }

        const user_id = user.id;
        user.password = undefined;
        const token = generateToken({id: user_id})
        return res.status(200).send({
            status: 1,
            user_id, token
        });
    },
    async index(req, res){
        const users = await User.findAll({
          include: {
            model: Post,
            as: 'posts'
          }
        });
        if( users === "" || users === null){
          return res.status(200).send({message:"Nenhum usuario cadastrado."})
        }
        return res.status(200).send({users});
      },
      async indexOne(req, res){
        const users = await User.findByPk(req.params.user_id, {attributes: {exclude: ['password']}})
        return res.status(200).send({users}); 
      },

    async store(req, res){
        const {username, email, password} = req.body
        const testeuser = await User.findOne({where: { email }})
        if(testeuser) {
            return res.status(200).send({
                status: 2
            })
        }
        try{
            await User.create({username, password, email});
            return res.status(200).send({
                status: 1,
            });
        }catch {
            return res.status(400).send({
                status: 2
            })
        }
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
        });     
    }
}