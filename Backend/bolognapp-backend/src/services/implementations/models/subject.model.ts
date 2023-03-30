import { IsString, MaxLength, MinLength } from '@nestjs/class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subject {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'varchar', length: 120 })
    public name: string;
}
