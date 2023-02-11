import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const Schedule = (props) => {
    const { schedules, handleAddSchedule, handleDeleteRow } = props;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [schedule, setSchedule] = useState({});

    const handleOnChnage = (e, evname) => {
        setSchedule( {...schedule, [evname]: e.target.value} )
    }

    const handleSaveBtn = () => {
        handleAddSchedule(schedule);
        handleClose()
    }

    return (
        <div className="py-3">
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <div className="card">
                        <div className="card-header">
                            <button
                                onClick={handleShow}
                                className="btn btn-primary btn-sm">
                                Add Row
                            </button>
                        </div>
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table className="table mb-0 pp-table-info">
                                    <tbody>
                                        <tr
                                            className="card-header"
                                            style={{ border: "none" }}
                                        >
                                            <td>Round</td>
                                            <td>Opens</td>
                                            <td>Closes</td>
                                            <td>Action</td>
                                        </tr>
                                        {
                                            Boolean(schedules) && Object.values(schedules).map((schedule, ind) => {
                                                return (<tr>
                                                    <td>{schedule.round}<br /></td>
                                                    <td>{schedule.open}</td>
                                                    <td>{schedule.close}</td>
                                                    <td><button onClick={()=>handleDeleteRow(Object.keys(schedules)[ind])}>
                                                        Delete
                                                    </button></td>
                                                </tr>)
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Row</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Round</Form.Label>
                            <Form.Control type="text" onChange={ e=>handleOnChnage(e, "round") } placeholder="Allocation" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Opens</Form.Label>
                            <Form.Control type="text" onChange={ e=>handleOnChnage(e, "open") } placeholder="2021-12-10 09:00:00 UTC" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="">
                            <Form.Label>Closes</Form.Label>
                            <Form.Control type="text" onChange={ e=>handleOnChnage(e, "close") } placeholder="2021-12-10 12:45:00 UTC" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveBtn}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Schedule;