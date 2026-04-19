const db = require("../config/db");

async function getAllProjects() {
  const sql = `
    SELECT id, title, description, technologies, github_link, live_link, image_url, created_at
    FROM projects
    ORDER BY created_at DESC, id DESC
  `;

  return db.query(sql);
}

async function createProject(project) {
  const sql = `
    INSERT INTO projects (title, description, technologies, github_link, live_link, image_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const result = await db.query(sql, [
    project.title,
    project.description,
    project.technologies,
    project.github_link,
    project.live_link,
    project.image_url,
  ]);

  return result.insertId;
}

module.exports = {
  getAllProjects,
  createProject,
};
