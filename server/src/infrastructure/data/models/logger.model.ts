import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Logger {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'int' })
  public code: number;

  @Column({ type: 'varchar', length: 380, nullable: true })
  public description?: string;

  @Column({ type: 'text', nullable: true })
  public stackTrace?: string;

  @CreateDateColumn()
  public dateLogged: Date;
}
