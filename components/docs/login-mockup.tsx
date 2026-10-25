"use client";


import { Button } from "@/components/cubix/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/cubix/card";
import {
  TextField,
  TextFieldControl,
  TextFieldInput,
  TextFieldLabel,
} from "@/components/cubix/text-field";
import {
  PasswordField,
  PasswordFieldControl,
  PasswordFieldInput,
  PasswordFieldLabel,
  PasswordFieldToggle,
} from "@/components/cubix/password-field";
import {
  EditorMockup,
  type MockupApi,
  type TreeRow,
} from "@/components/docs/editor-mockup";
import { getRegistryItem } from "@/components/docs/mockup-sources";

/* Building a Persian login page from Cubix components: add them, then compose. */

const tree: TreeRow[] = [
  { id: "app", name: "app", depth: 0, folder: true },
  { id: "app/login", name: "login", depth: 1, folder: true },
  { id: "app/login/page.tsx", name: "page.tsx", depth: 2 },
  { id: "app/globals.css", name: "globals.css", depth: 1 },
  { id: "app/layout.tsx", name: "layout.tsx", depth: 1 },
  { id: "app/page.tsx", name: "page.tsx", depth: 1 },
  { id: "components", name: "components", depth: 0, folder: true },
  { id: "components/cubix", name: "cubix", depth: 1, folder: true },
  { id: "components/cubix/button.tsx", name: "button.tsx", depth: 2 },
  { id: "components/cubix/card.tsx", name: "card.tsx", depth: 2 },
  { id: "components/cubix/text-field.tsx", name: "text-field.tsx", depth: 2 },
  { id: "components/cubix/password-field.tsx", name: "password-field.tsx", depth: 2 },
  { id: "lib", name: "lib", depth: 0, folder: true },
  { id: "lib/utils.ts", name: "utils.ts", depth: 1 },
  { id: "cubix.json", name: "cubix.json", depth: 0 },
  { id: "package.json", name: "package.json", depth: 0 },
];

const startFiles = [
  "app",
  "app/globals.css",
  "app/layout.tsx",
  "app/page.tsx",
  "components",
  "components/cubix",
  "lib",
  "lib/utils.ts",
  "cubix.json",
  "package.json",
];

const initialContents: Record<string, string> = {
  "app/globals.css": `@import "tailwindcss";

/* Cubix design tokens (written by cubix-ui init) */`,
  "app/layout.tsx": `import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}`,
  "app/page.tsx": `export default function Home() {
  return <main>my-app</main>;
}`,
  "lib/utils.ts": `import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`,
  "cubix.json": `{
  "$schema": "https://cubixflow.ir/schema.json",
  "style": "cubix",
  "base": "base",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "css": "app/globals.css",
    "cssVariables": true
  },
  "iconLibrary": "lucide",
  "aliases": {
    "ui": "@/components/cubix",
    "utils": "@/lib/utils"
  }
}`,
  "package.json": `{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start"
  },
  "dependencies": {
    "@base-ui/react": "^1.8.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.545.0",
    "next": "15.5.4",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "tailwind-merge": "^3.3.1"
  }
}`,
};

