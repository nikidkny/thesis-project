const response200 = {
  statusCode: 200,
  body: JSON.stringify({ message: "Authorized" }),
  headers: {
    "Content-Type": "application/json",
  },
  isBase64Encoded: false,
};

const response401 = {
  statusCode: 401,
  body: JSON.stringify({ message: `Unauthorized` }),
  headers: {
    "Content-Type": "application/json",
  },
  isBase64Encoded: false,
};

const response500 = (err) => {
  return {
    statusCode: 500,
    body: JSON.stringify({
      message: `Internal server error`,
      detail: err.message,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    isBase64Encoded: false,
  };
};

const handler = async (event) => {
  try {
    const email = event.queryStringParameters.email;
    if (email && email.split("@").includes("manyone.com")) {
      return response200;
    } else {
      return response401;
    }
  } catch (error) {
    return response500(error);
  }
};

module.exports = { handler };
