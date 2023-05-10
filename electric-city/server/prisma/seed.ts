const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

require("dotenv").config();

async function main() {
    await prisma.agenda.deleteMany({});
    await prisma.order.deleteMany({});
    await prisma.mastering.deleteMany({});
    await prisma.user.deleteMany({});

    const antoine = await prisma.user.upsert({
        where: { email: "geonet@mail.com" },
        update: {},
        create: {
            firstName: "Antoine",
            lastName: "Geonet",
            email: "geonet@mail.com",
            password: "dev342",
            orders: {
                create: {
                    feedback: "An order",
                    numbOfTrack: 3,
                    mastering: {
                        create: {
                            masteringType: "Analogic tfx-53",
                            price: 54.99
                        }
                    }
                }
            }
        }
    });
    const julie = await prisma.user.upsert({
        where: {},
        update: {},
        create: {
            firstName: "Julie",
            lastName: "Dupont",
            email: "dupont@mail.com",
            password: "1239",
            meeting: {
                create: {
                    date: new Date(),
                    order: {
                        create: {
                            feedback: "An other order",
                            numbOfTrack: 2,
                            mastering: {
                                create: {
                                    masteringType: "Digital Firebird software",
                                    price: 32.99
                                }
                            }
                        }
                    }
                }
            }
        }
    });
    //console.log({ antoine, julie});
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
