import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from "typeorm";

@Entity("users")
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;
}