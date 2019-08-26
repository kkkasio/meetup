import * as Yup from 'yup';
import { isBefore, parseISO } from 'date-fns';
import Meetup from '../models/Meetup';

class MeetupController {
  async index(req, res) {
    return res.json({ true: 'ok index' });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    /**
     * Não deve ser possível cadastrar meetups com datas que já passaram.
     */
    if (isBefore(parseISO(req.body.date), new Date()))
      return res.status(400).json({ error: 'Invalid Date' });

    const user = req.userId;

    const meetup = await Meetup.create({
      ...req.body,
      user_id: user,
    });

    return res.json({ meetup });
  }
}

export default new MeetupController();