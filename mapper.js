const { config } = require("./config");
const fs = require("fs");
const path = require("path");

const title = "Hao_s key mapping";

const output = { title, rules: config.map(getRule) };

fs.writeFileSync(
  path.resolve(__dirname, "./output.json"),
  JSON.stringify(output, null, 2)
);

function getRule([key, to, ...modifiers]) {
  return {
    description: `${to} = ${key}${
      modifiers.length ? ` + ${modifiers.join(" + ")}` : ""
    }`,
    manipulators: [
      {
        type: "basic",
        from: {
          modifiers: modifiers.length
            ? {
                mandatory: modifiers,
              }
            : undefined,
          key_code: key,
        },
        to: [
          {
            repeat: true,
            key_code: to,
          },
        ],
      },
    ],
  };
}
