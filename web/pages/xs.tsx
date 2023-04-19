import { LanguagePickerUI } from "@/components/language-picker.ui";
import { getLangItems } from "@/components/snippets";
import { useMachine } from "@xstate/react";
import { assign, createMachine } from "xstate";

type LangItem = {
  name: string;
  status: "empty" | "loading" | "loaded" | "used";
  code: "";
};

const langMachine = createMachine(
  {
    predictableActionArguments: true,
    tsTypes: {} as import("./xs.typegen").Typegen0,
    schema: {
      context: {} as {
        langs: LangItem[];
        selectedLang: string;
      },
      events: {} as { type: "PICK_LANG"; name: string },
    },
    initial: "normalState",
    context: {
      langs: getLangItems(),
      selectedLang: "js",
    },
    states: {
      normalState: {
        on: {
          PICK_LANG: { actions: ["selectLang", "loadLang"] },
        },
      },
    },
  },
  {
    actions: {
      selectLang: assign({
        selectedLang: (_, event) => event.name,
      }),
      loadLang: (ctx, evt) => {
        console.log("loadLang", ctx, evt);
      },
    },
  }
);

async function loadLanguage(langName: string): Promise<string> {
  // Simulate an API call or async operation
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return `Loaded language: ${langName}`;
}

export default function Page() {
  const [{ context }, send] = useMachine(langMachine);
  const selected = context.langs.find(
    (lang) => lang.name === context.selectedLang
  );
  return (
    <div>
      <LanguagePickerUI
        selected={selected}
        langs={context.langs}
        onSelected={({ name }) => send("PICK_LANG", { name })}
      />
    </div>
  );
}
