import React, { Component } from "react";

class EditBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schlID: this.props.schlID,
      ISBN: this.props.ISBN,
      title: "",
      authors: [],
      categories: [],
      publisher: "",
      pages: "",
      summary: "",
      language: "",
      available_copies: "",
      message: "",
      allcategories: [],
      allauthors: [],
      newauthor: "",
      selauthor: "",
      newcategory: "",
      selcat: "",
    };
  }

  componentDidMount() {
    fetch(`http://localhost:9103/libraries/web/allcategories`)
      .then((response) => response.json())
      .then((obj) => {
        this.setState({
          ...this.state,
          allcategories: obj.map((category) => {
            return category;
          }),
        });
      });
    fetch(`http://localhost:9103/libraries/web/allauthors`)
      .then((response) => response.json())
      .then((obj) => {
        this.setState({
          ...this.state,
          allauthors: obj.map((author) => {
            return author;
          }),
        });
      });
    fetch(
      `http://localhost:9103/libraries/web/bookinfo/${this.state.schlID}/${this.state.ISBN}`
    )
      .then((response) => response.json())
      .then((obj) => {
        this.setState({
          ...this.state,
          title: obj.title,
          authors: obj.authors,
          categories: obj.categories,
          publisher: obj.publisher,
          pages: obj.pages,
          summary: obj.sumary,
          language: obj.language,
          available_copies: obj.copies,
        });
      });
  }

  check() {
    if (this.state.title.length === 0) {
      this.setState({
        ...this.state,
        message: `Title is blank!`,
      });
      return 0;
    } else if (this.state.authors.length === 0) {
      this.setState({
        ...this.state,
        message: `Add at least one author!`,
      });
      return 0;
    } else if (this.state.categories.length === 0) {
      this.setState({
        ...this.state,
        message: `Add at least one author!`,
      });
      return 0;
    } else if (this.state.publisher.length === 0) {
      this.setState({
        ...this.state,
        message: `Publisher is blank!`,
      });
      return 0;
    } else if (this.state.pages.length === 0) {
      this.setState({
        ...this.state,
        message: `Page number is blank!`,
      });
      return 0;
    } else if (this.state.summary.length === 0) {
      this.setState({
        ...this.state,
        message: `Summary is blank!`,
      });
      return 0;
    } else if (this.state.language.length === 0) {
      this.setState({
        ...this.state,
        message: `Language is blank!`,
      });
      return 0;
    } else if (this.state.available_copies.length === 0) {
      this.setState({
        ...this.state,
        message: `Available copies number is blank!`,
      });
      return 0;
    }
    this.setState({ ...this.state, message: "Book Updated!" });
    return 1;
  }

  onUpdateBook = () => {
    let okay = this.check();
    console.log(this.state);
    if (okay === 1) {
      fetch(
        `http://localhost:9103/libraries/web/changebook/${this.state.ISBN}/${this.state.schlID}/${this.state.title}/${this.state.publisher}/${this.state.pages}/${this.state.summary}/${this.state.language}/${this.state.available_copies}`,
        {
          method: "POST",
          mode: "cors",
        }
      );
    }
  };
  onAddAuthor = () => {
    if (this.state.newauthor.length > 0)
      fetch(
        `http://localhost:9103/libraries/web/addauthor/${this.state.newauthor}`,
        {
          method: "POST",
          mode: "cors",
        }
      ).then(() => {
        fetch(`http://localhost:9103/libraries/web/allauthors`)
          .then((response) => response.json())
          .then((obj) => {
            this.setState({
              ...this.state,
              allauthors: obj.map((author) => {
                return author;
              }),
            });
          });
      });
  };
  selectAuthor = (val) => {
    let full = val.target.value;
    let myArray = full.split(",");
    let author = {
      authorID: myArray[0],
      author_fullname: myArray[1],
    };
    this.setState({
      ...this.state,
      selauthor: author,
    });
  };

  onAddAuthorOfBook = () => {
    if (this.state.selauthor != "") {
      fetch(
        `http://localhost:9103/libraries/web/addauthorofbook/${this.state.ISBN}/${this.state.schlID}/${this.state.selauthor.authorID}`,
        {
          method: "POST",
          mode: "cors",
        }
      ).then(() => {
        this.setState({
          ...this.state,
          authors: [...this.state.authors, this.state.selauthor],
        });
      });
    }
  };
  deleteAuthor = (val) => {
    fetch(
      `http://localhost:9103/libraries/web/deleteauthorofbook/${this.state.ISBN}/${this.state.schlID}/${val.target.value}`,
      {
        method: "POST",
        mode: "cors",
      }
    ).then(() => {
      var authors = [...this.state.authors];
      var index = 0;
      for (index = 0; index < authors.length; index++) {
        if (Number(authors[index].authorID) === Number(val.target.value)) break;
      }
      authors.splice(index, 1);
      this.setState({
        ...this.state,
        authors: authors,
      });
    });
  };

  onAddCategory = () => {
    if (this.state.newcategory.length > 0)
      fetch(
        `http://localhost:9103/libraries/web/addcategory/${this.state.newcategory}`,
        {
          method: "POST",
          mode: "cors",
        }
      ).then(() => {
        fetch(`http://localhost:9103/libraries/web/allcategories`)
          .then((response) => response.json())
          .then((obj) => {
            this.setState({
              ...this.state,
              allcategories: obj.map((category) => {
                return category;
              }),
            });
          });
      });
  };
  selectCategory = (val) => {
    let full = val.target.value;
    let myArray = full.split(",");
    let category = {
      categoryID: myArray[0],
      category: myArray[1],
    };
    this.setState({
      ...this.state,
      selcat: category,
    });
  };
  onAddCategoryOfBook = () => {
    fetch(
      `http://localhost:9103/libraries/web/addcategoryofbook/${this.state.ISBN}/${this.state.schlID}/${this.state.selcat.categoryID}`,
      {
        method: "POST",
        mode: "cors",
      }
    ).then(() => {
      this.setState({
        ...this.state,
        categories: [...this.state.categories, this.state.selcat],
      });
    });
  };

  deleteCat = (val) => {
    fetch(
      `http://localhost:9103/libraries/web/deletecategoryofbook/${this.state.ISBN}/${this.state.schlID}/${val.target.value}`,
      {
        method: "POST",
        mode: "cors",
      }
    ).then(() => {
      var categories = [...this.state.categories];
      var index = 0;
      for (index = 0; index < categories.length; index++) {
        if (Number(categories[index].categoryID) === Number(val.target.value))
          break;
      }
      categories.splice(index, 1);
      this.setState({
        ...this.state,
        categories: categories,
      });
    });
  };

  render() {
    console.log("Now at EditBook");
    return (
      <div>
        <table>
          <tr>
            <th>ISBN:</th>
            <td>{this.state.ISBN}</td>
          </tr>
          <tr>
            <th>Title:</th>
            <td>
              <input
                type="text"
                placeholder={this.state.title}
                onChange={(val) =>
                  this.setState({ ...this.state, title: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Author(s):</th>
            <td>
              <select multiple name="Authors" onChange={this.selectAuthor}>
                {this.state.allauthors.map((author) => (
                  <option value={[author.authorID, author.author_fullname]}>
                    {author.author_fullname}
                  </option>
                ))}
              </select>
              <div>
                New Author:{" "}
                <input
                  type="text"
                  onChange={(val) =>
                    this.setState({
                      ...this.state,
                      newauthor: val.target.value,
                    })
                  }
                />
                <button onClick={this.onAddAuthor}>{"+"}</button>
              </div>
            </td>
            <td>
              <button onClick={this.onAddAuthorOfBook}>Add</button>
            </td>
            <td>
              <ul>
                {this.state.authors.map((author) => (
                  <li>
                    {author.author_fullname}
                    <button value={author.authorID} onClick={this.deleteAuthor}>
                      -
                    </button>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
          <tr>
            <th>Category(/ies):</th>
            <td>
              <select multiple name="Categories" onChange={this.selectCategory}>
                {this.state.allcategories.map((category) => (
                  <option value={[category.categoryID, category.category]}>
                    {category.category}
                  </option>
                ))}
              </select>
              <div>
                New Category:{" "}
                <input
                  type="text"
                  onChange={(val) =>
                    this.setState({
                      ...this.state,
                      newcategory: val.target.value,
                    })
                  }
                />
                <button onClick={this.onAddCategory}>{"+"}</button>
              </div>
            </td>
            <td>
              <button onClick={this.onAddCategoryOfBook}>Add</button>
            </td>
            <td>
              <ul>
                {this.state.categories.map((category) => (
                  <li>
                    {category.category}
                    <button
                      value={category.categoryID}
                      onClick={this.deleteCat}
                    >
                      -
                    </button>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
          <tr>
            <th>Publisher:</th>
            <td>
              <input
                type="text"
                placeholder={this.state.publisher}
                onChange={(val) =>
                  this.setState({ ...this.state, publisher: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Pages:</th>
            <td>
              <input
                type="text"
                placeholder={this.state.pages}
                onChange={(val) =>
                  this.setState({ ...this.state, pages: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Summary:</th>
            <td>
              <input
                type="text"
                placeholder={this.state.summary}
                onChange={(val) =>
                  this.setState({ ...this.state, summary: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Language:</th>
            <td>
              <input
                type="text"
                placeholder={this.state.language}
                onChange={(val) =>
                  this.setState({ ...this.state, language: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Available Copies:</th>
            <td>
              <input
                type="text"
                placeholder={this.state.available_copies}
                onChange={(val) =>
                  this.setState({
                    ...this.state,
                    available_copies: val.target.value,
                  })
                }
              />
            </td>
          </tr>
        </table>
        <button onClick={this.onUpdateBook}>Update</button>
        <div>{this.state.message}</div>
        <button onClick={() => this.props.gotobook(this.state.ISBN)}>
          {"<-"}
        </button>
      </div>
    );
  }
}

export default EditBook;
