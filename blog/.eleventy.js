import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyImageTransformPlugin);
  eleventyConfig.addCollection("posts", function (collection) {
    return collection.getFilteredByGlob("posts/**/*.md").sort((a, b) => Math.sign(new Date(b.data.date) - new Date(a.data.date)));
  });

  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPassthroughCopy("styles.css");

  // Add any custom configuration here
  eleventyConfig.addFilter("firstParagraph", function(content) {
    if (!content) return "";
    const text = content.split("\n").filter(line => line.trim().startsWith("<p>")).join("\n");

    return text.length > 140 ? text.slice(0, 500) + ". . ." : text;
  });
  return {
    dir: {
      input: "src",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};
