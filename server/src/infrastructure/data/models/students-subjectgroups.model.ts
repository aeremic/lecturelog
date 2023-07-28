import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";
import { SubjectGroup } from './subjectgroup.model';

@Entity()
export class StudentsSubjectGroups {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public studentId: number;

    @Column()
    public subjectGroupId: number;

    @Column({ type: 'decimal' })
    public sumOfPresencePoints: number;

    @ManyToOne(() => User, student => student.studentsSubjectGroups, { onDelete: 'CASCADE' })
    public student: User;

    @ManyToOne(() => SubjectGroup, subjectGroup => subjectGroup.studentsSubjectGroups, { onDelete: 'CASCADE' })
    public subjectGroup: SubjectGroup;
}