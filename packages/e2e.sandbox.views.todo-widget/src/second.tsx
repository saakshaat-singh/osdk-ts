import "@radix-ui/themes/styles.css";
import "./main.css";

import { FoundryView } from "@osdk/views-client-react.unstable";
import { Theme } from "@radix-ui/themes";
import React from "react";
import { createRoot } from "react-dom/client";
import Config from "./second.config.js";
import { App } from "./secondApp.js";

const root = document.querySelector("body")!;

createRoot(root).render(
  (
    <Theme>
      <FoundryView
        config={Config}
      >
        <App />
      </FoundryView>
    </Theme>
  ),
);
