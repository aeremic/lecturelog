import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";
import { SubjectGroup } from "./subjectgroup.model";

@Entity()
export class ProfessorsSubjectGroups {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public professorId: number;

    @Column()
    public subjectGroupId: number;

    @ManyToOne(() => User, professor => professor.professorsSubjectGroups)
    public professor: User;

    @ManyToOne(() => SubjectGroup, subjectGroup => subjectGroup.professorsSubjectGroups)
    public subjectGroup: SubjectGroup;
}