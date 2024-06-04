const { PrismaClient } = require("@prisma/client");
const projectsJson = require("./project_data.json");
const dataJson = require("./data.json");
const jsonStaff = dataJson.staff;
const jsonCategories = dataJson.categories;
const jsonRooms = dataJson.rooms;
const weekExampleJson = require("./week_1_example_2023.json");
const exampleSchedule = weekExampleJson.schedule;
const exampleRundowns = weekExampleJson.rundown;
const exampleSatellites = weekExampleJson.satellites;

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
    const staffList = await prisma.staff.createManyAndReturn({
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
    await prisma.week.deleteMany();
    const years = [2030, 2029, 2028, 2027, 2026, 2025, 2024, 2023, 2022, 2021];
    const weeks = [1, 2, 3, 4, 5, 6, 7];
    const weeksDatabase = await prisma.week.createManyAndReturn({
        data: years
            .map((year) =>
                weeks.map((week) => ({
                    week,
                    year,
                }))
            )
            .flat(),
    });
    await prisma.day
        .createManyAndReturn({
            data: weeksDatabase
                .map((week) =>
                    [0, 1, 2, 3, 4].map((day) => ({
                        weekId: week.id,
                        day: day,
                    }))
                )
                .flat(),
            include: {
                week: true,
            },
        })
        .then((days) => {
            [0, 1, 2, 3, 4].forEach(async (i) => {
                await prisma.day.update({
                    where: {
                        id: days.find(
                            (d) =>
                                d.day == i &&
                                d.week.week == 1 &&
                                d.week.year == 2023
                        ).id,
                    },
                    data: {
                        rundown: exampleRundowns[i]
                            ? {
                                  connect: exampleRundowns[i].map((s) => ({
                                      name: s,
                                  })),
                              }
                            : null,
                        satellites: exampleSatellites[i]
                            ? {
                                  connect: exampleSatellites[i].map((s) => ({
                                      name: s,
                                  })),
                              }
                            : null,
                    },
                });
            });
        });

    await prisma.room.deleteMany();
    const roomList = await prisma.room.createManyAndReturn({
        data: Object.entries(getYearsObject(jsonRooms)).map(([s, years]) => {
            return { name: s, years: years };
        }),
    });

    const projectNames = [];
    exampleSchedule.forEach(async (proj) => {
        const types = [];
        if (proj.types.includes("A")) types.push("Analytical");
        if (proj.types.includes("C")) types.push("Creative");
        if (proj.types.includes("E")) types.push("Engineering");

        const rooms = proj.rooms
            .split(",")
            .filter((r) => r.length > 0)
            .map((r) => ({ name: r.trim() }));
        const staff = proj.staff
            .split(",")
            .filter((r) => r.length > 1)
            .map((r) => ({ name: r.trim() }));
        const name = proj.fullName;
        const scheduleNewProject = async (dbProj) => {
            await prisma.day
                .findFirst({
                    where: {
                        week: { week: proj.week, year: proj.year },
                        day: proj.day,
                    },
                })
                .then(async (day) => {
                    try {
                        await prisma.scheduledProject.create({
                            data: {
                                name,
                                project: { connect: { id: dbProj.id } },
                                day: { connect: { id: day.id } },
                                staff: { connect: staff },
                                rooms: { connect: rooms },
                            },
                        });
                    } catch (error) {
                        console.log(proj);
                        console.log(error);
                    }
                });
        };
        if (projectNames.includes(name)) {
            await prisma.project
                .findFirst({
                    where: {
                        name,
                    },
                })
                .then(scheduleNewProject);
        } else {
            await prisma.project
                .create({
                    data: {
                        name,
                        types,
                    },
                })
                .then(scheduleNewProject);
            projectNames.push(name);
        }
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
