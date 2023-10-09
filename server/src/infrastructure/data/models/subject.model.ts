import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.model';
import { StudentsSubjects } from '.';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 120 })
  public name: string;

  @Column({ type: 'decimal' })
  public pointsPerPresence: number;

  @ManyToOne(() => User, (professor) => professor.subject, {
    onDelete: 'CASCADE',
  })
  public professor: User;

  @OneToMany(
    () => StudentsSubjects,
    (studentsSubjects) => studentsSubjects.subject,
    { nullable: true },
  )
  public studentsSubjects!: StudentsSubjects[];
}
