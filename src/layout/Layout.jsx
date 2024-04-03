import { AppBar } from "./AppBar";

export function Layout({ children }) {
  return (
    <>
      <AppBar />
      <main className="flex justify-center py-5 bg-gray-100">{children}</main>
    </>
  );
}
