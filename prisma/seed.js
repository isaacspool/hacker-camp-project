const { PrismaClient } = require("@prisma/client");
const projectsJson = require("./project_data.json");
const dataJson = require("./data.json");
const jsonStaff = dataJson.staff;
const jsonCategories = dataJson.categories;
const jsonRooms = dataJson.rooms;
const weekExampleJson = require("./week_1_example_2023.json");

const prisma = new PrismaClient();

function getYearsObject(what) {
    let items = {};
    Object.entries(what).forEach(([year, whatsits]) => {
        whatsits.forEach((s) => {
            if (items[s]) {
                items[s].push(parseInt(year));
            } else {
                items[s] = [parseInt(year)];
            }
        });
    });
    return items;
}

async function main() {
    await prisma.category.deleteMany();
    await prisma.category.createMany({
        data: jsonCategories.map((category, i) => {
            return { id: i + 1, name: category };
        }),
    });
    await prisma.scheduledProject.deleteMany();
    await prisma.project.deleteMany();
    const categories = (await prisma.category.findMany()).map(
        (category) => category.name
    );
    await prisma.staff.deleteMany();
    const staff = getYearsObject(jsonStaff);
    await prisma.staff.createMany({
        data: Object.entries(staff).map(([s, years]) => {
            return { name: s, years: years };
        }),
    });
    const projectArray = projectsJson.map((project) => {
        const modifiedProject = { ...project };
        modifiedProject.types = modifiedProject.types
            .split(",")
            .map((t) => t.trim());
        modifiedProject.categories = {
            connect: modifiedProject.categories
                .split(", ")
                .filter((category) => categories.includes(category))
                .map((category) => {
                    return { name: category };
                }),
        };
        if (!Object.keys(staff).includes(modifiedProject.creator)) {
            console.log(modifiedProject.creator);
        }
        modifiedProject.creator = {
            connect: { name: modifiedProject.creator.trim() },
        };
        modifiedProject.createdAt = new Date(modifiedProject.createdAt * 1000);
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
        data: [2030, 2029, 2028, 2027, 2026, 2025, 2024, 2023, 2022, 2021]
            .map((year) =>
                [1, 2, 3, 4, 5, 6, 7]
                    .map((week) =>
                        [0, 1, 2, 3, 4].map((day) => {
                            return {
                                week,
                                day,
                                year,
                            };
                        })
                    )
                    .flat()
            )
            .flat(),
    });

    await prisma.room.deleteMany();
    await prisma.room.createMany({
        data: Object.entries(getYearsObject(jsonRooms)).map(([s, years]) => {
            return { name: s, years: years };
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
