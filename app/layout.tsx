import "@styles/globals.css";
import { FC, ReactNode } from "react";
import Nav from "components/Nav";
import Provider from "components/Provider";

interface Props {
  children?: ReactNode;
}
export const metadata = {
  title: "Ai_prompter",
  description: "Discover & Share Ai Prompts",
};

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient"></div>
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
