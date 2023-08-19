import React, { Component } from "react";
import styles from "../CSS/mystyle.module.css";
import add from "../icons/add.png";
import back from "../icons/back.png";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ISBN: "",
      schlID: this.props.schlID,
      title: "",
      authors: "",
      categories: "",
      publisher: "",
      pages: "",
      summary: "",
      language: "",
      available_copies: "",
      message: "",
      allcategories: [],
      allauthors: [],
      selauthor: {},
      newauthor: "",
      selectedauthors: [],
      selcat: {},
      newcat: "",
      selectedcats: [],
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
    console.log(this.state);
  }

  check() {
    if (this.state.ISBN.length === 0) {
      this.setState({
        ...this.state,
        message: `ISBN is blank!`,
      });
      return 0;
    } else if (this.state.title.length === 0) {
      this.setState({
        ...this.state,
        message: `Title is blank!`,
      });
      return 0;
    } else if (this.state.selectedauthors.length === 0) {
      this.setState({
        ...this.state,
        message: `Add at least one Author!`,
      });
      return 0;
    } else if (this.state.selectedcats.length === 0) {
      this.setState({
        ...this.state,
        message: `Add at least one Category!`,
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
        message: `Pages number is blank!`,
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
    return 1;
  }

  onAddBook = () => {
    console.log(this.state);
    let okay = this.check();
    if (okay === 1) {
      fetch(
        `http://localhost:9103/libraries/web/newbook/${this.state.ISBN}/${this.state.schlID}/${this.state.title}/${this.state.publisher}/${this.state.pages}/${this.state.summary}/${this.state.language}/${this.state.available_copies}`,
        {
          method: "POST",
          mode: "cors",
        }
      ).then((response) => {
        if (response.ok) {
          this.setState({
            ...this.state,
            message: "Book Added!",
          });
          for (var i = 0; i < this.state.selectedauthors.length; i++) {
            fetch(
              `http://localhost:9103/libraries/web/addauthorofbook/${this.state.ISBN}/${this.state.schlID}/${this.state.selectedauthors[i].authorID}`,
              {
                method: "POST",
                mode: "cors",
              }
            );
          }
          for (i = 0; i < this.state.selectedcats.length; i++) {
            fetch(
              `http://localhost:9103/libraries/web/addcategoryofbook/${this.state.ISBN}/${this.state.schlID}/${this.state.selectedcats[i].categoryID}`,
              {
                method: "POST",
                mode: "cors",
              }
            );
          }
        } else
          this.setState({
            ...this.state,
            message: "Something went wrong, please check book info!",
          });
      });
    }
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
    console.log(author);
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

  onAddAuthorOfBook = () => {
    this.setState({
      ...this.state,
      selectedauthors: [...this.state.selectedauthors, this.state.selauthor],
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
    console.log(category);
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

  onAddCategoryOfBook = () => {
    this.setState({
      ...this.state,
      selectedcats: [...this.state.selectedcats, this.state.selcat],
    });
  };

  render() {
    console.log("Now at AddBook");
    return (
      <div className={styles.school}>
        <table>
          <tr>
            <th>ISBN:</th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, ISBN: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Title:</th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, title: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>{"Author(s):"}</th>
            <td>
              <select name="Authors" onChange={this.selectAuthor}>
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
                {this.state.selectedauthors.map((author) => (
                  <li key={author.authorID}>{author.author_fullname}</li>
                ))}
              </ul>
            </td>
          </tr>
          <tr>
            <th>{"Category(/ies):"}</th>
            <td>
              <select name="Categories" onChange={this.selectCategory}>
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
                {this.state.selectedcats.map((category) => (
                  <li key={category.categoryID}>{category.category}</li>
                ))}
              </ul>
            </td>
          </tr>
          <tr>
            <th>Publisher:</th>
            <td>
              <input
                type="text"
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
        <span title="Add Book">
          <button onClick={this.onAddBook} className={styles.iconbut2}>
            <img src={add} alt="Add Book" />
          </button>
        </span>
        <span title="Back">
          <button
            onClick={() => this.props.gotobooks()}
            className={styles.iconbut2}
          >
            <img src={back} alt="Back" />
          </button>
        </span>
        <div className={styles.mess}>{this.state.message}</div>
      </div>
    );
  }
}

export default AddBook;
