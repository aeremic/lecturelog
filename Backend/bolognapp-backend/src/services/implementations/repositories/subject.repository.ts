import { Repository } from "typeorm";
import { BadGatewayException } from '@nestjs/common';
import { rejects } from "assert";
import { resolve } from "path";
import { InjectRepository } from "@nestjs/typeorm";
import { SubjectEntity } from "src/core/entities";
import { SubjectRepositoryAbstract } from "src/core/abstracts/repositories/subject.repository.abstract";
import { Subject } from "../models";
import { SubjectMapper } from "../mappers/subject.mapper";

export class SubjectRepository implements SubjectRepositoryAbstract {
    @InjectRepository(Subject)
    private readonly subjectModelRepository: Repository<Subject>

    get(): SubjectEntity[] {
        throw new Error("Method not implemented.");
    }
    getSubjectById(id: number): Promise<SubjectEntity> {
        return this.subjectModelRepository.findOneById(id)
        .then(res => {
            return SubjectMapper.ToEntity(res);
        });
    }
}