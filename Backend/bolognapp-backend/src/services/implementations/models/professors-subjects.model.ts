import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";
import { Subject } from "./subject.model";

@Entity()
export class ProfessorsSubjects {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public professorId: number;

    @Column()
    public subjectId: number;

    @ManyToOne(() => User, professor => professor.professorsSubjects, { cascade: true })
    public professor: User;

    @ManyToOne(() => Subject, subject => subject.professorsSubjects, { cascade: true })
    public subject: Subject;
}