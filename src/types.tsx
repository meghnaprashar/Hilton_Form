import { ChangeEvent } from "react";

export interface Vacancies {
  adult: number;
  child: number;
}

export interface RoomData {
  name: string;
  key: string;
  label: string;
  vacancies: Vacancies;
}

export interface RoomRequests {
  adult: number;
  child: number;
}

export interface Room extends RoomData {
  requests: RoomRequests;
  isActive: boolean;
  isRequired: boolean;
}

export interface RoomRequestFormState {
  readonly rooms: Room[];
}

export interface RoomActivationHandler {
  (event: ChangeEvent<HTMLInputElement>): void;
}

export interface RequestsUpdateHandler {
  (event: ChangeEvent<HTMLSelectElement>): void;
}

export interface RoomRequestsSubmissionPayload {
  id: string;
  roomRequests: { id: string; name: string; requests: RoomRequests }[];
}

export interface RoomProps {
  name: string;
  label: string;
  isActive?: boolean;
  toggleRoomActivation: RoomActivationHandler;
  isRequired?: boolean;
  updateRoomRequests: RequestsUpdateHandler;
  vacancies: Vacancies;
  requests: RoomRequests;
}
