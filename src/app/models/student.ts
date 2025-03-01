import { Unity } from "./course";
import { Course } from "./school";

export interface Student {
    name: string;
    siu: string;
    room: number;
    course: Course;
    shift: 'matutino' | 'vespertino' | 'noturno';
    class: string;
}

export interface GroupedRoom {
    room: number;
    students: Student[];
}