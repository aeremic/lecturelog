import { ProfessorsSubjectGroupsEntity, StudentsSubjectGroupsEntity } from "src/core/entities";
import { GenericRepositoryAbstract } from "./generic.repositoty.abstract";
import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class StudentsGroupsRepositoryAbstract extends GenericRepositoryAbstract<StudentsSubjectGroupsEntity>  { }
