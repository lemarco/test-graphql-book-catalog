-- DropForeignKey
ALTER TABLE "BookAuthor" DROP CONSTRAINT "BookAuthor_author_id_fkey";

-- AddForeignKey
ALTER TABLE "BookAuthor" ADD CONSTRAINT "BookAuthor_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;
