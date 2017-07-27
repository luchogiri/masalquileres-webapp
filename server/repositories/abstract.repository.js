class AbstractRepository {

  constructor(schema) {
    this.schema = schema;
  }

  find(req, handler) {
    this.schema.find(req)
      .sort('-created_at')
      .exec((err, res) => {
        handler(err, res);
      });
  }

  findPaginatedPreExec(q) {
    return q;
  }

  findPaginated(req, params, handler) {
    const page = params.pageNumber ? params.pageNumber : 1;
    this.findPaginatedPreExec(
      this.schema.find(req)
        .sort('-created_at')
    )
    .skip((page-1) * params.pageSize)
    .limit(params.pageSize)
    .exec((err, res) => {
      this.schema.count(req, (err, totalSize) => {
        handler(err, {
          items: res ? res : [],
          pageSize: params.pageSize,
          pageNumber: page,
          totalSize,
          totalPages: Math.ceil(totalSize / params.pageSize),
        });
      });
    });
  }

  add(req, handler) {
    const model = new this.schema(req);
    model.save((err, res) => handler(err, res));
  }

  update(id, req, handler) {
    this.schema.findById(id).exec((err, res) => {
      if (err || !res) {
        handler(err, res);
      } else {
        const { _id, created_at, __v } = res.toObject();
        const toSave =
          new this.schema({
            ...req,
            _id, created_at, __v,
            updated_at: Date.now()
          });
        this.schema.findByIdAndUpdate(id, toSave, { new: true }, (err, res) => {
          handler(err, res);
        });
      }
    });
  }

  findOne(req, handler) {
    this.schema.findOne(req).exec((err, res) => handler(err, res));
  }

  findByIdPreExec(q) {
    return q;
  }

  findById(id, handler) {
    this.findByIdPreExec(this.schema.findById(id))
      .exec((err, res) => handler(err, res));
  }

  remove(id, handler) {
    this.schema.findById(id).exec((err, res) => {
      if (err || !res) {
        handler(err, res);
      } else {
        res.remove(() => {
          handler(undefined, res);
        });
      }
    });
  }

}

export default AbstractRepository;
