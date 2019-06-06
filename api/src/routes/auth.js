import { User } from '../models';
import { errorHandler, dataHandler } from '../utils/handlers';
import { sendConfirmationMail } from '../mail';

function register(req, res) {
  User.create(req.body)
    .then(sendConfirmationMail)
    .then(dataHandler(res))
    .catch(errorHandler(res));
}

export default {
  register
};
