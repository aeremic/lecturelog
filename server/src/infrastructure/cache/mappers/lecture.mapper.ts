import { ActiveLectureEntity } from 'src/core/entities/active-lecture.entity';
import { ActiveLecture } from '../models/lecture.model';

export class LectureMapper {
  public static ToEntity(lectureModel: ActiveLecture): ActiveLectureEntity {
    const activeLectureEntity: ActiveLectureEntity = {
      subjectId: lectureModel.subjectId,
      code: lectureModel?.code,
      timerId: lectureModel?.timerId,
    };

    return activeLectureEntity;
  }

  public static ToEntities(
    lectureModels: ActiveLecture[],
  ): ActiveLectureEntity[] {
    let lectureEntities: ActiveLectureEntity[];
    if (lectureModels && lectureModels.length > 0) {
      lectureEntities = lectureModels.map((lectureModel) => {
        return this.ToEntity(lectureModel);
      });
    }

    return lectureEntities;
  }

  public static ToModel(
    activeLectureEntity: ActiveLectureEntity,
  ): ActiveLecture {
    const activeLectureModel: ActiveLecture = {
      subjectId: activeLectureEntity.subjectId,
      code: activeLectureEntity?.code,
      timerId: activeLectureEntity?.timerId,
    };

    return activeLectureModel;
  }
}
