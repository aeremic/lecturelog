import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubjectGroup } from './subjectgroup.model';

@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'varchar', length: 120 })
    public name: string;

    @OneToMany(() => SubjectGroup, subjectGroup => subjectGroup.subject, { nullable: true, cascade: true })
    public subjectGroups: SubjectGroup[];
}
