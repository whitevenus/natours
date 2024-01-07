class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.querySring = queryString;
  }

  fillter() {
    // 1A) Filtering
    const queryObj = { ...this.querySring };
    const excludFields = ["page", "sort", "limit", "fields"];
    excludFields.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|lte|gt|lt)\b/g, (match) => `$${match}`);

    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.querySring.sort) {
      // console.log(this.querySring.sort);
      const sortBy = this.querySring.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createAt");
    }

    return this;
  }

  limitFields() {
    if (this.querySring.fields) {
      const fields = this.querySring.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    const page = this.querySring.page * 1 || 1;
    const limit = this.querySring.limit * 1 || 100;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    // if (this.querySring.page) {
    //   const numTours = await Tour.countDocuments();
    //   if (skip >= numTours) throw new Error("This page does not exist.");
    // }

    return this;
  }
}

module.exports = APIFeatures;
