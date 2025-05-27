import "./globals.css";
import ClientLayout from "../components/ClientLayout";

export const metadata = {
  title: "Task Manager",
  description: "Simple task management app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
