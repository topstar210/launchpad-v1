import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const Setting = (props) => {
  const { settings, handleSaveSetting, handleFileChange } = props;

  const [setting, setSetting] = useState({});

  useEffect(() => {
    setSetting(settings);
  }, [settings]);

  const handleOnChnage = (e, evname) => {
    setSetting({ ...setting, [evname]: e.target.value });
  };

  return (
    <div className="row mt-4">
      <Form className="col-md-7 mx-auto">
        <div className="mb-3 d-flex align-items-center">
          <div className="pp-card-top animation">
            <div className="icon-box">
              <span>
                <img
                  src={
                    Boolean(setting)
                      ? setting.token_logo
                      : require("../../../images/METAVPAD.jpg").default
                  }
                  alt="MetaVPad"
                /></span>
            </div>
          </div>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Token Name</Form.Label>
          <Form.Control
            type="text"
            value={Boolean(setting) ? setting.token_name : ""}
            onChange={(e) => handleOnChnage(e, "token_name")}
            placeholder="USDT"
          />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="">
          <Form.Label>Token Logo Link</Form.Label>
          <Form.Control
            type="text"
            value={Boolean(setting) ? setting.token_logo : ""}
            onChange={(e) => handleOnChnage(e, "token_logo")}
            placeholder="https://i.ibb.co/8KfzS09/METAVPAD.jpg"
          />
        </Form.Group> */}
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Token Description</Form.Label>
          <Form.Control
            type="text"
            value={Boolean(setting) ? setting.token_description : ""}
            onChange={(e) => handleOnChnage(e, "token_description")}
            placeholder="METAVPAD - Building the Metaverse, One Block at a time"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>App link</Form.Label>
          <Form.Control
            type="text"
            value={Boolean(setting) ? setting.app_link : ""}
            onChange={(e) => handleOnChnage(e, "app_link")}
            placeholder="https://metavpad.com"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Twitter</Form.Label>
          <Form.Control
            type="text"
            value={Boolean(setting) ? setting.twitter_link : ""}
            onChange={(e) => handleOnChnage(e, "twitter_link")}
            placeholder="https://www.twitter.com/"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Medium</Form.Label>
          <Form.Control
            type="text"
            value={Boolean(setting) ? setting.medium_link : ""}
            onChange={(e) => handleOnChnage(e, "medium_link")}
            placeholder="https://medium.com/@metavpad"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Telegram</Form.Label>
          <Form.Control
            type="text"
            value={Boolean(setting) ? setting.telegram_link : ""}
            onChange={(e) => handleOnChnage(e, "telegram_link")}
            placeholder="https://t.me/metavpadann"
          />
        </Form.Group>
        <div className="w-100 d-flex justify-content-end">
          <Button variant="primary" onClick={() => handleSaveSetting(setting)}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Setting;
