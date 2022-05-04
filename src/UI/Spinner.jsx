import classes from './Backdrop.module.css';
import  ReactDOM  from 'react-dom';

import spinner from '../assets/spinner.svg';

const Spinner = props => {

    let content = <div onClick={ props.onClick } className={classes.backdrop}>
        <img src={spinner} alt="Loading" />
    </div>
    return ReactDOM.createPortal(content,document.getElementById('backdrop')); 
}

export default Spinner;