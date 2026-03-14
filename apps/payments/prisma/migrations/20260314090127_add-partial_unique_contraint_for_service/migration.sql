-- DropIndex
CREATE UNIQUE INDEX unique_paid_subscription_invoice ON "Invoice" ("subscriptionId") WHERE status = 'PAID';
