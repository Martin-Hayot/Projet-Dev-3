const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

require("dotenv").config();

async function main() {
    const antoine = await prisma.user.upsert({
        where: {email: "geonet@mail.com"},
        update: {
            firstName: "Antoine",
            lastName: "Geonet",
            email: "geonet@mail.com",
            orders: {
                create: {
                    feedback: "An order",
                    mastering: {
                        create: {
                            masteringType: "Analogic tfx-53",
                            price: 54.99
                        }
                    }
                }
            }
        },
        create: {
            firstName: "Antoine",
            lastName: "Geonet",
            email: "geonet@mail.com",
            orders: {
                create: {
                    feedback: "An order",
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
        where: {email: "dupont@mail.com"},
        update: {
            firstName: "Julie",
            lastName: "Dupont",
            email: "dupont@mail.com",
            meeting: {
                create: {
                    date: new Date()
                }
            }
        },
        create: {
            firstName: "Julie",
            lastName: "Dupont",
            email: "dupont@mail.com",
            meeting: {
                create: {
                    date: new Date()
                }
            }
        }
    });
    console.log({ antoine, julie});
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
