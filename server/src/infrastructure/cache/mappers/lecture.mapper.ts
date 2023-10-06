import { LectureEntity } from 'src/core/entities/lecture.entity';
import { Lecture } from '../models/lecture.model';

export class LectureMapper {
  public static ToEntity(lectureModel: Lecture): LectureEntity {
    const lectureEntity: LectureEntity = {
      subject: lectureModel.subject,
      code: lectureModel?.code,
      timer: lectureModel?.timer,
    };

    return lectureEntity;
  }

  public static ToEntities(lectureModels: Lecture[]): LectureEntity[] {
    let lectureEntities: LectureEntity[];
    if (lectureModels && lectureModels.length > 0) {
      lectureEntities = lectureModels.map((lectureModel) => {
        return this.ToEntity(lectureModel);
      });
    }

    return lectureEntities;
  }

  public static ToModel(lectureEntity: LectureEntity): Lecture {
    const lectureModel: Lecture = {
      subject: lectureEntity.subject,
      code: lectureEntity?.code,
      timer: lectureEntity?.timer,
    };

    return lectureModel;
  }
}
