const prisma = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

async function seed() {
    console.log("Seeding the database.");
    await prisma.user.deleteMany({});
    await prisma.about.deleteMany({});
    await prisma.policy.deleteMany({});
    await prisma.dates.deleteMany({});

    try {
        //User
        const gina = await prisma.user.create({
            data: {
                username: "gvandellos",
                password: bcrypt.hashSync("B@thSo@kT1me", SALT_COUNT),
                email: "ginavandellos@hotmail.com",
                phone: "(650) 868 - 3285",
                blurb1: "I have been teaching private piano and voice lessons on the peninsula for over 25 years.",
                blurb2: "My teaching philosophy consists of providing a warm, supportive atmosphere where students can excel.  I give careful attention to technique to ease the delivery of the music.",
                blurb3: "I am an active member of the Music Teachers Association of California and the National Association of Teachers of Singing."
            }
        })

        //About
        const bio = await prisma.about.createMany({
            data: [
                {
                    paragraph: "GINA VANDELLOS, teacher of voice and piano, began her musical training in piano at age 5 and her vocal training with her father, Donald Stenberg, noted professor of voice at the San Francisco Conservatory of Music.  Her vocal talent was recognized in High School when she was regional winner in the California Music Educator's state-wide vocal competition.  As a voice and piano major she attended the University of Oregon, the Aspen School of Music, and graduated from the University of Southern California with a major in performance.  Her teachers have included James Miller, Michael Sells, and Glenna Maurice."
                },
                {
                    paragraph: "As soprano soloist, Gina has performed in churches and recitals.  She has appeared with the San Francisco Lamplighters, as a soloist with the Early Music Guild Orchestra in Oregon, and as a soloist and member of the San Francisco Chamber Singers. She has done voice-over work for computer games and has performed for movie soundtracks.  Gina often solos with her husband, Dimitri Vandellos, nationally acclaimed jazz guitarist."
                },
                {
                    paragraph: "Her vocal students have performed principle and supportive roles in high school musicals throughout the San Mateo County, and in companies such as the Hillbarn Theater, the Bus Barn Stage Theater, Broadway by the Bay, and the San Francisco Lamplighters. Some have gone on to perform in musical theater on Broadway in New York City and in national musical theater touring companies."
                },
                {
                    paragraph: "Gina has been teaching voice and piano for 20 years and maintains her studio at her home in San Carlos.  Gina Vandellos is a member of the Music Teachers' Association of California and the National Association of Teachers of Singing.  She is currently the chair person for Certificate of Merit in the San Mateo County Music Teacher's Association."
                },
                {
                    paragraph: "In her teaching, Gina Vandellos emphasizes a sound technique and musicianship while instilling in her students the joys of making music Participation in recitals and group class meetings is encouraged to help students gain confidence and poise performing before an audience.  Her students participate in the state Certificate of Merit program of the Music Teacher's Association of California.  Many of  her students have been honored to perform at the Music Teacher's Association's annual Conventions."
                }
            ]
        })

        //Policy
        const content = await prisma.policy.createMany({
            data: [
                {
                    content: "I bill a flat monthly fee for the school year (Sept - May). Payment is due at the first lesson of each month."
                },
                {
                    content: "Summer lessons (June - Aug) are billed on a per lesson basis to accommodate changing schedules."
                },
                {
                    content: "I accept cash, checks, PayPal, and Venmo."
                },
                {
                    content: "A weekly lesson time is reserved for your student and regular attendance is necessary for steady progress. If you need to cancel a lesson, please notify me twenty-four hours in advance. This will guarantee a make-up or credit for the lesson. If I receive less than 24 hours notice, you will be required to pay for the lesson. If I am unable to teach a scheduled lesson, you will be given a credit or a refund for the lesson."
                },
                {
                    content: "Certificate of Merit registration and fees will be processed in September."
                },
                {
                    content: "More information coming soon"
                },
            ]
        })
        //Dates
        const dates = await prisma.dates.createMany({
            data: [
                {
                    start: new Date("September 18, 2023"),
                    end: new Date("September 22, 2023"),
                    title: "No lessons",
                    allDay: true
                },
                {
                    start: new Date("November 10, 2023"),
                    end: new Date("November 10, 2023"),
                    title: "No lessons",
                    allDay: true
                },
                {
                    start: new Date("November 13, 2023"),
                    end: new Date("November 24, 2023"),
                    title: "No lessons",
                    allDay: true
                },
                {
                    start: new Date("December 25, 2023"),
                    end: new Date("December 29, 2023"),
                    title: "No lessons",
                    allDay: true
                },
                {
                    start: new Date("January 1, 2024"),
                    end: new Date("January 5, 2024"),
                    title: "No lessons",
                    allDay: true
                },
                {
                    start: new Date(2024, 1, 19),
                    end: new Date(2024, 1, 24),
                    title: "No lessons",
                    allDay: true
                },
                {
                    start: new Date(2024, 3, 8),
                    end: new Date(2024, 3, 13),
                    title: "No lessons",
                    allDay: true
                },
                {
                    start: new Date(2024, 3, 6, 15), //location: Redwood Shores Library
                    end: new Date(2024, 3, 6, 15),
                    title: "Piano Class",
                    location: "Redwood Shores Library"
                },
                {
                    start: new Date(2024, 1, 17, 15),
                    end: new Date(2024, 1, 17, 16),
                    title: "Piano Class",
                    location: "Redwood Shores Library"
                },
                {
                    start: new Date(2024, 4, 4, 16),
                    end: new Date(2024, 4, 4, 17),
                    title: "Piano Recital",
                    location: "Redwood Shores Library"
                },
            ]
        })

        console.log("Database is seeded.")
    } catch (error) {
        console.error(error);
    }
}

seed().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})