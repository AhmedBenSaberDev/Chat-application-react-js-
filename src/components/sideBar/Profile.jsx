import { BsSearch } from 'react-icons/bs';

import { motion } from 'framer-motion';

import classes from './profile.module.css';

const Profile = () => {
  return(
    <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ type: "spring", stiffness: 100 }}
    className="p-2"
  >
    <h4 className="text-center mt-2 mb-2">Profile</h4>

  </motion.div>
  )
};

export default Profile;
