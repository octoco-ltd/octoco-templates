// src/components/Todos.tsx
import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTodos, postTodo, postTodoOffline, Todo, TodoCreate } from '../api/api';

const Todos: React.FC = () => {
    const queryClient = useQueryClient();

    // we need a default mutation function so that paused mutations can resume after a page reload
    queryClient.setMutationDefaults(['todos'], {
        mutationFn: async (newTodo) => {
            // to avoid clashes with our optimistic update when an offline mutation continues
            await queryClient.cancelQueries({ queryKey: ['todos'] })
            return postTodo(newTodo)
        },
    })

    // Fetch Todos
    const { data, error, isLoading } = useQuery<Todo[]>({
        queryKey: ['todos'],
        queryFn: getTodos,
        // networkMode: 'offlineFirst',
    });
    console.log(error)

    // Post a new Todo
    const mutation = useMutation({
        mutationKey: ['todos'],
        mutationFn: postTodo,
        // networkMode: 'offlineFirst',
        onMutate: async (payload: TodoCreate) => {
            // await queryClient.cancelQueries(['todos']);
            postTodoOffline(payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
        // mutationCache: queryClient.getMutationCache({
        //     onSuccess: (data) => {
        //         console.log('mutation success', data)
        //     },
        //     onError: (error) => {
        //         console.log('mutation error', error)
        //     },
        // })
    });

    if (isLoading) return <div>Loading...</div>;
    if (error instanceof Error) return <div>Error: {error.message}</div>;

    return (
        <div>
            <ul>
                {data?.map((todo, index) => (
                    <li key={index}>{todo.title}</li>
                ))}
            </ul>
            <button
                onClick={() =>
                    mutation.mutate({
                        title: 'New Todo' + Math.random().toString(36).substring(7),
                        photoURL: 'photoUrl',
                        version: '1',
                        date: new Date()
                    })
                }
            >
                Add Todo
            </button>
            <button
                onClick={() =>
                    queryClient.invalidateQueries({ queryKey: ['todos'] })
                }
            >
                Refresh
            </button>
        </div>
    );
};

export default Todos;
