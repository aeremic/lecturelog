import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.model';

@Entity()
export class EmailVerification {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public userId: number;

    @Column({ type: 'varchar', length: 120 })
    public email: string;

    @Column({ type: 'timestamp', nullable: true })
    public sentOn: Date;

    @Column({ type: 'varchar', length: 120 })
    public code: string;

    @Column({ type: 'boolean', nullable: true })
    public expired?: boolean;

    @ManyToOne(() => User, user => user.emailVerifications)
    public user: User;
}
