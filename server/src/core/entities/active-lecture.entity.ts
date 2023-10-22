import { ActiveLectureCodeState } from '../common/enums/code.enum';
import { ActiveLectureAttendee } from './active-lecture-attendee.entity';

export class ActiveLectureEntity {
  public subjectId: number;
  public state: ActiveLectureCodeState;
  public code: string;
  public timerId?: number;
  public attendees: ActiveLectureAttendee[];
}
