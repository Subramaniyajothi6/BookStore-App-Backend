const Book = require("./book.model");
const postaBook = async (req, res) => {
  try {
    const newBook = await Book(req.body);
    await newBook.save();
    res
      .status(200)
      .send({ message: "Book created successfully", book: newBook });
  } catch (error) {
    console.log("Error in creating the book", error);
    res.status(500).send({ message: "Failed to create the book", error });
  }
};

const getallbooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).send(books);
  } catch (error) {
    console.error("error in getting the books", error);
    res.status(500).send({ message: "error in getting the book" });
  }
};
const getsinglebook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).send({ message: "Book not found !" });
    }

    return res.status(200).send(book);
  } catch (error) {
    console.error("error in getting the book", error);
    res.status(500).send({ message: "failed to get the book" });
  }
};

// update the book

const updatebook = async (req, res) => {
  try {
    const { id } = req.params;
    const updatebook = await Book.findByIdAndUpdate(id, req.body, {new: true});
    if (!updatebook) {
      return res.status(404).send({ message: "Book not found !" });
    }
    res.status(200).send({ message: "Book upadated successfully", book: updatebook });
  } 
  catch (error) {
    console.error("error in updating the book", error);
    res.status(500).send({ message: "failed to update the book" });
  }
};
// delete the book

const deletebook = async (req, res) => {
  try {
    const {id} = req.params;
    const deletebook = await Book.findByIdAndDelete(id);
    if(!deletebook){
      return res.status(404).send({message:"Book not found !"})
    }
    res.status(200).send({ message: "Book deleted successfully", book: deletebook });

  } 
  catch (error) {
    console.error("error in deleting the book", error);
    res.status(500).send({ message: "failed to delete the book" });
  }
};

module.exports = { postaBook, getallbooks, getsinglebook, updatebook, deletebook };
