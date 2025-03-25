import {
  // Avatar1,
  // Avatar2,
  // Avatar3,
  // Avatar4,
  // Avatar5,
  // Avatar6,
  // Avatar7,
  // Avatar8,
  // Thumb1,
  // Thumb2,
  // Thumb3,
  // Thumb4,
  // Thumb5,
  // Thumb6,
  // Thumb7,
  // Thumb8,
  Thumb10,
} from './images';

export interface Task {
  id: number;
  title: string;
  category: string;
  thumb: string;
  progress: number;
  daysLeft: number;
  avatars: string[];
}

export const tasks: Task[] = [
  {
    id: 1,
    title: 'printer 01',
    category: 'DEP01 / DEP02',
    thumb: Thumb10,
    progress: 75,
    daysLeft: 30,
    avatars: [],
  },
  {
    id: 2,
    title: 'printer 02' ,
    category: 'DEP 02 / DEP 03',
    thumb: Thumb10,
    progress: 85,
    daysLeft: 30,
    avatars: [],
  },
  {
    id: 3,
    title:  'printer 03' ,
    category: 'DEP 03 / 04',
    thumb: Thumb10,
    progress: 65,
    daysLeft: 30,
    avatars: [],
  },
  {
    id: 4,
    title: 'printer 04',
    category: 'DEP 04 / 05',
    thumb: Thumb10,
    progress: 95,
    daysLeft: 30,
    avatars: [],
  },
  {
    id: 5,
    title:'printer 05' ,
    category: 'DEP 05 / 06',
    thumb: Thumb10,
    progress: 90,
    daysLeft: 30,
    avatars: [],
  },
  {
    id: 6,
    title: 'printer 06' ,
    category: 'DEP 03 / 04',
    thumb: Thumb10,
    progress: 85,
    daysLeft: 30,
    avatars: [],
  },
  {
    id: 7,
    title:'printer 07' ,
    category: 'DEP 03 / 04',
    thumb: Thumb10,
    progress: 100,
    daysLeft: 30,
    avatars: [],
  },
  {
    id: 8,
    title: 'printer 08' ,
    category: 'DEP 03 / 04',
    thumb: Thumb10,
    progress: 75,
    daysLeft: 30,
    avatars: [],
  },
];
