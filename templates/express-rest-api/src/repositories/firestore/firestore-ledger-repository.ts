import { LedgerRepository } from '../ledger-repository';
import * as firebaseAdmin from 'firebase-admin';
import {
    LedgerEntryDTO,
    LedgerEntryIM,
    LedgerEntrySchema,
    LedgerEntryVM,
} from '../../models/ledger/ledger-schema';
import { UserAccountBalanceSchema, UserAccountBalanceVM } from '../../models/users/user-schema';
import { calculateBalance } from '../../utils/balances';



export class FirestoreLedgerRepository implements LedgerRepository {
    /*
        The ledger collection contains a sub collection for each user (userID). We will create
        entries for each transaction a user completes on the platform in his ledger
     */
    db: firebaseAdmin.firestore.Firestore
    collection: firebaseAdmin.firestore.CollectionReference;

    constructor() {

        this.collection = firebaseAdmin.firestore().collection('ledgers');
        this.db = firebaseAdmin.firestore()
    }

    public async addIncrementToLedger(userId: string, depositId:string, depositLedgerEntry: LedgerEntryDTO): Promise<void> {
        /*
            This function is used to add deposit and winnings transactions to ledgers
         */
        console.info('addIncrementToLedger - FirestoreLedgerRepository');

        const docToAdd: LedgerEntryIM = {...depositLedgerEntry, createdAt: new Date()}
        await this.collection.doc(userId).collection('transactions').doc(depositId).set(docToAdd)
    }

    public async getWithdrawalReversal(userId: string, reversedTransactionId: string): Promise<LedgerEntryVM | null> {
        console.info('getWithdrawalReversal - FirestoreLedgerRepository');
        const docs = await this.collection.doc(userId).collection('transactions').where('reversedTransactionId', '==', reversedTransactionId).get()
        if(docs.empty) return null;
        let withdrawal;
        docs.forEach((doc) => {
            withdrawal = LedgerEntrySchema.parse({id: doc.id, ...doc.data(), createdAt: doc.data().createdAt?.toDate()})
        })
        return withdrawal
    }


    public async addDecrementToLedger(userId: string, transactionId:string, ledgerEntry: LedgerEntryDTO): Promise<void> {
        /*
            this function is used to add transactions such as withdrawal and bet to ledger
         */
        console.info('addDecrementToLedger - FirestoreLedgerRepository');

        const transactionToAdd: LedgerEntryIM = {...ledgerEntry, createdAt: new Date()}

        // First get the reference to the user's ledger
        const userLedgerRef = this.collection.doc(userId).collection('transactions')

        await this.db.runTransaction(async (t) => {
            console.info('Starting DB transaction')
            const snapshot = await t.get(userLedgerRef)
            const ledgerEntries: LedgerEntryVM[] = []

            snapshot.forEach((doc) => {
                ledgerEntries.push(LedgerEntrySchema.parse({id: doc.id, ...doc.data(), createdAt: doc.data().createdAt?.toDate()}))
            })

            // calculate whether the user's balance is sufficient
            const ledgerBalance = ledgerEntries.reduce(calculateBalance, 0)
            if (ledgerBalance < ledgerEntry.amount) throw new Error(`You have insufficient funds for this transaction`)

            const newLedgerEntryRef = this.collection.doc(userId).collection('transactions').doc(transactionId)
            await t.set(newLedgerEntryRef, transactionToAdd)
            console.info('DB transaction completed')
        })
    }

    public async getLedgerBalance(userId: string): Promise<UserAccountBalanceVM> {
        /*
            This function fetches a user's ledger and calculates their balance based on the
            transactions in the ledger
         */
        console.info('getLedgerBalance - FirestoreLedgerRepository');
        const userLedger = await this.collection.doc(userId).collection('transactions').get()


        const userTransactions: LedgerEntryVM[] = []
        userLedger.forEach((entry) => {
            userTransactions.push(LedgerEntrySchema.parse({id: entry.id, ...entry.data(), createdAt: entry.data().createdAt?.toDate()}))
        })

        const balance = userTransactions.reduce(calculateBalance, 0)
        return UserAccountBalanceSchema.parse({balance})
    }



}