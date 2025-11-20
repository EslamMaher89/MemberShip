"use server";
import prisma from "@app/api/db";

export async function getReportData(lazyState, orderBy, include, filter1, filter2) {
  const { rows: take, first: skip, filters } = lazyState;

  // Initialize the 'where' object with the first filter
  let where = filter1;

  // Combine the second filter with the 'where' object using the 'AND' logical operator
  if (filter2) {
    where = {
      AND: [where, filter2],
    };
  }

  if (filters) {
    where = {
      ...where,
      ...Object.entries(filters).reduce((acc, [key, { value, matchMode }]) => {
        if (!(matchMode == "equals" && !value)) {
          acc[key] = { [matchMode]: value ?? "" };
        }
        return acc;
      }, {}),
    };
  }

  const options = {
    where,
    include,
    orderBy,
    take,
    skip,
  };
  delete options.take;
  delete options.skip;

  const data = await prisma.memberships.findMany(options);

  return data;
}
