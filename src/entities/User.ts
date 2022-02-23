import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
} from "typeorm";
import UserPersonalData from "./UserPersonalData";

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
}