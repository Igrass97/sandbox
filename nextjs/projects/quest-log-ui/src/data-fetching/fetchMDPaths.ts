import fs, { readdirSync } from "fs";
import { join } from "path";

const baseDirectory = join(process.cwd(), "./");

const ALLOWED_PATHS = ["./"];
const ALLOWED_EXTENSIONS = ["md", "mdx"];

export const getMDSlugs = () =>
  ALLOWED_PATHS.reduce(
    (allPaths: string[], currentPath: string) => {
      const fullSlug = join(baseDirectory, currentPath);
      const mds = readdirSync(fullSlug);

      allPaths.push(
        ...mds
          .map((md) => join(currentPath, md))
          .filter((md) =>
            ALLOWED_EXTENSIONS.includes(md.split(".").pop() as string)
          )
      );

      return allPaths;
    },
    ["home"]
  );

export const getMDBySlug = (slug: string) => {
  const mdPath = join(baseDirectory, slug);

  return fs.readFileSync(mdPath, "utf8");
};
