export interface invoiceInterface {
    id: string,
    createdAt: string,
    paymentDue: string,
    description: string,
    paymentTerms: number,
    clientName: string,
    clientEmail: string,
    status: string,
    senderAddress: object,
    clientAddress: object,
    items: Array<object>,
    total: number,
}