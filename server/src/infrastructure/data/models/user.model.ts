import { IsString, MaxLength, MinLength } from '@nestjs/class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudentsSubjectGroups } from './students-subjectgroups.model';
import { ProfessorsSubjectGroups } from './professors-subjectgroups.model';

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

  @Column({ type: 'varchar', length: 120, nullable: true })
  public generatedPassword?: string;

  @Column({ type: 'boolean', nullable: true })
  public isActivated?: boolean;

  @Column({ type: 'smallint' })
  public role: number

  @OneToMany(() => StudentsSubjectGroups, studentsSubjectGroups => studentsSubjectGroups.student, { nullable: true })
  public studentsSubjectGroups!: StudentsSubjectGroups[];

  @OneToMany(() => ProfessorsSubjectGroups, professorsSubjectGroups => professorsSubjectGroups.professor, { nullable: true })
  public professorsSubjectGroups!: ProfessorsSubjectGroups[];
}
