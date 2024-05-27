// import {  } from "@tanstack/react-query";

import { addDoc, collection, getFirestore, getDocs } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from 'firebase/storage';
import { queryClient } from "../main";

// src/api/api.ts
export interface Todo {
    id: string;
    title: string;
    photoURL: string;
    version: string;
    date: Date;
}


export interface Image {
    id: string;
    title: string;
    photoURL: string;
}

export interface ImageCreate {
    title: string;
    photoURL: string;
    file: File | null;
    base64: string | null;
}



export type TodoCreate = Omit<Todo, 'id'>;

// const API_URL = 'http://127.0.0.1:5001/react-pwa-template/us-central1/'; // Replace with your actual API URL

export const getTodos = async (): Promise<Todo[]> => {
    console.log('getTodos')
    const db = getFirestore();
    console.log(db)
    const querySnapshot = await getDocs(collection(db, "todos"));
    console.log('getTodo2')
    let test: Todo[] = []
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        test.push(doc.data() as Todo)
    });
    console.log(test)
    return test;
    // const response = await fetch(API_URL + 'getTodos');
    // if (!response.ok) {
    //     throw new Error('Network response was not ok');
    // }
    // return response.json();
};

export const postTodoOffline = (newTodo: TodoCreate) => {

    queryClient.setQueryData<Todo[]>(['todos'], todoList => {
        const updatedTodoList = todoList ? [...todoList] : [];
        updatedTodoList.push({
            id: (todoList?.length ?? 0 + 1).toString(),
            title: newTodo.title,
            photoURL: newTodo.photoURL,
            version: newTodo.version,
            date: newTodo.date
        });
        return updatedTodoList;
    });
};

// http://127.0.0.1:5001/react-pwa-template/us-central1/postTodos
export const postTodo = async (newTodo: TodoCreate): Promise<Todo> => {

    // 1. add reactfire
    // 2. use those hooks to get storage etc
    // 3. Upload to storage in here

    // upload photo now.. if offline just let it error
    // and see when it will retry
    const db = getFirestore();
    const docRef = await addDoc(collection(db, "todos"), newTodo);

    return { id: docRef.id, ...newTodo };

    // console.log('postTodo', newTodo)

    // const response = await fetch(API_URL + 'addTodo', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(newTodo),
    // });

    // if (!response.ok) {
    //     throw new Error('Network response was not ok');
    // }

    // return response.json();
};

export const postImageOffline = async (newImage: ImageCreate) => {

    queryClient.setQueryData<Image[]>(['images'], imagesList => {
        const updatedTodoList = imagesList ? [...imagesList] : [];
        updatedTodoList.push({
            id: (imagesList?.length ?? 0 + 1).toString(),
            title: newImage.title,
            photoURL: newImage.photoURL,
        });
        return updatedTodoList;
    });
};

export const postImage = async (newImage: ImageCreate): Promise<Image> => {

    console.log(newImage)
    try {
        if (newImage.file) {
            console.log('postImage', newImage)
            const storage = getStorage();
            console.log('storage', storage)
            const storageRef = ref(storage, `images/${newImage.file.name}`);
            const metadata = {
                contentType: newImage.file.type,
            };
            console.log('storageRef', storageRef, metadata)



            if (!newImage.file) {
                throw new Error('No file provided');
            } else {

                console.log('uploading photo to storage');
                if (newImage.base64) {
                    await uploadString(storageRef, newImage.base64, 'data_url').then(() => {
                        console.log('Uploaded a base64 string!');
                    }); // Upload file to storage
                } else {
                    await uploadBytes(storageRef, newImage.file, metadata); // Upload file to storage
                }
                // 
                console.log('uploaded photo to storage');
                const downloadUrl = await getDownloadURL(storageRef); // Get download URL
                console.log('downloadUrl', downloadUrl)
                newImage.photoURL = downloadUrl;

                newImage.file = null // Remove file from object

            }
        }

        const db = getFirestore();
        const docRef = await addDoc(collection(db, "images"), newImage);

        return { id: docRef.id, ...newImage };

        // const response = await fetch(API_URL + 'addImage', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(newImage),
        // });

        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }

        // return response.json();

    } catch (error) {
        console.error('Error uploading photo to storage:', error);
        throw error; // Throw the error so the caller can handle it
    }


};

export const getImages = async (): Promise<Image[]> => {
    try {

        console.log('getTodos')
        const db = getFirestore();
        console.log(db)
        const querySnapshot = await getDocs(collection(db, "images"));
        console.log('getTodo2')
        let test: Image[] = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            test.push(doc.data() as Image)
        });
        console.log(test)
        return test;
        // const response = await fetch(API_URL + 'getImages');
        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }
        // return await response.json();
    } catch (error) {
        console.log('error', error)
        return [];
    }
};
