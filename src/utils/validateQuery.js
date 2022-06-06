const validateFields = (query, fields) => {
  let valid = false;

  if (query.length > 0) {
    const validField = fields.find((field) => {
      return field === query;
    });

    if (validField !== undefined) {
      valid = true;
    }
  }

  return valid;
};

const validateQuery = (query) => {
  let errMessage = [];
  const sortFields = ["id", "reads", "likes", "popularity"];
  const directionFields = ["desc", "asc"];

  if (
    Object.keys(query).length === 0 ||
    query.tags === undefined ||
    query.tags === ""
  ) {
    errMessage.push({
      error: "Tags parameter is required",
    });
  }

  if (query.sortBy !== undefined) {
    // validate sortBy query
    if (validateFields(query.sortBy, sortFields) != true) {
      errMessage.push({
        error: "sortBy parameter is invalid",
      });
    }
  }

  if (query.direction !== undefined) {
    // validate direction query
    if (validateFields(query.direction, directionFields) != true) {
      errMessage.push({
        error: "direction parameter is invalid",
      });
    }
  }

  return errMessage;
};

module.exports = { validateQuery };
