import {
  Avatar1,
  Avatar2,
  Avatar3,
  Avatar4,
  Avatar5,
  Avatar6,
  Avatar7,
  Avatar8,
} from 'data/images';

export interface Mentor {
  id: number;
  name: string;
  title: string;
  avatar: string;
  task: number;

}

export const mentors: Mentor[] = [
  {
    id: 1,
    name: 'Curious George',
    title:'DEP 03 / 04',
    avatar: Avatar1,
    task: 40,
   
  },
  {
    id: 2,
    name: 'Abraham Lincoln',
    title:'DEP 03 / 04',
    avatar: Avatar2,
    task: 32,  
   
  },
  {
    id: 3,
    name: 'Alex Stanton',
    title: 'DEP 03 / 04',
    avatar: Avatar3,
    task: 60,  
  
  },
  {
    id: 4,
    name: 'Richard Kyle',
    title: 'DEP 03 / 04',
    avatar: Avatar4,
    task: 60, 
    
  },
  {
    id: 5,
    name: 'Brian Robinson',
    title: 'DEP 03 / 04',
    avatar: Avatar5,
    task: 28,   
   
  },
  {
    id: 6,
    name: 'Jakob Saris',
    title: 'DEP 03 / 04',
    avatar: Avatar6,
    task: 60,    
   
  },
  {
    id: 7,
    name: 'Jeremy Zucker',
    title: 'DEP 03 / 04',
    avatar: Avatar7,
    task: 40,   
  
  },
  {
    id: 8,
    name: 'Jason Statham',
    title: 'DEP 03 / 04',
    avatar: Avatar8,
    task: 60,   
   
  },
];
