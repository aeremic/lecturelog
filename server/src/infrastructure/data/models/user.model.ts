import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EmailVerification } from './emailverification.model';
import { Subject } from './subject.model';
import { StudentsSubjects } from './students-subjects.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 120 })
  public firstname: string;

  @Column({ type: 'varchar', length: 120 })
  public lastname: string;

  @Column({ type: 'varchar', length: 120 })
  public email: string;

  @Column({ type: 'smallint', nullable: true })
  public index?: number;

  @Column({ type: 'smallint', nullable: true })
  public year?: number;

  @Column({ type: 'varchar', length: 120, nullable: true })
  public hash?: string;

  @Column({ type: 'boolean' })
  public isActivated: boolean;

  @Column({ type: 'smallint' })
  public role: number

  @OneToMany(() => StudentsSubjects, studentsSubjects => studentsSubjects.student, { nullable: true })
  public studentsSubjects!: StudentsSubjects[];

  @OneToMany(() => Subject, subject => subject.professor, { nullable: true })
  public subject!: Subject[];

  @OneToMany(() => EmailVerification, emailVerification => emailVerification.user, { nullable: true })
  public emailVerifications!: EmailVerification[];
}
