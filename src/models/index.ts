export interface ToDo {
    id: number;
    text: string;
    description: string;
    completed: boolean;
  }
  
  export interface IToDoState {
    toDos: ToDo[];
    total: number;
    completed: number;
    pending: number;
  }