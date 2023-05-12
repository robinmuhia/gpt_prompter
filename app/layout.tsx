import "@styles/globals.css";
import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  // any props that come into the component
}
export const metadata = {
  title: "Ai_prompter",
  description: "Discover & Share Ai Prompts",
};

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient"></div>
        </div>
      </body>
      <main className="app">{children}</main>
    </html>
  );
};

export default RootLayout;
