import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.model';

@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'varchar', length: 120 })
    public name: string;
    
    @Column({type: 'decimal'})
    public pointsPerPresence: number;
 
    // @ManyToMany(() => User)
    // @JoinTable()
    // public professors: User[]

    // @ManyToMany(() => User)
    // @JoinTable()
    // public students: User[]
}
