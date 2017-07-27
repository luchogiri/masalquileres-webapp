class AbstractController {

  constructor(repository) {
    this.repository = repository;
  }

  find = (req, res) => {

    const handler = (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(result);
      }
    };

    if(req.query.pageSize) {
      const { pageSize, pageNumber, ...query } = req.query;
      this.repository.findPaginated(query, {
        pageSize: parseInt(pageSize),
        pageNumber: parseInt(pageNumber)
      }, handler);
    } else {
      this.repository.find(req.query, handler);
    }

  };

  add = (req, res) => {
      this.repository.add(req.body, (err, saved) => {
        if (err) {
          res.status(500).send(err);
        }
        res.json(saved);
      });
  };

  update = (req, res) => {
    this.repository.update(req.params.id, req.body, (err, saved) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(saved);
      }
    });
  };

  findById = (req, res) => {
    this.repository.findById(req.params.id, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if(!result) {
        res.status(404).end();
      } else {
        res.json(result);
      }
    });
  };

  remove = (req, res) => {
    this.repository.remove(req.params.id, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else if(!result) {
        res.status(404).end();
      } else {
        res.status(200).send(result);
      }
    });
  };

}

export default AbstractController;
