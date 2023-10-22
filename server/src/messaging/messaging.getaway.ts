import { Inject, Injectable, forwardRef } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ErrorConstants } from 'src/core/common/constants/error.constant';
import { MessagingConstants } from 'src/core/common/constants/messaging.constants';
import { LectureUseCases } from 'src/use-cases/lecture/lecture.use-case';
import { LoggerUseCases } from 'src/use-cases/logger/logger.use-case';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagingGetaway {
  @WebSocketServer()
  private server: Server;

  @Inject(forwardRef(() => LectureUseCases))
  private lectureUseCases: LectureUseCases;

  @Inject(LoggerUseCases)
  private loggerUseCases: LoggerUseCases;

  /**
   * Get all currently active rooms from server's cache
   * @returns Currently active rooms as Map<string, Set<string>>
   */
  getAllRooms() {
    return this.server.sockets.adapter.rooms;
  }

  /**
   * Initialization method for joining given rooms. Method used by clients to rejoin the rooms.
   * @param keys keys as a string
   * @param client Main object for interacting with a client, provided by Socket.IO
   * @returns undefined
   */
  @SubscribeMessage(MessagingConstants.JoinRoomsMessage)
  async joinRooms(
    @MessageBody() keys: string,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      if (keys) {
        const lectures =
          await this.lectureUseCases.parseLectureKeysToLectureIdentities(keys);
        for (let i = 0; i < lectures.length; i++) {
          if (lectures[i]) {
            const room = JSON.stringify(lectures[i]);
            client.join(room);
          }
        }
      }
    } catch (error) {
      await this.loggerUseCases.log(
        ErrorConstants.MessagingGetawayError,
        error?.message,
        error?.stack,
      );
    }
    return undefined;
  }

  /**
   * Initialization method for joining given room. Method used by clients to rejoin the room.
   * @param room Room as a string
   * @param client Main object for interacting with a client, provided by Socket.IO
   * @returns undefined
   */
  @SubscribeMessage(MessagingConstants.JoinRoomMessage)
  async joinRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      if (room) {
        client.join(room);
      }
    } catch (error) {
      this.loggerUseCases.log(
        ErrorConstants.MessagingGetawayError,
        error?.message,
        error?.stack,
      );
    }
    return undefined;
  }

  /**
   * Create a new room
   * @param room Room as a string
   * @param client Main object for interacting with a client, provided by Socket.IO
   * @returns undefined
   */
  @SubscribeMessage(MessagingConstants.CreateRoomMessage)
  createRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
    try {
      this.lectureUseCases.saveLecture(room);

      client.join(room);
      client.broadcast.emit(MessagingConstants.LecturesChangeMessage, {
        lecturesChangeData: room,
      });
    } catch (error) {
      this.loggerUseCases.log(
        ErrorConstants.MessagingGetawayError,
        error?.message,
        error?.stack,
      );
    }
    return undefined;
  }

  /**
   * Leave a room
   * @param room Room as a string
   * @param client Main object for interacting with a client, provided by Socket.IO
   * @returns undefined
   */
  @SubscribeMessage(MessagingConstants.EndRoomMessage)
  async endRoom(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      await this.lectureUseCases.removeLectureWork(room);
      await this.lectureUseCases.removeLecture(room);

      client.broadcast.emit(MessagingConstants.LecturesChangeMessage, {
        lecturesChangeData: room,
      });
      client.leave(room);
    } catch (error) {
      this.loggerUseCases.log(
        ErrorConstants.MessagingGetawayError,
        error?.message,
        error?.stack,
      );
    }
    return undefined;
  }

  /**
   * Leave all rooms
   * @param room Rooms as a string
   * @param client Main object for interacting with a client, provided by Socket.IO
   * @returns undefined
   */
  @SubscribeMessage(MessagingConstants.EndRoomsMessage)
  async endRooms(
    @MessageBody() keys: string,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      if (keys) {
        const lectures =
          await this.lectureUseCases.parseLectureKeysToLectureIdentities(keys);

        for (let i = 0; i < lectures.length; i++) {
          await this.lectureUseCases.removeLectureWork(
            JSON.stringify(lectures[i]),
          );
          await this.lectureUseCases.removeLecture(JSON.stringify(lectures[i]));

          client.broadcast.emit(MessagingConstants.LecturesChangeMessage, {
            lecturesChangeData: lectures[i],
          });

          const room = JSON.stringify(lectures[i]);
          client.leave(room);
        }
      }
    } catch (error) {
      this.loggerUseCases.log(
        ErrorConstants.MessagingGetawayError,
        error?.message,
        error?.stack,
      );
    }
    return undefined;
  }

  /**
   * Trigger lecture work
   * @param room Room as a string
   * @param client Main object for interacting with a client, provided by Socket.IO
   */
  @SubscribeMessage(MessagingConstants.StartRoomWorkMessage)
  startRoomWork(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.lectureUseCases.doLectureWork(room);
  }

  /**
   * Attend existing room
   * @param key Key as a string
   * @param client Main object for interacting with a client, provided by Socket.IO
   * @returns undefined
   */
  @SubscribeMessage(MessagingConstants.AttendRoomMessage)
  async attendRoom(
    @MessageBody() key: string,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const attendKeyParsed = JSON.parse(key);
      const lecture = await this.lectureUseCases.doLectureAttending(
        attendKeyParsed,
      );
      if (lecture) {
        const room = JSON.stringify(lecture);
        client.join(room);

        this.server
          .in(room)
          .emit(MessagingConstants.LectureAttendeesChangeMessage, {
            lectureAttendeeChangeData: attendKeyParsed.studentId,
          });
      }
    } catch (error) {
      this.loggerUseCases.log(
        ErrorConstants.MessagingGetawayError,
        error?.message,
        error?.stack,
      );
    }
    return undefined;
  }

  /**
   * Cancell lecture work
   * @param room Room as a string
   * @param client Main object for interacting with a client, provided by Socket.IO
   */
  @SubscribeMessage(MessagingConstants.CancelRoomWorkMessage)
  cancelRoomWork(
    @MessageBody() room: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.lectureUseCases.stopLectureWork(room);
  }

  /**
   * Send code event to clients in given room
   * @param room Room as a string
   * @param client Main object for interacting with a client, provided by Socket.IO
   * @returns undefined
   */
  sendCodeEventToRoom(room: string, codeEvent: number, code: string = null) {
    try {
      this.server.in(room).emit(MessagingConstants.LectureCodeEventMessage, {
        session: room,
        lectureCodeEventType: codeEvent,
        lectureCodeValue: code ?? '',
      });
    } catch (error) {
      this.loggerUseCases.log(
        ErrorConstants.MessagingGetawayError,
        error?.message,
        error?.stack,
      );
    }
    return undefined;
  }

  /**
   * Send timer event to clients in given room
   * @param room Room as a string
   * @param client Main object for interacting with a client, provided by Socket.IO
   * @returns undefined
   */
  sendTimerEventToRoom(
    room: string,
    timerEvent: string,
    counter: number = null,
  ) {
    try {
      this.server.in(room).emit(MessagingConstants.LectureTimerEventMessage, {
        session: room,
        lectureTimerEventType: timerEvent,
        lectureTimerCount: counter ?? -1,
      });
    } catch (error) {
      this.loggerUseCases.log(
        ErrorConstants.MessagingGetawayError,
        error?.message,
        error?.stack,
      );
    }
    return undefined;
  }
}
