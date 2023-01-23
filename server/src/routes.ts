import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";

dayjs.extend(utc);

interface Err extends Error {
  message: string;
  name: string;
}

export async function appRoutes(app: FastifyInstance) {
  app.post("/habits", async (request) => {
    const createdHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });

    const { title, weekDays } = createdHabitBody.parse(request.body);

    const today = dayjs().startOf("day").toDate();

    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        weekDays: {
          create: weekDays.map((weekday) => {
            return {
              week_day: weekday,
            };
          }),
        },
      },
    });

    console.log({ title, weekDays });

    return { title, weekDays };
  });

  app.get("/day", async (request) => {
    const getDayParams = z.object({
      date: z.coerce.date(),
    });

    const { date } = getDayParams.parse(request.query);

    const weekDay = dayjs.utc(date).get("day");

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date,
        },
        weekDays: {
          some: {
            week_day: weekDay,
          },
        },
      },
    });

    const day = await prisma.day.findUnique({
      where: {
        date: dayjs(date).startOf("day").toDate(),
      },
      include: {
        dayHabits: true,
      },
    });

    const completedHabits = day?.dayHabits.map((dayHabit) => dayHabit.habit_id);

    return { possibleHabits, completedHabits };
  });
}
