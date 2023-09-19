import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";
import { Subject } from ".";

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

    @ManyToOne(() => User, student => student.studentsSubjects, { onDelete: 'CASCADE' })
    public student: User;

    @ManyToOne(() => Subject, subject => subject.studentsSubjects, { onDelete: 'CASCADE' })
    public subject: Subject;
}