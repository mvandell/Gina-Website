// TODO: seed the DB using Prisma
const prisma = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

async function seed() {
    console.log("Seeding the database.");
    await prisma.user.deleteMany();
    await prisma.policy.deleteMany();
    await prisma.dates.deleteMany();
    await prisma.merit.deleteMany();
//update policy and dates with PDF from mom
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
        const piano = await prisma.policy.createMany({
            data: [
                {
                    instrument: "piano", 
                    heading: "Billing and Fees", //Billing and Fees
                    content: "School Year (Sept - May)"
                },
                {
                    instrument: "piano",
                    content: "I bill a flat monthly fee for the school year. This is based on 32 lessons per school year (9 months). The rate per lesson averages out to $55 for a 30-minute lesson and $70 for a 45-minute lesson. Payment is due at the first lesson of each month. I accept cash, checks, PayPal, and Venmo."
                },
                {
                    instrument: "piano",
                    content: "The monthly fee is:"
                },
                {
                    instrument: "piano",
                    content: "$200 for 30-minute lessons"
                },
                {
                    instrument: "piano",
                    content: "$255 for 45-minute lessons"
                },
                {
                    instrument: "piano",
                    content: "Summer lessons (June - Aug)"
                },
                {
                    instrument: "piano",
                    content: "Are billed on a per lesson basis to accommodate changing schedules."
                },
                {
                    instrument: "piano",
                    content: "A weekly lesson time is reserved for your student and regular attendance is necessary for steady progress. If you need to  cancel a lesson, please notify me twenty-four hours in advance. This will guarantee a make-up or credit for the lesson.  If I receive less than 24 hours notice, you will be required to pay for the lesson. If I am unable to teach a scheduled  lesson, you will be given a credit or a refund for the lesson."
                },
                {
                    instrument: "piano", 
                    heading: "Certificate of Merit (CM)", //Certificate of Merit (CM)
                    content: "Certificate of Merit registration and fees will be processed in September."
                },
                {
                    instrument: "piano",
                    heading: "No lessons on Mondays and the following dates:", //No lessons
                    content: "September 18-22, November 10, November 13-24, December 25-29, January 1-5, February 19-23, April 8-12"
                },
                {
                    instrument: "piano",
                    heading: "Performance Classes and Recitals", //Performance Classes and Recitals
                    content: "More information coming soon"
                },
                {
                    instrument: "piano",
                    heading: "Communication", //Communication
                    content: "Please communicate to me via email or text. Text is especially helpful if you need to inform me of a  same day cancellation."
                },
                {
                    instrument: "piano",
                    heading: "Parking and Waiting", //Parking and Waiting
                    content: " Please try to park directly in front of my house during the lesson and take care not to block the  driveway. Parents, while you wait feel free to use the chairs on my front porch or have a seat in the studio."
                },
                {
                    instrument: "piano",
                    content: "I look forward to a highly productive year! Please don't hesitate to contact me if you have any questions about my  policy or any other matter."
                },
            ]
        })
        const voice = await prisma.policy.createMany({
            data: [
                {
                    instrument: "voice",
                    heading: "Billing and Fees",
                    content: "Lessons are 45 minutes and 30 minutes in length.  Payment is due on a monthly basis.  I will email you a bill at the beginning of the month for the previous month's lessons.  Contact me directly for specific fees."
                },
                {
                    instrument: "voice",
                    content: "A weekly lesson time is reserved and regular attendance is necessary for steady progress. If you need to cancel a lesson, you must notify me twenty-four hours in advance.  If I receive less than 24 hours notice, you will be required to pay for the lesson."
                },
                {
                    instrument: "voice",
                    content: "Music books and materials will be billed separately.  Please write a separate check for music."
                },
                {
                    instrument: "voice",
                    content: "Please go to my current Calendar to view dates for recitals, workshops, and the Certificate of Merit evaluation."
                },
                {
                    instrument: "voice",
                    heading: "Rehearsals and Recitals",
                    content: " I invite my students to participate in workshops and recitals.  Although these events are optional, they are highly recommended to build confidence in performance.  Workshop and recital fees will be equally divided up between the participants and billed accordingly. Rehearsal time with the accompanist will be billed according to each students time used."
                },
                {
                    instrument: "voice",
                    heading: "Certificate of Merit",
                    content: "Studio and registration fees will be billed in October."
                },
                {
                    instrument: "voice",
                    heading: "E-mail",
                    content: " E-mail is a great way to communicate with me!  Please send me your e-mail address.  Sending me an email to cancel or change lesson times is fine as long as you give me 24 hours notice of any changes."
                },
                {
                    instrument: "voice",
                    heading: "Parking",
                    content: "Please try to park directly in front of the house during the lesson and take care not to block the driveway."
                },
            ]
        })

        //Dates
        const dates = await prisma.dates.createMany({
            data: [
                {
                    start: new Date("September 18, 2023"),
                    end: new Date("September 22, 2023"),
                    about: "No lessons"
                },
                {
                    start: new Date(2023, 10, 10),
                    end: new Date(2023, 10, 10),
                    about: "No lessons"
                },
                {
                    start: new Date(2023, 10, 13),
                    end: new Date(2023, 10, 24),
                    about: "No lessons"
                },
                {
                    start: new Date(2023, 11, 25),
                    end: new Date(2023, 11, 29),
                    about: "No lessons"
                },
                {
                    start: new Date(2024, 0, 1),
                    end: new Date(2024, 0, 5),
                    about: "No lessons"
                },
                {
                    start: new Date(2024, 1, 19),
                    end: new Date(2024, 1, 23),
                    about: "No lessons"
                },
                {
                    start: new Date(2024, 3, 8),
                    end: new Date(2024, 3, 12),
                    about: "No lessons"
                },
                {
                    start: new Date(2024, 3, 6, 15),
                    end: new Date(2024, 3, 6, 16),
                    about: "Piano Class"
                },
                {
                    start: new Date(2024, 1, 17, 15),
                    end: new Date(2024, 1, 17, 16),
                    about: "Piano Class"
                },
                {
                    start: new Date(2024, 4, 4, 16),
                    end: new Date(2024, 4, 4, 17),
                    about: "Piano Recital"
                },
            ]
        })

        //Merit
        const merits = await prisma.merit.createMany({
            data: [
                {
                    goals: "To provide a systematic and comprehensive plan to develop performance skill, technique, ear training, sight reading and understanding of music theory",
                    evals: "Certificate of Merit students must participate in an annual evaluation of their skills. Evaluations are held from mid-February to early April. Registration is in October.",
                    awards: "Students who show exceptional skill may be selected to perform at the annual MTAC State Convention"
                },
                {
                    goals: "To develop practical goals to help students maintain a steady and focused approach to their musical studies",
                    evals: "There are two parts to the evaluation: performance and theory",
                    awards: "Senior medallions are awarded to eligible high school seniors"
                },
                {
                    goals: "To encourage students to strive for musical excellence",
                    evals: "For the performance section, the student must perform selected literature, technique elements, and sight reading",
                    awards: "Certificate of Merit is an excellent achievement to add to college applications"
                },
                {
                    goals: "To create opportunities in which students may share their music with others",
                    evals: "The theory section consists of a written exam and ear training"
                }
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