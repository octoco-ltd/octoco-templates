import { LedgerRepository } from '../repositories/ledger-repository';
import { LedgerEntryDTO, LedgerEntryVM, TransactionTypeEnum } from '../models/ledger/ledger-schema';
import { UserAccountBalanceVM } from '../models/users/user-schema';
import { uuid } from 'uuidv4';


export class LedgerService {
    constructor(private ledgerRepo: LedgerRepository) {}

    public async getUserLedgerBalance(userId: string): Promise<UserAccountBalanceVM> {
        return await this.ledgerRepo.getLedgerBalance(userId)
    }

    public async addDepositToLedger(userId: string, transactionId: string, game: string, amount: number): Promise<void> {
        const depositLedgerEntryToAdd: LedgerEntryDTO = {
            type: TransactionTypeEnum.enum.DEPOSIT,
            amount,
            game,
        }

        await this.ledgerRepo.addIncrementToLedger(userId, transactionId, depositLedgerEntryToAdd)
    }

    public async addWinningsToLedger(userId: string, transactionId: string, game: string, amount: number): Promise<void> {
        const depositLedgerEntryToAdd: LedgerEntryDTO = {
            type: TransactionTypeEnum.enum.WINNINGS,
            amount,
            game,
        }

        await this.ledgerRepo.addIncrementToLedger(userId, transactionId, depositLedgerEntryToAdd)
    }

    public async addWithdrawalToLedger(userId: string, transactionId: string, game: string, amount: number): Promise<void> {
        const withdrawalLedgerEntryToAdd: LedgerEntryDTO = {
            type: TransactionTypeEnum.enum.WITHDRAWAL,
            amount,
            game,
        }

        await this.ledgerRepo.addDecrementToLedger(userId, transactionId, withdrawalLedgerEntryToAdd)
    }

    public async addWithdrawalReversal(userId: string, reversedTransactionId: string, game: string, amount: number): Promise<void> {
        const transactionId = uuid()
        const withdrawalReversalLedgerEntryToAdd: LedgerEntryDTO = {
            type: TransactionTypeEnum.enum['WITHDRAWAL-REVERSAL'],
            reversedTransactionId: reversedTransactionId,
            amount,
            game,
        }

        await this.ledgerRepo.addDecrementToLedger(userId, transactionId, withdrawalReversalLedgerEntryToAdd)
    }

    public async getWithdrawalReversal(userId: string, reversedTransactionId: string): Promise<LedgerEntryVM | null> {
        console.info('getWithdrawalReversal - LedgerService')
        return this.ledgerRepo.getWithdrawalReversal(userId, reversedTransactionId)
    }

    public async addBetToLedger(userId: string, transactionId: string, game: string, amount: number): Promise<void> {
        const depositLedgerEntryToAdd: LedgerEntryDTO = {
            type: TransactionTypeEnum.enum.TRADE,
            amount,
            game,
        }

        await this.ledgerRepo.addDecrementToLedger(userId, transactionId, depositLedgerEntryToAdd)
    }


}