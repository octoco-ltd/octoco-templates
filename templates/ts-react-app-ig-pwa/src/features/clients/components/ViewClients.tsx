import { doc, updateDoc } from 'firebase/firestore';
import { useFirestore, useFirestoreDocData } from 'reactfire';

export default function ViewClients() {
    // access the Firestore library
    const burritoRef = doc(useFirestore(), 'tryreactfire', 'burrito');

    // subscribe to a document for realtime updates. just one line!
    const { status, data } = useFirestoreDocData(burritoRef);


    const toggleYummy = async () => {
        // Update the document with the new value of yummy
        await updateDoc(burritoRef, {
            yummy: !data.yummy,
        });
    };

    // check the loading status
    if (status === 'loading') {
        return <p>Fetching burrito flavor...</p>;
    }

    return (
        <div>
            <p>The burrito is {data.yummy ? 'good' : 'bad'}!</p>
            <button onClick={toggleYummy}>Toggle Yummy</button>
        </div>
    );
}
