
export interface ExampleClient {
    registerExampleUser(uid: string, email: string): Promise<void>
}