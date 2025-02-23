import { Client, Account, ID } from "appwrite";
import conf from '../../conf.js'

class AuthCLass {
    client;
    account;

    constructor(){
        this.client = new Client().setEndpoint(conf.appwriteUrl).setProject(conf.projectId)
        this.account = new Account(this.client)
    }

    async SignUp({email, password}){
        try {
            const user = await this.account.create(ID.unique(), email, password)
            return user
        } catch (error) {
            console.log('Sign Up Error :: Appwrite Error :: ', error);
        }
    }

    async Login({email, password}){
        try {
            const session = await this.account.createEmailPasswordSession(email, password)
            return session
        } catch (error) {
            console.log('Login Error :: Appwrite Error :: ', error);
        }
    }

    async GetUser(){
        try {
            const currentUser = await this.account.get()
            return currentUser
        } catch (error) {
            console.log('Get User Error :: Appwrite Error :: ', error);
            return error
        }
    }

    async Logout(){
        try {
            const logout = await this.account.deleteSession('current')
            if (logout) return logout
            else{
                console.log('Some error occured while logging out');
            }
        } catch (error) {
            console.log('Log out Error :: Appwrite Error :: ', error);
            return false
        }
    }
}

const appwriteAuth = new AuthCLass()

export default appwriteAuth

