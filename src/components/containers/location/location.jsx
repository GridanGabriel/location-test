import React from 'react';
import { Button, Table, Modal, DropdownButton, Dropdown } from 'react-bootstrap'
import LocalStorageService from '../../../library/storage/LocalStorageService'

import './styles.css';

const categories = [{ category: 'Mountainous' },
{ category: 'Desert' },
{ category: 'Boreal forest' },
{ category: 'Plains' },
{ category: 'Flat lands' },
{ category: 'Marshes' },]

export default class Location extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      locationsList: [
        {
          name: 'some random name',
          address: 'random address',
          coordinates: '111111.222222',
          category: 'Mountainous'
        },
        {
          name: 'some random name',
          address: 'random address',
          coordinates: '111111.222222',
          category: 'Desert'
        },
        {
          name: 'some random name',
          address: 'random address',
          coordinates: '111111.222222',
          category: 'Boreal forest'
        },
      ],
      selectedItem: { item: {}, index: '' },
      editedElement: { item: {}, index: '' },
      newElement: {
        name: '',
        address: '',
        coordinates: '',
        category: ''
      },
    };
    this.getLocationsList();
    this.getCategoryList();
  }

  render() {
    return (
      <div className="location-main-container">
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
          {this.state.locationsList.length > 0 &&
            <Table bordered hover>
              <thead>
                <tr>
                  {Object.keys(this.state.locationsList[0]).map((key, index) => (
                    <th key={index} className="table-title">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {this.state.locationsList.map((item, index) => (
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
          {this.state.locationsList.length === 0 &&
            <div>
              <h2>
                There are no locations.
              </h2>
              <h3>
                Please add a new location.
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
              <h4>Location</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="view-line">
              <p className="view-label">
                Name:
              </p>
              <p className="view-value">
                {this.state.selectedItem.item.name}
              </p>
            </div>
            <div className="view-line">
              <p className="view-label">
                Address:
              </p>
              <p className="view-value">
                {this.state.selectedItem.item.address}
              </p>
            </div>
            <div className="view-line">
              <p className="view-label">
                Coordinates:
              </p>
              <p className="view-value">
                {this.state.selectedItem.item.coordinates}
              </p>
            </div>
            <div className="view-line">
              <p className="view-label">
                Category:
              </p>
              <p className="view-value">
                {this.state.selectedItem.item.category}
              </p>
            </div>
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
            <div className="edit-line">
              <label className="view-label">
                Name:
              </label>
              <input
                id="edit-element"
                onChange={(event) => { this.handleEditChange(event, 'name') }}
                value={this.state.editedElement.item.name}
              />
            </div>
            <div className="edit-line">
              <label className="view-label">
                Address:
              </label>
              <input
                id="edit-element"
                onChange={(event) => { this.handleEditChange(event, 'address') }}
                value={this.state.editedElement.item.address}
              />
            </div>
            <div className="edit-line">
              <label className="view-label">
                Coordinates:
              </label>
              <input
                id="edit-element"
                onChange={(event) => { this.handleEditChange(event, 'coordinates') }}
                value={this.state.editedElement.item.coordinates}
              />
            </div>
            <div className="edit-line">
              <label className="view-label">
                Category:
              </label>
              <DropdownButton
                key="dropdown"
                id="dropdown"
                title={this.state.editedElement.item.category}
                onSelect={(event) => { this.handleEditChange(event, 'category') }}
              >
                {categories.map((val) => (
                  <Dropdown.Item key={Math.random()} eventKey={val.category}>{val.category}</Dropdown.Item>
                ))}

              </DropdownButton>
            </div>
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
            <div className="edit-line">
              <label className="view-label">
                Name:
              </label>
              <input
                id="edit-element"
                onChange={(event) => { this.handleAddChange(event, 'name') }}
                value={this.state.newElement.name}
              />
            </div>
            <div className="edit-line">
              <label className="view-label">
                Address:
              </label>
              <input
                id="edit-element"
                onChange={(event) => { this.handleAddChange(event, 'address') }}
                value={this.state.newElement.address}
              />
            </div>
            <div className="edit-line">
              <label className="view-label">
                Coordinates:
              </label>
              <input
                id="edit-element"
                onChange={(event) => { this.handleAddChange(event, 'coordinates') }}
                value={this.state.newElement.coordinates}
              />
            </div>
            <div className="edit-line">
              <label className="view-label">
                Category:
              </label>
              <DropdownButton
                key="dropdown"
                id="dropdown"
                title={this.state.newElement.category}
                onSelect={(event) => { this.handleAddChange(event, 'category') }}
              >
                {categories.map((val) => (
                  <Dropdown.Item key={Math.random()} eventKey={val.category}>{val.category}</Dropdown.Item>
                ))}

              </DropdownButton>
            </div>
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
              <h4>Delete {this.state.selectedItem.item.name}</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Are you sure you want to delete {this.state.selectedItem.item.name} location?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.deleteLocation()}>
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

  getLocationsList = () => {
    this.setState({ locationsList: LocalStorageService.getLocalStorage('location') });
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

  handleAddChange = (e, key) => {
    let newLocation = this.state.newElement;
    if (key !== 'category') {
      newLocation[key] = e.target.value
    } else {
      newLocation[key] = e
    };
    this.setState({ newElement: newLocation });
  }

  addCategory = () => {
    this.setState({
      locationsList: LocalStorageService.addLocationElement('location', this.state.locationsList, this.state.newElement)
    });
    this.closeModal();
  };

  handleEditChange = (e, key) => {
    let element = this.state.editedElement
    if (key !== 'category') {
      element.item[key] = e.target.value
    } else {
      element.item[key] = e
    }
    this.setState({ editedElement: element })
  }

  editCategory = () => {
    this.setState({
      locationsList: LocalStorageService.editElement('location', this.state.locationsList, this.state.editedElement)
    });
    this.closeModal();
  };

  deleteLocation = () => {
    this.setState({
      locationsList: LocalStorageService.removeElement('location', this.state.locationsList, this.state.selectedItem)
    });
    this.closeModal();
  }


}



