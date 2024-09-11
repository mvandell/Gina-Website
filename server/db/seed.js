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
                    paragraph: "Growing up in Burlingame in a musical family, I began piano lessons at the age of five, nurtured by my mother's piano instruction and my father's voice coaching. This early exposure to music has instilled in me a profound passion for musical expression. Drawing from my extensive background in teaching, I endeavor to convey this passion to each student I encounter."
                },
                {
                    paragraph: "I hold a degree in vocal performance from the esteemed University of California, Los Angeles (USC). With over three decades of experience as a music educator, I have had the privilege of teaching in San Carlos. My commitment to professional growth has led me to become a member of both the California Music Teachers Association (MTAC) and the National Teachers of Singing (NATS)."
                },
                {
                    paragraph: "My students have consistently demonstrated remarkable achievements. They have been honored with awards at the prestigious MTAC State CM Honors Recitals, San Mateo County Honors Recitals and several have also secured accolades at the MTAC State Improvisation and Composer's Recitals."
                },
                {
                    paragraph: "In my lessons, my objective is to share the profound joy of creating music. I tailor each lesson to meet the unique needs of each student, incorporating creativity, humor, and inspiration to engage them effectively. My ultimate goal is to motivate and inspire students, empowering them to reach their musical aspirations. I firmly believe that sound technique, achieved through relaxation and ease, is essential for delivering music with clarity and expression."
                },
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