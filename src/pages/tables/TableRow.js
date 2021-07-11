import React, { Component} from "react"
import { faEdit, faEllipsisH, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Card,  Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import { Routes } from "../../routes";
import ArchiveService from "../../services/archive.service";

class TableRow extends Component {
  constructor(props){
    super(props);
    const user = JSON.parse(localStorage.getItem("user"));
    this.state = {
        loggedUser : user
    }
  }

  deleteArchive(e, data){
    ArchiveService.delete(data.key).then(() => {
      console.log("Delete  item successfully!");
      alert(
        "Data berhasil dihapus"
      );
      window.location.reload();
      this.setState({
        submitted: true,
      });

    })
    .catch((e) => {
      console.log(e);
    });
  }
  render(){
    return (
      <tr>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {this.props.data.documentNumber}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">
            {this.props.data.documentName}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {this.props.data.location}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {this.props.data.documentDate.toLocaleString()}
          </span>
        </td>
        <td>
          <span className="fw-normal">
           {this.props.data.description}
          </span>
        </td>
        <td>
          <span className="fw-normal">
           {this.props.data.documentType}
          </span>
        </td>
        <td>
          <span className={`fw-normal`}>
            <Button variant="success" className="text-white"><a href={this.props.data.linkUpload}>Download</a></Button>
          </span>
        </td>

        {this.state.loggedUser.level == "admin" ? <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {/* <Dropdown.Item>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item> */}
              <Dropdown.Item  as={Link} to={Routes.EditDocument.path + "/" +this.props.data.key} >
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Ubah
              </Dropdown.Item>
              <Dropdown.Item className="text-danger" onClick={ e =>
                    {
                      this.deleteArchive(e, this.props.data)
                    }
                } >
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Hapus
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td> : <span />}
      </tr>
    );
  }
}
export default TableRow;