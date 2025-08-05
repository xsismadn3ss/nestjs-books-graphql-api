-- CreateTable
CREATE TABLE "public"."Author" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Author_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Book" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_BooksAuthors" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BooksAuthors_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Author_name_key" ON "public"."Author"("name");

-- CreateIndex
CREATE INDEX "Author_name_idx" ON "public"."Author"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Book_name_key" ON "public"."Book"("name");

-- CreateIndex
CREATE INDEX "Book_name_description_idx" ON "public"."Book"("name", "description");

-- CreateIndex
CREATE INDEX "_BooksAuthors_B_index" ON "public"."_BooksAuthors"("B");

-- AddForeignKey
ALTER TABLE "public"."_BooksAuthors" ADD CONSTRAINT "_BooksAuthors_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_BooksAuthors" ADD CONSTRAINT "_BooksAuthors_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
