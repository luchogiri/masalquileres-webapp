import http from 'http';

class SearchPropertyController {

  search = (req, res) => {
    let postData = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      work_name: 'MasAlq',
      text: `
        Tipo de Inmueble: ${req.body.type}
        Zona: ${req.body.zone}
        Dormitorios: ${req.body.rooms}
        Valor Máximo: ${req.body.max_value}
        Observaciones: ${req.body.observations}
      `,
      tags: ['MasAlq']
    };

    let options = {
      hostname: 'tokkobroker.com',
      path: '/api/v1/webcontact/?key=0d6bdd0e5dd4c48515c1cea204365d25ee378265&format=json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    let request = http.request(options, (response) => {
      res.status(200).send(postData);
    });

    request.on('error', (e) => {
      console.log(`problem with request: ${e.message}`);
    });

    // write data to request body
    request.write(JSON.stringify(postData));
    request.end();
  };

}

const controller = new SearchPropertyController();

export default controller;
