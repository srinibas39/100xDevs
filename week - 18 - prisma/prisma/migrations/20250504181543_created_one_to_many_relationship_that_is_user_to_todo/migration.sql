-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Todo" ADD CONSTRAINT "Todo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
