// src/components/Todos.tsx
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTodos, postTodo, Todo } from '../api/api';

const Todos: React.FC = () => {
    const queryClient = useQueryClient();

    // Fetch Todos
    const { data, error, isLoading } = useQuery<Todo[]>({
        queryKey: ['todos'],
        queryFn: getTodos,
    });

    // Post a new Todo
    const mutation = useMutation({
        mutationFn: postTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });

    if (isLoading) return <div>Loading...</div>;
    if (error instanceof Error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <ul>
                {data?.map((todo) => (
                    <li key={todo.id}>{todo.title}</li>
                ))}
            </ul>
            <button
                onClick={() =>
                    mutation.mutate({
                        title: 'New Todo 2',
                        photoURL : 'photoUrl',
                        version: '1',
                        date: new Date()
                    })
                }
            >
                Add Todo
            </button>
        </div>
    );
};

export default Todos;
