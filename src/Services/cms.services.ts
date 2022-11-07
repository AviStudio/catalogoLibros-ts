import { IBookForm } from "../libs/interfaces";
import Categories from "../Models/Categories";
import Books from "../Models/Books";

export async function listBooks(): Promise<string> {
  const allBooks: string = JSON.stringify(
    await Books.findAll({
      include: Categories,
      attributes: {
        exclude: ["categoryId"],
      },
    })
  );

  return allBooks;
}

export async function listCategories(): Promise<string> {
  return JSON.stringify(await Categories.findAll());
}

export async function addBook(params: IBookForm): Promise<Boolean> {
  const newBook = await Books.create({
    author: params.authorForm,
    title: params.titleForm,
    edition: params.editionForm,
    year: params.yearForm,
    editorial: params.editorialForm,
    country: params.countryForm,
    photoUrl: params.photoForm,
    categoryId: parseInt(params.categoryForm),
  });

  const state = await newBook.save();

  if (!state) {
    return false;
  }

  return true;
}

export async function addCategory(params: String): Promise<Boolean> {
  const newCategory = await Categories.create({
    categoryName: params,
  });

  const state = await newCategory.save();

  if (!state) return false;

  return true;
}

export async function bookQuery(id: number): Promise<string> {
  const bookData = JSON.stringify(
    await Books.findOne({
      where: {
        id: id,
      },
      include: Categories,
    })
  );

  return bookData;
}

export async function editBook(
  params: IBookForm,
  id: number
): Promise<Boolean> {
  const bookEdited = await Books.update(
    {
      author: params.authorForm,
      title: params.titleForm,
      edition: params.editionForm,
      year: params.yearForm,
      editorial: params.editorialForm,
      country: params.countryForm,
      photoUrl: params.photoForm,
      categoryId: parseInt(params.categoryForm),
    },
    {
      where: { id: id },
    }
  );

  if (!bookEdited) {
    return false;
  }

  return true;
}

export async function deleteBook(id: number): Promise<Boolean> {
  const bookDeleted = await Books.destroy({
    where: { id: id },
  });

  if (!bookDeleted) return false;

  return true;
}