const stage0 = "\"use client\"\n\nimport { Button } from \"@/components/cubix/button\"\nimport {\n  Card,\n  CardContent,\n  CardDescription,\n  CardFooter,\n  CardHeader,\n  CardTitle,\n} from \"@/components/cubix/card\"\nimport {\n  TextField,\n  TextFieldControl,\n  TextFieldInput,\n  TextFieldLabel,\n} from \"@/components/cubix/text-field\"\nimport {\n  PasswordField,\n  PasswordFieldControl,\n  PasswordFieldInput,\n  PasswordFieldLabel,\n  PasswordFieldToggle,\n} from \"@/components/cubix/password-field\"\n\nexport default function LoginPage() {\n  return (\n    <main className=\"flex min-h-svh items-center justify-center p-6\">\n      <form className=\"w-full max-w-xs\">\n        <Card>\n        </Card>\n      </form>\n    </main>\n  )\n}\n";
const stage1 = "\"use client\"\n\nimport { Button } from \"@/components/cubix/button\"\nimport {\n  Card,\n  CardContent,\n  CardDescription,\n  CardFooter,\n  CardHeader,\n  CardTitle,\n} from \"@/components/cubix/card\"\nimport {\n  TextField,\n  TextFieldControl,\n  TextFieldInput,\n  TextFieldLabel,\n} from \"@/components/cubix/text-field\"\nimport {\n  PasswordField,\n  PasswordFieldControl,\n  PasswordFieldInput,\n  PasswordFieldLabel,\n  PasswordFieldToggle,\n} from \"@/components/cubix/password-field\"\n\nexport default function LoginPage() {\n  return (\n    <main className=\"flex min-h-svh items-center justify-center p-6\">\n      <form className=\"w-full max-w-xs\">\n        <Card>\n          <CardHeader>\n            <CardTitle>\u0648\u0631\u0648\u062f \u0628\u0647 \u062d\u0633\u0627\u0628</CardTitle>\n            <CardDescription>\u0628\u0631\u0627\u06cc \u0627\u062f\u0627\u0645\u0647\u060c \u0646\u0627\u0645 \u06a9\u0627\u0631\u0628\u0631\u06cc \u0648 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062e\u0648\u062f \u0631\u0627 \u0648\u0627\u0631\u062f \u06a9\u0646\u06cc\u062f.</CardDescription>\n          </CardHeader>\n        </Card>\n      </form>\n    </main>\n  )\n}\n";
const stage2 = "\"use client\"\n\nimport { Button } from \"@/components/cubix/button\"\nimport {\n  Card,\n  CardContent,\n  CardDescription,\n  CardFooter,\n  CardHeader,\n  CardTitle,\n} from \"@/components/cubix/card\"\nimport {\n  TextField,\n  TextFieldControl,\n  TextFieldInput,\n  TextFieldLabel,\n} from \"@/components/cubix/text-field\"\nimport {\n  PasswordField,\n  PasswordFieldControl,\n  PasswordFieldInput,\n  PasswordFieldLabel,\n  PasswordFieldToggle,\n} from \"@/components/cubix/password-field\"\n\nexport default function LoginPage() {\n  return (\n    <main className=\"flex min-h-svh items-center justify-center p-6\">\n      <form className=\"w-full max-w-xs\">\n        <Card>\n          <CardHeader>\n            <CardTitle>\u0648\u0631\u0648\u062f \u0628\u0647 \u062d\u0633\u0627\u0628</CardTitle>\n            <CardDescription>\u0628\u0631\u0627\u06cc \u0627\u062f\u0627\u0645\u0647\u060c \u0646\u0627\u0645 \u06a9\u0627\u0631\u0628\u0631\u06cc \u0648 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062e\u0648\u062f \u0631\u0627 \u0648\u0627\u0631\u062f \u06a9\u0646\u06cc\u062f.</CardDescription>\n          </CardHeader>\n          <CardContent className=\"grid gap-4\">\n            <TextField name=\"username\">\n              <TextFieldLabel>\u0646\u0627\u0645 \u06a9\u0627\u0631\u0628\u0631\u06cc</TextFieldLabel>\n              <TextFieldControl>\n                <TextFieldInput placeholder=\"\u0646\u0627\u0645 \u06a9\u0627\u0631\u0628\u0631\u06cc \u062e\u0648\u062f \u0631\u0627 \u0648\u0627\u0631\u062f \u06a9\u0646\u06cc\u062f\" autoComplete=\"username\" required />\n              </TextFieldControl>\n            </TextField>\n            <PasswordField name=\"password\">\n              <PasswordFieldLabel>\u0631\u0645\u0632 \u0639\u0628\u0648\u0631</PasswordFieldLabel>\n              <PasswordFieldControl>\n                <PasswordFieldInput\n                  placeholder=\"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062e\u0648\u062f \u0631\u0627 \u0648\u0627\u0631\u062f \u06a9\u0646\u06cc\u062f\"\n                  autoComplete=\"current-password\"\n                  required\n                />\n                <PasswordFieldToggle />\n              </PasswordFieldControl>\n            </PasswordField>\n          </CardContent>\n        </Card>\n      </form>\n    </main>\n  )\n}\n";
const stage3 = "\"use client\"\n\nimport { Button } from \"@/components/cubix/button\"\nimport {\n  Card,\n  CardContent,\n  CardDescription,\n  CardFooter,\n  CardHeader,\n  CardTitle,\n} from \"@/components/cubix/card\"\nimport {\n  TextField,\n  TextFieldControl,\n  TextFieldInput,\n  TextFieldLabel,\n} from \"@/components/cubix/text-field\"\nimport {\n  PasswordField,\n  PasswordFieldControl,\n  PasswordFieldInput,\n  PasswordFieldLabel,\n  PasswordFieldToggle,\n} from \"@/components/cubix/password-field\"\n\nexport default function LoginPage() {\n  return (\n    <main className=\"flex min-h-svh items-center justify-center p-6\">\n      <form className=\"w-full max-w-xs\">\n        <Card>\n          <CardHeader>\n            <CardTitle>\u0648\u0631\u0648\u062f \u0628\u0647 \u062d\u0633\u0627\u0628</CardTitle>\n            <CardDescription>\u0628\u0631\u0627\u06cc \u0627\u062f\u0627\u0645\u0647\u060c \u0646\u0627\u0645 \u06a9\u0627\u0631\u0628\u0631\u06cc \u0648 \u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062e\u0648\u062f \u0631\u0627 \u0648\u0627\u0631\u062f \u06a9\u0646\u06cc\u062f.</CardDescription>\n          </CardHeader>\n          <CardContent className=\"grid gap-4\">\n            <TextField name=\"username\">\n              <TextFieldLabel>\u0646\u0627\u0645 \u06a9\u0627\u0631\u0628\u0631\u06cc</TextFieldLabel>\n              <TextFieldControl>\n                <TextFieldInput placeholder=\"\u0646\u0627\u0645 \u06a9\u0627\u0631\u0628\u0631\u06cc \u062e\u0648\u062f \u0631\u0627 \u0648\u0627\u0631\u062f \u06a9\u0646\u06cc\u062f\" autoComplete=\"username\" required />\n              </TextFieldControl>\n            </TextField>\n            <PasswordField name=\"password\">\n              <PasswordFieldLabel>\u0631\u0645\u0632 \u0639\u0628\u0648\u0631</PasswordFieldLabel>\n              <PasswordFieldControl>\n                <PasswordFieldInput\n                  placeholder=\"\u0631\u0645\u0632 \u0639\u0628\u0648\u0631 \u062e\u0648\u062f \u0631\u0627 \u0648\u0627\u0631\u062f \u06a9\u0646\u06cc\u062f\"\n                  autoComplete=\"current-password\"\n                  required\n                />\n                <PasswordFieldToggle />\n              </PasswordFieldControl>\n            </PasswordField>\n          </CardContent>\n          <CardFooter>\n            <Button type=\"submit\" className=\"w-full\">\n              \u0648\u0631\u0648\u062f\n            </Button>\n          </CardFooter>\n        </Card>\n      </form>\n    </main>\n  )\n}\n";

