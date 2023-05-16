import "@styles/globals.css";
import { FC, ReactNode } from "react";
import Nav from "components/Nav";
import Provider from "components/Provider";

interface Props {
  children?: ReactNode;
}
export const metadata = {
  title: "Ayira_Affirmatioms",
  description: "My daily affirmations to Ayira powered by chatGPT",
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
