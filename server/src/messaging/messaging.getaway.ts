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
     * Method for joining given groups
     * @param stringOfGroups Groups as a string
     * @param client Main object for interacting with a client, provided by Socket.IO
     * @returns undefined
     */
    @SubscribeMessage(MessagingConstants.JoinActiveLecturesMessage)
    joinActiveLectures(@MessageBody() stringOfGroups: string, @ConnectedSocket() client: Socket) {
        try {
            if (stringOfGroups) {
                let groups = this.lectureUseCases.parseGroupsToLectures(stringOfGroups);
                groups.forEach((group) => {
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
     * Method for joining given group
     * @param group Group as a string
     * @param client Main object for interacting with a client, provided by Socket.IO
     * @returns undefined
     */
    @SubscribeMessage(MessagingConstants.JoinActiveLectureMessage)
    async joinActiveLecture(@MessageBody() group: string, @ConnectedSocket() client: Socket) {
        try {
            if (group) {
                client.join(group);
            }
        }
        catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
        }
        return undefined;
    }

    /**
     * Create a new group
     * @param group Group as a string
     * @param client Main object for interacting with a client, provided by Socket.IO
     * @returns undefined
     */
    @SubscribeMessage(MessagingConstants.CreateLectureMessage)
    createGroup(@MessageBody() group: string, @ConnectedSocket() client: Socket) {
        try {
            this.lectureUseCases.saveLecture(group);

            client.join(group);
            client.broadcast.emit(MessagingConstants.LecturesChangeMessage, { 'lecturesChangeData': group })
        }
        catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
        }
        return undefined;
    }

    /**
     * Leave a group
     * @param group Group as a string
     * @param client Main object for interacting with a client, provided by Socket.IO
     * @returns undefined
     */
    @SubscribeMessage(MessagingConstants.EndLectureMessage)
    endGroup(@MessageBody() group: string, @ConnectedSocket() client: Socket) {
        try {
            this.lectureUseCases.removeLectureWork(group);
            this.lectureUseCases.removeLecture(group);

            client.broadcast.emit(MessagingConstants.LecturesChangeMessage, { 'lecturesChangeData': group })
            client.leave(group);
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
        }
        return undefined;
    }

    /**
     * Join a group
     * @param group Group as a string
     * @param client Main object for interacting with a client, provided by Socket.IO
     * @returns undefined
     */
    @SubscribeMessage(MessagingConstants.JoinLectureMessage)
    joinGroup(@MessageBody() group: string, @ConnectedSocket() client: Socket) {
        try {
            client.join(group);
        }
        catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
        }
        return undefined;
    }

    /**
     * Trigger lecture work
     * @param group Group as a string
     * @param client Main object for interacting with a client, provided by Socket.IO
     */
    @SubscribeMessage(MessagingConstants.StartLectureWorkMessage)
    startLectureWork(@MessageBody() group: string, @ConnectedSocket() client: Socket) {
        this.lectureUseCases.doLectureWork(group);
    }

    /**
     * Cancell lecture work
     * @param group Group as a string
     * @param client Main object for interacting with a client, provided by Socket.IO
     */
    @SubscribeMessage(MessagingConstants.CancelLectureWorkMessage)
    cancelLectureWork(@MessageBody() group: string, @ConnectedSocket() client: Socket) {
        this.lectureUseCases.removeLectureWork(group);
    }

    /**
     * Send code event to clients in given group
     * @param group Group as a string
     * @param client Main object for interacting with a client, provided by Socket.IO
     * @returns undefined
     */
    sendCodeEventToGroup(group: string, codeEvent: number, code: string = null) {
        try {
            this.server.in(group).emit(MessagingConstants.LectureCodeEventMessage, { 'session': group, 'lectureCodeEventType': codeEvent, 'lectureCodeValue': code ?? '' });
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
        }
        return undefined;
    }

    /**
     * Send timer event to clients in given group
     * @param group Group as a string
     * @param client Main object for interacting with a client, provided by Socket.IO
     * @returns undefined
     */
    sendTimerEventToGroup(group: string, timerEvent: string, counter: number = null) {
        try {
            this.server.in(group).emit(MessagingConstants.LectureTimerEventMessage, { 'session': group, 'lectureTimerEventType': timerEvent, 'lectureTimerCount': counter ?? -1 });
        } catch (error) {
            this.loggerUseCases.log(ErrorConstants.MessagingGetawayError, error?.message, error?.stack);
        }
        return undefined;
    }
}