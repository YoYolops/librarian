import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
} from "typeorm";
import UserPersonalData from "./UserPersonalData";
import UserRegistrationProtocol from "../service/protocols/UserRegistrationData";
import UserError from "../errors/UserError";
import BcryptAdapter from "../service/adapters/BcryptAdapter";

@Entity("users")
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToOne(() => UserPersonalData, userPersonalData => userPersonalData.user)
    personalData: UserPersonalData;

    static async registerNew(userData: UserRegistrationProtocol) {
        const {
            username,
            password,
            name,
            email,
            birth,
        } = userData;
        const isDuplicated = await this.isUserAlreadyRegistered(userData);
        if(isDuplicated) throw new UserError("You're trying to register an already registered user");

        const Encrypter = new BcryptAdapter(10);
        const encryptedPassword = Encrypter.encrypt(password);

        const newUser = this.create({
            username,
            password: encryptedPassword,
            personalData: {
                name,
                email,
                birth,
            }
        })
        const newUserCreated = await newUser.save();
        return newUserCreated;
    }

    static async isUserAlreadyRegistered(userData: UserRegistrationProtocol): Promise<boolean> {
        const {
            username,
            email,
        } = userData;

        const alreadyExistentData = await this.find({
            where: [
                { username },
                { personalData: { email } }
            ]
        })

        return !!alreadyExistentData.length;
    }
}