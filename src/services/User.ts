import UserError from "../errors/UserError";
import BaseService from "../protocols/BaseService";
import Encrypt from "./adapters/interfaces/Encrypt";
import Login from "./protocols/Login";
import TokenProtocol from "./adapters/interfaces/TokenProtocol";
import BaseUserEncodeData from "./protocols/BaseUserEncodeData";
import UserRegistrationProtocol from "./protocols/UserRegistrationData";
import TokenAdapter from "./adapters/interfaces/TokenAdapter";
import User from "../entities/User";

export default class UserService extends BaseService {
    private encrypter: Encrypt;
    private tokenAdapter: TokenAdapter;

    constructor(entity: any, encrypter: Encrypt, tokenAdapter: TokenAdapter) {
        super(entity);
        this.encrypter = encrypter;
        this.tokenAdapter = tokenAdapter;
    }

    async login(loginProtocol: Login): Promise<TokenProtocol> {
        const { username, password } = loginProtocol;
        const userFound = await super.getRepository().findOne({
            where: {
                username,
            },
            relations: ["personalData"],
        });

        console.log(userFound)

        if(!userFound) throw new UserError('You tried to log in with wrong credentials');
        if (!this.encrypter.compare(password, userFound.password)) {
            throw new UserError('You tried to log in with wrong credentials');
        }
        
        const userDataToEncode: BaseUserEncodeData = {
            username: userFound.username,
            name: userFound.personalData.name,
        }
        const tokenData = this.tokenAdapter.generate(userDataToEncode);
        return tokenData;
    }

    async register(userData: UserRegistrationProtocol): Promise<User> {
        const newUserCreated = await super.getEntity().registerNew(userData);
        return newUserCreated;
    }
}