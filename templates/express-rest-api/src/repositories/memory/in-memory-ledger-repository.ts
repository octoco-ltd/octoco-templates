import { LedgerRepository } from '../ledger-repository';
import { LedgerEntryDTO, LedgerEntryVM } from '../../models/ledger/ledger-schema';
import { NotFoundError } from '../../utils/errors';
import { UserAccountBalanceSchema, UserAccountBalanceVM } from '../../models/users/user-schema';
import { calculateBalance } from '../../utils/balances';

export class InMemoryLedgerRepository implements LedgerRepository {
    constructor(public seed: {id: string, transactions: LedgerEntryVM[]}[]) {
    }

    public seedLedger(seed: {id: string, transactions: LedgerEntryVM[]}[]) {
        this.seed = seed
    }

    public clearSeed(){
        this.seed = []
    }


    public async addIncrementToLedger(userId: string, transactionId:string, ledgerEntry: LedgerEntryDTO): Promise<void> {
        const index = this.seed.findIndex((d) => d.id === userId)
        if (index === -1) {
            const depositToAdd: LedgerEntryVM = {
                id: transactionId, createdAt: new Date(), ...ledgerEntry
            }
            this.seed.push({id: userId, transactions: [depositToAdd]})
        } else {
            const depositToAdd: LedgerEntryVM = {
                id: transactionId, createdAt: new Date(), ...ledgerEntry
            }
            this.seed[index].transactions.push(depositToAdd)
        }
    }


    public async addDecrementToLedger(userId: string, transactionId:string, ledgerEntry: LedgerEntryDTO): Promise<void> {
        const index = this.seed.findIndex((d) => d.id === userId)
        if (index === -1) {
            throw new NotFoundError(`No ledger found for user with ID: ${userId}`)
        } else {
            // we first need to check the user's balance
            const balance = this.seed[index].transactions.reduce(calculateBalance, 0)
            if (balance < ledgerEntry.amount){
                throw new Error('You have insufficient funds to complete this transaction')
            }
            const depositToAdd: LedgerEntryVM = {
                id: transactionId, createdAt: new Date(), ...ledgerEntry
            }
            this.seed[index].transactions.push(depositToAdd)
        }
    }


    public async getWithdrawalReversal(userId: string, reversedTransactionId: string): Promise<LedgerEntryVM | null> {
        const txes = this.seed.find((d) => d.id === userId)
        if (!txes) throw new NotFoundError('User ID has no transactions')
        const doc = txes.transactions.find((d) => d.reversedTransactionId === reversedTransactionId)
        if(!doc) return null
        return doc
    }


    public async getLedgerBalance(userId: string): Promise<UserAccountBalanceVM> {
        const index = this.seed.findIndex((d) => d.id === userId)
        if (index === -1) throw new NotFoundError(`ledger for user with ID: ${userId} not found`)
        const userLedger = this.seed[index]
        const balance =  userLedger.transactions.reduce(calculateBalance, 0)
        return UserAccountBalanceSchema.parse({balance})
    }

}