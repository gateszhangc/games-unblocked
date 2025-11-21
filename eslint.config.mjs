import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  {
    ignores: ["**/*"]
  }
]);

export default eslintConfig;
