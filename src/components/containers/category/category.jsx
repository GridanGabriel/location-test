import React from 'react';
import { Button, Table, Modal } from 'react-bootstrap'
import LocalStorageService from '../../../library/storage/LocalStorageService'

import './styles.css';

export default class Category extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      categoryList: [{ category: 'Mountainous' },
      { category: 'Desert' },
      { category: 'Boreal forest' },
      { category: 'Plains' },
      { category: 'Flat lands' },
      { category: 'Marshes' },],
      selectedItem: { item: {}, index: '' },
      editedElement: { item: {}, index: '' },
      newElement: '',
    };
    this.getCategoryList();
  }

  render() {
    return (
      <div className="category-main-container">
        <div className="top-buttons-container">
          <Button variant="primary"
            className="button-style"
            disabled={!this.state.selectedItem.item.category}
            onClick={() => { this.setState({ viewModal: true }) }}>
            View
          </Button>

          <Button variant="secondary"
            className="button-style"
            onClick={() => { this.setState({ addModal: true }) }}>
            Add
          </Button>

          <Button variant="success"
            disabled={!this.state.selectedItem.item.category}
            className="button-style"
            onClick={() => { this.setState({ editModal: true }) }}>
            Edit
          </Button>

          <Button variant="danger"
            disabled={!this.state.selectedItem.item.category}
            className="button-style"
            onClick={() => { this.setState({ deleteModal: true }) }}>
            Remove
          </Button>
        </div>

        <div className="list-container">
          {this.state.categoryList.length > 0 &&
            <Table bordered hover>
              <thead>
                <tr>
                  {Object.keys(this.state.categoryList[0]).map((key, index) => (
                    <th key={index} className="table-title">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {this.state.categoryList.map((item, index) => (
                  <tr onClick={() => { this.setSelectedItem(item, index) }}
                    className={index === this.state.selectedItem.index ? "list-item selected" : "list-item"}
                    key={index}>
                    {Object.values(item).map((val) => (
                      <td key={Math.random()}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          }
          {this.state.categoryList.length === 0 &&
            <div>
              <h2>
                There are no entries into Category list.
              </h2>
              <h3>
                Please add new categories
              </h3>
            </div>
          }
        </div>

        <Modal
          show={this.state.viewModal}
          onHide={() => { this.closeModal() }}
        >
          <Modal.Header>
            <Modal.Title>
              <h4>Category:</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {this.state.selectedItem.item.category}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => { this.closeModal() }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.editModal}
          onHide={() => this.closeModal()}
        >
          <Modal.Header>
            <Modal.Title>
              <h4>Edit</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              id="edit-element"
              onChange={(event) => { this.handleEditChange(event) }}
              value={this.state.editedElement.item.category}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.editCategory()}>
              Edit
            </Button>
            <Button variant="secondary" onClick={() => this.closeModal()}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.addModal}
          onHide={() => this.closeModal()}
        >
          <Modal.Header>
            <Modal.Title>
              <h4>Add new category</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              id="new-element"
              onChange={(event) => { this.handleAddChange(event) }}
              value={this.state.newElement}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.addCategory()}>
              Add
            </Button>
            <Button variant="secondary" onClick={() => this.closeModal()}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.deleteModal}
          onHide={() => this.closeModal()}
        >
          <Modal.Header>
            <Modal.Title>
              <h4>Delete {this.state.selectedItem.item.category}</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Are you sure you want to delete {this.state.selectedItem.item.category}?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.deleteCategory()}>
              Yes
            </Button>
            <Button variant="secondary" onClick={() => this.closeModal()}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  closeModal = () => {
    this.setState({ viewModal: false, editModal: false, deleteModal: false, addModal: false })
  }

  getCategoryList = () => {
    this.setState({ categoryList: LocalStorageService.getLocalStorage('category') });
  };

  setSelectedItem = (item, index) => {
    this.setState({
      selectedItem: {
        item: item,
        index: index
      },
      editedElement: {
        item: item,
        index: index
      },
    });
  };

  handleAddChange = (e) => {
    this.setState({ newElement: e.target.value })
  }

  addCategory = () => {
    this.setState({
      categoryList: LocalStorageService.addCategoryElement('category', this.state.categoryList, this.state.newElement)
    });
    this.closeModal();
  };

  handleEditChange = (e) => {
    let element = this.state.editedElement
    element.item.category = e.target.value
    this.setState({ editedElement: element })
  }

  editCategory = () => {
    this.setState({
      categoryList: LocalStorageService.editElement('category', this.state.categoryList, this.state.editedElement)
    });
    this.closeModal();
  };

  deleteCategory = () => {
    this.setState({
      categoryList: LocalStorageService.removeElement('category', this.state.categoryList, this.state.selectedItem)
    });
    this.closeModal();
  }

  // I go on the principle that after an API will make changes, edits, delets it will also return the new updated list
}
