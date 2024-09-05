/*
  Warnings:

  - The `nodes` column on the `Workflows` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `edges` column on the `Workflows` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Workflows" DROP COLUMN "nodes",
ADD COLUMN     "nodes" JSONB,
DROP COLUMN "edges",
ADD COLUMN     "edges" JSONB;