/* The live preview renders the same Cubix components the code uses. */
function LoginPreview({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div dir="rtl" className="flex justify-center p-6">
      <div className="w-full max-w-xs">
        <form onSubmit={(event) => event.preventDefault()}>
          <Card>
            <CardHeader>
              <CardTitle>ورود به حساب</CardTitle>
              <CardDescription>برای ادامه، نام کاربری و رمز عبور خود را وارد کنید.</CardDescription>
            </CardHeader>
            {step >= 2 ? (
              <CardContent className="grid gap-4">
                <TextField name="username">
                  <TextFieldLabel>نام کاربری</TextFieldLabel>
                  <TextFieldControl>
                    <TextFieldInput placeholder="نام کاربری خود را وارد کنید" autoComplete="username" />
                  </TextFieldControl>
                </TextField>
                <PasswordField name="password">
                  <PasswordFieldLabel>رمز عبور</PasswordFieldLabel>
                  <PasswordFieldControl>
                    <PasswordFieldInput
                      placeholder="رمز عبور خود را وارد کنید"
                      autoComplete="current-password"
                    />
                    <PasswordFieldToggle />
                  </PasswordFieldControl>
                </PasswordField>
              </CardContent>
            ) : null}
            {step >= 3 ? (
              <CardFooter>
                <Button type="submit" className="w-full">
                  ورود
                </Button>
              </CardFooter>
            ) : null}
          </Card>
        </form>
      </div>
    </div>
  );
}

const names = ["card", "text-field", "password-field", "button"];

async function script(api: MockupApi) {
  const items = await Promise.all(names.map((n) => getRegistryItem(n)));
  if (api.cancelled()) return;

  // 1. add the components the page needs
  await api.wait(900);
  await api.type(`npx cubix-ui@latest add ${names.join(" ")}`);
  if (api.cancelled()) return;
  for (let i = 0; i < names.length; i++) {
    const s = api.push("spinner", `Adding ${names[i]}...`);
    await api.wait(700);
    if (api.cancelled()) return;
    api.update(s, "success", `Added ${names[i]} (1 file)`);
    api.write(`components/cubix/${names[i]}.tsx`, items[i]?.files?.[0]?.content ?? "", "U");
  }
  await api.wait(500);
  api.open("components/cubix/text-field.tsx");
  await api.wait(1400);

  // 2. compose the login page
  const file = "app/login/page.tsx";
  api.write(file, "", "U");
  api.open(file);
  await api.typeInEditor(file, "", stage0, 4);
  if (api.cancelled()) return;
  await api.typeInEditor(file, stage0, stage1, 2);
  if (api.cancelled()) return;
  api.showPreview("localhost:3000/login", <LoginPreview step={1} />, 320);
  await api.typeInEditor(file, stage1, stage2, 3);
  if (api.cancelled()) return;
  api.showPreview("localhost:3000/login", <LoginPreview step={2} />, 320);
  await api.typeInEditor(file, stage2, stage3, 2);
  if (api.cancelled()) return;
  api.showPreview("localhost:3000/login", <LoginPreview step={3} />, 320);
}

export function LoginMockup() {
  return (
    <EditorMockup
      project="my-app"
      tree={tree}
      startFiles={startFiles}
      initialContents={initialContents}
      initialTabs={["app/page.tsx"]}
      script={script}
    />
  );
}
