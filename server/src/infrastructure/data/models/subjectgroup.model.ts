import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudentsSubjectGroups } from './students-subjectgroups.model';
import { ProfessorsSubjectGroups } from './professors-subjectgroups.model';
import { Subject } from './subject.model';

@Entity()
export class SubjectGroup {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'decimal' })
    public groupNo: number;

    @Column({ type: 'decimal' })
    public pointsPerPresence: number;

    @ManyToOne(() => Subject, subject => subject.subjectGroups)
    public subject: Subject;

    @OneToMany(() => StudentsSubjectGroups, studentsSubjectGroups => studentsSubjectGroups.subjectGroup, { nullable: true })
    public studentsSubjectGroups!: StudentsSubjectGroups[];

    @OneToMany(() => ProfessorsSubjectGroups, professorsSubjectGroups => professorsSubjectGroups.subjectGroup, { nullable: true })
    public professorsSubjectGroups!: ProfessorsSubjectGroups[];
}
