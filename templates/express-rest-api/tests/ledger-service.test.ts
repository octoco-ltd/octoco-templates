import {describe, test, expect, beforeEach, afterEach} from '@jest/globals'
import { InMemoryLedgerRepository } from '../src/repositories/memory/in-memory-ledger-repository';
import {  LedgerEntryVM, TransactionTypeEnum } from '../src/models/ledger/ledger-schema';
import { LedgerService } from '../src/services/ledger-service';

var ledgerService: LedgerService
const ledgerRepo = new InMemoryLedgerRepository([])

const userId = 'ExistingUserID'

const existingLedgerEntryInDB: LedgerEntryVM = {
    id: 'existing',
    amount: 50,
    game: 'pulse',
    type: TransactionTypeEnum.enum.DEPOSIT,
    createdAt: new Date()
}

beforeEach(() =>{
    ledgerRepo.seedLedger([{id: userId, transactions: [existingLedgerEntryInDB]}])
    ledgerService = new LedgerService(ledgerRepo)
})

afterEach(() =>{
    ledgerRepo.clearSeed()
})

describe('the ledger service', () => {
    test('that the balance is calculated correctly when no transaction occur after the initial deposit', async () => {
        const res = await ledgerService.getUserLedgerBalance(userId)
        expect(res.balance).toBe(50)
    })

    test('that a deposit can be added and that the balance can be calculated correctly', async () => {
        const newDepositId = 'newDeposit'
        const newDepositGame = 'pulse'
        const newDepositAmount = 25
        await ledgerService.addDepositToLedger(userId, newDepositId, newDepositGame, newDepositAmount)
        const res = await ledgerService.getUserLedgerBalance(userId)
        expect(res.balance).toBe(75)
    })

    test('that a winnings can be added and that the balance can be calculated correctly', async () => {
        const newWinningsId = 'newWinnings'
        const newWinningsGame = 'pulse'
        const newWinningsAmount = 25
        await ledgerService.addWinningsToLedger(userId, newWinningsId, newWinningsGame, newWinningsAmount)
        const res = await ledgerService.getUserLedgerBalance(userId)
        expect(res.balance).toBe(75)
    })

    test('that a withdrawal can be added and that the balance can be calculated correctly', async () => {
        const newWithdrawalId = 'newWithdrawal'
        const newWithdrawalGame = 'pulse'
        const newWithdrawalAmount = 25
        await ledgerService.addWithdrawalToLedger(userId, newWithdrawalId, newWithdrawalGame, newWithdrawalAmount)
        const res = await ledgerService.getUserLedgerBalance(userId)
        expect(res.balance).toBe(25)
    })

    test('that a bet can be added and that the balance can be calculated correctly', async () => {
        const newBetId = 'newBet'
        const newBetGame = 'pulse'
        const newBetAmount = 25
        await ledgerService.addBetToLedger(userId, newBetId, newBetGame, newBetAmount)
        const res = await ledgerService.getUserLedgerBalance(userId)
        expect(res.balance).toBe(25)
    })

    test('that an error is thrown if the user\'s balance is too low', async () => {
        const newBetId = 'newBet'
        const newBetGame = 'pulse'
        const newBetAmount = 100
        const res = ledgerService.addBetToLedger(userId, newBetId, newBetGame, newBetAmount)
        await expect(res).rejects.toThrow('You have insufficient funds to complete this transaction')
    })
})

