import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";
import { Subject } from "./subject.model";

@Entity()
export class StudentsSubjects {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public studentId: number;

    @Column()
    public subjectId: number;

    @Column({ type: 'decimal' })
    public sumOfPresencePoints: number;

    @ManyToOne(() => User, student => student.studentsSubjects, { cascade: true })
    public student: User;

    @ManyToOne(() => Subject, subject => subject.studentsSubjects, { cascade: true })
    public subject: Subject;
}