import type { User, Reservation, Guest } from "@prisma/client"
import { ReservationState } from "@prisma/client"
import dayjs from "dayjs"
import { prisma } from "~/app"

export type { Reservation, ReservationState } from "@prisma/client"

export async function getReservationsInXDays(days: number) {
  const inDays = dayjs().add(days, "days").toDate()
  const inDaysPlusOne = dayjs(inDays).add(1, "day").toDate()
  return prisma.reservation.findMany({
    where: {
      since: {
        gte: inDays,
        lte: inDaysPlusOne,
      },
      state: {
        equals: ReservationState.ACTIVE,
      },
    },
    include: {
      guests: true,
    },
  })
}
