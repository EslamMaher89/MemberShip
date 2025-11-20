"use server";
import prisma from "@app/api/db";
import { getMembershipsCreatedTodayByMemberCode } from "@components/Members/member";
export const login = async (userName, password) => {
await getMembershipsCreatedTodayByMemberCode(4)

  const query = await prisma.users.findMany({
    where: { name: userName, password },
  });

  return query[0];
};
export async function getClubName() {
  "use server";
  return process.env["club"];
}
