import fs from 'fs/promises'

async function moveFiles() {
  try {
    await fs.rename("dist/en/404/index.html", "dist/404.en.html");
    console.log("Files moved successfully!");
  } catch (err) {
    console.error("Error moving files:", err);
  }
  try {
    await fs.rmdir("dist/en/404");
    console.log("Directory removed successfully!");
  } catch (err) {
    console.error("Error removing directory:", err);
  }
}

moveFiles();