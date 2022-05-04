import classes from "./receivedMesageBox.module.css";


const ReceivedMessageBox = (props) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes['message-wrapper']}>
        <p className="p-0 m-0">
          Lorem ipsum dolor sitr adipisicing elit. Dicta itaq QSDQSDQ QS DQSD AQD QS D
        </p>
      </div>
      <span className={classes.date}>10 : 16 pm </span>
    </div>
  );
};

export default ReceivedMessageBox;