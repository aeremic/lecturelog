import { IsString, MaxLength, MinLength } from '@nestjs/class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudentsSubjects } from './students-subjects.model';
import { ProfessorsSubjects } from './professors-subjects.model';

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

  @OneToMany(() => StudentsSubjects, studentsSubjects => studentsSubjects.student, { nullable: true })
  public studentsSubjects!: StudentsSubjects[];

  @OneToMany(() => ProfessorsSubjects, professorsSubjects => professorsSubjects.professor, { nullable: true })
  public professorsSubjects!: ProfessorsSubjects[];
}
