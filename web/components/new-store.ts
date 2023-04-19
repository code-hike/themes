import { preload } from "@code-hike/lighter";
import { createMachine } from "xstate";

// const machine: any = {};
// const context: any = {};
// function pickLang(name: string) {
//   machine.send({ type: "SELECT_LANG", name });
//   machine.send({
//     type: "LOAD_LANG",
//     name,
//     guard: !context[name].loaded && !context[name].loading,
//   });
//   machine.send({
//     type: "HIGHLIGHT",
//     name,
//     guard: context[name].loaded && !context[name].loading,
//   });
// }

// function loadLang(name: string) {
//   preload([name]).then(() => machine.send({ type: "HIGHLIGHT", name }));
// }

const machine = createMachine(
  {
    context: {
      langs: [{ name: "js", status: "empty" }],
      selectedLang: "py",
    },
    initial: "normalState",
    states: {
      normalState: { on: { PICK_LANG: { actions: ["selectLang"] } } },
    },
  },
  {
    actions: {
      selectLang: (ctx, ev) => {
        return {
          ...ctx,
          selectedLang: ev.name,
        };
      },
      loadLang: () => {
        console.log("Goodbye");
      },
      highlight: () => {
        console.log("Goodbye");
      },
    },
  }
);
