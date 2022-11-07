import Categories from "../Models/Categories";
import Books from "../Models/Books";

export async function apiQuery(): Promise<Books[]> {
  const allBooks = await Books.findAll({
    include: Categories,
    attributes: { exclude: ["categoryId"] },
  });

  return allBooks;
}

export async function apiQueryFiltered(id: number): Promise<Books[]> {
  const filteredBooks = await Books.findAll({
    where: {
      categoryId: id,
    },
    include: Categories,
    attributes: {
      exclude: ["categoryId"],
    },
  });

  return filteredBooks;
}
