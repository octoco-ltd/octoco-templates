import z from 'zod'

/*
    This enum is for the types of transactions that can occur.
    - TRADE - The amount a user bets (this is a deduction of the user's account)
    - WINNINGS - When a user wins a bet the amount that they bet plus there winnings is added to their account
    - DEPOSIT - When a user successfully completes a deposits the amount is added to their ledger. No reversals needed.
    - WITHDRAWAL - When a user starts a withdrawal this is subtracted from there account before the complete the process
    - WITHDRAWAL-REVERSAL - If the user cancels their withdrawal processes or something fails we write back the amount that was subtracted
 */
export const TransactionTypeEnum = z.enum(["TRADE", "WINNINGS", "DEPOSIT", "WITHDRAWAL", "WITHDRAWAL-REVERSAL", "TRADE-REVERSAL"])

export const LedgerEntrySchema = z.object({
    id: z.string().nonempty(),
    amount: z.number(),
    type: TransactionTypeEnum,
    createdAt: z.date(),
    // this is only needed when a transaction is reversed
    reversedTransactionId: z.string().optional(),
    //This is only needed when adding a trade
    productId: z.string().optional(),
    // this is only needed when adding winnings
    tradeId: z.string().optional(),
    // The game/CRM Instance for which the transaction occurred eg. PULSE
    game: z.string().nonempty().toUpperCase()

})

export const LedgerEntryIM = LedgerEntrySchema.omit({id: true})

export const LedgerEntryDTO = LedgerEntrySchema.omit({id: true, createdAt: true})

export type LedgerEntryVM = z.infer<typeof LedgerEntrySchema>

export type LedgerEntryIM = z.infer<typeof LedgerEntryIM>

export type LedgerEntryDTO = z.infer<typeof LedgerEntryDTO>