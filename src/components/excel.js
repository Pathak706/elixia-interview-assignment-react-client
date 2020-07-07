import React, { Component } from "react";
import { Row, Col, Upload } from "antd";
import { ExcelRenderer } from "react-excel-renderer";

// Prime React
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

// Static File
import SimpleExcel from "../assets/Sample Excel.xls";

export default class Excel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: [],
      rows: [],
      errorMessage: null,
    };
  }

  // convert excel date into date formate
  ExcelDateToJsDate = (serial) => {
    let utc_days = Math.floor(serial - 25569);
    let utc_value = utc_days * 86400;
    let date_info = new Date(utc_value * 1000);
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date_info);
  };

  handleSave = (row) => {
    const newData = [...this.state.rows];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ rows: newData });
  };

  checkFile(file) {
    let errorMessage = "";
    if (!file || !file[0]) {
      return;
    }
    const isExcel =
      file[0].type === "application/vnd.ms-excel" ||
      file[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (!isExcel) {
      errorMessage = "You can only upload Excel file!";
    }
    const isLt2M = file[0].size / 1024 / 1024 < 8;
    if (!isLt2M) {
      errorMessage = "File must be smaller than 8MB!";
    }
    console.log("errorMessage", errorMessage);
    return errorMessage;
  }

  fileHandler = (fileList) => {
    let fileObj = fileList;
    if (!fileObj) {
      this.setState({
        errorMessage: "No file uploaded!",
      });
      return false;
    }
    console.log("fileObj.type:", fileObj.type);
    if (
      !(
        fileObj.type === "application/vnd.ms-excel" ||
        fileObj.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      this.setState({
        errorMessage: "Unknown file format. Only Excel files are uploaded!",
      });
      return false;
    }

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        let newRows = [];
        resp.rows.slice(1).map((row, index) => {
          if (row && row !== "undefined") {
            //  TODO: validate row data here
            newRows.push({
              key: index + 1,
              delivery_number: row[0],
              shipment_number: row[1],
              source_code: row[2],
              destination_code: row[3],
              vehicle_number: row[4],
              transporter_code: row[5],
              start_date: this.ExcelDateToJsDate(row[6]),
              end_date: this.ExcelDateToJsDate(row[7]),
              driver_name: row[8],
              driver_phone: row[9],
            });
          }
        });
        console.log("excel json", newRows);
        if (newRows.length === 0) {
          this.setState({
            errorMessage: "No data found in file!",
          });
          return false;
        } else {
          this.setState({
            cols: resp.cols,
            rows: newRows,
            errorMessage: null,
          });
        }
      }
    });
    return false;
  };

  handleSubmit = async () => {
    console.log("submitting: ", this.state.rows);
    //submit to API
    //if successful, banigate and clear the data
    //this.setState({ rows: [] })
  };

  renderHeader() {
    return (
      <div className="datatable-heading" style={{ alignItems: "center" }}>
        <h1>Importing Excel Component</h1>
        <Row gutter={16}>
          <Col
            span={8}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "5%",
            }}
          ></Col>
          <Col span={8}>
            <a
              href={SimpleExcel}
              target="_blank"
              rel="noopener noreferrer"
              download
              style={{
                "white-space": "nowrap",
              }}
            >
              Sample excel sheet
            </a>
          </Col>
          <Col
            span={8}
            align="right"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {this.state.rows.length > 0 && (
              <div>
                <Button
                  onClick={this.handleSubmit}
                  size="large"
                  type="primary"
                  label="Submit"
                  style={{ marginBottom: 16, marginLeft: 45 }}
                ></Button>
              </div>
            )}
          </Col>
        </Row>
        <div>
          <Upload
            name="file"
            beforeUpload={this.fileHandler}
            onRemove={() => this.setState({ rows: [] })}
            multiple={false}
          >
            <Button label="Upload Excel" />
          </Upload>
        </div>
      </div>
    );
  }

  render() {
    const header = this.renderHeader();
    return (
      <div style={{ marginTop: 20 }}>
        {/* TODO: make infite scroll */}
        <DataTable
          ref={(el) => (this.dt = el)}
          value={this.state.rows}
          header={header}
          responsive
          className="p-datatable-excel"
          dataKey="id"
          rowHover
          globalFilter={this.state.globalFilter}
          rows={10}
          emptyMessage="No Records Found"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          let-ri="rowIndex"
        >
          <Column
            field="delivery_number"
            header="Delivery Number"
            sortable
            filter
            filterPlaceholder="Search By Delivery Number"
            filterMatchMode="contains"
          />

          <Column
            field="shipment_number"
            header="Shipment Number"
            sortable
            filter
            filterPlaceholder="Search By Shipment Number"
            filterMatchMode="contains"
          />

          <Column
            field="source_code"
            header="Source Code"
            sortable
            filter
            filterPlaceholder="Search By Source Code"
            filterMatchMode="contains"
          />

          <Column
            field="destination_code"
            header="Destination Code"
            sortable
            filter
            filterPlaceholder="Search By Destination Code"
            filterMatchMode="contains"
          />

          <Column
            field="vehicle_number"
            header="Vehicle Number"
            sortable
            filter
            filterPlaceholder="Search By Vechile Number"
            filterMatchMode="contains"
          />

          <Column
            field="transporter_code"
            header="Transporter Code"
            sortable
            filter
            filterPlaceholder="Search By Trnasporter Code"
            filterMatchMode="contains"
          />

          <Column
            field="start_date"
            header="Start Date"
            sortable
            filter
            filterPlaceholder="Search By Start Date"
            filterMatchMode="contains"
          />

          <Column
            field="end_date"
            header="End Date"
            sortable
            filter
            filterPlaceholder="Search By Id"
            filterMatchMode="contains"
          />

          <Column
            field="driver_name"
            header="Driver Name"
            sortable
            filter
            filterPlaceholder="Search By Id"
            filterMatchMode="contains"
          />

          <Column
            field="driver_phone"
            header="Driver Phone"
            sortable
            filter
            filterPlaceholder="Search By Id"
            filterMatchMode="contains"
          />
        </DataTable>
      </div>
    );
  }
}
