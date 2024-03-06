/*
  Warnings:

  - The values [Conscious] on the enum `Rating` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Rating_new" AS ENUM ('International', 'Nation', 'Province');
ALTER TABLE "Location" ALTER COLUMN "rating" TYPE "Rating_new" USING ("rating"::text::"Rating_new");
ALTER TYPE "Rating" RENAME TO "Rating_old";
ALTER TYPE "Rating_new" RENAME TO "Rating";
DROP TYPE "Rating_old";
COMMIT;
