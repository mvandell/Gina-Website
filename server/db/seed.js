// TODO: seed the DB using Prisma
const prisma = require("./client");
const bcrypt = require("bcrypt");
const SALT_COUNT = 10;

async function seed() {
    console.log("Seeding the database.");
    await prisma.admin.deleteMany();
    await prisma.policy.deleteMany();
    await prisma.dates.deleteMany();
    await prisma.merit.deleteMany();

    try {
        //Admin
        const gina = await prisma.admin.create({
            data: {
                username: "gvandellos",
                password: bcrypt.hashSync("B@thSo@kT1me", SALT_COUNT),
                email: "ginavandellos@hotmail.com",
                phone: "(650) 868 - 3285",
                about: "GINA VANDELLOS, teacher of voice and piano, began her musical training in piano at age 5 and her vocal training with her father, Donald Stenberg, noted professor of voice at the San Francisco Conservatory of Music.  Her vocal talent was recognized in High School when she was regional winner in the California Music Educator's state-wide vocal competition.  As a voice and piano major she attended the University of Oregon, the Aspen School of Music, and graduated from the University of Southern California with a major in performance.  Her teachers have included James Miller, Michael Sells, and Glenna Maurice. As soprano soloist, Gina has performed in churches and recitals.  She has appeared with the San Francisco Lamplighters, as a soloist with the Early Music Guild Orchestra in Oregon, and as a soloist and member of the San Francisco Chamber Singers. She has done voice-over work for computer games and has performed for movie soundtracks.  Gina often solos with her husband, Dimitri Vandellos, nationally acclaimed jazz guitarist. Her vocal students have performed principle and supportive roles in high school musicals throughout the San Mateo County, and in companies such as the Hillbarn Theater, the Bus Barn Stage Theater, Broadway by the Bay, and the San Francisco Lamplighters. Some have gone on to perform in musical theater on Broadway in New York City and in national musical theater touring companies. Gina has been teaching voice and piano for 20 years and maintains her studio at her home in San Carlos.  Gina Vandellos is a member of the Music Teachers' Association of California and the National Association of Teachers of Singing.  She is currently the chair person for Certificate of Merit in the San Mateo County Music Teacher's Association. In her teaching, Gina Vandellos emphasizes a sound technique and musicianship while instilling in her students the joys of making music Participation in recitals and group class meetings is encouraged to help students gain confidence and poise performing before an audience.  Her students participate in the state Certificate of Merit program of the Music Teacher's Association of California.  Many of  her students have been honored to perform at the Music Teacher's Association's annual Conventions."
            }
        })

        //Policy
        const piano = await prisma.policy.create({
            data: {
                instrument: "piano",
                rate30: 52,
                rate45: 67,
                school: "Sept - May",
                summer: "June - Aug",
                cm: "CM piano evaluations will be held in the spring. I will let you know the specific dates by the end of September. Certificate of Merit studio fee will be billed in November."
            }
        })
        const voice = await prisma.policy.create({
            data: {
                instrument: "voice",
                rate30: 55,
                rate45: 70,
                school: "Sept - May",
                summer: "June - Aug",
                cm: "CM voice evaluations will be held in the spring. I will let you know the specific dates by the end of September. Certificate of Merit studio fee will be billed in November."
            }
        })

        //Dates
        const dates = await prisma.dates.createMany({
            data: [
                {
                    date: "2021-09-07",
                    about: "No lessons"
                },
                {
                    date: "2021-11-11",
                    about: "No lessons"
                },
                {
                    date: "2021-11-24",
                    about: "No lessons"
                },
                {
                    date: "2021-11-25",
                    about: "No lessons"
                },
                {
                    date: "2021-11-26",
                    about: "No lessons"
                },
                {
                    date: "2021-11-27",
                    about: "No lessons"
                },
                {
                    date: "2021-10-30",
                    about: "No lessons"
                },
                {
                    date: "2021-12-18",
                    about: "No lessons"
                },
                {
                    date: "2021-12-19",
                    about: "No lessons"
                },
                {
                    date: "2021-12-20",
                    about: "No lessons"
                },
                {
                    date: "2021-12-21",
                    about: "No lessons"
                },
                {
                    date: "2021-12-22",
                    about: "No lessons"
                },
                {
                    date: "2021-12-23",
                    about: "No lessons"
                },
                {
                    date: "2021-12-24",
                    about: "No lessons"
                },
                {
                    date: "2021-12-25",
                    about: "No lessons"
                },
                {
                    date: "2021-12-26",
                    about: "No lessons"
                },
                {
                    date: "2021-12-27",
                    about: "No lessons"
                },
                {
                    date: "2021-12-28",
                    about: "No lessons"
                },
                {
                    date: "2021-12-29",
                    about: "No lessons"
                },
                {
                    date: "2021-12-30",
                    about: "No lessons"
                },
                {
                    date: "2021-12-31",
                    about: "No lessons"
                },
                {
                    date: "2022-01-01",
                    about: "No lessons"
                },
                {
                    date: "2022-01-18",
                    about: "No lessons"
                },
                {
                    date: "2022-03-29",
                    about: "No lessons"
                },
                {
                    date: "2022-03-30",
                    about: "No lessons"
                },
                {
                    date: "2022-03-31",
                    about: "No lessons"
                },
                {
                    date: "2022-04-01",
                    about: "No lessons"
                },
                {
                    date: "2022-04-02",
                    about: "No lessons"
                },
                {
                    date: "2022-05-25",
                    about: "No lessons"
                },
                {
                    date: "2022-05-26",
                    about: "No lessons"
                },
                {
                    date: "2022-05-27",
                    about: "No lessons"
                },
                {
                    date: "2022-05-28",
                    about: "No lessons"
                },
                {
                    date: "2022-05-29",
                    about: "No lessons"
                },
                {
                    date: "2022-05-30",
                    about: "No lessons"
                },
                {
                    date: "2022-05-31",
                    about: "No lessons"
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