import {
    Entity,
    Column,
    OneToOne,
    JoinColumn,
    BaseEntity,
    PrimaryGeneratedColumn,
} from 'typeorm';
import User from './User';

@Entity("user_personal_data")
export default class UserPersonalData extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    birth: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;
}