import React, { Component } from "react";
import { APIService } from "../services/APIService";

// For Model Box
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "./model";

// Prime React
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

class Destinationspage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destinations: [],
      modal: false,
      name: "",
      modalInputName: "",
    };
    this.apiService = new APIService();
  }

  componentDidMount() {
    this.fetchAlldestinations();
  }

  fetchAlldestinations() {
    this.apiService
      .getAll("destinations")
      .then((data) => this.setState({ destinations: data.destination }));
  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    this.setState({ name: this.state.modalInputName });
    this.apiService
      .create("destinations", { name: this.state.modalInputName })
      .then((res) => {
        this.fetchAlldestinations();
      });
    this.modalClose();
  }

  modalOpen() {
    this.setState({ modal: true });
  }

  modalClose() {
    this.setState({
      modalInputName: "",
      modal: false,
    });
  }

  renderHeader() {
    return (
      <div className="datatable-heading">
        List of destinations
        <div className="p-datatable-globalfilter-container">
          <Button
            type="button"
            label="Add"
            onClick={(e) => this.modalOpen(e)}
            tooltip="Add New Destinations"
          />

          <Modal
            show={this.state.modal}
            handleClose={(e) => this.modalClose(e)}
          >
            <h2>Add New Source</h2>
            <div className="form-group">
              <label>Enter Name:</label>
              <input
                type="text"
                value={this.state.modalInputName}
                name="modalInputName"
                onChange={(e) => this.handleChange(e)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <Button
                type="button"
                label="Save"
                onClick={(e) => this.handleSubmit(e)}
              />
            </div>
          </Modal>
        </div>
      </div>
    );
  }

  actionBodyTemplate = (props) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-trash"
          className="p-button-danger"
          tooltip="Delete Destinations"
          onClick={() => this.delete(props.id)}
        ></Button>
      </div>
    );
  };

  delete = (id) => {
    this.apiService
      .remove("destinations", id)
      .then((res) => this.fetchAlldestinations())
      .catch((err) => console.error(err));
  };

  onEditorValueChange(props, value) {
    let updatedtransporter = [...this.state.destinations];
    updatedtransporter[props.rowIndex][props.field] = value;
    this.setState({ destinations: updatedtransporter });
  }

  nameEditor = (props) => {
    return (
      <InputText
        type="text"
        value={this.state.destinations[props.rowIndex]["name"]}
        onChange={(e) => this.onEditorValueChange(props, e.target.value)}
      />
    );
  };

  requiredValidator = (props) => {
    console.log(this.state.destinations[props.rowIndex], props.rowIndex);
    let value = props.rowData[props.field];
    if (value && value.length > 0) {
      this.apiService
        .update(
          "destinations",
          { name: value },
          this.state.destinations[props.rowIndex].id
        )
        .then((res) => {
          this.fetchAlldestinations();
        });
      return true;
    }
  };

  render() {
    const header = this.renderHeader();

    return (
      <div className="datatable-doc-demo m-l-30 m-t-20">
        <DataTable
          ref={(el) => (this.dt = el)}
          value={this.state.destinations}
          header={header}
          responsive
          className="p-datatable-destinations"
          dataKey="id"
          rowHover
          globalFilter={this.state.globalFilter}
          paginator
          rows={10}
          emptyMessage="No destinations found"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          rowsPerPageOptions={[10, 25, 50]}
          let-ri="rowIndex"
        >
          {/* <Column selectionMode="multiple" style={{width:'3em'}}/> */}
          <Column
            field="name"
            header="Name"
            sortable
            filter
            filterPlaceholder="Search by name"
            filterMatchMode="contains"
            editor={this.nameEditor}
            editorValidator={this.requiredValidator}
          />
          <Column
            body={this.actionBodyTemplate}
            headerStyle={{ width: "8em", textAlign: "center" }}
            bodyStyle={{ textAlign: "center", overflow: "visible" }}
          />
        </DataTable>
      </div>
    );
  }
}

export default Destinationspage;
