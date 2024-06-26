-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreEvent" (
    "id" SERIAL NOT NULL,
    "eventName" TEXT NOT NULL,
    "eventDescription" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "country" TEXT,
    "city" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "meetingLink" TEXT,
    "email" TEXT NOT NULL,
    "tittle" TEXT NOT NULL,
    "ticketPrice" TEXT,
    "firstName" TEXT NOT NULL,
    "middleName" TEXT,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "websiteLink" TEXT,
    "facebookLink" TEXT,
    "instagramLink" TEXT,
    "twitterLink" TEXT,

    CONSTRAINT "StoreEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
