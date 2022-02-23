import UserError from "../errors/UserError";
import BaseService from "../protocols/BaseService";
import Encrypt from "./adapters/interfaces/Encrypt";
import Login from "./protocols/Login";
import TokenProtocol from "./adapters/interfaces/TokenProtocol";
import Session from "./authenticators/Session";
import BaseUserEncodeData from "./protocols/BaseUserEncodeData";
import UserRegistrationProtocol from "./protocols/UserRegistrationData";

export default class User extends BaseService {
    private encrypter;
    private sessionManager;

    constructor(entity: any, encrypter: Encrypt, sessionManager: Session) {
        super(entity);
        this.encrypter = encrypter;
        this.sessionManager = sessionManager;
    }

    async login(loginProtocol: Login): Promise<TokenProtocol> {
        const { username, password } = loginProtocol;
        const userFound = await super.getEntity().findOne({
            where: {
                username,
            },
            relations: ["personalData"],
        });

        if(!userFound) throw new UserError('You tried to log in with wrong credentials');
        if (!this.encrypter.compare(password, userFound.password)) {
            throw new UserError('You tried to log in with wrong credentials');
        }
        
        const userDataToEncode: BaseUserEncodeData = {
            username: userFound.username,
            name: userFound.personalData.name,
        }
        const tokenData = this.sessionManager.create(userDataToEncode);

        return tokenData;
    }

    async register(UserData: UserRegistrationProtocol) {

    }
}