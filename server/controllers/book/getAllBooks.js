const getAllBooks = async (req, res) => {
  const BookModel = req.models.Books;
  const books = await BookModel.findAll();
  res.send(books);
};

module.exports = getAllBooks;
