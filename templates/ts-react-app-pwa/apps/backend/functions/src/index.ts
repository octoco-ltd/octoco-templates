import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

export const helloWorld = onRequest(async (request: any, response: any) => {
    try {
        response.send("Hello from Firebase!");
    } catch (error) {
        response.status(500).send(error);
    }
});

export const addTodo = onRequest(async (request, response) => {
    const { title, version, date, photoURL } = request.body;
    const newTodo = { title, version, date, photoURL };

    try {
        const docRef = await db.collection('todos').add(newTodo);
        response.status(201).send({ id: docRef.id, ...newTodo });
    } catch (error) {
        console.log(`error!!, ${error}`);
        response.status(500).send(error);
    }
});

export const getTodos = onRequest(async (request, response) => {
    try {
        const snapshot = await db.collection('todos').get();
        const todos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        response.status(200).send(todos);
    } catch (error) {
        response.status(500).send(error);
    }
});


export const addImage = onRequest(async (request, response) => {
    const { title, photoURL } = request.body;

    try {
        // Save the file URL to Firestore
        const newImage = { title, photoURL: photoURL };
        const docRef = await db.collection('images').add(newImage);

        response.status(201).send({ id: docRef.id, ...newImage });
    } catch (error) {
        console.log(`error!!, ${error}`);
        response.status(500).send(error);
    }
});

export const getImages = onRequest(async (request, response) => {
    try {
        const snapshot = await db.collection('images').get();
        const images = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        response.status(200).send(images);
    } catch (error) {
        response.status(500).send(error);
    }
});