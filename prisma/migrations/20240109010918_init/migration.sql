-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "about" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Policy" (
    "id" SERIAL NOT NULL,
    "instrument" TEXT NOT NULL,
    "rate30" INTEGER NOT NULL,
    "rate45" INTEGER NOT NULL,
    "recitals" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "summer" TEXT NOT NULL,
    "cm" TEXT NOT NULL,

    CONSTRAINT "Policy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dates" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "about" TEXT NOT NULL,

    CONSTRAINT "Dates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CM" (
    "id" SERIAL NOT NULL,
    "goals" TEXT NOT NULL,
    "evals" TEXT NOT NULL,
    "awards" TEXT NOT NULL,

    CONSTRAINT "CM_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");
