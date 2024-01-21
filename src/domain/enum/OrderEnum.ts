export enum StatusEnum {
  "READY" , // Pronto
  "INPROGRESS", // Em Preparação
  "PENDING", // Recebido
  "CANCELED", // Cancelado
  "DELIVERED", // Finalizado
  "PAYMENT_FAIL", // Falha no Pagamento
}

export enum PaymentEnum {
  CREDITCARD,
  DEBITCARD,
  MONEY,
  PIX,
}
