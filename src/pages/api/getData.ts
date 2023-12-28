import csvtojson from "csvtojson";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

const csvFilePath = path.join(process.cwd(), "./src/random_data.csv");

async function sortCSVByDate() {
  const jsonArray = await csvtojson().fromFile(csvFilePath);
  const sortedArray = jsonArray.toSorted((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });
  return sortedArray;
}

async function sortCSVByName() {
  const jsonArray = await csvtojson().fromFile(csvFilePath);
  const sortedArray = jsonArray.toSorted((a, b) => {
    const nameA = a.file_name.toUpperCase();
    const nameB = b.file_name.toUpperCase();
    if (nameA < nameB) return -1;
    else if (nameA > nameB) return 1;
    else return 0;
  });
  return sortedArray;
}

async function getCSVData() {
  const jsonArray = await csvtojson().fromFile(csvFilePath);
  return jsonArray;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        const jsonArray = await getCSVData();
        res.status(200).json(jsonArray);
        break;
      case "POST":
        const sortedArray =
          req.body.sortBy === "date"
            ? await sortCSVByDate()
            : await sortCSVByName();
        res.status(200).json(sortedArray);
        break;
      default:
        res.status(405).end(); // Method Not Allowed
        break;
    }
  } catch (error) {
    console.error("Error reading CSV file:", error);
    res.status(500).json({ error });
  }
}
