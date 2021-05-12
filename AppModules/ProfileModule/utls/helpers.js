import {isValidElement} from '../../../MyApp/Utils/helpers';

export const isDataUpdated = (props, state) => {
  if (isValidElement(props) && isValidElement(state)) {
    return (
      props.name.toLowerCase() !== state.userName.toLowerCase() ||
      props.email.toLowerCase() !== state.email.toLowerCase() ||
      props.photo !== state.image
    );
  }
};
