import React, { useEffect, useState } from "react";
import { db, storage } from "../../firebase";
import { ref, onValue, update, push, set, remove } from "firebase/database";
import {
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL 
} from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ProjectDetail, Schedule, Setting } from "./components";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [settings, setSettings] = useState([]);
  const [file, setFile] = useState("");

  const scheduleRef = ref(db, "schedule");
  const projectRef = ref(db, "projects");
  const settingRef = ref(db, "settings");

  useEffect(() => {
    // getting project details
    onValue(projectRef, (snapshot) => {
      const data = snapshot.val();
      setProjects(data);
    });

    // getting schedule
    onValue(scheduleRef, (snapshot) => {
      const data = snapshot.val();
      setSchedules(data);
    });

    // getting setting configs
    onValue(settingRef, (snapshot) => {
      const data = snapshot.val();
      setSettings(data);
    });
  }, []);

  /**
   * save project data with onchange of input
   * @param {event} e
   * @param {input name} evname
   */
  const onChangeProject = (e, evname) => {
    const kAry = evname.split(".");
    setProjects({
      ...projects,
      [kAry[0]]: {
        ...projects[kAry[0]],
        [kAry[1]]: e.target.value,
      },
    });
    update(ref(db, `projects/${kAry[0]}`), { [kAry[1]]: e.target.value })
      .then(() => {
        console.log("database successfully updated");
      })
      .catch((err) => {
        console.log("database error", err);
      });
  };

  /**
   * save schedule
   * @param {Object} schedule
   */
  const handleAddSchedule = (schedule) => {
    const newRef = push(scheduleRef);
    set(newRef, schedule)
      .then(() => {
        console.log("database successfully updated");
      })
      .catch((err) => {
        console.log("database error", err);
      });
  };

  /**
   * Delete Row
   * @param {String} rowId
   */
  const handleDeleteRow = (rowId) => {
    remove(ref(db, `schedule/${rowId}`));
  };

  /**
   * save setting configs to firebase
   * @param {Object} configs
   */
  const handleSaveSetting = (configs) => {
    if (file) {
      const storageRef = sRef(storage, `/files/site_logo.png`)

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          console.log('percent===>  ', percent)
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            set(settingRef, { ...configs, token_logo: url }).then(()=>{
              toast.success("Setting Information was updated.");
            })  
          });
        }
      );
    } else {
      set(settingRef, configs)
        .then(() => {
          toast.success("Setting Information was updated.")
          console.log("database successfully updated");
        })
        .catch((err) => {
          console.log("database error", err);
          toast.error("database error");
        });
    }
  };
  
  /**
   * 
   * @param {Event} e 
   */
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }

  return (
    <React.Fragment>
      <div className="pp-detail-content pt-1 mt-5">
        <div className="container">
          <ul className="nav nav-tabs text-end" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="setting-tab"
                data-bs-toggle="tab"
                type="button"
                role="tab"
                aria-controls="setting"
                aria-selected="false"
                data-bs-target="#setting"
              >
                Project setting
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="home-tab"
                data-bs-toggle="tab"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
                data-bs-target="#home"
              >
                Project details
              </button>
            </li>
            <li className="">
              <button
                className="nav-link"
                id="schedule-tab"
                data-bs-toggle="tab"
                type="button"
                role="tab"
                aria-controls="schedule"
                data-bs-target="#schedule"
                aria-selected="false"
              >
                Schedule
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade active show"
              id="setting"
              role="tabpanel"
              aria-labelledby="setting-tab"
            >
              <Setting
                settings={settings}
                handleSaveSetting={handleSaveSetting}
                handleFileChange={handleFileChange}
              />
            </div>
            <div
              className="tab-pane fade"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <ProjectDetail
                projects={projects}
                onChangeProject={onChangeProject}
              />
            </div>
            <div
              className="tab-pane fade"
              id="schedule"
              role="tabpanel"
              aria-labelledby="schedule-tab"
            >
              <Schedule
                schedules={schedules}
                handleAddSchedule={handleAddSchedule}
                handleDeleteRow={handleDeleteRow}
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
}
