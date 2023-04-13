import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Logger {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 120 })
  public title: string;

  @Column({ type: 'int' })
  public code?: number

  @Column({ type: 'varchar', length: 380 })
  public description?: string;

  @CreateDateColumn()
  public dateLogged: Date
}
