import { LedgerEntryDTO, LedgerEntryVM } from '../models/ledger/ledger-schema';
import { UserAccountBalanceVM } from '../models/users/user-schema';

export interface LedgerRepository {
    addIncrementToLedger(userId: string, transactionId:string, ledgerEntry: LedgerEntryDTO): Promise<void>

    addDecrementToLedger(userId: string, transactionId:string, ledgerEntry: LedgerEntryDTO): Promise<void>

    getLedgerBalance(userId: string): Promise<UserAccountBalanceVM>

    getWithdrawalReversal(userId: string, reversedTransactionId: string): Promise<LedgerEntryVM | null>
}