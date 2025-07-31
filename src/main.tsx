import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./styles/globals.css";
import App from "./App.tsx";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}


createRoot(rootElement).render(
  <StrictMode>
    <MantineProvider 
      defaultColorScheme="dark"
      theme={{
        primaryColor: 'blue',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
        colors: {
          dark: [
            '#C9D1D9',
            '#B1BAC4',
            '#8B949E',
            '#6E7681',
            '#484F58',
            '#30363D',
            '#21262D',
            '#161B22',
            '#0D1117',
            '#010409'
          ]
        },
        components: {
          Modal: {
            defaultProps: {
              centered: true,
              overlayProps: {
                backgroundOpacity: 0.55,
                blur: 3,
              },
            },
          },
        },
      }}
    >
      <ModalsProvider>
        <Notifications position="top-right" />
        <App />
      </ModalsProvider>
    </MantineProvider>
  </StrictMode>,
);