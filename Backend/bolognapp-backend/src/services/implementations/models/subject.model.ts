import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudentsSubjects } from './students-subjects.model';
import { ProfessorsSubjects } from './professors-subjects.model';

@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'varchar', length: 120 })
    public name: string;
    
    @Column({type: 'decimal'})
    public pointsPerPresence: number;
 
    @OneToMany(() => StudentsSubjects, studentsSubjects => studentsSubjects.subject, { nullable: true })
    public studentsSubjects!: StudentsSubjects[];
    
    @OneToMany(() => ProfessorsSubjects, professorsSubjects => professorsSubjects.subject, { nullable: true })
    public professorsSubjects!: ProfessorsSubjects[];
}
