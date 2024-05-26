// src/api/api.ts
export interface Todo {
    id: number;
    title: string;
}

const API_URL = 'https://jsonplaceholder.typicode.com/todos'; // Replace with your actual API URL

export const getTodos = async (): Promise<Todo[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const postTodo = async (newTodo: Todo): Promise<Todo> => {
    const response = await fetch(API_URL, {
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
