const { PrismaClient } = require("@prisma/client");
const projectsJson = require("./csvjson.json");
const dataJson = require("./data.json");

const prisma = new PrismaClient();

async function main() {
    await prisma.category.deleteMany();
    await prisma.category.createMany({
        data: dataJson.categories.map((category, i) => {
            return { id: i + 1, name: category };
        }),
    });
    await prisma.scheduledProject.deleteMany();
    await prisma.project.deleteMany();
    const categories = (await prisma.category.findMany()).map(
        (category) => category.name
    );
    const projectArray = projectsJson.map((project) => {
        const modifiedProject = { ...project };
        modifiedProject.types = modifiedProject.types.split(", ");
        modifiedProject.categories = {
            connect: modifiedProject.categories
                .split(", ")
                .filter((category) => categories.includes(category))
                .map((category) => {
                    return { name: category };
                }),
        };
        modifiedProject.createdAt = new Date(modifiedProject.createdAt * 1000);
        modifiedProject.updatedAt = new Date(modifiedProject.updatedAt * 1000);
        if (!modifiedProject.minParticipants) {
            delete modifiedProject.minParticipants;
        }
        if (!modifiedProject.maxParticipants) {
            delete modifiedProject.maxParticipants;
        }
        return modifiedProject;
    });
    projectArray.forEach(
        async (project) => await prisma.project.create({ data: project })
    );

    await prisma.day.deleteMany();
    await prisma.day.createMany({
        data: [1, 2, 3, 4, 5, 6, 7]
            .map((week) =>
                [0, 1, 2, 3, 4].map((day) => {
                    return {
                        week,
                        day,
                        year: 2024,
                    };
                })
            )
            .flat(),
    });
    await prisma.staff.deleteMany();
    await prisma.staff.createMany({
        data: dataJson.staff.map((staff, i) => {
            return { id: i + 1, name: staff };
        }),
    });

    await prisma.room.deleteMany();
    await prisma.room.createMany({
        data: dataJson.rooms.map((room, i) => {
            return { id: i + 1, name: room };
        }),
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
