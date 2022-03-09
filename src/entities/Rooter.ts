import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
} from "typeorm";

@Entity("rooters")
export default class Rooter extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    static async getRooter(username: string): Promise<any> {
        const rooterData = await this.find({ username });
        return rooterData;
    }
}