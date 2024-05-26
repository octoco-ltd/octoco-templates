// src/api/api.ts
export interface Todo {
    id: string;
    title: string;
    photoURL: string;
    version: string;
    date: Date;
}

export type TodoCreate = Omit<Todo, 'id'>;

const API_URL = 'http://127.0.0.1:5001/react-pwa-template/us-central1/'; // Replace with your actual API URL

export const getTodos = async (): Promise<Todo[]> => {
    const response = await fetch(API_URL + 'getTodos');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

// http://127.0.0.1:5001/react-pwa-template/us-central1/getTodos
export const postTodo = async (newTodo: TodoCreate): Promise<Todo> => {
    
    // 1. add reactfire
    // 2. use those hooks to get storage etc
    // 3. Upload to storage in here
    
    // upload photo now.. if offline just let it error
    // and see when it will retry

    console.log('postTodo', newTodo)

    const response = await fetch(API_URL + 'addTodo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    
    return response.json();
};
