import { faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const renderError = (message) => (
  <p className="text-sm text-red-500">
    <FontAwesomeIcon icon={faInfoCircle} color="red" className="pr-1 pt-1" />
    {message}
  </p>
);
