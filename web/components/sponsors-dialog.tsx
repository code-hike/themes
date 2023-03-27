import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";
import { signIn } from "next-auth/react";

export function SponsorsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-0 h-6 inline-block ">
          <span className="text-slate-400">Sponsors only</span>
          <Info className="h-4 inline-block" />
          <span className="sr-only">Open popover</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid gap-4">
          <div className="space-y-2 ">
            <p>
              Become a <b className="bold">Code Hike sponsor</b> for $19 a month
              to load more themes:
            </p>
            <ul className="list-disc list-inside">
              <li>22 built-in themes</li>
              <li>Any theme from VS Code</li>
              <li>Your custom theme</li>
            </ul>

            <DialogFooter>
              <a
                href="https://github.com/sponsors/code-hike/"
                className="h-10 py-2 px-4 active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800 bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-50 dark:text-slate-900"
              >
                Sponsor Code Hike
              </a>
              <Button
                variant="outline"
                onClick={() => signIn("github", { redirect: false })}
              >
                Log in with GitHub
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
