import EmailService from '../services/Email'

class ContactController {

  save = (req, res) => {

    const request = {
      to: 'luis.giribone@mobillers.com',
      from: 'luis.giribone@mobillers.com',
      replayTo: 'luis.giribone@mobillers.com',
      subject: `Contacto ${ req.body.name }`,
      message: `
        <b>Email</b>: ${ req.body.email }
        <br><br>
        <b>Telefono</b>: ${ req.body.phone }
        <br><br>
        <b>Comentario</b>: ${ req.body.comments }
      `,
      altText: `
        Telefono: ${ req.body.phone }
        Comentario: ${ req.body.message }
      `
    };

    EmailService.send(request, (err, data, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(req.body);
      }
    });
  };

}

const controller = new ContactController();

export default controller;
