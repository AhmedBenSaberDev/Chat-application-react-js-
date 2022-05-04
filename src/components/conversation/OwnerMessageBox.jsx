import classes from "./OwnerMessageBox.module.css";

import {BsCheckAll } from 'react-icons/bs';

const OwnerMessageBox = (props) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes['message-wrapper']}>
        <p className="p-0 m-0">
          Lorem ipsum dolor sitr adipisicing elit. Dicta itaq
        </p>
      </div>
      <span className={classes.date}><BsCheckAll className={classes.checkicon}></BsCheckAll> 10 : 16 pm </span>
    </div>
  );
};

export default OwnerMessageBox;
