import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { ErrorConstants } from "src/core/common/constants/error.constant";
import { MessagingConstants } from "src/core/common/constants/messaging.constants";
import { LectureUseCases } from "src/use-cases/lecture/lecture.use-case";
import { LoggerUseCases } from "src/use-cases/logger/logger.use-case";

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
     * Method for joining given rooms
     * @param stringOfSubjectKeys subjects as a string
     * @param client Main object for interacting with a client, provided by Socket.IO
     * @returns undefined
     */
    @SubscribeMessage(MessagingConstants.JoinActiveRoomsMessage)
    joinActiveRooms(@MessageBody() stringOfSubjectKeys: string, @ConnectedSocket() client: Socket) {
        try {
            if (stringOfSubjectKeys) {
                let subjects = this.lectureUseCases.parseSubjectKeysToLectures(stringOfSubjectKeys);
                subjects.forEach((group) => {
                    if (group) {
                        client.join(JSON.stringify(group));
                    }
                });
            }
        }
        catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
        }
        return undefined;
    }

    /**
     * Method for joining given room
     * @param room Room as a string
     * @param client Main object for interacting with a client, provided by Socket.IO
     * @returns undefined
     */
    @SubscribeMessage(MessagingConstants.JoinActiveRoomMessage)
    async joinActiveRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
        try {
            if (room) {
                client.join(room);
            }
        }
        catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
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
            client.broadcast.emit(MessagingConstants.LecturesChangeMessage, { 'lecturesChangeData': room })
        }
        catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
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
    endRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
        try {
            this.lectureUseCases.removeLectureWork(room);
            this.lectureUseCases.removeLecture(room);

            client.broadcast.emit(MessagingConstants.LecturesChangeMessage, { 'lecturesChangeData': room })
            client.leave(room);
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
        }
        return undefined;
    }

    /**
     * Join a room
     * @param room Room as a string
     * @param client Main object for interacting with a client, provided by Socket.IO
     * @returns undefined
     */
    @SubscribeMessage(MessagingConstants.JoinRoomMessage)
    joinRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
        try {
            client.join(room);
        }
        catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
        }
        return undefined;
    }

    /**
     * Trigger lecture work
     * @param room Room as a string
     * @param client Main object for interacting with a client, provided by Socket.IO
     */
    @SubscribeMessage(MessagingConstants.StartRoomWorkMessage)
    startRoomWork(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
        this.lectureUseCases.doLectureWork(room);
    }

    /**
     * Cancell lecture work
     * @param room Room as a string
     * @param client Main object for interacting with a client, provided by Socket.IO
     */
    @SubscribeMessage(MessagingConstants.CancelRoomWorkMessage)
    cancelRoomWork(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
        this.lectureUseCases.removeLectureWork(room);
    }

    /**
     * Send code event to clients in given room
     * @param room Room as a string
     * @param client Main object for interacting with a client, provided by Socket.IO
     * @returns undefined
     */
    sendCodeEventToRoom(room: string, codeEvent: number, code: string = null) {
        try {
            this.server.in(room).emit(MessagingConstants.LectureCodeEventMessage, { 'session': room, 'lectureCodeEventType': codeEvent, 'lectureCodeValue': code ?? '' });
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
        }
        return undefined;
    }

    /**
     * Send timer event to clients in given room
     * @param room Room as a string
     * @param client Main object for interacting with a client, provided by Socket.IO
     * @returns undefined
     */
    sendTimerEventToRoom(room: string, timerEvent: string, counter: number = null) {
        try {
            this.server.in(room).emit(MessagingConstants.LectureTimerEventMessage, { 'session': room, 'lectureTimerEventType': timerEvent, 'lectureTimerCount': counter ?? -1 });
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
        }
        return undefined;
    }
}