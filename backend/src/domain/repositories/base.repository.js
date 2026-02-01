/**
 * Base Repository Pattern
 * Provides common data access methods for all repositories
 */
class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll(filter = {}, options = {}) {
    const { page = 1, limit = 10, sort = '-createdAt', populate = '' } = options;
    const skip = (page - 1) * limit;

    const query = this.model.find(filter).sort(sort).skip(skip).limit(limit);

    if (populate) {
      query.populate(populate);
    }

    return query;
  }

  async findById(id, populate = '') {
    const query = this.model.findById(id);
    if (populate) {
      query.populate(populate);
    }
    return query;
  }

  async findOne(filter, populate = '') {
    const query = this.model.findOne(filter);
    if (populate) {
      query.populate(populate);
    }
    return query;
  }

  async create(data) {
    return this.model.create(data);
  }

  async update(id, data) {
    return this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }

  async count(filter = {}) {
    return this.model.countDocuments(filter);
  }

  async exists(filter) {
    return this.model.exists(filter);
  }
}

module.exports = BaseRepository;
