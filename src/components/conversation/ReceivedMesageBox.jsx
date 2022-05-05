import classes from "./receivedMesageBox.module.css";

import { format } from "timeago.js";

import { motion } from "framer-motion";

const ReceivedMessageBox = (props) => {
  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 80 }}
    className={`${classes.wrapper} p-2`}>
      <div className={classes['message-wrapper']}>
        <p className="p-0 m-0">
         {props.message.content}
        </p>
      </div>
      <span className={classes.date}>{format(props.message.createdAt)}</span>
    </motion.div>
  );
};

export default ReceivedMessageBox;