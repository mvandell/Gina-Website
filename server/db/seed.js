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
                phone: "(650) 868 - 3285"
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
        //Piano
        const pianoBilling = await prisma.policy.create({
            data: {
                instrument: "piano",
                heading: "Billing and Fees",
                headingId: null
            }
        })
        const pianoCM = await prisma.policy.create({
            data: {
                instrument: "piano",
                heading: "Certificate of Merit (CM)",
                headingId: null
            }
        })
        const pianoNoLessons = await prisma.policy.create({
            data: {
                instrument: "piano",
                heading: "No lessons on Mondays and the following dates:",
                headingId: null
            }
        })
        const pianoClasses = await prisma.policy.create({
            data: {
                instrument: "piano",
                heading: "Performance Classes and Recitals",
                headingId: null
            }
        })
        const pianoCommunication = await prisma.policy.create({
            data: {
                instrument: "piano",
                heading: "Communication",
                headingId: null
            }
        })
        const pianoParking = await prisma.policy.create({
            data: {
                instrument: "piano",
                headingId: null,
                heading: "Parking and Waiting",
            }
        })
        const pianoContent = await prisma.policy.createMany({
            data: [
                {
                    instrument: "piano",
                    headingId: pianoBilling.id,
                    content: "School Year (Sept - May)"
                },
                {
                    instrument: "piano",
                    headingId: pianoBilling.id,
                    content: "I bill a flat monthly fee for the school year. This is based on 32 lessons per school year (9 months). The rate per lesson averages out to $55 for a 30-minute lesson and $70 for a 45-minute lesson. Payment is due at the first lesson of each month. I accept cash, checks, PayPal, and Venmo."
                },
                {
                    instrument: "piano",
                    headingId: pianoBilling.id,
                    content: "The monthly fee is:"
                },
                {
                    instrument: "piano",
                    headingId: pianoBilling.id,
                    content: "$200 for 30-minute lessons"
                },
                {
                    instrument: "piano",
                    headingId: pianoBilling.id,
                    content: "$255 for 45-minute lessons"
                },
                {
                    instrument: "piano",
                    headingId: pianoBilling.id,
                    content: "Summer lessons (June - Aug)"
                },
                {
                    instrument: "piano",
                    headingId: pianoBilling.id,
                    content: "Are billed on a per lesson basis to accommodate changing schedules."
                },
                {
                    instrument: "piano",
                    headingId: pianoBilling.id,
                    content: "A weekly lesson time is reserved for your student and regular attendance is necessary for steady progress. If you need to  cancel a lesson, please notify me twenty-four hours in advance. This will guarantee a make-up or credit for the lesson.  If I receive less than 24 hours notice, you will be required to pay for the lesson. If I am unable to teach a scheduled  lesson, you will be given a credit or a refund for the lesson."
                },
                {
                    instrument: "piano",
                    headingId: pianoCM.id,
                    content: "Certificate of Merit registration and fees will be processed in September."
                },
                {
                    instrument: "piano",
                    headingId: pianoNoLessons.id,
                    content: "September 18-22, November 10, November 13-24, December 25-29, January 1-5, February 19-23, April 8-12"
                },
                {
                    instrument: "piano",
                    headingId: pianoClasses.id,
                    content: "More information coming soon"
                },
                {
                    instrument: "piano",
                    headingId: pianoCommunication.id,
                    content: "Please communicate to me via email or text. Text is especially helpful if you need to inform me of a same day cancellation."
                },
                {
                    instrument: "piano",
                    headingId: pianoParking.id,
                    content: "Please try to park directly in front of my house during the lesson and take care not to block the  driveway. Parents, while you wait feel free to use the chairs on my front porch or have a seat in the studio."
                },
                {
                    instrument: "piano",
                    headingId: pianoParking.id,
                    content: "I look forward to a highly productive year! Please don't hesitate to contact me if you have any questions about my  policy or any other matter."
                },
            ]
        })
        //Voice
        const voiceBilling = await prisma.policy.create({
            data: {
                instrument: "voice",
                headingId: null,
                heading: "Billing and Fees"
            }
        })
        const voiceNoLessons = await prisma.policy.create({
            data: {
                instrument: "voice",
                heading: "No lessons on Mondays and the following dates:",
                headingId: null
            }
        })
        const voiceClasses = await prisma.policy.create({
            data: {
                instrument: "voice",
                headingId: null,
                heading: "Performance Workshops and Recitals"
            }
        })
        const voiceCM = await prisma.policy.create({
            data: {
                instrument: "voice",
                headingId: null,
                heading: "Certificate of Merit"
            }
        })
        const voiceCommunication = await prisma.policy.create({
            data: {
                instrument: "voice",
                headingId: null,
                heading: "Communication"
            }
        })
        const voiceParking = await prisma.policy.create({
            data: {
                instrument: "voice",
                headingId: null,
                heading: "Parking and Waiting"
            }
        })
        const voiceContent = await prisma.policy.createMany({
            data: [
                {
                    instrument: "voice",
                    headingId: voiceBilling.id,
                    content: "Lessons are $75 for a 45-minute lesson beginning in September. Payment is on a monthly basis. I will email you a bill at the beginning of the month for the previous month's lessons. I accept cash, checks, PayPal and Venmo."
                },
                {
                    instrument: "voice",
                    headingId: voiceBilling.id,
                    content: "A weekly lesson time is reserved for your student and regular attendance is necessary for steady progress. If you need to cancel a lesson, please notify me 24 hours in advance. If I receive less than 24-hour notice, you will be required to pay for the lesson. If I am unable to teach a scheduled lesson, you will be given credit or a refund for the lesson."
                },
                {
                    instrument: "voice",
                    headingId: voiceNoLessons.id,
                    content: "September 18 - 22, November 13 - 24, December 25 - 29, January 1 - 5"
                },
                {
                    instrument: "voice",
                    headingId: voiceClasses.id,
                    content: "More information coming soon."
                },
                {
                    instrument: "voice",
                    headingId: voiceCM.id,
                    content: "Certificate of Merit registration and fees will be processed in September."
                },
                {
                    instrument: "voice",
                    headingId: voiceCommunication.id,
                    content: "Please communicate to me thru email and text. Text is especially helpful if you need to inform me of a same day cancellation."
                },
                {
                    instrument: "voice",
                    headingId: voiceParking.id,
                    content: "Please try to park directly in front of my house during the lesson and take care not to block the driveway. Parents, while you wait feel free to use the chairs on my front porch or have a seat in the studio."
                },
                {
                    instrument: "voice",
                    headingId: voiceParking.id,
                    content: "I look forward to a highly productive year! Please don't hesitate to contact me if you have any questions about my policy or any other matter."
                }
            ]
        })
        //Dates
        const dates = await prisma.dates.createMany({
            data: [
                {
                    start: new Date("September 18, 2023"),
                    end: new Date("September 22, 2023"),
                    title: "No lessons",
                    allDay: true,
                    instrument: "both"
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
                    allDay: true,
                    instrument: "both"
                },
                {
                    start: new Date("December 25, 2023"),
                    end: new Date("December 29, 2023"),
                    title: "No lessons",
                    allDay: true,
                    instrument: "both"
                },
                {
                    start: new Date("January 1, 2024"),
                    end: new Date("January 5, 2024"),
                    title: "No lessons",
                    allDay: true,
                    instrument: "both"
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