function buildError(message, statusCode = 400) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function validateProject(req, _res, next) {
  const { title, description, technologies, github_link, live_link, image_url } = req.body;

  if (!title || !description || !technologies || !github_link || !live_link || !image_url) {
    return next(buildError("All project fields are required."));
  }

  next();
}

function validateMessage(req, _res, next) {
  const { name, email, message } = req.body;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !message) {
    return next(buildError("Name, email, and message are required."));
  }

  if (!emailPattern.test(email)) {
    return next(buildError("Please provide a valid email address."));
  }

  if (String(message).trim().length < 10) {
    return next(buildError("Message must be at least 10 characters long."));
  }

  next();
}

function requireAdminKey(req, _res, next) {
  const adminKey = process.env.ADMIN_API_KEY;

  if (!adminKey) {
    return next(buildError("Admin route is not configured.", 503));
  }

  if (req.headers["x-admin-key"] !== adminKey) {
    return next(buildError("Unauthorized access to admin route.", 401));
  }

  next();
}

module.exports = {
  validateProject,
  validateMessage,
  requireAdminKey,
};
